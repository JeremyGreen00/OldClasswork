//-----------------------------------------------------------------------------
// HW5 : Jeremy Green
// Hex_COM.cpp
// Class contains com that determines good moves
//-----------------------------------------------------------------------------

#include "Hex_COM.h"

using namespace std;

//
Hex_COM::Hex_COM(int n = 11, int n_depth = 4)
{
	bsize = n;
	Depth = n_depth;

	table.resize(n);

	for (int i = 0; i < n; i++)
	{
		table[i].resize(n);
		for (int j = 0; j < n; j++)
		{
			table[i][j] = 1;// +abs(i - (n / 2));// -abs(j - (n / 2)) + 1;
		}
	}

	Head = Node(table,n,-1,-1,false);
}


Hex_COM::~Hex_COM()
{
}

// Chooses a postition to move
void Hex_COM::COM_MOVE(int& x, int& y)
{
	Head.addtomap(x-1,y-1,false);
	Head.remove_child();
	buildTree(Head, Depth,false);

	int a = alphabeta(Head,Depth,0,0,true);

	bool l = false;
	Head.findcoord(x, y, a, l);
	//x = potx + 1;
	//y = poty + 1;
	cout << "opponent move: " << x << " " << y << endl;

	Head.addtomap(x-1, y-1, true);

	/*string s = "\n";
	for (auto i : Head.valueMap)
	{
		cout << s;
		for (auto j : i)
			cout << j << " ";
		s += " ";
	}*/

}

//*******************************************************************************//
//
//
//PRIVATE HELPER FUNCTIONS
//
//
//*******************************************************************************//

// Chooses the best outcome from leaf nodes. Used for determining position
int Hex_COM::alphabeta(Node &n, int d, int a, int B, bool maximizingPlayer)//problem here?
{
	if (d == 0 || n.has_child() == false)
	{
		return n.get_v();
	}
	if (maximizingPlayer)
	{
		int v = -1000000;
		for (auto i:n.Child)
		{
			v = max(v, alphabeta(*i, d - 1, a, B, false));
			a = max(a, v);
			if (B <= a)
				break;
		}
		if (n.value != Head.value)
		{
			potx = n.X;
			poty = n.Y;
			//cout << "\t\t\tpotx and poty" << potx << " " << poty << endl;
		}
		return v;
	}
	else
	{
		int v = 1000000;
		for (auto i : n.Child)
		{
			v = min(v, alphabeta(*i, d - 1, a, B, true));
			B = min(B, v);
			if (B <= a)
				break;
		}
		if (n.value != Head.value)
		{
			potx = n.X;
			poty = n.Y;
			//cout << "\t\t\tpotx and poty" << potx << " " << poty << endl;
		}
		return v;
	}
}

// Builds the tree based on 4 possible moves. 
//(1) at random, (2) Highest value move, (3) lowest value move (4) second highest
void Hex_COM::buildTree(Node &n,int d,bool sub)
{
	if (d > 0)
	{
		pair<int, int> move1, move2, move3, move4;

		vector<vector<int>> v = n.valueMap;

		int temp = 0;
		do
		{
			temp++;
			move1.first = (rand() % bsize);
			move1.second = (rand() % bsize);
		} while (v[(move1.second)][(move1.first)] == 0 && temp<1000000);

		temp = 0;
		int greatest = 0;

		for (int i = 0; i < bsize; i++)
		{
			for (int j = 0; j < bsize; j++)
			{
				if (v[i][j] > temp && v[i][j] != 0)
				{
					greatest = temp = v[i][j];
					move2.first = i;
					move2.second = j;
				}
			}
		}
		for (int i = 0; i < bsize; i++)
		{
			for (int j = 0; j < bsize; j++)
			{
				if (v[i][j] < temp && v[i][j] != 0)
				{
					temp = v[i][j];
					move3.first = i;
					move3.second = j;
				}
			}
		}
		for (int i = 0; i < bsize; i++)
		{
			for (int j = 0; j < bsize; j++)
			{
				if (v[i][j] > temp && v[i][j] != 0 && v[i][j] != greatest)
				{
					temp = v[i][j];
					move4.first = i;
					move4.second = j;
				}
			}
		}
		//cout << "\tmove1: " << move1.first << " " << move1.second << endl;
		//cout << "\tmove2: " << move2.first << " " << move2.second << endl;
		//cout << "\tmove3: " << move3.first << " " << move3.second << endl;
		//cout << "\tmove4: " << move4.first << " " << move4.second << endl;
		n.add_child(move2.first, move2.second, sub);
		n.add_child(move3.first, move3.second, sub);
		n.add_child(move4.first, move4.second, sub);
		n.add_child(move1.first, move1.second, sub);

		buildTree(*n.Child[0], d - 1, !sub);
		buildTree(*n.Child[1], d - 1, !sub);
		buildTree(*n.Child[2], d - 1, !sub);
		buildTree(*n.Child[3], d - 1, !sub);
	}
	

}


