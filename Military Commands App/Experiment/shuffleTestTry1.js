//constants
var noOfVocab = 10;
var noOfQuizzes = 4;

//variables
var vocabOrder = shuffle(range(noOfVocab)); 
console.log("vocabOrder is ".concat(vocabOrder));
var pageOrder = [];
var timesVocabCorrect = Array(10).fill(0); //times nth vocab correct is timesVocabCorrect[n]
//console.log(timesVocabCorrect)

//logic
for (var index = 0; index < vocabOrder.length; index++){
    vocabItem = vocabOrder[index];

	var quizListForOneVocab = shuffle(range(noOfQuizzes));
	//console.log(quizListForOneVocab);
	quizListForOneVocab.forEach(function (quiz, index){
		//console.log([vocabItem, quiz]);
		pageOrder.push([vocabItem, quiz]);    		
	});
}
console.log(pageOrder);

var pageOrder2 = pageOrder;
//CUSTOM SHUFFLE //
for (var vocabItem = 0; vocabItem < noOfVocab; vocabItem++){
    console.log("vocab item is ".concat(vocabItem));	
	var pagesToRemove = [];

    for (var page = 0; page < pageOrder.length; page++){
        pageContent = pageOrder[page];
//        console.log("   page is ".concat(page));
//        console.log("   page content is".concat(JSON.stringify(pageContent)));
		if (pageContent[0] == vocabItem){
			pagesToRemove.push(pageContent);
			pageOrder2 = pageOrder2.filter(function(page2Content) { return page2Content != pageContent; }); 
		}
//        console.log("          pagesToRemove is ".concat(JSON.stringify(pagesToRemove)));      
    }
        
	if (pagesToRemove.length == 0){
		continue;
	}
	
	var spacing = Math.random()*3;
    noOfSpaces = noOfQns/spacing;
    console.log("spacing is ".concat(spacing));
	var positionList = [];
	var noOfQns = pageOrder2.length;	
	positionList.push(noOfQns);
    
	for (var position = 0; position < noOfSpaces; position++){		positionList.push(Math.floor(position*noOfQns/noOfSpaces));
	}
	positionList = shuffle(positionList);
	positionList = positionList.slice(0, noOfQuizzes);
	positionList = positionList.sort((a, b) => a - b);
    console.log("   positionList is ".concat(positionList));
    
    positionList.forEach(function (position, index){
       pageOrder2.splice(position + index, 0, pagesToRemove[index]);
    });
    console.log(pageOrder2);
}
console.log(pageOrder2);
console.log(JSON.stringify(pageOrder2));

//alternative shuffle algorithm
//console.log(JSON.stringify(shuffle(pageOrder)));

