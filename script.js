score = 0;
cross = true;

audio  = new Audio('bgm.mp3')
audiogo = new Audio('gameover.wav')
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    //console.log("key code is",e.keyCode)
    if (e.keyCode == 38||e.keyCode==32) {
        gojo = document.querySelector('.gojo');
        gojo.classList.add('animateGojo');
        setTimeout(() => {
            gojo.classList.remove('animateGojo')
        }, 700);
    }
    if (e.keyCode == 39) {
        gojo = document.querySelector('.gojo');
        gojox = parseInt(window.getComputedStyle(gojo, null).getPropertyValue('left'));
        gojo.style.left = gojox + 112 + "px";

    }
    if (e.keyCode == 37) {
        gojo = document.querySelector('.gojo');
        gojox = parseInt(window.getComputedStyle(gojo, null).getPropertyValue('left'));
        gojo.style.left = (gojox - 112) + "px";

    }
}

const mainInterval = setInterval(() => {
    gojo = document.querySelector('.gojo');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    gx = parseInt(window.getComputedStyle(gojo, null).getPropertyValue('left'));
    gy = parseInt(window.getComputedStyle(gojo, null).getPropertyValue('top'));


    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    //console.log(gx,ox,gy,oy)
    offsetx = Math.abs(gx - ox);
    offsety = Math.abs(gy - oy);

    if (offsetx < 113 && offsety < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni');
        audiogo.play()
        audio.pause()
        stopFunction()
    }
    else if (offsetx < 145 && cross) {
        score += 1

        updateScore(score)
        cross = false
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {


            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1
            if(newDur<=3.9){
                const fixDur = 3.9
                obstacle.style.animationDuration = fixDur+ 's'
            }
            else{
            //console.log(newDur)
            obstacle.style.animationDuration = newDur + 's'}
        }, 500)
    }
}, 10)

//to stop the incriment of score after game over
function stopFunction() {
    clearInterval(mainInterval);
}

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}