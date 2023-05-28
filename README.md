# Capybara Clicker Game

This is a JavaScript code for an Emoji Clicker game. The game allows players to click on emojis to earn points and unlock various upgrades.

## How to Play

1. Click on the emojis displayed on the screen to earn points.
2. Use the points to purchase cursors and increase your clicking power.
3. Unlock higher tiers to access more powerful cursors and upgrades.
4. Keep earning points and unlocking new features to progress in the game.

## Game Mechanics

The game includes the following variables and functions:

### Variables

- `score`: Stores the player's current score.
- `strength`: Represents the player's clicking power.
- `emojiCost`: Stores the cost of purchasing additional emojis.
- `giftId`: An identifier for spawned gift elements.
- `locked_emojis`: An array of locked emojis that are not yet available for purchase.
- `unlocked_emojis`: An array of unlocked emojis that can be clicked for points.
- `bonus`: An array representing a temporary strength bonus.
- `rewards`: An array of possible rewards that can be obtained from gifts.
- `cost`: Represents the cost multiplier for purchasing upgrades.
- `capys`: An array of image filenames for displaying random Capybara images.

### Functions

- `Cursor(name, cursorNumber, cursorCost, cost, strength, tier)`: Constructor function for creating cursor objects.
- `buyCursor()`: Method for purchasing a cursor.
- `Strength(name, strengthNumber, strengthCost, cost, strength, tier)`: Constructor function for creating strength objects.
- `buyStrength()`: Method for purchasing strength.
- `Tier(strengthCost, strength, tier)`: Constructor function for creating tier objects.
- `buyEmoji()`: Function for purchasing emojis.
- `createButtons(tier, price)`: Function for creating upgrade buttons based on tier and price.
- `addScore(amount, user, cursorStrength)`: Function for adding score points based on cursor strength.
- `spawnGift()`: Function for spawning gift elements.
- `setInterval()`: Functions executed at intervals to update the game state.

## License

This game is licensed under the MIT License. Feel free to modify and distribute it according to the terms of the license.

Enjoy playing the Emoji Clicker Game!
