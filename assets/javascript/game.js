let charSelection = null;
let enemySelection = null;
let selectable = true;
let damageBonus = 1.0;
let enemyIndex = 0;
let hasWon = false;

let enemyList = [];

let gameOver = false;



// character object creator
const character = function(name, hp, ap, cap, imag) {
    this.name = name;
    this.hp = hp;
    this.ap = ap;
    this.cap = cap;
    this.imag = imag;
}

// enemy object creator
const enemy = function(name, hp, cap, imag, id) {
    this.name = name;
    this.hp = hp;
    this.cap = cap;
    this.imag = imag;
    this.id = id
}

// unused heal function
const heal = function(target){
    target.hp += 50;
    console.log("Healed" + " " + target.name + "!");
    console.log(target.hp);
}

// attack function
const attack = function(attacker, target){
    target.hp = target.hp - attacker.ap;
    console.log(attacker.name + " attacked " + target.name + " for " + attacker.ap + " damage!");
    attacker.hp = attacker.hp - target.cap;
    console.log(target.name + " counter attacked " + attacker.name + " for " + target.cap + " damage!");
}

// character stat test function
const stats = function(character){
    console.log("Health Points: " + character.hp);
    console.log("Attack Power: " + character.ap);
    console.log("Counter Attack: " + character.cap);
}

//populate stats-box with character information test
const statsBox = function(){
    $("#stats-box").html("Name: " + charSelection.name + '<br>' +
                         "Health: " + charSelection.hp + '<br>' +
                         "Attack Power: " + charSelection.ap + '<br>' +
                         "Counter Attack Power: " + charSelection.cap
                        );
       
}

//create character area and enemy area
const gameBoard = function(){
    
    let charBox = $("<div>");
    charBox.attr("id", "character-box");
    $("#main-container").append(charBox);

    //character image generation

    let charPic = $("<div>");
    charPic.attr("id", "character");
    charPic.html('<img class="char-image" src="assets/images/' + charSelection.imag + '"</img>');
    $("#character-box").append(charPic);

    //character stats generation
    let infoBox = $("<div>");
    infoBox.attr("id", "stats-box");
    infoBox.html('<span class="player-name"> Name: ' + charSelection.name + '</span><br>' +
                 '<span class="player-hp"> Health: ' + charSelection.hp + '</span><br>' +
                 '<span class="player-ap"> Attack Power: ' + charSelection.ap + '</span><br>' +
                 '<span class="damage-bonus"> Damage Bonus: ' + damageBonus + 'x </span>');
    $("#character-box").append(infoBox);

    //enemy area creation
    let enemyContainer = $("<div>");
    enemyContainer.attr("id", "enemy-container");
    $("#main-container").append(enemyContainer);

    let enemyBox = $("<div>");
    enemyBox.attr("id", "enemy-box");
    $("#enemy-container").append(enemyBox);
    
    enemyUpdate();
}

//clear the board of enemy objects

const clearBoard = function (){
    let newBox = $("<div>");
    newBox.attr("id", "enemy-box");
    $("#enemy-box").replaceWith(newBox);
}

//updates the board with the remaining objects in the enemyList array
const enemyUpdate = function (){
    if(enemyList.length > 0){
    for(i=0; i < enemyList.length; i++){
        let newEnemy = $("<div>");
        newEnemy.addClass("enemy-target-box");
        newEnemy.attr("id", enemyList[i].id);
        newEnemy.html('<img class="char-image" src="assets/images/' + enemyList[i].imag + '"</img>');
        $("#enemy-box").append(newEnemy);
        $("#message-box").html('Click to select an enemy!');
    }
  }
    else{
        clearBoard();
        playerWins();
    }

}

//updates the board with the targeted enemy
const enemyTargeted = function (){
    
    let newEnemy = $("<div>");
    newEnemy.addClass("targeted");
    newEnemy.attr("id", enemySelection.id);
    newEnemy.html('<img class="char-image" src="assets/images/' + enemySelection.imag + '"</img>');
    $("#enemy-box").append(newEnemy);

    let enemyInfoBox = $("<div>");
    enemyInfoBox.attr("id", "enemy-stats-box");
    enemyInfoBox.html('<span class="enemy-name"> Name: ' + enemySelection.name + '</span><br>' +
                      '<span class="enemy-hp"> Health: ' + enemySelection.hp + '</span><br>' +
                      '<span class="enemy-cap"> Counter Attack Power: ' + enemySelection.cap + '</span>');
    $("#enemy-box").append(enemyInfoBox);
    $("#message-box").html('Click to attack your target!')


}


const playerWins = function () {
    let winMessage = $("<div>");
    winMessage.addClass("win-message");
    winMessage.html('<span>' + charSelection.name + ' wins! Click here to play again. </span>');
    $("#enemy-box").append(winMessage);
    $("#message-box").html('')
    gameOver = true;
}

const playerLoses = function () {
    let loseMessage = $("<div>");
    loseMessage.addClass("win-message");
    loseMessage.html('<span>' + charSelection.name + ' loses! Click here to play again. </span>');
    $("#enemy-box").append(loseMessage);
    $("#message-box").html('')
    gameOver = true;

}

//player damage function

const playerDamage = function(dmg){
    charSelection.hp = charSelection.hp - dmg;
    $(".player-hp").html('Health: ' + charSelection.hp);
    if(charSelection.hp <= 0){
        clearBoard();
        playerLoses();
    }
}

