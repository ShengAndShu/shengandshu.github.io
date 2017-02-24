jQuery.fn.snake=function(options){
    var $options=$.extend({
        color: ["#000","#ff7600"],
        speed: 200,
        row: 30,
        col: 30,
        keyWidth: 50,
        },options);
    
    var color=$options.color;
    var speed=$options.speed;
    var row=$options.row;
    var col=$options.col;
    var keyWidth=$options.keyWidth;

    var s = [{
            x: 10,
            y: 9
        }, {
            x: 10,
            y: 8
        }];
    var f = null;
    var co = 40;
    var offOn=true;
    var offOn01=true;
    var num=3;
    var level=1;
    
    var $_canvas=this;
    var context = $_canvas[0].getContext("2d");
    $_canvas[0].width=row*10;
    $_canvas[0].height=col*10;
    $_canvas.css({
        "border":"1px solid #d3d3d3"
    });
    
    addKeys($_canvas);
    var timer=setInterval(function(){render(context)}, speed);

    function render(ctx) {
        ctx.shadowBlur = 20;
        if (gameOver()){
            return;
        }

        snakeUpdate();
        ctx.clearRect(0, 0, row*10, col*10);
        renderSnake(ctx);
        renderFood(ctx);
        renderScore(ctx);

        if (gameOver()){
            renderGameOver(ctx);
            return;
        }
        ChangeLevel(ctx);
        offOn=true;
    }

    //绘制蛇
    function renderSnake(ctx){
        ctx.fillStyle = color[level-1];
        ctx.shadowColor = color[level-1];
        for (var i = 0; i < s.length; i++) ctx.fillRect(s[i].x * 10, s[i].y * 10, 10, 10);
    }

    //绘制食物
    function renderFood(ctx){
        //如果没有食物，则在随机位置上加入一粒食物；如果e在蛇身重合，则重新给食物赋值
        while (f == null || check(f)) f = {
            y: (Math.random() * col >>> 0),
            x: (Math.random() * row >>> 0)
        };
        ctx.fillStyle = color[0];
        ctx.shadowColor = color[0];
        if (f) ctx.fillRect(f.x * 10, f.y * 10, 10, 10);
    }

    //绘制分数
    function renderScore(ctx){
        ctx.fillStyle="#888";
        ctx.shadowBlur=0;
        ctx.textBaseline="top";
        ctx.textAlign="left";
        ctx.font="15px Arial";
        ctx.fillText("分数:"+(s.length - 2)+"  关卡:"+level,10,10);
    }

    function renderGameOver(ctx){
        ctx.fillStyle="#000";
        ctx.shadowBlur=0;
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        ctx.font="25px Arial";
        ctx.fillText("game over\n你获得：" + (s.length - 2) + "分",row*5,col*5);
    }

    //切换关卡
    function ChangeLevel(ctx){
        if((s.length-2)==10){
            if(offOn01){
            clearInterval(timer);
            offOn01=false;
            var timer0=setInterval(function(){
                if(num<=0){
                    clearInterval(timer0);
                }
                ctx.clearRect(0, 0, row*10, col*10);
                ctx.font="20px Arial";
                ctx.textBaseline="middle";
                ctx.textAlign="center";
                ctx.fillText("下一关:"+num,row*5,col*5);
                num=--num<0?0:num;  
            },1000);
                setTimeout(function(){
                    level=2;
                    timer=setInterval(function(){render(ctx)}, speed/2);
                },4000);
            }
        }
    }

    //控制蛇的移动
    //蛇尾通过s.unshift(s.pop())移动到蛇头，并给蛇尾的坐标重新赋值
    //如果蛇头碰到食物，先将食物unshift到蛇头，再将蛇尾移动到蛇头
    function snakeUpdate(){
        f != null && ((co == 40 &&s[0].x == f.x && s[0].y + 1 == f.y) ||
        (co == 38 && s[0].x == f.x && s[0].y - 1 == f.y) || (co == 37 && s[0].x - 1 == f.x && s[0].y == f.y) ||
        (co == 39 && s[0].x + 1 == f.x && s[0].y == f.y)) ? (s.unshift(f), f = null, s.unshift(s.pop())) : (s.unshift(s.pop()));
        //根据方向，重新设定蛇数组首元素的坐标，从而进行移动
        (co == 40 || co == 38) ? (s[0].x = s[1].x, s[0].y = s[1].y + (co == 40 ? 1 : -1)) : (s[0].x = s[1].x + (co == 39 ? 1 : -1), s[0].y = s[1].y);
    }

    //判断是否gameover
    function gameOver(){
        if (check(s[0], 0) || s[0].x < 0 || s[0].x >= row || s[0].y < 0 || s[0].y >= col){
            return true;
        }
        else{
            return false;
        }
    }

    //判断指定位置是否与蛇重叠
    //check(r[0],0)检测蛇头是否与蛇身重叠
    //check(e)检测实物是否与蛇身重叠
    function check(f, j) {
        for (var i = 0; i < s.length; i++)
            if (j != i && s[i].x == f.x && s[i].y == f.y) return true;
        return false;
    }

    //加入键盘事件，用方向键来控制蛇前进的方向
    /*(Math.abs(event.keyCode - co) != 2判断不能向后走
    left:37,top:38,right:39,bottom:40
    反方向刚刚好是相差2
    */
    document.onkeydown = function(event) {
        if(offOn){
            offOn = false;
            co = event.keyCode >= 37 && event.keyCode <= 40 && (Math.abs(event.keyCode - co) != 2) ? event.keyCode : co;
        }
    }

    //加入屏幕模拟按键
    function addKeys(c){
        var key = "<div id='key'><div>↑</div><div>→</div><div>↓</div><div>←</div></div>";
        c.after(key);
        var keys = $("#key").children();
        $("#key").css({
            "fontSize":keyWidth*0.9+"px",
            "fontWeight":"bold",
            "width":keyWidth*3+"px",
            "height":keyWidth*3+"px",
            "position":"relative"
        });
        keys.css({
            "border":"none",
            "width":keyWidth+"px",
            "height":keyWidth+"px",
            "position":"absolute",
            "backgroundColor":"#888",
            "textAlign":"center",
            "lineHeight":keyWidth+"px",
            "cursor":"default"
        });
        keys.eq(0).css({
            "left":keyWidth+"px",
            "top":"0"
        }).on("click",function(){co=co!=40?38:co});
        keys.eq(1).css({
            "left":keyWidth*2+"px",
            "top":keyWidth+"px"
        }).on("click",function(){co=co!=37?39:co});
        keys.eq(2).css({
            "left":keyWidth+"px",
            "top":keyWidth*2+"px"
        }).on("click",function(){co=co!=38?40:co});
        keys.eq(3).css({
            "left":"0",
            "top":keyWidth+"px"
        }).on("click",function(){co=co!=39?37:co});
    }
}