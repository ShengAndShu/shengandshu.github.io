$(function(){
	$('#pagepiling').pagepiling({
		navigation: {
			tooltips: ["关于我","我的作品","我的技能","我的经历","联系我"],
			position: "right"
		},
		scrollingSpeed: 600,
		css3: true,
		anchors: ["page1","page2","page3","page4","page5"],
		keyboardScrolling: false
	});
	$("#demo-2-show").click(function(){
		$("#demo-mask").css({"display":"block"});
		$("#demo-show").css({
			"display":"block",
			"width":350,
			"height":300
		}).html("<canvas id='colorClock'></canvas> <div id='show-close'>X</div>");
		$("#colorClock").colorClock({
			canvasWidth: 350,
			canvasHeight: 300,
			paddingTop: 50
		});
		$('#demo-mask,#show-close').click(function(){
			$("#demo-mask").css({"display":"none"});
			$("#demo-show").css({"display":"none"}).html("");
		});
	});
	$("#demo-3-show").click(function(){
		$("#demo-mask").css({"display":"block"});
		$("#demo-show").css({
			"display":"block",
			"width":350,
			"height":300
		}).html("<canvas id='snake'></canvas> <div id='show-close'>X</div>");
		$("#snake").snake({
			row: 50,
			col: 30,
			keyWidth: 50
		});
		$('#demo-mask,#show-close').click(function(){
			$("#demo-mask").css({"display":"none"});
			$("#demo-show").css({"display":"none"}).html("");
		});
	});
});