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

    getOppositeColor(piece){
        if(piece.color == 'white'){
            return 'black';
        }
        else if(piece.color == 'black'){
            return 'white';
        }
        else{
            return 'null';
        }
    }

    disableAllPieces(GameBoardClass){
        for(var i = 0; i<8; i++){//for every piece in GameBoard
            for(var j = 0; j<8; j++){
                GameBoardClass.GameButtons[i][j].disabled = true;
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
            return './img/pawn_white.svg';
        }
        else{
            return '../img/pawn_black.svg';
        }
    }

    /**
     * method that runs when a piece is clicked, figures out what buttons to add the move script to
     * @function enableValidMovements
     * @memberof Pawn
     * @param GameBoardClass GameBoard Object so we can use the GameButton and GameBoard arrays
     */
     enableValidMovements(GameBoardClass){//This method will eventually be removed, but is a template for future methods
        this.disableAllPieces(GameBoardClass);
        GameBoardClass.GameButtons[this.row][this.column].disabled = false;
        GameBoardClass.GameButtons[this.row][this.column].onclick = (() => {GameBoardClass.startTurn(this.color)});
        if(this.color == 'white'){
            if(GameBoardClass.GameBoard[this.row+1][this.column].color == 'null'){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column]);
            }
            if(this.row == 1 && GameBoardClass.GameBoard[this.row+2][this.column].color != 'black'){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+2][this.column]);
            }
            if(GameBoardClass.GameBoard[this.row+1][this.column+1].color == 'black'){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column+1]);
            }
            if(GameBoardClass.GameBoard[this.row+1][this.column-1].color == 'black'){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column-1]);
            }
        }
        if(this.color == 'black'){
            if(GameBoardClass.GameBoard[this.row-1][this.column].color == 'null'){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column]);
            }
            if(this.row == 6 && GameBoardClass.GameBoard[this.row-2][this.column].color != 'white'){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-2][this.column]);
            }
            if(GameBoardClass.GameBoard[this.row-1][this.column+1].color == 'white'){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column+1]);
            }
            if(GameBoardClass.GameBoard[this.row-1][this.column-1].color == 'white'){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column-1]);
            }
        }
        this.checkEnPassant(GameBoardClass);
    }
    
    checkEnPassant(GameBoardClass){//I made this a seperate method so we don't have just a ton of conditions in the validMovements method
        var gameBoard = GameBoardClass.GameBoard;
        if(this.color == 'white' && this.row == 4){
            if(gameBoard[this.row][this.column+1].color == 'black' &&gameBoard[this.row][this.column+1].pieceType == 'pawn'){
                this.enPassantMove(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column+1],gameBoard[this.row][this.column+1]);
            }
            if(gameBoard[this.row][this.column-1].color == 'black' &&gameBoard[this.row][this.column-1].pieceType == 'pawn'){
                this.enPassantMove(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column-1],gameBoard[this.row][this.column-1]);
            }
        }
        if(this.color == 'black' && this.row == 3){
            if(gameBoard[this.row][this.column+1].color == 'white' &&gameBoard[this.row][this.column+1].pieceType == 'pawn'){
                this.enPassantMove(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column+1],gameBoard[this.row][this.column+1]);
            }
            if(gameBoard[this.row][this.column-1].color == 'white' &&gameBoard[this.row][this.column-1].pieceType == 'pawn'){
                this.enPassantMove(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column-1], gameBoard[this.row][this.column-1]);
            }
        }
    }

    enPassantMove(GameBoardClass, destinationPiece, killedPawn){//
        var destinationButton = GameBoardClass.GameButtons[destinationPiece.row][destinationPiece.column]
        destinationButton.disabled = false;
        destinationButton.onclick = (() =>{
            GameBoardClass.GameBoard[killedPawn.row][killedPawn.column] = new NullPiece();
            GameBoardClass.movePiece(GameBoardClass.GameBoard[this.row][this.column], destinationPiece);
            if(this.color == 'white'){
                GameBoardClass.startTurn('black');
            }
            else{
                GameBoardClass.startTurn('white');
            }

        });
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
            return './img/knight_white.svg';
        }
        else{
            return './img/knight_black.svg';
        }
    }

    /**
     * method that runs when a piece is clicked, figures out what buttons to add the move script to
     * @function enableValidMovements
     * @memberof Knight
     * @param GameBoardClass GameBoard Object so we can use the GameButton and GameBoard arrays
     */
     enableValidMovements(GameBoardClass){//This method will eventually be removed, but is a template for future methods
        //this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[i][j]);
        this.disableAllPieces(GameBoardClass);
        GameBoardClass.GameButtons[this.row][this.column].disabled = false;
        GameBoardClass.GameButtons[this.row][this.column].onclick = (() => {GameBoardClass.startTurn(this.color)});
        //up and right
        if(this.row+2 <= 7 && this.column+1 <= 7){
            if(GameBoardClass.GameBoard[this.row+2][this.column+1].color != this.color){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+2][this.column+1])
            }
        }
        if(this.row+1 <= 7 && this.column+2 <= 7){
            if(GameBoardClass.GameBoard[this.row+1][this.column+2].color != this.color){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column+2])
            }
        }

        //down and right
        if(this.row-1 >= 0 && this.column+2 <= 7){
            if(GameBoardClass.GameBoard[this.row-1][this.column+2].color != this.color){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column+2])
            }
        }
        if(this.row-2 >= 0 && this.column+1 <= 7){
            if(GameBoardClass.GameBoard[this.row-2][this.column+1].color != this.color){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-2][this.column+1])
            }
        }

        //up and left
        if(this.row+1 <= 7 && this.column-2 >= 0){
            if(GameBoardClass.GameBoard[this.row+1][this.column-2].color != this.color){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column-2])
            }
        }
        if(this.row+2 <= 7 && this.column-1 >= 0 ){
            if(GameBoardClass.GameBoard[this.row+2][this.column-1].color != this.color){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+2][this.column-1])
            }
        }

        //down and left
        if(this.row-1 >= 0 && this.column-2 >= 0){
            if(GameBoardClass.GameBoard[this.row-1][this.column-2].color != this.color){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column-2])
            }
        }
        if(this.row-2 >= 0 && this.column-1 >= 0){
            if(GameBoardClass.GameBoard[this.row-2][this.column-1].color != this.color){
                this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-2][this.column-1])
            }
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
            return './img/rook_white.svg';
        }
        else{
            return './img/rook_black.svg';
        }
    }
    /**
     * method that runs when a piece is clicked, figures out what buttons to add the move script to
     * @function enableValidMovements
     * @memberof Rook
     * @param GameBoardClass GameBoard Object so we can use the GameButton and GameBoard arrays
     */
    enableValidMovements(GameBoardClass){//This method will eventually be removed, but is a template for future methods
       //this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[i][j]);
       this.disableAllPieces(GameBoardClass);
       GameBoardClass.GameButtons[this.row][this.column].disabled = false;
       GameBoardClass.GameButtons[this.row][this.column].onclick = (() => {GameBoardClass.startTurn(this.color)});
       //up
       if(this.row < 7)
       {
         var iteratorPiece = GameBoardClass.GameBoard[this.row + 1][this.column];
         while(iteratorPiece.color != this.color){
             this.setMoveFunction(GameBoardClass, iteratorPiece);
             if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
             if(iteratorPiece.row < 7){
                 iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row + 1][iteratorPiece.column];
             }
             else {break}
         }
       }
       //down
       if(this.row > 0)
       {
         var iteratorPiece = GameBoardClass.GameBoard[this.row - 1][this.column];
         while(iteratorPiece.color != this.color){//for every piece up and to the right
             this.setMoveFunction(GameBoardClass, iteratorPiece);
             if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
             if(iteratorPiece.row > 0){
                 iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row - 1][iteratorPiece.column];
             }
             else {break}
         }
       }
       //right
       if(this.column < 7)
       {
         var iteratorPiece = GameBoardClass.GameBoard[this.row][this.column + 1];
         while(iteratorPiece.color != this.color){//for every piece up and to the right
             this.setMoveFunction(GameBoardClass, iteratorPiece);
             if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
             if(iteratorPiece.column < 7){
                 iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row][iteratorPiece.column + 1];
             }
             else {break}
         }
       }
       //left
       if(this.column > 0)
       {
         var iteratorPiece = GameBoardClass.GameBoard[this.row][this.column - 1];
         while(iteratorPiece.color != this.color){//for every piece up and to the right
             this.setMoveFunction(GameBoardClass, iteratorPiece);
             if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
             if(iteratorPiece.column > 0){
                 iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row][iteratorPiece.column - 1];
             }
             else {break}
         }
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
            return './img/bishop_white.svg';
        }
        else{
            return './img/bishop_black.svg';
        }
    }

    /**
     * method that runs when a piece is clicked, figures out what buttons to add the move script to
     * @function enableValidMovements
     * @memberof Bishop
     * @param GameBoardClass GameBoard Object so we can use the GameButton and GameBoard arrays
     */
     enableValidMovements(GameBoardClass){//This method will eventually be removed, but is a template for future methods
        this.disableAllPieces(GameBoardClass);
        GameBoardClass.GameButtons[this.row][this.column].disabled = false;
        GameBoardClass.GameButtons[this.row][this.column].onclick = (() => {GameBoardClass.startTurn(this.color)});
        //this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[i][j]);
        if(this.row < 7 && this.column < 7){
            var iteratorPiece = GameBoardClass.GameBoard[this.row + 1][this.column + 1];
            while(iteratorPiece.color != this.color){//for every piece up and to the right
                this.setMoveFunction(GameBoardClass, iteratorPiece);
                if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                if(iteratorPiece.row < 7 && iteratorPiece.column < 7){
                    iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row + 1][iteratorPiece.column + 1];
                }
                else {break}

            }
        }
        if(this.row >0 && this.column < 7){
            var iteratorPiece = GameBoardClass.GameBoard[this.row - 1][this.column + 1];
            while(iteratorPiece.color != this.color){//for every piece up and to the right
                this.setMoveFunction(GameBoardClass, iteratorPiece);
                if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                if(iteratorPiece.row >0 && iteratorPiece.column < 7){
                    iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row - 1][iteratorPiece.column + 1];
                }
                else {break}

            }
        }
        if(this.row < 7 && this.column >0){
            var iteratorPiece = GameBoardClass.GameBoard[this.row + 1][this.column - 1];
            while(iteratorPiece.color != this.color){//for every piece up and to the right
                this.setMoveFunction(GameBoardClass, iteratorPiece);
                if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                if(iteratorPiece.row < 7 && iteratorPiece.column >0){
                    iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row + 1][iteratorPiece.column - 1];
                }
                else {break}

            }
        }
        if(this.row >0 && this.column >0){
            var iteratorPiece = GameBoardClass.GameBoard[this.row - 1][this.column - 1];
            while(iteratorPiece.color != this.color){//for every piece up and to the right
                this.setMoveFunction(GameBoardClass, iteratorPiece);
                if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                if(iteratorPiece.row >0 && iteratorPiece.column >0){
                    iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row - 1][iteratorPiece.column - 1];
                }
                else {break}

            }
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
            return './img/queen_white.svg';
        }
        else{
            return './img/queen_black.svg';
        }
    }
        /**
     * method that runs when a piece is clicked, figures out what buttons to add the move script to
     * @function enableValidMovements
     * @memberof Bishop
     * @param GameBoardClass GameBoard Object so we can use the GameButton and GameBoard arrays
     */
         enableValidMovements(GameBoardClass){//This method will eventually be removed, but is a template for future methods
            this.disableAllPieces(GameBoardClass);
            GameBoardClass.GameButtons[this.row][this.column].disabled = false;
            GameBoardClass.GameButtons[this.row][this.column].onclick = (() => {GameBoardClass.startTurn(this.color)});
            if(this.row < 7 && this.column < 7){
                var iteratorPiece = GameBoardClass.GameBoard[this.row + 1][this.column + 1];
                while(iteratorPiece.color != this.color){//for every piece up and to the right
                    this.setMoveFunction(GameBoardClass, iteratorPiece);
                    if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                    if(iteratorPiece.row < 7 && iteratorPiece.column < 7){
                        iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row + 1][iteratorPiece.column + 1];
                    }
                    else {break}
    
                }
            }
            if(this.row >0 && this.column < 7){
                var iteratorPiece = GameBoardClass.GameBoard[this.row - 1][this.column + 1];
                while(iteratorPiece.color != this.color){//for every piece down and to the right
                    this.setMoveFunction(GameBoardClass, iteratorPiece);
                    if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                    if(iteratorPiece.row >0 && iteratorPiece.column < 7){
                        iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row - 1][iteratorPiece.column + 1];
                    }
                    else {break}
    
                }
            }
            if(this.row < 7 && this.column >0){
                var iteratorPiece = GameBoardClass.GameBoard[this.row + 1][this.column - 1];
                while(iteratorPiece.color != this.color){//for every piece up and to the left
                    this.setMoveFunction(GameBoardClass, iteratorPiece);
                    if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                    if(iteratorPiece.row < 7 && iteratorPiece.column >0){
                        iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row + 1][iteratorPiece.column - 1];
                    }
                    else {break}
    
                }
            }
            if(this.row >0 && this.column >0){
                var iteratorPiece = GameBoardClass.GameBoard[this.row - 1][this.column - 1];
                while(iteratorPiece.color != this.color){//for every piece up and to the right
                    this.setMoveFunction(GameBoardClass, iteratorPiece);
                    if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                    if(iteratorPiece.row >0 && iteratorPiece.column >0){
                        iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row - 1][iteratorPiece.column - 1];
                    }
                    else {break}
    
                }
            }
            //up
            if(this.row < 7)
            {
                var iteratorPiece = GameBoardClass.GameBoard[this.row + 1][this.column];
                while(iteratorPiece.color != this.color){
                    this.setMoveFunction(GameBoardClass, iteratorPiece);
                    if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                    if(iteratorPiece.row < 7){
                        iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row + 1][iteratorPiece.column];
                    }
                    else {break}
                }
            }
            //down
            if(this.row > 0)
            {
                var iteratorPiece = GameBoardClass.GameBoard[this.row - 1][this.column];
                while(iteratorPiece.color != this.color){//for every piece up and to the right
                    this.setMoveFunction(GameBoardClass, iteratorPiece);
                    if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                    if(iteratorPiece.row > 0){
                        iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row - 1][iteratorPiece.column];
                    }
                    else {break}
                }
            }
            //right
            if(this.column < 7)
            {
                var iteratorPiece = GameBoardClass.GameBoard[this.row][this.column + 1];
                while(iteratorPiece.color != this.color){//for every piece up and to the right
                    this.setMoveFunction(GameBoardClass, iteratorPiece);
                    if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                    if(iteratorPiece.column < 7){
                        iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row][iteratorPiece.column + 1];
                    }
                    else {break}
                }
            }
            //left
            if(this.column > 0)
            {
                var iteratorPiece = GameBoardClass.GameBoard[this.row][this.column - 1];
                while(iteratorPiece.color != this.color){//for every piece up and to the right
                    this.setMoveFunction(GameBoardClass, iteratorPiece);
                    if(iteratorPiece.color == this.getOppositeColor(this)){ break; }
                    if(iteratorPiece.column > 0){
                        iteratorPiece = GameBoardClass.GameBoard[iteratorPiece.row][iteratorPiece.column - 1];
                    }
                    else {break}
                }
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
            return './img/king_white.svg';
        }
        else{
            return './img/king_black.svg';
        }
    }
    /**
     * method that runs when a piece is clicked, figures out what buttons to add the move script to
     * @function enableValidMovements
     * @memberof Bishop
     * @param GameBoardClass GameBoard Object so we can use the GameButton and GameBoard arrays
     */
     enableValidMovements(GameBoardClass){//This method will eventually be removed, but is a template for future methods
        this.disableAllPieces(GameBoardClass);
        GameBoardClass.GameButtons[this.row][this.column].disabled = false;
        GameBoardClass.GameButtons[this.row][this.column].onclick = (() => {GameBoardClass.startTurn(this.color)});
        //up...
        if(this.row+1 <= 7)
        {
          if(GameBoardClass.GameBoard[this.row+1][this.column].color != this.color){
            this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column]);
          }
          //...and to the right
          if(this.column+1 <= 7)
          {
            if(GameBoardClass.GameBoard[this.row+1][this.column+1].color != this.color){
              this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column+1]);
            }
          }
          //...and to the left
          if(this.column-1 >= 0)
          {
            if(GameBoardClass.GameBoard[this.row+1][this.column-1].color != this.color){
              this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row+1][this.column-1]);
            }
          }
        }
        //down
        if(this.row-1 >= 0)
        {
          if(GameBoardClass.GameBoard[this.row-1][this.column].color != this.color){
            this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column]);
          }
          //...and to the right
          if(this.column+1 <= 7)
          {
            if(GameBoardClass.GameBoard[this.row-1][this.column+1].color != this.color){
              this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column+1]);
            }
          }
          //...and to the left
          if(this.column-1 >= 0)
          {
            if(GameBoardClass.GameBoard[this.row-1][this.column-1].color != this.color){
              this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row-1][this.column-1]);
            }
          }
        }
        //right
        if(this.column+1 <= 7)
        {
          if(GameBoardClass.GameBoard[this.row][this.column+1].color != this.color){
            this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row][this.column+1]);
          }
        }
        //left
        if(this.column-1 >= 0)
        {
          if(GameBoardClass.GameBoard[this.row][this.column-1].color != this.color){
            this.setMoveFunction(GameBoardClass, GameBoardClass.GameBoard[this.row][this.column-1]);
          }
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
