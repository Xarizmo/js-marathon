import Pokemon from './pokemon.js';
import random from './utils.js';

const $control = document.querySelector('.control');
const $logs = document.querySelector('.logs');

function renderStartBtn(name) {
  $control.innerHTML = '';
  const $startBtn = document.createElement('button');
  $startBtn.classList.add('button');
  $startBtn.innerText = name;
  $startBtn.addEventListener('click', startGame);
  $control.appendChild($startBtn);
}

function startGame() {
  $control.innerHTML = '';
  $logs.innerHTML = '';
  game.start();
}

function counter(count = 0) {
  return function () {
    count++;
    return count;
  }
}

const newRoundCounter = counter();

function countBtn(count = 10, el) {
  const innerText = el.innerText;
  el.innerText = `${innerText} [${count}]`;
  
  return function () {
    count--;
    if (count === 0) {
      el.disabled = true;
    }
    el.innerText = `${innerText} [${count}]`;
    return count;
  }
}

function generateLog(firstPerson, secondPerson, count) {
  const { name: firstPersonName, hp: { current: firstPersonHp } } = firstPerson;
  const { name: secondPersonName } = secondPerson;
  const logs = [
    `${firstPersonName} вспомнил что-то важное, но неожиданно ${secondPersonName}, не помня себя от испуга, ударил в предплечье врага. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} поперхнулся, и за это ${secondPersonName} с испугу приложил прямой удар коленом в лоб врага. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} забылся, но в это время наглый ${secondPersonName}, приняв волевое решение, неслышно подойдя сзади, ударил. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пришел в себя, но неожиданно ${secondPersonName} случайно нанес мощнейший удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} поперхнулся, но в это время ${secondPersonName} нехотя раздробил кулаком черепушку противника. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} удивился, а ${secondPersonName} пошатнувшись влепил подлый удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} высморкался, но неожиданно ${secondPersonName} провел дробящий удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пошатнулся, и внезапно наглый ${secondPersonName} беспричинно ударил в ногу противника <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} расстроился, как вдруг, неожиданно ${secondPersonName} случайно влепил стопой в живот соперника. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пытался что-то сказать, но вдруг, неожиданно ${secondPersonName} со скуки, разбил бровь сопернику. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`
  ];
  
  return logs[random(logs.length) - 1];
}

class Game {
  player1;
  player2;
  
  getRandomPokemon = async () => {
    const res = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
    const body = await res.json();
    
    return body;
  }
  
  getKick = async (player1id, player2id, attackId) => {
    const res = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${player1id}&attackId=${attackId}&player2id=${player2id}`);
    const body = await res.json();

    return body;
  }
  
  fightLog = async (count, player) => {
    const $p = document.createElement('p');
    let log;
    let $buttons = document.querySelectorAll('.button');
    
    if (player.hp.current === 0) {
      $buttons.forEach(i => i.disabled = true);
      renderStartBtn('Restart game');
      log = player === this.player2
        ? `&#127752;Round ${newRoundCounter()}<hr>${generateLog(player, this.player1, count)}<br>&#129308;&#129307;The fight is over!<br>${player.name}&#128128; проиграл!`
        : `${generateLog(player, this.player2, count)}<br>&#129308;&#129307;The fight is over!<br>${player.name}&#128128; проиграл!<hr>`;
    } else {
      log = player === this.player2
        ? `&#127752;Round ${newRoundCounter()}<hr>${generateLog(player, this.player1, count)}`
        : `${generateLog(player, this.player2, count)}<hr>`;
    }
    
    $p.innerHTML = `${log}`;
    $logs.insertBefore($p, $logs.children[0]);
  }
  
  start = async () => {
    this.player1 = new Pokemon({
      ...(await this.getRandomPokemon()),
      selectors: 'player1',
    });
  
    this.player2 = new Pokemon({
      ...(await this.getRandomPokemon()),
      selectors: 'player2',
    });
  
    this.player1.renderPlayer();
    this.player2.renderPlayer();
  
    this.player1.attacks.forEach(i => {
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $control.appendChild($btn);
      $btn.innerText = i.name;
    
      const btnCount = countBtn(i.maxCount, $btn);
    
      $btn.addEventListener('click', async () => {
        const count = await this.getKick(this.player1.id, this.player2.id, i.id);
        btnCount();
        this.player1.changeHp(count.kick.player2, this.player1, this.fightLog);
        this.player2.changeHp(count.kick.player1, this.player2, this.fightLog);
      })
      $control.appendChild($btn);
    })
  }
}

const game = new Game();

renderStartBtn('Start game');