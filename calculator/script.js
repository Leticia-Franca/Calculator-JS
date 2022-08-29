// We store each element in a variable
const digits = document.querySelectorAll('.digits');
const resultDisplay = document.getElementById('display-result');
const resetBtn = document.getElementById('reset-btn');
const deleteBtn = document.getElementById('delete-btn');
let operationElements = [];
let index = 0;

// Put the reset button to listen to an event
resetBtn.addEventListener('click', () => {
	resultDisplay.textContent = '';
	operationElements = [];
	index = 0;
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

function storeNumber(clickedDigit){
	let chosenNumber = clickedDigit.textContent;
	let prevDigit = index - 1;

	if (operationElements.length == 0) {
		operationElements.push(parseInt(chosenNumber));
		resultDisplay.textContent = operationElements[0];
		index++;
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

// We need each digit to listen to the 'click' event
digits.forEach(digit => {
	digit.addEventListener('click', (e) => {
		let clickedDigit = e.target;

		if (clickedDigit.id == 'equal-to'){
			doCalculation();
			return ;
		}
		else {
			isNumber(clickedDigit) ? storeNumber(clickedDigit) : storeOperator(clickedDigit);
		}
	})
})

function doCalculation() {
	let result;
	let firstNumber;
	let secondNumber;
	let operationIndex = 1; //incrementa de dois em dois

	firstNumber = operationElements[0];

	while (operationIndex < operationElements.length) { 
		secondNumber = operationElements[operationIndex+1];
		if (operationIndex > 1)
			firstNumber = result;
		const handleOperation = {
			"+": firstNumber + secondNumber, 
			"-": firstNumber - secondNumber,
			"/": firstNumber / secondNumber,
			"*": firstNumber * secondNumber,
			"%": firstNumber % secondNumber,
		};
		result = handleOperation[operationElements[operationIndex]];
		operationIndex += 2;
		resultDisplay.textContent = result;
	}
	
	// after the calculation, reset variables for operationoperationType = null;
	// another method for emptying an array...
	operationElements.length = 0;
	index = 0;
}