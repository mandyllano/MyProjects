//这是采用XMLHttpResquest请求的代码

// window.onload=function(){
// 	var url = "http://gumball.wickedlysmart.com/";
// 	var request =new XMLHttpRequest();
// 	request.open("GET",url);
// 	request.onload=function(){
// 		if(request.status==200&&request.readyState==4){
// 			updateSales(request.responseText);
// 		}
// 	};
// 	request.send(null);
// }
// function updateSales(responseText){
// 	var salesDiv = document.getElementById("sales");
// 	var sales = JSON.parse(responseText);
// 	for(var i=0;i<sales.length;i++){
// 		var sale = sales[i];
// 		var div = document.createElement("div");

// 		div.setAttribute("class","salesItem");
// 		div.innerHTML=sale.name+" sold " +sale.sales+" gumballs";
// 		salesDiv.appendChild(div);
// 	}
// }


//这是使用JSONP的代码
window.onload = function() {
	setInterval(handleRefresh,3000);
}

function handleRefresh(){
	var url = "http://gumball.wickedlysmart.com/?callback=updateSales"+"&random="+
	(new Date()).getTime()+"&lastreporttime="
	+lastReportTime;
	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src",url);
	newScriptElement.setAttribute("id","jsonp");
	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];
	if(oldScriptElement==null){
          head.appendChild(newScriptElement);
	}else{
		head.replaceChild(newScriptElement,oldScriptElement);
	}
}

var lastReportTime = 0;
function updateSales(sales) {
	var salesDiv = document.getElementById("sales");
	for (var i = 0; i < sales.length; i++) {
		var sale = sales[i];
		var div = document.createElement("div");

		div.setAttribute("class", "saleItem");
		div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
		salesDiv.appendChild(div);
	}
	if(sales.length>0){
		lastReportTime = sales[sales.length-1].time;
	}
}