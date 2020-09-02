class Selectors {
  constructor(name) {
    this.elHp = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors);
    
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    
    this.renderHP();
  }
  
  changeHp = (count) => {
    this.currentHp -= count;
    
    if (this.currentHp <= count) {
      const log = `&#129308;&#129307;The fight is over!<br>${this.name}&#128128; проиграл!`;
      this.currentHp = 0;
      $btn.disabled = true;
      fightLogging(log);
    } else if (this === character && character.currentHp < 90 && character.hasSuperPower) {
      console.log(character.name + ' может использовать супер-удар!')
      $superBtn.disabled = false;
    }
    
    const log = this === enemy
      ? `&#127752;Round ${newRoundCounter()}<hr>${generateLog(this, character, count)}`
      : `${generateLog(this, enemy, count)}<hr>`;
    
    fightLogging(log);
    
    this.renderHp();
  }
  
  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
  }
  
  renderHPLife = () => {
    const { elHP, hp: { current, total } } = this;
    
    elHP.innerText = current + ' /' + total;
  }
  
  renderProgressbarHP = () => {
    const { hp: {current, total }, elProgressbar } = this;
    const percent = (current * 100) / total;
    
    elProgressbar.style.width = percent + '%';
  }
}

export default Pokemon;