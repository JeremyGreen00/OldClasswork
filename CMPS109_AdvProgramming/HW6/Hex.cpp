//-----------------------------------------------------------------------------
// HW6 : Jeremy Green
// Hex.cpp
// Tests the hex game with a random number generator
//-----------------------------------------------------------------------------

#include <iostream>
#include <string>
#include <random>
#include <time.h>
#include <vector>
#include <thread>
#include "HexBoard.h"

using namespace std;

pair<int, int> monteCarlo(HexBoard h);

int main()
{
    int boardsize = 11;
    int x, y;
    HexBoard game(boardsize);

    int count = 0;

        // Game loop
    while (!game.isWinner())
    {
        if (count % 2 == 0)
        {
                // player move
            cout << game << "\nYour move (x y): ";
            cin >> x >> y;
            cin.ignore(2147483647,'\n');
            cin.clear();
        }
        else
        {
                // computer move
            pair<int, int> move = monteCarlo(game);
            x = move.first;
            y = move.second;
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

    // Returns total wins out of n simulations
int getWins(HexBoard h,int n, char c,int &count)
{
    HexBoard sim = h;
    count = 0;

        // Simulation loop
    for (int i = 0; i < n; i++)
    {
        sim.randomFill(i*(count+1));
        if (sim.checkWinner(c)) count++;
        sim = h;
    }
    return count;
}

    // Returns the best position
pair<int,int> monteCarlo(HexBoard h)
{
    HexBoard sim = h;
    vector<pair<int,int>> pos;
    int bestW = 0;
    int ind = 0;
    int loopi = 0;
    int w = 0;

        // push every possible move
    for (int i = 1; i <= sim.length(); i++)
    {
        for (int j = 1; j <= sim.length(); j++)
        {
            if (sim.getPiece(i, j) == ' ') pos.push_back(pair<int,int>(i,j));
        }
    }

    // Main loop
    for (auto i : pos)
    {
            // adds test piece
        sim.addPiece(i.first,i.second,'B');

            // tempw = total wins thread calculated
        int tempw = 0;
            // starts 500 simulations on a new thread (contiues code while this is runnign)
        thread t {getWins,sim,500,'B',ref(tempw)};
            // starts 500 simulations in main program
        getWins(sim,500,'B',w);

            // waits for thread to finish
        t.join();

            // w = total wins from 1000 simulations
        w += tempw;

            // does this move have a better chance of success
        if (bestW < w)
        {
            bestW = w;
            ind = loopi;
        }
            // loopi = index of moves being tested
        loopi++;
            // reset sim
        sim.setTo(h);

            // Prints dot when when move is finished processing
        cout << ".";
    }

    cout << endl;

    return pos[ind];
}