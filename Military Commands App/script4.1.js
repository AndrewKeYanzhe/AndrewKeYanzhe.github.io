//Written by Andrew Ke Yanzhe 2019

//parameters
var debugMode = false;
var requiredScore = 20;

//constants
var correctBleep = new Audio();
correctBleep.src = "Audio/correct.mp3";
var wrongBleep = new Audio();
wrongBleep.src = "Audio/wrong.mp3";

//global variables to initialise
var lessonPages = null;
var testPages = null;

//memory variables
var currentlyTestedPage = null;
var currentAudioPlayingElement; //this stores an element like <button>
var wrongAns = null;
var showingLessons = false;

//progress variables
var vocabLearnt = Array(vocabList.length).fill(false); 
var timesVocabCorrect = Array(vocabList.length).fill(0); //times nth vocab correct is timesVocabCorrect[n]

//page management
function hidePages(){
    //console.log(document.getElementsByTagName("div"));
    Array.from(document.getElementsByTagName("div")).forEach(function(element){
       //console.log(element);
        element.style.display = 'none';
    });
}
var currentPage = -1;
var loadMode = 0;  
function newPage(){
    console.log("%cnewPage", "color:teal");      

    currentPage++;
    
    switch(loadMode){
        case -2:
            loadMainMenu();
            break;
        case -1:
            loadPage([Math.floor(Math.random() * 4), 3]);
            break;
        case 0:
            loadInOrder();
            break;
        case 1:
            //**lesson**//
            if (lessonPages == null){
                lessonPages = generateLesson();
                showingLessons = true;
            }            
            loadPage(lessonPages[currentPage]);            
            break;
        case 2:
            //**test**//            
            console.log("timesVocabCorrect ".concat(timesVocabCorrect));  
            
            //generating lesson
            if (testPages == null){
                testPages = generateTest();
            }
            
            //check if quiz is done
            var quizDone = true;
            timesVocabCorrect.forEach(function(score, index){
               if (score < requiredScore){
                   quizDone = false;
               } 
            });
            if (quizDone){
                alert("test is done");
            }
            
            //making sure quiz has enough questions
            if (testPages.length < noOfQuizzes * vocabList.length / 2){
                testPages = generateTest();
            }
            
            console.log(JSON.stringify(testPages));
            
            //removing first element of testPages
            currentlyTestedPage = testPages[0];
            testPages.shift();
            
            loadPage(currentlyTestedPage);
            break;
        default:
    }
}

//MCQ options generation
function generateOptions(vocab){
    //creating list of 4 items - 1 correct and 3 incorrect from vocablist
    var incorrectDefList = vocabList.filter(item => item !== vocab);
    
    //shuffle once to get 3 random wrong answers
    incorrectDefList = shuffle(incorrectDefList);
    
    //shuffle a second time to change order of options displayed
    var options = shuffle([vocab, incorrectDefList[0], incorrectDefList[1], incorrectDefList[2]]);    
    
    return options;
}

//handling answers
function handleWrongAns(wrongVocab, vocab, ansType){
    wrongBleep.play();
    wrongAns = wrongVocab;
    switch (ansType){
        case "malayWord":
            document.getElementsByClassName("correction")[0].getElementsByTagName("h3")[0].innerHTML = wrongVocab.malayWord;
            document.getElementsByClassName("correction")[0].getElementsByTagName("h3")[0].style.fontStyle = "oblique";
            document.getElementsByClassName("correction")[0].style.display = "block";
            break;
        case "engDef":
            document.getElementsByClassName("correction")[0].getElementsByTagName("h3")[0].innerHTML = wrongVocab.engDef;
            document.getElementsByClassName("correction")[0].getElementsByTagName("h3")[0].style.fontStyle = "normal";
            document.getElementsByClassName("correction")[0].style.display = "block";
            break;
        case "soundMCQ":
            break;
    }
    if (testPages !== null){
        
        testPages.splice(Math.floor(Math.random() * 3) + 3, 0, currentlyTestedPage);// insert randomly in next 3-6
//        testPages.splice(Math.floor(Math.random() * testPages.length) + 1, 0, currentlyTestedPage); //insert randomly in whole of test
    }
    document.getElementById("dictionary").classList.add('dictionaryCorrection');
    loadDictionary(vocab);
}
function handleCorrectAns(vocab){
    correctBleep.play();
    timesVocabCorrect[vocabList.indexOf(vocab)] = timesVocabCorrect[vocabList.indexOf(vocab)] + 1; 
    
    newPage();
}

