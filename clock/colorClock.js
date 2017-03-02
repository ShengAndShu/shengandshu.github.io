jQuery.fn.colorClock=function(options){
    var $options=$.extend({
        clockColor:"rgb(200,200,200)",
        canvasWidth:Math.round($(document).innerWidth()/4),
        canvasHeight:Math.round($(document).innerHeight()/4),
        paddingLeft:Math.round($(document).innerWidth()/80),
        paddingTop:Math.round($(document).innerHeight()/80),
        maxBalls:300,
        },options);
    
    var clockColor=$options.clockColor,
        canvasWidth=$options.canvasWidth,
        canvasHeight=$options.canvasHeight,
        paddingLeft=$options.paddingLeft,
        paddingTop=$options.paddingTop,
        maxBalls=$options.maxBalls;
    var RADIUS=Math.min(Math.round(canvasWidth*4/5/108)-1,Math.round(canvasHeight/30)-1); 
    var balls=[];
    var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
    var currentTime=new Date();

    this[0].width=canvasWidth;
    this[0].height=canvasHeight;
    this.css({
        "position":"absolute",
        "z-index":"99"
    });
    var context=this[0].getContext("2d");
    setInterval(function(){
            render(context);
            update();
        },50);

    //绘制单个数字
    function renderDigit(x,y,num,cxt){
        cxt.fillStyle=clockColor;   
        for(i=0;i<digit[num].length;i++)
            for(j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j]==1){
                    cxt.beginPath();
                    cxt.arc(x+j*2*(RADIUS+1)+RADIUS+1,y+i*2*(RADIUS+1)+RADIUS+1,RADIUS,0,2*Math.PI);
                    cxt.closePath();
                    cxt.fill();
                }
            }        
    }

    //绘制所有数字和运动彩色小球
    function render(cxt){
        var curHour=currentTime.getHours();
        var curMinuter=currentTime.getMinutes();
        var curSecond=currentTime.getSeconds();
        cxt.clearRect(0,0,canvasWidth,canvasHeight);
        renderDigit(paddingLeft,paddingTop,parseInt(curHour/10),cxt);
        renderDigit(paddingLeft+15*(RADIUS+1),paddingTop,parseInt(curHour%10),cxt);
        renderDigit(paddingLeft+30*(RADIUS+1),paddingTop,10,cxt);
        renderDigit(paddingLeft+39*(RADIUS+1),paddingTop,parseInt(curMinuter/10),cxt);
        renderDigit(paddingLeft+54*(RADIUS+1),paddingTop,parseInt(curMinuter%10),cxt);
        renderDigit(paddingLeft+69*(RADIUS+1),paddingTop,10,cxt);
        renderDigit(paddingLeft+78*(RADIUS+1),paddingTop,parseInt(curSecond/10),cxt);
        renderDigit(paddingLeft+93*(RADIUS+1),paddingTop,parseInt(curSecond%10),cxt);  
        for(i=0;i<balls.length;i++){
            cxt.fillStyle=balls[i].color;
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2);
            cxt.closePath();
            cxt.fill();
        }   
    }

    //数字变化时产生彩色小球
    function update(){
        var nextTime=new Date();
        var nextHour=nextTime.getHours();
        var nextMinuter=nextTime.getMinutes();
        var nextSecond=nextTime.getSeconds();
        
        var curHour=currentTime.getHours();
        var curMinuter=currentTime.getMinutes();
        var curSecond=currentTime.getSeconds();

        if(nextSecond!=curSecond){
            if(parseInt(curHour/10)!=parseInt(nextHour/10)){
                addBalls(paddingLeft,paddingTop,parseInt(nextHour%10));
            }
            if(parseInt(curHour%10)!=parseInt(nextHour%10)){
                addBalls(paddingLeft+15*(RADIUS+1),paddingTop,parseInt(nextSecond%10));
            }
            if(parseInt(curMinuter/10)!=parseInt(nextMinuter/10)){
                addBalls(paddingLeft+39*(RADIUS+1),paddingTop,parseInt(nextHour%10));
            }
            if(parseInt(curMinuter%10)!=parseInt(nextMinuter%10)){
                addBalls(paddingLeft+54*(RADIUS+1),paddingTop,parseInt(nextSecond%10));
            }
            if(parseInt(curSecond/10)!=parseInt(nextSecond/10)){
                addBalls(paddingLeft+78*(RADIUS+1),paddingTop,parseInt(nextHour%10));
            }
            if(parseInt(curSecond%10)!=parseInt(nextSecond%10)){
                addBalls(paddingLeft+93*(RADIUS+1),paddingTop,parseInt(nextSecond%10));
            }
            currentTime=nextTime;
        }
        updateBalls();
    }

    //单个运动彩色小球
    function addBalls(x,y,num){
        for(i=0;i<digit[num].length;i++)
            for(j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j]==1){
                    var aBall={
                        x:x+j*2*(RADIUS+1)+RADIUS+1,
                        y:y+i*2*(RADIUS+1)+RADIUS+1,
                        g:0.5+Math.random(),
                        vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                        vy:-5,
                        color:colors[Math.floor(Math.random()*colors.length)]
                    }
                    balls.push(aBall);
                }
            }
    }

    //彩色小球运动路径，范围，最大数量
    function updateBalls(){
        for(var i=0;i<balls.length;i++){
            balls[i].x+=balls[i].vx;
            balls[i].y+=balls[i].vy;
            balls[i].vy+=balls[i].g;
            if(balls[i].y>=canvasHeight-RADIUS){
                balls[i].y=canvasHeight-RADIUS;
                balls[i].vy=-balls[i].vy*0.75;
            }
        }

        var cnt=0;
        for(var i=0;i<balls.length;i++){
            if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<canvasWidth){
                balls[cnt]=balls[i];
                cnt++;
            }
        }
        while(balls.length>Math.min(300,cnt)){
            balls.pop();
        }
    }

    digit =
    [
        [
            [0,0,1,1,1,0,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,0,1,1,0],
            [0,0,1,1,1,0,0]
        ],//0
        [
            [0,0,0,1,1,0,0],
            [0,1,1,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [1,1,1,1,1,1,1]
        ],//1
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,0,0,0,1,1],
            [1,1,1,1,1,1,1]
        ],//2
        [
            [1,1,1,1,1,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,0,0,1,1,0],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//3
        [
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,1,0],
            [0,0,1,1,1,1,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,1,1,0],
            [1,1,1,1,1,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,1,1]
        ],//4
        [
            [1,1,1,1,1,1,1],
            [1,1,0,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,1,1,1,1,0],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//5
        [
            [0,0,0,0,1,1,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,0,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//6
        [
            [1,1,1,1,1,1,1],
            [1,1,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0]
        ],//7
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//8
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,1,1,0,0,0,0]
        ],//9
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ]//:
    ];

};

