//-----------------------------------------------------------------------------
// HW3 : Jeremy Green
// main.cpp
// Generates graph to demonstrate Dijkstra method
//-----------------------------------------------------------------------------

#include <iostream>
#include <vector>
#include <string>
#include <random>
#include "Graph.h"
#include "MST.h"

using namespace std;

int main()
{
	//test graph with 10 nodes
	Graph G = Graph(10);

	G.add(0, 1, 2);
	G.add(0, 7, 4);
	G.add(1, 2, 4);
	G.add(1, 8, 3);
	G.add(2, 3, 5);
	G.add(2, 9, 6);
	G.add(3, 4, 7);
	G.add(4, 5, 8);
	G.add(5, 6, 5);
	G.add(5, 9, 6);
	G.add(6, 7, 2);
	G.add(6, 9, 1);

	//Expected output
	/*Path:
        0->1:	cost = 2
        1->8:	cost = 3
        1->2:	cost = 4
        0->7:	cost = 4
        7->6:	cost = 2
        6->9:	cost = 1
        6->5:	cost = 5
        2->3:	cost = 5
        3->4:	cost = 7
	Total cost: 33*/
	//Check included graph for verification

	MST tree(G);

	cout << "Graph:\n" << G << "\nedges:" << G.get_E() << "\nvectors: " << G.get_V();

	cout << "\n\nMinimum tree path!:\n" << tree << endl;

	cout << endl;

	Graph J = Graph(100,0.4,1,100);

	tree.calc_mst(J);

		//NOTE TO GRADER: the following line is commented out as the graph is huge
	//cout << "Graph:\n" << J << "\nedges:" << J.get_E() << "\nvectors: " << J.get_V();

	cout << "\n\nMinimum tree path!:\n" << tree << endl;

	cout << endl;

	return 0;
}