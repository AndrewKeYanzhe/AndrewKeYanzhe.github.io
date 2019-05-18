//Written by Andrew Ke Yanzhe 2019


//constants
var correctBeep = new Audio();
correctBeep.src = "Audio/bleep.mp3";

//Global variables
var progress = {
    senangDiri: {learnt: false}
}

class malayCommand {
    constructor(malayWord, engDef, audioName){
        //String Properties
        this.malayWord = malayWord;
        this.engDef = engDef;
        this.audioName = audioName;
        this.learnt = false
        
        //Audio File Source
        this.sound = new Audio();
        this.sound.src = this.audioName;
    }
}

const senangDiri = new malayCommand("Senang diri", "Stand at ease", "Audio/senangDiri.m4a");
const sedia = new malayCommand("Sedia", "Attention", "Audio/sedia.m4a");
const berhenti = new malayCommand("Berhenti", "Stop", "Audio/berhenti.m4a");
//const dariKiriCepatJalan = new malayCommand("Dari kiri, cepat jalan", "Towards the commander's left, quick march", "Audio/dariKiriCJ.m4a");
const dariKiriCepatJalan = new malayCommand("Dari kiri, cepat jalan", "March, Commander on right", "Audio/dariKiriCJ.m4a");
var vocabList = [senangDiri, sedia, berhenti, dariKiriCepatJalan];
//console.log(vocabList);
//console.log(vocabList.includes(senangDiri));

var currentAudioPlayingElement;

function hidePages(){
    //console.log(document.getElementsByTagName("div"));
    Array.from(document.getElementsByTagName("div")).forEach(function(element){
       //console.log(element);
        element.style.display = 'none';
    });
}
function newPage(){
    console.log("newPage"); 
    loadRandomPage();
}

function generateOptions(vocab){
    //creating list of 4 items - 1 correct and 3 incorrect from vocablist
    var incorrectDefList = vocabList.filter(item => item !== vocab);
    
    //shuffle once to get 3 random wrong answers
    incorrectDefList = shuffle(incorrectDefList);
    
    //shuffle a second time to change order of options displayed
    var options = shuffle([vocab, incorrectDefList[0], incorrectDefList[1], incorrectDefList[2]]);    
    
    return options;
}

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
    //vocab, soundDiv, options
    vocab = event.target.buttonParam[0];
    soundDiv = event.target.buttonParam[1];
    options = event.target.buttonParam[2];
    checkSoundMCQ(vocab, soundDiv, options);
}
function loadSoundMCQ(vocab){
    var chosen; //this keeps track of the option the user chooses and by default is undefined
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
        console.log(options[i].malayWord);
    }
    soundDiv.getElementsByClassName("check")[0].addEventListener("click", loadSoundCheckButton);
    
    soundDiv.getElementsByClassName("check")[0].buttonParam = [vocab, soundDiv, options];
    
    //console.log(soundDiv.getElementsByClassName("sound1")[0]);
    
}
function unloadSoundMCQ(soundDiv){
    console.log("unloading Sounds")
    soundDiv.getElementsByClassName("sound0")[0].removeEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound1")[0].removeEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound2")[0].removeEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("check")[0].removeEventListener("click", loadSoundCheckButton);
}
function checkSoundMCQ(vocab, soundDiv, options){
    //pause other sounds
    if (typeof currentAudioPlayingElement !== "undefined"){
        malayCommandObjBeingPlayed = options[currentAudioPlayingElement.buttonParam[1]];
        //console.log(malayCommandObjBeingPlayed.malayWord);
        malayCommandObjBeingPlayed.sound.pause();
        malayCommandObjBeingPlayed.sound.currentTime = 0;
    }
    
    //check answer
    if (typeof chosen == "undefined"){
        alert("Please select an option");
    } else if (chosen == vocab){
        correctBeep.play();
        unloadSoundMCQ(soundDiv);    
        soundDiv.style.display = 'none';
        newPage();
    } else {
        alert("answer wrong. next page will show the correct answer with english definition");
        loadDictionary(vocab);
        unloadSoundMCQ(soundDiv);    
        soundDiv.style.display = 'none';
    }
    
}

