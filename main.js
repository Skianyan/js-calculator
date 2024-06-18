document.body.setAttribute(
	"style",
	"display:flex;flex-direction:column;align-items:center; justify-content:center; height: 100vh; gap:10px; background:grey"
);

// Declare Global variables

let number1 = "",
	number2 = "",
	operator = "",
	currDisplay = "",
	currResult = "";
numberHid = "";
let operators = ["+", "-", "*", "/"];

// Declare calculator functions

function add(n1, n2) {
	let res = n1 + n2;
	return res;
}

function subtract(n1, n2) {
	let res = n1 - n2;
	return res;
}

function multiply(n1, n2) {
	let res = n1 * n2;
	return res;
}

function divide(n1, n2) {
	let res;
	if (n2 == 0) {
		console.log("dont divide by 0 please");
		return 0;
	} else res = n1 / n2;
	return res;
}

// Update display to the value sent

function updateDisplay(val) {
	currDisplay = document.getElementById("display");
	currDisplay.textContent = val;
}

function clearDisplay() {
	currDisplay = document.getElementById("display");
	currDisplay.textContent = "";
}

function resetValues() {
	(number1 = ""),
		(number2 = ""),
		(operator = ""),
		(currDisplay = ""),
		(numberHid = "");
}

function resetCalc() {
	clearDisplay();
	resetValues();
	currResult = "";
}

function operate(n1, op, n2) {
	switch (op) {
		case "+":
			return add(n1, n2);
		case "-":
			return subtract(n1, n2);
		case "*":
			return multiply(n1, n2);
		case "/":
			return divide(n1, n2);
	}
}

function handleButtonClick(event) {
	const num = event.target.textContent;
	// if operator is not selected, collect the first number
	// if operator is selected, store the first number and collect the second number
	// last case is for when a result is already present, resets the calculator if a number is pressed instead of another calculation
	switch (num) {
		case "<=":
			if (number2 == "" && number1 == "") {
				console.log("cannot return from result");
			} else if (operator != "") {
				number2 = number2.slice(0, -1);
				updateDisplay(number2);
			} else {
				console.log(number1);
				number1 = number1.slice(0, -1);
				updateDisplay(number1);
			}
			break;
		case ".":
			if (
				number1.toString().indexOf(".") > -1 ||
				number2.toString().indexOf(".") > -1
			) {
				console.log("topkeke");
			} else {
				if (operator != "") {
					number2 = number2 + num;
					updateDisplay(number2);
				} else {
					console.log(number1);
					number1 = number1 + num;
					updateDisplay(number1);
				}
			}
			break;
		case "+/-":
			break;
		default:
			if (operator != "") {
				number2 = number2 + num;
				updateDisplay(number2);
				console.log("operator: " + operator);
			} else if (operator == "" && currResult == "") {
				number1 = number1 + num;
				updateDisplay(number1);
			} else {
				numberHid = numberHid + num;
				updateDisplay(numberHid);
				number1 = numberHid;
				currResult = "";
			}
	}
}
cButton = document.getElementsByClassName("cButton");
for (var i = 0; i < cButton.length; i++) {
	cButton[i].addEventListener("click", handleButtonClick);
}

const operatorButtons = () => {
	opContainer = document.getElementById("operationCont");
	for (op in operators) {
		opKey = document.createElement("button");
		opKey.classList.add("opButton");
		opKey.textContent = operators[op];
		let opText = opKey.textContent;
		opContainer.appendChild(opKey);
		opKey.addEventListener("click", function () {
			if (number1 != "") {
				operator = opText;
			}
		});
	}
};
operatorButtons();

calcButton = document.getElementById("calculate");

calcButton.addEventListener("click", function () {
	if (number1 && number2 && operator != "") {
		currResult = operate(Number(number1), operator, Number(number2));
		updateDisplay(currResult.toFixed(5).replace(/[.,]+$/, ""));
		resetValues();
		number1 = currResult.toString();
		console.log(number1);
	}
});

resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
	resetCalc();
});
