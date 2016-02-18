function playAudio(id) {
    var audioElement = document.getElementById(id);
    var url = audioElement.getAttribute('src');
    var my_media = new Media(url,
		 function () { console.log("playAudio():Audio Success"); },
		 function (err) { console.log("playAudio():Audio Error: " + err); }
    );
    my_media.play();
}