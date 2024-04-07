const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");

function showPlayOverlay() {
    document.getElementById("playOverlay").style.display = "block";
}

function closeOverlay() {
    document.getElementById("playOverlay").style.display = "none";
}

function playOverlay() {
    audio1.play().catch(error => {
        showPlayOverlay();
        if (error.name === 'NotAllowedError') {
            audio1.requestAutoplay();
        }
    });
    closeOverlay();
}

audio1.addEventListener("ended", function () {
    audio2.play();
});

audio2.addEventListener("ended", function () {
    audio1.play();
});