//pages---------------------------------->

//Main Menu
function loadMainMenu(){
    mainMenuSec = document.getElementById("mainMenu");
    
    mainMenuSec.style.display = "block";
}

//Dictionary
var dictContinueButton = function(event){
    vocab = event.target.buttonParam[0];
    vocab.sound.pause();
    vocab.sound.currentTime = 0;
    
    unloadDictionary(dictDiv);
    //console.log('newpage from dict')
    newPage();
}
var loadDictionaryAudio = function(event){
    vocab = event.target.buttonParam[0];

    vocab.sound.play();

    
}
function loadDictionary(vocab){
    dictDiv = document.getElementById("dictionary");
    //show dictionary page
    dictDiv.style.display = 'block';
    
    //autoplay pronounciation on the first time
    if (vocabLearnt[vocabList.indexOf(vocab)] == false && showingLessons){
        vocab.sound.play();
        vocabLearnt[vocabList.indexOf(vocab)] = true;
    }

    //load data
    dictDiv.getElementsByTagName("h1")[0].innerHTML = vocab.malayWord;
    document.getElementById("engDef").innerHTML = vocab.engDef;
    dictDiv.getElementsByClassName("pronounciation")[0].addEventListener("click", loadDictionaryAudio);
    dictDiv.getElementsByClassName("pronounciation")[0].buttonParam = [vocab];
    
    dictDiv.getElementsByClassName("continue")[0].addEventListener("click", dictContinueButton);
    dictDiv.getElementsByClassName("continue")[0].buttonParam=[vocab];
    
    //vocab.sound.play();
}
function unloadDictionary(dictDiv){
    //console.log("unloading dict");
    dictDiv.getElementsByClassName("continue")[0].removeEventListener("click", dictContinueButton);    
    
    dictDiv.style.display = 'none';    
    
//    console.log(wrongAns)
    
    if (wrongAns !== null){
        dictDiv.getElementsByClassName("correction")[0].style.display="none";
        dictDiv.classList.remove('dictionaryCorrection');
        
        wrongAns = null;
    }
}

//MalayWordMCQ
var checkMalayWordMCQ = function(event){
    options = event.target.buttonParam[0];
    index = event.target.buttonParam[1];
    vocab = event.target.buttonParam[2];
    
    if (options[index] == vocab){        
        malayWordMCQDiv.style.display = 'none';
        handleCorrectAns(vocab);
    } else {        
        malayWordMCQDiv.style.display = 'none';
//        alert("answer wrong. next page will show the correct answer with english definition");
        handleWrongAns(options[index], vocab, "malayWord");        
    }
}
function loadMalayWordMCQ(vocab){
    //display div
    malayWordMCQDiv = document.getElementById("malayWordMCQ");    
    malayWordMCQDiv.style.display = 'block';
    
    //vocab is the correct answer    
    //var chosen tracks the option selected by the user
//    var chosen = null;    
    var options = generateOptions(vocab);
    //console.log(options); 
    
    //display choices and prompt  
    var i;
    for (i = 0; i < 4; i++){
        malayWordMCQDiv.getElementsByClassName("malay".concat(String(i)))[0].innerHTML = options[i].malayWord;
    }    
    malayWordMCQDiv.getElementsByTagName("h1")[0].innerHTML = vocab.engDef;
    
    //make buttons set var selected
    var j;
    for (j = 0; j < 4; j++){
        malayWordMCQDiv.getElementsByClassName("malay".concat(String(j)))[0].addEventListener("click", checkMalayWordMCQ);    
        malayWordMCQDiv.getElementsByClassName("malay".concat(String(j)))[0].buttonParam = [options, j, vocab]; 
    }
}

