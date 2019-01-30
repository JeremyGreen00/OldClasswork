Work done:
Built a Hex game board as a class. Tested with a random number generator in Hex.cpp.
The HexBoard class is currently capable of:
-Placing pieces on the board, returns true for successful placement, false if otherwise (space occupied, out of bounds, etc).
-Checking which piece is on which hex.
-Checking if a player has won the game. Currently it checks every time a piece is placed.
After rigorous testing I have gotten it to a point where it is accurate on every run.
There is also a function to print the last checked path, including the winning path.

What I learned:
I have mostly strengthend my knowledge on greedy algorithms, such as Dijkstra or shortest
path. Eviedent as I wrote a somewhat ludicrous recursive function as the core for 
calculating the winning path. I've also been looking for more chances to utilize the 
standard template library.

NOTE TO PEER GRADERS:
This current version of the code has not yet produced any wrong outputs. However if
you encounter some please let me know in the comments.

Also the printPath function prints the WHOLE trail, not the direct winning path.
Currently it only exists for debugging purposes and to help locate the winning path.
This will probably change by the next assignment.
