// We store each element in a variable
const digits = document.querySelectorAll('.digits');
const resultDisplay = document.getElementById('display-result');
const resetBtn = document.getElementById('reset-btn');
let isEqual = null;
let operationElements = [];
let index = 0;

// Put the reset button to listen to an event
resetBtn.addEventListener('click', () => {
	isEqual = null;
	resultDisplay.textContent = '';
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
// We need each digit to listen to the 'click' event
digits.forEach(digit => {
	digit.addEventListener('click', (e) => {
		let clickedDigit = e.target;

		if (clickedDigit.classList.contains('numbers')) {
			if (operationElements.length == 0) {
				operationElements.push(clickedDigit.textContent);
				operationElements[0] = parseInt(operationElements[0]);
				resultDisplay.textContent = operationElements[0];
				index++;
			}
			else if (index == 1 && typeof(operationElements[index-1]) === 'number')
			{
				operationElements[index-1] += clickedDigit.textContent;
				operationElements[index-1] = parseInt(operationElements[index-1]);
				resultDisplay.textContent = operationElements[index-1];
			}
			else {
				if (isNaN(operationElements[index-1]))
				{
					operationElements.push(clickedDigit.textContent);
					operationElements[index] = parseInt(operationElements[index]);
					resultDisplay.textContent += ' ' + operationElements[index];
					index++;
				}
				else {
					operationElements[index-1] += clickedDigit.textContent;
					operationElements[index-1] = parseInt(operationElements[index-1]);
					resultDisplay.textContent = '';
					resultDisplay.textContent = operationElements.join(' ');

				}
			}
		} else if (clickedDigit.classList.contains('operators')) {
			if (operationElements.length == 0)
				alert('Please, you need to pick a number before the operator!');		
			else {
				if (typeof(operationElements[index-1]) == 'string')
					alert('Error: you have already chosen an operator!');
				else {
					operationElements.push(clickedDigit.textContent);
					resultDisplay.textContent += ' ' + operationElements[index];
					index++;
				}
			}
		}
		else {
			if (clickedDigit.id == 'equal-to') {
				isEqual = 1;
				calculation();
			}
		}
	})
})

function calculation() {
	let result;
	let first;
	let second;
	let index_operator = 1; //incrementa de dois em dois

	first = operationElements[index_operator-1];

	while (index_operator < operationElements.length) { 
		second = operationElements[index_operator+1];
		if (index_operator > 1)
			first = result;
		const handleOperation = {
			"+": first + second, 
			"-": first - second,
			"/": first / second,
			"*": first * second,
			"%": first % second,
		};
		result = handleOperation[operationElements[index_operator]];
		index_operator += 2;
		resultDisplay.textContent = result;
	}
	
	// after the calculation, reset variables for operationoperationType = null;
	isEqual = null;
	operationElements = [];
	index = 0;
}