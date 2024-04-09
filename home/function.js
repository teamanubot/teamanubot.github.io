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
    audioList[0].play().then(() => {
        statusPlay = true;
        closeOverlay();
    }).catch(error => {        
        if (error.name === 'NotAllowedError') {
            statusPlay = false;
            showPlayOverlay();
        }
    });
}