let sliderBtn = document.querySelectorAll(".slider-part svg")
let slider = document.querySelectorAll(".slider")
let sliderIndex = 0

function show(value, index){
    hide(value)
    value[index].classList.add("active")
}
function hide(value){
    value.forEach(slide => {
        slide.classList.remove("active")
    })
}

sliderBtn[0].addEventListener("click", () => {
    if(sliderIndex <= 0){
        sliderIndex = 2
    }else{
        sliderIndex--
    }

    show(slider, sliderIndex)
})

sliderBtn[1].addEventListener("click", () => {
    if(sliderIndex >= 2){
        sliderIndex = 0
    }else{
        sliderIndex++
    }

    show(slider, sliderIndex)
})

let tabChange = document.querySelectorAll(".tab-change p")
let tabImg = document.querySelectorAll(".tab-img img")
let tabContent = document.querySelectorAll(".tab .content-text")

tabChange.forEach((value, index) => {
    value.addEventListener("click", () => {
        show(tabChange, index)
        show(tabImg, index)
        show(tabContent, index)
    })
})