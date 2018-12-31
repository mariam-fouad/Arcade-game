// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x=0;
    this.yValues = [1,2,3];
    this.y=this.yValues[Math.floor(Math.random() * this.yValues.length)]*83-41.4;
    this.speed = Math.random() * (270 - 90) + 90;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += dt*this.speed;

    if(this.x > 505){
        this.y=this.y=this.yValues[Math.floor(Math.random() * this.yValues.length)]*83-41.5;
        this.speed = Math.random() * (270 - 90) + 90;
        this.x=0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (){
    this.sprite = 'images/char-horn-girl.png';
    this.x=202;
    this.y=373.5;

}

Player.prototype.update=function(x=0,y=0){
    this.x+=x;
    this.y+=y;
}

Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput=function(key){
    if(key==='left' && this.x>0){
        this.update(-101,0);
    }

    if(key==='right' && this.x<404){
        this.update(101,0);
    }

    if(key==='up' && this.y>-41.5){
        this.update(0,-83);
    }

    if(key==='down' && this.y<373.5){
        this.update(0,83);
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


const allEnemies = [];

for (let i =0;i<4;i++){
    allEnemies.push(new Enemy());
}
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
