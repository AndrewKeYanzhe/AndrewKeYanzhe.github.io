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

var noOfVocab = 4;
var noOfLessons = 5;
var lessonPages = [];

for (var vocabIndex = 0; vocabIndex < noOfVocab; vocabIndex++){
    for(var quiz = 0; quiz < noOfLessons; quiz++){
        lessonPages.push([vocabIndex, quiz]);           
    }
}
//console.log(lessonPages);

//FAILED ATTEMP TO SHUFFLE LESSONPAGES
//for (var vocabIndex = 0; vocabIndex < noOfVocab; vocabIndex++){
//    for (var pageIndex = 0; pageIndex < noOfPages; pageIndex++){
////        console.log(lessonPages[pageIndex]);
////        console.log([vocabIndex, 1]);
////        console.log(JSON.stringify(lessonPages[pageIndex]) == JSON.stringify([vocabIndex, 1]));
////        if (JSON.stringify(lessonPages[pageIndex]) == JSON.stringify([vocabIndex, 1]) ){
////            console.log("Shifting");
//////            console.log(lessonPages.indexOf([vocabIndex, 0]));
////            for(var k = 0; k < pageIndex.length; k++){
////                if(arr[k][0] == vocabIndex && arr[k][1] == 0){
////                    break;
////                }
////            }
////            dictIndex = k;
//////            console.log(lessonPages, pageIndex, lessonPages.indexOf([vocabIndex, 0]));
////            moveElementInArray(lessonPages, pageIndex, dictIndex + 2);
////            console.log(lessonPages);
////            pageIndex--;
////            break;
////        }
//    }
//}
//console.log(moveElementInArray([1, 3, 4], 0, 4));

noOfPages = lessonPages.length;
pageIndices = range(noOfPages);
//console.log(JSON.stringify(pageIndices));


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

console.log("pageIndices:")
console.log(pageIndices);

var lessonPages2 = [];
pageIndices.forEach(function(item, index){
//    console.log(item);
    lessonPages2.push(lessonPages[item]);
});
console.log("lessonPages2");
console.log(lessonPages2);