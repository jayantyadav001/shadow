var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("feed shadow")
  feed.position(650,95);
 feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
}

function draw() {
  background(46,139,87);
  foodObj.display();
FedTime = database.ref('FeedTime');
FedTime.on("value",function(data){
  lastFed=data.val();
})
  //write code to read fedtime value from the database 
  textSize(15);
  fill("red");
  if(lastFed>=12)
  {
    text("Last Feed : "+lastFed%12+" PM",200,30)
  }
  else if(lastFed===0)
  {
    text("Last Feed : 12 AM",200,30)
  }
  else
 
  {
    text("Last Feed : "+lastFed+" AM",200,30)
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodstock=foodObj.getFoodStock();
  if(foodstock<=0)
  {
    foodObj.updateFoodStock(foodstock*0);
    
  }
  else
  {
    foodObj.updateFoodStock(foodstock-1);
    
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
