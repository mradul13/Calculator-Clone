class Calculator{
    constructor(preOperandTextEle, currOperandTextEle){
        this.preOperandTextEle = preOperandTextEle
        this.currOperandTextEle = currOperandTextEle
        this.allClear()
    }
    allClear(){
        this.preOperand = ''
        this.currOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number == '.' && currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''

        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0
            })
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currOperandTextEle.innerText = this.getDisplayNumber(this.currOperand)
        if(this.operation!=null){
            this.preOperandTextEle.innerText = `${this.getDisplayNumber(this.preOperand)} ${this.operation}`
        }
        else{
            this.preOperandTextEle.innerText = ''
        }
        
    }

    compute(){
        let computation
        const prev = parseFloat(this.preOperand)
        const curr = parseFloat(this.currOperand)
        if( isNaN(prev) || isNaN(curr)) return
        switch (this.operation){
            case '+':
                computation = prev+curr
                break
            case '-':
                computation = prev-curr
                break
            case '*':
                computation = prev*curr
                break
            case '/':
                computation = prev/curr
                break
            default:
                return
        }
        this.currOperand = computation
        this.operation = undefined
        this.preOperand  = ''
    }

    chooseOperation(operation){
        if(this.currOperand === '') return
        if(this.preOperand !==''){
            this.compute()
        }
        this.operation = operation
        this.preOperand = this.currOperand
        this.currOperand = ''
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const delButton = document.querySelector('[data-del]')
const equalButton = document.querySelector('[data-equals]')

const preOperandTextEle = document.querySelector('[data-previous-operand]')
const currOperandTextEle = document.querySelector('[data-current-operand]')


const calculator = new Calculator(preOperandTextEle, currOperandTextEle)

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', ()=>{
    calculator.allClear()
    calculator.updateDisplay()
})
delButton.addEventListener('click', ()=>{
    calculator.delete()
    calculator.updateDisplay()
})
