
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    this.updateDisplay()
  }

  clear() {
    this.currentOperand = '0'
    this.previousOperand = '0'
    this.operation = undefined
  }
  
  delete() {
    this.currentOperand = this.currentOperand.slice(0,-1)
    if(this.currentOperand === ''){
      this.currentOperand = '0'
    }
  }
  
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
    console.log(this.currentOperand)
  }
  
  chooseOperation(operation) {
    if (this.currentOperand === '0') return
    if (this.previousOperand !== '0') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = '0'
                                
  }
  
  compute() {
    var computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    console.log(prev)
    console.log(current)
    if ((prev === 0) && (current === 0)) return

    var output = document.querySelector('.output');
    var clone = output.cloneNode(true);
    clone.className = "record";
    clone.firstElementChild.className = "expression";
    clone.firstElementChild.innerText = `${prev.toString()} ${this.operation} ${current.toString()} =`;

    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }

    clone.lastElementChild.className = "result";
    clone.lastElementChild.innerText = computation.toString();
    historyBody.appendChild(clone);
    this.currentOperand = computation
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }

    if(this.previousOperand === '0') {
      this.previousOperandTextElement.innerText = ''
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  clearAllHistory() {
    historyBody.innerHTML = ""
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-prev-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const historyBody = document.querySelector('[data-history]')
const clearHistoryButton = document.querySelector('[data-clear-history]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})


deleteButton.addEventListener('click', button => {
  console.log('active!')
  calculator.delete();
  calculator.updateDisplay();
  
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

clearHistoryButton.addEventListener('click', () => {
  calculator.clearAllHistory();
})