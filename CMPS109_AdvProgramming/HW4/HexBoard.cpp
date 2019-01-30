//-----------------------------------------------------------------------------
// HW4 : Jeremy Green
// HexBoard.cpp
// Class contains board and functionallity to check for a winner
//-----------------------------------------------------------------------------
#include "HexBoard.h"



HexBoard::HexBoard()
{
}


HexBoard::~HexBoard()
{
}

    // Adds a piece to board if possible. Then checks if winning move
bool HexBoard::addPiece(int x, int y, char c)
{
    if (x < 1 || y < 1 || x>11 || y> 11 || (c!='R' && c!='B')) return false;

    int xpos = (x - 1) * 3 + (y - 1) * 3 + 2;
    int ypos = (11 - x + y);

    if(map[ypos][xpos] == ' ') map[ypos][xpos] = c;
    else return false;

    if (c == 'B') victor = checkWinnerB();
    if (c == 'R') victor = checkWinnerR();
    if (victor != '0') win = true;

    return true;
}

    // Returns character of random piece
char HexBoard::getPiece(int x, int y)
{
    if (x < 1 || y < 1 || x>11 || y> 11) return '0';

    int xpos = (x - 1) * 3 + (y - 1) * 3 + 2;
    int ypos = (11 - x + y);

    return map[ypos][xpos];
}

    // an easy way of displaying the entire hex board
ostream& operator<<(ostream& os, const HexBoard& h)
{
    for (int i = 0; i < h.map.size(); i++) os << h.map[i];

    return os;
}

    // resets the board
void HexBoard::clearBoard()
{
    win = false;
    victor = '0';
    checked.clear();
    map = {
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
        "                              \\__/\n" };                                          //22
}


//*******************************************************************************//
//
//
//PRIVATE HELPER FUNCTIONS
//
//
//*******************************************************************************//

// Scans for character c on board: 
    // in = index from 1-11 to scan from (wether it is row or col depends on bool)
    // start = point to start scanning from, can be from 1- 10
    // row_scan = chooses wether to scan a row from index in (otherwise scan from top to bottom)
    // c = character to search for. Must be 'R' or 'B'
int HexBoard::scanForCharIndex(int in,int start,bool row_scan, char c)
{
    if (row_scan) // scans col from up to down
    {
        for (int i = start; i <= 11; i++)
        {
            if (getPiece(in,i)==c) return i;
        }
    }
    else  // scans row from left to right
    {
        for (int i = start; i <= 11; i++)
        {
            if (getPiece(i, in) == c) return i;
        }
    }
    return -1;// couldn't find char
}

//*******************************************************************************//
// Recurisvely checks neighboring hexs till one reaches end
//*******************************************************************************//
bool HexBoard::checkNeighbor(int x, int y, char c, bool upRight, bool up, bool upLeft, bool downLeft, bool down, bool downRight)
{
    // this should only occure if the path loops back on itself
    for (auto i : checked) if (i == make_pair(x, y)) return false;

    // add this position to checked lists
    checked.push_back(make_pair(x, y));

    // checks if we've reached the other end
    if (x == 11 && c == 'B') return true;
    if (y == 11 && c == 'R') return true;

    // recursively check neighboring positions 
    if (upRight && getPiece(x+1,y-1)==c)
    {
        if (checkNeighbor(x + 1, y - 1, c, true, true, false, false, false, true)) return true;
    }
    if (up && getPiece(x, y - 1) == c)
    {
        if (checkNeighbor(x, y - 1, c, true, true, true, false, false, false)) return true;
    }
    if (upLeft && getPiece(x - 1, y) == c)
    {
        if (checkNeighbor(x - 1, y, c, false, true, true, true, false, false)) return true;
    }
    if (downLeft && getPiece(x - 1, y + 1) == c)
    {
        if (checkNeighbor(x - 1, y + 1, c, false, false, true, true, true, false)) return true;
    }
    if (down && getPiece(x, y + 1) == c)
    {
        if (checkNeighbor(x, y + 1, c, false, false, false, true, true, true)) return true;
    }
    if (downRight && getPiece(x + 1, y) == c)
    {
        if (checkNeighbor(x + 1, y, c, true, false, false, false, true, true)) return true;
    }

    // above paths didn't reach end :(
    return false;
}
/*
        x1__ 
      x__/uR\__
      /u \__/dR\
      \__/  \__/
      /uL\__/d \
      \__/dL\__/
         \__/
*/

//*******************************************************************************//
// Checks to see if Blue won
//*******************************************************************************//
char HexBoard::checkWinnerB()
{
    int row, col;

    // Check to see if blue won
    row = scanForCharIndex(1, 1, true, 'B');
    col = 1;

    //lets try some recursion
    do
    {
        checked.clear();

        if (checkNeighbor(col, row, 'B', true, true, false, false, false, true)) return 'B';

        row = scanForCharIndex(1, row + 1, true, 'B');
    } while (row != -1);

    return '0';
}

//*******************************************************************************//
// Checks to see if Red won
//*******************************************************************************//
char HexBoard::checkWinnerR()
{
    int row, col;

    // Check to see if red won
    col = scanForCharIndex(1, 1, false, 'R');
    row = 1;

    //lets try some recursion
    do
    {
        checked.clear();

        if (checkNeighbor(col, row, 'R', false, false, false, true, true, true)) return 'R';

        col = scanForCharIndex(1, col + 1, false, 'R');
    } while (col != -1);//

    return '0';
}