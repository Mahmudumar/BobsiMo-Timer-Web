const timer_area = document.querySelector("#timer-area")
const actions_area = document.querySelector('#timer-area .actions')


const bigMsg = document.querySelector(".big-msg h1")
let start_bt = document.querySelector('#start-timer')

const activities_area = document.getElementById("activities-area")
const cancel_activity_making_bt = document.querySelector('#cancel-bt')
const make_activity_bt = document.querySelector('#add-bt')

const small_countdown = document.querySelector(".small-countdown h1")

const activity_title_input = document.querySelector("#todo")
const hour_input = document.querySelector("#hour-part")
const min_input = document.querySelector("#min-part")
const sec_input = document.querySelector("#second-part")
// const make_activity_bt = document.querySelector('#add-bt')

function getStartTime() {
    let hour = hour_input.value.padStart(2, "0")
    let min = min_input.value.padStart(2, "0")
    let sec = sec_input.value.padStart(2, "0")

    let start_time = `${hour}:${min}:${sec}`

    console.log(start_time);

    return start_time

}

let intervald;
let timer;
// let buttons = document.getElementsByClassName("button")



function pauseTimer(activity, duration) {
    console.log('pausing..., duration:', timer);

    let pause_bt = document.querySelector('#pause-timer')

    if (pause_bt.innerText == 'Pause') {
        stopTimer()
        pause_bt.textContent = 'Resume'


        let duration_ = timer.split(":")
        let hour = parseInt(duration_[0])
        let min = parseInt(duration_[1])
        let sec = parseInt(duration_[2])

        if (hour >= 1) {
            changeBigMsg("PAUSE", activity, hour, "hours")
        }
        else if (hour == 0 && min > 1) {
            changeBigMsg("PAUSE", activity, min, "minutes")
        }
        else if (hour == 0 && min == 0 && sec >= 1) {
            changeBigMsg("PAUSE", activity, sec, "seconds")
        }

    } else if (pause_bt.innerText == 'Resume') {
        pause_bt.textContent = 'Pause'
        startTimer(activity, timer)
    }
}

function start_timer(activity, duration) {
    create2Bts(activity, duration)


    // make the secondary text disappear
    eraseSubText()

    // timer starts here
    startTimer(activity, duration)
}

function eraseSubText() {
    let sub_text = document.querySelector('.sub-text')
    sub_text.style.display = 'none'
}

function showActivitiesArea() {
    // If start button is pressed just popup the todo maker
    activities_area.style = 'display:flex;'
}

function exitActivityMaking() {
    activities_area.style = 'display:none;'
}

function makeActivity() {
    // get the name and the duration
    // change the bigMsg text to 
    // You have 10mins to do homework
    // // get activity entry value
    let activity = activity_title_input.value
    let duration = getStartTime()


    exitActivityMaking()

    start_timer(activity, duration)
}

function create2Bts(activity, duration) {
    // change the start button to_what
    // this happens when the finish Activity button
    // is clicked
    actions_area.innerHTML = `
    <div class="button" id="pause-timer">
    Pause</div>

    <div class="button" id="finish-activity">
    Finish Activity</div>
    `
    // give each of them 'click' Eventlisteners
    let pause_bt = document.querySelector('#pause-timer')
    let finish_bt = document.querySelector("#finish-activity")

    pause_bt.addEventListener('click', () => {
        pauseTimer(activity, duration)
    })

    finish_bt.addEventListener('click', finishedActivity)
}

function createResetBt() {
    actions_area.innerHTML = `
        <div class="button" id="restart-timer">Start new activity</div>
    `
    let restart_bt = document.querySelector('#restart-timer')
    restart_bt.addEventListener('click', () => {
        showActivitiesArea()
    })
}

function stopTimer() {
    // stop timer
    clearInterval(intervald)
}

function finishedActivity() {
    // change the big message to Congrats
    stopTimer()
    changeBigMsg("FINISHED")
    // reset the button to startbt
    createResetBt()

}

let my_green = "#1da431"
let my_red = "#f55"
let my_blue = "#55adff"


function changeBigMsg(type = "DEFAULT",
    activity = 'do something',
    duration = 5,
    durtype = 'Minutes') {
    // type is just template names of how the message will
    // be displayed



    if (type == "FINISHED") {
        const finish_msg = `Congratulations on finishing your activity :D`
        bigMsg.textContent = `${finish_msg}`
        bigMsg.classList = ""
        bigMsg.classList.add(type)

        // also change the countdown color
        small_countdown.classList = ""
        small_countdown.classList.add(type)

    } else if (type == "TIME-CHANGE" && duration && durtype) {
        const time_msg = `You have ${duration} ${durtype} to ${activity.toLowerCase()}`
        bigMsg.textContent = `${time_msg}`
        bigMsg.classList = ""

        // also change the countdown color
        small_countdown.classList = ""
        // small_countdown.classList.add(type)

    } else if (type === "PAUSE" && duration && durtype) {
        const pause_msg = `You are on a break now. ${duration} ${durtype} remaining.`
        bigMsg.textContent = `${pause_msg}`
        bigMsg.classList = ""
        bigMsg.classList.add(type)

        // also change the countdown color
        small_countdown.classList = ""
        small_countdown.classList.add(type)

    }
    else if (type == "DEFAULT") {
        const default_msg = "What are you working on? :)"
        bigMsg.textContent = `${default_msg}`
        bigMsg.classList = ""
        bigMsg.classList.add(type)
        // also change the countdown color
        small_countdown.classList = ""
        small_countdown.classList.add(type)
    }
}



start_bt.addEventListener('click', () => {
    showActivitiesArea()
})

cancel_activity_making_bt.addEventListener('click', () => {
    exitActivityMaking()
})

make_activity_bt.addEventListener('click', () => {
    makeActivity()
})