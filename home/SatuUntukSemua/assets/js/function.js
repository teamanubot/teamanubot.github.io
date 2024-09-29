const audioList = [
    document.getElementById("audio1"),
    document.getElementById("audio2"),
    document.getElementById("audio3"),
    document.getElementById("audio4")
];
let statusPlay = false;

function showPlayOverlay() {
    document.getElementById("playOverlay").style.display = "block";
}

function closeOverlay() {
    document.getElementById("playOverlay").style.display = "none";
}

function autoPlayAudio() {
    statusPlay = true;
    audioList[0].play().then(() => {
        closeOverlay();
    }).catch(error => {        
        if (error.name === 'NotAllowedError') {
            statusPlay = false;
            showPlayOverlay();
        }
    });
}