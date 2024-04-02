const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".Yes-btn");
const noBtn = document.querySelector(".No-btn");

yesBtn.addEventListener("click", () => {
    const audio = new Audio("lagu/pirsek.mp3");
    audio.autoplay = true;
    audio.loop = true;
    audio.controls = false;
    audio.style.display = "none";
    document.body.appendChild(audio);
    question.innerHTML = "Aaaaaaaaaa, I Like You too!!! :)";
    gif.src = "https://media.tenor.com/2h5AqdpGfi0AAAAC/arlecchino-genshin-impact.gif";
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    let count = 5;
    const countdownInterval = setInterval(() => {
        const countdownElement = document.querySelector(".countdown");
        if (countdownElement) {
            countdownElement.remove();
        }
        gif.insertAdjacentHTML('afterend', `<p class="countdown">Redirecting in ${count} seconds...</p>`);
        count--;
        if (count === -1) {
            clearInterval(countdownInterval);
            window.location.href = "README.html";
        }
    }, 1000);
});

noBtn.addEventListener("mouseover", () => {
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});