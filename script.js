// Assign variables for sign and html tags
let operationSigns = ["+", "−", "×", "÷"];
const timeDisplay = document.querySelector(".top-left p");
const inputs = document.querySelectorAll(".input");

const equals = document.querySelector(".equals");
const prevInput = document.querySelector(".prev-input");
const operationInput = document.querySelector(".operation-input");
const currentInput = document.querySelector(".current-input");

let inputValue = "";

// addeventlistener for each calculator input
inputs.forEach((input) => {
  input.addEventListener("click", () => {
    scaleChange(input);
    if (input.classList.contains("operation")) {
      checkOperation(input);
    } else if (!input.classList.contains("controls")) {
      checkDigits(input);
    } else {
      checkControls(input);
    }
  });
});

// handle equal sign click
equals.addEventListener("click", () => {
  scaleChange(equals);
  if (
    currentInput.textContent &&
    prevInput.textContent &&
    operationInput.textContent
  ) {
    currentInput.textContent = evaluate(
      currentInput.textContent,
      prevInput.textContent,
      operationInput.textContent
    );
    prevInput.textContent = "";
    operationInput.textContent = "";
    inputValue = "";
  }
});

// check control input values
const checkControls = (input) => {
  const inputText = input.textContent;

  switch (inputText) {
    case "C":
      currentInput.textContent = "";
      prevInput.textContent = "";
      operationInput.textContent = "";
      inputValue = "";
      break;
    case "D":
      if (currentInput.length === 1 || currentInput.textContent === "") {
        inputValue = "";
        currentInput.textContent = "";
      } else {
        let slicedValue = inputValue.slice(0, -1);
        inputValue = slicedValue;
        currentInput.textContent = slicedValue;
      }
      break;
    case "+/-":
      console.log(inputValue, currentInput.textContent);
      if (!currentInput.textContent || currentInput.textContent === "+") {
        currentInput.textContent = "-";
      } else if (currentInput.textContent === "-") {
        currentInput.textContent = "+";
      }

    default:
      break;
  }
};

const checkDigits = (input) => {
  let currentTextContent = currentInput.textContent;
  if (currentTextContent.includes(".") && input.textContent === ".") {
    currentInput.textContent = currentTextContent;
  } else if (currentTextContent === "0" && input.textContent === "0") {
    currentInput.textContent = currentTextContent;
  } else {
    if (currentInput.textContent === "+" || currentInput.textContent === "-") {
      inputValue += currentInput.textContent + input.textContent;
    } else {
      inputValue += input.textContent;
    }
  }

  currentInput.textContent = inputValue;
};

const checkOperation = (input) => {
  let currentTextContent = currentInput.textContent;
  let prevTextContent = prevInput.textContent;
  let operationTextContent = operationInput.textContent;

  if (
    currentTextContent === "" &&
    prevTextContent === "" &&
    operationTextContent === ""
  ) {
    currentInput.textContent = "";
  }

  if (currentTextContent === "" && prevTextContent && operationTextContent) {
    operationInput.textContent = input.textContent;
  }

  if (
    currentTextContent &&
    currentTextContent !== "-" &&
    currentTextContent !== "+" &&
    prevTextContent === "" &&
    operationTextContent === ""
  ) {
    operationInput.textContent = input.textContent;
    prevInput.innerText = currentTextContent;
    inputValue = "";
    currentInput.textContent = "";
  }

  if (currentTextContent && prevTextContent && operationTextContent) {
    prevInput.textContent = evaluate(
      currentTextContent,
      prevTextContent,
      operationTextContent
    );
    operationInput.textContent = input.textContent;
    inputValue = "";
    currentInput.textContent = "";
  }
};

// evaluate based on the input values
const evaluate = (
  currentTextContent,
  prevTextContent,
  operationTextContent
) => {
  const firstNumber = parseFloat(prevTextContent);
  const secondNumber = parseFloat(currentTextContent);
  let result;
  switch (operationTextContent) {
    case operationSigns[0]:
      result = firstNumber + secondNumber;
      break;
    case operationSigns[1]:
      result = firstNumber - secondNumber;
      break;
    case operationSigns[2]:
      result = firstNumber * secondNumber;
      break;
    case operationSigns[3]:
      result = firstNumber / secondNumber;
      break;
    default:
      break;
  }
  return result;
};

// Change input color with hover effect
inputs.forEach((input) => {
  mouseHover(input);
});

// Change input color for equal sign with hover effect
mouseHover(equals);

// mousemove color change function
function mouseHover(input) {
  input.addEventListener("mouseover", () => {
    input.classList.add("hover-color");
  });
  input.addEventListener("mouseleave", () => {
    input.classList.remove("hover-color");
  });
}

// add scale change effect to the inputs when clicked
function scaleChange(input) {
  input.classList.add("scale-change");
  setTimeout(() => {
    input.classList.remove("scale-change");
  }, 250);
}

// set current time at top
setInterval(() => {
  let currentTime = new Date();
  let currentHr = currentTime.getHours();
  let currentMin = currentTime.getMinutes();
  let merdian;
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  if (currentHr > 12 && currentHr < 24) {
    currentHr = currentHr - 12;
    merdian = "PM";
  } else if (currentHr == 24) {
    currentHr = "00";
    merdian = "AM";
  } else if (currentHr == 12) {
    merdian = "PM";
  } else {
    merdian = "AM";
  }

  timeDisplay.textContent = `${currentHr}:${currentMin} ${merdian}`;
}, 1000);
