// CORE MODEL

// each characters
var character = function(id, name, hp, ap) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.ap = ap;
};

// adding a new character
var addCharacter = function() {

}

// creating new characters
ansar = new character(1, "ansar", 10, 10);
manahil = new character(2, "manahil", 30, 10);
minahil = new character(3, "minahil", 10, 10);


// array of all characters
var characters = [ansar, manahil, minahil];

// setting default values for variables
var myCharacter = null;
var myOpponent = null;
var defenders = [];

// CORE LOGIC

// sets value for myCharacter and pushes rest into the defenders array
var pickCharacter = function(charID) {
    // SHOULD ONLY ALLOW IF THERE IS NOT ALREADY A CHARACTER PICKED
    for (i=0; i<characters.length; i++) {
        if (characters[i].id === charID) {
            myCharacter = characters[i];
        } else {
            defenders.push(characters[i]);
        }
    }
}

// from the defenders array, pick an opponent
var pickOpponent = function(charID) {
    // SHOULD ONLY ALLOW IF THERE IS NOT ALREADY AN OPPONENT PICKED
    if (myOpponent === null) {
        for (i=0; i<defenders.length; i++) {
            if (defenders[i].id === charID) {
                myOpponent = defenders[i];
                defenders.splice(i,1);
            }
        }
    } else {
        alert("Defeat the current opponent!");
    }
}

// Attack function, subtracts hp based on ap
var attack = function (char1, char2) {
    char1.hp = char1.hp - char2.ap;
    char2.hp = char2.hp - char1.ap;

    // if you lose game
    if (char1.hp <= 0) {
        alert('You loose!');
        reset();
    // if you defeat an opponent
    } else if (char2.hp <= 0) {
        alert("You defeated an opponent!");
        $('#opponent').empty();
        myOpponent = null;
        // if you win the game
        if (defenders.length === 0) {
            alert("you won!!");
            reset();
        }
    }
}

// reset function if you lose or want to reset game
var reset = function() {
    myCharacter = null;
    myOpponent = null;
    defenders = [];

    $('#your-character').empty();
    $('#defenders').empty();
    $('#opponent').empty();

    ansar = new character(1, "ansar", 100, 20);
    manahil = new character(2, "manahil", 150, 10);
    minahil = new character(3, "minahil", 120, 15);

    characters = [ansar, manahil, minahil];
    printCharacters();
}

// UI MODEL

// prints all characters to the screen
var printCharacters = function() {
    for (i=0; i < characters.length; i++) {
        // main div
        var characterContainer = $("<div>");
        var characterDescription = $("<div>")
        characterContainer.addClass("float-left character-container rounded");
        characterContainer.attr("id", characters[i].id);
        characterContainer.append("<img src='images/obi-wan.jpg' class='image-class' alt=''>");
        $(".character-container-main").append(characterContainer);
        // inside div
        characterDescription.addClass("character-description")
        characterDescription.append(
            "Name: " + characters[i].name 
            + "<br/>" + 
            "HP: " + characters[i].hp);
        $(characterContainer).append(characterDescription);
    
        }
}


// picking a character and moving others to defenders
$(document).on('click', '.character-container', function() {
    var clickID = parseInt($(this).attr('id'));
    // assign values to my character and defenders
    pickCharacter(clickID);
    // move my character to div
    $("#"+clickID).appendTo("#your-character");
    $("#"+clickID).addClass("my-character");
    $("#"+clickID).removeClass("character-container");
    $('#pick-character').remove();
    //remove character container class
    // move defenders to div
    for (i=0; i<defenders.length; i++) {
        $("#"+defenders[i].id).appendTo("#defenders");
        // WHY IS THIS NOT WORKING?
        $("#"+defenders[i].id).removeClass("character-container");
        $("#"+defenders[i].id).addClass("defender-container rounded");
    }
    
    // for testing purposes
    console.log(myCharacter)
    console.log(defenders)
    });

// picking an opponent
$(document).on('click', '.defender-container', function() {
    if (myOpponent === null) {
        var clickID = parseInt($(this).attr('id'));
        $("#"+clickID).appendTo("#opponent");
        $("#"+clickID).addClass("my-opponent rounded");
        $("#"+clickID).removeClass("defender-container");
        pickOpponent(clickID);
        console.log("My opponent is ", myOpponent);
        if (defenders.length === 0 ) {
            $('#defenders-main').remove();
        }

    }
});

// attacking
$(document).on('click', '#attack', function() {
    if (myOpponent === null) {
        alert("No opponent selected!");
    } else {
        attack(myCharacter, myOpponent);
        console.log(myCharacter);
        console.log(myOpponent);
    }
});

// reset button
$(document).on('click', '#reset', function() {
    // EASIEST WAY TO DETECT GAME STATE
    reset();

});

// run the app
printCharacters();