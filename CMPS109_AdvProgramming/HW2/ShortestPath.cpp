//-----------------------------------------------------------------------------
// HW2
// ShortestPath.cpp
// Figures out the quickest point from u to w via DIJKSTRA
//-----------------------------------------------------------------------------
#include <algorithm>
#include <string>
#include "ShortestPath.h"


// constructor
ShortestPath::ShortestPath(Graph & G)
{
	cost = 0;
	graph = &G;
}


ShortestPath::~ShortestPath()
{
}

// find shortest path between u - w and returns the sequence 
// of vertices representing shorest path u - v1 - v2 - … - vn - w.
string ShortestPath::path(int u, int w)
{
		// clear previous data to create new path
	list.clear();
	cost = 0;

		// declare necessary variables
	int* dist = new int[graph->get_V()];
	int* prev = new int[graph->get_V()];
	string s = "";

		// init
	for (int j = 0;j < graph->get_V(); j++)
	{
		list.push_back(j);
		dist[j] = (25500);
		prev[j] = -1;
	}

		// since we're starting at u and heading to w,
		// it makes sense that the distance from u to the start is 0
	dist[u] = 0;

		// loop runs until either we reach our destination or run out of paths to explore
	do
	{
		u = minIndex(dist);

		list.erase(find(list.begin(), list.end(), u));

		int* pos = graph->neighbors(u);

		for (int j=0;j<graph->num_neighbors(u) && pos[j]!=u; j++)
		{
			double alt = dist[u] + graph->get_edge_value(u, pos[j]);	
				//is the alternate route quicker?
			if (alt < dist[pos[j]])									
			{
				dist[pos[j]] = alt;
				prev[pos[j]] = u;
			}
		}
	} while (u!=w && !list.empty());

		// clear list again. This time we'll build it into the quickest route if found
	list.clear();
	while (prev[u]!=-1)
	{
		list.push_back(u);
		cost += graph->get_edge_value(u, prev[u]);
		u = prev[u];
	}
	list.push_back(u);

		//creates string for return
	for (int j = list.size()-1;j >= 0; j--) s += "-" + to_string(list[j]);

	delete dist;
	delete prev;

	return s;
}

void ShortestPath::reset_Graph(Graph& G)
{
	graph = &G;
}

// return the path cost associated with the shortest path.
double ShortestPath::path_size(int u, int w)
{
	return cost;
}
// private helper function that returns lowest distance of whatever remains in list
int ShortestPath::minIndex(int a[])
{
	int m = list[0];
	for (int i=1; i<list.size(); i++)
	{
		if (a[m] > a[list[i]]) m = list[i];
	}
	return m;
}