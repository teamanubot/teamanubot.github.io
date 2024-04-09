const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const audio3 = document.getElementById("audio3");
const audio4 = document.getElementById("audio4");

function showPlayOverlay() {
    document.getElementById("playOverlay").style.display = "block";
}

function closeOverlay() {
    document.getElementById("playOverlay").style.display = "none";
}

function playOverlay() {
    audio1.play().catch(error => {
        if (error.name === 'NotAllowedError') {
            audio1.play();
        }
    });
    closeOverlay();
}

function autoPlayAudio() {
    audio1.autoplay = true;
    audio1.play().catch(error => {
        if (error.name === 'NotAllowedError') {
            showPlayOverlay();
        }
    });
}