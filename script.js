let actions_area = document.querySelector('#timer-area .actions')

let bigMsg = document.querySelector(".big-msg h1")
let start_bt = document.querySelector('#start-timer')


let activities_area = document.getElementById("activities-area")
let cancel_activity_making_bt = document.querySelector('#cancel-bt')
let make_activity_bt = document.querySelector('#add-bt')

let activity_title_input = document.querySelector("input#todo")
let activity_duration_input = document.querySelector("input#duration")
let activity_durtype_input = document.querySelector("select#dur-type")

let intervald;
let duration_start;
// let buttons = document.getElementsByClassName("button")
function changeDurationToString(duration, durtype) {
    // change the duration which is in format
    // 00:10:00 into the format: 10 minutes
    return `${duration} ${durtype}`
}

function convertDurationToSeconds(duration) {

}

function pauseTimer(activity, duration, durtype) {
    console.log('pausing..., duration:', duration_start);

    let pause_bt = document.querySelector('#pause-timer')
    if (pause_bt.innerText == 'Pause') {
        stopTimer()
        pause_bt.textContent = 'Resume'
        changeBigMsg("PAUSE", activity,duration_start,durtype)

    } else if (pause_bt.innerText == 'Resume') {
        pause_bt.textContent = 'Pause'
        startTimer(activity, duration_start, durtype)
    }
}

function startTimer(activity, duration, durtype) {
    clearInterval(intervald)
    duration_start = duration;
    let one_second = 1000
    let one_minute = 60 * one_second
    let one_hour = 60 * one_minute

    if (durtype.toLowerCase() === 'seconds') {
        changeBigMsg("TIME-CHANGE", activity, duration_start, durtype)
        intervald = setInterval(() => {
            duration_start--
            console.log(duration_start, durtype);
            changeBigMsg("TIME-CHANGE", activity, duration_start, durtype)
            if (duration_start <= 0) {
                finishedActivity()
            }
        }, one_second)



    }
    else if (durtype.toLowerCase() === 'minutes') {
        changeBigMsg("TIME-CHANGE", activity, duration_start, durtype)
        intervald = setInterval(() => {
            duration_start--
            console.log(duration_start, durtype);
            changeBigMsg("TIME-CHANGE", activity, duration_start, durtype)

            if (duration_start <= 0) {
                finishedActivity()
            }
        }, one_minute)
    }
    else if (durtype.toLowerCase() === 'hours') {
        changeBigMsg("TIME-CHANGE", activity, duration_start, durtype)
        intervald = setInterval(() => {
            duration_start--
            console.log(duration_start, durtype);
            changeBigMsg("TIME-CHANGE", activity, duration_start, durtype)

            if (duration_start <= 0) {
                finishedActivity()
            }
        }, one_hour)
    }
}

function start_timer(activity, duration, durtype) {
    create2Bts(activity, duration, durtype)


    // make the secondary text disappear
    eraseSubText()

    // timer starts here
    startTimer(activity, duration, durtype)
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
    let duration = activity_duration_input.value
    let durtype = activity_durtype_input.value

    exitActivityMaking()
    start_timer(activity, duration, durtype)
}

function create2Bts(activity, duration, durtype) {
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
        pauseTimer(activity, duration, durtype)
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

function changeBigMsg(type = "DEFAULT",
    activity = 'do something',
    duration = 5,
    durtype = 'Minutes') {
    // type is just template names of how the message will
    // be displayed
    let my_green = "#1da431"
    let my_red = "#f55"
    let my_blue = "#55adff"

    if (type == "FINISHED") {
        const finish_msg = `Congratulations on finishing your activity :D`
        bigMsg.textContent = `${finish_msg}`
        bigMsg.style.color = my_blue

    } else if (type == "TIME-CHANGE" && duration && durtype) {
        const time_msg = `You have ${duration} ${durtype} to ${activity.toLowerCase()}`
        bigMsg.textContent = `${time_msg}`
        bigMsg.style.color = my_green

    } else if (type === "PAUSE") {
        const pause_msg = `You are on a break now. ${duration} ${durtype} remaining.`
        bigMsg.textContent = `${pause_msg}`
        bigMsg.style.color = my_red
    }
    else if (type == "DEFAULT") {
        const default_msg = "What are you working on? :)"
        bigMsg.textContent = `${default_msg}`
        bigMsg.style.color = my_green
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