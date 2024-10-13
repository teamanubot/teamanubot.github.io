window.onload = function() {
    autoPlayAudio();
    autoPlayIframe();
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

audioList.forEach((audio, index) => {
    audio.addEventListener("ended", function() {
        const nextIndex = (index + 1) % audioList.length;
        audioList[nextIndex].play();
    });
    audio.addEventListener("pause", function() {
        statusPlay = false;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    if (statusPlay) {
        closeOverlay();
    }
});