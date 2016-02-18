function playAudio(id) {
    var audioElement = document.getElementById(id);
	var url = audioElement.getAttribute('src');
	var my_media = new Media(url,
		 function () { alert("playAudio():Audio Success"); },
		 function (err) { alert("playAudio():Audio Error: " + JSON.stringify(err)); }
    );
	my_media.play();
}