//constants
var noOfVocab = 10;
var noOfQuizzes = 4;
debugMode = true    ;

console.log(">>>>>>>>>>>Generating Test>>>>>>>>>>>>");

//variables
var vocabOrder = shuffle(range(noOfVocab)); 
console.log("vocabOrder is ".concat(vocabOrder));
var testPages = [];

//logic
for (var index = 0; index < vocabOrder.length; index++){
    vocabItem = vocabOrder[index];

	var quizListForOneVocab = shuffle(range(noOfQuizzes));
	//debug(quizListForOneVocab);
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

