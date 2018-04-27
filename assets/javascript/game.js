let charSelection = null;
let selectable = true;

// character object creator
const character = function(name, hp, ap, cap, imag) {
    this.name = name;
    this.hp = hp;
    this.ap = ap;
    this.cap = cap;
    this.imag = imag;
}

// enemy object creator
const enemy = function(name, hp, cap) {
    this.name = name;
    this.hp = hp;
    this.cap = cap;
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
    console.log("Counter Attack: " + character. cap);
}

//populate stats-box with character information
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

    let infoBox = $("<div>");
    infoBox.attr("id", "stats-box");
    infoBox.html("Name: " + charSelection.name + '<br>' +
                 "Health: " + charSelection.hp + '<br>' +
                 "Attack Power: " + charSelection.ap + '<br>' +
                 "Counter Attack Power: " + charSelection.cap   );
    $("#character-box").append(infoBox);




}


//create character objects
let obiWan = new character("Obi-Wan", 200, 50, 25, "obi-wan.png");
let darthMaul = new character("Darth Maul", 200, 50, 25, "darth-maul.jpg");
let maceWindu = new character("Mace Windu", 200, 50, 25, "mace-windu.jpeg");
let yoda = new character("Yoda", 200, 50, 25, "yoda.png");


$(document).ready(function() {

//character selection logic

$("#obi-wan").on("click", function(){
    if(selectable == true){
        charSelection = obiWan;
        console.log("Obi-wan has been selected.")
        selectable = false;
    $("#character-selection").remove();
    gameBoard();
}});

$("#darth-maul").on("click", function(){
    if(selectable == true){
        charSelection = darthMaul;
        console.log("Darth Maul has been selected.")
        selectable = false;
    $("#character-selection").remove();
    gameBoard();
}});

$("#mace-windu").on("click", function(){
    if(selectable == true){
        charSelection = maceWindu;
        console.log("Mace Windu has been selected.")
    selectable = false;
    $("#character-selection").remove();
    gameBoard();
}});

$("#yoda").on("click", function(){
    if(selectable == true){
    charSelection = yoda;
    console.log("Yoda has been selected.")
    selectable = false;
    $("#character-selection").remove();
    gameBoard();
}});








});







