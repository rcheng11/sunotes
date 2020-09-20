// Flashcards begin with the index number of the front card currently displayed. The flashcards array is a series of arrays. The array index is stored as the flashcard module's id number in the format fc-i, where i is the index number
let flashcards = [[1,"mitochondria","powerhouse of the cell","cell","smallest unit of life"]];
// heaerNum variable keeps track of headers with summaries to add an id to attach event Listeners to
let headerNum = 0;
// the fillInAnswers array stores all fill in answers, the id number is equal to the index position of the answer
let fillInAnswers = ["fill"]
let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

// the multiple choice object which takes in the question string and a choices string
function Mcq(mcqString){
  let mcqArray = mcqString.split(",,").filter(x => x !="");
  let choices = mcqArray.slice(1).join(",,");
  this.question = mcqArray[0];
  // keeps the $# so that the correct choices can be taken out, and then later removes them
  this.rawChoices = choices.split(",,").filter(x => x !="")
  this.choices = choices.split(",,").filter(x => x != "").map(function(choice){
    let output = choice.split("$#").join("");
    // removes leading spaces
    if(output.slice(0,1)==" "){
      output = output.slice(1);
    }
    return output
  })
  this.correct = this.rawChoices.filter(x => x.includes("$#")).map(function(choice){
    let output = choice.split("$#").join("");
    if(output.slice(0,1)==" "){
      output = output.slice(1);
    }
    return output
  })
  //removes any $!
  // returns choices, calls a function with the option to shuffle choices from the original order
  this.getChoices= function(randomize=false)   {
    if(randomize==true){
      return shuffle(this.choices)
    }
    else{
      return this.choices;
    }

  }
}

// the mcqList array stores multiple choice questions as multiple choice objects
// initializes the example mcq
let mcqList = [new Mcq("How many inches are in two feet,,12,, $#24,, 18,, 36,, 92,, 18")]

// FLASHCARDS --------------------------------
// Flashcard Click Animation and left right buttons
function addEventListenerFc(fcModuleName){

  let id = "#"+fcModuleName
  let flashcard = $(id).find(".flashcard")
  let leftArrow = $(id).find(".fa-arrow-alt-circle-left")
  let rightArrow = $(id).find(".fa-arrow-alt-circle-right")

  // add the event listeners
  flashcard.click(function(){
  let card = $(this)
  let isFront = card.find(".text-back").css("display") == "none"
  if(isFront ==true){
    card.find(".text-front").hide()
  }
  else{
    card.find(".text-back").hide()
  }
  card.animate({
      height: "0%",
      top: "100px",
      backgroundColor: "#e3e3e3"
    },300)
  card.animate({
      height: "80%",
      top: "-10px",
      backgroundColor:"white"
    },300)
  setTimeout(function(){
    if(isFront ==true){
    card.find(".text-back").show()
  }
  else{
    card.find(".text-front").show()
  }
  },600)

  })

// Left Arrow Move to Left Card
leftArrow.click(function(){
  let arrow = $(this)
  let fc = $(id).find(".flashcard")
  let fcIndex = parseInt($(id).attr("id").slice(-1))
  let deck = flashcards[fcIndex]
  // if the deck cannot go any more to the left
  if(deck[0] >= 3){
    prevCard(fc, deck)
    if(deck[0] <= 3){
      grayOut(arrow);
    }
  }
  setCardNum(fc, deck)
  if(deck[0] < deck.length-2){
        unGray(arrow.parent().find(".fa-arrow-alt-circle-right"));
      }
})

// Right Arrow move to Next Card
rightArrow.click(function(){
  let arrow = $(this)
  let fc = $(id).find(".flashcard")
  let fcIndex =           parseInt($(id).attr("id").slice(-1))
  let deck = flashcards[fcIndex]
  if(deck[0] < deck.length-2){
    nextCard(fc, deck)
    // adds graying effect
    if(deck[0] >= deck.length-2){
      grayOut(arrow);
    }
  }
  setCardNum(fc, deck)
  if(deck[0] >= 3){
        unGray(arrow.parent().find(".fa-arrow-alt-circle-left"));
      }
})
}

// Arrows to switch between
// grays out arrows
function grayOut(arrow){
   arrow.css("filter","opacity(25%)")
}
function unGray(arrow){
   arrow.css("filter","")
}

