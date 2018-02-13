var ctx = undefined;

document.body.onload = function () {
    /* 获取画布上下文 */
    var canvas = document.getElementById('myCanvas');
    if (!canvas.getContext) {
        return;
    }
    ctx = canvas.getContext('2d');
    ball.draw();
    console.log(canvas.toDataURL())
    getpixelamount(canvas,0,0,0);
}
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


function getpixelamount(canvas, r, g, b){
    var cx = canvas.getContext('2d');
    var pixels = cx.getImageData(0,0,canvas.width,canvas.height);
    var all = pixels.data.length;
    var amount = 0;
    for (i = 0; i < all; i += 4) {
      if (pixels.data[i] === r &&
          pixels.data[i + 1] === g &&
          pixels.data[i + 2] === b) {
        amount++;
      }
    }

    console.log('数量：',amount)
    return amount;
}