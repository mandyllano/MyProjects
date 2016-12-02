var position =0;
var playlist;
var video;
window.onload=function(){
	playlist = ["../video/preroll","../video/areyoupopular",
	"../video/destinationearth"];
	video = document.getElementById("video");
	video.addEventListener("ended",nextVideo,false)  
	//一个视频要结束并停止播放时就会发生ended事件
	video.src = playlist[position]+getFormatExtension();
	video.load();//加载视频
	video.play();//播放视频
	video.addEventListener("error",errorHandler,false);

}
//注意，如果用户暂停视频或者如果视频循环播放(可以设置loop属性来做到)
//就不会调用这个处理程序
function nextVideo(){
	position++;
	if(position>=playlist.length){
		position = 0;
	}
	video.src = playlist[position]+getFormatExtension();
	video.load();
	video.play();




}
function getFormatExtension(){
	if(video.canPlayType("video/mp4")!=""){
		return ".mp4"
	}
	else if(video.canPlayType("video/webm")!=""){
		return ".webm"
	}
	else if(video.canPlayType("video/ogg")!=""){
		return ".ogv"
	}
}
function errorHandler(){
	var video = document.getElementById("video");
	if(video.error){
		video.poster = "../images/technicaldifficultied.jpg";
		alert(video.error.code);//可以看到错误码
	}
}
