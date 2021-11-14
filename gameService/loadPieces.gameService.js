import { gameConfig } from '../gameConfig/chessGame.gameConfig.js'
import {$} from '../utils.js'

export const loadPieces = {
    loadPieces() {
        this.placePieces()

    },
    placePieces(){
        const flexWrap = gameConfig.blackPlayUp ? 'wrap' : 'wrap-reverse'
        $( gameConfig.chessBoardSelector ).style.flexWrap = flexWrap
    },
}
window.loadPieces = loadPieces