//enemy damage function
const enemyDamage = function(dmg){
    if(enemySelection.hp > 0){
    let totalDmg = dmg * damageBonus;
    $("#message-box").html('You hit for ' + totalDmg + ' damage! You take ' + enemySelection.cap + ' damage!');
    enemySelection.hp = enemySelection.hp - totalDmg;
    $(".enemy-hp").html('Health: ' + enemySelection.hp);
   
    if(enemySelection.hp <= 0){
        console.log("Enemy killed.");
        findEnemy(enemyList, enemySelection);
        console.log(enemyIndex);
        enemyList.splice(enemyIndex, 1);

        $("#message-box").html(enemySelection.name + ' has died.')
        $(".targeted").addClass("dead");
        $(".dead").fadeOut(2000, function(){
            clearBoard();
            $("#message-box").html('');
            enemyUpdate();
        })
        //setTimeout(function(){ 
    }
    damageBonus+= .5;
    $(".damage-bonus").html('Damage Bonus: ' + damageBonus + 'x');
    playerDamage(enemySelection.cap);
  }
}

//find location of enemy in array

const findEnemy = function(arr, value){
     for(var i=0; i < arr.length; i++){
       if(arr[i].id == value.id){
            let location = enemyList.indexOf(arr[i]);
            console.log("The enemy is located at " + location);
            return enemyIndex = location;
        }
   }
}


const populateObjects = function(arr){
    //repopulates enemy array
    enemyList = [droid1,droid2,droid3];

    //reset enemy and player health and damage bonus
    for(i=0; i < enemyList.length; i++){
        enemyList[i].hp = 150;
    }

    obiWan.hp = 200;
    darthMaul.hp = 250;
    maceWindu.hp = 170;
    yoda.hp = 125;

    damageBonus = 1.0;
}

const resetBoard = function (){
    $("#character-box").remove();
    $("#enemy-container").remove();

    let newCharSelect= $("<div>");
    newCharSelect.attr("id", "character-selection");
    $("#main-container").append(newCharSelect);

}

const createCharSel = function () {
    //obi-wan
    let obi = $("<img>");
    obi.attr('class', "char-image")
    obi.attr('src', 'assets/images/' + obiWan.imag);
    obi.attr("id", "obi-wan");
    $("#character-selection").append(obi);

    let darth = $("<img>");
    darth.attr('class', "char-image")
    darth.attr('src', 'assets/images/' + darthMaul.imag);
    darth.attr("id", "darth-maul");
    $("#character-selection").append(darth);

    let mace = $("<img>");
    mace.attr('class', "char-image")
    mace.attr('src', 'assets/images/' + maceWindu.imag);
    mace.attr("id", "mace-windu");
    $("#character-selection").append(mace);

    let yoda1 = $("<img>");
    yoda1.attr('class', "char-image")
    yoda1.attr('src', 'assets/images/' + yoda.imag);
    yoda1.attr("id", "yoda");
    $("#character-selection").append(yoda1);

    $("#message-box").html('Pick a character!');
    
}

const resetGame = function(){
    resetBoard();
    populateObjects();
    createCharSel();
    selectable = true;
    gameOver = false;
}

//======================================

//create character objects
let obiWan = new character("Obi-Wan", 200, 50, 25, "obi-wan.jpeg");
let darthMaul = new character("Darth Maul", 250, 30, 25, "darth-maul.jpg");
let maceWindu = new character("Mace Windu", 170, 55, 25, "mace-windu.jpeg");
let yoda = new character("Yoda", 125, 80, 25, "yoda.jpeg");

//create enemy objects

let droid1 = new enemy("X-1", 150, 20, "droid.jpeg", "droid-1");
let droid2 = new enemy("X-2", 150, 30, "droid.jpeg", "droid-2");
let droid3 = new enemy("X-3", 150, 40, "droid.jpeg", "droid-3");
enemyList = [droid1, droid2, droid3];



//======================================

$(document).ready(function() {

//character selection logic

$("body").on('click', '#obi-wan', function(){
    if(selectable == true){
        charSelection = obiWan;
        console.log("Obi-wan has been selected.")
        selectable = false;
    $("#character-selection").remove();
    $("#message-box").html('')
    gameBoard();
}});

$("body").on("click", "#darth-maul", function(){
    if(selectable == true){
        charSelection = darthMaul;
        console.log("Darth Maul has been selected.")
        selectable = false;
    $("#character-selection").remove();
    $("#message-box").html('')
    gameBoard();
}});

$("body").on("click", "#mace-windu", function(){
    if(selectable == true){
        charSelection = maceWindu;
        console.log("Mace Windu has been selected.")
    selectable = false;
    $("#character-selection").remove();
    $("#message-box").html('')
    gameBoard();
}});

$("body").on("click", "#yoda", function(){
    if(selectable == true){
    charSelection = yoda;
    console.log("Yoda has been selected.")
    selectable = false;
    $("#character-selection").remove();
    $("#message-box").html('')
    gameBoard();
}});


//enemy selection logic
$('body').on('click', '#droid-1', function(){
    enemySelection = droid1;
    clearBoard();
    enemyTargeted(droid1);

});

$('body').on('click', '#droid-2', function(){
    enemySelection = droid2;
    clearBoard();
    enemyTargeted(droid2);
});

$('body').on('click', '#droid-3', function(){
    enemySelection = droid3;
    clearBoard();
    enemyTargeted(droid3);
});

$('body').on('click', '.targeted', function(){
    if(enemySelection.hp > 0){
    enemyDamage(charSelection.ap);
    }
    
});

$('body').on('click', '#enemy-container', function(){
    if(gameOver == true) {
        resetGame();
    }

});


});







