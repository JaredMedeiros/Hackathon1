// const { type } = require("express/lib/response");

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
    'x-rapidapi-key': 'cd85d7f71bmsh508b6b64dff8da8p1b943cjsnc3090c186953'
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
    // let final_transcript = "";
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
        // final_transcript = event.results[0][0];
        // text.push(transcript)
        output.classList.remove("hide");
        let languagecontainer = document.getElementById("languages-container")
        languagecontainer.classList.remove("hide");
        

    };
    // translateWord('hello', 'es');

 
    recognition.start();
    // return final_transcript;
};

let listItem = document.querySelectorAll('.language-item');



// // // //function to get last two in array: lan code, last two used to search
listItem.forEach(function(element) {
    element.addEventListener('click', function () {
        let strArr = element.innerText.split(':');
        let code = strArr[strArr.length - 1];
        code = code.trim();
        translateWord(transcript, code);
    })
})




// let languageSection = document.querySelector('.display-languages');

//where list of languages are being added
// let languageList = document.querySelector('.language');

// // console.log(languageList)

//translates the word.









// function translateWord (str, lang) {

//     const options = {
//     method: 'POST',
//     url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
//     headers: {
//     'content-type': 'application/json',
//     'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
//     'x-rapidapi-key': 'cd85d7f71bmsh508b6b64dff8da8p1b943cjsnc3090c186953'
//     },
//         data: {q: `${str}`, target: `${lang}`}
//     };

//     axios.request(options).then(function (response) {
// 	    console.log(response.data.data.translations.translatedText);
//     }).catch(function (error) {
// 	    console.error(error);
//     });
// }


        // translateWord('hello', 'es');


// retrieve options and display them.
const options = {
    method: 'GET',
    url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
    'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
    'x-rapidapi-key': 'cd85d7f71bmsh508b6b64dff8da8p1b943cjsnc3090c186953'
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


// let resultsContainer = document.querySelector('.result-box');
// console.log(resultsContainer) 


// // functions to display text on screen, will use function above to translate;
// // axios function;
// function generateText(x,y) {
//     let resultsContainer = document.querySelector('.result-box');
//     let pTag = document.createElement('p');
//     pTag.innerText = x + " ; " + y

//     resultsContainer.appendChild(pTag)
// }


// // //selects all list items and retrives value;
// let listItem = document.querySelectorAll('.language-item');



// // // // //function to get last two in array: lan code, last two used to search
// listItem.forEach(function(element) {
//     element.addEventListener('click', function () {
//         let strArr = element.innerText.split(':');
//         let code = strArr[strArr.length - 1];
//         // generateText('hello', code)
//         console.log(code)
//         console.log(transcript)
//     })
// })​​​




// function getLanguages () {
//     const options = {
//       method: 'GET',
//       url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
//       headers: {
//         'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
//         'x-rapidapi-key': 'cd85d7f71bmsh508b6b64dff8da8p1b943cjsnc3090c186953'
//       }
//     };

//     axios.request(options).then(function (response) {
//     	let langArr = response.data.languages;
        
//         langArr.forEach(element => {
//             console.log(element)
//         });

        
//     }).catch(function (error) {
//     	console.error(error);
//     });
// };


// // getLanguages()


// function translateWord (str, lang) {

//     const options = {
//     method: 'POST',
//     url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
//     headers: {
//     'content-type': 'application/json',
//     'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
//     'x-rapidapi-key': 'cd85d7f71bmsh508b6b64dff8da8p1b943cjsnc3090c186953'
//   },
//     data: {q: `${str}`, target: `${lang}`}
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data.data.translations.translatedText);
// }).catch(function (error) {
// 	console.error(error);
// });
// }

// translateWord('hello', 'es')