function runSpeechRecognition() {
	// store our output div as a variable
	let output = document.getElementById("output");
	// store our action as a variable
	 let action = document.getElementById("action");
    // create a new speech recognition obtion
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
            
     // Run this function when the speech recognition begins
    recognition.onstart = function() {
        action.innerText = "listening...";
    };
                
    //Recognize when the user is finished speaking and run this function generate a response
    recognition.onspeechend = function() {
        action.innerText = "done! generating text...";
        recognition.stop();
    }
              
    // Run this function when the speech recogition service returns a result
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        //add this result as inner text into our output, and remove the "hide" class so that it is now visible
        output.innerText = transcript;
        output.classList.remove("hide");
                    
    };
              
     // Start the voice recognition
        recognition.start();
}

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"accept-encoding": "application/gzip",
		"x-rapidapi-host": "google-translate1.p.rapidapi.com",
		"x-rapidapi-key": "e24289a261msh4ef0b0fb387853bp13e458jsn9d39a10e984a"
	},
	"data": {
		"q": "Hello, world!",
		"target": "es",
		"source": "en"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});