$(function(){
	$('#pagepiling').pagepiling({
		navigation: {
			tooltips: ["关于我","我的作品","我的技能","我的经历","联系我"],
			position: "right"
		},
		scrollingSpeed: 600,
		css3: true,
		anchors: ["page1","page2","page3","page4","page5"],
		keyboardScrolling: false,
		onLeave: function(index,nextIndex,direction){
			if(nextIndex==4){
				var $_exp_line = $("#exp-line");
				var $_exp_row_1 = $("#exp-row-1");
				var $_exp_row_2 = $("#exp-row-2");
				var $_exp_row_3 = $("#exp-row-3");
				$_exp_line.css({top:"30%",opacity:"0"});
				$_exp_row_1.css({bottom:"-20%",opacity:"0"});
				$_exp_row_2.css({bottom:"-20%",opacity:"0"});
				$_exp_row_3.css({bottom:"-20%",opacity:"0"});
				$_exp_line.stop(true,true).animate({top:"5%",opacity:"1"},500,function(){
					$_exp_row_1.stop(true,true).animate({bottom:"0",opacity:"1"},500,function(){
						$_exp_row_2.stop(true,true).animate({bottom:"0",opacity:"1"},500,function(){
							$_exp_row_3.stop(true,true).animate({bottom:"0",opacity:"1"},500)
						})
				    })
				})
			}
		}
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