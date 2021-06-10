# A Battleship Game
Realisation of classic turn-based Battleship game for two local players as web-app created on React.

## Installation
Firstly, install all dependencies with `yarn start` or `yarn install`.

Then run the project with `yarn start` and proceed to [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you need to run the app in debug mode (allows using Redux-Dev-Tools), use `yarn dev`.

## Rules and Game Process

### Basic Rules
The goal of Battleship is to sink all opponent's ships before they sink all of your ships.
You should make strikes by calling out the coordinates of one of the squares on the field.
The other player also tries to hit your ships by calling out coordinates.
Neither you nor the other player can see each other's field so you must try to guess where they are.

### Game Process
The game consists of two main phases: _Preparation Phase_ and _Game phase_.

#### Preparation Phase
Each player places the 5 ships somewhere on their [Field](#Fields).

During this phase player should place all his ships on the field by dragging
each ship from his [Fleet](#Fleet);

Ship names, sizes and count:

|       Name        |  Size   |Count|
| ----------------- | ------: |---: |
| Aircraft Carrier  |    5    | 1   |
| Battleship        |    4    | 1   |
| Cruiser           |    4    | 1   |
| Destroyer         |    2    | 2   |
| Submarine         |    1    | 2   |

Basic placement rules:
- All ship must be placed inside the field
- Ships may not overlap each other
- No ships can be placed on another ship
- A minimum space between ships is one cell

After first player has placed all his ships, a [Prompt](#Next Turn Prompt) will appear.
The prompt serves two purposes:
- Prevent a player from revealing another player's board.
- Give the next player some tim to prepare for his turn.

When the second player has finished his placement, the next phase starts.

#### Game Phase
During this phase each player have two boards: 
- their own [Field](#Fields) (left one) which shows his placement and enemy hits.
- enemy [Field](#Fields) (right one) which does not show enemy ship placement and is used for making strikes.

Each turn player should click any cell on the enemy [Field](#Fields) trying to hit opponents ship.
Every successful hit will be marked on the enemy field with `X` symbol. After successful hit, player can
make another attempt until he misses.

If player misses his strike, the cell on the enemy field will be marked with `·` and a prompt will appear,
asking another player to prepare for his turn.

#### Game ending
The game ends, when one of players destroys all opponent ships (19 cells). After the last successful hit,
a [Window](#Game Results) with game results will appear. Anew game can be started here. 

## User Interface

### Header
Located at the top of page it shows current game phase and player. It also shows short player statistics
during the [Game Phase](#Game Phase).
Also, the current game can be restarted by pressing *Reset Game* button in the right corner.

### Fields
During the [Preparation Phase](#Preparation Phase) there is one field where player's ships should be placed.
Its size is 10x10 cells.

During the [Game Phase](#Game Phase) there are two fields. The left one is player's own - it shows his
ship's placement and enemy hits and misses. The right one is his opponent's field - it is used for making strikes
and tracking player's hits and misses.

### Fleet
Is shown during the [Preparation Phase](#Preparation Phase). It contains all player's
ships. Ships can be placed on the [Field](#Fields) by dragging to the field cell.
Already placed ships are not able to drag.

### Next Turn Prompt
At the end of every turn, the prompt will appear, blocking visibility of previous player's field and asking
for another player to prepare. Next turn can be started by clicking **Ready** button.

### Game Results
At the end of the game a window with game results will appear. It shows the winner and miss/hit/total shots
for each player. The game can be restarted by clicking **Reset Game Button**.
