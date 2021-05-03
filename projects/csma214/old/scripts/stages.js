current_stage = 0

// Hide all except for 1st stage

updateStage(true);

$("#slide-next-btn").click(() => {
    current_stage ++;
    updateStage();
})

$("#slide-back-btn").click(() => {
    current_stage --;
    updateStage();
})

// Format 1's and 0's
$('.truth > * > tr > td').each((idx,elem) => {
    if (elem.innerText == '0') {
        $(elem).addClass("zero");
    } else if (elem.innerText == '1') {
        $(elem).addClass("one");
    }
});

function gotoSlide(num) {
    current_stage = num;
    updateStage();
}


function updateStage(noAnim=false) {
    if ($('div[type="slideshow"]').length == 0) {
        console.log("No slides.");
        return;
    }    

    if (current_stage < 0) {
        window.location.href = "index.html";
    } else if ($('div[type="slideshow"]').length <= current_stage) {
        window.location.href = "index.html";
    }

    $('div[type="slideshow"]').each((idx,elem) => {
        if (idx != current_stage) {
            $(elem).hide((!noAnim) ? "slow" : null);
        } else {
            $(elem).show((!noAnim) ? "slow" : null);
        }
    });
}