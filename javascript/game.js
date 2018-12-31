// CORE MODEL

// each characters
var character = function(id, name, hp, ap) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.ap = ap;
};

ansar = new character(1, "ansar", 100, 20);
manahil = new character(2, "manahil", 150, 10);
minahil = new character(3, "minahil", 120, 15);

var characters = [ansar, manahil, minahil];

var myCharacter = null;
var myOpponent = null;
var defenders = [];


// sets value for myCharacter and opponents
var pickCharacter = function(charID) {
    for (i=0; i<characters.length; i++) {
        if (characters[i].id === charID) {
            myCharacter = characters[i];
        }
    }

    for (i=0; i<characters.length; i++) {
        if (characters[i].id !== charID) {
            //how to avoid duplicates
            defenders.push(characters[i]);
        }
    }
}

// Attack function
var attack = function (char1, char2) {
    char1.hp = char1.hp - char2.ap;
    char2.hp = char2.hp - char1.ap;
}



// UI MODEL


// prints all characters to the screen
for (i=0; i < characters.length; i++) {
    var characterContainer = $("<div>");
    characterContainer.addClass("float-left character-container");
    characterContainer.attr("id", characters[i].id);
    characterContainer.text(characters[i].name + " " + characters[i].hp);
    characterContainer.append("<img src='images/obi-wan.jpg' alt=''>");
    $(".character-container-main").append(characterContainer);
    }

// picking a character
$(".character-container").on("click", function() {
    var clickID = parseInt($(this).attr('id'));
    // assign values to my character and defenders
    pickCharacter(clickID);
    // move my character to div
    $("#"+clickID).appendTo("#your-character");
    // move defenders to div
    for (i=0; i<defenders.length; i++) {
        $("#"+defenders[i].id).appendTo("#defenders");
    }
    // for testing purposes
    console.log(myCharacter)
    console.log(defenders)
    });

// console.log(myCharacter);
// console.log(defenders);
// pickCharacter(2);
// console.log(myCharacter);
// console.log(defenders);
// pickCharacter(1);
// console.log(myCharacter);
// console.log(defenders);





