let currentNumber = '0';
let previousNumber = '';
let operation = '';
let shouldResetDisplay = false;

const currentDisplay = document.getElementById('currentDisplay');
const previousDisplay = document.getElementById('previousDisplay');

function updateDisplay() {
    currentDisplay.textContent = formatNumber(currentNumber);
    
    if (operation && previousNumber) {
        previousDisplay.textContent = `${formatNumber(previousNumber)} ${operation}`;
    } else {
        previousDisplay.textContent = '';
    }
}

function formatNumber(number) {
    if (number === '') return '0';
    
    const parts = number.toString().split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    const formattedInteger = parseFloat(integerPart).toLocaleString('en');
    
    if (decimalPart != null) {
        return `${formattedInteger}.${decimalPart}`;
    } else {
        return formattedInteger;
    }
}

function addNumber(number) {
    if (shouldResetDisplay) {
        currentNumber = '';
        shouldResetDisplay = false;
    }
    
    if (number === '.' && currentNumber.includes('.')) {
        return;
    }
    
    if (currentNumber === '0' && number !== '.') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    
    updateDisplay();
}

function chooseOperator(selectedOperation) {
    if (currentNumber === '') return;
    
    if (previousNumber !== '' && !shouldResetDisplay) {
        calculateResult();
    }
    
    operation = selectedOperation;
    previousNumber = currentNumber;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateResult() {
    if (operation === '' || previousNumber === '' || shouldResetDisplay) {
        return;
    }
    
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let result;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Oops! Cannot divide by zero 😅');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentNumber = roundResult(result).toString();
    operation = '';
    previousNumber = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function roundResult(number) {
    return Math.round((number + Number.EPSILON) * 100000000) / 100000000;
}

function clearCalculator() {
    currentNumber = '0';
    previousNumber = '';
    operation = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteNumber() {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = '0';
    }
    updateDisplay();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        addNumber(key);
    } else if (key === '+') {
        chooseOperator('+');
    } else if (key === '-') {
        chooseOperator('−');
    } else if (key === '*') {
        chooseOperator('×');
    } else if (key === '/') {
        event.preventDefault();
        chooseOperator('÷');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearCalculator();
    } else if (key === 'Backspace') {
        deleteNumber();
    }
});

updateDisplay();
