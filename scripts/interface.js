function generateText(x) {
    let resultsContainer = document.querySelector('.result-box');
    let pTag = document.createElement('p');
    pTag.innerText = x;

    resultsContainer.appendChild(pTag)
}



function translateWord (str, lang) {

    const options = {
    method: 'POST',
    url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
    'content-type': 'application/json',
    'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
    'x-rapidapi-key': /* insert your api key */
    },
        data: {q: `${str}`, target: `${lang}`}
    };

    axios.request(options).then(function (response) {
    generateText(response.data.data.translations.translatedText)
    console.log(response.data.data.translations.translatedText);

    }).catch(function (error) {
	    console.error(error);
    });
}

let transcript;

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
        
        transcript = event.results[0][0].transcript;       
        console.log(transcript)
        output.innerText = transcript;
        output.classList.remove("hide");
        let languagecontainer = document.getElementById("languages-container")
        languagecontainer.classList.remove("hide");
        

    };
    

 
    recognition.start();
    // return final_transcript;
};

let listItem = document.querySelectorAll('.language-item');



//function to get last two in array: lan code, last two used to search
listItem.forEach(function(element) {
    element.addEventListener('click', function () {
        let strArr = element.innerText.split(':');
        let code = strArr[strArr.length - 1];
        code = code.trim();
        translateWord(transcript, code);
    })
})

// retrieve options and display them.
const options = {
    method: 'GET',
    url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
    'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
    'x-rapidapi-key': /* replace with your api key */
    }
};

axios.request(options).then(function (response) {
	let languageData = response.data.languages;

    for (let i = 0;  i < languageData.length; i++) {
        let lanCode = languageData[i].language;
        let languageName = languageData[i].name;


        let lanType = document.createElement('li');
        lanType.className = 'language-item'
        lanType.innerText = languageName + " : " + lanCode

        languageList.append(lanType)

    }

}).catch(function (error) {
	console.error(error);
});