function getStock(){
	$.ajax({
		type: "GET",
		url: "http://addressservice.dyndns.ws/stockREST/Price.asmx/GetData",
		contentType: "text/plain, charset=utf-8",
		dataType: "json",
		crossDomain: true, 
		success: function (result) {
			//var obj = (JSON.parse(result));
			setStockIndexs(result.stockIndexs);
			setStockPrices(result.stockPrices);
			showIndexGrid(stockIndexs);
			showStockGrid(stockPrices);
			showMonitorGrid(stockMonitor);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('Error');
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


function setStockIndexs(dataSet){
	var isFound = false;
	var isTimeFound = false;
	
	for (var i=0;i<dataSet.length ;i++ )
	{
		isFound = false;
		for (var j=0;j<stockIndexs.length ;j++ )
		{
			if (stockIndexs[j].name == dataSet[i].name)
			{
				if (stockIndexs[j].createDate != dataSet[i].createDate)
				{
					stockIndexs[j].dayPrices = [];
				}

				isFound = true;
				stockIndexs[j].code = dataSet[i].code;
				stockIndexs[j].name = dataSet[i].name;
				stockIndexs[j].createDate = dataSet[i].createDate;
				stockIndexs[j].prevClose = dataSet[i].prevClose;
				stockIndexs[j].open = dataSet[i].open;
				stockIndexs[j].high = dataSet[i].high;
				stockIndexs[j].low = dataSet[i].low;
				stockIndexs[j].meet = dataSet[i].meet;

				isTimeFound = false;
				for (var k=0;k<stockIndexs[j].dayPrices.length ;k++ )
				{
					if (stockIndexs[j].dayPrices[k].createTime == dataSet[i].createTime)
					{
						isTimeFound = true;
						break;
					}
				}
				/*if (!isTimeFound)
				{
					var diff = (dataSet[i].price - stockIndexs[j].dayPrices[stockIndexs[j].dayPrices - 1].price) /  stockIndexs[j].dayPrices[stockIndexs[j].dayPrices - 1].price;
					var stockDayPrice = {"price" : dataSet[i].price, "delta" : dataSet[i].delta, "percent" : dataSet[i].percent, "diff" : diff, "createTime" : dataSet[i].createTime}
					
					var dayPriceSize = stockIndexs[j].dayPrices.length;
					var ttlDayPrice = 0;
					for (var k=0;k<stockIndexs[j].dayPrices.length ;k++ )
					{
						ttlDayPrice = ttlDayPrice + stockIndexs[j].dayPrices[k].diff;
					}
					var avgDayPrice = ttlDayPrice/dayPriceSize;


					if (stockIndexs[j].dayPrices.length > 20)
					{
						stockIndexs[j].dayPrices.shift();
					}
					
				}*/

				
				//if (parseFloat(dataSet[i].price) - parseFloat(stockIndexs[j].price) > 50)
				//{
				//	javascript:playAudio('soundUp');
				//}else if (parseFloat(dataSet[i].price) - parseFloat(stockIndexs[j].price) < -50){
				//	javascript:playAudio('soundDown');
				//}
			}
		}
		if(!isFound){
			var stockPrice = {"code" : dataSet[i].code, "name" : dataSet[i].name, "createDate" : dataSet[i].createDate, "prevClose" : dataSet[i].prevClose, "open" : dataSet[i].open, "high" : dataSet[i].high, "low" : dataSet[i].low, "meet" : dataSet[i].meet, "dayPrices" : []};
			var stockDayPrice = {"price" : dataSet[i].price, "delta" : dataSet[i].delta, "percent" : dataSet[i].percent, "diff" : -1, "createTime" : dataSet[i].createTime}
			stockPrice.dayPrices.push(stockDayPrice);
			stockIndexs.push(stockPrice);
		}
		//localStorage.setItem("stockPrices", JSON.stringify(stockPrices))
	}
}

function setStockPrices(dataSet){
	var isFound = false;
	var isTimeFound = false;
	
	for (var i=0;i<dataSet.length ;i++ )
	{
		isFound = false;
		for (var j=0;j<stockPrices.length ;j++ )
		{
			if (stockPrices[j].name == dataSet[i].name)
			{
				if (stockPrices[j].createDate != dataSet[i].createDate)
				{
					stockPrices[j].dayPrices = [];
				}

				isFound = true;
				stockPrices[j].code = dataSet[i].code;
				stockPrices[j].name = dataSet[i].name;
				stockPrices[j].createDate = dataSet[i].createDate;
				stockPrices[j].prevClose = dataSet[i].prevClose;
				stockPrices[j].open = dataSet[i].open;
				stockPrices[j].high = dataSet[i].high;
				stockPrices[j].low = dataSet[i].low;
				stockPrices[j].meet = dataSet[i].meet;
				stockPrices[j].lotSize = dataSet[i].lotSize;
				stockPrices[j].shkType = dataSet[i].shkType;
				stockPrices[j].shkSec = dataSet[i].shkSec;
				stockPrices[j].shkInd = dataSet[i].shkInd;
				stockPrices[j].shkCat = dataSet[i].shkCat;
				stockPrices[j].shkNat = dataSet[i].shkNat;

				isTimeFound = false;
				for (var k=0;k<stockPrices[j].dayPrices.length ;k++ )
				{
					if (stockPrices[j].dayPrices[k].createTime == dataSet[i].createTime)
					{
						isTimeFound = true;
						break;
					}
				}
				if (!isTimeFound)
				{
					var stockDayPrice = {"price" : dataSet[i].price, "price10m" : dataSet[i].price10m, "price5m" : dataSet[i].price5m, "delta" : dataSet[i].delta, "percent" : dataSet[i].percent, "createTime" : dataSet[i].createTime}
					if ((parseFloat(stockDayPrice.price) - parseFloat(stockDayPrice.price10m))/ parseFloat(stockDayPrice.price10m) * 100 >= 2 )
					{
						stockDayPrice.abnormal = "UPUP"
					}
					else if ((parseFloat(stockDayPrice.price) - parseFloat(stockDayPrice.price10m))/ parseFloat(stockDayPrice.price10m) * 100 >= 1 )
					{
						stockDayPrice.abnormal = "UP"
					}
					else if ((parseFloat(stockDayPrice.price) - parseFloat(stockDayPrice.price10m))/ parseFloat(stockDayPrice.price10m) * 100 <= -2 )
					{
						stockDayPrice.abnormal = "DOWNDOWN"
					}
					else if ((parseFloat(stockDayPrice.price) - parseFloat(stockDayPrice.price10m))/ parseFloat(stockDayPrice.price10m) * 100 <= -1 )
					{
						stockDayPrice.abnormal = "DOWN"
					}
					else
					{
						stockDayPrice.abnormal = ""
					}
					stockPrices[j].dayPrices.push(stockDayPrice);
					if (stockPrices[j].dayPrices.length > 120)
					{
						stockPrices[j].dayPrices.shift();
					}
				}

				
				//if (parseFloat(dataSet[i].price) - parseFloat(stockPrices[j].price) > 50)
				//{
				//	javascript:playAudio('soundUp');
				//}else if (parseFloat(dataSet[i].price) - parseFloat(stockPrices[j].price) < -50){
				//	javascript:playAudio('soundDown');
				//}
			}
		}
		if(!isFound){
			if (dataSet[i].code == "000005")
		{
			var a = "a";
		}
			var stockPrice = {"code" : dataSet[i].code, "name" : dataSet[i].name, "createDate" : dataSet[i].createDate, "prevClose" : dataSet[i].prevClose, "open" : dataSet[i].open, "high" : dataSet[i].high, "low" : dataSet[i].low, "meet" : dataSet[i].meet, "dayPrices" : [], "lotSize" : dataSet[i].lotSize, "abnormal" : dataSet[i].abnormal, "shkType" : dataSet[i].shkType, "shkSec" : dataSet[i].shkSec, "shkInd" : dataSet[i].shkInd, "shkCat" : dataSet[i].shkCat, "shkNat" : dataSet[i].shkNat};
			var stockDayPrice = {"price" : dataSet[i].price, "price10m" : dataSet[i].price10m, "price5m" : dataSet[i].price5m, "delta" : dataSet[i].delta, "percent" : dataSet[i].percent, "createTime" : dataSet[i].createTime, "abnormal" : dataSet[i].abnormal}
			if ((parseFloat(stockDayPrice.price) - parseFloat(stockDayPrice.price10m))/ parseFloat(stockDayPrice.price10m) * 100 >= 2 )
			{
				stockDayPrice.abnormal = "UPUP"
			}
			else if ((parseFloat(stockDayPrice.price) - parseFloat(stockDayPrice.price10m))/ parseFloat(stockDayPrice.price10m) * 100 >= 0.5 )
			{
				stockDayPrice.abnormal = "UP"
			}
			else if ((parseFloat(stockDayPrice.price) - parseFloat(stockDayPrice.price10m))/ parseFloat(stockDayPrice.price10m) * 100 <= -2 )
			{
				stockDayPrice.abnormal = "DOWNDOWN"
			}
			else if ((parseFloat(stockDayPrice.price) - parseFloat(stockDayPrice.price10m))/ parseFloat(stockDayPrice.price10m) * 100 <= -0.5 )
			{
				stockDayPrice.abnormal = "DOWN"
			}
			else
			{
				stockDayPrice.abnormal = ""
			}
			
			stockPrice.dayPrices.push(stockDayPrice);
			stockPrices.push(stockPrice);
		}
		localStorage.setItem("stockPrices", JSON.stringify(stockPrices));
	}
}

function showIndexGrid(dataSet){
	var sHTML = "";

	for (var i=0;i<dataSet.length ;i++ )
	{
		if (i < 2)
		{
			sHTML = sHTML + "<div class='divIndexLObj'>"
			sHTML = sHTML + "	<div class='divIndexLObjTitle'></div>"
			sHTML = sHTML + "	<div class='divIndexLObjName'>" + dataSet[i].name + "</div>"
			if (i == 0){
				sHTML = sHTML + "	<div class='divIndexLObjChart' style='background-image:url(http://webchart.aastocks.com/chart/indices/indexdailychart.aspx?width=190&height=75&symbol=110000)'></div>"
			}else{
				sHTML = sHTML + "	<div class='divIndexLObjChart' style='background-image:url(http://webchart.aastocks.com/chart/indices/indexdailychart.aspx?width=190&height=75&symbol=110010)'></div>"
			}
			if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) > 5)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock5'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			else if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) > 0)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock4'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			else if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) == 0)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock3'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			else if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) < -5)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock1'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			else if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) < 0)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock2'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) > 0)
			{
				sHTML = sHTML + "	<div class='divIndexLObjDelta'>+" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].delta + " (+" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent + "%)</div>"
			}
			else
			{
				sHTML = sHTML + "	<div class='divIndexLObjDelta'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].delta + " (" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent + "%)</div>"
			}
			sHTML = sHTML + "</div>"
		}else{
			sHTML = sHTML + "<div class='divIndexObj'>"
			sHTML = sHTML + "	<div class='divIndexObjTitle'></div>"
			sHTML = sHTML + "	<div class='divIndexObjName'>" + dataSet[i].name + "</div>"
			if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) > 5)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock5'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			else if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) > 0)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock4'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			else if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) == 0)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock3'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			else if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) < -5)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock1'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			else if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) < 0)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock2'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].price + "</div>"
			}
			if (parseFloat(dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent) > 0)
			{
				sHTML = sHTML + "	<div class='divIndexObjDelta'>+" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].delta + " (+" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent + "%)</div>"
			}
			else
			{
				sHTML = sHTML + "	<div class='divIndexObjDelta'>" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].delta + " (" + dataSet[i].dayPrices[dataSet[i].dayPrices.length-1].percent + "%)</div>"
			}
			sHTML = sHTML + "</div>"
		}
		
	}
	$(".divIndexContainer").html(sHTML);
};

