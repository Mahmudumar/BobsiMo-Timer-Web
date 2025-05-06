function startTimer(activity, duration) {
    // here, we are just going to drive the timer 
    // from whatever start position all the way to 
    // zero.
    let duration_ = duration.split(":")

    let hour = parseInt(duration_[0])
    let min = parseInt(duration_[1])
    let sec = parseInt(duration_[2])
    let sec_ = sec
    for (let i = 1; i<=20; i++) {
        let date1 = new Date
        console.log(date1.setSeconds(s));
    }

}

// translate.
function translateDurationToWords(duration) {
    // change the duration which is in format
    // 00:10:00 into the format: 10 minutes

}