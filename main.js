const $btn = document.getElementById('btn-kick');
const $superBtn = document.getElementById('btn-kick-superpower');

const character = {
  name: 'Pikachu',
  defaultHp: 100,
  damageHp: 100,
  elHp: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  superPower: 'on',
};

const enemy = {
  name: 'Charmander',
  defaultHp: 100,
  damageHp: 100,
  elHp: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
};

$btn.addEventListener('click', function () {
  changeHp(random(20), character);
  changeHp(random(20), enemy);
});

$superBtn.addEventListener('click', function () {
  character.superPower = 'off';
  changeHp(random(40), enemy);
  $superBtn.disabled = true;
});

function init() {
  console.log('Start game!');
  renderHp(character);
  renderHp(enemy);
  $superBtn.disabled = true;
}

function renderHp(person) {
  renderHpLife(person);
  renderProgressbarHp(person)
}

function renderHpLife(person) {
  person.elHp.innerText = person.damageHp + ' /' + person.defaultHp;
}

function renderProgressbarHp(person) {
  person.elProgressbar.style.width = person.damageHp + '%';
}

function changeHp(count, person) {
  superPower();
  if (person.damageHp <= count) {
    person.damageHp = 0;
    alert('Неудачник ' + person.name + ' проиграл!');
    $btn.disabled = true;
  } else {
    person.damageHp -= count;
  }
  renderHp(person);
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function superPower() {
  if (character.damageHp < 30) {
    if (character.superPower === 'on') {
      alert('Pikachu может использовать супер-удар!')
      $superBtn.disabled = false;
    }
  }
}

init();