function showStockGrid(dataSet){
	var sHTML = "";
	var sSelClass = "";
	var sStatusClass = "";
	for (var i=0;i<dataSet.length ;i++ )
	{
		if (!isStockMonitor(dataSet[i].code))
		{
			sSelClass = "";
			sStatusClass = "";
			sHTML = sHTML + genStockObjHTML(dataSet[i].code);
		}
	}
	$("#divCatViewStockGrid").html(sHTML);
	$("#divCatViewStockGrid").sortable({
		items: 'li',
		revert: true,
		opacity: .5,    
		out: function(event, ui){console.log("out");},
		over: function(event, ui){console.log("over");},
		beforeStop: function(event, ui) {
			setStockArraySeq(ui.item[0].id, ui.placeholder.index());
		}
	});
    $("#divCatViewStockGrid").disableSelection();
};


function showMonitorGrid(dataSet){
	var sHTML = "";
	var sSelClass = "";
	var sStatusClass = "";
	for (var i=0;i<dataSet.length ;i++ )
	{
		sHTML = sHTML + genStockObjHTML(dataSet[i]);
	}
	$("#divUserViewStockGrid").html(sHTML);
	$("#divUserViewStockGrid").sortable({
		items: 'li',
		revert: true,
		opacity: .5,    
		out: function(event, ui){console.log("out");},
		over: function(event, ui){console.log("over");},
		beforeStop: function(event, ui) {
			setMonitorArraySeq(ui.item[0].id, ui.placeholder.index());
		}
	});
	$("#divUserViewStockGrid").disableSelection();
	$(".divStockObj").click(function(){
		var stockID = $(this).attr("id");
		stockID = stockID.replace(/divStockObj_/g,"");
		stockSel = stockID;
		$(".divStockObjSel").removeClass("divStockObjSel");
		$("#divStockObj_" + stockID).addClass("divStockObjSel");
		showStockInfo(stockID);
	});
	/*$(".divStockObj").mouseup(function(){
		clearTimeout(pressTimer)
		return false;
	}).mousedown(function(){
		pressStock = $(this);
		pressTimer = window.setTimeout(function() {
			var stockID = pressStock.attr("id");
			stockID = stockID.replace(/divStockObj_/g,"");
			stockSel = stockID;
			$(".divStockObjSel").removeClass("divStockObjSel");
			$("#divStockObj_" + stockID).addClass("divStockObjSel");
			showStockInfo(stockID);
		},5000)
	  return false; 
	});*/
};