// nextCard and prevCard functions take in the flashcard element inside of the flashcard module as a parameter
function nextCard(flashcard, deck){
    let indexOfCurrent = deck[0]
    let front =  flashcard.find(".text-front")
    let back = flashcard.find(".text-back")
    deck[0] += 2
    front.html(deck[indexOfCurrent+2])
    back.html(deck[indexOfCurrent+3])
    front.show()
    back.hide()
}
function prevCard(flashcard, deck){
    let indexOfCurrent = deck[0]
    deck[0] -=2
    let front =  flashcard.find(".text-front")
    let back = flashcard.find(".text-back")
    front.html(deck[indexOfCurrent-2])
    back.html(deck[indexOfCurrent-1])
    front.show()
    back.hide()
}
// helper function that adds title attribute that tells you what flashcard it is out of the total flashcards; for totalCards calculation, it uses deck.length-1 to account for the deck[0] being a count of the current card
function setCardNum(flashcard, deck){
  let currentCard = Math.ceil(deck[0]/2)
  let totalCards = Math.ceil((deck.length-1)/2)
  flashcard.attr("title", `(${currentCard}/${totalCards})`)
}

// returns HTML for the flashcard module
function createModuleFc(flashcardString){
  // split string of flashcards by comma and remove any blanks
  let fcList = flashcardString.split(",,").filter(card => card != "")
  // create a new deck/array inside of the flashcards deck and add the current card number
  fcList.unshift(1)
  flashcards.push(fcList)
  let paragraphs = `<p class="text-front">${fcList[1]}</p>
      <p class="text-back">${fcList[2]}</p>`;
  // return the entire flashcard module as html elements
  return `<div id="fc-${flashcards.length-1}" class="module-flashcard">
    <div class="flashcard">
        ${paragraphs}
      </div>
    <i class="fas fa-arrow-alt-circle-left arrow-icon"></i>
      <i class="fas fa-arrow-alt-circle-right arrow-icon"></i>
    </div>`
}

addEventListenerFc("fc-0")

// -------------------------------------------
// Headings - Note: Header underlining currently bugged due to event listeners. Every time a heading is added, all other headings have their event listener for click to underline removed
function addEventListenerHead(){
  $(".header").click(function(){
  let head = $(this)
  if(head.attr("class").includes("underline")){
    head.removeClass("underline")
  }
  else{
    head.addClass("underline")
  }
})
}
addEventListenerHead();

function addEventListenerSummary(target){
  target = $("#" + target)
  target.click(function(){
    target.siblings(".summary-box").slideDown()
  })
  $(".close-icon").click(function(){
  $(this).parent().slideUp();
})
}
addEventListenerSummary("h-0")

//close button hides parent


function createModuleHead(headerString, style){
  let hasSummary = headerString.includes(",,")
  if(hasSummary){
    // splits a string with summary into an array
    // the header is at index 0, summary at index 1
    let splitString = headerString.split(",,")
    headerNum++;
    return `<div class="module-header">
  <h1 id="h-${headerNum}" class="header header-${style}">${splitString[0]}
  </h1>
  <div class="summary-box">
    <i class="fas fa-window-close close-icon"></i>
    <p>${splitString[1]}</p>
  </div>
</div>`;
  }
  return `<h1 class="header header-${style}">${headerString}</h1>`;
}

// -------------------------------------------
// Fill Ins
// Upon keydown event inside of a fill in input, check if answer is correct or if the input is three question marks
function addEventListenerFi(id){
  $("#"+id).keydown(function(){
  let fillIn = $(this)
  let idNumber = parseInt(fillIn.attr("id").slice(-1))
  let red = "#bd5c46"
  let green = "#79b853"
  // handles checking if fill in is correct or not
  setTimeout(function(){
    if(fillIn.val() == "???"){
      fillIn.val(fillInAnswers[idNumber])
    }
    if(fillIn.val().toLowerCase() == fillInAnswers[idNumber]){
    fillIn.css("border-color", green)
  }
  else{
    fillIn.css("border-color", red)
  }
  })
    // changes width of input
  if(fillIn.val().length > 9){
      let newLength = 100+(fillIn.val().length-9)*10
      fillIn.css('width',newLength+"px");
    }
    else{
      fillIn.css('width',"100px");
    }

})
}
addEventListenerFi("fi-0")

