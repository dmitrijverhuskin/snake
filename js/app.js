
$(document).ready(function () {

    //===================== part work canvas =============

    let canvas = $(`#canvas`)[0],
        context = canvas.getContext(`2d`),
        width = $("#canvas").width(),
        height = $("#canvas").height();

        let cw = 10,
        d,
        food,
        score;

        //==================== array of points for the snake ======

    let snakeArray;

      //==================== initialisation and start of drawing =====

    function init() {
        d = "right";
        createSnake();
        createFood();
        score = 0;

        if(typeof gameLoop !== "undefined"){
            clearInterval(gameLoop);
        }
        gameLoop = setInterval(draw, 70);
    }

    init();

    //======================= create snake (filling array) =======

        function createSnake() {
            let length =5;
            snakeArray = [];

            for (let i=length-1; i>=0; i--){
                snakeArray.push({x:i, y:0});
            }
        }

        //================= create points food =======================

    function createFood() {
        food = {
            x:Math.round(Math.random()*(width-cw)/cw),
            y:Math.round(Math.random()*(width-cw)/cw)
        };
    }

     //=================== basic logic and denial ================

    function draw() {

            let tail;
            context.fillStyle = "while";
            context.fillRect(0, 0, width, height);
            context.strokeStyle = "black";
            context.strokeRect(0, 0, width, height);

            let nx = snakeArray[0].x;
                ny = snakeArray[0].y;

                if (d === "right") nx++;
                   else if(d === "left") nx--;
                   else if(d === "up") ny--;
                   else if(d === "down") ny++;

                   if (nx === -1 || nx === width/cw || ny === -1 || ny === height/cw ||checkCollision(nx, ny, snakeArray)){

                       init();
                       return;

                   }

                    if (nx === food.x && ny === food.y){
                        tail = {x:nx, y:ny};
                        score++;
                        createFood();
                    }
                    else {
                        tail = snakeArray.pop();
                        tail.x = nx;
                        tail.y = ny;

                    }

                    snakeArray.unshift(tail);

                    for (let i = 0; i<snakeArray.length; i++){
                        let c = snakeArray[i];

                        drawCells(c.x, c.y);
                    }

                    drawCells(food.x, food.y);
                    let scoreText = "Score" + score;
                    context.fillText(scoreText, 5, height+5);
    }

      //================================ drawing snakes and food in cells =========

            function drawCells(x, y) {

                context.fillStyle = "red";
                context.strokeRect(x*cw, y*cw, cw, cw);
                context.strokeStyle = "white";
                context.strokeRect(x*cw, y*cw, cw, cw);
                
            }

            //=============================== zone check ===============

            function checkCollision(x, y, array) {
                for (let i=0; i<array.length; i++){
                    if (array[i].x === x && array[i].y === y)  return true;
                }
                return false;
            }

            //=========================== events ==================

            $(document).keydown(function (e) {
                let key = e.which;

                if (key === "37" && d !== "right") d = "left";
                    else if (key === "38" && d !== "down") d = "up";
                    else if (key === "39" && d !== "left") d = "right";
                    else if (key === "40" && d !== "up") d = "down";
            })
});