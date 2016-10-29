function bodyScale(){
var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/640;
	document.body.style.zoom=scale;
}
window.onload=window.onresize=function(){
	bodyScale();
	var box = document.getElementById("box");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	var bossimg = document.getElementById("bossimg");
	var boss = document.getElementById('boss');
	var btn = document.getElementById("iconfont");
	var btnbg = document.getElementById("start");
	var jifen = document.getElementById("jifen");
	var gameOver = document.getElementById("gameover");
	var again = document.getElementById("again");
	var arr = [];
	var timer=null;
	var tag = true;
	var num = 0;
	var shu=0;
	arr[0]={left:"300px",bottom:"300px"};
	for (var i = 1; i < 20; i++) {
		creat(i);
	}
	btn.addEventListener("touchend",function(){
		btnbg.style.display = "none";
		jifen.innerHTML = shu;
		left.addEventListener("touchend",function(){
			bossimg.src="left.png";
			if(tag==true){
				startmove();
			}
			tag=false;
			shu++;
			jifen.innerHTML = shu;
			box.style.left= parseInt(box.style.left)+70+"px"
			box.style.bottom = parseInt(box.style.bottom)-75+"px";
			if(arr[shu].panding==-1){
				creat(arr.length-1);
			}else{
				boss.style.bottom = "-100px";
				gameOver.style.display="block";
				totalScore(jifen.innerHTML);
				clearInterval(timer);
			}	
		},true);
		right.addEventListener("touchend",function(){
			bossimg.src="right.png"
			if(tag==true){
				startmove();
			}
			tag=false;
			shu++;
			jifen.innerHTML = shu;
			if(arr[shu].panding==1){
				creat(arr.length-1);
			}else{
				boss.style.bottom = "-100px";
				gameOver.style.display="block";
				totalScore(jifen.innerHTML);
				clearInterval(timer);
			}
			box.style.left= parseInt(box.style.left)-70+"px"
			box.style.bottom = parseInt(box.style.bottom)-75+"px";
		},true);
	},true);

// 创建
function creat(n){
	var ran=Math.random()>0.5?-1:1;
	arr.push({left:parseInt(arr[arr.length-1].left)+70*ran+"px",
	bottom:(arr.length)*75+'px',panding:ran});
	arr[n]={left:parseInt(arr[n-1].left)+70*ran+"px",bottom:parseInt(arr[n-1].bottom)+75+'px',panding:ran};
	var ul = document.createElement("ul");
	var li1 = document.createElement("li");
	var li2 = document.createElement("li");
	var li3 = document.createElement("li");
	var li4 = document.createElement("li");
	var li5 = document.createElement("li");
	var li6 = document.createElement("li");
	var div = document.createElement("div");
	div.className = "all";
	ul.appendChild(li1);
	ul.appendChild(li2);
	ul.appendChild(li3);
	ul.appendChild(li4);
	ul.appendChild(li5);
	ul.appendChild(li6);
	div.style.left = arr[n].left;
	div.style.bottom = arr[n].bottom;
	div.appendChild(ul);                    
	box.appendChild(div);
}
// 计时器
function startmove(){
	//1级
	if(shu>=0 && shu<50){
		timer=setInterval(function(){
			var all=document.getElementsByClassName('all')[0];
			box.removeChild(all);
			if(num>=shu){
				boss.style.bottom="-100px";
				gameOver.style.display="block";
				totalScore(jifen.innerHTML);
				clearInterval(timer);
			}
			num++;
			//2级
			if(shu>=50 && shu<100){
				num--;
				clearInterval(timer);
				timer=setInterval(function(){
					var all=document.getElementsByClassName('all')[0];
					box.removeChild(all);

					if(num>=shu){
						boss.style.bottom="-100px";
						gameOver.style.display="block";
						totalScore(jifen.innerHTML);
						clearInterval(timer);
					}
					num++;
					//3级
					if(shu>=100 && shu<150){
						num--;
						clearInterval(timer);
						timer=setInterval(function(){
							var all=document.getElementsByClassName('all')[0];
							box.removeChild(all);
							if(num>=shu){
								boss.style.bottom="-100px";
								gameOver.style.display="block";
								totalScore(jifen.innerHTML);
								clearInterval(timer);
							}
							num++;
						},250)
					}
				},500)
			}

		},1000)
	}
	
	

}
// 总得分
function totalScore(fen){
	var zongfen = document.getElementById("zongfen");
	zongfen.innerHTML=fen;
}
again.addEventListener("touchend",function(){
	gameOver.style.display= "none";
	location.reload();
	
},true)
}





