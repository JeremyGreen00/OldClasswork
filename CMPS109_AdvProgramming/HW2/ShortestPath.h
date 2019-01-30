//-----------------------------------------------------------------------------
// HW2
// ShortestPath.h
// Figures out the quickest point from u to w via DIJKSTRA
//-----------------------------------------------------------------------------
#pragma once
#include <string>
#include "Graph.h"

using namespace std;

class ShortestPath
{
public:
	ShortestPath(Graph&);						// constructor
	~ShortestPath();
	string path(int u, int w);					// find shortest path between u - w and returns the sequence 
												// of vertices representing shorest path u - v1 - v2 - … - vn - w.
	double path_size(int u, int w);				// return the path cost associated with the shortest path.
	void reset_Graph(Graph&);					// sets a new graph to plot

private:
	int minIndex(int[]);						// helper function returns smallest value of list
	vector<int> list;							// used to contain list of tested vertecies during Dijkstra 
												// as well as final path
	double cost;								// cost of most recent found path
	Graph* graph;								// pointer to the graph object
};

