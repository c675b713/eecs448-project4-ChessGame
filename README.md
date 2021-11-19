# eecs448-project4-ChessGame

This is a game of chess! To start a game, you will need to start a local server. This can be done by cloning the repo, navigating to the repo in a terminal, and using this line:

python3 -m http.server 8000

You will need to have python3 installed for this. After that, go to this address in a browser:

 http://localhost:8000/
 
And now you can dominate your opponents with your wit! Have fun!

A few things about testing: There is a button in the lower left corner that activates the test suite. The results of the test suite are shown in the console, and once you have ran the test suite you need to click the new game button. This is because the test suite needs to manipulate the board, and once it has ran, the board will NOT be in its initial configuration.
