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

function autoPlayAudio() {
    audio1.play().catch(error => {
        if (error.name === 'NotAllowedError') {
            audio1.requestAutoplay();
        }
    });
}

function checkNavigation() {
    const previousUrl = sessionStorage.getItem("previousUrl");
    if (previousUrl && previousUrl.includes("teamanubot.github.io") && !window.location.href.includes("teamanubot.github.io")) {
        showPlayOverlay();
    }
}

/* Versi Kuno
window.onload = function() {
    if (performance.navigation.type === 1 || performance.navigation.type === 2) {
        showPlayOverlay();
    }
    playOverlay();
};*/

document.addEventListener("DOMContentLoaded", function() {
    showPlayOverlay();
});

window.onload = function() {
    const navigationEntries = performance.getEntriesByType("navigation");
    for (const entry of navigationEntries) {
        const navigationType = entry.type;
        if (navigationType === "reload" || navigationType === "back_forward" || navigationType === "reserved") {
            showPlayOverlay();
            break;
        }
    }
    autoPlayAudio();
};

window.addEventListener("popstate", function(event) {
    checkNavigation();
});

window.addEventListener("load", function() {
    const historyLength = history.length;
    if (historyLength > sessionStorage.getItem("previousHistoryLength")) {
        showPlayOverlay();
    }
    sessionStorage.setItem("previousHistoryLength", historyLength);
    sessionStorage.setItem("previousUrl", document.referrer);
});

audio1.addEventListener("ended", function() {
    audio2.play();
});

audio2.addEventListener("ended", function() {
    audio1.play();
});