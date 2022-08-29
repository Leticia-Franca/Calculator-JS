// We store each element in a variable
const	digits = document.querySelectorAll('.digits');
const	resultDisplay = document.getElementById('display-result');
const	resetBtn = document.getElementById('reset-btn');
const	deleteBtn = document.getElementById('delete-btn');
let		operationElements = [];
let		orderPrecedence = []; //store the indexes of the operators in precedence order
let		index = 0;
let		prevResult = null;
const chosenOperation = {
	"+": (a, b) => a + b, 
	"-": (a, b) => a - b,
	"/": (a, b) => a / b,
	"*": (a, b) => a * b,
	"%": (a, b) => a % b,
};

// Put the reset button to listen to an event
resetBtn.addEventListener('click', () => {
	resultDisplay.textContent = '';
	operationElements.length = 0;
	index = 0;
	prevResult = null;
})

// TO DO: implementar botão de delete!!!!!
/*
 * To implement the delete button, we'll need:
 *	1. to grab the last stored element (string/number) of the array
 * 	2. use the .slice() to remove its last digit/caracter
 * 	3. replace the old array element with this new
 *  4. Redisplay the whole thing updated on the screen
*/

deleteBtn.addEventListener('click', () => {
	let lastIndex = operationElements.length - 1;
	let elementToRemove = operationElements[lastIndex];
	let newElement;

	// console.log(operationElements);
	newElement = elementToRemove.toString().slice(0, -1);
	operationElements.pop();
	newElement.length > 0 ? operationElements.push(parseInt(newElement)) : index--
	// console.log(operationElements);
	resultDisplay.textContent = operationElements.join(' ');
})

/*
 * avaliar se o digito é numérico ou um operador
 * o que precisa ser verificado:
 * se for um digito:
 *  - é o primeiro digito ou o segundo?
 *  - se for o segundo, foi precedido por um operador? se não, precisa ser
 * se for um operador:
 *  - foi precedido de digito? se não, precisa ser
*/

function addDigitToCurrentNumber(prevDigit, chosenNumber){
	operationElements[prevDigit] += chosenNumber;
	operationElements[prevDigit] = parseInt(operationElements[prevDigit]);
	resultDisplay.textContent = operationElements.join(' ');
}

function insertNewNumber(chosenNumber){
	operationElements.push(parseInt(chosenNumber));
	resultDisplay.textContent += ' ' + operationElements[index];
	index++;
}

function isOperator(prevDigit){
	return isNaN(operationElements[prevDigit]);
}

function storeFirstRoundOperation(chosenNumber){
	operationElements.push(parseInt(chosenNumber));
	resultDisplay.textContent = operationElements[0];
	index++;
}

function storeNumber(clickedDigit){
	let chosenNumber = clickedDigit.textContent;
	let prevDigit = index - 1;

	if (operationElements.length == 0) {
		if (prevResult == null)
			storeFirstRoundOperation(chosenNumber);
	}
	else {
		isOperator(prevDigit) ? insertNewNumber(chosenNumber) : addDigitToCurrentNumber(prevDigit, chosenNumber);
	}
}

function storeOperator(clickedDigit){
	if (clickedDigit.id == 'delete-btn')
		return ;
	if (operationElements.length == 0) {
		alert('Please, you need to pick a number before the operator!');		
		return ;
	}
	if (typeof(operationElements[index-1]) == 'string')
		alert('Error: you have already chosen an operator!');
	else {
		operationElements.push(clickedDigit.textContent);
		resultDisplay.textContent += ' ' + operationElements[index];
		index++;
	}
}

function isNumber(clickedDigit){
	return clickedDigit.classList.contains('numbers')
}

function isEqualSign(clickedDigit){
	return clickedDigit.id == 'equal-to';
}

function validateEquation(){
	if (operationElements.length < 3 ){
		alert('Error! Your equation must have at least 2 numbers and one operator!');
		return 0;
	}
	doCalculation()
	return 1;
}

// We need each digit to listen to the 'click' event
digits.forEach(digit => {
	digit.addEventListener('click', (e) => {
		let clickedDigit = e.target;

		if (isEqualSign(clickedDigit)){
			validateEquation()
		}
		else
			isNumber(clickedDigit) ? storeNumber(clickedDigit) : storeOperator(clickedDigit);
	})
})

function calculatePrecedence(){
	let i = 1;

	while(i < operationElements.length){
		if (operationElements[i] == "*" || operationElements[i] == "/"){
			let firstNumber = operationElements[i-1];
			let secondNumber = operationElements[i+1];
			let operator = operationElements[i];
			let resultPrecedence = chosenOperation[operator](firstNumber, secondNumber);
			operationElements.splice(i-1, 3, resultPrecedence);
		}
		i += 2;
	}
}

function doCalculation() {
	let firstNumber;
	let secondNumber;
	let operatorIndex = 1; //incrementa de dois em dois
	let currentResult;

	firstNumber = operationElements[0];
	// reorganizar o array de Elementos por ordem de precedencia (* e / antes de + e -)
	calculatePrecedence();
	while (operatorIndex < operationElements.length) { 
		secondNumber = operationElements[operatorIndex + 1];
		if (operatorIndex > 1)
			firstNumber = currentResult;
		currentResult = chosenOperation[operationElements[operatorIndex]](firstNumber, secondNumber);
		operatorIndex += 2;
		resultDisplay.textContent = currentResult;
	}
	
	// after the calculation, reset variables for operationoperationType = null;
	// another method for emptying an array...
	operationElements.length = 0;
	prevResult = currentResult;
	operationElements.push(prevResult);
	index = 1;
	// console.log(operationElements);
}