//Def MCQ Malay Prompt
var checkDefMCQ = function(event){    
    //options, index, vocab
    options = event.target.buttonParam[0];
    index = event.target.buttonParam[1];
    vocab = event.target.buttonParam[2];
    
    //pause all sounds
    vocab.sound.pause();
    vocab.sound.currentTime = 0;
    //chosen = options[index];  

    if (options[index] == vocab){
        defMCQDiv.style.display = 'none';
        handleCorrectAns(vocab);
    } else {
//        alert("answer wrong. next page will show the correct answer with english definition");
        defMCQDiv.style.display = 'none';
        handleWrongAns(options[index], vocab, "engDef");
    }
};
function loadDefMCQMalayPrompt(vocab){
    //vocab is the correct answer    
    //var chosen tracks the option selected by the user
//    var chosen;
    
    //show page
    defMCQDiv = document.getElementById("defMCQMalayPrompt");    
    defMCQDiv.style.display = 'block';
    
 
    
    //creating options list
    var incorrectDefList = vocabList.filter(item => item !== vocab);
    incorrectDefList = shuffle(incorrectDefList);
    var incorrectDef1 = incorrectDefList[0];
    var incorrectDef2 = incorrectDefList[1];
    var incorrectDef3 = incorrectDefList[2];
    var options = shuffle([vocab, incorrectDef1, incorrectDef2, incorrectDef3]);
    //console.log(options);
    
    //display malay word prompt
    defMCQDiv.getElementsByTagName("h1")[0].innerHTML = vocab.malayWord;
    //defMCQDiv.getElementsByTagName("h1")[0].buttonParam = [vocab];
    
    //display choices   
    var i;
    for (i = 0; i < 4; i++){
        defMCQDiv.getElementsByClassName("def".concat(String(i)))[0].innerHTML = options[i].engDef;
    }
    
    //make buttons set var selected
    var j;
    for (j = 0; j < 4; j++){
        defMCQDiv.getElementsByClassName("def".concat(String(j)))[0].addEventListener("click", checkDefMCQ);    
        defMCQDiv.getElementsByClassName("def".concat(String(j)))[0].buttonParam = [options, j, vocab]; 
    }
    //defMCQDiv.getElementsByClassName("def1")[0].addEventListener("click", function(){chosen = options[1]; checkDefMCQ(vocab, defMCQDiv, options)}) 

}

//Def MCQ Sound Prompt
var loadSoundPromptForDefMCQ = function(event){
    vocab = event.target.buttonParam[0];
    vocab.sound.play();
}
function loadDefMCQSoundPrompt(vocab){
    //vocab is the correct answer
    
    //var chosen tracks the option selected by the user
//    var chosen;
    
    //show page
    defMCQDiv = document.getElementById("defMCQSoundPrompt");    
    defMCQDiv.style.display = 'block';
        
    //creating options list
    var incorrectDefList = vocabList.filter(item => item !== vocab);
    incorrectDefList = shuffle(incorrectDefList);
    var incorrectDef1 = incorrectDefList[0];
    var incorrectDef2 = incorrectDefList[1];
    var incorrectDef3 = incorrectDefList[2];
    var options = shuffle([vocab, incorrectDef1, incorrectDef2, incorrectDef3]);
    //console.log(options);
    
    //attach sound to audio button
    defMCQDiv.getElementsByClassName("soundPrompt")[0].addEventListener("click", loadSoundPromptForDefMCQ);
    defMCQDiv.getElementsByClassName("soundPrompt")[0].buttonParam = [vocab];
    
    //display choices   
    var i;
    for (i = 0; i < 4; i++){
        defMCQDiv.getElementsByClassName("def".concat(String(i)))[0].innerHTML = options[i].engDef;
    }
    
    //make buttons set var chosen
    var j;
    for (j = 0; j < 4; j++){
        defMCQDiv.getElementsByClassName("def".concat(String(j)))[0].addEventListener("click", checkDefMCQ);    
        defMCQDiv.getElementsByClassName("def".concat(String(j)))[0].buttonParam = [options, j, vocab]; 
    }
    //defMCQDiv.getElementsByClassName("def1")[0].addEventListener("click", function(){chosen = options[1]; checkDefMCQ(vocab, defMCQDiv, options)}) 

}

