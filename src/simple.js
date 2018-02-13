var ctx = undefined;

document.body.onload = function () {
    /* 获取画布上下文 */
    var canvas = document.getElementById('myCanvas');
    if (!canvas.getContext) {
        return;
    }
    ctx = canvas.getContext('2d');

    /* 红色矩形 */
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.fillRect(0,0,100,100);

    /* 蓝色半透明矩形 */
    ctx.fillStyle = 'rgba(0,0,200,0.5)';
    ctx.fillRect(50,50,100,100);
}

