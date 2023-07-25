let deadline = '2023-08-25T05:27:00'
let now = new Date()

function getTimerData(dl){
	let t = Date.parse(new Date(dl)) - Date.parse(new Date()),
			days = Math.floor(t / ( 1000 * 60 * 60 * 24 )),
			hours = Math.floor((t / 1000 / 60 / 60) % 24),
			minutes = Math.floor((t / 1000 / 60 ) % 60),
			seconds = Math.floor((t / 1000) % 60)

	if(t < 0){
		t = 0
		days = 0
		hours = 0
		minutes = 0
		seconds = 0
	}

	return {
		t, days, hours, minutes, seconds
	}
}

function startTimer(dl){
	let daysEl = document.querySelector('.days .value'),
		hoursEl = document.querySelector('.hours .value'),
		minutesEl = document.querySelector('.minutes .value'),
		secondsEl = document.querySelector('.seconds .value')
		
	let daysDiv = document.querySelector(".days"),
		hoursDiv = document.querySelector(".hours"),
		minutesDiv = document.querySelector(".minutes"),
		secondsDiv = document.querySelector(".seconds")

	let timerId = setInterval(updateTimer, 1000)
	
	function updateTimer(){
		let timer = getTimerData(dl)

		daysEl.innerText = addZero(timer.days)
		hoursEl.innerText = addZero(timer.hours)
		minutesEl.innerText = addZero(timer.minutes)
		secondsEl.innerText = addZero(timer.seconds)

		if(timer.t < 0){
			clearInterval(timerId)
		}

		if(timer.days == 0){
			daysDiv.style.display = 'none'
			if(timer.hours == 0){
				hoursDiv.style.display = 'none'
				if(timer.minutes == 0){
					minutesDiv.style.display = 'none'
					if(timer.seconds){
						secondsDiv.style.display = 'none'
					}
				}
			}
		}
	}
	
	updateTimer()
}

function addZero(num){
	if(num >= 0 && num < 10){
		return `0${num}`
	}else{
		return num
	}
}

startTimer(deadline)