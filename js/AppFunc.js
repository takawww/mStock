function playAudio(id) {
    var audioElement = document.getElementById(id);
	alert(audioElement);
    var url = audioElement.getAttribute('src');
	alert(url);
    var my_media = new Media(url,
		 function () { alert("playAudio():Audio Success"); },
		 function (err) { alert("playAudio():Audio Error: " + err); }
    );
	alert(my_media);
    my_media.play();
}