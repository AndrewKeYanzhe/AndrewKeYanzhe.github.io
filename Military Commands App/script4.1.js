//Written by Andrew Ke Yanzhe 2019
//Imported algorithms
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//constants
var correctBeep = new Audio();
correctBeep.src = "bleep.mp3";

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
const senangDiri = new malayCommand("Senang diri", "Stand at ease", "senangDiri.m4a");
const sedia = new malayCommand("Sedia", "Attention", "sedia.m4a");
const berhenti = new malayCommand("Berhenti", "Stop", "berhenti.m4a");
const dariKiriCepatJalan = new malayCommand("Dari kiri, cepat jalan", "Towards the commander's left, quick march", "dariKiriCepatJalan.m4a");
var vocabList = [senangDiri, sedia, berhenti, dariKiriCepatJalan];
//console.log(vocabList);
//console.log(vocabList.includes(senangDiri));

function hidePages(){
    //console.log(document.getElementsByTagName("div"));
    Array.from(document.getElementsByTagName("div")).forEach(function(element){
       //console.log(element);
        element.style.display = 'none';
    });
}
function newPage(){
    console.log("newPage"); 
    loadSoundMCQ(senangDiri);
}
var loadSoundButton = function(event){
    //options, chosen, index
    options = event.target.buttonParam[0]
    chosen = event.target.buttonParam[1]
    index = event.target.buttonParam[2]
    options[index].sound.play();
    chosen = options[0];
};
function loadSoundMCQ(vocab){
    var chosen = vocab;
    
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
    console.log(options);
        
    //load data
    soundDiv.getElementsByTagName("h1")[0].innerHTML = vocab.engDef;
    soundDiv.getElementsByClassName("sound0")[0].addEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound0")[0].buttonParam = [options, chosen, 0]
    soundDiv.getElementsByClassName("sound1")[0].addEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound1")[0].buttonParam = [options, chosen, 1]
    soundDiv.getElementsByClassName("sound2")[0].addEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound2")[0].buttonParam = [options, chosen, 2]
    soundDiv.getElementsByClassName("check")[0].addEventListener("click", function(){checkSoundMCQ(chosen, vocab, soundDiv, options)});
    //console.log(soundDiv.getElementsByClassName("sound1")[0]);
    
}
function unloadSoundMCQ(soundDiv, options){
    console.log("unloading Sounds")
    soundDiv.getElementsByClassName("sound0")[0].removeEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound1")[0].removeEventListener("click", loadSoundButton);
    soundDiv.getElementsByClassName("sound2")[0].removeEventListener("click", loadSoundButton);
}
function checkSoundMCQ(chosen, vocab, soundDiv, options){
    unloadSoundMCQ(soundDiv, options);
    if (chosen == vocab){
        correctBeep.play();
        
        newPage();
    } else {
        loadDictionary(vocab);
        soundDiv.style.display = 'none';
    }
    
}
function loadDictionary(vocab){
    dictDiv = document.getElementById("dictionary");
    //show dictionary page
    dictDiv.style.display = 'block';
    dictDiv.getElementsByClassName("continue")[0].addEventListener("click", function(){
        dictionaryDone(dictDiv);
        newPage();
    });
    //load data
    dictDiv.getElementsByTagName("h1")[0].innerHTML = vocab.malayWord;
    dictDiv.getElementsByTagName("p")[0].innerHTML = vocab.engDef;
    dictDiv.getElementsByClassName("pronounciation")[0].addEventListener("click", function(){vocab.sound.play()});
    
    //vocab.sound.play();
}
function dictionaryDone(dictDiv){
    progress.senangDiri.learnt = true;
    //console.log(progress);
    dictDiv.style.display = 'none';    
}

window.onload = function(){       
    loadDictionary(senangDiri);
}
//show that classes are initiated with properly with test attributes
//console.log(senangDiri.audioName);
//console.log(senangDiri.engDef);
//console.log(senangDiri.malayWord);