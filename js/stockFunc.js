
function getStock(){
	$.ajax({
		type: "GET",
		url: "http://addressservice.dyndns.ws/stockREST/Price.asmx/GetData",
		contentType: "text/plain, charset=utf-8",
		dataType: "json",
		crossDomain: true, 
		success: function (result) {
			//var obj = (JSON.parse(result));
			if (localStorage.getItem("stockPrices") == null) localStorage.setItem("stockPrices", JSON.stringify(result.stockPrices));
			setIndexPrices(result.stockIndexs);
			setStockPrices(result.stockPrices);
			showIndexGrid(stockIndexs);
			showStockGrid(stockPrices);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('Error');
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			
		}
	});
}

function setIndexPrices(dataSet){
	var isFound = false;
	if (stockIndexs == null)
	{
		stockIndexs = dataSet;
	}else{
		for (var i=0;i<dataSet.length ;i++ )
		{
			isFound = false;
			for (var j=0;j<stockIndexs.length ;j++ )
			{
				if (stockIndexs[j].name == dataSet[i].name)
				{
					isFound = true;
					stockIndexs[j].name = dataSet[i].name;
					if (parseFloat(dataSet[i].price) - parseFloat(stockIndexs[j].price) > 50)
					{
						javascript:playAudio('soundUp');
					}else if (parseFloat(dataSet[i].price) - parseFloat(stockIndexs[j].price) < -50){
						javascript:playAudio('soundDown');
					}
					stockIndexs[j].price = dataSet[i].price;
					stockIndexs[j].delta = dataSet[i].delta;
					stockIndexs[j].percent = dataSet[i].percent;
					stockIndexs[j].createDate = dataSet[i].createDate;
					stockIndexs[j].createTime = dataSet[i].createTime;
				}
			}
			if(!isFound){
				stockIndexs.push(dataSet[i].code);
			}
		}
		localStorage.setItem("stockPrices", JSON.stringify(stockPrices))
	}
}

function setStockPrices(dataSet){
	var isFound = false;
	if (stockPrices == null)
	{
		stockPrices = dataSet;
	}else{
		for (var i=0;i<dataSet.length ;i++ )
		{
			isFound = false;
			for (var j=0;j<stockPrices.length ;j++ )
			{
				if (stockPrices[j].code == dataSet[i].code)
				{
					isFound = true;
					if (stockPrices[j].alarm != null)
					{
						if (stockPrices[j].alarm == "Y" && stockPrices[j].alarmVal != "")
						{
							var alarmVal = parseFloat( stockPrices[j].alarmVal);
							var changePercent = (parseFloat(dataSet[i].price) - parseFloat(stockPrices[j].price))/parseFloat(dataSet[i].price);
							if ( changePercent > alarmVal)
							{
								javascript:playAudio('soundUp');
							}else if (changePercent < (-1 * alarmVal))
							{
								javascript:playAudio('soundDown');
							}
						}
					}
					stockPrices[j].name = dataSet[i].name;
					stockPrices[j].price = dataSet[i].price;
					stockPrices[j].delta = dataSet[i].delta;
					stockPrices[j].percent = dataSet[i].percent;
					stockPrices[j].createDate = dataSet[i].createDate;
					stockPrices[j].createTime = dataSet[i].createTime;
					stockPrices[j].prevClose = dataSet[i].prevClose;
					stockPrices[j].open = dataSet[i].open;
					stockPrices[j].high = dataSet[i].high;
					stockPrices[j].low = dataSet[i].low;
				}
			}
			if(!isFound){
				stockPrices.push(dataSet[i].code);
			}
		}
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
			if (parseFloat(dataSet[i].percent) > 5)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock5'>" + dataSet[i].price + "</div>"
			}
			else if (parseFloat(dataSet[i].percent) > 0)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock4'>" + dataSet[i].price + "</div>"
			}
			else if (parseFloat(dataSet[i].percent) == 0)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock3'>" + dataSet[i].price + "</div>"
			}
			else if (parseFloat(dataSet[i].percent) < -5)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock1'>" + dataSet[i].price + "</div>"
			}
			else if (parseFloat(dataSet[i].percent) < 0)
			{
				sHTML = sHTML + "	<div class='divIndexLObjPrice divFontStock2'>" + dataSet[i].price + "</div>"
			}
			if (dataSet[i].percent > 0)
			{
				sHTML = sHTML + "	<div class='divIndexLObjDelta'>+" + dataSet[i].delta + " (+" + dataSet[i].percent + "%)</div>"
			}
			else
			{
				sHTML = sHTML + "	<div class='divIndexLObjDelta'>" + dataSet[i].delta + " (" + dataSet[i].percent + "%)</div>"
			}
			sHTML = sHTML + "</div>"
		}else{
			sHTML = sHTML + "<div class='divIndexObj'>"
			sHTML = sHTML + "	<div class='divIndexObjTitle'></div>"
			sHTML = sHTML + "	<div class='divIndexObjName'>" + dataSet[i].name + "</div>"
			if (parseFloat(dataSet[i].percent) > 5)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock5'>" + dataSet[i].price + "</div>"
			}
			else if (parseFloat(dataSet[i].percent) > 0)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock4'>" + dataSet[i].price + "</div>"
			}
			else if (parseFloat(dataSet[i].percent) == 0)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock3'>" + dataSet[i].price + "</div>"
			}
			else if (parseFloat(dataSet[i].percent) < -5)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock1'>" + dataSet[i].price + "</div>"
			}
			else if (parseFloat(dataSet[i].percent) < 0)
			{
				sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock2'>" + dataSet[i].price + "</div>"
			}
			if (dataSet[i].percent > 0)
			{
				sHTML = sHTML + "	<div class='divIndexObjDelta'>+" + dataSet[i].delta + " (+" + dataSet[i].percent + "%)</div>"
			}
			else
			{
				sHTML = sHTML + "	<div class='divIndexObjDelta'>" + dataSet[i].delta + " (" + dataSet[i].percent + "%)</div>"
			}
			sHTML = sHTML + "</div>"
		}
		
	}
	$(".divIndexContainer").html(sHTML);
};

