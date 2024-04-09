window.onload = function() {
    autoPlayAudio();
    window.addEventListener('popstate', function(event) {
        if (audio1.paused || !audio1.autoplay) {
            showPlayOverlay();
        } else {
            closeOverlay();
        }
    });
    window.addEventListener('pageshow', function(event) {
        if (audio1.paused || !audio1.autoplay) {
            showPlayOverlay();
        } else {
            closeOverlay();
        }
    });
};

audio1.addEventListener("ended", function() {
    audio2.play();
});

audio2.addEventListener("ended", function() {
    audio3.play();
});

audio3.addEventListener("ended", function() {
    audio4.play();
});

audio4.addEventListener("ended", function() {
    audio1.play();
});

document.addEventListener('DOMContentLoaded', function() {
    if (!audio1.paused && audio1.autoplay) {
        closeOverlay();
    }
});