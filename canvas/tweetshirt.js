window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;
	makeImage();
}
function previewHandler(){
	var canvas = document.getElementById("tshirtCanvas");
	if (canvas.getContext) {
		var context = canvas.getContext("2d");
		fillBackgroundColor(canvas,context);
		var selectObj = document.getElementById("shape");
		var index = selectObj.selectedIndex;
		var shape = selectObj[index].value;
		// drawText(canvas,context);drawText放这里的话，画布上最后画的圆圈或者方形就会覆盖在字体上，所以要放在圆圈方形代码的后面
		if(shape=="squares"){
			for(var squares = 0;squares<20;squares++){
				drawSquares(canvas,context);
			}
		}
		else if(shape=="circles"){
				for(var circles=0;circles<20;circles++){
					drawCircles(canvas,context);
				}
			}
        drawText(canvas,context);
        drawBird(canvas,context);
	
	} else {
		alert("Hey you,yes YOU,upgrade your brower!!");
	}
}
function drawSquares(canvas,context){
	var w = Math.floor(Math.random()*40);//40作为方块的最大的大小
	var x = Math.floor(Math.random()*canvas.width);//x,y的坐标根据画布的宽度和高度确定。
	var y = Math.floor(Math.random()*canvas.height);//x,y分别是一个介于0到宽/高之间的随机数
	context.fillStyle="lightblue";
	context.fillRect(x,y,w,w);


}
//这个函数使得产生的新方块替换了原来的老方块
function fillBackgroundColor(canvas,context){
	var selectObj = document.getElementById("backgroundColor");
	var index = selectObj.selectedIndex;
	var bgcolor = selectObj[index].value;
	context.fillStyle = bgcolor;
	context.fillRect(0,0,canvas.width,canvas.height);//这个颜色充斥整个画布
}
function drawCircles(canvas,context){
	var radius = Math.floor(Math.random()*40);//40作为远的最大半径
	var x = Math.floor(Math.random()*canvas.width);
	var y =Math.floor(Math.random()*canvas.height);
	context.beginPath();
	context.arc(x,y,radius,0,degreesToRadians(360),true);
	context.fillStyle="lightblue";
	context.fill();

}
function degreesToRadians(degrees){
	return (degrees *Math.PI)/180;
}//把角度转换成弧度
function updateTweets(tweets){
	var tweetsSelection = document.getElementById("tweets");
	for(var i=0;i<tweets.length;i++){
       tweet = tweets[i];
       var option = document.createElement("option");
       option.text = tweet.name;//设置option元素的纯文本
       option.value =  tweet.name.replace("\"","'");//设置option元素的值，且把其中的双引号换成单引号（这样可以避免HTML中的格式化问题）
       tweetsSelection.options.add(option);//把新选项增加到表单中的tweet选择元素
	}
	tweetsSelection.selectedIndex= 0;//最后，将<select>的selectedIndex设置为0，确保选中第一项。
}
function drawText(canvas,context){
	var selectObj = document.getElementById("foregroundColor");
	var index= selectObj.selectedIndex;
	var fgColor = selectObj[index].value;
	context.fillStyle=fgColor;
	context.font="bold 1em sans-serif";
	context.textAlign="left";
	context.fillText("I saw this tweet",20,40);

	selectObj=document.getElementById("tweets");
	index = selectObj.selectedIndex;
	var tweet = selectObj[index].value;
	context.font="italic 1.2em sans-serif";
	context.textAlign="left";//这行代码可以没有，因为前面已经设置了对齐方式
	context.fillText(tweet,30,100);

	//如果是很长的内容，则当内容超过画布边界就不会显示出来了。所以解决办法就是
	//查看内容包含多少的字符，大于某个数就把它分成多行，单独把各行绘制到画布中。
	// if(tweet.length>60){
	// 	var tweetLines = splitIntoLines(tweet);
	// 	for (var i=0;i<tweetLines.length;i++){
    //             context.fillText(tweetLines[i],30,70+(i*25));
	// 	}
	// }
	// else{
	// 	context.fillText(tweet,30,100);
	// }

	context.font="bold 1em sans-serif";
	context.textAlig="right";
	context.fillText("and all I got was this lousy t-shirt!",canvas.width-320,canvas.height-40);

}
function drawBird(canvas,context){
	var twitterBird = new Image();
	twitterBird.src = "twitterBird.png";
	twitterBird.onload=function(){
		context.drawImage(twitterBird,20,120,70,70);
	};
	
}

//把一个长的字符串分解成短的字符串，并放入数组中
function splitIntoLines(str){
	var strs = new Array();
	var sapce = str.indexOf(" ",60);
	strs[0] = str.substring(0,space);
	strs[1] = str.substring(space+1);
	if(strs[1].length>60){
		space = str[1].indexOf(" ",60);
		strs[2] = strs[1].substring(space+1);
		strs[1] = strs[1].substring(0,space);
	}
	return strs;
}
function makeImage(){
	var canvas = document.getElementById("tshirtCanvas");
    canvas.onclick=function(){
    	window.location = canvas.toDataURL("image/png");//将canvas的内容保存为图片
    }
}





	

