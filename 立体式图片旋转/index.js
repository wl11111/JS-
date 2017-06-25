var box = document.getElementById('box');
var pics = box.getElementsByClassName('pic');
var ovs = box.getElementsByClassName('over');

/*----------------- 初始化样式 --------------------------------------------------------*/

//给box下的每个div添加背景图
for(var i=0;i<pics.length;i++){
	pics[i].style.backgroundImage = 'url(images/0'+(i+1)+'.jpg)';
}
//给box下的每个div添加transform属性
var m=8;
var timer = null;
timer = setInterval(function(){
	pics[m].style.transform = 'rotateY('+(m*40)+'deg)'+' translateZ(354.647px)';
	
	//添加倒影图
	/*线性渐变 ：*/
	ovs[m].style.background = '-webkit-linear-gradient(top,rgba(0,0,0,0.9) 50%,rgba(255,255,255,0)),url(images/0'+(m+1)+'.jpg)';
	ovs[m].style.opacity = 0.4;
	
	m--;
	if(m<0){
		clearInterval(timer);
	}
},200)

/*--------------------- 鼠标拖拽 ----------------------------------------------------*/

//调用移动函数,改变box的transform:rotateX() rotateY();
var degX = -10;//box旋转角度
var degY = 0;
var p = 2000;//初始景深
box.onOff = true;
moveFn(box);


//封装移动函数
function moveFn(obj){
	document.onmousedown = function(ev){
		if(obj.onOff){
			ev = ev || window.event;
			ev.preventDefault();
			var oldX = 0;
			var oldY = 0;
			document.onmousemove = function(ev){
				ev = ev || window.event;
				if(oldX==0||oldY==0){
					oldX = ev.clientX;
					oldY = ev.clientY;
				}
				//绕X轴旋转
				degX += (oldY-ev.clientY)/10;
				//绕Y轴旋转
				degY += (ev.clientX-oldX)/10;
				//记录上一个值
				oldX = ev.clientX;
				oldY = ev.clientY;
				obj.style.transform = 'perspective('+p+'px) rotateX('+degX+'deg)'+' rotateY('+degY+'deg)';
				
			}
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
	}
}


/*------------------------ 鼠标滚轮 缩放 ----------------------------------------------*/


addMouseScroll({
	ele:document,
	fnDown:function(){
		p += 100;
		if(p>4100){
			p=4100;
		}
		box.style.transform = 'perspective('+p+'px) rotateX('+degX+'deg)'+' rotateY('+degY+'deg)';
	},
	fnUp:function(){
		p -= 100;
		if(p<300){
			p=300;
		}
		box.style.transform = 'perspective('+p+'px) rotateX('+degX+'deg)'+' rotateY('+degY+'deg)';
	}
})

var timer2 = null;
//封装滚轮函数
function addMouseScroll(init){
	
		init.ele.onmousewheel = fn
		init.ele.addEventListener('DOMMouseScroll',fn)
		function fn(ev){
			if(box.onOff){
				ev = ev || window.event;
				var onOff = null;
				//true:向上，false:向下
				if(ev.wheelDelta){
					//谷歌，ie
					onOff = ev.wheelDelta>0?true:false;
				}else{
					//火狐
					onOff = ev.detail<0?true:false;
				}
				if(onOff){
					typeof init.fnUp == 'function' && init.fnUp();
				}else{
					typeof init.fnDown == 'function' && init.fnDown();
				}
			}
		}
	
	
}

/*-------------------------------  双击图片 ---------------------------------------*/
var box2 = document.getElementById('box2');
var oPs = box2.getElementsByTagName('p');

for(var i=0;i<pics.length;i++){
	pics[i].index = i ;
	pics[i].ondblclick = function(ev){
		if(ev.target.className != 'over'){
			if(box.onOff){
				/*------------------------------- 旋转立方体 ------------------------------*/
				for(var j=0;j<oPs.length;j++){
					oPs[j].style.background = 'url(images/0'+(this.index+1)+'.jpg)';
					oPs[j].style.backgroundSize = '100px 100px';
				}
				
								
				box.onOff = false;
				ev.target.style.transform = 'rotateY('+(-degY)+'deg)'+' translateZ(500px) scale3d(1.5,1.5,1.5)';
				box.style.transform = 'rotateX('+(-15)+'deg) rotateY('+degY+'deg) scale3d(0.5,0.5,0.5)';
				var dg = degY;
				
				setTimeout(function(){
					timer2 = setInterval(function(){
						dg -= 5;
						ev.target.style.transform = 'rotateY('+(-dg)+'deg)'+' translateZ(500px) scale3d(1.5,1.5,1.5)';
						box.style.transform = 'rotateX('+(-15)+'deg) rotateY('+degY+'deg) scale3d(0.5,0.5,0.5)';
						document.onclick = function(){
							clearInterval(timer2);
							box.onOff = true;
							ev.target.style.transform = 'rotateY('+(ev.target.index*40)+'deg)'+' translateZ(354.647px)';
							setTimeout(function(){
								if(box.onOff){
									box.style.transform = 'perspective('+p+'px) rotateX('+(degX)+'deg) rotateY('+(degY)+'deg)';
								}
								
							},800)
						}
					},100)
				},500)
				
			}
		}
	}
}




