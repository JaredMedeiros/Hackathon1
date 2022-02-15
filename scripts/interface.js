/* JS comes here */
		    function runSpeechRecognition() {
		        // get output div reference
		        let output = document.getElementById("output");
		        // get action element reference
		        let action = document.getElementById("action");
                // new speech recognition object
                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var recognition = new SpeechRecognition();
            
                // This runs when the speech recognition service starts
                recognition.onstart = function() {
                    action.innerText = "listening...";
                };
                
                recognition.onspeechend = function() {
                    action.innerText = "done! generating text...";
                    recognition.stop();
                }
              
                // This runs when the speech recognition service returns result
                recognition.onresult = function(event) {
                    let transcript = event.results[0][0].transcript;
                    output.innerText = transcript;
                    output.classList.remove("hide");
                    
                };
              
                 // start recognition
                 recognition.start();
	        }