"use strict";let t,e,f=!0,a=[],n={active:!1,chats:[],txt:""},i=0,o=Date.now(),r=0;const h=320,c=180;let s;const l=document.createElement("canvas");l.setAttribute("width",h),l.setAttribute("height",c);const u=l.getContext("2d");let d=document.createElement("canvas");d.width=h,d.height=c;const M=d.getContext("2d");let m=document.createElement("canvas");m.width=h,m.height=c;const y=m.getContext("2d");let g={};const x={x:0,y:0};let w=0,p=1,D=0,b=[];const v=["fireball","ricochet","split shot","double damage","runic hex","invisibility"],k=[{x:16,y:248},{x:16,y:304},{x:480,y:248},{x:480,y:304}];let T=0;const S={fire:[.2,0,192,,,.4,4,4,,.6,,,,.6,,.4,,.3,.1,.05],rune:[.2,0,267,.1,.06,,,1.49,4.3,-.8,,,,2,,.3,.15,.52,.05],hit:[.3,0,260,,.1,.07,4,4.7,,,,,,.4,,.4,.12,.3,.02,.01],ouch:[.5,,499,,.15,.04,,1.47,4.5,-6.8,,,.17,.5,,.3,.13,.73,.04,.12],dead:[.2,0,415,.01,.4,.35,1,.7,,6.27,-50,.04,.11,,,,,.5],scroll:[1.01,,749,.1,.09,.14,1,1.03,,,100,.03,-.02,,,,.11,.7,.07],potion:[1.1,,146,,.02,.12,1,.6,-8.6,-6.3,,,,,,,,.8,.02,.15],frag:[.5,0,471,,.03,.43,4,1.06,-5.5,,,,,.9,61,.1,,.5,.02]};let A={duration:180,startTime:0,ended:!1,launchTime:0},j=[];const P={matchLaunch:{txt:""},killedBy:{txt:""},respawn:{txt:""},item:{txt:"",time:0},killed:{txt:"",time:0}},I={cols:32,rows:35,tileSize:16,wallOffset:7,tiles:[],hex:["0","7e000","1ffff80","1ffff80","187e180","7f87e1fe","7f8001fe","7f8001fe","7ffffffe","7ffffffe","7ffffffe","7f8181fe","7f8181fe","c018030","c018030","7ffffffe","7ffffffe","7ffffffe","7ffffffe","7ffffffe","c018030","c018030","7f8181fe","7f8181fe","7ffffffe","7ffffffe","7ffffffe","7f8001fe","7f8001fe","7f87e1fe","187e180","1ffff80","1ffff80","7e000","0"],getTile:function(t,e){return this.tiles[e*this.cols+t]},canMoveToXY:function(t,e){let f=0;return!(t<0||t>this.cols*this.tileSize||e<0||e>this.rows*this.tileSize||(f=this.getTile(Math.floor(t/this.tileSize),Math.floor((e+this.tileSize/2)/this.tileSize)),f>4&&f<8||(f=this.getTile(Math.floor(t/this.tileSize),Math.floor(e/this.tileSize)),f<1||f>this.wallOffset)))},getSourceCoords:function(t){return t>0&&t<5?{x:t*this.tileSize,y:2*this.tileSize}:5==t?{x:80,y:16}:6==t?{x:96,y:48}:7==t?{x:96,y:16}:t==4+this.wallOffset?{x:0,y:48}:t==2+this.wallOffset?{x:32,y:48}:t==1+this.wallOffset?{x:16,y:48}:t==8+this.wallOffset?{x:80,y:0}:t==3+this.wallOffset?{x:80,y:32}:t==5+this.wallOffset?{x:0,y:32}:t==12+this.wallOffset?{x:96,y:0}:t==10+this.wallOffset?{x:96,y:32}:void 0}};I.hex.forEach((t=>{I.tiles=I.tiles.concat(Array.from(parseInt(t,16).toString(2).padStart(32,0)))}));for(let t=0;t<I.tiles.length;t++){let e=t%I.cols,f=Math.floor(t/I.cols);if(0==I.tiles[t]){let a=0;Math.abs(I.getTile(e,f-1)-2.5)<2.5&&(a+=1),Math.abs(I.getTile(e,f+1)-2.5)<2.5&&(a+=8),Math.abs(I.getTile(e-1,f)-2.5)<2.5&&(a+=2),Math.abs(I.getTile(e+1,f)-2.5)<2.5&&(a+=4),a>0&&(I.tiles[t]=a+I.wallOffset)}else 1==I.tiles[t]&&(I.tiles[t]=Math.floor(4*Math.random())+1)}for(let t=0;t<I.tiles.length;t++){if(I.tiles[t]>4)continue;let e=t%I.cols,f=Math.floor(t/I.cols);I.getTile(e,f-1)==8+I.wallOffset&&(I.tiles[t]=5),I.getTile(e,f-1)==10+I.wallOffset&&(I.tiles[t]=6),I.getTile(e,f-1)==12+I.wallOffset&&(I.tiles[t]=7)}let R,B=new Image;const E={players:[{active:!1,entryTime:0,username:"",playerId:Math.floor(1e8*Math.random()),sessionId:"",x:0,y:0,hit:0,scroll:0,health:100,dead:!1,lastHitBy:0,lastHitByScroll:0,facing:1,frame:0,walking:0,angle:0,frags:0,deaths:0,projectiles:[],runes:[]}],viewport:{following:{},x:0,y:0,width:h,height:c}},U=E.players[0],z=U.playerId;function F(){if(window.innerWidth<h||window.innerHeight<c)return l.width=h,l.height=c,void(s=1);let t=h/c,e=Math.floor(window.innerWidth/h)*h,f=Math.floor(window.innerHeight/c)*c;f<e/t?(l.width=f*t,l.height=f):(l.width=e,l.height=e/t),s=l.width/h,Y()}function Y(){u.imageSmoothingEnabled=!1,u.drawImage(d,0,0,d.width,d.height,0,0,l.width,l.height)}var q=function(t,e){e=-e*(Math.PI/180);var f=Math.cos(e),a=Math.sin(e);return new Array(Math.round(1e4*(t[0]*f-t[1]*a))/1e4,Math.round(1e4*(t[0]*a+t[1]*f))/1e4)};function C(t,e,f,a,n,i,o,r){return t<n+o&&t+f>n&&e<i+r&&a+e>i}function O(t="",e=100,f=0,a="rgb(255,255,255)",n=2,i=0){t=String(t).toUpperCase();const o=(n*=5)/5,r=[...Array(33),29,,,,,,12,,,,"ᇄ",3,"ႄ",1,1118480,"縿",31,"庽","嚿","炟","皷","纷","䈟","线","皿",17,,,"⥊",,"䊼",,"㹏","纮","縱","縮","纵","纐","񴚦","粟","䟱","丿",1020241,"簡",33059359,1024159,"縿","纜","񼙯","繍","皷","䏰","簿",25363672,32541759,18157905,"惸",18470705,,,,,"С"];let h=0,c=[];h=[...t].reduce(((t,n)=>{const i=r[n.charCodeAt()]||"",h=((i>0?i:i.codePointAt())||0).toString(2),s=31==i?3:Math.ceil(h.length/5),l=t+o;return h.padStart(5*s,0).match(new RegExp(".{5}","g")).map(((t,n)=>[...t].map(((t,i)=>{1==t&&c.push({fill:a,rectX:e+l+n*o,rectY:f+i*o,pixelSize:o})})))),t+(s+1)*o}),0);const s=i?Math.floor(h/2):0;return c.forEach((t=>{M.fillStyle=t.fill,M.fillRect(t.rectX-s,t.rectY,o,o)})),h}function H(){g={};const t=U,e=Math.floor(3*Math.random());t.health=100,t.dead=!1,t.scroll=0,t.hit=0,t.x=k[e].x,t.y=k[e].y,P.killedBy.txt="",P.respawn.txt="",0!=A.startTime&&0!=t.entryTime||(t.frags=0,t.deaths=0)}function L(f){f-i>Math.floor(16.666666666666668)&&(i=f,function(){if(A.launchTime>0){U.entryTime>0&&t.emit("matchUpdate",A);let e=3-Math.floor((Date.now()-A.launchTime)/1e3);if(P.matchLaunch.txt="The match is about to begin... "+e,Date.now()>A.launchTime+3e3){P.matchLaunch.txt="The match has begun!",A.launchTime=0,A.startTime=Date.now(),U.entryTime>0&&t.emit("matchUpdate",A),H();for(let t=1;t<E.players.length;t++)E.players[t].frags=0,E.players[t].deaths=0}}if(A.startTime>0&&Date.now()>A.startTime+3e3&&(P.matchLaunch.txt=""),A.startTime>0&&Date.now()>A.startTime+1e3*A.duration){A.ended=!0,A.startTime=0,U.entryTime>0&&t.emit("matchUpdate",A),T=Date.now(),U.entryTime>0&&t.emit("getResults");for(let t=0;t<E.players.length;t++)E.players[t].entryTime=0,E.players[t].runes.length=0}if(!A.ended&&0==A.startTime&&0==A.launchTime)for(let e=1;e<E.players.length;e++)if(E.players[e].entryTime>0&&E.players[e].entryTime>U.entryTime){U.entryTime>0&&t.emit("startMatch");break}let f=U;f.health>0&&(f.walking=0,(g.w||g.ArrowUp)&&I.canMoveToXY(f.x,f.y-2)&&I.canMoveToXY(f.x+16-1,f.y-2)&&(f.y-=2,f.walking=1),(g.a||g.ArrowLeft)&&I.canMoveToXY(f.x-2,f.y)&&I.canMoveToXY(f.x-2,f.y+16-1)&&(f.x-=2,f.walking=1),(g.s||g.ArrowDown)&&I.canMoveToXY(f.x,f.y+2+16-1)&&I.canMoveToXY(f.x+16-1,f.y+2+16-1)&&(f.y+=2,f.walking=1),(g.d||g.ArrowRight)&&I.canMoveToXY(f.x+2+16-1,f.y)&&I.canMoveToXY(f.x+2+16-1,f.y+16-1)&&(f.x+=2,f.walking=1),f.frame=f.frame<3&&1==f.walking?f.frame+=.075:0),E.viewport.x=E.viewport.following.x-160+8,E.viewport.y=E.viewport.following.y-90+8;for(let t=0;t<E.players.length;t++)E.players[t].projectiles.forEach((async e=>{e.x+=e.vx,e.y+=e.vy;for(let f=0;f<E.players.length;f++)t!=f&&(5==E.players[f].scroll||E.players[f].dead||e.x<E.players[f].x+16&&e.x+5>E.players[f].x&&e.y<E.players[f].y+16&&5+e.y>E.players[f].y&&(e.remove=!0,E.players[f].hit=10,0!=f&&Z(...S.hit),0==f&&U.health>0&&(Z(...S.ouch),U.health-=3==E.players[t].scroll?20:10,U.lastHitBy=E.players[t].sessionId,U.lastHitByScroll=E.players[t].scroll)));I.canMoveToXY(e.x,e.y)&&I.canMoveToXY(e.x+5,e.y)&&I.canMoveToXY(e.x,e.y+5)&&I.canMoveToXY(e.x+5,e.y+5)||(1==E.players[t].scroll&&--e.bounces?e.vx>0?I.canMoveToXY(e.x,e.y)&&I.canMoveToXY(e.x,e.y+5)?e.vx*=-1:e.vy*=-1:I.canMoveToXY(e.x+5,e.y)&&I.canMoveToXY(e.x+5,e.y+5)?e.vx*=-1:e.vy*=-1:e.remove=!0)})),E.players[t].projectiles=E.players[t].projectiles.filter((t=>!0!==t.remove)),E.players[t].runes.forEach((e=>{for(let f=0;f<E.players.length;f++)t!=f&&5!=E.players[f].scroll&&C(E.players[f].x,E.players[f].y,16,16,e.x,e.y,16,16)&&(0==f&&!e.remove&&E.players[f].health>0?(Z(...S.ouch),E.players[f].health-=25,E.players[f].lastHitBy=E.players[t].sessionId,E.players[f].lastHitByScroll=E.players[t].scroll):Z(...S.hit),E.players[f].hit=10,e.remove||(e.remove=!0))})),E.players[t].runes=E.players[t].runes.filter((t=>!0!==t.remove));if(U.health<=0&&!U.dead){U.dead=!0;let e=E.players.findIndex((t=>t.sessionId===U.lastHitBy));if(-1!=e){let f=["rekt","fried","zapped","burned","nuked","wasted"];t.emit("chat",2,U.username+" got "+f[Math.floor(Math.random()*f.length)]+" by "+E.players[e].username+"'s "+v[U.lastHitByScroll]),P.killedBy.txt="You were killed by "+E.players[e].username+"!"}Z(...S.dead),P.respawn.txt="Press fire to respawn",T=Date.now(),t.emit("removeRunes"),t.emit("addFrag",U.lastHitBy,E.players[e].username,U.sessionId,U.username),U.deaths++,0==A.launchTime&&(r=Date.now())}let a=-1;for(let f=0;f<b.length;f++)C(U.x,U.y,16,16,b[f].x,b[f].y,16,16)&&(a=b[f].id,e&&t.emit("claimItem",a,b[f].type),b[f].type=0);e&&t.emit("stateUpdate",U)}(),function(){if(M.fillStyle="rgb(2, 2, 2)",M.fillRect(0,0,l.width,l.height),A.ended&&j.length>0)O("match results",160,2,"#fff",3,1),O("match results",160,4,"#666",3,1),O("match results",161,3,"#dd0a1e",3,1),O("Player",20,32),O("Score",200,32),O("Deaths",250,32),j.sort(((t,e)=>t.score==e.score?t.deaths-e.deaths:e.score-t.score)),j.forEach(((t,e)=>{let f=t.id==U.sessionId?"#fd0":"#fff";O(t.username,20,50+20*e,f),O(t.score,220,50+20*e,f),O(t.deaths,270,50+20*e,f)})),Date.now()>T+5e3?O("Press fire to go back to the dungeon",160,150,"#fff",2,1):j[0].score==j[1].score&&j[0].deaths==j[1].deaths?O("The match was a draw",160,150,"#fff",2,1):O(j[0].username+" won the match",160,150,"#fff",2,1);else{let t=Math.floor(E.viewport.x/I.tileSize),e=t+E.viewport.width/I.tileSize,f=Math.floor(E.viewport.y/I.tileSize),a=f+E.viewport.height/I.tileSize,n=-E.viewport.x+t*I.tileSize,i=-E.viewport.y+f*I.tileSize;for(let o=t;o<=e;o++)for(let e=f;e<=a;e++){let a=I.getTile(o,e),r=I.getSourceCoords(a),h=16*(o-t)+n,c=16*(e-f)+i;void 0!==r&&a&&o>=0&&o<I.cols&&e>=0&&e<I.rows&&(M.drawImage(R,r.x,r.y,16,16,h,c,16,16),7!=a&&6!=a||X(h,c,I.cols))}w++,E.players.forEach((t=>{t.runes.forEach((t=>{M.drawImage(R,64,16,16,16,t.x-E.viewport.x,t.y-E.viewport.y,16,16)})),function(t){if(0!=t.entryTime){if(t.health<=0)M.drawImage(R,0,21,16,11,t.x-E.viewport.x,t.y+5-E.viewport.y,16,11);else{M.save(),0==t.facing&&(M.translate(2*(t.x-E.viewport.x)+16,0),M.scale(-1,1));let e=16*Math.floor(t.frame),f=0;t.hit&&(t.hit-=1,e=16,f=16),5==t.scroll&&(M.globalAlpha=0==E.players.indexOf(t)?.3:0),M.drawImage(R,e,f,16,16,t.x-E.viewport.x,t.y-E.viewport.y,16,16),M.restore()}E.players.indexOf(t)>0&&5!=t.scroll&&(O(t.username,t.x-E.viewport.x+8,t.y-E.viewport.y-16,"#fff",1,!0),M.fillStyle="rgb(0, 0, 0)",M.fillRect(t.x-E.viewport.x-8-1,t.y-E.viewport.y-8-1,34,5),M.fillStyle="rgb(255, 0, 0)",M.fillRect(t.x-E.viewport.x-8,t.y-E.viewport.y-8,Math.round(.32*t.health),3))}}(t),t.projectiles.forEach((t=>{!function(t){let e=t.x-E.viewport.x,f=t.y-E.viewport.y;e<0||e>319||f<0||f>179||M.drawImage(R,64,0,5,5,e,f,5,5)}(t)}))})),b.forEach((t=>{if(0==t.type)return;let e={x:32,y:16};1==t.type&&(e.x=48),M.drawImage(R,e.x,e.y,16,16,t.x-E.viewport.x,t.y-E.viewport.y,16,16)})),y.drawImage(d,0,0,h,c,0,0,h,c),y.globalAlpha=.2,y.fillStyle="rgb(0, 0, 0)",y.fillRect(0,0,h,c),y.globalAlpha=1,y.save(),y.beginPath();for(let o=t-3;o<=e+3;o++)for(let e=f-3;e<=a+3;e++){let a=16*(o-t)+n,r=16*(e-f)+i;6!=I.getTile(o,e)&&7!=I.getTile(o,e)||(y.arc(Math.floor(a+I.tileSize/2),Math.floor(r+2*I.tileSize),2*I.tileSize,0,2*Math.PI),y.closePath())}if(y.clip(),y.drawImage(d,0,0,h,c,0,0,h,c),y.restore(),M.drawImage(m,0,0,h,c,0,0,h,c),P.item.txt&&(Date.now()>P.item.time+3e3&&(P.item.txt=""),O(P.item.txt,160,5,"#fff",1,1)),0==A.launchTime&&0==A.startTime&&Date.now()>U.entryTime+1e3&&O("Waiting for other players",161,140,"#05d",2,1),""!=P.matchLaunch.txt&&O(P.matchLaunch.txt,160,140,"#05d",2,1),""!=P.killedBy.txt&&O(P.killedBy.txt,160,20,"#f00",1,1),Date.now()<P.killed.time+3e3&&O(P.killed.txt,160,20,"#05d",1,1),U.dead&&Date.now()>T+1e3&&O(P.respawn.txt,160,2,"#fff",2,1),A.startTime>0){let t=Math.floor((Date.now()-A.startTime)/1e3);if(t=A.duration-t,t>=0){let e=Math.floor(t/60);t%=60,O(e+":"+(t<10?"0"+t:t),290,2)}}}if(n.active){let t=O("Chat: "+n.txt,2,15,"#fff",1);M.fillStyle="#fff",M.fillRect(3+t,15,3,5)}if(n.chats&&n.chats.length){let t=["#fd0","#fff","#0e0"],e=0;for(let f=0;f<n.chats.length;f++){let a=n.chats[n.chats.length-1-f],i=t[a.slice(0,1)[0]],o=a.slice(1).replace(/.{20}\S*\s+/g,"$&@").split(/\s+@/);for(let t=0;t<o.length;t++)O(o[t],0,174-7*f-7*(o.length-1)+7*t-e,i,1);e+=7*(o.length-1)}}A.ended||(M.drawImage(R,69,0,11,10,1,2,11,10),O(U.health,14,2,"#fff",2)),M.drawImage(R,0,16,5,5,x.x-3,x.y-3,5,5),Y()}()),requestAnimationFrame(L)}function W(){U.active=!0,U.entryTime=Date.now(),t.emit("getMatchStatus")}function X(t,e){w>10&&(p=(Math.floor(6*Math.random())+6)/10,D=(Math.floor(3*Math.random())-1)/5,w=0),M.drawImage(R,64,9,7,7,t+4,e+6,7,7),M.save(),M.translate(t+5,e+5+1),M.transform(1,0,D,p,0,0),M.scale(1,-1),M.drawImage(R,75,11,5,5,0,0,5,5),M.setTransform(1,0,0,1,0,0),M.restore()}function $(t){M.fillStyle="#000",M.fillRect(0,0,h,c);const e=[52,64,91,100,106,112,124,145,154,166,172,184,196,202,208,217,238,250,256,262,271];for(let t=0;t<14;t++)M.drawImage(R,16,32,16,16,51+16*t,16,16,16);if(M.drawImage(R,0,0,16,16,51,16,16,16),M.save(),M.translate(534,0),M.scale(-1,1),M.drawImage(R,0,0,16,16,259,16,16,16),M.restore(),O("Deathmatch Dungeon",160,36,"#fff",3,1),O("Deathmatch Dungeon",160,38,"#666",3,1),O("Deathmatch Dungeon",161,37,"#dd0a1e",3,1),M.fillStyle="#aa0a1e",t>i+1e3){if(Math.random()<.5){let t=Math.floor(Math.random()*e.length);if(a.push({x:e[t],y:37}),Math.random()<.5){let t=Math.floor(Math.random()*e.length);a.push({x:e[t],y:37})}}i=t}a.forEach((t=>{t.y>c&&(t.remove=!0),t.y<65&&M.fillRect(t.x,37,3,t.y-36+1),M.fillRect(t.x,t.y,3,3),t.y+=t.y/120})),a=a.filter((t=>!0!==t.remove));let n=O("Enter your name: "+U.username,49,75,"#eee",2,0);M.fillStyle="#eee",M.fillRect(n+49+2,75,6,10),O("WASD/arrows to move, mouse to aim, click to shoot",50,120,"#eee",1),O("Tab to chat",50,130,"#eee",1),M.drawImage(R,0,16,5,5,x.x-3,x.y-3,5,5),Y(),f&&requestAnimationFrame($)}let Z,G,J;window.addEventListener("load",(()=>{document.addEventListener("keydown",(a=>{if(A.launchTime>0)return;let i=/^[A-Za-z0-9\s\.\,\?\!\']$/;["Tab"].includes(a.key)&&(a.stopPropagation(),a.preventDefault()),n.active?(a.key.match(i)&&n.txt.length<40&&(n.txt=n.txt+a.key),"Escape"!=a.key&&"Tab"!=a.key||(n.active=!1),"Backspace"==a.key&&n.txt.length&&(n.txt=n.txt.substring(0,n.txt.length-1)),"Enter"==a.key&&(n.txt.length?(t.emit("chat",0,n.txt,U.username),n.active=!1,n.txt=""):n.active=!1)):U.active?"Tab"==a.key?n.active=!0:g[a.key]=!0:(a.key.match(i)&&U.username.length<11&&(U.username+=a.key),"Backspace"==a.key&&U.username.length>0&&(U.username=U.username.substring(0,U.username.length-1)),"Enter"==a.key&&U.username.length&&(f=!1,E.viewport.following=U,t=io({"sync disconnect on unload":!0,upgrade:!1,transports:["websocket"]}),t.on("connect",(function(){e=!0,U.sessionId=t.id})),t.on("playerDisconnect",(function(e){for(let f=0;f<E.players.length;f++)E.players[f].sessionId==e&&(t.emit("chat",1,E.players[f].username+" left the dungeon"),E.players.splice(f,1))})),t.on("chat",(function(t){n.chats=t})),t.on("getResults",(function(t){j=t})),t.on("addFrag",(function(t,e){let f=E.players.findIndex((e=>e.sessionId===t));-1!=f&&(E.players[f].frags+=1),0==f&&(Z(...S.frag),P.killed.txt="You killed "+e+"!",P.killed.time=Date.now())})),t.on("itemUpdate",(function(t){b=t})),t.on("claimItem",(function(e,f){0==E.players.findIndex((t=>t.sessionId===f))&&(1==e?(Z(...S.potion),U.health=Math.min(U.health+50,100),P.item.txt="Potion restores health",P.item.time=Date.now()):e>1&&(Z(...S.scroll),U.scroll=e-1,P.item.txt="You picked up a scroll of "+v[e-1],P.item.time=Date.now(),6==e&&t.emit("chat",2,U.username+" just turned invisible")))})),t.on("removeRunes",(function(t){let e=E.players.findIndex((e=>e.sessionId===t));-1!=e&&(E.players[e].runes.length=0)})),t.on("addRune",(function(t,e){let f=E.players.findIndex((e=>e.sessionId===t));-1!=f&&(Z(...S.rune),E.players[f].runes.length>=8&&E.players[f].runes.splice(0,1),E.players[f].runes.push(e))})),t.on("addProjectile",(function(t,e){let f=E.players.findIndex((e=>e.sessionId===t));-1!=f&&(E.players[f].projectiles.push(e),Z(...S.fire))})),t.on("setMatchStatus",(function(t,e){0==E.players.findIndex((e=>e.sessionId===t))&&(A=Object.assign(A,e))})),t.on("startMatch",(function(){A.launchTime=Date.now()})),t.on("stateUpdate",(function(e){if(e.playerId===z)return;let f=!1;for(let t=0;t<E.players.length;++t)if(E.players[t].playerId===e.playerId){delete e.runes,delete e.projectiles,delete e.frags,E.players[t]=Object.assign(E.players[t],e),f=!0;break}f||(E.players.push(e),e.entryTime>U.entryTime&&(t.emit("chat",1,e.username+" entered the dungeon"),0==A.startTime&&U.entryTime>0&&t.emit("startMatch")))})),W(),H(),requestAnimationFrame(L)),$())})),document.addEventListener("keyup",(t=>{g[t.key]=!1})),document.addEventListener("mousemove",(t=>{x.x=Math.round((t.clientX-l.getBoundingClientRect().left)/s),x.y=Math.round((t.clientY-l.getBoundingClientRect().top)/s),U.facing=x.x<160?0:1})),document.addEventListener("mousedown",(e=>{if(1!=e.buttons)return;if(U.dead&&Date.now()>T+1e3&&(T=0,H()),A.ended&&Date.now()>T+5e3&&(T=0,A.ended=!1,W(),H()),0==U.entryTime)return;let f=2==U.scroll?166:100;if(!U.active||Date.now()<o+f)return;if(o=Date.now(),U.health<=0)return;if(5==U.scroll&&(U.scroll=0),4==U.scroll){let e=E.viewport.x+x.x,f=E.viewport.y+x.y;e-=e%I.tileSize,f-=f%I.tileSize;for(let t=1;t<E.players.length;t++)if(C(E.players[t].x,E.players[t].y,16,16,e,f,16,16))return;I.canMoveToXY(e,f)&&t.emit("addRune",{x:e,y:f,remove:!1})}let a=x.x-(U.x-E.viewport.x)+8-16,n=x.y-(U.y-E.viewport.y)+8-16,i=Math.sqrt(a*a+n*n);a/=i,n/=i,U.angle=Math.atan2(n,a),U.angle<0&&(U.angle=Math.PI+(Math.PI+U.angle));const r={x:U.x+8-2.5+Math.floor(10*a),y:U.y+8-2.5+Math.floor(10*n),vx:3*a,vy:3*n,angle:U.angle,bounces:5};if(4!=U.scroll&&t.emit("addProjectile",r),2==U.scroll){let e=q([a,n],10);t.emit("addProjectile",{x:r.x,y:r.y,vx:3*e[0],vy:3*e[1],bounces:0}),e=q([a,n],-10),t.emit("addProjectile",{x:r.x,y:r.y,vx:3*e[0],vy:3*e[1],bounces:0})}})),window.addEventListener("resize",(t=>{F()})),addEventListener("pagehide",(e=>{t.disconnect()})),document.body.appendChild(l),F(),B.onload=async function(){M.imageSmoothingEnabled=!1,M.drawImage(B,0,0,112,64,0,0,112,64);const t=M.getImageData(0,0,112,64);for(let e=0;e<t.data.length;e+=4)t.data[e]<5&&t.data[e+1]<5&&t.data[e+2]>250&&(t.data[e+3]=0);M.clearRect(0,0,h,c),M.putImageData(t,0,0),R=await createImageBitmap(d),$()},B.src="./sprites.png"})),G=.3,Z=(t=1,e=.05,f=220,a=0,n=0,i=.1,o=0,r=1,h=0,c=0,s=0,l=0,u=0,d=0,M=0,m=0,y=0,g=1,x=0,w=0)=>{let p,D,b=Math,v=44100,k=2*b.PI,T=h*=500*k/v/v,S=f*=(1-e+2*e*b.random(e=[]))*k/v,A=0,j=0,P=0,I=1,R=0,B=0,E=0;for(c*=500*k/v**3,M*=k/v,s*=k/v,l*=v,u=v*u|0,D=(a=v*a+9)+(x*=v)+(n*=v)+(i*=v)+(y*=v)|0;P<D;e[P++]=E)++B%(100*m|0)||(E=o?1<o?2<o?3<o?b.sin((A%k)**3):b.max(b.min(b.tan(A),1),-1):1-(2*A/k%2+2)%2:1-4*b.abs(b.round(A/k)-A/k):b.sin(A),E=(u?1-w+w*b.sin(k*P/u):1)*(0<E?1:-1)*b.abs(E)**r*t*.3*(P<a?P/a:P<a+x?1-(P-a)/x*(1-g):P<a+x+n?g:P<D-y?(D-P-y)/i*g:0),E=y?E/2+(y>P?0:(P<D-y?1:(D-P)/y)*e[P-y|0]/2):E),p=(f+=h+=c)*b.cos(M*j++),A+=p-p*d*(1-1e9*(b.sin(P)+1)%2),I&&++I>l&&(f+=s,S+=s,I=0),!u||++R%u||(f=S,h=T,I=I||1);return(t=J.createBuffer(1,D,v)).getChannelData(0).set(e),(f=J.createBufferSource()).buffer=t,f.connect(J.destination),f.start(),f},J=new(window.AudioContext||webkitAudioContext);