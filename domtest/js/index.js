window.onload = function(){
	skill_show();
	addAllNum();
	tip_show();
}

function skill_show(){
	var skill = document.getElementById("skill");
	if(skill){
		var skillList = skill.getElementsByTagName("li");
		for(var i=0; i<skillList.length; i++){
			skillList[i].addEventListener("mouseover",function(){
				for(var j=0; j<skillList.length; j++){
					skillList[j].className="";
				};
				this.className = "skill_show";
			})
		}
	}
}

function addAllNum(){
	var point = document.getElementById("point");
	if(point){
		var pointUls = point.getElementsByTagName("ul");
		for(var i=0; i<pointUls.length; i++){
			addNum(pointUls[i]);
		};
	}
}

function addNum(ul){
	var lis = ul.getElementsByTagName("li");
	var num = ul.getAttribute("addNum").split(",");
	for(var i=0; i<lis.length; i++){
		for(var j=0; j<num.length; j++){
			if(i==num[j]-1){
				lis[i].innerHTML=num[j];
				lis[i].setAttribute("style","border: 1px solid #5a2626");
			}
		}
	}
}

function tip_show(){
	var tip = document.getElementById("tip");
	if(tip){
		var tipList = tip.getElementsByTagName("li");
			for(var i=0; i<tipList.length; i++){
				tipList[i].addEventListener("mouseover",function(){
					for(var j=0; j<tipList.length; j++){
						tipList[j].className="";
					};
					this.className="tip_show";
				})
			}
		}
	}
