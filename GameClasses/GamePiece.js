class GamePiece {
    constructor(color){
        this.color = color;//'white' or 'black'
    }

    /**
     * stores the row and column of the piece so it can be referenced in future algorithms
     * @function setLocation
     * @memberof GamePiece
     * @param row new value of this.row
     * @param column new value of this.column
     */
    setLocation(row, column){
        this.row = row;
        this.column = column;
    }

    /**
     * method that runs when a piece is clicked, figures out what buttons to add the move script to
     * @function enableValidMovements
     * @memberof GamePiece
     * @param GameBoardClass GameBoard Object so we can use the GameButton and GameBoard arrays
     */
    enableValidMovements(GameBoardClass){//This method will eventually be removed, but is a template for future methods
        for(var i = 0; i<8; i++){//for every piece in GameBoard
            for(var j = 0; j<8; j++){
                if(i==this.row && j==this.column){//if you reclick the square, then restart the turn, enabling all of your color's pieces
                    GameBoardClass.GameButtons[i][j].disabled = false;
                    GameBoardClass.GameButtons[i][j].onclick = (() => {GameBoardClass.startTurn(this.color)});
                }
                else if(GameBoardClass.GameBoard[i][j].color != this.color){
                    this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[i][j]);
                }
                else{
                    GameBoardClass.GameButtons[i][j].disabled = true;
                }
            }
        }
    }

    /**
     * adds the movement script to the given piece
     * @function setMoveFunction
     * @memberof GamePiece
     * @param GameBoardClass GameBoard Object so we can use the GameButton and GameBoard arrays
     * @param destinationPiece piece we want to move to
     */
    setMoveFunction(GameBoardClass,destinationPiece){//this will be used by every pieces enableValidMovements methods
        var destinationButton = GameBoardClass.GameButtons[destinationPiece.row][destinationPiece.column]
        destinationButton.disabled = false;
        destinationButton.onclick = (() =>{
            GameBoardClass.movePiece(GameBoardClass.GameBoard[this.row][this.column], destinationPiece);
            if(this.color == 'white'){
                GameBoardClass.startTurn('black');
            }
            else{
                GameBoardClass.startTurn('white');
            }
        });
    }
    //Another thing every piece will have is a method to return their image
}

class Pawn extends GamePiece{
    constructor(color){
        super(color);
        this.pieceType = 'pawn';
    }

    /**
     * returns the image of the piece depending on its color
     * @function getImage
     * @memberof Pawn
     */
    getImage(){
        if(this.color == 'white'){
            return './img/pawn_white60.svg';
        }
        else{
            return '../img/pawn_black60.svg';
        }
    }
}

class Knight extends GamePiece{
    constructor(color){
        super(color);
        this.pieceType = 'knight';
    }

    /**
     * returns the image of the piece depending on its color
     * @function getImage
     * @memberof Knight
     */
    getImage(){
        if(this.color == 'white'){
            return './img/knight_white60.svg';
        }
        else{
            return './img/knight_black60.svg';
        }
    }
}

class Rook extends GamePiece{
    constructor(color){
        super(color);
        this.pieceType = 'rook';
    }

    /**
     * returns the image of the piece depending on its color
     * @function getImage
     * @memberof Rook
     */
    getImage(){
        if(this.color == 'white'){
            return './img/rook_white60.svg';
        }
        else{
            return './img/rook_black60.svg';
        }
    }
}

class Bishop extends GamePiece{
    constructor(color){
        super(color);
        this.pieceType = 'bishop';
    }

    /**
     * returns the image of the piece depending on its color
     * @function getImage
     * @memberof Bishop
     */
    getImage(){
        if(this.color == 'white'){
            return './img/bishop_white60.svg';
        }
        else{
            return './img/bishop_black60.svg';
        }
    }
}

class Queen extends GamePiece{
    constructor(color){
        super(color);
        this.pieceType = 'queen';
    }

    /**
     * returns the image of the piece depending on its color
     * @function getImage
     * @memberof Queen
     */
    getImage(){
        if(this.color == 'white'){
            return './img/queen_white60.svg';
        }
        else{
            return './img/queen_black60.svg';
        }
    }
}

class King extends GamePiece{
    constructor(color){
        super(color);
        this.pieceType = 'king';
    }

    /**
     * returns the image of the piece depending on its color
     * @function getImage
     * @memberof King
     */
    getImage(){
        if(this.color == 'white'){
            return './img/king_white60.svg';
        }
        else{
            return './img/king_black60.svg';
        }
    }
}

class NullPiece extends GamePiece{
    constructor(){
        super('null');
        this.pieceType = 'null';
    }

    /**
     * returns no image because it is not a chess piece
     * @function getImage
     * @memberof NullPiece
     */
    getImage(){
        return '';//This might change later, we will see what I want this to be
    }
}
//here we can define classes for each of the standard pieces and the null piece
//once we do that we can figure out how to add them to the squares on the board.