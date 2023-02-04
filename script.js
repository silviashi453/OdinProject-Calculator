let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let resetScreen = false;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".delete");
const signButton = document.querySelector(".sign");
const equalButton = document.querySelector(".equal");
const pointButton = document.querySelector(".point");
const currentOperation = document.querySelector("#currentOperation");
const lastOperation = document.querySelector("#lastOperation");

clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click", deleteNumber);
equalButton.addEventListener("click", evaluate);
pointButton.addEventListener("click", processPoint);
signButton.addEventListener("click", processSign);
numberButtons.forEach((numberButton) => {
  processNumber(numberButton);
});
operatorButtons.forEach((operatorButton) => {
  processOperator(operatorButton);
});
window.addEventListener("keydown", handleKeyboardInput);

function clear() {
  currentOperation.textContent = "0";
  lastOperation.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function deleteNumber() {
  currentOperation.textContent = currentOperation.textContent
    .toString()
    .slice(0, -1);
}

function processNumber(numberButton) {
  numberButton.addEventListener("click", () => {
    appendNumber(numberButton.textContent);
  });
}

function processOperator(operatorButton) {
  operatorButton.addEventListener("click", () => {
    setOperator(operatorButton.textContent);
  });
}

function processPoint() {
  if (currentOperation.textContent === "") {
    currentOperation.textContent = "0";
  }
  //unable to add more than one point to the display
  if (currentOperation.textContent.includes(".")) {
    return;
  }
  currentOperation.textContent += ".";
}

function processSign() {
  if (
    currentOperation.textContent === "0" ||
    currentOperation.textContent === ""
  ) {
    return;
  }
  if (currentOperation.textContent.includes("-")) {
    currentOperation.textContent = currentOperation.textContent
      .toString()
      .slice(1);
  } else {
    currentOperation.textContent = "-" + currentOperation.textContent;
  }
}

function appendNumber(number) {
  if (currentOperation.textContent === "0" || resetScreen) {
    reset();
  }
  currentOperation.textContent += number;
}

function setOperator(operator) {
  console.log(operator);
  if (currentOperator !== null) evaluate();
  firstNumber = currentOperation.textContent;
  currentOperator = operator;
  lastOperation.textContent = `${firstNumber} ${currentOperator}`;
  resetScreen = true;
}

function evaluate() {
  console.log("Operator is ", currentOperator);
  console.log("But currentOperator === null is", currentOperator === null);
  if (currentOperator === null || resetScreen) return;
  if (currentOperator === "÷" && currentOperation.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondNumber = currentOperation.textContent;
  currentOperation.textContent = round(
    operate(currentOperator, firstNumber, secondNumber)
  );
  lastOperation.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
  currentOperator = null;
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}

function reset() {
  currentOperation.textContent = "";
  resetScreen = false;
}

function handleKeyboardInput(event) {
  if (event.key >= 0 && event.key <= 9) appendNumber(event.key);
  if (event.key === ".") processPoint();
  if (event.key === "=" || event.key === "Enter") evaluate();
  if (event.key === "Backspace") deleteNumber();
  if (event.key === "Delete") clear();
  if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  )
    setOperator(convertOperator(event.key));
}

function convertOperator(key) {
  switch (key) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "x";
    case "/":
      return "÷";
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return substract(num1, num2);
    case "÷":
      return divide(num1, num2);
    case "x":
      return multiply(num1, num2);
  }
}
