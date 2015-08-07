/*
*	Author:LiangJingxian
*	useage:
*		dragM(选择器)
*			eg: dragM('#box');
*		dragM(选择器,json)
* 			eg: drarM('#box',{
* 					'y','false',//不允许在y轴上拖拽
*                   'limit','false',  //是否限制最小边框
*					'moveTop',function(){
* 							//向上拖的时候触发函数(moveLeft,moveRight,moveBottom)
* 						 }
*					'end',function(){
*							//拖拽完成之后触发的函数 
* 						 }
* 				})
*/
function dragM(obj,json){
		var oDiv = document.querySelector(obj);
		json = json || {};
		json.obj = oDiv; 
		json.x = json.x || "true" ;
		json.y = json.y || "true";
		json.limit = json.limit || "true";
		json.Tx = json.Tx || 0;
		json.Ty = json.Ty || 0;
		oDiv.addEventListener("touchstart",function(ev){
			var disX = ev.targetTouches[0].pageX-json.Tx;
			var disY = ev.targetTouches[0].pageY-json.Ty;
			function fnMove(ev){
				 if(json.x=="true"){
				 	json.Tx = ev.targetTouches[0].pageX-disX;
				 	if(json.limit =="true"){
				 		if(json.Tx<-(oDiv.offsetLeft)){
						 	json.Tx = -(oDiv.offsetLeft);
						}
						if(json.Tx>(document.documentElement.clientWidth-oDiv.offsetLeft-oDiv.offsetWidth)){
						 	json.Tx = document.documentElement.clientWidth-oDiv.offsetLeft-oDiv.offsetWidth;
						}
				 	}
					if(json.Tx<-10){
						json.moveLeft&&json.moveLeft();
					}else if(json.Tx>10){
						json.moveRight&&json.moveRight();
					}
				}else{
				 	json.Tx = 0;
				}
				if(json.y=="true"){
				 	json.Ty = ev.targetTouches[0].pageY-disY;
					if(json.limit =="true"){
						if(json.Ty<-(oDiv.offsetTop)){
						 	json.Ty=-(oDiv.offsetTop);
						};
						if(json.Ty>(document.documentElement.clientHeight-oDiv.offsetTop-oDiv.offsetHeight)){
						 	json.Ty = document.documentElement.clientHeight-oDiv.offsetTop-oDiv.offsetHeight;
						}
					}
					if(json.Ty<-10){
						json.moveTop&&json.moveTop();
					}else if(json.Ty>10){
						json.moveBottom&&json.moveBottom();
					}
				}else{
					json.Ty = 0; 	
				}
				json.move&&json.move();
				oDiv.style.WebkitTransform = "translate("+json.Tx+"px,"+json.Ty+"px)";
			}
			document.addEventListener("touchmove",fnMove,false);
			function fnEnd(ev){
				json.end&&json.end(); 
				document.removeEventListener("touchmove",fnMove,false);
				document.removeEventListener("touchend",fnMove,false);
				
			}
			document.addEventListener("touchend",fnEnd,false);
			ev.preventDefault();
			return false;
		},false);
}