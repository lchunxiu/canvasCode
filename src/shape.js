var ctx = undefined;

document.body.onload = function () {
    /* 获取画布上下文 */
    var canvas = document.getElementById('myCanvas');
    if (!canvas.getContext) {
        return;
    }
    ctx = canvas.getContext('2d');
    
    let ox=0,oy=0;

    /* 矩形 */
    ctx.fillRect(0,0,100,100);
    ctx.clearRect(10,10,80,80);
    ctx.strokeRect(20,20,60,60);

    ox=100;
    oy=0;

    /* 三角形 */
    /* 注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，
        所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。 */
    ctx.beginPath();
    ctx.moveTo(ox+50,oy+50);
    ctx.lineTo(ox+75,oy+25);
    ctx.lineTo(ox+75,oy+75);
    ctx.fill();

    ox=200;
    oy=0;

    /* 笑脸 */
    ctx.beginPath();
    ctx.moveTo(ox+100,oy+50);
    ctx.arc(ox+50,oy+50,50,0,Math.PI*2,true);
    ctx.moveTo(ox+85,oy+50);
    ctx.arc(ox+50,oy+50,35,0,Math.PI,false);
    ctx.moveTo(ox+75,oy+30); 
    ctx.arc(ox+70,oy+30,5,0,Math.PI*2,true);//右眼
    ctx.moveTo(ox+35,oy+30); 
    ctx.arc(ox+30,oy+30,5,0,Math.PI*2,true);//左眼
    ctx.closePath();
    ctx.stroke();

    ox=310;
    oy=0;
    /* 两种三角形 */
    ctx.beginPath();
    ctx.moveTo(ox,oy+100);
    ctx.lineTo(ox,oy+10);
    ctx.lineTo(ox+90,oy+100);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(ox+10,oy);
    ctx.lineTo(ox+90,oy);
    ctx.lineTo(ox+90,oy+90);
    ctx.closePath();
    ctx.stroke();

    ox=410;
    oy=10;
    ctx.stroke(roundedRect(ox,oy,50,50,20));



}

function roundedRect(x,y,width,height,radius){
    var ctx = new Path2D();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+height-radius);
    ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    ctx.lineTo(x+width-radius,y+height);
    ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    ctx.lineTo(x+width,y+radius);
    ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    ctx.lineTo(x+radius,y);
    ctx.quadraticCurveTo(x,y,x,y+radius);
    return ctx;
  }