function isStockMonitor(stockID){
	for (var i=0;i<stockMonitor.length ;i++ )
	{
		if (parseInt(stockMonitor[i]) == parseInt(stockID))
		{
			return true;
		}
	}
	return false;
}

function genStockObjHTML(stockID){
	var stock;
	var sSelClass = "";
	var sStatusClass = "";
	for (var i=0;i<stockPrices.length ;i++ )
	{
		if (parseInt(stockPrices[i].code) == parseInt(stockID))
		{
			stock = stockPrices[i];
			break;
		}
	}
	var sHTML = "";
	if (stock != null)
	{
		if (stock.code == stockSel) sSelClass = "divStockObjSel";
		sHTML = sHTML + "<li class='ui-state-default' class='liStockObj' id='liStockObj_" + stock.code + "'>";

		if (stock.dayPrices[stock.dayPrices.length-1].abnormal == "UPUP")
		{
			sStatusClass = "divUpUp";
		}
		else if (stock.dayPrices[stock.dayPrices.length-1].abnormal == "UP")
		{
			sStatusClass = "divUp";
		}
		else if (stock.dayPrices[stock.dayPrices.length-1].abnormal == "DOWNDOWN")
		{
			sStatusClass = "divDownDown";
		}
		else if (stock.dayPrices[stock.dayPrices.length-1].abnormal == "DOWN")
		{
			sStatusClass = "divDown";
		}
		else
		{
			sStatusClass = "";
		}

		sHTML = sHTML + "<div class='divStockObj " + sSelClass + "' id='divStockObj_" + stock.code + "' >";
		if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) > 5)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock5'>&nbsp;</div>";
		}
		else if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) > 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock4'>&nbsp;</div>";
		}
		else if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) == 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock3'>&nbsp;</div>";
		}
		else if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) < -5)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock1'>&nbsp;</div>";
		}
		else if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) < 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock2'>&nbsp;</div>";
		}
		sHTML = sHTML + "	<div class='divStockObjCodeRow'>";
		sHTML = sHTML + "		<div class='divStockObjCode'>" + stock.code + "</div>";
		if (stock.meet != "")
		{
			sHTML = sHTML + "	<div class='divStockObjMeet divMeet'>" + stock.meet.substr(0, 2) + "</div>";
		}else{
			sHTML = sHTML + "	<div class='divStockObjMeet'>&nbsp;</div>"
		}
		
		sHTML = sHTML + "	</div>";
		sHTML = sHTML + "	<div class='divStockObjName'>" + stock.name + "</div>"
		sHTML = sHTML + "	<div class='divStockObjPriceRow'>";
		if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) > 5)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock5'>" + stock.dayPrices[stock.dayPrices.length-1].price + "</div>"
		}
		else if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) > 0)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock4'>" + stock.dayPrices[stock.dayPrices.length-1].price + "</div>"
		}
		else if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) == 0)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock3'>" + stock.dayPrices[stock.dayPrices.length-1].price + "</div>"
		}
		else if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) < -5)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock1'>" + stock.dayPrices[stock.dayPrices.length-1].price + "</div>"
		}
		else if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) < 0)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock2'>" + stock.dayPrices[stock.dayPrices.length-1].price + "</div>"
		}

		if (stock.dayPrices[stock.dayPrices.length-1].abnormal == "UPUP")
		{
			sHTML = sHTML + "	<div class='divStockObjMeet divStarUpUp'>&nbsp;</div>"
		}
		else if (stock.dayPrices[stock.dayPrices.length-1].abnormal == "UP")
		{
			sHTML = sHTML + "	<div class='divStockObjMeet divStarUp'>&nbsp;</div>"
		}
		else if (stock.dayPrices[stock.dayPrices.length-1].abnormal == "DOWNDOWN")
		{
			sHTML = sHTML + "	<div class='divStockObjMeet divStarDownDown'>&nbsp;</div>"
		}
		else if (stock.dayPrices[stock.dayPrices.length-1].abnormal == "DOWN")
		{
			sHTML = sHTML + "	<div class='divStockObjMeet divStarDown'>&nbsp;</div>"
		}
		else
		{
			sHTML = sHTML + "	<div class='divStockObjMeet'>&nbsp;</div>"
		}
		sHTML = sHTML + "	</div>";
		if (parseFloat(stock.dayPrices[stock.dayPrices.length-1].percent) > 0)
		{
			sHTML = sHTML + "	<div class='divStockObjDelta'>+" + stock.dayPrices[stock.dayPrices.length-1].delta + " (+" + stock.dayPrices[stock.dayPrices.length-1].percent + "%)</div>"
		}
		else
		{
			sHTML = sHTML + "	<div class='divStockObjDelta'>" + stock.dayPrices[stock.dayPrices.length-1].delta + " (" + stock.dayPrices[stock.dayPrices.length-1].percent + "%)</div>"
		}
		sHTML = sHTML +		"<div class='divStockObjHighLow'>"
		sHTML = sHTML + "		<div class='divStockObjHigh'>" + stock.high + "</div>"
		sHTML = sHTML + "		<div class='divStockObjLow'>" + stock.low + "</div>"
		sHTML = sHTML + "	</div>"
		
		sHTML = sHTML + "</div>"
		
		sHTML = sHTML + "</li>";
	}
	return sHTML;
		
}

