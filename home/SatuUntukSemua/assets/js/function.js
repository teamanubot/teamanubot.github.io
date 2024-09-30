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
    if (statusPlay) return;
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

function loadKwh() {
    showPlayOverlay();
    audioList.forEach(audio => audio.pause());

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'tugas-kwh/index.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.body.innerHTML = xhr.responseText;
            reinitializeScripts();
        }
    };
    xhr.send();
}

function loadPpt() {
    showPlayOverlay();
    audioList.forEach(audio => audio.pause());

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'ppt/index.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.body.innerHTML = xhr.responseText;
            reinitializeScripts();
        }
    };
    xhr.send();
}

function reinitializeScripts() {
    audioList.forEach((audio, index) => {
        audio.addEventListener("ended", function() {
            const nextIndex = (index + 1) % audioList.length;
            audioList[nextIndex].play();
        });
        audio.addEventListener("pause", function() {
            statusPlay = false;
        });
    });

    if (!statusPlay) {
        showPlayOverlay();
    } else {
        closeOverlay();
    }
}

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

audioList.forEach((audio, index) => {
    audio.addEventListener("ended", function() {
        const nextIndex = (index + 1) % audioList.length;
        audioList[nextIndex].play();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    if (statusPlay) {
        closeOverlay();
    } else {
        showPlayOverlay();
    }
});