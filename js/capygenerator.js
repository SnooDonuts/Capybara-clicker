var score = 0;
locked_emojis = ["🌊", "💲","🔝", "☢️","🥥","🍊"]
unlocked_emojis = ["🍉"]

function addScore(amount) {
    score += amount;
    document.getElementById("score").innerHTML = score;
    let floating = document.createElement('div');

    floating.innerText = unlocked_emojis[Math.floor(Math.random() * unlocked_emojis.length)];
    floating.style.position = 'absolute';
    floating.style.top = (event.y - 25).toString() + "px";
    floating.style.left = event.x.toString() + "px";
    floating.style.opacity = '1';
    floating.style.transition = 'all 2s linear';
    floating.style.userSelect = 'none';

    document.body.appendChild(floating);

    new Promise(resolve => setTimeout(resolve, 10)).then(() => {
        floating.style.top = '0';
        floating.style.opacity = '0';
    }).then(() => {
        new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
            floating.remove();
        });
    });
}

function buyCursor() {}
function buyCapy() {}
function buyEmoji() {}