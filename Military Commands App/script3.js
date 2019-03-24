//var senangDiri = new Audio();
//senangDiri.src = "bleep.mp3";

//Global variables
var progress = {
    senangDiri: {learnt: false}
}
//console.log(progress);


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


function newPage(){
    console.log("newPage"); 
    document.getElementById("soundMCQ").style.display = 'block';
}
function loadDictionary(){
    document.getElementById("dictionary").style.display = 'block';
    //var targetDiv = document.getElementById("dictionary").getElementsByClassName("h1") = "abc";

}
function dictionaryDone(){
    progress.senangDiri.learnt = true;
    console.log(progress);
    document.getElementById("dictionary").style.display = 'none';
    
}

const senangDiri = new malayCommand("Senang diri", "At ease", "bleep.mp3");

window.onload = function(){   
    //set Continue buttons' functions FIX THISISSSSSSS
    console.log(document.getElementById("dictionary").getElementsByClassName("scontinue")[0]);
    console.log(document.getElementById("dictContinue"));
    document.getElementById("dictContinue").addEventListener("click", function(){
        dictionaryDone();
        newPage();
    });
    
    loadDictionary();
}
//show that classes are initiated with properly with test attributes
//console.log(senangDiri.audioName);
//console.log(senangDiri.engDef);
//console.log(senangDiri.malayWord);