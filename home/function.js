const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const audio3 = document.getElementById("audio3");
const audio4 = document.getElementById("audio4");

function showPlayOverlay() {
    if (audio1.paused || !audio1.autoplay) {
        document.getElementById("playOverlay").style.display = "block";
    } else {
        document.getElementById("playOverlay").style.display = "none";
    }
}

function closeOverlay() {
    document.getElementById("playOverlay").style.display = "none";
}

function autoPlayAudio() {
    audio1.play().catch(error => {        
        if (error.name === 'NotAllowedError') {
            showPlayOverlay();
        }
    });
    closeOverlay();
}