Work done:
Built a Computer Ai class that reads in move information simultanously with hexBoard
and determines a good position to move to. It does this with a map of values that determine
good positions that the computer may choose from . Then it builds a tree that simulates
potential future board positions. Then it runs alpha beta on this tree to determine the
path with the most desirable outcome. It returns the move could potentially kick off this
optimal path

What I learned:
How alpha beta trees are more efficent than min max trees

NOTE TO PEER GRADERS:
The genius method described above doesn't actually give an intelligent oppenent in its current state.
The issue is that I haven't found a system for building a decent valueMap that the oppenent can glean 
useful information from for predicting future moves.
Also my current method of determining if a game state is optimal isn't very good either.
(Just adds all the potential values and see which is bigger).

I will be continuing to work on this, but with the deadline I just had to get what I have turned in.
