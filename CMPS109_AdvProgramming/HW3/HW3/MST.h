//-----------------------------------------------------------------------------
// HW3
// MST.h
// Header for min span tree from graph using prim's method
//-----------------------------------------------------------------------------
#include "Graph.h"

#pragma once
class MST
{
public:
	MST();												//Constructor
	MST(Graph,int = 0);									//Constructor that generates tree
	~MST();												//destructor

	bool calc_mst(Graph,int = 0);						//calculates minimum spanning tree

	friend ostream& operator<<(ostream&, MST);			// an easy way of displaying the entire tree

private:
	bool unused_node(int);								//checks to see if node doesn't exists on checked list 
	double smallest_edge(Graph,int&,int&);				//gets the smallest edge from G, ignoring checked nodes

	vector<int> checked;
	vector<int> origin;
	vector<int> edges;
	double cost;
};