//SoundMCQ
var loadSoundButton = function(event){
    //console.log("loading soundbutton sound and setting var chosen");
    //options, index
    options = event.target.buttonParam[0];
    index = event.target.buttonParam[1];
    
    //pause other sounds
    if (typeof currentAudioPlayingElement !== "undefined"){
        malayCommandObjBeingPlayed = options[currentAudioPlayingElement.buttonParam[1]];
        //console.log(malayCommandObjBeingPlayed.malayWord);
        malayCommandObjBeingPlayed.sound.pause();
        malayCommandObjBeingPlayed.sound.currentTime = 0;
    }
    
    currentAudioPlayingElement = event.target;
    //console.log(currentAudioPlayingElement);
    options[index].sound.play();
    options[index].sound.addEventListener("ended", function(){currentAudioPlayingElement = undefined;}, false);
    
    chosen = options[index];
    
    //diagnosis 
    //console.log("current var chosen is ".concat(chosen));
    //console.log(chosen);
};
function loadSoundCheckButton(event){
//    console.log("loadSoundCheckButton")
    //vocab, soundDiv, options
    vocab = event.target.buttonParam[0];
    soundDiv = event.target.buttonParam[1];
    options = event.target.buttonParam[2];
//    chosen = event.target.buttonParam[3];
    checkSoundMCQ(vocab, soundDiv, options);
}
function loadSoundMCQ(vocab){
//    console.log(">>>>>function loadSoundMCQ(vocab)")
    var chosen = null; //this keeps track of the option the user chooses and by default is undefined
//    console.log(chosen);
//    console.log(chosen == null);
    //show page
    soundDiv = document.getElementById("soundMCQ");
    soundDiv.style.display = 'block';
    

    //creating options list
    var incorrectSoundList = vocabList.filter(item => item !== vocab);
    //console.log(incorrectSoundList);
    incorrectSoundList = shuffle(incorrectSoundList);
    var incorrectSound1 = incorrectSoundList[0];
    var incorrectSound2 = incorrectSoundList[1];
    var options = shuffle([vocab, incorrectSound1, incorrectSound2]);
    //console.log(options);
        
    //display engDef
    soundDiv.getElementsByTagName("h1")[0].innerHTML = vocab.engDef;
    
    //make buttons play sound and also set var chosen
    var i;
    for (i = 0; i < 3; i++){
        soundDiv.getElementsByClassName("sound".concat(String(i)))[0].addEventListener("click", loadSoundButton);
        soundDiv.getElementsByClassName("sound".concat(String(i)))[0].buttonParam = [options, i];
        console.log("   ".concat(options[i].malayWord.replaceAll("&nbsp;", " ")));
    }
    soundDiv.getElementsByClassName("check")[0].addEventListener("click", loadSoundCheckButton);    
    soundDiv.getElementsByClassName("check")[0].buttonParam = [vocab, soundDiv, options];
    
    //console.log(soundDiv.getElementsByClassName("sound1")[0]);
    
}
function unloadSoundMCQ(soundDiv){
//    console.log(">>>>>function unloadSoundMCQ(soundDiv)")
    soundDiv.getElementsByClassName("sound0")[0].removeEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound1")[0].removeEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound2")[0].removeEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("check")[0].removeEventListener("click", loadSoundCheckButton);
}
function checkSoundMCQ(vocab, soundDiv, options,){
//    console.log("checkSoundMCQ");
    //pause other sounds
    if (typeof currentAudioPlayingElement !== "undefined"){
        malayCommandObjBeingPlayed = options[currentAudioPlayingElement.buttonParam[1]];
        //console.log(malayCommandObjBeingPlayed.malayWord);
        malayCommandObjBeingPlayed.sound.pause();
        malayCommandObjBeingPlayed.sound.currentTime = 0;
    }
    
    //check answer
//    console.log(chosen);
    if (typeof chosen === "undefined"){
        alert("Please select an option");
    } else if (chosen == vocab){
        unloadSoundMCQ(soundDiv);    
        soundDiv.style.display = 'none';
        handleCorrectAns(vocab);
    } else {
        chosen = undefined;
//        alert("answer wrong. next page will show the correct answer with english definition");
        unloadSoundMCQ(soundDiv);    
        soundDiv.style.display = 'none';
        
        handleWrongAns(null, vocab, "soundMCQ"); //no wrongAns is passed to function
    }
    
}
//pages---------------------------------->

