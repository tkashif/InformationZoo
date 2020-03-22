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
    
    Wikipedia(animalSelected);
    
}

function LetterIsVowel(letter) {
    return letter == "A" || letter == "E" || letter == "I" || letter == "O" || letter == "U"
}

function Wikipedia(selectedAnimal){
   var http = new XMLHttpRequest();
    var url = GenerateURL(selectedAnimal);
    
http.onreadystatechange=function(){
   if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(this.response);
        document.getElementById("AnimalInfo").innerHTML = data["parse"]["text"];
   } 
}

http.open('GET', url, true);
http.send();

}

function GenerateURL(selectedAnimal) {
    splitSelectedAnimalArray = selectedAnimal.split(" ");
    formattedAnimal = ""
    for (i = 0; i < splitSelectedAnimalArray.length; i++) {
        formattedAnimal += splitSelectedAnimalArray[i];
        if (i != splitSelectedAnimalArray.length - 1) {
            formattedAnimal += "_"; 
        }
    }
    return 'https://en.wikipedia.org/w/api.php?action=parse&page=' + formattedAnimal + '&prop=text&formatversion=2&format=json&origin=*';

    
}