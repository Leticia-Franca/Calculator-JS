// We store each element in a variable
const	digits = document.querySelectorAll('.digits');
const	resultDisplay = document.getElementById('display-result');
const	resetBtn = document.getElementById('reset-btn');
const	deleteBtn = document.getElementById('delete-btn');
let		operationElements = [];
let		index = 0;
let		prevResult = null;

// Put the reset button to listen to an event
resetBtn.addEventListener('click', () => {
	resultDisplay.textContent = '';
	operationElements.length = 0;
	index = 0;
	prevResult = null;
})

// TO DO: implementar botão de delete!!!!!

// deleteBtn.addEventListener('click', () => {
// 	console.log(resultDisplay.textContent.slice(0, -1));
// 	resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
// 	console.log('Index: ',index);
// 	console.log(operationElements[index]);
// })

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

// We need each digit to listen to the 'click' event
digits.forEach(digit => {
	digit.addEventListener('click', (e) => {
		let clickedDigit = e.target;

		if (isEqualSign(clickedDigit))
			doCalculation();
		else
			isNumber(clickedDigit) ? storeNumber(clickedDigit) : storeOperator(clickedDigit);
	})
})

function doCalculation() {
	let firstNumber;
	let secondNumber;
	let operatorIndex = 1; //incrementa de dois em dois
	let currentResult;

	firstNumber = operationElements[0];

	while (operatorIndex < operationElements.length) { 
		secondNumber = operationElements[operatorIndex + 1];
		if (operatorIndex > 1)
			firstNumber = currentResult;
		const chosenOperation = {
			"+": firstNumber + secondNumber, 
			"-": firstNumber - secondNumber,
			"/": firstNumber / secondNumber,
			"*": firstNumber * secondNumber,
			"%": firstNumber % secondNumber,
		};
		currentResult = chosenOperation[operationElements[operatorIndex]];
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