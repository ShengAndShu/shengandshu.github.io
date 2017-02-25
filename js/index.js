$(function(){
	$('#pagepiling').pagepiling({
		navigation: {
			tooltips: ["关于我","我的作品","我的技能","我的经历","联系我"],
			position: "right"
		},
		scrollingSpeed: 600,
		css3: true,
		anchors: ["page1","page2","page3","page4","page5"],
		menu: "#menu",
		keyboardScrolling: false
	});
	$("#demo-2-show").click(function(){
		$("#demo-mask").css({"display":"block"});
		$("#demo-show").css({
			"display":"block"
		}).html("<canvas id='colorClock'></canvas> <div id='show-close'>X</div>");
		$("#colorClock").colorClock({
			canvasWidth: 350,
			canvasHeight: 200,
			paddingTop: 50,
			paddingLeft: 0
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
			"margin-bottom":"200px"
		}).html("<canvas id='snake'></canvas> <div id='show-close'>X</div>");
		$("#snake").snake({
			row: 35,
			col: 20,
			keyWidth: 50
		});
		$('#demo-mask,#show-close').click(function(){
			$("#demo-mask").css({"display":"none"});
			$("#demo-show").css({"display":"none"}).html("");
		});
	});
	$("#menu-wrapper").click(function(){
		$("#menu").slideToggle()
	});
	$(".section").click(function(){
		$("#menu").slideUp()
	});
});