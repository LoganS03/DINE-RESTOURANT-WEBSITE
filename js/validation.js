let { form } = document.forms
let inputs = Object.values(form)

let selectMonth = document.querySelector("#month")
let selectDay = document.querySelector("#day")
let selectYear = document.querySelector("#year")
let selectHour = document.querySelector("#hour")
let selectMinute = document.querySelector("#minute")

let error = document.querySelectorAll("form .error-text")
let errorEmail = document.querySelectorAll("form .error-email")
let label = document.querySelectorAll("label")

let inpStatus = []


function addOption(select, index){
	let i = 0
	if(select == selectMonth || select == selectDay || select == selectHour){
		i = 1
	}else if(select == selectYear){
		i = index
	}
	else{
		i = 0
	}
	while(i <= index){
		let option = document.createElement('option')

		if(i < 10){
			option.text = `0${i}`
		}else{
			option.text = i
		}
		
		option.value = i
		select.appendChild(option)
		i++
	}
}

let time = new Date()
let year = time.getFullYear()
addOption(selectMonth, 12)
addOption(selectDay, 31)
addOption(selectYear, year)
addOption(selectHour, 12)
addOption(selectMinute, 59)

function showError(index){
	if(index >= 2 && index <= 4){
		error[2].style.visibility = "visible"
		label[0].style.color = "#B54949"
	}else if(index >= 5 && index <= 7){
		error[3].style.visibility = "visible"
		label[1].style.color = "#B54949"
	}else{
		error[index].style.visibility = "visible"
	}
	inputs[index].classList.add("error")
}

function hideError(index){
	if(index >= 2 && index <= 4){
		if(inpStatus[2] == true && inpStatus[3] == true && inpStatus[4] == true){
			error[2].style.visibility = "hidden"
			label[0].style.color = "#111"
		}
	}else if(index >= 5 && index <= 7){
		if(inpStatus[5] == true && inpStatus[6] == true && inpStatus[7] == true){
			error[3].style.visibility = "hidden"
			label[1].style.color = "#111"
		}
	}else{
		error[index].style.visibility = "hidden"
	}
	inputs[index].classList.remove("error")
}

function inpEmailValidate(input, index){
	if(!input.value.includes("@") || (!input.value.includes("gmail.com") && !input.value.includes("email.com"))){
		showError(index)
		error[index].innerText = "Email is invalid"
		inpStatus[index] = false
	}else{
		hideError(index)
		error[index].innerText = "This field is required"
		inpStatus[index] = true
	}
}
function inpValidate(){
	inputs.forEach((input, index) => {
		if(input.type != "checkbox" && input.type != "submit"){
			inpStatus.push(false)
			if(input.name == "part"){
				inpStatus[index] = true
			}
			
			input.addEventListener('blur', (e) => {
				if(input.value === ''){
					showError(index)
					inpStatus[index] = false
				}else{
					inpStatus[index] = true
					hideError(index)
				}
				if(input.name === 'email'){
					inpEmailValidate(input, index)
				}
			})

			input.addEventListener("input", (e) => {
				if(input.name === 'email'){
					inpEmailValidate(input, index)
				}
			})

			input.addEventListener('change', () => {
				if(input.name == "month"){
					selectDay.innerHTML = "<option value='1' hidden>01</option>"
					if(input.value % 2 == 0){
						if(input.value == 2){
							if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
								addOption(selectDay, 29)
							}
							else{
								addOption(selectDay, 28)
							}
						}else{
							addOption(selectDay, 30)
						}
					}else{
						addOption(selectDay, 31)
					}
				}

				if(input.type = "select-one"){
					if(input.value === -1){
						showError(index)
						inpStatus[index] = false
					}else{
						inpStatus[index] = true
						hideError(index)
					}
				}
			})
		}
	});
}
function isEmpty(){
	inputs.forEach((input, index) => {
		if(input.type != "checkbox" && input.type != "submit" && input.type != "select-one"){
			if(input.value == ''){
				showError(index)
				inpStatus[index] == false
			}
			else{
				if(input.name === "email"){
					inpEmailValidate(input, index)
				}
				else{
					inpStatus[index] == true
					hideError(index)
				}
			}
		}
		else if(input.type == "select-one"){
			if(input.value == -1){
				showError(index)
				inpStatus[index] == false
			}
			else{
				inpStatus[index] == true
				hideError(index)
			}
		}
	})
}

let plus = document.querySelector(".people .plus")
let minus = document.querySelector(".people .minus")
let peoples = document.querySelector(".people p span")

minus.addEventListener('click', () => {
	if(+peoples.innerText > 1){
		peoples.innerText = +peoples.innerText - 1
	}else{
		peoples.innerText = 1
	}
})
plus.addEventListener('click', () => {
	peoples.innerText = +peoples.innerText + 1
})

form.addEventListener('submit', (e) => {
	e.preventDefault()
	let formData = new FormData(form)
	let values = {
		firstname: inputs[0].value,
		email: inputs[1].value,
		date: inputs[2].value + '-' + inputs[3].value + '-' + inputs[4].value + "T" + inputs[5].value + ":" + inputs[6].value + "Z " + inputs[7].value,
		peoples: peoples.innerText
	}

	if(!inpStatus.includes(false)){
		console.log(values)
	}else{
		isEmpty()
	}
})

inpValidate()