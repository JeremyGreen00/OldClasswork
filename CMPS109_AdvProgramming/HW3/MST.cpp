//-----------------------------------------------------------------------------
// HW3
// MST.cpp
// Calculates min span tree from graph using prim's method
//-----------------------------------------------------------------------------
#include "MST.h"

MST::MST()
{

}

MST::MST(Graph G, int start_node)
{
	calc_mst(G,start_node);
}


MST::~MST()
{
	checked.clear();
}

//checks to see if node doesn't exists on checked list 
bool MST::unused_node(int v)
{

	for (int i = 0; i < checked.size(); i++) if (v==checked[i]) return false;

	return true;
}

//gets the smallest edge from G, ignoring checked nodes
double MST::smallest_edge(Graph G,int& ptx, int& pty)
{
	double min_edge = INFINITY;
	
	//check all nodes backwards from last add node to tree
	for (int i = checked.size()-1; i >= 0; i--)
	{
		//get all adjacent nodes (gonna have to filter out nodes already added)
		int* adj = G.neighbors(checked[i]);

		//loops through each adjacent value
		for (int j = 0; G.get_edge_value(checked[i], adj[j]) != -1; j++)
		{
			//don't want to recalculate edge value for each check
			double check_edge_value = G.get_edge_value(checked[i], adj[j]);

			//cout << "\t\tChecking checked against " << adj[j] << " edge val = " << check_edge_value << endl;

			//check if better edge value and if 'to' node has already been used
			if (min_edge > check_edge_value && unused_node(adj[j]))
			{
				min_edge = check_edge_value;
				ptx = checked[i];
				pty = adj[j];
			}
		}
		//safely remove pointer data
		delete adj;
	}

	return min_edge;
}

//calculates minimum spanning tree
bool MST::calc_mst(Graph G,int start)
{
	checked.clear();
	origin.clear();
	edges.clear();
	checked.push_back(start);
	cost = 0;

	int x = 0, y = 0;

	while (checked.size()<G.get_V() && cost != INFINITY)
	{
		edges.push_back(smallest_edge(G, x, y));
		cost += edges[edges.size()-1];
		origin.push_back(x);
		checked.push_back(y);
	}

	return (cost != INFINITY);
}

// an easy way of displaying the entire tree
ostream& operator<<(ostream& os, MST mst)
{
	os << "Path:\n";
	for (int i=0; i<mst.origin.size(); i++)
	{
		os << "\t" << mst.origin[i] << "->" << mst.checked[i + 1] <<
			":\tcost = " << mst.edges[i] << endl;
	}
	os << "Total cost: " << mst.cost;

	return os;
}