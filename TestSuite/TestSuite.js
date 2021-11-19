//Test suite that runs when button is clicked
//Methods in GameBoard: 
class Suite{
    constructor(){
        this.testBoard = new GameBoard();
        this.testBoardFinal = new GameBoard();
        this.startTurnTest();
        this.movePieceTest();//first enable knight button, then move
        this.changeTurnTest();
        this.couldAttackPawnTest();
        this.couldAttackKnightTest();
        this.couldAttackRookTest();
        this.couldAttackBishopTest();
        this.couldAttackQueenTest();
        this.couldAttackKingTest();
        this.foolsMateTest();
    }

    /**
     * tests if only white's buttons are enabled
     * @function startTurnTest
     * @memberof Suite
     */
    startTurnTest(){
        var count = 0;
        for(var i = 0; i <8; i++){
            for(var j = 0; j<8; j++){
                if(i<2 && this.testBoard.GameButtons[i][j].disabled == false){//white
                    count++;
                }
                if(i<6 && i>=2 && this.testBoard.GameButtons[i][j].disabled == true){//null
                    count++;
                }
                if(i>=6 && this.testBoard.GameButtons[i][j].disabled == true){//black
                    count++;
                }
            }
        }
        console.log('TEST 1: Board buttons are initially configured correctly: ');
        if(count == 64){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
    }

    /**
     * tests if pawn (and more broadly any piece) changes location with movePiece function
     * @function movePieceTest
     * @memberof Suite
     */
    movePieceTest(){
        var count = 0;
        this.testBoard.movePiece(this.testBoard.GameBoard[1][1], this.testBoard.GameBoard[2][1]);
        console.log('TEST : Pieces move to correct piece when movePiece called:');
        if(this.testBoard.GameBoard[2][1].color == 'white' && this.testBoard.GameBoard[2][1].pieceType == 'pawn'){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
    }

    /**
     * Checks if buttons are activated correctly once turn changes
     * @function changeTurnTest
     * @memberof Suite
     */
    changeTurnTest(){
        this.testBoard.startTurn('black');
        var count = 0;
        for(var i = 0; i <8; i++){
            for(var j = 0; j<8; j++){
                if(i<2 && this.testBoard.GameButtons[i][j].disabled == true){//white
                    count++;
                }
                if(i<6 && i>=2 && this.testBoard.GameButtons[i][j].disabled == true){//null
                    count++;
                }
                if(i>=6 && this.testBoard.GameButtons[i][j].disabled == false){//black
                    count++;
                }
            }
        }
        console.log('TEST 2: Board buttons are configured correctly after player 1 makes move and turn changes:');
        if(count == 64){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
    }

    couldAttackPawnTest(){
        var count = 0;
        console.log('TEST 3: Pawn puts king in check if it is in range:')
        if(this.testBoard.GameBoard[1][3].couldAttack(this.testBoard, this.testBoard.GameBoard[2][2]) && this.testBoard.GameBoard[1][3].couldAttack(this.testBoard, this.testBoard.GameBoard[2][4])){
            count++;
        }
        if(this.testBoard.GameBoard[6][1].couldAttack(this.testBoard, this.testBoard.GameBoard[5][0]) && this.testBoard.GameBoard[6][1].couldAttack(this.testBoard, this.testBoard.GameBoard[5][2])){
            count++;
        }
        console.log("count: ", count);
        if(count == 2){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
    }

    /**
     * Checks if Knight can move to correct spot
     * @function setMoveKnightTest
     * @memberof Suite
     */
     couldAttackKnightTest(){
        var count = 0;
        console.log('TEST 4: Knights can put king in check when king is in range:');
        if(this.testBoard.GameBoard[0][1].couldAttack(this.testBoard, this.testBoard.GameBoard[2][0])){
            count++;
        }
        if(this.testBoard.GameBoard[0][1].couldAttack(this.testBoard, this.testBoard.GameBoard[2][2])){
            count++;
        }
        if(this.testBoard.GameBoard[7][1].couldAttack(this.testBoard, this.testBoard.GameBoard[5][0])){
            count++;
        }
        if(this.testBoard.GameBoard[7][1].couldAttack(this.testBoard, this.testBoard.GameBoard[5][2])){
            count++;
        }
        this.testBoard.movePiece(this.testBoard.GameBoard[0][6], this.testBoard.GameBoard[5][2]);
        this.testBoard.movePiece(this.testBoard.GameBoard[5][2], this.testBoard.GameBoard[4][4]);
        if(this.testBoard.GameBoard[4][4].couldAttack(this.testBoard, this.testBoard.GameBoard[5][6])){
            count++;
        }
        if(this.testBoard.GameBoard[4][4].couldAttack(this.testBoard, this.testBoard.GameBoard[5][2])){
            count++;
        }
        if(this.testBoard.GameBoard[4][4].couldAttack(this.testBoard, this.testBoard.GameBoard[3][2])){
            count++;
        }
        if(this.testBoard.GameBoard[4][4].couldAttack(this.testBoard, this.testBoard.GameBoard[3][6])){
            count++;
        }
        if(count == 8){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
     }

     /**
      * checks if Rook's couldAttack works
      * @function couldAttackRookTest
      * @memberof Suite
      */
     couldAttackRookTest(){
        console.log('TEST 5: Rook can attack by row and column:');
        var count = 0;
        var testRook = this.testBoard.GameBoard[3][3];
        this.testBoard.movePiece(this.testBoard.GameBoard[7][7], testRook);
        if(this.testBoard.GameBoard[3][3].couldAttack(this.testBoard, this.testBoard.GameBoard[3][7]) && this.testBoard.GameBoard[3][3].couldAttack(this.testBoard, this.testBoard.GameBoard[3][0])){
            count++;
        }
        if(this.testBoard.GameBoard[3][3].couldAttack(this.testBoard, this.testBoard.GameBoard[5][3]) && this.testBoard.GameBoard[3][3].couldAttack(this.testBoard, this.testBoard.GameBoard[2][3])){
            count++;
        }
        if(count == 2){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
     }

      /**
      * checks if Rook's couldAttack works
      * @function couldAttackRookTest
      * @memberof Suite
      */
       couldAttackBishopTest(){
        console.log('TEST 6: Bishop can attack diagonally:');
        var count = 0;
        var testBishop = this.testBoard.GameBoard[3][4];
        this.testBoard.movePiece(this.testBoard.GameBoard[1][2], this.testBoard.GameBoard[2][2]);
        this.testBoard.movePiece(this.testBoard.GameBoard[1][6], this.testBoard.GameBoard[2][6]);
        this.testBoard.movePiece(this.testBoard.GameBoard[0][5], testBishop);
        if(this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[5][2]) && this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[5][6])){
            count++;
        }
        if(this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[1][2]) && this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[1][6])){
            count++;
        }
        if(count == 2){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
     }

     /**
      * checks if Rook's couldAttack works
      * @function couldAttackQueenTest
      * @memberof Suite
      */
      couldAttackQueenTest(){
        console.log('TEST 7: Queen can attack diagonally, horizontally and vertically:');
        var count = 0;
        var testQueen = this.testBoard.GameBoard[3][4];
        this.testBoard.movePiece(this.testBoard.GameBoard[3][3], this.testBoard.GameBoard[5][3]);
        this.testBoard.movePiece(this.testBoard.GameBoard[4][4], this.testBoard.GameBoard[0][6]);
        this.testBoard.movePiece(this.testBoard.GameBoard[7][3], testQueen);
        if(this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[5][2]) && this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[5][6])){
            count++;
        }
        if(this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[1][2]) && this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[1][6])){
            count++;
        }
        if(this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[2][4]) && this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[5][4])){
            count++;
        }
        if(this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[3][0]) && this.testBoard.GameBoard[3][4].couldAttack(this.testBoard, this.testBoard.GameBoard[3][7])){
            count++;
        }
        if(count == 4){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
    }

    couldAttackKingTest(){
        var count = 0;
        console.log('TEST 8: King can attack one square in any direction');
        this.testBoard.movePiece(this.testBoard.GameBoard[7][4], this.testBoard.GameBoard[4][6]);
        if(this.testBoard.GameBoard[4][6].couldAttack(this.testBoard, this.testBoard.GameBoard[5][6]) && this.testBoard.GameBoard[4][6].couldAttack(this.testBoard, this.testBoard.GameBoard[3][6])){
            count++;
        }
        if(this.testBoard.GameBoard[4][6].couldAttack(this.testBoard, this.testBoard.GameBoard[4][5]) && this.testBoard.GameBoard[4][6].couldAttack(this.testBoard, this.testBoard.GameBoard[4][7])){
            count++;
        }
        if(this.testBoard.GameBoard[4][6].couldAttack(this.testBoard, this.testBoard.GameBoard[5][7]) && this.testBoard.GameBoard[4][6].couldAttack(this.testBoard, this.testBoard.GameBoard[3][5])){
            count++;
        }
        if(this.testBoard.GameBoard[4][6].couldAttack(this.testBoard, this.testBoard.GameBoard[3][7]) && this.testBoard.GameBoard[4][6].couldAttack(this.testBoard, this.testBoard.GameBoard[5][5])){
            count++;
        }
        if(count == 4){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
    }

    foolsMateTest(){
        this.testBoardFinal.movePiece(this.testBoardFinal.GameBoard[1][5], this.testBoardFinal.GameBoard[2][5]);
        this.testBoardFinal.movePiece(this.testBoardFinal.GameBoard[6][4], this.testBoardFinal.GameBoard[4][4]);
        this.testBoardFinal.movePiece(this.testBoardFinal.GameBoard[1][6], this.testBoardFinal.GameBoard[3][6]);
        this.testBoardFinal.movePiece(this.testBoardFinal.GameBoard[7][3], this.testBoardFinal.GameBoard[3][7]);
        var killerQueen = this.testBoardFinal.GameBoard[3][7];
        console.log("Fools mate, the shortest possible sequence of moves to checkmate, works:")
        if(killerQueen.couldAttack(this.testBoardFinal, this.testBoardFinal.GameBoard[0][4])){
            console.log('PASSED');
        }
        else{
            console.log('FAILED');
        }
    }
}