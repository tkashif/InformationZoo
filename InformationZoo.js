function FirstOpened() {
    document.getElementById("AnimalList").selectedIndex = -1;
    
}

function AnimalSelected() {
 var animalList = document.getElementById("AnimalList");
var selectedAnimalIndex = animalList.selectedIndex;    
var animalListArray = new Array();
for (i = 0; i < animalList.options.length; i++) {
    animalListArray[i] = animalList.options[i].value;
}
    
 var animalSelected = animalListArray[selectedAnimalIndex];    
 var firstLetter = animalSelected[0];
 var outputSelection = "";
 var outputLearnMore = "" ;
 if (LetterIsVowel(firstLetter)) {
        outputSelection = "You Selected an " + animalSelected;
        outputLearnMore = "Learn More About an " + animalSelected;
    }
    else {
        outputSelection = "You Selected a " + animalSelected;
        outputLearnMore = "Learn More About a " + animalSelected;
    }
    
    
    document.getElementById("YouSelected").innerHTML = outputSelection;
    document.getElementById("LearnMoreAbout").innerHTML = outputLearnMore;
    
    Wikipedia();
    
}

function LetterIsVowel(letter) {
    return letter == "A" || letter == "E" || letter == "I" || letter == "O" || letter == "U"
}

function Wikipedia(){
   var http = new XMLHttpRequest();
    

var url = 'https://jsonplaceholder.typicode.com/posts';


http.open('GET', url);
http.send()
http.onreadystatechange=function(){
   if (this.readyState == 4 && this.status == 200) {
       document.getElementById("AnimalInfo").innerHTML = http.response;
   } 
}

}