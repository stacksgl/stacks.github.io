var ctx,canvas
var imgs = []
var wins = []
var mouse = {x:-55,y:-55}
var mouseHistory = Array(50)
var clicked = false
var holded = false
var mouseDown = 0;
var mouseDownHistory = 0;
wins[0] = [25,25,false]
wins[1] = [90,25,false]
wins[2] = [120,25,false]
window.onload=function() {
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown",keyDown);
    document.addEventListener("mousemove",getMousePos);
    imgs[0] = document.getElementById("first");
    imgs[1] = document.getElementById("second");
    imgs[2] = document.getElementById("third");
    setInterval(render,1)
    document.body.onmousedown = function() { 
    ++mouseDown;
    }
    document.body.onmouseup = function() {
    --mouseDown;
    }

}
function keyDown(e) {
    //console.log(e)
}
var tick = 0;
function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    mouse = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function text(str,x,y,stl,al,sz) {
    ctx.textAlign = ["start","center","right"][al];
    ctx.textBaseline = "top";
    ctx.fillStyle = stl;
    ctx.font = sz+"px Verdana";
    ctx.fillText(str, x, y);
}
function rect(x,y,w,h,stl,f) {
    ctx.beginPath();
    if (f)
    {
        ctx.fillStyle = stl;
        ctx.rect(x, y, w, h);
        ctx.fill();
    }
    else
    {
        ctx.strokeStyle = stl;
        ctx.rect(x, y, w, h);
        ctx.stroke();
    }
}
function circle(x,y,r,stl,f) {
    ctx.beginPath();
    if (f)
    {
        ctx.fillStyle = stl;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }
    else
    {
        ctx.strokeStyle = stl;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
function line(x1,y1,x2,y2,stl) {
    ctx.beginPath();
    ctx.strokeStyle = stl;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function icon(x,y,str,i) { //w,h = hardcoded (s)
    var b = 20 //border
    var s = 75 //size(w,h)
    var ts = 20 //textsize
    var inRect =
    mouse.x > x &&
    mouse.y > y &&
    mouse.x < x+s+(b*2) &&
    mouse.y < y+s+(ts*1.1)+(b*2)
    x += b
    y += b
    var oStyle = "rgba(255,255,255,0)"
    if (inRect) oStyle = "rgba(255,255,255,0.8)"
    var fStyle = "rgba(255,255,255,0)"
    if (inRect) fStyle = "rgba(255,255,255,0.4)"
    rect(x-b,y-b,s+(b*2),s+(ts*1.1)+(b*2),oStyle,false)
    rect(x-b,y-b,s+(b*2),s+(ts*1.1)+(b*2),fStyle,true)
    ctx.drawImage(imgs[i], x, y, s, s);
    text(str,x+(s/2),y+(s)+10,"rgba(255,255,255,255)",1,ts)

    if (inRect && mouseDown == true && mouseDownHistory == false)
    {
        wins[i][2] = true
    }

    //return [w,h]
    return [s+(b*2),s+(ts*1.1)+(b*2)]
}
function win(arr,w,h,title,body)
{
    x = arr[0]
    y = arr[1]
    if (arr[2] == false) return [x,y,false];
    rect(x,y,w,h,"#000000",1)
    rect(x+1,y+1,w-2,h-2,"#FFFFFF",1)
    text(title,x+3,y+3,"#000000",0,20)
    line(x+1,y+29,x+w-1,y+29,"#F2F2F2")
    text(body,x+3,y+31,"#000000",0,20)
    var inRect =
    mouse.x > x &&
    mouse.y > y &&
    mouse.x < x+w &&
    mouse.y < y+29
    var inCross =
    mouse.x > x+w-45 &&
    mouse.y > y &&
    mouse.x < x+w &&
    mouse.y < y+29
    if(inCross) {
        rect(x+w-45,y+1,45-1,29-1,"#FF0000",1)
    }
    text("x",x+w-15,y+3,"#000000",2,20)
    if (mouseDown == true && mouseDownHistory == false && inCross)
    {
        return [x,y,false]
    }
    if (mouseDown && inRect) {
        var corrected = [mouseHistory[48].x - x, mouseHistory[48].y - y]
        
        return [mouse.x - corrected[0],mouse.y - corrected[1]]
    }
    return [x,y,true]
}

function render(){
    //do some things with variables
    console.log(mouseDownHistory,mouseDown)
    tick += 1
    mouseHistory.push(mouse)
    mouseHistory.shift()
    var rgb = 'hsl('+tick%360 +',100%,65%)'
    //resize the canvas
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    //clear the canvas
    ctx.fillStyle = "rgb(25,25,25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    text("stacks",ctx.canvas.width/2,ctx.canvas.height*0.5,rgb,1,40)
    text("made by ma333#3333",ctx.canvas.width/2,ctx.canvas.height*0.8+Math.exp(tick/15),rgb,1,20)
    
    var p = [25,25]//iconpos
    p[1] += icon(p[0],p[1],"smeje se",0)[1] + 25
    p[1] += icon(p[0],p[1],"hack",1)[1] + 25
    p[1] += icon(p[0],p[1]," hacker informace",2)[1] + 25
    
    wins[0] = win(wins[0],255,255,"popadani za bricho", "femboy info web")
    wins[1] = win(wins[1],255,255,"aimware real", "aimware crack real dox")
    wins[2] = win(wins[2],255,255,"@matej.je.dobrej","je femboy ťuťu ňuňu")
    
    //cursor
    circle(mouse.x,mouse.y,7,rgb,true)
    for (var i in mouseHistory) {
        var n = mouseHistory[i] //now
        var b = mouseHistory[i-1] //before
        if (!b) continue;
        line(n.x,n.y,b.x,b.y,rgb)
    }
    //do some things with variables
    mouseDownHistory = mouseDown
}