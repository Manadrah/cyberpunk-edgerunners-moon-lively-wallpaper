const maxVolume = 1.0;
var caption = "俺が君を月に、<br>連れて行くよ！<br>約束する！";
var monthsStr = "January,February,March,April,May,June,July,August,September,October,November,December";
var hourFormat = 0;
var dateFormat = 0;
var textDirection = 0;

// Lively Properties Listener
const bgAudio = document.getElementById('bg-audio');

function livelyPropertyListener(name, val) {
    if (name === "bgVolume") {
        bgAudio.volume = val / 100;
    }
    if (name === "bgMusic") {
        if (val) {
            bgAudio.src = val;
            bgAudio.play().catch(e => console.log(e));
        }
    }
    if (name === "clockPosX") {
        $('.inner').css('left', val + '%');
    }
    if (name === "clockPosY") {
        $('.inner').css('bottom', val + '%');
    }
    if (name === "captionPosX") {
        $('.inner-2').css('right', val + '%');
    }
    if (name === "captionPosY") {
        $('.inner-2').css('bottom', val + '%');
    }
    if (name === "caption") {
        caption = val;
    }
    if (name === "months") {
        monthsStr = val;
    }
    if (name === "hourFormat") {
        hourFormat = val;
    }
    if (name === "dateFormat") {
        dateFormat = val;
    }
    if (name === "textDirection") {
        textDirection = val;
        if (textDirection === 0) {
            $('.inner-2').css('writing-mode', 'vertical-lr');
        } else {
            $('.inner-2').css('writing-mode', 'horizontal-tb');
        }
    }
}

// The Content
function main() {
    var dt = new Date();

    var monthArr = monthsStr.split(',');
    if (monthArr.length < 12) {
        monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    var currentMonth = monthArr[dt.getMonth()] || monthArr[0];

    var hoursNum = dt.getHours();
    var hours = hoursNum.toString();
    var meridiem = hoursNum < 12 ? "AM" : "PM";

    if (hourFormat === 0) {
        hours = (hoursNum % 12 || 12).toString();
    } else {
        meridiem = ""; // Hide AM/PM for 24h
    }

    var minutes = dt.getMinutes().toString().padStart(2, '0');

    var currentTime = `${hours}:${minutes}`;
    var currentDate = "";

    if (dateFormat === 0) {
        currentDate = `${currentMonth} ${dt.getDate()}, ${dt.getFullYear()}`;
    } else if (dateFormat === 1) {
        currentDate = `${dt.getDate()} ${currentMonth} ${dt.getFullYear()}`;
    } else if (dateFormat === 2) {
        currentDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`;
    }

    $('.time').html(currentTime);
    $('.meridiem').html(meridiem);
    $('.date').html(currentDate);
    $('.caption').html(caption);

    // Glitch Animation
    $('.time').attr('data-text', currentTime);
    $('.meridiem').attr('data-text', meridiem);
    $('.date').attr('data-text', currentDate);
    $('.caption').attr('data-text', caption);
}

main();
setInterval(main, 1000);