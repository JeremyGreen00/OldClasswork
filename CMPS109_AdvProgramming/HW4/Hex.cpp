//-----------------------------------------------------------------------------
// HW4 : Jeremy Green
// Hex.cpp
// Tests the hex game with a random number generator
//-----------------------------------------------------------------------------

#include <iostream>
#include <string>
#include <random>
#include <time.h>
#include "HexBoard.h"

using namespace std;

int main()
{
    HexBoard game;

    srand(time(NULL));

    int count = 0;

    // random num gen. with failsafe
    while (!game.isWinner() && count <1000000)
    {
        count++;
        game.addPiece((rand() % 11) + 1, (rand() % 11) + 1, ((count) % 2 == 1) ? 'R' : 'B');
    }

    // print results 
    cout << game << "\tThe winner is " << game.winner() << endl;

    game.printPath();

}