function showStockInfo(stockID){
	var stock;
	for(var i=0;i<stockPrices.length;i++){
		if (stockPrices[i].code == stockID)
		{
			stock = stockPrices[i];
			break;
		}
	}
	var sHTML = "";
	sHTML = sHTML + "<div class='divPopHeader'>";
	sHTML = sHTML + "	<div class='divPopTitle'>" + stock.name + "(" + stock.code + ")</div>";
	sHTML = sHTML + "	<div class='divPopClose' onclick='javascript:$(\"#divAlert\").fadeOut()'></div>";
	sHTML = sHTML + "</div>";
	sHTML = sHTML + "<div class='divPopContentRow'>";
	if (isStockMonitor(stockID))
	{
		sHTML = sHTML + "	<input type='checkbox' onclick='javascript:setStockToMonitor(\"" + stockID + "\", this.checked)' checked>&nbsp;加到我的監察表";
	}
	else
	{
		sHTML = sHTML + "	<input type='checkbox' onclick='javascript:setStockToMonitor(\"" + stockID + "\", this.checked)'>&nbsp;加到我的監察表";
	}
	sHTML = sHTML + "</div>";
	
	sHTML = sHTML + "<div class='divDetailsChart' style='background-image:url(http://charts.aastocks.com/servlet/Charts?com=50004&stockid=" + stock.code + ".HK&period=0&footerStyle=1&lang=1&scheme=0&height=300&width=500)'>&nbsp;</div>";
	sHTML = sHTML + "<div class='divDetailsAlertSetRow'><input type='checkbox' id='chkAlarmSet' onclick='javascript:showAlarmSetting(this.checked)'>自動提示 (+/- %)</div>"
	sHTML = sHTML + "<div class='divDetailsAlertSet divDetailsAlertSetRow'><input type='number' id='txtAlarmValue' class='txtStockAlarm'></div>"
	sHTML = sHTML + "<div class='divDetailsAlertSet divDetailsAlertSetRow'><input type='button' value='設定' class='btnStockAlarm' onclick='setStockAlarm(\"" + stock.code + "\")'></div>"
	
	$(".divOverlayDetails").hide('slide', {direction: 'right'}, 1000, function(){
		$(".divOverlayContent").html(sHTML);
		if (stock.alarm != null)
		{
			if (stock.alarm == "Y")
			{

				$(".divDetailsAlertSet").show();
				$("#chkAlarmSet").prop("checked", true);
				$("#txtAlarmValue").val(stock.alarmVal);
			}
		}
	});
	$("#divAlertMsg").html(sHTML);
	$("#divAlert").fadeIn();
	
}

