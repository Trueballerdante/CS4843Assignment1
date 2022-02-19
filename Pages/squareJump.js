class Player {
    constructor(gameWidth, floorHeight) {
        this.startingX = 10;
        this.startingY = 340; 
        this.width = 30;
        this.height = 30;
        this.maxSpeed = 4;
        this.speed = 0;
        this.gravity = 0;
        this.appliedGravity = 15;
        this.inAir = false;
        this.gravity_factor = 15;

        this.position = {
            x: this.startingX,
            y: this.startingY,
        }
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    jump() {
        if(this.position.y >= this.startingY) {
            this.gravity = -this.appliedGravity;
            this.inAir = true;
        }
    }

    stop() {
        this.speed = 0;
    }

    applyGravity() {
        if(this.inAir) {
            if(!(this.gravity > this.gravity_factor)) {
                this.gravity += 1;
            }
            this.position.y += this.gravity;

            if(this.position.y >= this.startingY) {
                this.position.y = this.startingY;
            }
        }
    }

    checkCollision(obstacle) {
        if(!(this.position.x > obstacle.position.x + 30 ||
            this.position.x + 30 < obstacle.position.x ||
            this.position.y > obstacle.position.y + 30 ||
            this.position.y + 30 < obstacle.position.y)) {
                
            this.reset();
            obstacle.reset();
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#00f";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime, obstacle) {
        if(!deltaTime) {
            return;
        }
        this.position.x += this.speed;

        if(this.position.x < 0) {
            this.position.x = 0;
        } else if(this.position.x > GAME_WIDTH - this.width) {
            this.position.x = GAME_WIDTH - this.width;
        }
        this.applyGravity();

        this.checkCollision(obstacle);
    }

    reset() {
        this.maxSpeed = 4;
        this.speed = 0;
        this.gravity = 0;
        this.appliedGravity = 15;
        this.inAir = false;
        this.gravity_factor = 15;
        this.position.x = this.startingX;
        this.position.y = this.startingY;
    }
}

class InputHandler {
    constructor(player) {
        document.addEventListener("keydown", event => {
            switch(event.keyCode) {
                case 37:
                    player.moveLeft();
                    break;
                case 39:
                    player.moveRight();
                    break;
                case 38:
                    player.jump();
                    break;
            }
        });

        document.addEventListener("keyup", event => {
            switch(event.keyCode) {
                case 37:
                    if(player.speed < 0) {
                        player.stop();
                    }
                    break;
                case 39:
                    if(player.speed > 0) {
                        player.stop();
                    }
                    break;
            }
        });
    }
}

class Obstacle {
    constructor() {
        this.startingX = 570;
        this.startingY = 340;
        this.width = 30;
        this.height = 30;
        this.speedUpdateFactor = 1;
        this.speed = 1;
        this.movingLeft = true;
        this.score = 0;

        this.position = {
            x: this.startingX,
            y: this.startingY,
        }
    }

    getPosition() {
        return this.position;
    }

    getScore() {
        return this.score;
    }

    draw(ctx) {
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        if(!deltaTime) {
            return;
        }
        
        if(this.movingLeft == true) {
            this.position.x -= this.speed;
        } else {
            this.position.x += this.speed; 
        }

        if(this.position.x <= 0) {
            this.movingLeft = false;
            this.speed += this.speedUpdateFactor;
            this.score += 1;
        } else if(this.position.x >= GAME_WIDTH - this.width) {
            this.movingLeft = true;
            this.speed += this.speedUpdateFactor;
            this.score += 1;
        }
    }

    reset() {
        this.speedUpdateFactor = 1;
        this.speed = 1;
        this.movingLeft = true;
        this.score = 0;
        this.position.x = this.startingX;
        this.position.y = this.startingY;
    }
}

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const FLOOR_HEIGHT = 30;

/* Create background color */
var color = ctx.createLinearGradient(0, 0, 600, 0);
color.addColorStop(0, "#99CCFF");


let player = new Player(GAME_WIDTH, FLOOR_HEIGHT);
let obstacle = new Obstacle();
let highScore = 0;

new InputHandler(player);

let lastTime = 0;

function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, 600, 400);
    /*fill background*/
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 600, 400);

    /* Draw Floor */
    ctx.fillStyle = "#0f0";
    ctx.fillRect(0, GAME_HEIGHT - FLOOR_HEIGHT, GAME_WIDTH, FLOOR_HEIGHT);
    player.update(deltaTime, obstacle);
    obstacle.update(deltaTime);
    player.draw(ctx);
    obstacle.draw(ctx);

    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";

    if(obstacle.score > highScore) {
        highScore = obstacle.score;
    }
    ctx.fillText("Score: " + obstacle.getScore() + "    High Score: " + highScore, 10, 35);

    requestAnimationFrame(gameLoop);
}

gameLoop();
