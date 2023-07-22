let { form } = document.forms
let inputs = Object.values(form)

let selectMonth = document.querySelector("#month")
let selectDay = document.querySelector("#day")
let selectHour = document.querySelector("#hour")
let selectMinute = document.querySelector("#minute")

let error = document.querySelectorAll("form .error")
let errorEmail = document.querySelectorAll("form .error-email")

let inpStatus = []

for(let i = 0; i <= 12; i++){
	let option = document.createElement('option')
	if(i < 10){
		option.text = `0${i}`
	}else{
		option.text = i
	}
	option.value = i
	selectMonth.appendChild(option)
}
for(let i = 0; i <= 30; i++){
	let option = document.createElement('option')
	if(i < 10){
		option.text = `0${i}`
	}else{
		option.text = i
	}
	option.value = i
	selectDay.appendChild(option)
}
for(let i = 0; i <= 23;i++){
	let option = document.createElement('option')
	if(i < 10){
		option.text = `0${i}`
	}else{
		option.text = i
	}
	option.value = i
	selectHour.appendChild(option)
}
for(let i = 0; i <= 59;i++){
	let option = document.createElement('option')
	if(i < 10){
		option.text = `0${i}`
	}else{
		option.text = i
	}
	option.value = i
	selectMinute.appendChild(option)
}

function showError(index){
	error[index].style.visibility = "visible"
}

function hideError(index){
	error[index].style.visibility = "hidden"
}

function inpValidate(){
	inputs.forEach((input, index) => {
		if(input.type != "checkbox" && input.type != "submit"){
			inpStatus.push(false)
			
			input.addEventListener('blur', (e) => {
				if(input.value === ''){
					if(index >= 2 && index <= 5){
						showError(2)
					}else if(index >= 2 && index <= 5){
						showError(3)
					}else{
						showError(index)
					}
					inpStatus[index] = false
				}else{
					if(index >= 2 && index <= 4){
						hideError(2)
					}else if(index >= 5 && index <= 7){
						hideError(3)
					}
					else{
						hideError(index)
					}
					inpStatus[index] = true
				}
			})

			input.addEventListener("input", (e) => {
				if(input.name === 'email'){
					if(!input.value.includes("@")){
						showError(index)
						error[index].innerText = "Email should include @"
						inpStatus[index] = false
					}else{
						hideError(index)
						error[index].innerText = "This field is required"
						inpStatus[index] = true
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
				if(index >= 2 && index <= 4){
					showError(2)
				}else if(index >= 5 && index <= 7){
					showError(3)
				}
				else{
					showError(index)
				}
				inpStatus[index] == false
			}
			else{
				if(index >= 2 && index <= 4){
					hideError(2)
				}else if(index >= 5 && index <= 7){
					hideError(3)
				}
				else{
					hideError(index)
				}
				inpStatus[index] == true
			}
		}
		else if(input.type == "select-one"){
			if(input.value == 0){
				if(index >= 2 && index <= 4){
					showError(2)
				}else if(index >= 5 && index <= 7){
					showError(3)
				}
				else{
					showError(index)
				}
				inpStatus[index] == false
			}
			else{
				if(index >= 2 && index <= 4){
					hideError(2)
				}else if(index >= 5 && index <= 7){
					hideError(3)
				}
				else{
					hideError(index)
				}
				inpStatus[index] == true
			}
		}
	})
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
	let formData = new FormData(form)
	let values = Object.fromEntries(formData.entries())

	// console.log(inpStatus);
	if(!inpStatus.includes(false)){
		console.log(values)
	}else{
		isEmpty()
	}
})

inpValidate()