// We store each element in a variable
const digits = document.querySelectorAll('.digits');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
let firstNumber = null;
let secondNumber = null;
let hasOperator = null;
let	operationType = null;

// console.log(numbers[0].textContent);
// console.log(numbers[1].textContent);

// Abaixo: teste pra verificar se o digito é operador ou não (pode ser feito o mesmo com .numbers)
// console.log("Operator: ", operators[0].textContent);
// if (digits[10].classList.contains('operators'))
// 	console.log("opa, eh operador hein", digits[10].textContent);
// else
// 	console.log("nao eh operador!");

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
			if (firstNumber == null)
				firstNumber = clickedDigit.textContent;
			else {
				if (hasOperator == 1)
					secondNumber = clickedDigit.textContent;
				else
					alert('Please, choose an operator before clicking a second number!');
			}
		// console.log(firstNumber);
		} else {
			if (firstNumber == null)
				alert('Please, you need to pick a number before the operator!');		
			else {
				if (hasOperator == 1)
					alert('Error: you have already chosen an operator!');
				else {
					hasOperator = 1;
					operationType = clickedDigit.textContent;
					console.log('Operation type: ' + operationType);
				}	
			}
		}
	})
})