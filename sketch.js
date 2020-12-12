var database;
var dog, happyDog, foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;
var dogSprite;
function preload()
{
  happyDog = loadImage("images/dogImg1.png");
  dog = loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(500, 500);
    database = firebase.database();
   dogSprite = createSprite(250,250,10,10);
    dogSprite.addImage(dog);
   dogSprite.scale = 0.10;
    foodStock = database.ref("Food");
    foodStock.on("value",feedDog());
    foodObj = new Food();
    feed = createbutton("Feed The Dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog);
    addFood=createButton("Add Food");
    addFood.position(800, 95);
    addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);
  foodObj.display();
  drawSprites();
  text(foodStock, 200, 200);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + "PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }
  drawSprites();
}
function feedDog(){
  dogSprite.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
