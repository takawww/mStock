function getStock(){
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1/stockREST/Price.svc/GetData",
		contentType: "text/plain, charset=utf-8",
		dataType: "json",
		crossDomain: true, 
		success: function (result) {
			var obj = (JSON.parse(result));
			stockIndexs = obj.stockIndexs;
			stockPrices = obj.stockPrices;
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

function showIndexGrid(dataSet){
	var sHTML = "";

	for (var i=0;i<dataSet.length ;i++ )
	{
		sHTML = sHTML + "<div class='divIndexObj'>"
		sHTML = sHTML + "	<div class='divIndexObjTitle'></div>"
		sHTML = sHTML + "	<div class='divIndexObjName'>" + dataSet[i].name + "</div>"
		if (dataSet[i].delta > 5)
		{
			sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock5'>" + dataSet[i].price + "</div>"
		}
		else if (dataSet[i].delta > 0)
		{
			sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock4'>" + dataSet[i].price + "</div>"
		}
		else if (dataSet[i].delta == 0)
		{
			sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock3'>" + dataSet[i].price + "</div>"
		}
		else if (dataSet[i].delta < -5)
		{
			sHTML = sHTML + "	<div class='divIndexObjPrice divFontStock1'>" + dataSet[i].price + "</div>"
		}
		else if (dataSet[i].delta < 0)
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
	$(".divIndexContainer").html(sHTML);
};

function showStockGrid(dataSet){
	var sHTML = "";

	for (var i=0;i<dataSet.length ;i++ )
	{
		sHTML = sHTML + "<div class='divStockObj'>"
		if (dataSet[i].delta > 5)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock5'>&nbsp;</div>"
		}
		else if (dataSet[i].delta > 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock4'>&nbsp;</div>"
		}
		else if (dataSet[i].delta == 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock3'>&nbsp;</div>"
		}
		else if (dataSet[i].delta < -5)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock1'>&nbsp;</div>"
		}
		else if (dataSet[i].delta < 0)
		{
			sHTML = sHTML + "	<div class='divStockObjTitle divTitleStock2'>&nbsp;</div>"
		}
		sHTML = sHTML + "	<div class='divStockObjCode'>" + dataSet[i].code + "</div>"
		sHTML = sHTML + "	<div class='divStockObjName'>" + dataSet[i].name + "</div>"
		if (dataSet[i].delta > 5)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock5'>" + dataSet[i].price + "</div>"
		}
		else if (dataSet[i].delta > 0)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock4'>" + dataSet[i].price + "</div>"
		}
		else if (dataSet[i].delta == 0)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock3'>" + dataSet[i].price + "</div>"
		}
		else if (dataSet[i].delta < -5)
		{
			sHTML = sHTML + "	<div class='divStockObjPrice divFontStock1'>" + dataSet[i].price + "</div>"
		}
		else if (dataSet[i].delta < 0)
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
		sHTML = sHTML + "</div>"
	}
	$(".divStockContainer").html(sHTML);
};