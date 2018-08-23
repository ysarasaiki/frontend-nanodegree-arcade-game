// Enemies our player must avoid
var enemySpecs = function() {
    row_num = Math.floor(Math.random() * 3) + 1;

    let speed = Math.floor(Math.random() * 500) + 75;
    let y = 83*row_num-18;
    return [y, speed]
}

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // Setting the Enemy initial location (you need to implement)
    
    row_num = Math.floor(Math.random() * 3) + 1;
    this.x = 1;

    [this.y, this.speed] = enemySpecs();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

    if (this.x > 505) {
        this.x = 1;
        [this.y, this.speed] = enemySpecs();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    // Player Image
    this.sprite = 'images/char-horn-girl.png';

    // Setting the Player initial location
    this.x = 202;
    this.y = 83*5-18;
}

Player.prototype.resetPlayer = function() {
    const player = this;
    setTimeout(function() {
        player.sprite = 'images/char-horn-girl.png';
        player.x = 202;
        player.y = 83*5-18;
    }, 500)
}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    for (enemy of allEnemies) {
        if (enemy.y == this.y && Math.abs(enemy.x - this.x) < 50) {
            this.sprite = 'images/Rock.png';
            this.resetPlayer();
        }
    }

    if (this.y == 65-83) {
        this.sprite = 'images/Star.png';
        this.resetPlayer();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y < 83*5-18) {
                this.y += 83;
            }
            break;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
num_enemies = 3;//Math.floor(Math.random() * 4) + 1;

const allEnemies=[];

for (i=0; i<num_enemies; i++) {
    let enemy = new Enemy();
    allEnemies.push(enemy);
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
