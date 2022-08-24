// We store each element in a variable
const digits = document.querySelectorAll('.digits');
const resultDisplay = document.getElementById('display-result');
const resetBtn = document.getElementById('reset-btn');
let firstNumber = null;
let secondNumber = null;
let hasOperator = null;
let	operationType = null;
// let isEqual = null;
let numbers = [];

console.log(numbers);
numbers.push(parseInt('1'));
console.log(numbers[0]);
// let result = numbers[0].concat('2');
// console.log(result);
// numbers[0] = result;
// console.log("Qual será o valor da posicao 0? Abaixo:");
// numbers[0] += '2';
// console.log(numbers[0]);
// numbers[0] = parseInt(numbers[0])
// console.log(numbers[0])
let operationElements = [];
let index = 0;


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
			// if (firstNumber == null) {
			// 	firstNumber = clickedDigit.textContent;
			// 	resultDisplay.textContent = firstNumber;
			// }
			if (operationElements.length == 0) {
				operationElements.push(clickedDigit.textContent);
				operationElements[0] = parseInt(operationElements[0]);
				console.log(typeof(operationElements[0]));
				resultDisplay.textContent = operationElements[0];
				index++;
			}
			else if (index == 1 && typeof(operationElements[index-1]) === 'number')
			{
				console.log('aparentemente vamos adicionar um numero?');
				operationElements[index-1] += clickedDigit.textContent;
				console.log(operationElements[index-1]);
				operationElements[index-1] = parseInt(operationElements[index-1]);
				console.log(typeof(operationElements[index-1]));
				resultDisplay.textContent = operationElements[index-1];
				// firstNumber += clickedDigit.textContent;
				// resultDisplay.textContent = firstNumber;
			}
			else {
				if (isNaN(operationElements[index-1]))
				{
					console.log('Index: ', index);
					console.log('aparentemente temos um segundo termo');
					operationElements.push(clickedDigit.textContent);
					operationElements[index] = parseInt(operationElements[index]);
					console.log(operationElements[index]);
					console.log(typeof(operationElements[index-1]));
					resultDisplay.textContent += ' ' + operationElements[index];
					index++;
				}
				else {
					console.log('mas gente, add digito ao novo termo');
					operationElements[index-1] += clickedDigit.textContent;
					operationElements[index-1] = parseInt(operationElements[index-1]);
					console.log(operationElements[index-1]);
					resultDisplay.textContent = '';
					resultDisplay.textContent = operationElements.join(' ');

				}
				// if (secondNumber == null) {
				// 	secondNumber = clickedDigit.textContent;
				// 	resultDisplay.textContent += ' ' + secondNumber;	
				// }
				// else {
				// 	secondNumber += clickedDigit.textContent;	
				// 	console.log(secondNumber);
				// 	resultDisplay.textContent = firstNumber + ' ' + operationType + ' ' + secondNumber;
				// }	
			}
		// console.log(firstNumber);
		} else if (clickedDigit.classList.contains('operators')) {
			if (operationElements.length == 0)
				alert('Please, you need to pick a number before the operator!');		
			else {
				if (typeof(operationElements[index-1]) == 'string')
					alert('Error: you have already chosen an operator!');
				else {
					console.log('Opa', typeof(operationElements[index-1]));
					console.log('Index é de ', index);
					// hasOperator = 1;
					// operationType = clickedDigit.textContent;
					operationElements.push(clickedDigit.textContent);
					console.log('O indice é:',index, 'e a operacao é:', operationElements[index]);
					console.log(typeof(operationElements[index]));
					// console.log('Operation type: ' + operationType);
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
	second = operationElements[index_operator+1];
	const handleOperation = {
		"+": first + second, 
		"-": first - second,
		"/": first / second,
		"*": first * second,
		"%": first % second,
	};

	// console.log('Operação é: ', operationElements[index_operator]);
	
	// console.log('quantidade de elementos: ', operationElements.length);
	// while -> percorre todo o array
	while (index_operator < operationElements.length) { 
		if (index_operator > 1)
			first = result;
		result = handleOperation[operationElements[index_operator]];
		console.log('Resultado é: ' + result);
		index_operator += 2;
		resultDisplay.textContent = result;
	}
	
	// after the calculation, reset variables for operation
	firstNumber = null;
	secondNumber = null;
	operationType = null;
	isEqual = null;
	hasOperator = null;
}