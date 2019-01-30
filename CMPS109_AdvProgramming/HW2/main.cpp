//-----------------------------------------------------------------------------
// HW2
// main.cpp
// Generates graph to demonstrate Dijkstra method
//-----------------------------------------------------------------------------

#include <iostream>
#include <vector>
#include <string>
#include <random>
#include "Graph.h"
#include "ShortestPath.h"

using namespace std;

int main()
{
	// 20%
	Graph G = Graph(50,0.2,1,10);

	ShortestPath path(G);

	cout << G << "\nedges:" << G.get_E() << "\nvectors: " << G.get_V();

	cout << endl;

	for (int i=1; i<50;i++)
	{
		cout << "\npath 0 to " << i << ": ";
		cout << path.path(0, i);
		cout << "\tcost to travel = " << path.path_size(0,i);
	}

	// 40%
	Graph J = Graph(50, 0.4, 1, 10);

	path.reset_Graph(J);

	cout << J << "\nedges:" << J.get_E() << "\nvectors: " << J.get_V();

	cout << endl;

	for (int i = 1; i<50;i++)
	{
		cout << "\npath 0 to " << i << ": ";
		cout << path.path(0, i);
		cout << "\tcost to travel = " << path.path_size(0, i);
	}

	cout << endl;
	return 0;
}