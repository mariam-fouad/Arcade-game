/*
*           To calculate any object postion on the gird 
*                   x= (number of colums * 101)    
*                   y= (number of rows * 83) -20.75
*           note that the numbers are zero based 
*/

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';

    
    this.enemyRows = [1,2,4,5,6];
    this.randomize();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*this.speed;

    //check if the Enemy left the game grid
    if(this.x > 707){
        this.randomize();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//randomize the enemy property 
Enemy.prototype.randomize= function (){
    this.y=this.y=this.enemyRows[Math.floor(Math.random() * this.enemyRows.length)]*83-20.75;
    this.speed = Math.random() * (230 - 70) + 70;
    this.x=0;
}



// Player class
var Player = function (){
    this.sprite = 'images/char-horn-girl.png';
    this.reset();
}

// Update the player's position, required method for game
// Parameter: x, y
Player.prototype.update=function(x=0,y=0){

    //originally undate the postion of the player
    let toUpdatePostion = true;

    //check if there is any rock in the new postion of the player
    rocks.forEach (rock=>{
        if(rock.isOccupied(this.x+x , this.y+y)){
            toUpdatePostion=false;
        }
    });

    // only update the player postion if there is no rocks 
    if(toUpdatePostion){
        this.x+=x;
        this.y+=y;
    }
    
}

// Draw the player on the screen, required method for game
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handle the input for the player to move on the screen, required method for game
Player.prototype.handleInput=function(key){
    if(key==='left' && this.x>0){
        this.update(-101,0);
    }

    if(key==='right' && this.x<606){
        this.update(101,0);
    }

    if(key==='up' && this.y>-20.75){
        this.update(0,-83);
        this.win();
    }

    if(key==='down' && this.y<622.5){
        this.update(0,83);
    }
}

// reset the player postion when it hit the enmey
Player.prototype.lose= function (){
    this.reset();
}

// move the player to its original position
Player.prototype.reset = function (){
    this.x=303;
    this.y=643.25;
}

// check if the user reack the sea
Player.prototype.win = function (){
    if(this.y===-20.75){
        //show the message on the screen
        document.querySelector('.backdrop').style.display="block";
    }
}

// Rock to stop the player from moving to the position
var Rock = function (x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/Rock.png';
}

// Draw the rock on the screen, required method for game
Rock.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// check if the rock occupy the same position as the parameters 
Rock.prototype.isOccupied = function (x,y){
    if (this.x===x && this.y ===y){
        return true;
    }
    return false;
}


// all rocks on the game grid
const rocks = [];

rocks.push(new Rock (101,228.25));
rocks.push(new Rock (404,-20.75));
rocks.push(new Rock (0,560.25));
rocks.push(new Rock (505,560.25));
rocks.push(new Rock (202,643.25));
rocks.push(new Rock (606,228.25));
rocks.push(new Rock(0,-20.75));

// all enemies on the game grid
const allEnemies = [];

for (let i =0;i<7;i++){
    allEnemies.push(new Enemy());
}

// the player instance
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// clicking anywhere on the bacdrop div to close it
document.querySelector('.backdrop').addEventListener ("click",function(){
    document.querySelector('.backdrop').style.display="none";

    //reset the player after the backdrop is hidden
    player.reset();
});