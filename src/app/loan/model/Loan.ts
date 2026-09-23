import { Client } from "../../client/model/client";
import { Game } from "../../game/model/Game";

export interface Loan {
    id: number;
    client: Client;
    game: Game;
    loanDate: string;
    returnDate: string;
}

