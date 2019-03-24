//var senangDiri = new Audio();
//senangDiri.src = "bleep.mp3";
var progress = {
    senangDiri: ["learnt", false]
}
console.log(progress);


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
    senangDiri.sound.play();    
}
function dictionaryDone(){
    //Locating the current class for modification
    var dictionaryDiv = document.getElementById("dictionary");
    var currentClass = dictionaryDiv.getAttribute("currentClass");
    console.log(currentClass);
    console.log(senangDiri);
    
    var malayCommandHolder = JSON.parse(currentClass);
    console.log(malayCommandHolder);
}


const senangDiri = new malayCommand("Senang diri", "At ease", "bleep.mp3");

//show that classes are initiated with properly with test attributes
//console.log(senangDiri.audioName);
//console.log(senangDiri.engDef);
//console.log(senangDiri.malayWord);