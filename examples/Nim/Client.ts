import { GameClient } from "../../src/GameClient";
import { GamePlayer } from "../../src/GamePlayer";
import { Result } from "../../src/MoveResult";
import nim from "./Nim";

let nimClient: GameClient = new GameClient(nim);

let player1 = new GamePlayer("player 1");
let player2 = new GamePlayer("player 2");

nimClient.addPlayer(player1);
nimClient.addPlayer(player2);
nimClient.start();

let game = document.getElementById("game");
game.innerText = JSON.stringify(nim.custom);

let oneStoneButton = document.getElementById("one-stone");
let twoStoneButton = document.getElementById("two-stone");
oneStoneButton.addEventListener("click", () => {
    let result = nimClient.makeMove("Take stones", 1);
    game.innerText = JSON.stringify(nim.custom);
    if (result.result == Result.GAME_OVER) {
        alert(`${result.data.winner} wins!`);
    }
});

twoStoneButton.addEventListener("click", () => {
    let result = nimClient.makeMove("Take stones", 2);
    game.innerText = JSON.stringify(nim.custom);
    if (result.result == Result.GAME_OVER) {
        alert(`${result.data.winner} wins!`);
    }
});