//Order of displaying pages
function loadRandomPage(){
    var i = Math.floor(Math.random() * 5);
    var j = Math.floor(Math.random() * 4);
    console.log(i);
    console.log(j);

    switch(i){
        case 0:
            loadDictionary(vocabList[j]);
            break;
        case 1:
            loadSoundMCQ(vocabList[j]);
            break;
        case 2:
            loadDefMCQSoundPrompt(vocabList[j]);
            break;
        case 3:
            loadDefMCQMalayPrompt(vocabList[j]);
            break;
        case 4:
            loadMalayWordMCQ(vocabList[j]);
    }
}
function loadInOrder(){
    var vocabIndex = Math.floor(Math.random() * 4);
    //console.log(j);    

    if (currentPage>4){
        currentPage=0;
    }
    console.log("current page is ".concat(currentPage));
    
    switch(currentPage){
        case 0:
//            loadDictionary(vocabList[vocabIndex]);
            loadPage([vocabIndex,0]);
            break;
        case 1:
            loadSoundMCQ(vocabList[vocabIndex]);
            break;
        case 2:
            loadDefMCQSoundPrompt(vocabList[vocabIndex]);
            break;
        case 3:
            loadDefMCQMalayPrompt(vocabList[vocabIndex]);
            break;
        case 4:
            loadMalayWordMCQ(vocabList[vocabIndex]);
            break;
    }
}
function loadInOrder2(){
    var vocabIndex = Math.floor(Math.random() * 4);
    //console.log(j);    

    if (currentPage>4){
        currentPage=0;
    }
    console.log("current page is ".concat(currentPage));
    
    switch(currentPage){
        case 0:
            loadDefMCQMalayPrompt(vocabList[vocabIndex]);
            break;
        case 1:            
            loadSoundMCQ(vocabList[vocabIndex]);
            break;
        case 2:
            loadDefMCQSoundPrompt(vocabList[vocabIndex]);
            break;
        case 3:
            loadDictionary(vocabList[vocabIndex]);
            break;
        case 4:
            loadMalayWordMCQ(vocabList[vocabIndex]);
            break;
    }
}

function loadPage ([vocabIndex, page]){
    vocab = vocabList[vocabIndex];
//    console.log(page);
    switch(page){
        case 0:
//            console.log("loadLesson case 0");
            loadDictionary(vocab);
            break;
        case 1:
//            console.log("loadLesson case 1");
            loadMalayWordMCQ(vocab);
            break;
        case 2:
            loadDefMCQMalayPrompt(vocab);
            break;
        case 3:
            loadDefMCQSoundPrompt(vocab);
            break;
        case 4:
            loadSoundMCQ(vocab);
            break;
    }
}


window.onload = function(){   
    newPage();
}