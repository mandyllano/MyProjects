window.onload=function(){
	var canvas= document.getElementById("smiley");
	var context = canvas.getContext("2d");

	context.beginPath();//圆脸
	context.arc(300,300,200,0,degreesToRadians(360),true);
	context.fillStyle="#ffffcc";
	context.fill();
	context.stroke();

	context.beginPath();//左眼
	context.arc(200,250,25,0,degreesToRadians(360),true);
	context.stroke();

    context.beginPath();//右眼
	context.arc(400,250,25,0,degreesToRadians(360),true);
	context.stroke();

	context.beginPath();//鼻子
	context.moveTo(300,300);
	context.lineTo(300,350);
	context.stroke();

	context.beginPath();//嘴
	context.arc(300,350,75,degreesToRadians(20),degreesToRadians(160),false);
	context.stroke();

}
function degreesToRadians(degrees){
	return (degrees *Math.PI)/180;
}//把角度转换成弧度