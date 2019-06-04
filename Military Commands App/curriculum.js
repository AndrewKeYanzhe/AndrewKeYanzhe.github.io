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
var noOfLessons = 5; // MCQ + dict page
var noOfQuizzes = 4; // MCQ 

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

function generateLesson(){
    console.log("%cgenerating lesson", 'background: white; color: purple')
    
    //CREATING LESSONPAGES [[vocab, pageToShow]...]
    console.log("LESSONPAGES creation [[vocab, pageToShow]...]")
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
    var noOfLessonsAfterLastMalayWordMCQ = 4;
    //lastMalayWordMCQ has index (noOfVocab - 1) * noOfLessons + 1) + 1
    pageIndices = pageIndices.slice(0, pageIndices.indexOf( (noOfVocab - 1) * noOfLessons + 1) + 1 + noOfLessonsAfterLastMalayWordMCQ);

    console.log("PAGE INDICES: number N refers to Nth element in LESSONPAGES [N1, N2...]");
    console.log(pageIndices);

    //REORDERING LESSONPAGES
    var unshuffledLessonPages = lessonPages;
    var lessonPages = [];
    pageIndices.forEach(function(item, index){
    //    console.log(item);
        lessonPages.push(unshuffledLessonPages[item]);
    });
    console.log("LESSONPAGES recreation by replacing N in PAGE INDICES with LESSONPAGES[N]");
    console.log(JSON.stringify(lessonPages));
        
    console.log("%cgenerated lesson", 'background: white; color: purple')
    
    return lessonPages;
}
function generateTest(){
    console.log("%cgenerating test", "color:maroon");

    //variables
    var vocabOrder = shuffle(range(noOfVocab)); 
    console.log("vocabOrder is ".concat(vocabOrder));
    var testPages = [];

    //logic
    for (var index = 0; index < vocabOrder.length; index++){
        vocabItem = vocabOrder[index];

        var quizListForOneVocab = shuffle(range(noOfQuizzes));
        quizListForOneVocab = quizListForOneVocab.map(function(item) {
          return item + 1;
        }); //change range from 0-3 to 1-4 since page0 is dict and page1-4 are quizzes
        
        quizListForOneVocab.forEach(function (quiz, index){
            //debug([vocabItem, quiz]);
            testPages.push([vocabItem, quiz]);    		
        });
    }
    debug(testPages);

    var unshuffledTestPages = testPages;
    //CUSTOM SHUFFLE //
    for (var vocabItem = 0; vocabItem < noOfVocab; vocabItem++){
        debug("vocab item is ".concat(vocabItem));	
        var pagesToRemove = [];

        for (var page = 0; page < unshuffledTestPages.length; page++){
            pageContent = unshuffledTestPages[page];
    //        debug("   page is ".concat(page));
    //        debug("   page content is".concat(JSON.stringify(pageContent)));
            if (pageContent[0] == vocabItem){
                pagesToRemove.push(pageContent);
                testPages = testPages.filter(function(page2Content) { return page2Content != pageContent; }); 
            }
    //        debug("          pagesToRemove is ".concat(JSON.stringify(pagesToRemove)));      
        }

        if (pagesToRemove.length == 0){
            continue;
        }

        var noOfQns = testPages.length;
        var spacing = Math.random()*3;
        noOfSpaces = noOfQns/spacing;
        debug("spacing is ".concat(spacing));
        debug("noOfSpaces is ".concat(noOfSpaces));
        var positionList = [];		
        positionList.push(noOfQns);

        for (var position = 0; position < noOfSpaces; position++){		positionList.push(Math.floor(position*noOfQns/noOfSpaces));
        }
        positionList = shuffle(positionList);
        positionList = positionList.slice(0, noOfQuizzes);
        positionList = positionList.sort((a, b) => a - b);
        debug("   positionList is ".concat(positionList));

        positionList.forEach(function (position, index){
           testPages.splice(position + index, 0, pagesToRemove[index]);
        });
        debug(JSON.stringify(testPages));
    }
    //debug(testPages);
    console.log("testPages length is ".concat(testPages.length));
    console.log(JSON.stringify(testPages));

    //alternative shuffle algorithm
    //debug(JSON.stringify(shuffle(testPages)));
    
    console.log("%cgenerated test", "color:maroon");

    
    return testPages;
}