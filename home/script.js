/* Versi Kuno
window.onload = function() {
    if (performance.navigation.type === 1 || performance.navigation.type === 2) {
        showPlayOverlay();
    }
    playOverlay();
};*/

window.onload = function() {
    autoPlayAudio();
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