function setStockToMonitor(stockID, checked){
	if (checked)
	{
		var isExist = false;
		for(var i=0;i<stockMonitor.length;i++){
			if (parseInt(stockMonitor[i]) == parseInt(stockID))
			{
				isExist = true;
				break;
			}
		}
		if (!isExist)
		{
			stockMonitor.push(stockID);
			localStorage.setItem("stockMonitor", JSON.stringify(stockMonitor));
			showStockGrid(stockPrices);
			showMonitorGrid(stockMonitor);
		}
		
	}
	else
	{
		for(var i=0;i<stockMonitor.length;i++){
			if (parseInt(stockMonitor[i]) == parseInt(stockID))
			{
				stockMonitor.splice(i,1);
				localStorage.setItem("stockMonitor", JSON.stringify(stockMonitor));
				showStockGrid(stockPrices);
				showMonitorGrid(stockMonitor);
				break;
			}
		}
	}
	
	
}

function showAlarmSetting(checked){
	if(checked){
		$(".divDetailsAlertSet").show();
	}else{
		$(".divDetailsAlertSet").hide();
	}
}

function setStockAlarm(stockID){
	var stock;
	for(var i=0;i<stockPrices.length;i++){
		if (stockPrices[i].code == stockID)
		{
			stockPrices[i].alarm = "Y";
			stockPrices[i].alarmVal = $("#txtAlarmValue").val();
			break;
		}
	}
	//localStorage.setItem("stockPrices", JSON.stringify(stockPrices));
	hideStockInfo();
}


