var score = 0;
var strenght = 1;
var emojiCost = 25;

var iron = false
var gold = false
var diamond = false

var locked_emojis = ["🥥","🍉", "🍈", ""]
var unlocked_emojis = ["🍊"]

const capys = ["Fancybara.png", "Galileo Capybei.png", "Jesus capy.png", "king capy.png", "Mona bara.png", "Van Gogh capy.png"]

function Cursor(name, cursorNumber, cursorCost, cost, strenght, tier) {
    this.name = name;
    this.cursorNumber = cursorNumber;
    this.cursorCost = cursorCost;
    this.cost = cost;
    this.tier = tier;
    
    this.buyCursor = function() {
      if (score >= this.cursorCost) {
        score -= this.cursorCost;
        this.cursorNumber += strenght;
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

function buyEmoji() {
    if ((score >= emojiCost) && (locked_emojis.length + unlocked_emojis.length -1 > unlocked_emojis.length)) {
        score -= emojiCost;
        emojiCost += Math.round(emojiCost * 2);

        unlocked_emojis.push(locked_emojis[0]);
        locked_emojis.shift();

        document.getElementById("emojiCost").innerHTML = emojiCost;
        document.getElementById("score").innerHTML = score;
    }
    else if(locked_emojis.length + unlocked_emojis.length -1 <= unlocked_emojis.length) {
        document.getElementById("emojiButton").innerHTML = "Už máš všechny emoji";
    }
}

var woodCursor = new Cursor("woodCursor", 0, 15, 20, 1, "wood");
var ironCursor = new Cursor("ironCursor", 0, 100, 10, 5, "iron");
var goldCursor = new Cursor("goldCursor", 0, 500, 5, 20, "gold");
var diamondCursor = new Cursor("diamondCursor", 0, 1000, 2, 100, "diamond");

var woodStrenght = new Strenght("woodStrenght", 0, 15, 20, 1,"wood");
var ironStrenght = new Strenght("ironStrenght", 0, 100, 10, 5, "iron");
var goldStrenght = new Strenght("goldStrenght", 0, 500, 5, 20, "gold");
var diamondStrenght = new Strenght("diamondStrenght", 0, 1000, 2, 100, "diamond");

const strenghts = [woodStrenght, ironStrenght, goldStrenght, diamondStrenght];
const cursors = [woodCursor, ironCursor, goldCursor, diamondCursor];

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

    for (let i=0; i <= strenghts.length-1; i++) {
        if (strenghts[i].tier == tier) {
            cursor.addEventListener("click", function(){cursors[i].buyCursor()});
            strenght.addEventListener("click", function(){strenghts[i].buyStrenght()});
            break;
        }
    }
    
    cursorScore.id =  tier+"CursorCost";
    cursorScore.textContent = price;

    strenght.appendChild(strenghtScore);
    cursor.appendChild(cursorScore);

    shop.appendChild(strenght);
    shop.appendChild(cursor);
}

function addScore(amount, user) {
    for (let i = 0; i <= strenght*amount-1;i++) {
        score += amount*strenght;
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
        }
        floating.innerText = unlocked_emojis[Math.floor(Math.random() * unlocked_emojis.length)];
        floating.style.position = 'absolute';
        floating.style.opacity = '1';
        floating.style.transition = 'all 2s linear';
        floating.style.userSelect = 'none';
        floating.style.fontSize = strenght

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
    
    if ((score >= 10_000) && !(iron))  {
        createButtons("iron", 100);
        iron = true;
    }
    else if ((score >= 100_000) && !(gold)){
        createButtons("gold", 500);
        gold = true;
    }
    else if ((score >= 1_000_000) && !(diamond)){
        createButtons("diamond", 1000);
        diamond = true;
    }
    else if(score >= 1_000_000_000) {
        alert("git gud");
        score = 0; 
        for (let i=0; i <= strenghts.length; i++) {
            cursors[i].cursorNumber = 0;
            strenghts[i].cursorNumber = 0;
        }
    }
}

function calculateStrenght() {
    strenght = 1
    for (let i = 0; i <= strenghts.length-1; i++) {
        strenght += strenghts[i].strenghtNumber
    }
}

setInterval(function() {
        calculateStrenght();
        for (let i = 0; i <= cursors.length-1; i++) {
            addScore(cursors[i].cursorNumber, false);
            document.getElementById("score").innerHTML = score;
        }
}, 1000)

setInterval(function() {
    document.getElementById("capyImg").src = "../imgs/"+capys[Math.floor(Math.random() * capys.length)]
}, 60000)