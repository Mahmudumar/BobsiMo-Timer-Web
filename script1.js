function startTimer(activity, duration) {
    // here, we are just going to drive the timer 
    // from whatever start position all the way to 
    // zero.
    let duration_ = duration.split(":")

    let start_hour = parseInt(duration_[0])
    let start_min = parseInt(duration_[1])
    let start_sec = parseInt(duration_[2])

    // moving clock
    let hour = start_hour
    let min = start_min
    let sec = start_sec
    timer = displayTime(hour, min, sec)
    // display on big banner
    translateDurationToWords(activity, timer)

    intervald = setInterval(() => {
        sec -= 1
        let date1 = new Date


        if (hour == 0 && min == 0 && sec == 0) {
            finishedActivity()
        }

        date1.setHours(hour)
        date1.setMinutes(min)
        date1.setSeconds(sec)

        hour = date1.getHours()
        min = date1.getMinutes()
        sec = date1.getSeconds()
        timer = displayTime(hour, min, sec)


        // display on big banner
        translateDurationToWords(activity, timer)
    }, 1000)


}

function displayTime(hour, min, sec) {
    hour = String(hour).padStart(2, "0")
    min = String(min).padStart(2, "0")
    sec = String(sec).padStart(2, "0")

    let displayable_time = `${hour}:${min}:${sec}`

    small_countdown.textContent = displayable_time
    return displayable_time
}

// translate.
function translateDurationToWords(activity, duration) {
    // change the duration which is in format
    // 00:10:00 into the format: 10 minutes
    let duration_ = duration.split(":")

    let hour = parseInt(duration_[0])
    let min = parseInt(duration_[1])
    let sec = parseInt(duration_[2])

    if (hour >= 1) {
        changeBigMsg("TIME-CHANGE", activity, hour, "hours")
    }
    else if (hour == 0 && min > 1) {
        changeBigMsg("TIME-CHANGE", activity, min, "minutes")
    }
    else if (hour == 0 && min == 0 && sec >= 1) {
        changeBigMsg("TIME-CHANGE", activity, sec, "seconds")
    }
}




// THis is the section of visual 
// animations and stuff :p
// trigger a toggle

function switchOrder() {

    // switch order of elements
    let second = small_countdown.parentElement
    let first = bigMsg.parentElement
    timer_area.insertBefore(second, first)


    small_countdown.parentElement.classList.toggle('small-countdown')
    small_countdown.parentElement.classList.toggle('big-countdown')

    bigMsg.parentElement.classList.toggle("big-msg")
    bigMsg.parentElement.classList.toggle("small-msg")
    
    
    small_countdown.removeEventListener('click', switchOrder)
    
    // make the small msg clickable
    let small_msg = document.querySelector(".small-msg h1")
    small_msg.addEventListener("click", resetOrder)
    
}
function resetOrder() {
    let second = small_countdown.parentElement
    let first = bigMsg.parentElement
    timer_area.insertBefore(first, second)
    
    small_countdown.parentElement.classList.toggle('big-countdown')
    small_countdown.parentElement.classList.toggle('small-countdown')
    
    bigMsg.parentElement.classList.toggle("small-msg")
    bigMsg.parentElement.classList.toggle("big-msg")
    
    small_countdown.addEventListener('click', switchOrder)
}


small_countdown.addEventListener('click', switchOrder)