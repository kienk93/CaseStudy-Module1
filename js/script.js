// Canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '40px Aria';

// Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click:false,
}
canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
})
// console.log(mouse.x,mouse.y)
canvas.addEventListener('mouseup',function(){
    mouse.click = false;
})

// Player
const amelia = new Image();
amelia.src = 'amelia.png'

class Player {
    constructor() {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 50;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 500;
        this.spriteHeight = 500;

    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx/30;
        }
        if (mouse.y != this.y) {
            this.y -= dy/30;
        }
    }
    draw() {
        if (mouse.click) {
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius,10);
        Math.floor(Math.random() * 4)
        ctx.drawImage(amelia
        , this.frameX + Math.floor(Math.random() * 2)* this.spriteWidth
        , this.frameY * this.spriteHeight
        , this.spriteWidth, this.spriteHeight
        , this.x -70, this.y - 50
        , this.spriteWidth/4, this.spriteHeight/5);


    }
}
const player = new Player();

// Bubbles
const gura = new Image();
gura.src = 'gura.jpg';
const gura2 = new Image();
gura2.src = 'gura2.jpg'
const gura3 = new Image();
gura3.src = 'gura3.jpg'
const gura4 = new Image();
gura4.src = 'gura4.jpg';
const gura5 = new Image();
gura5.src = 'gura5.jpg'
const gura6 = new Image();
gura6.src = 'gura6.jpg'
const gura7 = new Image();
gura7.src = 'gura7.jpg';
const gura8 = new Image();
gura8.src = 'gura8.jpg'
const gura9 = new Image();
gura9.src = 'gura9.jpg'
const bubblesArray = [];
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 20;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
    
    }
    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy)
        
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        ctx.save();
        if(this.x > mouse.x) {
                var a = ctx.drawImage(gura,this.x-30,this.y-30,80,80)
        } else {
                var b = ctx.drawImage(gura2,this.x-30,this.y-30,80,80)
                }
        if(this.y < mouse.y) {
                var c = ctx.drawImage(gura3,this.x-30,this.y-30,80,80)
        }
        if(score > 49 && score < 100) {
            if (this.x > mouse.x) {
                a = ctx.drawImage(gura4, this.x - 30, this.y - 30, 80, 80)
            } else {
                b = ctx.drawImage(gura5, this.x - 30, this.y - 30, 80, 80)
            }
            if (this.y < mouse.y) {
                c = ctx.drawImage(gura6, this.x - 30, this.y - 30, 80, 80)

            }
        }
        if(score > 100) {
            if (this.x > mouse.x) {
                a = ctx.drawImage(gura7, this.x - 30, this.y - 30, 80, 80)
            } else {
                b = ctx.drawImage(gura8, this.x - 30, this.y - 30, 80, 80)
            }
            if (this.y < mouse.y) {
                c = ctx.drawImage(gura9, this.x - 30, this.y - 30, 80, 80)

            }

        }




    }
}
const bubbleSound = document.createElement('audio');
bubbleSound.src = 'Amelia sings Gura Doesnt Know.mp3'
const bubbleSound2 = document.createElement('audio');
bubbleSound2.src = 'I Do Adore.mp3'
const bubbleSound3 = document.createElement('audio');
bubbleSound3.src = 'The Lazy Song.mp3'

function handleBubbles () {
    if (gameFrame % 50 == 0){
        bubblesArray.push(new Bubble());
        // console.log(bubblesArray.length)
    }
    for (let i=0; i<bubblesArray.length;i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    for (let i=0;i<bubblesArray.length;i++) {
        if(bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i,1)
        }
        if(bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
            // console.log('vacham');
            if(!bubblesArray[i].counted){
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1)
            }
            
        }
    }
}
// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle = 'blue';
    ctx.fillText('Score : ' + score,10,30)
    ctx.fillText('50 score and 100 score', 420,30)
    gameFrame++;
    if (score < 50) {
        bubbleSound.play();
    } else if (score < 100){
        bubbleSound.pause();
        bubbleSound2.play();
    } else  {
        bubbleSound2.pause();
        bubbleSound3.play()
    }


    requestAnimationFrame(animate)
}
animate();
