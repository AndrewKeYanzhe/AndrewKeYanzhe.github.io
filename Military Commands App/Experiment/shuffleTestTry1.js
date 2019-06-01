//constants
var noOfVocab = 10;
var noOfQuizzes = 4;

//variables
var vocabOrder = shuffle(range(noOfVocab)); 
console.log("vocabOrder is ".concat(vocabOrder));
var testPages = [];
var timesVocabCorrect = Array(10).fill(0); //times nth vocab correct is timesVocabCorrect[n]
//console.log(timesVocabCorrect)

//logic
console.log(">>>>>>>>>>>Generating Test>>>>>>>>>>>>")
for (var index = 0; index < vocabOrder.length; index++){
    vocabItem = vocabOrder[index];

	var quizListForOneVocab = shuffle(range(noOfQuizzes));
	//console.log(quizListForOneVocab);
	quizListForOneVocab.forEach(function (quiz, index){
		//console.log([vocabItem, quiz]);
		testPages.push([vocabItem, quiz]);    		
	});
}
console.log(testPages);

var unshuffledTestPages = testPages;
//CUSTOM SHUFFLE //
for (var vocabItem = 0; vocabItem < noOfVocab; vocabItem++){
    console.log("vocab item is ".concat(vocabItem));	
	var pagesToRemove = [];

    for (var page = 0; page < unshuffledTestPages.length; page++){
        pageContent = unshuffledTestPages[page];
//        console.log("   page is ".concat(page));
//        console.log("   page content is".concat(JSON.stringify(pageContent)));
		if (pageContent[0] == vocabItem){
			pagesToRemove.push(pageContent);
			testPages = testPages.filter(function(page2Content) { return page2Content != pageContent; }); 
		}
//        console.log("          pagesToRemove is ".concat(JSON.stringify(pagesToRemove)));      
    }
        
	if (pagesToRemove.length == 0){
		continue;
	}
    
	var noOfQns = testPages.length;
	var spacing = Math.random()*3;
    noOfSpaces = noOfQns/spacing;
    console.log("spacing is ".concat(spacing));
    console.log("noOfSpaces is ".concat(noOfSpaces));
	var positionList = [];		
	positionList.push(noOfQns);
    
	for (var position = 0; position < noOfSpaces; position++){		positionList.push(Math.floor(position*noOfQns/noOfSpaces));
	}
	positionList = shuffle(positionList);
	positionList = positionList.slice(0, noOfQuizzes);
	positionList = positionList.sort((a, b) => a - b);
    console.log("   positionList is ".concat(positionList));
    
    positionList.forEach(function (position, index){
       testPages.splice(position + index, 0, pagesToRemove[index]);
    });
    console.log(JSON.stringify(testPages));
}
console.log(testPages);
console.log(JSON.stringify(testPages));

//alternative shuffle algorithm
//console.log(JSON.stringify(shuffle(testPages)));

