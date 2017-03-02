# snake
snake是一个基于jQuery和canvas的游戏插件，它能够在你的页面上插入一个贪吃蛇游戏。
## 使用方法
###1.引入文件
    <script src="jquery.min.js"></script>
    <script src="snake.js"></script> 
###2.HTML
    <canvas id="snake""></canvas>
###3.javascript
    $(function(){
	    $('#snake').snake();
	});
###4.配置
**color**：数组，设置第一关和第二关蛇的颜色，默认["#000","#ff7600"]<br>
**speed**: 整数，设置第一关蛇的速度，默认300<br>
**row**: 整数，设置画布行数，默认30行（即300px,单个方块高10px）<br>
**col**: 整数，设置画布列数，默认30列（即300px,单个方块宽10px）<br>
**keyWidth**: 整数，设置单个虚拟按键的宽度，默认50<br>