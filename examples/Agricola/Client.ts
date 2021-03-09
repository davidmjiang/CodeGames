import { GameClient } from "../../src/GameClient";
import agricola from "./Agricola";
import { AgricolaPlayer } from "./AgricolaPlayer";

let agricolaClient: GameClient = new GameClient(agricola);

let player1 = new AgricolaPlayer("foo");
let player2 = new AgricolaPlayer("bar");

agricolaClient.addPlayer(player1);
agricolaClient.addPlayer(player2);
agricolaClient.start();