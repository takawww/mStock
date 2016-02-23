var pushNotification;

function playAudio(id) {
    var audioElement = document.getElementById(id);
	var url = audioElement.getAttribute('src');
	var my_media = new Media(url,
		 function () { alert("playAudio():Audio Success"); },
		 function (err) { alert("playAudio():Audio Error: " + JSON.stringify(err)); }
    );
	my_media.play();
}

//user login
function showUserLogin(){
	var sHTML = "";
	sHTML = sHTML + "<div class='divHeader'></div>"
	sHTML = sHTML + "<div class='divContentRow'>"
	sHTML = sHTML + "	<input type='email' id='txtUsername' class='divFormInput' placeholder='Email'>"
	sHTML = sHTML + "</div>"
	sHTML = sHTML + "<div class='divContentRow'>"
	sHTML = sHTML + "	<input type='password' id='txtPassword' class='divFormInput' placeholder='Password'>"
	sHTML = sHTML + "</div>"
	sHTML = sHTML + "<div class='divContentRow'>"
	sHTML = sHTML + "	<input type='button' value='Login' class='divFormButton'>"
	sHTML = sHTML + "</div>"
	$("#divAlertMsg").html(sHTML);
	$("#divAlert").fadeIn(1000);
}

function setUserLogin(){
	$.ajax({
		type: "GET",
		url: "http://addressservice.dyndns.ws/stockREST/User.asmx/userLogin?username=" + $("txtUsername").val() + "&password=" + $("txtPassword").val(),
		contentType: "text/plain, charset=utf-8",
		dataType: "json",
		crossDomain: true, 
		success: function (result) {
			userProfile = result.profile;
			localStorage.setItem("userProfile", JSON.Stringify(userProfile));
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('Error');
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}




// page timer
function initStockTimer(){
	getStock();

	var _task = setInterval(function(){
		getStock();
	},10000);
}


// handle APNS notifications for iOS
function onNotificationAPN(e) {
	if (e.alert) {
		 console.log('<li>push-notification: ' + e.alert + '</li>');
		 navigator.notification.alert(e.alert);
	}
		
	if (e.sound) {
		var snd = new Media(e.sound);
		snd.play();
	}
	
	if (e.badge) {
		pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
	}
}

// handle GCM notifications for Android
function onNotificationGCM(e) {
	console.log('<li>EVENT -> RECEIVED:' + e.event + '</li>');
	
	switch( e.event )
	{
		case 'registered':
		if ( e.regid.length > 0 )
		{
			console.log('<li>REGISTERED -> REGID:' + e.regid + "</li>");
			// Your GCM push server needs to know the regID before it can push to this device
			// here is where you might want to send it the regID for later use.
			console.log("regID = " + e.regid);
		}
		break;
		
		case 'message':
			// if this flag is set, this notification happened while we were in the foreground.
			// you might want to play a sound to get the user's attention, throw up a dialog, etc.
			if (e.foreground)
			{
				console.log.append('<li>--INLINE NOTIFICATION--' + '</li>');
				
				// if the notification contains a soundname, play it.
				var my_media = new Media("/android_asset/www/sound/"+e.soundname);
				my_media.play();
			}
			else
			{	// otherwise we were launched because the user touched a notification in the notification tray.
				if (e.coldstart)
					console.log('<li>--COLDSTART NOTIFICATION--' + '</li>');
				else
					console.log('<li>--BACKGROUND NOTIFICATION--' + '</li>');
			}
				
			console.log('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
			console.log('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
		break;
		
		case 'error':
			console.log('<li>ERROR -> MSG:' + e.msg + '</li>');
		break;
		
		default:
			console.log('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
		break;
	}
}

function tokenHandler (result) {
	console.log('<li>token: '+ result +'</li>');
	// Your iOS push server needs to know the token before it can push to this device
	// here is where you might want to send it the token for later use.
}

function successHandler (result) {
	console.log('<li>success:'+ result +'</li>');
}

function errorHandler (error) {
	console.log('<li>error:'+ error +'</li>');
}