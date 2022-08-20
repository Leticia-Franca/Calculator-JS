// We store each element in a variable
const digits = document.querySelectorAll('.digits');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');

console.log(numbers[0].textContent);
console.log(numbers[1].textContent);

// Abaixo: teste pra verificar se o digito é operador ou não (pode ser feito o mesmo com .numbers)
console.log("Operator: ", operators[0].textContent);
if (digits[10].classList.contains('operators'))
	console.log("opa, eh operador hein", digits[10].textContent);
else
	console.log("nao eh operador!");

// We need each digit to listen to the 'click' event
digits.forEach(digit => {
	digit.addEventListener('click', (e) => {
		let clickedDigit = e.target;
		console.log(clickedDigit.textContent);
		/*
		 * avaliar se o digito é numérico ou um operador
		 * o que precisa ser verificado:
		 * se for um digito:
		 *  - é o primeiro digito ou o segundo?
		 *  - se for o segundo, foi precedido por um operador? se não, precisa ser
		 * se for um operador:
		 *  - foi precedido de digito? se não, precisa ser
		*/
		
	})
})