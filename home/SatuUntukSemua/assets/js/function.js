const audioList = [
    document.getElementById("audio1"),
    document.getElementById("audio2"),
    document.getElementById("audio3"),
    document.getElementById("audio4")
];

let statusPlay = false;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var videoIds = [
    'l7mFdh37SLc',
    '0YF8vecQWYs',
    'aKV3DIXJfT0',
    'tYZIlPMNjwE',
];
var randomizedVideoIds = shuffleArray(videoIds.slice());
var currentVideoIndex = 0;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: randomizedVideoIds[currentVideoIndex],
        playerVars: {
            'playsinline': 1,
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}


function showPlayOverlay() {
    document.getElementById("playOverlay").style.display = "block";
}

function closeOverlay() {
    document.getElementById("playOverlay").style.display = "none";
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        currentVideoIndex = (currentVideoIndex + 1) % randomizedVideoIds.length;
        player.loadVideoById(randomizedVideoIds[currentVideoIndex]);
    }
    if (event.data == YT.PlayerState.PAUSED) {
        statusPlay = false;
    }
}

function playVideoWithPromise(player) {
    return new Promise((resolve, reject) => {
        try {
            player.playVideo();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function autoPlayIframe() {
    if (statusPlay) return;
    statusPlay = true;

    if (player && player.playVideo) {
        playVideoWithPromise(player).then(() => {
            closeOverlay();
        }).catch(error => {
            if (error.name === 'NotAllowedError') {
                statusPlay = false;
                showPlayOverlay();
            } else {
                console.error('Terjadi kesalahan saat memutar video', error);
            }
        });
    } else {
        showPlayOverlay();
        statusPlay = false;
    }
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