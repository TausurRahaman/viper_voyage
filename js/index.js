// Game Variables

let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
let speed = 8
let lastPaintTime = 0
let snakeArr = [{ x: 13, y: 15 }]
let food = { x: 10, y: 8 }
let score = 0



// Game Functions

function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return null
    }
    lastPaintTime = ctime
    gameEngine()
}

function isCollider(snakeArr) {

    // If you collide yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true
        }
    }

    // If you collide wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true
    }
}

function gameEngine() {

    if (isCollider(snakeArr)) {
        gameOverSound.play()
        musicSound.pause()
        inputDir = { x: 0, y: 0 }
        alert("Game over. Press any key to play again!")
        snakeArr = [{ x: 13, y: 15 }]
        musicSound.play()
        score = 0
    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play()
        score += 1
        scoreBox.innerHTML = "Score: " + score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2
        let b = 16
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // Moving the Snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y



    // Rendering the snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    // Rendering the food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}




// Main logic

musicSound.play()

window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }    // Start the game
    moveSound.play()
    switch (e.key) {
        case 'ArrowUp' && 'w':
            inputDir.x = 0
            inputDir.y = -1
            break;

        case 'ArrowDown' && 's':
            inputDir.x = 0
            inputDir.y = 1
            break;

        case 'ArrowLeft' && 'a':
            inputDir.x = -1
            inputDir.y = 0
            break;

        case 'ArrowRight' && 'd':
            inputDir.x = 1
            inputDir.y = 0
            break;

        default:
            break;
    }
})