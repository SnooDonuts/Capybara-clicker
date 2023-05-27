var score = 0;
var strenght = 1;
var emojiCost = 25;

var iron = false
var gold = false
var diamond = false

var locked_emojis = ["🥥","🍉", "🍈", "🥑", "🍌", "🍑", "🍒", "🌵"]
var unlocked_emojis = ["🍊"]

var bonus = []
//const rewards = [10000, "2x", "3x", "4x", 20000, 420, 69, 42]

const cost = 2
const capys = ["Fancybara.png", "Galileo Capybei.png", "Jesus capy.png", "king capy.png", "Mona bara.png", "Van Gogh capy.png"]

function Cursor(name, cursorNumber, cursorCost, cost, strenght, tier) {
    this.name = name;
    this.cursorNumber = cursorNumber;
    this.cursorCost = cursorCost;
    this.cost = cost;
    this.tier = tier;
    this.strenght = strenght
    
    this.buyCursor = function() {
      if (score >= this.cursorCost) {
        score -= this.cursorCost;
        this.cursorNumber += this.strenght ;
        this.cursorCost += Math.round(this.cursorCost * this.cost);
        document.getElementById(this.name + "Cost").innerHTML = this.cursorCost;
        document.getElementById("score").innerHTML = score;
      }
    };
}

function Strenght(name, strenghtNumber, strenghtCost, cost, strenght, tier) {
    this.name = name;
    this.strenghtNumber = strenghtNumber;
    this.strenghtCost = strenghtCost;
    this.cost = cost;
    this.tier = tier;
    
    this.buyStrenght = function() {
      if (score >= this.strenghtCost) {
        score -= this.strenghtCost;
        this.strenghtNumber += strenght;
        this.strenghtCost += Math.round(this.strenghtCost * this.cost);
        document.getElementById(this.name + "Cost").innerHTML = this.strenghtCost;
        document.getElementById("score").innerHTML = score;
      }
    };
}

function Tier(strenghtCost, strenght, tier) {
    this.unlocked = false
    this.cursor = new Cursor(tier+'Cursor', 0, strenghtCost, cost, strenght, tier)
    this.strenght = new Strenght(tier+'Strenght', 0, strenghtCost, cost, strenght, tier)
}

function buyEmoji() {
    if ((score >= emojiCost) && (locked_emojis.length + unlocked_emojis.length -1 > unlocked_emojis.length)) {
        score -= emojiCost;
        emojiCost += Math.round(emojiCost * cost);

        unlocked_emojis.push(locked_emojis[0]);
        locked_emojis.shift();

        document.getElementById("emojiCost").innerHTML = emojiCost;
        document.getElementById("score").innerHTML = score;
    }
    else if(locked_emojis.length + unlocked_emojis.length -1 <= unlocked_emojis.length) {
        document.getElementById("emojiButton").innerHTML = "Už máš všechny emoji";
    }
}

const tiers = [
    new Tier(15, 1, "wood"),
    new Tier(50, 3, "stone"),
    new Tier(100, 5, "iron"),
    new Tier(200, 10, "silver"),
    new Tier(500, 20, "gold"),
    new Tier(1000, 50, "diamond"),
];

function createButtons(tier, price) {
    let shop = document.getElementsByClassName("shop")[0]

    let strenght = document.createElement('button');
    let strenghtScore = document.createElement('span');
    strenght.textContent = "Kup jsi "+tier+" sílu!";
    strenghtScore.id =  tier+"StrenghtCost";
    strenghtScore.textContent = price;
    
    let cursor = document.createElement('button');
    let cursorScore = document.createElement('span');
    cursor.textContent = "Kup jsi "+tier+" kurzor!";
    cursorScore.id =  tier+"CursorCost";
    cursorScore.textContent = price;

    for (let i=0; i <= tiers.length-1; i++) {
        if (tiers[i].cursor.tier == tier) {
            cursor.addEventListener("click", function(){tiers[i].cursor.buyCursor()});
            strenght.addEventListener("click", function(){tiers[i].strenght.buyStrenght()});
            break;
        }
    }

    strenght.appendChild(strenghtScore);
    cursor.appendChild(cursorScore);
    shop.appendChild(strenght);
    shop.appendChild(cursor);
}

function addScore(amount, user, cursorStrenght) {
    for (let i = 0; i <= amount-1;i++) {
        score += amount* cursorStrenght;
        document.getElementById("score").innerHTML = score;
        let floating = document.createElement('div');
        if (user) {
            floating.style.top = (event.y - 25).toString() + "px";
            floating.style.left = event.x.toString() + "px";
        }
        else {
            let websiteWidth = window.innerWidth;
            let websiteHeight = window.innerHeight;
            floating.style.top = Math.floor(Math.random() * websiteHeight/2 + 0.4* websiteHeight).toString() + "px";
            floating.style.left = Math.floor(Math.random() * websiteWidth/2 + 0.2* websiteWidth).toString() + "px";
            floating.style.scale = cursorStrenght*0.4
        }
        floating.innerText = unlocked_emojis[Math.floor(Math.random() * unlocked_emojis.length)];
        floating.style.position = 'absolute';
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
    
    for (let i=1; i <= tiers.length; i++) {
        if ((score >= 10**(2+i)) && !(tiers[i].cursor.unlocked))  {
            createButtons(tiers[i].cursor.tier, tiers[i].cursor.cursorCost);
            tiers[i].cursor.unlocked = true
        }
        else if(score >= 1_000_000_000) {
            alert("git gud");
            score = 0; 
            for (let i=0; i <= tiers.length; i++) {
                tiers[i].cursor.cursorNumber = 0;
                tiers[i].strenght.strenghtNumber = 0;
            }
        }
    }
}

function giftReward() {
    let reward = rewards[Math.floor(Math.random() * rewards.length)]
    if (typeof(reward) == "number") {
        score += reward
    } else if (reward.indexOf("x")) {
        bonus = [parseInt(reward.substring(0, str.length - 1)), 60]
    }
}

function spawnGift() {
    let gift = document.createElement('div');

    gift.addEventListener("click", function(){giftReward();});
    gift.style.top = Math.floor(Math.random() * window.innerWidth).toString() + "px";
    gift.style.left = Math.floor(Math.random() * window.innerHeight).toString() + "px";
    
    gift.innerText = "⭐";
    gift.style.position = 'absolute';
    gift.style.opacity = '1';
    gift.style.transition = 'all 2s linear';
    
    document.body.appendChild(gift);

    new Promise(resolve => setTimeout(resolve, 100)).then(() => {
        gift.style.top = '0';
    }).then(() => {
        new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
            gift.remove();
        });
    });
}

setInterval(function() {
        strenght = 1
        for (let i = 0; i <= tiers.length-1; i++) {
            strenght += tiers[i].strenght.strenghtNumber
        }

        if (bonus[1] > 0) {
            strenght *= bonus[0]
            bonus[0] -= 1 
        }

        for (let i = 0; i <= tiers.length-1; i++) {
            addScore(tiers[i].cursor.cursorNumber, false, tiers[i].cursor.strenght);
            document.getElementById("score").innerHTML = score;
        }
}, 1000)

setInterval(function() {
    document.getElementById("capyImg").src = "../imgs/"+capys[Math.floor(Math.random() * capys.length)]
    if (Math.floor(Math.random() * 100) > 1) {
        //spawnGift();
    }
}, 60000)