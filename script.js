const numbersContainer = document.querySelector('.numbers');
const selectedList = document.getElementById('selected-list');
const checkButton = document.getElementById('check');
const result = document.getElementById('result');
const statsDisplay = document.getElementById('stats');

const selectedNumbers = new Set();

for (let i = 1; i <= 49; i++) {
  const numberButton = document.createElement('button');
  numberButton.textContent = i;
  numberButton.classList.add('number');
  numberButton.addEventListener('click', () => toggleNumber(numberButton, i));
  numbersContainer.appendChild(numberButton);
}

function toggleNumber(button, num) {
  if (selectedNumbers.has(num)) {
    selectedNumbers.delete(num);
    button.classList.remove('selected');
  } else {
    if (selectedNumbers.size < 6) {
      selectedNumbers.add(num);
      button.classList.add('selected');
    } else {
      alert('Możesz wybrać tylko 6 liczb!');
    }
  }
}


checkButton.addEventListener('click', () => {
    const checkedButton = document.querySelectorAll(".number.selected")
    checkedButton.forEach(el=> el.classList.remove("green"))
    
    const drawnNumbers = generateLotteryNumbers();
  let hits = 0;
  selectedNumbers.forEach(num => {
    if (drawnNumbers.has(num)) {
      hits++;
    }
  });
  result.textContent = `Trafione: ${hits == 0 ? hits +" liczb" : hits == 1 ? hits +" liczba": hits +" liczby"} `;
  
  // Wyświetlenie statystyk
  const stats = calculateStats(drawnNumbers);
checkedButton.forEach(el=> drawnNumbers.forEach(num=>{
    +el.textContent ==num && el.classList.add("green")
}
))
  displayStats(stats);
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLotteryNumbers() {
  let numbers = new Set();
  while (numbers.size < 6) {
    let randomNumber = getRandomNumber(1, 49);
    numbers.add(randomNumber);
  }
  return numbers;
}

function calculateStats(drawnNumbers) {
  const stats = {};
  drawnNumbers.forEach(num => {
    if (stats[num]) {
      stats[num]++;
    } else {
      stats[num] = 1;
    }
  });
  return stats;
}

function displayStats(stats) {
  statsDisplay.innerHTML = '<h2>Wygrywają liczby:</h2>';
  for (let i = 1; i <= 49; i++) {
    const count = stats[i] || 0;
    const statDiv = document.createElement('div');
    if(count){
        statsDisplay.classList.add("won")
        statDiv.classList.add("stat-number")
        statDiv.textContent = `Liczba ${i}`;
        statsDisplay.appendChild(statDiv);
    }
  }
  const wonNumbers = document.querySelectorAll(".stat-number")
  const checkedButton = document.querySelectorAll(".number.selected")

  
    checkedButton.forEach(btn=>{
        if(btn.classList.contains("green")){
            const numBtn = +btn.textContent
            wonNumbers.forEach(num=>{
               let number = +num.textContent.slice(num.textContent.indexOf(" "))
            if(number === numBtn){
                num.classList.add("green")
                num.classList.add("rounded")
            }
           })
        }
    })

}
