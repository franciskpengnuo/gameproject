const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let player = { x: 50, y: 300, width: 50, height: 50, speed: 5, direction: "right" };
let question = {};
let score = 0;
let timer = 30;
let isTimedMode = false;

// Load sounds
const correctSound = new Audio("assets/correct.mp3");
const wrongSound = new Audio("assets/wrong.mp3");

function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer(direction) {
    if (direction === "left") {
        player.x -= player.speed;
        player.direction = "left";
    } else if (direction === "right") {
        player.x += player.speed;
        player.direction = "right";
    }
    drawPlayer();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") movePlayer("left");
    if (event.key === "ArrowRight") movePlayer("right");

    if (player.x % 200 === 0) generateMathQuestion();
});

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    question = { num1, num2, operator, answer: eval(`${num1} ${operator} ${num2}`) };

    document.getElementById("math-question").innerText = `${num1} ${operator} ${num2} = ?`;
}

document.getElementById("submit-answer").addEventListener("click", () => {
    const answerInput = document.getElementById("answer-input");
    if (parseFloat(answerInput.value) === question.answer) {
        document.getElementById("feedback").innerText = "Correct!";
        document.getElementById("feedback").className = "correct";
        score += 10;
        correctSound.play();
    } else {
        document.getElementById("feedback").innerText = "Wrong!";
        document.getElementById("feedback").className = "wrong";
        wrongSound.play();
    }
    document.getElementById("score").innerText = `Score: ${score}`;
    answerInput.value = "";
});

document.getElementById("start-timer").addEventListener("click", () => {
    isTimedMode = true;
    let countdown = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = `Time: ${timer}s`;
        if (timer <= 0) {
            clearInterval(countdown);
            alert("Game Over! Your Score: " + score);
            localStorage.setItem("mathGameScore", score);
        }
    }, 1000);
});

drawPlayer();
