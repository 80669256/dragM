# dragM
移动端的拖拽框架

今天封装了一套移动端的拖拽框架，专门针对移动端的拖拽，省去了一大堆的麻烦。因为是1.0.0版本，所以大家看到有问题的地方请及时联系我。

注意事项：
	1.所有事件都需要绑定
    2.使用移动端的事件来组成拖拽的步骤，touchstart, touchmove,touchend
    3.关于元素坐标获取不适用之前的clientX(clientY),采用新的targetTouches[0].pageX(targetTouches[0].pageY)
    4.拖拽之后需要执行事件解绑removeEventListener
    5.*因为在做移动端的时候用zepto，当在$(function(){})中执行DOMContentLoaded时候会有问题，所以没有写。

使用手册：
	1.dragM(选择器)
	
	eg: dragM('#box');
	
	2.dragM(选择器,json)
	
	eg: drarM('#box',{
			'y','false',//不允许在y轴上拖拽
		  'limit','false',  //是否限制最小边框
		'moveTop',function(){
					//向上拖的时候触发函数(moveLeft,moveRight,moveBottom)
				 }
		'end',function(){
				//拖拽完成之后触发的函数 
				 }
		})

