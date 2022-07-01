const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');
pen.fillStyle='yellow';
const cs=30;
const w=1000;
const h=600;
let food=null;
let score=0;

class Snake{

 constructor(){
  this.init_len=5;
  this.direction='right';
  this.cells=[];
 }
 
 createSnake(){
  for(let i=0;i<this.init_len;i++){
   this.cells.push({
    x:i,
    y:0
   });
  }
 }
 
 drawSnake(){
  for(let i=0;i<this.cells.length;i++){
   const cell=this.cells[i];
   if(i===this.cells.length-1){
    pen.fillStyle='red';
   }
   else{
    pen.fillStyle='yellow';
   }
   pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2);
   }
 }
 
 updateSnake(){
  const headX=this.cells[this.cells.length-1].x;
  const headY=this.cells[this.cells.length-1].y;
  let nextX;
  let nextY;
  
  if(food.x===headX && food.y===headY){
   food=generateRandomFood();
   score+=1;
  }
  else{
   this.cells.shift();
  }
  
  if(this.direction==='left'){
   nextX=headX-1;
   nextY=headY;
   if(nextX*cs<0){
    gameOver();
   }
  }
  else if(this.direction==='up'){
   nextX=headX;
   nextY=headY-1;
   if(nextY*cs<0){
    gameOver();
   }
  }
  else if(this.direction==='down'){
   nextX=headX;
   nextY=headY+1;
   if(nextY*cs>h){
    gameOver();
   }
  }
  else if(this.direction==='right'){
   nextX=headX+1;
   nextY=headY;
   if(nextX*cs>w){
    gameOver();
   }
  }
  this.cells.push({
   x:nextX,
   y:nextY
  });
  }
  
  changeSnakeDirection(direction){
   this.direction=direction;
  }
  
}

const snake=new Snake();


function init(){
 food=generateRandomFood();
 snake.createSnake();
 snake.drawSnake();
 function keyPressed(e){
  if(e.key==='ArrowLeft'){
   snake.changeSnakeDirection('left');
  }
  else if(e.key==='ArrowRight'){
   snake.changeSnakeDirection('right');
  }
  else if(e.key==='ArrowDown'){
   snake.changeSnakeDirection('down');
  }
  else if(e.key==='ArrowUp'){
   snake.changeSnakeDirection('up');
  }
  console.log(snake.direction);
 }
 
 document.addEventListener('keydown',keyPressed);
}



function draw(){
 pen.clearRect(0,0,w,h);
 pen.fillStyle = 'lightgreen';
 pen.font = '40px serif';
 pen.fillText(`Score : ${score}`, 50, 50);
 pen.fillRect(food.x*cs,food.y*cs,cs,cs);
 pen.fillStyle='yellow';
 snake.drawSnake();
}



function update(){
 snake.updateSnake();
}



function gameLoop(){
 draw();
 update();
}

function generateRandomFood(){
 const foodX=Math.floor(Math.random()*(w-cs)/cs);
 const foodY=Math.floor(Math.random()*(h-cs)/cs);
 
 const foodObject={
  x:foodX,
  y:foodY
 };
 
 return foodObject
}

const id=setInterval(gameLoop, 125);
init();

function gameOver(){
 clearInterval(id);
}