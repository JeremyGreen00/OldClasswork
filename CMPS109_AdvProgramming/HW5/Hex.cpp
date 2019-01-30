//-----------------------------------------------------------------------------
// HW5 : Jeremy Green
// Hex.cpp
// Tests the hex game with a random number generator
//-----------------------------------------------------------------------------

#include <iostream>
#include <string>
#include <random>
#include <time.h>
#include <vector>
#include "HexBoard.h"
#include "Hex_COM.h"

using namespace std;

int main()
{
	int boardsize = 11;
	int x, y;
    HexBoard game(boardsize);
	Hex_COM op(boardsize,4);

    srand(time(NULL));

    int count = 0;

    // random num gen. with failsafe
    while (!game.isWinner() && count <1000000)
    {
		if (count % 2 == 0)
		{
			//player move
			cout << game << "\nYour move (x y): ";
			cin >> x >> y;
			cin.ignore(INT_MAX,'\n');
			cin.clear();
		}
		else
		{
			//computer move
			op.COM_MOVE(x, y);
		}
		if (game.addPiece(x, y, ((count) % 2 == 0) ? 'R' : 'B'))
			count++;
		else if (count % 2 == 0)
			cout << "ILLEGAL MOVE\n";
    }

    // print results 
    cout << game << "\tThe winner is " << game.winner() << endl;

    game.printPath();

}