const billInput = document.querySelector('#bill')
const peopleInput = document.querySelector('#people-number')
const btns = document.querySelectorAll('.btn')
const tipAmount = document.querySelector('.tip-amount span')
const totalAmount = document.querySelector('.total-amount span')
const resetBtn = document.querySelector('.reset-btn')
const customTip = document.querySelector('.tip-btns input')
const errorMsg = document.querySelector('.error-msg')

let billAmount = 0.0
let tipValue = 0.15
let peopleAmount = 0
const invalidChars = ['.', ',']

const activeHandler = e => {
	btns.forEach(btn => btn.classList.remove('selected'))
	e.target.classList.add('selected')
}

const tipHandler = e => {
	if (customTip.classList.contains('selected') && customTip.value !== '') {
		tipValue = customTip.value / 100
	} else {
		tipValue = e.target.getAttribute('data-value')
	}
}
const billHandler = () => {
	billAmount = billInput.value
}

const peopleHandler = e => {
	peopleAmount = parseInt(peopleInput.value)
}

const calculateTip = () => {
	if (billInput.value !== '' && peopleInput.value !== '') {
		let tipPerPerson
		let totalPerPerson

		tipPerPerson = (parseFloat(billAmount) * parseFloat(tipValue)) / parseFloat(peopleAmount)
		totalPerPerson = (parseFloat(billAmount) * parseFloat(tipValue) + parseFloat(billAmount)) / parseFloat(peopleAmount)
		tipAmount.textContent = tipPerPerson.toFixed(2)
		totalAmount.textContent = totalPerPerson.toFixed(2)

		customTip.style.border = '1px solid black'
		customTip.style.backgroundColor = 'hsl(189, 41%, 97%)'
		errorMsg.style.display = 'none'
	}
	if (customTip.value === '' && customTip.classList.contains('selected')) {
		customTip.placeholder = `empty`
		customTip.style.border = '1px solid tomato'
		customTip.style.backgroundColor = 'tomato'
		tipAmount.textContent = 'error'
		totalAmount.textContent = 'error'
	}
	if (peopleInput.value === '') {
		errorMsg.style.display = 'block'
		errorMsg.style.color = 'tomato'
	}
}

const customMax = e => {
	if (customTip.value.length > 2) {
		customTip.value = 99
	} else if (customTip.value < 0) {
		customTip.value = 0
	}
}

resetBtn.addEventListener('click', calculateTip)

btns.forEach(btn => btn.addEventListener('click', activeHandler))
btns.forEach(btn => btn.addEventListener('click', tipHandler))
billInput.addEventListener('input', billHandler)
peopleInput.addEventListener('input', peopleHandler)
customTip.addEventListener('input', customMax)
