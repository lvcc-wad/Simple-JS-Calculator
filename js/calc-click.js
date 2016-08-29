// Declare variables for numerical keys, operators, etc.
var keys = document.querySelectorAll('#calculator span'),
	operators = ['+', '-', '*', '/'],
	hasDecimal = false;

// Add an evenlistener when keys are clicked, then call calculate().
for (var i = 0; i < keys.length; i++)
	keys[i].addEventListener("click", calculate, false);

// Get the result and append key inputs.
function calculate(e) {	
	var result = document.querySelector('#result'),
		input = result.innerHTML,
		key = this.innerHTML;
	// If clear key is pressed, empty the result.
	if (key == 'C') { 
		result.innerHTML = '';
		hasDecimal = false;
	}		
	// If equals key is pressed, calculate and show the result.
	else if (key == '=') {
		var equation = input,
			lastChar = equation[equation.length - 1];			
		// Remove if the last character of the equation is an operator or a decimal.
		// Note: '.'' matches any character,  $ denotes end of string
		// So if true, empty string will replace the last character
		if (operators.indexOf(lastChar) > -1 || lastChar == '.')
			equation = equation.replace(/.$/, '');
		// Use eval() function to evaluate the equation and show the result.	
		if (equation)
			result.innerHTML = eval(equation);
		hasDecimal = false;	
	}
	// The indexOf() method returns the index within the calling object of the first occurrence of the specified value, 
	// starting the search at fromIndex. Returns -1 if the value is not found
	else if (operators.indexOf(key) > -1) {
		// If operator is clicked, get the last character from the equation
		var lastChar = input[input.length - 1];
		// Issue: More than 2 operators can be added consecutively
		// Fix: Allow only if result is not empty and has no operator after
		if (input != '' && operators.indexOf(lastChar) == -1)
	    	result.innerHTML += key;
	    // Issue: Equation can start from any operators. Should only allow minus
	    // Fix: Allow minus operator if the string is empty for negative numbers
	    if (input == '' && key == '-')
	    	result.innerHTML += key;
	    // Replace previous operator (if exists) with new operator
	    // Note: '.'' matches any character,  $ denotes end of string
	    // So, the new operator will replace any character at the end of string
	    if (operators.indexOf(lastChar) > -1 && input.length > 1)
	    	result.innerHTML = input.replace(/.$/, key);
	    hasDecimal = false;
	}
	// Issue: More decimals can be added in a number
	// Fix: Limit 1 decimal in a number using a flag 'hasDecimal'
	// Flag will reset when an operator, equal or clear key is pressed.
	else if (key == '.') {
		if (!hasDecimal) {
			result.innerHTML += key;
			hasDecimal = true;
		}
	}
	// Issue: Multiple zeros as initial input.
	// Fix: Limit 1 zero as first input
	else if (input == '' && key == '0')
		result.innerHTML == '';
	// if any other key is pressed, just append it
	else
		result.innerHTML += key;
	// prevent page jumps
	e.preventDefault(); 
}