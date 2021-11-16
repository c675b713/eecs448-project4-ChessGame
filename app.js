
import {loadPieces} from './gameService/loadPieces.gameService.js'
//import {GameBoard} from '/GameClasses/ChessBoard.js'

addEventListener('DOMContentLoaded', _ => {
    loadPieces.loadPieces()
})


function newG() {
    this.GameBoard.setUpPieces();
}
