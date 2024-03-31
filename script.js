const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".Yes-btn");
const noBtn = document.querySelector(".No-btn");

yesBtn.addEventListener("click", () => {
    question.innerHTML = "Aaaaaaaaaa, I Like You too!!! :)";
    gif.src = "https://media.tenor.com/PdSA8dcotSsAAAAC/honkai-honkai-star-rail.gif";
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    let count = 5;
    const countdownInterval = setInterval(() => {
        gif.insertAdjacentHTML('afterend', `<p class="countdown">Redirecting in ${count} seconds...</p>`);
        count--;
        if (count === 0) {
            clearInterval(countdownInterval);
            window.location.href = "readme.md";
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
