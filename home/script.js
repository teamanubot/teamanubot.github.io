window.onload = function() {
    autoPlayAudio();
    window.addEventListener('popstate', function(event) {
        if (!statusPlay) {
            showPlayOverlay();
        } else {
            closeOverlay();
        }
    });
    window.addEventListener('pageshow', function(event) {
        if (!statusPlay) {
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
    if (statusPlay) {
        closeOverlay();
    }
});