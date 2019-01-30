//-----------------------------------------------------------------------------
// HW5 : Jeremy Green
// HexBoard.cpp
// Class contains board and functionallity to check for a winner
//-----------------------------------------------------------------------------
#include "HexBoard.h"


HexBoard::HexBoard()
{
	size = 11;
	map.resize(size * 2 + 1);

	clearBoard();
}

HexBoard::HexBoard(int n = 11)
{
	size = n;
	map.resize(n * 2 + 1);

	clearBoard();
}


HexBoard::~HexBoard()
{
}

    // Adds a piece to board if possible. Then checks if winning move
bool HexBoard::addPiece(int x, int y, char c)
{
    if (x < 1 || y < 1 || x>size || y> size || (c!='R' && c!='B')) return false;

    int xpos = (x - 1) * 3 + (y - 1) * 3 + 2;
    int ypos = (size - x + y);

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
    if (x < 1 || y < 1 || x>size || y> size) return '0';

    int xpos = (x - 1) * 3 + (y - 1) * 3 + 2;
    int ypos = (size - x + y);

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

	int n = map.size() / 2;
		// looks complicated, just builds board from scratch depending on size
	for (int it = 0; it<map.size() / 2; it++)
	{
		int dfc = abs(it - n);	// Distance from center
		string s = "";
		string sb = "";
		for (int i = 2; i < dfc; i++)
		{
			s += "   ";
			sb += "   ";
		}
		if (dfc != 1)
		{
			if (dfc >= 100)		s += "R";
			else if (dfc >= 10)	s += "R ";
			else                s += " R ";
			map[map.size() / 2] += "/  \\__";
			map[map.size() / 2 + 1] += "\\__/  ";
			sb += "   ";
		}
		s += to_string(dfc);

		s += "__";
		for (int i = 0; i < it; i++)
		{
			s += "/  \\__";
			sb += "\\__/  ";
		}
		s += " " + to_string(it + 1) + " B\n";
		if (dfc != 1) sb += "\\__/\n";

		map[it] = s;
		map[map.size() - it - 1] = sb;
	}
	map[map.size() / 2] += "/  \\\n";
	map[map.size() / 2 + 1] += "\\__/\n";
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
        for (int i = start; i <= size; i++)
        {
            if (getPiece(in,i)==c) return i;
        }
    }
    else  // scans row from left to right
    {
        for (int i = start; i <= size; i++)
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
    if (x == size && c == 'B') return true;
    if (y == size && c == 'R') return true;

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