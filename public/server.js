"use strict";

/**
 * User sessions
 * @param {Array} users
 */
const users = [];

/**
 * Find opponent for a user
 * @param {User} user
 */
function findOpponent(user) {
    for (let i = 0; i < users.length; i++) {
        if (
            user !== users[i] &&
            users[i].opponent === null
        ) {
            new Game(user, users[i]).start();
        }
    }
}

/**
 * Remove user session
 * @param {User} user
 */
function removeUser(user) {
    users.splice(users.indexOf(user), 1);
}

/**
 * Game class
 */
class Game {

    /**
     * @param {User} user1
     * @param {User} user2
     */
    constructor(user1, user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    /**
     * Start new game
     */
    start() {
        this.user1.start(this, this.user2);
        this.user2.start(this, this.user1);
    }

    /**
     * Is game ended
     * @return {boolean}
     */
    ended() {
        return this.user1.guess !== GUESS_NO && this.user2.guess !== GUESS_NO;
    }

    /**
     * Final score
     */
    score() {
        if (
            this.user1.guess === GUESS_ROCK && this.user2.guess === GUESS_SCISSORS ||
            this.user1.guess === GUESS_PAPER && this.user2.guess === GUESS_ROCK ||
            this.user1.guess === GUESS_SCISSORS && this.user2.guess === GUESS_PAPER
        ) {
            this.user1.win();
            this.user2.lose();
        } else if (
            this.user2.guess === GUESS_ROCK && this.user1.guess === GUESS_SCISSORS ||
            this.user2.guess === GUESS_PAPER && this.user1.guess === GUESS_ROCK ||
            this.user2.guess === GUESS_SCISSORS && this.user1.guess === GUESS_PAPER
        ) {
            this.user2.win();
            this.user1.lose();
        } else {
            this.user1.draw();
            this.user2.draw();
        }
    }

}

/**
 * User session class
 */
class User {

    /**
     * @param {Socket} socket
     */
    constructor(socket) {
        this.socket = socket;
        this.game = null;
        this.opponent = null;
        this.guess = GUESS_NO;
    }

    /**
     * Set guess value
     * @param {number} guess
     */
    setGuess(guess) {
        if (
            !this.opponent ||
            guess <= GUESS_NO ||
            guess > GUESS_SCISSORS
        ) {
            return false;
        }
        this.guess = guess;
        return true;
    }

    /**
     * Start new game
     * @param {Game} game
     * @param {User} opponent
     */
    start(game, opponent) {
        this.game = game;
        this.opponent = opponent;
        this.guess = GUESS_NO;
        this.socket.emit("start");
    }

    /**
     * Terminate game
     */
    end() {
        this.game = null;
        this.opponent = null;
        this.guess = GUESS_NO;
        this.socket.emit("end");
    }

    /**
     * Trigger win event
     */
    win() {
        this.socket.emit("win", this.opponent.guess);
    }

    /**
     * Trigger lose event
     */
    lose() {
        this.socket.emit("lose", this.opponent.guess);
    }

    /**
     * Trigger draw event
     */
    draw() {
        this.socket.emit("draw", this.opponent.guess);
    }

}

const items = [];
const itemSpawnPoints = [{x: 16, y: 88},{x: 208, y:80},{x: 288, y: 80}, {x: 480, y: 88},{x: 16, y: 464},{x: 208, y:472},{x: 288, y:472},{x: 480, y: 464}];
let chat = [];
const maxChats = 20;
const maxChatChars = 40;
let timer = null;
let matchStartTime = 0;

let matchRunning = !1;

function gameUpdate() {
    // On first call there are no items so spawn one at each spawn point
    if (!items.length) itemSpawnPoints.forEach((spawnPoint, i) => {
        items.push({
            id: i,
            type: (Math.random() < 0.5) ? 1 : Math.floor(Math.random() * 5) + 2,
            x: spawnPoint.x,
            y: spawnPoint.y,
            time: Date.now()
        });
    });
    items.forEach(item => {
        if (item.type == 0 && Date.now() > item.time + 5000) item.type = (Math.random() < 0.5) ? 1 : Math.floor(Math.random() * 5) + 2;
    });
    io.sockets.emit('itemUpdate', items);

    if (chat[0] && chat[0].time + 15000 < Date.now()) {
        chat.splice(0, 1);
        io.sockets.emit('chat', chat.map(i => i.txt));
    }

    if (timer == null) timer = setInterval(gameUpdate, 5000);
}

/**
 * Socket.IO on connect event
 * @param {Socket} socket
 */
module.exports = {

    io: (socket) => {
        // const user = new User(socket);
        // users.push(user);
        // findOpponent(user);

        // socket.on("disconnect", () => {
        //     console.log("Disconnected: " + socket.id);
        //     removeUser(user);
        //     if (user.opponent) {
        //         user.opponent.end();
        //         findOpponent(user.opponent);
        //     }
        // });

        // socket.on("guess", (guess) => {
        //     console.log("Guess: " + socket.id);
        //     if (user.setGuess(guess) && user.game.ended()) {
        //         user.game.score();
        //         user.game.start();
        //         storage.get('games', 0).then(games => {
        //             storage.set('games', games + 1);
        //         });
        //     }
        // });
        
        // console.log("Connected: " + socket.id);

        gameUpdate();
        
        socket.on("disconnect", () => {
            io.sockets.emit('playerDisconnect', socket.id);
        });

        socket.on("removeRunes", () => {
            io.sockets.emit('removeRunes', socket.id);
        });

        socket.on("addRune", (rune) => {
            io.sockets.emit('addRune', socket.id, rune);
        });

        socket.on("addProjectile", (projectile) => {
            io.sockets.emit('addProjectile', socket.id, projectile);
        });

        socket.on("claimItem", (id, type) => {
            // console.log('got state update', player)
            let i = items.findIndex(o => {
                return o.id === id;
            });
            if (i !== -1) {
                items[i].time = Date.now();
                items[i].type = 0;
            }
            io.sockets.emit('claimItem', type, socket.id);
        });

        socket.on("stateUpdate", (player) => {
            io.sockets.emit('stateUpdate', player);
        });
        
        socket.on("chat", (updateTxt) => {
            let [user, ...rest] = updateTxt.split(":");
            updateTxt = rest.join(":");
            // console.log("received " + updateTxt);
            if (chat.push({txt: user + ": " + updateTxt.substring(0, maxChatChars + 1), time: Date.now()}) > maxChats) chat.splice(0, 1);
            // console.log(chat);
            io.sockets.emit('chat', chat.map(i => i.txt));
        });
        
        socket.on("startMatch", () => {
            matchStartTime = Date.now();
            io.sockets.emit('startMatch');
        });

        socket.on("addFrag", (id) => {
            io.sockets.emit('addFrag', id);
        });
        
    },

    // stat: (req, res) => {
    //     storage.get('games', 0).then(games => {
    //         res.send(`<h1>Games played: ${games}</h1>`);
    //     });
    // }

};
