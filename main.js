// function getRow(firstRow, secondRow) {
//   const firstRowCharA = firstRow.split('').filter(char => char === 'а').length;
//   const secondRowCharA = secondRow.split('').filter(char => char === 'а').length;
//
//   return firstRowCharA > secondRowCharA ? firstRow : secondRow;
// }
//
// console.log(getRow('мама мыла раму', 'кошака друг человека'));
//
// function formattedPhone(ph) {
//   return `${ph[0]}${ph[1]} (${ph[2]}${ph[3]}${ph[4]}) ${ph[5]}${ph[6]}${ph[7]}-${ph[8]}${ph[9]}-${ph[10]}${ph[11]}`;
// }
//
// console.log(formattedPhone('+71234567890'));

function getRow() {
  const firstRow = window.prompt("Введите первую строку");
  const secondRow = window.prompt("Введите вторую строку");
  const char = window.prompt("Введите букву для сравнения")
  
  const firstRowCharA = firstRow.split('').filter(i => i === char).length;
  const secondRowCharA = secondRow.split('').filter(i => i === char).length;
  
  return firstRowCharA > secondRowCharA
    ? alert(`В строке "${firstRow}" количество букв "${char}" больше!`)
    : alert(`В строке "${secondRow}" количество букв "${char}" больше!`);
}

function formattedPhone() {
  const ph = window.prompt("Введите номер телефона в формате +71234567890");
  
  return alert(`Вуаля! ${ph[0]}${ph[1]} (${ph[2]}${ph[3]}${ph[4]}) ${ph[5]}${ph[6]}${ph[7]}-${ph[8]}${ph[9]}-${ph[10]}${ph[11]}`);
}
