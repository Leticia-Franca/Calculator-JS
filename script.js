// We store each element in a variable
const digits = document.querySelectorAll('.digits');
const resultDisplay = document.getElementById('display-result');
const resetBtn = document.getElementById('reset-btn');
let firstNumber = null;
let secondNumber = null;
let hasOperator = null;
let	operationType = null;
let isEqual = null;


// console.log(numbers[0].textContent);
// console.log(numbers[1].textContent);

// Abaixo: teste pra verificar se o digito é operador ou não (pode ser feito o mesmo com .numbers)
// console.log("Operator: ", operators[0].textContent);
// if (digits[10].classList.contains('operators'))
// 	console.log("opa, eh operador hein", digits[10].textContent);
// else
// 	console.log("nao eh operador!");

// Put the reset button to listen to an event
resetBtn.addEventListener('click', () => {
	firstNumber = null;
	secondNumber = null;
	hasOperator = null;
	operationType = null;
	isEqual = null;
	resultDisplay.textContent = '';
})

// We need each digit to listen to the 'click' event
digits.forEach(digit => {
	digit.addEventListener('click', (e) => {
		let clickedDigit = e.target;
		// console.log(clickedDigit.textContent);
		/*
		 * avaliar se o digito é numérico ou um operador
		 * o que precisa ser verificado:
		 * se for um digito:
		 *  - é o primeiro digito ou o segundo?
		 *  - se for o segundo, foi precedido por um operador? se não, precisa ser
		 * se for um operador:
		 *  - foi precedido de digito? se não, precisa ser
		*/
		// if(clickedDigit.classList.contains('numbers'))
		// 	console.log("it's a NUMBER!");
		// else
		// 	console.log("it's an OPERATOR!");
		// if (clickedDigit.classList.contains('numbers'))
		if (clickedDigit.classList.contains('numbers')) {
			if (firstNumber == null) {
				firstNumber = clickedDigit.textContent;
				resultDisplay.textContent = firstNumber;
			}
			else if (hasOperator == null)
			{
				firstNumber += clickedDigit.textContent;
				resultDisplay.textContent = firstNumber;
			}
			else {
				if (secondNumber == null) {
					secondNumber = clickedDigit.textContent;
					resultDisplay.textContent += secondNumber;	
				}
				else {
					secondNumber += clickedDigit.textContent;	
					console.log(secondNumber);
					resultDisplay.textContent = firstNumber + ' ' + operationType + ' ' + secondNumber;
				}	
			}
		// console.log(firstNumber);
		} else if (clickedDigit.classList.contains('operators')) {
			if (firstNumber == null)
				alert('Please, you need to pick a number before the operator!');		
			else {
				if (hasOperator == 1)
					alert('Error: you have already chosen an operator!');
				else {
					hasOperator = 1;
					operationType = clickedDigit.textContent;
					// console.log('Operation type: ' + operationType);
					resultDisplay.textContent += ' ' + operationType;
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

	first = parseInt(firstNumber);
	second = parseInt(secondNumber);
	const handleOperation = {
		"+": first + second, 
		"-": first - second,
		"/": first / second,
		"*": first * second,
		"%": first % second,
	};

	result = handleOperation[operationType];
	console.log('Resultado é: ' + result);
	resultDisplay.textContent = result;

	// after the calculation, reset variables for operation
	firstNumber = null;
	secondNumber = null;
	operationType = null;
	isEqual = null;
	hasOperator = null;
}