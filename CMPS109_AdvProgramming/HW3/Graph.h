//-----------------------------------------------------------------------------
// HW3
// Graph.h
// Simulates a hypothetical multi-dimensional graph using a list of edges
//-----------------------------------------------------------------------------
#pragma once
#include<iostream>
#include<vector>
using namespace std;

class Graph
{
public:
	Graph() {};
	Graph(int V_num, double density, double L_range, double U_range);	// Constructor using denisty of max edges and range for edge val.
	Graph(int V_num);											// Constructor creates V_num nodes
	Graph(int V_num, int E_num);								// Constructor creates num nodes and edges. Edges distributed randomly
	~Graph();													// Destructor

	int		get_V();											// returns the number of vertices in the graph
	int		get_E();											// returns the number of edges in the graph
	bool	adjacent(int x, int y);								// tests whether there is an edge from node x to node y.
	int*	neighbors(int x);									// lists all nodes y such that there is an edge from x to y.
	int		num_neighbors(int x);								// returns no. of neighbors among x.
	void	add(int x, int y, int v);							// adds to G the edge from x to y, if it is not there.
	void	remove(int x, int y);								// removes the edge from x to y, if it is there.
	double	get_edge_value(int x, int y);						// returns the value associated to the edge(x, y).
	void	set_edge_value(int x, int y, int v);				// sets the value associated to the edge(x, y) to v.

	friend ostream& operator<<(ostream& os, Graph G);			// an easy way of displaying the entire graph

private:
	class Node													// private class only for use in graph
	{
	public:
		Node();													// default constructor sets node to 0
		Node(int v);											// constructor sets node to v
		~Node();												// destructor
		int get_value();										// returns value or index
		void set_index(int v);									// value here must always be same as class index in vector
		int get_connection(int i);								// returns value of a connected node from index
		int get_num_connections();								// returns total connections
		void add_connection(Node);								// adds a connection (since bi-dir. apply to both)
		void remove_connection(int);							// removes a connection from index

	private:
		vector<int> connections;								// list nodes this one is connected to
		int index;												// value containing index of vecs vertex
	};

	class Edge													// private class of edge connecting 2 nodes
	{
	public:
		Edge(Node, Node);										// default constructor
		Edge(Node, Node, int v);								// constructor setting value to v
		~Edge();												// destructor
		double get_value();										// returns value
		void set_value(int v);									// sets value
		Node get_A();											// returns node at one end of edge
		Node get_B();											// returns node at other

	private:
		Node A;
		Node B;
		double value;
	};

	vector<Node> vecs;											// full list of nodes
	vector<Edge> edge;											// full list of edges

	vector<vector<int>> edge_index;

	int get_edge_index(int x, int y);							// finds index of edge based on two node values
};

