//import {GamePiece} from '/GameClasses/GamePiece.js'
//That line does nothing since it is actually included in index.html, but I am an idiot and want to specify that it is included here
class GameBoard{
    constructor(_){
        this.GameButtons = [];
        this.GameBoard = [];
        this.establishGameButtons();
        this.setUpPieces();
        this.reloadBoard();
        this.whiteCapturedPieces = [];
        this.blackCapturedPieces = [];
        this.startTurn('white');
        
    }
    /**
     * takes the buttons from the index.html and puts them into an 8x8 array
     * @function establishGameButtons
     * @memberof GameBoard
     */
    establishGameButtons(){
        //The bottom left corner is [0][0], that is why we have to do weird stuff with the bounds of the for loops.
        //SOMEONE NEEDS TO GO TO INDEX.HTML AND FLIP ALL THE COLORS, THEY ARE WRONG
        var tempArray = [];
        for(var i =1; i<=8; i++){
            for(var j=0; j<8;j++){
                tempArray.push(document.getElementById(this.numbersToLetters(j)+i));
                //alert(this.numbersToLetters(j)+i);
                document.getElementById(this.numbersToLetters(j)+i).disabled = true;
            }
            this.GameButtons.push(tempArray);
            tempArray = [];
        }
    }

    /**
     * populates the GameBoard array with the Starting configuration of Pieces
     * @function setUpPieces
     * @memberof GameBoard
     */
    setUpPieces(){
        //populates the GameBoard array with the Starting configuration of Pieces
        var tempArray = [];
        //1st rank, white's pieces
        tempArray = [new Rook('white'), new Knight('white'), new Bishop('white'), new Queen('white'), new King('white'), new Bishop('white'), new Knight('white'), new Rook('white')];
        this.GameBoard.push(tempArray);
        //second rank, white's pawns
        tempArray = [new Pawn('white'),new Pawn('white'),new Pawn('white'),new Pawn('white'),new Pawn('white'),new Pawn('white'),new Pawn('white'),new Pawn('white')];
        this.GameBoard.push(tempArray);
        
        //null pieces fill the 3-6 ranks
        for(var i = 3; i<=6; i++){
            tempArray = [new NullPiece(),new NullPiece(),new NullPiece(),new NullPiece(),new NullPiece(),new NullPiece(),new NullPiece(),new NullPiece()];
            this.GameBoard.push(tempArray);
        }

        //seventh rank, black's pawns
        tempArray = [new Pawn('black'),new Pawn('black'),new Pawn('black'),new Pawn('black'),new Pawn('black'),new Pawn('black'),new Pawn('black'),new Pawn('black')];
        this.GameBoard.push(tempArray);
        //eighth rank, black's pieces
        tempArray = [new Rook('black'), new Knight('black'), new Bishop('black'), new Queen('black'), new King('black'), new Bishop('black'), new Knight('black'), new Rook('black')];
        this.GameBoard.push(tempArray);
        
        //for the move piece algorithm to work, we need every piece to have a location
        for(var i = 0; i<8; i++){
            for(var j = 0; j<8; j++){
                this.GameBoard[i][j].setLocation(i, j);
            }
        }
    }
    /**
     * takes a number 0-7 and returns the corresponding letter
     * @function numbersToLetters
     * @memberof GameBoard
     * @param number number to be turned into letter 
     */
    numbersToLetters(number){
        switch(number){
            case 0:
                return 'a';
                break;
            case 1:
                return 'b';
                break;
            case 2:
                return 'c';
                break;
            case 3:
                return 'd';
                break;
            case 4:
                return 'e';
                break;
            case 5:
                return 'f';
                break;   
            case 6:
                return 'g';
                break;
            case 7:
                return 'h';
                break;
            default:
                break;
        }
    }
    /**
     * enables the button corresponding the piece square, then adds an onclick function to allow the piece to move
     * @function enablePieceButton
     * @memberof GameBoard
     * @param square piece that you want to enable
     */
    enablePieceButton(square){
        this.GameButtons[square.row][square.column].disabled = false;
        this.GameButtons[square.row][square.column].onclick = (() => {
            this.GameBoard[square.row][square.column].enableValidMovements(this);
        });
    }

    /**
     * disables the given button
     * @function disableButton
     * @memberof GameBoard
     * @param button button to be disabled 
     */
    disableButton(button){
        button.disabled = true;
    }

    /**
     * algorithm to move a piece to another square
     * @function movePiece
     * @memberof GameBoard
     * @param piece the piece that you want to move to destination
     * @param destination place you want to move the piece to
     */
    movePiece(piece, destination){ //both parameters will be of type piece
        //if neither are true, then the piece is a null piece, so no need to add it to the lists of captured pieces
        if(destination.color == 'black'){
            this.whiteCapturedPieces.push(destination);
        }
        else if(destination.color == 'white'){
            this.blackCapturedPieces.push(destination);
        }
        var originalRow = piece.row;
        var originalColumn = piece.column;

        this.GameBoard[destination.row][destination.column] = piece;
        //still need to tell the piece that it changed location;
        
        this.GameBoard[originalRow][originalColumn] = new NullPiece();//will need to change this syntax probably
        
        this.GameBoard[destination.row][destination.column].setLocation(destination.row, destination.column);

        this.GameBoard[originalRow][originalColumn].setLocation(originalRow, originalColumn);

        //after every move, instead of just updating those two pieces icon, we are just going to update the whole board
        this.reloadBoard();
    }

    /**
     * refreshes the images on all of the buttons to represent the current configuration of GameBoard
     * @function reloadBoard
     * @memberof GameBoard
     */
    reloadBoard(){
        //This method will take update the icon of every button in GameButtons based on its corresponding entry in GameBoard
        for(var i = 0; i<8; i++){
            for(var j = 0; j<8; j++){
                if(this.GameBoard[i][j].color == 'white' || this.GameBoard[i][j].color == 'black'){
                    this.GameButtons[i][j].innerHTML = "<img src="+this.GameBoard[i][j].getImage() + ">";
                }
                else{
                    this.GameButtons[i][j].innerHTML = "";
                }
            }
        }
    }

    /**
     * enables all the pieces of the current player
     * @function startTurn
     * @memberof GameBoard
     * @param color current player, 'white' or 'black' 
     */
    startTurn(color){
        //enable all the buttons of the current color
        var self = this;
        for(var i = 0; i<8; i++){
            for(var j = 0; j<8; j++){
                if(this.GameBoard[i][j].color == color){//enable all the buttons of the current team's color
                    this.enablePieceButton(this.GameBoard[i][j]);
                }
                else{//disable all other buttons
                    this.disableButton(this.GameButtons[i][j]);
                }
            }
        }
        
    }
}
gameboard = new GameBoard();
