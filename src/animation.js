var ctx = undefined;
var canvas = document.getElementById('myCanvas');

var ball = {
    x:100,
    y:100,
    vx:1,
    vy:3,
    radius:25,
    color:'red',
    draw:function(){
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.arc(this.x+this.radius,this.y,this.radius,0,Math.PI*2,true);
        ctx.fillStyle=this.color;
        ctx.fill();
    }
};

function draw(){
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if(ball.x>=canvas.width || ball.x<=0){
        ball.vx = -ball.vx;
    }
    if(ball.y>=canvas.height || ball.y<=0){
        ball.vy = -ball.vy;
    }
    raf = window.requestAnimationFrame(draw);
}

var raf;
var running = false;
document.body.onload = function () {
    /* 获取画布上下文 */
    if (!canvas.getContext) {
        return;
    }
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mouseover',function(){
        if(running){
            raf = window.requestAnimationFrame(draw);
        }
    });

    canvas.addEventListener('mouseout',function(){
        window.cancelAnimationFrame(raf);
        running = false;
    });

    canvas.addEventListener('click',function(){
        running = true;
        raf = window.requestAnimationFrame(draw);
    }); 

    canvas.addEventListener('mousemove',function(e){
        if(!running){
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(0,0,canvas.width, canvas.height);
            ball.x = e.offsetX;
            ball.y = e.offsetY;
            ball.draw();
        }
    });

}