//*******************************************************************************//
//
//
//PRIVATE NODE HELPER CLASS
//
//
//*******************************************************************************//
// isn't used
Hex_COM::Node::Node()
{
}
// default constructor sets node variables
Hex_COM::Node::Node(vector<vector<int>> v, int b, int x,int y,bool sub)
{
	X = x; 
	Y = y;
	//cout << "\t\tX and Y: " << X << " " << Y << endl;
	BoardSize = b;
	valueMap = v;
	valueMap.resize(b);
	for (int i = 0; i < BoardSize; i++)
	{
		valueMap[i].resize(b);
		for (int j = 0; j < BoardSize; j++)
		{
			valueMap[i][j] = v[i][j];
		}
	}
	addtomap(x, y, sub);

	value = 0;

	for (int i = 0; i < BoardSize*BoardSize; i++)
		value += valueMap[i%BoardSize][i/ BoardSize];
}
// destructor
Hex_COM::Node::~Node()
{
	for (auto i : Child)
	{
		delete i;
		i = NULL;
	}
	Child.clear();
}
// returns value which is object index
int Hex_COM::Node::get_v()
{
	return value;
}
// returns a node value based on index i
bool Hex_COM::Node::has_child()
{
	return !Child.empty();
}
// adds a new connection
void Hex_COM::Node::add_child(int x, int y, bool sub)// problem here?
{
	//cout << "Entering add_Child\n";
	Node* n = new Node(valueMap, BoardSize, x, y, sub);
	Child.push_back(n);
}
// removes a connection
void Hex_COM::Node::remove_child()
{
	Child.clear();
}
// returns child of index i
Hex_COM::Node* Hex_COM::Node::getChild(int i)
{
	if (i<0 || i>=Child.size()) return nullptr;
	return Child[i];
}

// adds position to value map and changes the desirability of certain moves
void Hex_COM::Node::addtomap(int x, int y, bool me)	//fix
{
	if (y >= 0 && y<BoardSize && x >= 0 && x<BoardSize && valueMap[x][y] != 0)
	{
		bool offset = true;
		int t = valueMap[x][y];
		//if ((!me && t>0) || (me && t<0)) t = t*(-1);	//subtract value if enemey piece
		if (y != 0 && valueMap[x][(y - 1)] != 0 && y != 0)
		{
			valueMap[x][(y - 1)] += t;
			if (valueMap[x][(y - 1)] == 0) valueMap[x][(y - 1)] = -1;
			offset = false;
		}
		if (offset && y != BoardSize - 1 && valueMap[x][(y + 1)] != 0)
		{
			valueMap[x][(y + 1)] += t;
			if (valueMap[x][(y + 1)] == 0) valueMap[x][(y + 1)] = -1;
		}
		if (offset && x != 0 && valueMap[x - 1][(y)] != 0)
		{
			valueMap[x - 1][(y)] += t;
			if (valueMap[x - 1][(y)] == 0) valueMap[x - 1][(y)] = -1;
		}
		if (!offset && x != BoardSize - 1 && valueMap[x + 1][(y)] != 0)
		{
			valueMap[x + 1][(y)] += t;
			if (valueMap[x + 1][(y)] == 0) valueMap[x + 1][(y)] = -1;
		}
		if (!offset && y != BoardSize - 1 && x != 0 && valueMap[x - 1][(y + 1)] != 0)
		{
			valueMap[x - 1][(y + 1)] += t;
			if (valueMap[x - 1][(y + 1)] == 0) valueMap[x - 1][(y + 1)] = -1;
		}
		if (offset && x != BoardSize - 1 && y != 0 && valueMap[x + 1][(y - 1)] != 0)
		{
			valueMap[x + 1][(y - 1)] += t;
			if (valueMap[x + 1][(y - 1)] == 0) valueMap[x + 1][(y - 1)] = -1;
		}

		/*if (valueMap[x][(y - 1)] == 0) valueMap[x][(y - 1)] = -1;
		if (valueMap[x][(y + 1)] == 0) valueMap[x][(y + 1)] = -1;
		if (valueMap[x - 1][(y)] == 0) valueMap[x - 1][(y)] = -1;
		if (valueMap[x + 1][(y)] == 0) valueMap[x + 1][(y)] = -1;
		if (valueMap[x - 1][(y + 1)] == 0) valueMap[x - 1][(y + 1)] = -1;
		if (valueMap[x + 1][(y - 1)] == 0) valueMap[x + 1][(y - 1)] = -1;*/

		valueMap[x][y] = 0;
	}
}

// finds the move in the node tree that could ultimatily lead to best outcome
void Hex_COM::Node::findcoord(int& x, int& y, int v, bool &found)
{
	if (has_child())
	{
		for (auto i : Child)
		{

			if (!found) i->findcoord(x, y, v, found);

			if (found)
			{
				x = i->X + 1;
				y = i->Y + 1;
				break;
			}
		}
		//cout << "\tValue: " << value << "\tX: " << X << "\tY: " << Y << "\tbsize: "
			//<< BoardSize << "\tvalueMap[2][3]: " << valueMap[2][3] << endl;
	}
	else
	{
		if (v == value)
		{
			found = true;
		}
	}
}