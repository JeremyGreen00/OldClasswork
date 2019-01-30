//-----------------------------------------------------------------------------
// HW5 : Jeremy Green
// Hex_COM.h
// Class contains com that determines good moves
//-----------------------------------------------------------------------------

#pragma once

#include "HexBoard.h"

class Hex_COM
{
public:
	Hex_COM(int,int);
	~Hex_COM();

	void COM_MOVE(int&,int&);

private:
	class Node
	{
	public:
		Node();													// default constructor sets node to 0
		Node(vector<vector<int>>,int,int,int,bool);				// constructor sets node to v
		~Node();												// destructor
		int get_v();											// returns value
		void add_child(int,int,bool);							// adds a connection 
		void remove_child();									// removes a connection from index
		bool has_child();
		Node* getChild(int);

		void findcoord(int&,int&,int,bool&);
		void addtomap(int, int, bool);

		int value,X,Y,BoardSize;
		vector<vector<int>> valueMap;
		vector<Node*> Child;									// list nodes this one is connected to
	};

	Node Head;
	int Depth, bsize,potx,poty;
	vector<vector<int>> table;

	int alphabeta(Node&,int,int,int,bool);

	void buildTree(Node&,int,bool);

};

