window.onload = function() {
    statusPlay = false;
    autoPlayAudio();
    autoPlayIframe();
    window.addEventListener('popstate', handleOverlayDisplay);
    window.addEventListener('pageshow', handleOverlayDisplay);
};

function handleOverlayDisplay() {
    if (!statusPlay) {
        showPlayOverlay();
    } else {
        closeOverlay();
    }
}

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