var loadDictionaryAudio = function(event){
    vocab = event.target.buttonParam[0];
    vocab.sound.play();
}
function loadDictionary(vocab){
    dictDiv = document.getElementById("dictionary");
    //show dictionary page
    dictDiv.style.display = 'block';
    dictDiv.getElementsByClassName("continue")[0].addEventListener("click", function(){
        unloadDictionary(dictDiv);
        newPage();
    });
    //load data
    dictDiv.getElementsByTagName("h1")[0].innerHTML = vocab.malayWord;
    dictDiv.getElementsByTagName("h2")[0].innerHTML = vocab.engDef;
    dictDiv.getElementsByClassName("pronounciation")[0].addEventListener("click", loadDictionaryAudio);
    dictDiv.getElementsByClassName("pronounciation")[0].buttonParam = [vocab];
    
    //vocab.sound.play();
}
function unloadDictionary(dictDiv){
    progress.senangDiri.learnt = true;
    
    //console.log(progress);
    dictDiv.style.display = 'none';    
}

var loadSoundPromptForDefMCQ = function(event){
    vocab = event.target.buttonParam[0];
    vocab.sound.play();
}
var checkDefMCQ = function(event){    
    //options, index, vocab
    options = event.target.buttonParam[0];
    index = event.target.buttonParam[1];
    vocab = event.target.buttonParam[2];
    
    //pause all sounds
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].pause();   
    //chosen = options[index];  

    if (options[index] == vocab){
        correctBeep.play();
        defMCQDiv.style.display = 'none';
        newPage();
    } else {
        alert("answer wrong. next page will show the correct answer with english definition");
        loadDictionary(vocab);
        defMCQDiv.style.display = 'none';
    }
};
function loadDefMCQSoundPrompt(vocab){
    //vocab is the correct answer
    
    //var chosen tracks the option selected by the user
    var chosen;
    
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
    defMCQDiv.getElementsByTagName("h1")[0].addEventListener("click", loadSoundPromptForDefMCQ);
    defMCQDiv.getElementsByTagName("h1")[0].buttonParam = [vocab];
    
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
//NOTE NOTE may need to create unload defMCQ in the future

var checkMalayWordMCQ = function(event){
    options = event.target.buttonParam[0];
    index = event.target.buttonParam[1];
    vocab = event.target.buttonParam[2];
    
    if (options[index] == vocab){
        correctBeep.play();
        malayWordMCQDiv.style.display = 'none';
        newPage();
    } else {
        alert("answer wrong. next page will show the correct answer with english definition");
        loadDictionary(vocab);
        malayWordMCQDiv.style.display = 'none';
    }
}
function loadMalayWordMCQ(vocab){
    //display div
    malayWordMCQDiv = document.getElementById("malayWordMCQ");    
    malayWordMCQDiv.style.display = 'block';
    
    //vocab is the correct answer    
    //var chosen tracks the option selected by the user
    var chosen;    
    var options = generateOptions(vocab);
    //console.log(options); 
    
    //display choices and prompt  
    var i;
    for (i = 0; i < 4; i++){
        malayWordMCQDiv.getElementsByClassName("malay".concat(String(i)))[0].innerHTML = options[i].malayWord;
    }    
    malayWordMCQDiv.getElementsByTagName("h1")[0].innerHTML = vocab.engDef;
    
    //make buttons set var chosen
    var j;
    for (j = 0; j < 4; j++){
        malayWordMCQDiv.getElementsByClassName("malay".concat(String(j)))[0].addEventListener("click", checkMalayWordMCQ);    
        malayWordMCQDiv.getElementsByClassName("malay".concat(String(j)))[0].buttonParam = [options, j, vocab]; 
    }
}

function loadDefMCQMalayPrompt(vocab){
    //vocab is the correct answer
    
    //var chosen tracks the option selected by the user
    var chosen;
    
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
    
    //make buttons set var chosen
    var j;
    for (j = 0; j < 4; j++){
        defMCQDiv.getElementsByClassName("def".concat(String(j)))[0].addEventListener("click", checkDefMCQ);    
        defMCQDiv.getElementsByClassName("def".concat(String(j)))[0].buttonParam = [options, j, vocab]; 
    }
    //defMCQDiv.getElementsByClassName("def1")[0].addEventListener("click", function(){chosen = options[1]; checkDefMCQ(vocab, defMCQDiv, options)}) 

}

function loadRandomPage(){
    var i = Math.floor(Math.random() * 4);
    var j = Math.floor(Math.random() * 4);

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
            loadMalayWordMCQ(vocabList[j]);
            break;
    }
}

window.onload = function(){
    loadSoundMCQ(sedia);
//    loadSoundMCQ(sedia);
    //loadRandomPage();
    //loadDefMCQMalayPrompt(senangDiri);
    //loadDefMCQMalayPrompt(senangDiri);
    //loadDictionary(sedia);
}
//show that classes are initiated with properly with test attributes
//console.log(senangDiri.audioName);
//console.log(senangDiri.engDef);
//console.log(senangDiri.malayWord);