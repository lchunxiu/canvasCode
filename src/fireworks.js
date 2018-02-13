window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();


function getArcRandomPoint(x,y,radius){
    var point = {};
    var randomX = Math.random(),randomY = Math.random();
    point.x = Math.floor(randomX*2*radius+x-radius);
    point.y = Math.floor(randomY*2*radius+y-radius);
    return point;
}

function getRandomColor(){
    return {r:255,g:70,b:31};
}
  
class Particle{
    constructor(config){
        /* 当前2d绘图上下文 */
        this.ctx = config.ctx;

        /* 当前位置，初始为原点位置 */
        this.x = config.source.x;
        this.y = config.source.y;

        /* 起点坐标 */
        this.source = {};
        this.source.x = config.source.x;
        this.source.y = config.source.y;

        /* 终点坐标 */
        this.destination = {};
        this.destination.x = config.destination.x;
        this.destination.y = config.destination.y;

        // /* 运行速度,很坐标是每次3 */
        this.velocity = {};
        this.velocity.x = this.destination.x>this.source.x?1:-1;
        this.velocity.y = (this.destination.y - this.source.y)/((this.destination.x - this.source.x)/this.velocity.x);

        /* 颜色 */
        this.color ={};
        this.color.r = config.color.r;
        this.color.g = config.color.g;
        this.color.b = config.color.b;

        /* 半径 */
        this.radius = config.radius;

        /* 到达终点结束后，可能要爆炸，需要一个回掉函数 */
        this.end = config.end;
    }
    paint(){
        let ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.fill();
        ctx.restore();
    }
    move(){
        this.x = Math.floor(this.x+this.velocity.x);
        this.y = Math.floor(this.y+this.velocity.y);
        if(Math.abs(this.x-this.source.x)>=Math.abs(this.destination.x-this.source.x)
        || Math.abs(this.y-this.source.y)>=Math.abs(this.destination.y-this.source.y)){
            this.end && this.end(this.x-this.velocity.x,this.y-this.velocity.y,this.radius,this.color);
            return false;
        }
        this.paint();
        return true;
    }
}


class FireWork{
    constructor(config){
        /* 当前2d绘图上下文 */
        this.ctx = config.ctx;

        /* 画布的长度和宽度，刷新的时候用 */
        this.canvasWidth = config.canvasWidth;
        this.canvasHeight = config.canvasHeight;

        /* 延迟执行的句柄 */
        this.raf ;

        /* 需要绘制图形方法的集合 */
        this.paintArr = [];

    }
    refresh(){
        let ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = `rgba(0,0,0,0.1)`;
        ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);
        ctx.restore();
    }
    boom(x,y,radius,color){
        var baseConfig = {
            ctx:this.ctx,
            source:{x:Math.floor(x),y:Math.floor(y)},
            color:color,
            radius:radius
        };
        for(let i=0;i<200;i++){
            let destination = getArcRandomPoint(x,y,200);
            let p = new Particle({...baseConfig,destination:destination});
            this.paintArr.push(p.move.bind(p));
        }
    }
    fire(){
        var _this = this;
        var p1 = new Particle({
            ctx:this.ctx,
            source:{x:300,y:380},
            destination:{x:100,y:100},
            color:{r:255,g:70,b:31},
            radius:2,
            end:function(){
                var arg = arguments;
                setTimeout(() => {
                    _this.boom(...arg);
                }, 100);
            }
        });
        
        this.paintArr.push(p1.move.bind(p1));
        this.raf = requestAnimationFrame(this.move.bind(this));
    }
    move(){
        this.refresh();
        this.paintArr = this.paintArr.filter(f=>{
            return f();
        });
        this.raf = requestAnimationFrame(this.move.bind(this));
    }

}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
let firework = new FireWork({
    ctx:ctx,
    canvasWidth:canvas.width,
    canvasHeight:canvas.height
});
firework.fire();
