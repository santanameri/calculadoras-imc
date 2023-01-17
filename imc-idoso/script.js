const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 22",
      info: "Magreza",
    },
    {
        min: 22,
        max: 27,
        classification: "Entre 22 e 27",
        info: "Eutrofia",
      },
    {
        min: 27,
        max: 99,
        classification: "Maior que 27",
        info: "Excesso de Peso",
    },
];

const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

function createTable(data) {
    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("table-data");
  
      const classification = document.createElement("p");
      classification.innerText = item.classification;
  
      const info = document.createElement("p");
      info.innerText = item.info;
  
      const obesity = document.createElement("p");
      obesity.innerText = item.obesity;
  
      div.appendChild(classification);
      div.appendChild(info);

      imcTable.appendChild(div);
  });
}

function validDigits(text) {
    return text.replace(/[^0-9,]/g, "");
  }
  
  function calcImc(height, weight) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
  }
  
  function cleanInputs() {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
  }
  
  function showOrHideResults() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
  }

  createTable(data);

  [heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
      const updatedValue = validDigits(e.target.value);
  
      e.target.value = updatedValue;
    });
  });

  calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");
  
    console.log(weight, height);
  
    if (!weight || !height) return;
  
    const imc = calcImc(height, weight);
    let info;
  
    data.forEach((item) => {
      if (imc >= item.min && imc <= item.max) {
        info = item.info;
      }
    });
  
    if (!info) return;
  
    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    switch (info) {
        case "Magreza":
          imcNumber.classList.add("low");
          imcInfo.classList.add("low");
          break;
        case "Eutrofia":
          imcNumber.classList.add("good");
          imcInfo.classList.add("good");
          break;
        case "Excesso de Peso":
          imcNumber.classList.add("high");
          imcInfo.classList.add("high");
          break;
    }

    showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  cleanInputs();
});

backBtn.addEventListener("click", (e) => {
  cleanInputs();
  showOrHideResults();
});