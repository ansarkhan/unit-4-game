// CORE MODEL

// each characters
var character = function(id, name, hp, ap) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.ap = ap;
};



// creating new characters
obiWan = new character(1, "Obi Wan", 50, 5);
lukeSkywalker = new character(2, "Luke Skywalker", 100, 20);
darthSidious = new character(3, "Darth Sidious", 60, 8);
darthMaul = new character(4, "Darth Maul", 70, 5);


// array of all characters
var characters = [obiWan, lukeSkywalker, darthSidious, darthMaul];

// setting default values for variables
var myCharacter = null;
var myOpponent = null;
var defenders = [];
var gamePlay = false;

// CORE LOGIC

var init = function() {
    if (gamePlay === false) {
        myCharacter = null;
        myOpponent = null;
        defenders = [];
        gamePlay = false;
        
        $('#defenders-main').show();
        $('.character-container-main').empty();
        $('#your-character').empty();
        $('#defenders').empty();
        $('#opponent').empty();

    
        obiWan = new character(1, "Obi Wan", 50, 5);
        lukeSkywalker = new character(2, "Luke Skywalker", 100, 20);
        darthSidious = new character(3, "Darth Sidious", 60, 8);
        darthMaul = new character(4, "Darth Maul", 70, 5);        
    

        characters = [obiWan, lukeSkywalker, darthSidious, darthMaul];
        printCharacters();

        //show the add-character button again
    }
}

// array1.forEach(function(element) {
//     console.log(element);
//   });

  
// sets value for myCharacter and pushes rest into the defenders array
var pickCharacter = function(charID) {
    if (gamePlay === false) {
        characters.forEach(function(char) {
            if (char.id === charID) {
                myCharacter = char;
            } else {
                defenders.push(char);
            }
        }) // for loop ends
        gamePlay = true;
    }
    else {
        alert("You already picked a character!")
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
        } //ends here
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
    if (gamePlay === true) {
        myCharacter = null;
        myOpponent = null;
        defenders = [];
        gamePlay = false;

        $('#pick-character').show();
        $('#defenders-main').show();
        $('.character-container-main').empty();
        $('#your-character').empty();
        $('#defenders').empty();
        $('#opponent').empty();

    
        obiWan = new character(1, "Obi Wan", 50, 5);
        lukeSkywalker = new character(2, "Luke Skywalker", 100, 20);
        darthSidious = new character(3, "Darth Sidious", 60, 8);
        darthMaul = new character(4, "Darth Maul", 70, 5);   
    

        characters = [obiWan, lukeSkywalker, darthSidious, darthMaul];
        printCharacters();

        //show the add-character button again
    }
}

// UI MODEL

// adding and displaying a new character, function needs to be split out
$(document).on('click', '#add-character', function() {
    var id = characters.length + 1;
    var name = $('#name').val();
    var hp = parseInt($('#hp').val());
    var ap = parseInt($('#ap').val());
    var newCharf = new character(id, name, hp, ap);
    characters.push(newCharf);
    printOneCharacter();
    gamePlay = true;
    console.log("test");
    console.log(characters);
});

// prints all characters to the screen
var printCharacters = function() {
    for (i=0; i < characters.length; i++) {
        // main div
        var characterContainer = $("<div>");
        var characterDescription = $("<div>")
        characterContainer.addClass("float-left character-container rounded");
        characterContainer.attr("id", characters[i].id);
        characterContainer.append('<img src="images/'+ i +'.jpg" class="image-class">');
        $(".character-container-main").append(characterContainer);
        // inside div
        characterDescription.addClass("character-description")
        characterDescription.append(
            "Name: " + characters[i].name 
            + "<br/>" + 
            "HP: " + characters[i].hp
            + "<br/>" +
            "AP: " + characters[i].ap);
        $(characterContainer).append(characterDescription);
    
        }
}

var printOneCharacter = function() {
        var characterContainer = $("<div>");
        var characterDescription = $("<div>")
        characterContainer.addClass("float-left character-container rounded");
        characterContainer.attr("id", characters[i].id);
        characterContainer.append("<img src='/Users/ansarkhan/ClassHomework/homework-04/unit-4-game/images/mystery.png' class='image-class'>");
        $(".character-container-main").append(characterContainer);
        // inside div
        characterDescription.addClass("character-description")
        characterDescription.append(
            "Name: " + characters[i].name 
            + "<br/>" + 
            "HP: " + characters[i].hp
            + "<br/>" +
            "AP: " + characters[i].ap);
        $(characterContainer).append(characterDescription);
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
    $('#pick-character').hide();
    // hide 'add character' button
    $("#submit").hide();
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
            $('#defenders-main').hide();
        }

    }
});

// attacking
$(document).on('click', '#attack', function() {
    if (myCharacter === null) {
        alert("No character selected! Select a character.");
    } else if(myOpponent === null) {
        alert("No opponent selected! Select an opponent.");
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
init();