function hideStockInfo(){
	$(".divOverlayDetails").hide('slide', {direction: 'right'}, 1000);
}

function setStockMonitor(id){
	var stockID = id.replace(/liStockObj_/g,""); 
	var stockObj;
	for (var i=0;i < stockPrices.length;i++ )
	{
		if (stockID == stockPrices[i].code)
		{
			stockObj = stockPrices[i];
		}
	}
}

function setStockArraySeq(id, idx){
	console.log("new position --> " + idx);
	var stockID = id.replace(/liStockObj_/g,""); 
	var stockObj;
	for (var i=0;i < stockPrices.length;i++ )
	{
		if (stockID == stockPrices[i].code)
		{
			stockObj = stockPrices[i];
			stockPrices.splice(i,1);
		}
	}
	stockPrices.splice((idx - 1), 0, stockObj);
	localStorage.setItem("stockPrices", JSON.stringify(stockPrices));
}

function setMonitorArraySeq(id, idx){
	console.log("new position --> " + idx);
	var stockID = id.replace(/liStockObj_/g,""); 
	var stockObj;
	for (var i=0;i < stockMonitor.length;i++ )
	{
		if (stockID == stockMonitor[i])
		{
			stockObj = stockMonitor[i];
			stockMonitor.splice(i,1);
		}
	}
	stockMonitor.splice((idx - 1), 0, stockObj);
	localStorage.setItem("stockMonitor", JSON.stringify(stockMonitor));
}

