window.onload = function(){
	if(navigator.geolocation){
		// navigator.geolocation.getCurrentPosition(displayLocation,displayError);
		var watchButton = document.getElementById("watch");
		watchButton.onclick = watchLocation;
		var clearWatchButton = document.getElementById("clearwatch");
		clearWatchButton.onclick = clearWatch;
	}else{
		alert("Oops,no geolocation support");
	}
	
}
var ourCoords={
		latitude:47.624851,
		longitude:-122.52099
	};
var options = {enableHighAccuracy:true,
               timeout:100,
               maximumAge:0
        };
var map = null;
var prevCoords = null;
function displayLocation(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude:" + latitude + ",Longitude:" + longitude;
	div.innerHTML += "(with"+position.coords.accuracy+"meters accuracy)";
	div.innerHTML+="(found in"+options.timeout+" milliseconds)";
	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are" + km + "km from the WickedlySmart HQ";
	if(map == null){
		showMap(position.coords);
		prevCoords = position.coords;
	}else{
		var meters = computeDistance(position.coords,prevCoords)*1000;
		if(meters>20){
			scrollMapToPosition(position.coords);
			prevCoords = position.coords;
		}
		
	}
	
}

function displayError(error){
	var errorTypes = {
		0:"Unknown error",
		1:"Permission denied by user",
		2:"Position is not available",
		3:"Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if(error.code == 0 || error.code == 2){
		errorMessage = errorMessage +" "+error.message;
	}
	var div  = document.getElementById("location");
	div.innerHTML = errorMessage;
	options.timeout+=100;
	navigator.geolocation.getCurrentPosition(displayLocation,
		displayError,
		options);
	div.innerHTML+="......checking again with timeout=" + options.timeout;
}
//computeDistance函数取两个坐标，一个起点坐标和一个终点坐标，
//并返回二者之间的距离（单位为千米）
function computeDistance(startCoords,destCoords){
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);
	var Radius = 6371; //radius of the Earth in km 地球的半径
	var distance = Math.acos(Math.sin(startLatRads)*Math.sin(destLatRads)+
		 Math.cos(startLatRads)*Math.cos(destLatRads)*
		 Math.cos(startLongRads - destLongRads)) * Radius;
	return distance;
                

}
//弧度转换函数
function degreesToRadians(degrees){
	var radians = (degrees * Math.PI)/180;
	return radians;

}
// function showMap(coords){
// 	var googleeLatAndLong = new google.maps.LatLng(coords.latitude,
// 		coords.longitude);
// 	var mapOptions = {
// 		zoom:10,
// 		center:googleeLatAndLong,
// 		mapTypeId:google.maps.mapTypeId.ROADMAP
// 	};
// 	var mapdiv = document.getElementById("map");
// 	map = new google.maps.Map(mapdiv,mapOptions);
// }
function showMap(coords){
	// var mapdiv = document.getElementById("map");
	map = new BMap.Map("map");//创建Map实例
	var point = new BMap.Point(coords.longitude,
		coords.latitude);//设置中心点坐标，注是先经度再纬度，不要弄反
	map.centerAndZoom(point ,20);//初始化地图和地图级别
	map.addControl(new BMap.MapTypeControl());//添加地图类型控件
	// map.setCurrentCity("北京"); //设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
	var marker = new BMap.Marker(point);//在point处添加标注
	map.addOverlay(marker);//添加覆盖物Marker
	marker.enableDragging();//激活标注的拖拽功能
	var content = "You are here"+coords.latitude+","+coords.longitude;
	var infoWindow = new BMap.InfoWindow(content,
		{width:100,height:100,title:"hello"});//在某个特定位置创建一个信息窗口
	marker.addEventListener("click" ,function(){
		map.openInfoWindow(infoWindow,map.getCenter());
	});//在地图中央打开信息窗口
}
var watchId = null;
function watchLocation(){
	watchId = navigator.geolocation.watchPosition(displayLocation,displayError,options);
}
function clearWatch(){
	if(watchId){
		navigator.geolocation.clearWatch(watchId);//传入这个watchid,会停止监视
		watchId = null;
	}
}
function scrollMapToPosition(coords){
	var latitude = coords.latitude;
	var longitude  = coords.longitude;
	var point = new BMap.Point(longitude,latitude);
	map.panTo(new BMap.Point(longitude,latitude));//panTo()方法将让地图平滑移至新中心点。
	var marker = new BMap.Marker(point);//在point处添加标注
	map.addOverlay(marker);//添加覆盖物Marker
}