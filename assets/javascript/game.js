let charSelection = null;
let selectable = true;


const character = function(name, hp, ap, cap) {
    this.name = name;
    this.hp = hp;
    this.ap = ap;
    this.cap = cap;
}

const enemy = function(name, hp, cap) {
    this.name = name;
    this.hp = hp;
    this.cap = cap;
}

const heal = function(target){
    target.hp += 50;
    console.log("Healed" + " " + target.name + "!");
    console.log(target.hp);
}

const attack = function(attacker, target){
    target.hp = target.hp - attacker.ap;
    console.log(attacker.name + " attacked " + target.name + " for " + attacker.ap + " damage!");
    attacker.hp = attacker.hp - target.cap;
    console.log(target.name + " counter attacked " + attacker.name + " for " + target.cap + " damage!");
}

const stats = function(character){
    console.log("Health Points: " + character.hp);
    console.log("Attack Power: " + character.ap);
    console.log("Counter Attack: " + character. cap);
}

const statsBox = function(){
    $("#stats-box").html("Name: " + charSelection.name + '<br>' +
                         "Health: " + charSelection.hp + '<br>' +
                         "Attack Power: " + charSelection.ap + '<br>' +
                         "Counter Attack Power: " + charSelection.cap
                        );
       
}

let obiWan = new character("Obi-wan", 200, 50, 25);
let darthMaul = new character("Darth Maul", 200, 50, 25);
let maceWindu = new character("Mace Windu", 200, 50, 25);
let yoda = new character("Yoda", 200, 50, 25);


//character selection
$(document).ready(function() {

$("#obi-wan").on("click", function(){
    if(selectable == true){
    charSelection = obiWan;
    console.log("Obi-wan has been selected.")
    selectable = false;
    $("#darth-maul").remove();
    $("#mace-windu").remove();
    $("#yoda").remove();
    statsBox();
   // $("#character-selection").hide();

}});

$("#darth-maul").on("click", function(){
    if(selectable == true){
    charSelection = darthMaul;
    console.log("Darth Maul has been selected.")
    selectable = false;
    $("#obi-wan").remove();
    $("#mace-windu").remove();
    $("#yoda").remove();
    statsBox();
    //$("#character-selection").hide();
    
}});

$("#mace-windu").on("click", function(){
    if(selectable == true){
    charSelection = maceWindu;
    console.log("Mace Windu has been selected.")
    selectable = false;
    $("#obi-wan").remove();
    $("#darth-maul").remove();
    $("#yoda").remove();
    statsBox();
    //$("#character-selection").hide();
    
}});

$("#yoda").on("click", function(){
    if(selectable == true){
    charSelection = yoda;
    console.log("Yoda has been selected.")
    selectable = false;
    $("#obi-wan").hide();
    $("#darth-maul").hide();
    $("#mace-windu").hide();
    statsBox();
    //$("#character-selection").hide();
}});








});







