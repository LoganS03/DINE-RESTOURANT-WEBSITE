let sliderBtn = document.querySelectorAll(".slider-part svg")
let slider = document.querySelector(".slides-inner")
let sliderIndex = 0

sliderBtn[0].addEventListener("click", () => {
    if(sliderIndex <= 0){
        sliderIndex = 2
    }else{
        sliderIndex--
    }

    slider.style.transform = `translateX(-${sliderIndex * 100}%)`
})

sliderBtn[1].addEventListener("click", () => {
    if(sliderIndex >= 2){
        sliderIndex = 0
    }else{
        sliderIndex++
    }

    slider.style.transform = `translateX(-${sliderIndex * 100}%)`
})

let tabChange = document.querySelectorAll(".tab-change p")
let tabImg = document.querySelectorAll(".tab-img img")
let tabContent = document.querySelectorAll(".tab .content-text")

function show(value, index){
    value.forEach(slide => {
        slide.classList.remove("active")
    })

    if(value == tabImg){
        value[index].classList.add("active")
        value[index + tabImg.length / 3].classList.add("active")
        value[index + tabImg.length / 3 * 2].classList.add("active")
    }else{
        value[index].classList.add("active")
    }
}

tabChange.forEach((value, index) => {
    value.addEventListener("click", () => {
        show(tabChange, index)
        show(tabImg, index)
        show(tabContent, index)
    })
})