function createModuleFi(fillInString){
  let splitString = fillInString.split(",,").filter(word => word != "")
  let fillInSequence = ""
  for(let i = 0; i < splitString.length; i++){
    // if at even position, it is NOT a fill in
    if(i%2==0){
      fillInSequence += splitString[i]
    }
    // if at an odd position, it MUST be a fill in
    else{
      //push new item to fill in answers and add an id equal to the index position where it is inserted (assumed to be the length of the array minus 1)
      fillInAnswers.push(splitString[i].toLowerCase())
      fillInSequence += `<input class="fill-in" id="fi-${fillInAnswers.length-1}"></input>`
    }
  }
  return `<div class="module-fill-in">
  <p>${fillInSequence}</p>
</div>`
}


// -------------------------------------------
// Multiple Choice CURR
function addEventListenerMcq(){
  $(".mc-choice").off();
  $(".mc-choice").click(function(){
  let choice = $(this)
  // questionId grabs the last number of the id and converts it into an integer type
  let questionId = parseInt(choice.parent().parent().attr("id").slice(-1))
  // grabs only the value of the choice, removing the letter, parenthesis, and space
  let choiceVal = choice.html().slice(3)
   // grabs the question from the array
  let question = mcqList[questionId]
  if(question.correct.includes(choiceVal)){
    choice.css("background-color","#b3eba2")
  }
  else{
    choice.css("background-color","#e6908a")
  }
})
}
addEventListenerMcq()

function createModuleMcq(mcqString){
  mcqList.push(new Mcq(mcqString))
  let choiceOutput = "";
  mcqList[mcqList.length-1].getChoices().forEach(function(element,index){
    choiceOutput += `<p class="mc-choice">${letters[index]}) ${element}</p>`
  })
  // mcqList.length-1 is the position in the mcqList array
  return `<div id="mc-${mcqList.length-1}" class="module-mc">
   <p class="mc-question">${mcqList[mcqList.length-1].question}</p>
  <div class="mc-choices">
    ${choiceOutput}
  </div>

</div>`
}
// -------------------------------
// STICKY NOTES
$(".btn-trigger-toolbar").click(function(){
  $(".toolbar").slideToggle()
})
function addEventListenerSticky(){
  $(".x-out").off()
  $(".minimize-icon").off()
  $(".drag-icon").off()
  $(".sticky-note").css("position","relative")
  $(".sticky-note").draggable({disabled:true})
$(".drag-icon").click(function(){
  let isGreen = $(this).css("color") == "rgb(0, 128, 0)"
  if(isGreen==true){
    $(this).css("color","black")
  $(this).parent().draggable("disable")
  }
  else{
    $(this).css("color","green")
  $(this).parent().draggable("enable")
  }
})
$(".x-out").click(function(){
  $(this).parent().remove()
})
$(".minimize-icon").click(function(){
  let noteModule = $(this).parent()
  let currentSize = parseInt(noteModule.css("max-height").slice(0,-2))
  if(currentSize > 12){
    noteModule.css("max-height","12px")
  }
  else{
    noteModule.css("max-height","250px")
  }
})
}
addEventListenerSticky()
$("#btn-create-sticky").click(function(){
  $(".sticky-note-pad").append(`<div class="sticky-note">
  <i class="fas fa-times x-out"></i>
  <i class="fas fa-arrows-alt drag-icon"></i>
  <i class="fas fa-minus minimize-icon"></i>
  <p contentEditable class="sticky-title"></p>
  <p contentEditable></p>
</div>`)
  addEventListenerSticky()
})
// -------------------------------------------
// Input Logic
// returns a list of arrays in the following format ["element type", "text"]. The default element type is txt, for regular text.
function readText(text){
  let parsedItems = [];
  let rawArray = text.split("\\").filter(word => word != "")
  rawArray.forEach(function(note){
    if(note.includes(":")){
      let splitNote = parseNoteType(note);
      let identifier = splitNote[0];
      parsedItems.push([identifier,splitNote[1]])
    }
    else{
      parsedItems.push(["text",note])
    }
  })
  return parsedItems
}
// parseNoteType helper function for readText, returns an array that splits a string with only the first occurrence of the delimiter, :, or other delimiter, removed
// if there was an error, returns an "err" element, which gets outputted as an err div that says "there was a problem" interpreting string "whatever the string was"
parseNoteType("fc:dede:dedef")
function parseNoteType(string, delimiter=":"){
  let indexFirst = string.indexOf(delimiter)
  let identifier = string.slice(0,indexFirst)
  let content = string.slice(indexFirst+1)
  return [identifier,content]
}

