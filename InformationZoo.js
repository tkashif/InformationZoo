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
    
if (selectedAnimalIndex != 0) { 
var animalSelected = animalListArray[selectedAnimalIndex];    
 var firstLetter = animalSelected[0];
 var outputSelection = "";
 var outputLearnMore = "" ;
var outputArticlesAbout = "";
 if (LetterIsVowel(firstLetter)) {
        outputSelection = "You Selected an " + animalSelected;
        outputLearnMore = "Learn More About an " + animalSelected;
        outputArticlesAbout = "Articles About an " + animalSelected;
        
    }
    else {
        outputSelection = "You Selected a " + animalSelected;
        outputLearnMore = "Learn More About a " + animalSelected;
        outputArticlesAbout = "Articles About a " + animalSelected;
    }
    
    
    document.getElementById("YouSelected").innerHTML = outputSelection;
    document.getElementById("LearnMoreAbout").innerHTML = outputLearnMore;
    document.getElementById("ArticlesAbout").innerHTML = outputArticlesAbout;
    
    MakeVisible();
    Wikipedia(animalSelected);
    Newspaper(animalSelected);
}
    
}

function LetterIsVowel(letter) {
    return letter == "A" || letter == "E" || letter == "I" || letter == "O" || letter == "U"
}

function Wikipedia(selectedAnimal){
   var http = new XMLHttpRequest();
    var url = GenerateWikiURL(selectedAnimal);
    
http.onreadystatechange=function(){
   if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(this.response);
        document.getElementById("AnimalInfo").innerHTML = data["parse"]["text"];
        MakeWikiLinksClickable();   
   } 
}

http.open('GET', url, true);
http.send();
     

}

function GenerateWikiURL(selectedAnimal) {
    return 'https://en.wikipedia.org/w/api.php?action=parse&page=' + formatAnimal(selectedAnimal) + '&prop=text&formatversion=2&format=json&origin=*&section=0';   
}

function MakeWikiLinksClickable() {
    console.log("Hostname: " + location.host);
    var hostLength = location.host.length;
    var httpsLength = "http://".length;
    var linkStartIndex = hostLength + httpsLength;
    var wikiLinks = document.getElementById("AnimalInfo").querySelectorAll('a');
    for (i = 0; i < wikiLinks.length; i++) {
        var fullLink = wikiLinks[i].href;
        var endOfLink = fullLink.substring(linkStartIndex, fullLink.length);
        wikiLinks[i].href = 'https://en.wikipedia.org' + endOfLink;
        console.log(wikiLinks[i].href);
    }
    
}

function formatAnimal(selectedAnimal) {
    splitSelectedAnimalArray = selectedAnimal.split(" ");
    formattedAnimal = ""
    for (i = 0; i < splitSelectedAnimalArray.length; i++) {
        formattedAnimal += splitSelectedAnimalArray[i];
        if (i != splitSelectedAnimalArray.length - 1) {
            formattedAnimal += "_"; 
        }
    }
    return formattedAnimal;
}

function Newspaper(selectedAnimal) {
    var http = new XMLHttpRequest();
    var url = GenerateNewspaperURL(selectedAnimal);
    
http.onreadystatechange=function(){
   if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        data = data["items"];
       var htmlString = ""
       for (i = 0; i < data.length; i++) {
           currentData = data[i];
           title = currentData["title"];
           placeOfPublication = currentData["place_of_publication"];
           rawUrl = currentData["url"];
           // getting rid of .json
           url = rawUrl.substring(0, rawUrl.length - 5)
           htmlString += "<section class = articleBlurb>" 
           htmlString += "Article #".bold().big() + (i+1).toString().bold().big() + "<br>"
           htmlString += "Title: " + title + "<br>";
           htmlString += "Place of publication: " + placeOfPublication + "<br>";
           htmlString += "URL: " + "<a href = " + url + " target = _blank" + ">" + url + "</a>";
           htmlString += "</section>"

           
       }
        document.getElementById("Newspaper").innerHTML = htmlString;
   } 
}

http.open('GET', url, true);
http.send();

    
}

function GenerateNewspaperURL(selectedAnimal) {
    return "https://chroniclingamerica.loc.gov/search/titles/results/?terms=" + formatAnimal(selectedAnimal) + "&format=json";
    
}

function MakeVisible(){
    var classElements = document.getElementsByClassName("invisible");
    
    for (i = 0; i < classElements.length; i++) {
        classElements[i].style.visibility = "visible";
    }
    
}