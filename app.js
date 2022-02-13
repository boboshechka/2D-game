
const player = document.getElementById('player')
const modalEndGame = document.getElementById("modal-end-game");
const overlay = document.getElementById("overlay");
const content = document.getElementById("content");
const btnClose = document.getElementById("btn-close");
// const enemy = document.getElementsByClassName('enemy')
// const bullet = document.getElementsByClassName('bullet')
// const boom = document.getElementsByClassName('boom')

document.addEventListener('keydown', event => {
    switch(event.keyCode) {

// нажата S
        case 83:
            player.style.top = player.offsetTop + 40 + 'px' ;
            break;
// нажата W
        case 87:
            player.style.top = player.offsetTop - 40 + 'px' ;

            break;
// нажат пробел
        case 32:
            createBullet();
             break;
//нажата a
        case 65:
            player.style.left = player.offsetLeft - 20 + 'px' ;

            break;
//нажата d
        case 68:
            player.style.left = player.offsetLeft + 20 + 'px' ;
            break;
    }

})

// создаем пульку
function createBullet() {

     bullet = document.createElement('div')
    bullet.className = 'bullet';

    bullet.style.top = player.offsetTop + 122 + 'px';
    document.body.appendChild(bullet);

    bulletMove(bullet)
}
createEnemy()

function bulletMove(bullet) {
    // таймер для движения пули
     let timerIdBull = setInterval(function(){

    //движение пули
        bullet.style.left = bullet.offsetLeft + 10 + 'px';
    //проверка попадания пули
        isShot(bullet)

        if(bullet.offsetLeft > document.body.clientWidth){
            document.body.removeChild(bullet)
            clearInterval(timerIdBull)
        }
    },10)
}

function isShot(bullet) {
    //координаты пули
    let topB = bullet.offsetTop;
    let bottomB = bullet.offsetTop + bullet.offsetHeight;

    let enemy = document.querySelector('.enemy');

    if(enemy != null) {
        //координаты врага
        let enemyTop = enemy.offsetTop;
        let enemyBottom = enemy.offsetTop + enemy.offsetHeight;

        let leftB = bullet.offsetLeft;
        let enemyLeft = enemy.offsetLeft;
      //проверка на попадание
    if (topB >= enemyTop && bottomB <= enemyBottom && leftB >= enemyLeft) {
        enemy.className = 'boom';
        enemy.style.top = (enemyTop - 50) + 'px';
        enemy.style.left = (enemyLeft - 50) + 'px';
        clearInterval(enemy.dataset.timer)

        setTimeout(function(){
            enemy.remove()
            createEnemy()
        },200);
    };
  }
}
function isDie() {
    let enemy = document.querySelector('.enemy');

    if(enemy.offsetTop >= player.offsetTop && enemy.offsetTop < player.offsetTop + player.offsetHeight && enemy.offsetLeft <= player.offsetLeft + player.offsetWidth) {
        enemy.className = 'boom';
        enemy.style.top = (player.offsetTop + 40) + 'px';
        enemy.style.left = (player.offsetLeft + 40) + 'px';
        clearInterval(enemy.dataset.timer)

        setTimeout(function(){
            enemy.remove()
            createEnemy()
        },200);
        die()
    }
}

function createEnemy() {

    let enemy = document.createElement('div')
    enemy.className = 'enemy';
    enemy.style.top = random(400,document.body.offsetHeight - 20) + 'px';

    document.body.appendChild(enemy);

    let timerIdEnemy = setInterval(function(){
        //движение врага влева получается
        enemy.style.left = (enemy.offsetLeft - 50) + 'px';

        if(enemy.offsetLeft + enemy.offsetWidth < 0) {
            enemy.remove();
            clearInterval(timerIdEnemy);
            createEnemy();
            die()
        }
        // outOf(enemy)
        isDie()
    },100)

    enemy.dataset.timer = timerIdEnemy;
}

// function outOf (element) {
//     if(element.offsetLeft > document.body.clientWidth){
//         document.body.removeChild(element)
//     }
// }
function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


function createHeart() {
    let heart = document.createElement('div')
    heart.style.className = 'heart'
    document.body.appendChild(enemy);

}

function die(){

    let heartsBlock = document.querySelector('#hearts');
    let heart = heartsBlock.querySelector('span');

    if(heart != null){
        heart.remove();
    }

    console.log(heartsBlock);
    if(heartsBlock.childElementCount <= 0) {
        alert('Вы проиграли')
        location.reload();
    }

}

//можно ли при запуске модального окна выключать все прошлые действий или функции

// const prepareResult = () => {
//     modalEndGame.style.display = "block";
// };

// const closeModal = () => {
//     modalEndGame.style.display = "none";
//     location.reload();
// };

// overlay.addEventListener("click", closeModal);
// btnClose.addEventListener("click", closeModal);