//-----------------------------------------------------------------------------
// HW5 : Jeremy Green
// HexBoard.h
// Class contains board and functionallity to check for a winner
//-----------------------------------------------------------------------------

#include <iostream>
#include <string>
#include <array>
#include <vector>

using namespace std;

#pragma once
class HexBoard
{
public:
	HexBoard();
    HexBoard(int);
    ~HexBoard();
    bool addPiece(int = 0, int = 0, char = 'R');                    // Adds either 'R' or 'B' to location
    char getPiece(int = 0, int = 0);                                // Returns char of piece at location
    char winner() { return victor; }                                // returns char of winner or '0'
    void clearBoard();												// resets game

    bool isWinner() { return win; }                                 // Returns true if someone won
    int length() { return size; }                                   // Redundant function. may be usful later

    // Prints last path explored. Should help with checking winner
    void printPath() { for (auto i : checked) cout << "(" << i.first << ", " << i.second << ")\n"; }//temp
    
    friend ostream& operator<<(ostream&, const HexBoard&);          // an easy way of displaying the entire hex board
private:
    int scanForCharIndex(int,int,bool,char);                        // retirons index of char on either row or col
    bool checkNeighbor(int,int,char,bool,bool,bool,bool,bool,bool); // complicated recursivee function
    char checkWinnerB();                                            // Checks if red won!   
    char checkWinnerR();                                            // Checks if red won!

    bool win = false;                                               // Is there a winner?
    char victor = '0';                                              // Stores char of whoever won. '0' in place of null
    vector<pair<int, int>> checked;                                 // Stores values of path walked
	int size;

    // GAME BOARD
	vector<string> map;
    
	/*array<string, 23> EXAMPLE_BOARD {
        "                             11__1\n",                                             //0
        "                          10__/  \\__2\n",                                         //1
        "                        9__/  \\__/  \\__3\n",                                     //2
        "                     8__/  \\__/  \\__/  \\__4\n",                                 //3
        "                  7__/  \\__/  \\__/  \\__/  \\__5\n",                             //4
        "               6__/  \\__/  \\__/  \\__/  \\__/  \\__6\n",                         //5
        "            5__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__7\n",                     //6
        "         4__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__8\n",                 //7
        "      3__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__9\n",             //8
        "   2__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__10\n",        //9
        "1__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__11\n",    //10
        "/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\ \n",   //11
        "\\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/\n",    //12
        "   \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/\n",        //13
        "      \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/\n",            //14
        "         \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/\n",                //15
        "            \\__/  \\__/  \\__/  \\__/  \\__/  \\__/  \\__/ \n",                   //16
        "               \\__/  \\__/  \\__/  \\__/  \\__/  \\__/ \n",                       //17
        "                  \\__/  \\__/  \\__/  \\__/  \\__/ \n",                           //18
        "                     \\__/  \\__/  \\__/  \\__/ \n",                               //19
        "                        \\__/  \\__/  \\__/ \n",                                   //20
        "                           \\__/  \\__/ \n",                                       //21
        "                              \\__/\n" };                                          //22*/
};