function showStockGrid(dataSet){
	var sHTML = "";
	var sSelClass = "";
	for (var i=0;i<dataSet.length ;i++ )
	{
		sSelClass = "";
		if (dataSet[i].code == stockSel) sSelClass = "divStockObjSel";
		sHTML = sHTML + "<li class='ui-state-default' class='liStockObj' id='liStockObj_" + dataSet[i].code + "'>";
		sHTML = sHTML + "<div class='divStockObj' class='divStockObj " + sSelClass + "' id='divStockObj_" + dataSet[i].code + "' >"
		if (parseFloat(dataSet[i].percent) > 5)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock5'>&nbsp;</div>"
		}
		else if (parseFloat(dataSet[i].percent) > 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock4'>&nbsp;</div>"
		}
		else if (parseFloat(dataSet[i].percent) == 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock3'>&nbsp;</div>"
		}
		else if (parseFloat(dataSet[i].percent) < -5)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock1'>&nbsp;</div>"
		}
		else if (parseFloat(dataSet[i].percent) < 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock2'>&nbsp;</div>"
		}
		sHTML = sHTML + "	<div class='divStockObjCode'>" + dataSet[i].code + "</div>"
		if (dataSet[i].meet != "")
		{
			sHTML = sHTML + "	<div class='divStockObjMeet'>" + dataSet[i].meet.substr(0, 2) + "<br/>" + dataSet[i].meet.substr(2) + "</div>"
		}
		sHTML = sHTML + "	<div class='divStockObjName'>" + dataSet[i].name + "</div>"
		if (parseFloat(dataSet[i].percent) > 5)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock5'>" + dataSet[i].price + "</div>"
		}
		else if (parseFloat(dataSet[i].percent) > 0)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock4'>" + dataSet[i].price + "</div>"
		}
		else if (parseFloat(dataSet[i].percent) == 0)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock3'>" + dataSet[i].price + "</div>"
		}
		else if (parseFloat(dataSet[i].percent) < -5)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock1'>" + dataSet[i].price + "</div>"
		}
		else if (parseFloat(dataSet[i].percent) < 0)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock2'>" + dataSet[i].price + "</div>"
		}
		if (dataSet[i].percent > 0)
		{
			sHTML = sHTML + "	<div class='divStockObjDelta'>+" + dataSet[i].delta + " (+" + dataSet[i].percent + "%)</div>"
		}
		else
		{
			sHTML = sHTML + "	<div class='divStockObjDelta'>" + dataSet[i].delta + " (" + dataSet[i].percent + "%)</div>"
		}
		sHTML = sHTML +		"<div class='divStockObjHighLow'>"
		sHTML = sHTML + "		<div class='divStockObjHigh'>" + dataSet[i].high + "</div>"
		sHTML = sHTML + "		<div class='divStockObjLow'>" + dataSet[i].low + "</div>"
		sHTML = sHTML + "	</div>"
		
		sHTML = sHTML + "</div>"
		
		sHTML = sHTML + "</li>";
		
	}
	$(".ulStockContainer").html(sHTML);
	$(".ulStockContainer").sortable({
		beforeStop: function(event, ui) {
			setStockArraySeq(ui.item[0].id, ui.placeholder.index())
		}
	});
    $(".ulStockContainer").disableSelection();
	$(".divStockObj").click(function(){
		var stockID = $(this).attr("id");
		stockID = stockID.replace(/divStockObj_/g,"");
		stockSel = stockID;
		$(".divStockObjSel").removeClass("divStockObjSel");
		$("#divStockObj_" + stockID).addClass("divStockObjSel");
		showStockInfo(stockID);
	});
};

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
	sHTML = sHTML + "<div class='divStockObj'>"
	if (parseFloat(stock.percent) > 5)
	{
		sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock5'>&nbsp;</div>"
	}
	else if (parseFloat(stock.percent) > 0)
	{
		sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock4'>&nbsp;</div>"
	}
	else if (parseFloat(stock.percent) == 0)
	{
		sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock3'>&nbsp;</div>"
	}
	else if (parseFloat(stock.percent) < -5)
	{
		sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock1'>&nbsp;</div>"
	}
	else if (parseFloat(stock.percent) < 0)
	{
		sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock2'>&nbsp;</div>"
	}
	sHTML = sHTML + "	<div class='divStockObjCode'>" + stock.code + "</div>"
	if (stock.meet != "")
	{
		sHTML = sHTML + "	<div class='divStockObjMeet'>" + stock.meet.substr(0, 2) + "<br/>" + stock.meet.substr(2) + "</div>"
	}
	sHTML = sHTML + "	<div class='divStockObjName'>" + stock.name + "</div>"
	if (parseFloat(stock.percent) > 5)
	{
		sHTML = sHTML + "	<div class='divStockObjPrice divFontStock5'>" + stock.price + "</div>"
	}
	else if (parseFloat(stock.percent) > 0)
	{
		sHTML = sHTML + "	<div class='divStockObjPrice divFontStock4'>" + stock.price + "</div>"
	}
	else if (parseFloat(stock.percent) == 0)
	{
		sHTML = sHTML + "	<div class='divStockObjPrice divFontStock3'>" + stock.price + "</div>"
	}
	else if (parseFloat(stock.percent) < -5)
	{
		sHTML = sHTML + "	<div class='divStockObjPrice divFontStock1'>" + stock.price + "</div>"
	}
	else if (parseFloat(stock.percent) < 0)
	{
		sHTML = sHTML + "	<div class='divStockObjPrice divFontStock2'>" + stock.price + "</div>"
	}
	if (stock.percent > 0)
	{
		sHTML = sHTML + "	<div class='divStockObjDelta'>+" + stock.delta + " (+" + stock.percent + "%)</div>"
	}
	else
	{
		sHTML = sHTML + "	<div class='divStockObjDelta'>" + stock.delta + " (" + stock.percent + "%)</div>"
	}
	sHTML = sHTML +		"<div class='divStockObjHighLow'>"
	sHTML = sHTML + "		<div class='divStockObjHigh'>" + stock.high + "</div>"
	sHTML = sHTML + "		<div class='divStockObjLow'>" + stock.low + "</div>"
	sHTML = sHTML + "	</div>"	
	sHTML = sHTML + "</div>"
	sHTML = sHTML + "<div class='divDetailsChart' style='background-image:url(http://charts.aastocks.com/servlet/Charts?com=50004&stockid=" + stock.code + ".HK&period=0&footerStyle=1&lang=1&scheme=0&height=160&width=160)'>&nbsp;</div>";
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
	
	$(".divOverlayDetails").show('slide', {direction: 'right'}, 1000);
	
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
	localStorage.setItem("stockPrices", JSON.stringify(stockPrices));
	hideStockInfo();
}


function hideStockInfo(){
	$(".divOverlayDetails").hide('slide', {direction: 'right'}, 1000);
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
}