// Interpret Function: Takes in a raw string value input and a target container name and creates items based on the input and the target item
function insertElement(input, target){
  let noteItems = readText(input);
  // beforeHeader is the value of the number of header summaries before the module is created. Since the module increases the value of header, we check to see if that number changes before activating the add eventlistener function
  let beforeHeaderNum = headerNum;
  let hadHeader = false;
  noteItems.forEach(function(note){
    // check the beginning
    switch(note[0]){
      // if flashcard element
      case "fc":
        $(target).append(createModuleFc(note[1]));
        addEventListenerFc("fc-"+ (flashcards.length-1));
        break;
      // if header element
      case "#":
        $(target).append(createModuleHead(note[1], 1));
        if(beforeHeaderNum != headerNum){
          addEventListenerSummary("h-"+headerNum)
        }
        hadHeader = true;
        break;
      case "#1":
        $(target).append(createModuleHead(note[1], 1));
        if(beforeHeaderNum != headerNum){
          addEventListenerSummary("h-"+headerNum)
        }
        hadHeader = true;
        break;
      case "#2":
        $(target).append(createModuleHead(note[1], 2));
        if(beforeHeaderNum != headerNum){
          addEventListenerSummary("h-"+headerNum)
        }
        hadHeader = true;
        break;
      case "#3":
        $(target).append(createModuleHead(note[1], 3));
        if(beforeHeaderNum != headerNum){
          addEventListenerSummary("h-"+headerNum)
        }
        hadHeader = true;
        break;
      // if fill in the blank element
      case "fi":
        let numFillInBefore = fillInAnswers.length;
        $(target).append(createModuleFi(note[1]))
        if(numFillInBefore != fillInAnswers.length){
          let numToAddEventListener = fillInAnswers.length - numFillInBefore
          // using numFillInBefore starts at the index position of the first new fill in item, and goes up to the number of the last fill in added
          for(let i = numFillInBefore; i < numFillInBefore+numToAddEventListener; i++){
            addEventListenerFi("fi-"+ i);
          }
        }
        break;
      case "mc":
        $(target).append(createModuleMcq(note[1]))
        addEventListenerMcq()
      // if an err element
      case "err":
        break;
      case "em":
        $(target).append(note[1]);
        break;
      case "wb":
        $(target).append(`<iframe src="${note[1]}"></iframe>`)
        break;
      default:
        $(target).append(`<p>${note[1]}</p>`)
    }
  })
  // if there was a header, add the event listener for underlines
  if(hadHeader == true){
      addEventListenerHead()
  }
}

// Plus buttons
$(".btn-plus").click(function(){
  let idNum = $(this).attr("id").slice(-1);
  let inputVal = $("#input-" + idNum).val()
  let targetId = "#module-" + idNum
  insertElement(inputVal, targetId)
})


// array shuffle helper function for shuffling mcq choices
function shuffle(array) {
  let shuffledArray = [];
  let originalLength = array.length
  for(let i = 0; i < originalLength; i++){
    let randIndex = Math.floor(Math.random()*array.length);
    shuffledArray.push(array.pop(randIndex));
  }
  return shuffledArray;
}

// Big Notes:
// Button Click event
$("#btn-open-notes").click(function(){
  $(".big-note").empty()
  $(".sticky-note").each(function(){
    let title = $(this).find(".sticky-title").html()
    let note = $(this).find("p:not(.sticky-title)").text()
    $(".big-note").append(`
      <div class="big-note-sticky" onclick="clickToCopy(this)"><p><b>${title}</b>: ${note}</p></div>
      `)
  })
  $(".big-note").slideToggle();
})
// Onclick to copy function, creates an input and uses an exec command to select and copy from it
function clickToCopy(element) {
 var $temp = $("<input>");
 $("body").append($temp);
 $temp.val($(element).text()).select();
 document.execCommand("copy");
 $temp.remove();
}

// truncated console log for debugging
function c(log = "check"){
  console.log(log);
}
