//INFO

/*

case 0:
    loadDictionary(vocab);
case 1:
    loadMalayWordMCQ(vocab);
case 2:
    loadDefMCQMalayPrompt(vocab);
case 3:
    loadDefMCQSoundPrompt(vocab);
case 4:
    loadSoundMCQ(vocab);
    
*/

//Configuration
var noOfLessons = 5; // Refers to the number of MCQ + dict pages in html

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

//vocab
var vocabList = [
    senangDiri = new malayCommand("Senang diri", "Stand at ease", "Audio/senangDiri.m4a"),
    sedia = new malayCommand("Sedia", "Attention", "Audio/sedia.m4a"),
    berhenti = new malayCommand("Berhenti", "Stop", "Audio/berhenti.m4a"),
    dariKiriCepatJalan = new malayCommand("Dari&nbsp;kiri, cepat&nbsp;jalan", "March, commander on right", "Audio/dariKiriCJ.m4a"),
];
var noOfVocab = vocabList.length;


//Generating Lesson
console.log(">>>>>>>>>>>Generating Lesson>>>>>>>>>>>>")

//CREATING LESSONPAGES [[vocab, pageToShow]...]
console.log("creating LESSONPAGES [[vocab, pageToShow]...]")
var lessonPages = [];
for (var vocabIndex = 0; vocabIndex < noOfVocab; vocabIndex++){
    for(var quiz = 0; quiz < noOfLessons; quiz++){
        lessonPages.push([vocabIndex, quiz]);           
    }
}
console.log(JSON.stringify(lessonPages));

//CREATING PAGE INDICES TO REORDER LESSONPAGES
noOfPages = lessonPages.length;
pageIndices = range(noOfPages);
//console.log(JSON.stringify(pageIndices));

//REORDERING PAGE INDICES
//shifting soundMCQ
var shiftAmount = noOfVocab * noOfLessons;
for (var index = 0 ; index < pageIndices.length; index++){
    item = pageIndices[index];
    if ((item - 4) % 5 === 0){
//        console.log("Shifting soundMCQ");
        moveElementInArray(pageIndices, index, pageIndices.indexOf(item - 1) + 1 + shiftAmount);
    }
}
//shifting defQuizSoundProm
for (var index = 0 ; index < pageIndices.length; index++){
    item = pageIndices[index];
    if ((item - 3) % 5 === 0){
//        console.log("Shifting defQuizSoundProm");
        moveElementInArray(pageIndices, index, pageIndices.indexOf(item - 1) + 15);
    }
}
//shifting defQuizMalProm
for (var index = 0 ; index < pageIndices.length; index++){
    item = pageIndices[index];
    if ((item - 2) % 5 === 0){
//        console.log("shifting defQuizMalProm");
        moveElementInArray(pageIndices, index, pageIndices.indexOf(item - 1) + 7);
    }
}
//shifting malayWordQuiz
for (var index = 0 ; index < pageIndices.length; index++){
    item = pageIndices[index];
    if ((item - 1) % 5 === 0){
//        console.log("shifting malayWordQuiz");
        moveElementInArray(pageIndices, index, pageIndices.indexOf(item - 1) + 2);
    }
}

//console.log(pageIndices.indexOf((noOfVocab - 1) * noOfLessons + 2));
var noOfLessonsAfterLastMalayWordMCQ = 4
//lastMalayWordMCQ has index (noOfVocab - 1) * noOfLessons + 1) + 1
pageIndices = pageIndices.slice(0, pageIndices.indexOf( (noOfVocab - 1) * noOfLessons + 1) + 1 + noOfLessonsAfterLastMalayWordMCQ);

console.log("PAGE INDICES is an array of NUMBERS that represent position of pages in in LESSONPAGES. As follows:")
console.log(pageIndices);

//REORDERING LESSONPAGES
var lessonPages2 = [];
pageIndices.forEach(function(item, index){
//    console.log(item);
    lessonPages2.push(lessonPages[item]);
});
console.log("creating LESSONPAGES2 by replacing each number in PAGE INDICES with the actual page referenced");
console.log(JSON.stringify(lessonPages2));