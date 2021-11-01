import { pieceImg } from '../gameConfig/pieceImg.gameConfig.js'
import { initialPlace } from '../gameConfig/initGame.gameConfig.js'
import { gameConfig } from '../gameConfig/chessGame.gameConfig.js'
import {potentGame} from '../gameConfig/potentGame.gameConfig.js'
import {$} from '../utils.js'

export const loadPieces = {
    loadPieces() {
        const gameSetup = gameConfig.useInitGame ? initialPlace : potentGame
        this.placePieces()
        //this.placeInPosition(gameSetup)

    },
    placePieces(){
        const flexWrap = gameConfig.blackPlayUp ? 'wrap' : 'wrap-reverse'
        $( gameConfig.chessBoardSelector ).style.flexWrap = flexWrap
    },
    placeInPosition(gameSetup) {
        for (const piecePos in gameSetup){

                const pType = gameSetup[piecePos]
                const pImgLocation = pieceImg[pType]

                const imgElement = document.createElement('img')
                imgElement.classList.add('square')
                imgElement.setAttribute('square-type', pType)
                imgElement.src = `${ pImgLocation }`

                $( `#${ piecePos }` ).append(imgElement)
        }
    },
}
window.loadPieces = loadPieces