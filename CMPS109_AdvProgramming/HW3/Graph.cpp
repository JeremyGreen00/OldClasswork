//-----------------------------------------------------------------------------
// HW3
// Graph.cpp
// Simulates a hypothetical multi-dimensional graph using a list of edges
//-----------------------------------------------------------------------------
#include <time.h>
#include "Graph.h"

// Constructor using denisty of max edges and range for edge val.
Graph::Graph(int V_num=10, double density=0.2, double L_range=1, double U_range=10)
{
	edge_index.resize(V_num);
	for (int i = 0; i < V_num; i++) edge_index[i].resize(V_num, -1);


	int max_edges = (V_num)*(V_num - 1) / 2;
	if (density > 1 || density < 0) density = 0.2;

	int rand_count = 0;

	for (int i = 0; i<V_num; i++)
	{
		Node n = Node(i);
		vecs.push_back(n);
	}

	cout << max_edges*density << endl;
	for (int i = 0; i < max_edges*density; i++)
	{
		int x, y;
		do {
			srand(rand_count*time(NULL));
			x = rand() % V_num;
			y = rand() % V_num;
			rand_count++;
		} while (x == y && adjacent(x, y));

		add(x, y, (rand() % int(U_range - L_range)) + L_range);
	}
}

// Constructor creates V_num nodes
Graph::Graph(int V_num)
{
	edge_index.resize(V_num);
	for (int i = 0; i < V_num; i++) edge_index[i].resize(V_num, -1);

	for (int i = 0; i<V_num; i++)
	{
		Node n = Node(i);
		vecs.push_back(n);
	}
}

// Constructor creates num nodes and edges. Edges distributed randomly
Graph::Graph(int V_num, int E_num)
{
	edge_index.resize(V_num);
	for (int i = 0; i < V_num; i++) edge_index[i].resize(V_num, -1);

	int max_edges = (V_num)*(V_num - 1) / 2;
	int edges = (E_num > max_edges || E_num < 0) ? max_edges : E_num;

	int rand_count = 0;

	for (int i = 0; i<V_num; i++)
	{
		Node n = Node(i);
		vecs.push_back(n);
	}

	for (int i = 0; i < edges; i++)
	{
		int x, y;
		do
		{
			srand(rand_count*time(NULL));
			x = rand() % V_num;
			y = rand() % V_num;
			rand_count++;
		} while (x == y || adjacent(x, y));

		add(x, y, rand() % 100);
	}
}

// destructor
Graph::~Graph()
{
	for (int i = 0; i < edge_index.size(); i++) edge_index[i].clear();
	edge_index.clear();

	edge.clear();
	vecs.clear();
}


// returns the number of vertices in the graph
int	Graph::get_V()
{
	return vecs.size();
}

// returns the number of edges in the graph
int	Graph::get_E()
{
	return edge.size();
}

// tests whether there is an edge from node x to node y.
bool Graph::adjacent(int x, int y)
{
	for (int i = 0; i<vecs[x].get_num_connections(); i++)
	{
		if (y == vecs[x].get_connection(i)) return true;
	}
	return false;
}

// lists all nodes y such that there is an edge from x to y.
int* Graph::neighbors(int x)
{
	int *l = new int[vecs[x].get_num_connections()];

	for (int j = 0; j < vecs[x].get_num_connections(); j++)
	{
		l[j] = (vecs[x].get_connection(j));
	}

	return l;
}

// lists all nodes y such that there is an edge from x to y.
int Graph::num_neighbors(int x)
{
	return vecs[x].get_num_connections();
}

// adds to G the edge from x to y, if it is not there.
void	Graph::add(int x, int y, int v)
{
	if (!adjacent(x, y) && x != y)
	{
		Edge e = Edge(vecs[x], vecs[y], v);
		vecs[x].add_connection(vecs[y]);
		vecs[y].add_connection(vecs[x]);

		edge_index[x][y] = edge.size();
		edge_index[y][x] = edge.size();

		edge.push_back(e);
	}
}

// removes the edge from x to y, if it is there.
void	Graph::remove(int x, int y)
{
	int i = get_edge_index(x, y);
	if (i != -1)
	{
		vecs[x].remove_connection(y);
		vecs[y].remove_connection(x);

		edge_index[x][y] = -1;
		edge_index[y][x] = -1;
		//NOTE issue of incorrect index's after removal. Remember to fix

		edge.erase(edge.begin() + i);
	}
}

// returns the value associated to the edge(x, y).
double	Graph::get_edge_value(int x, int y)
{
	int i = get_edge_index(x, y);
	if (i == -1) return -1;
	return edge[i].get_value();
}

// sets the value associated to the edge(x, y) to v.
void	Graph::set_edge_value(int x, int y, int v)
{
	edge[get_edge_index(x, y)].set_value(v);
}

// outputs data about graph
ostream& operator<< (ostream& os, Graph G)
{
	for (int i = 0; i<G.vecs.size(); i++)
	{
		os << G.vecs[i].get_value() << ": ";

		for (int j = 0; j < G.vecs[i].get_num_connections(); j++)
		{
			os << "->" << G.vecs[i].get_connection(j);
		}
		os << "\n";

	}
	return os;
}

// PRIVATE: finds edge if any with nodes x and y and returns index
int Graph::get_edge_index(int x, int y)
{
	int s = edge_index.size();
	if(x < s && x >= 0 && y <= s && y >= 0) return edge_index[x][y];
	return -1;
}

// PRIVATE: Node constructor
Graph::Node::Node()
{
	index = 0;
}
// default constructor sets node to v
Graph::Node::Node(int v)
{
	index = v;
}
// destructor
Graph::Node::~Node()
{

}
// returns value which is object index
int Graph::Node::get_value()
{
	return index;
}
// sets the index
void Graph::Node::set_index(int v)
{
	index = v;
}
// returns a node value based on index i
int Graph::Node::get_connection(int i)
{
	return (i >= connections.size() || i<0) ? -1 : connections[i];
}
// returns total connections node has
int Graph::Node::get_num_connections()
{
	return connections.size();
}
// adds a new connection
void Graph::Node::add_connection(Node C)
{
	connections.push_back(C.index);
}
// removes a connection
void Graph::Node::remove_connection(int C)
{
	for (int i = 0; i < connections.size(); i++)
	{
		if (connections[i] == C)
		{
			connections.erase(connections.begin() + i);
			return;
		}
	}
}
// PRIVATE: Edge class for connecting nodes
Graph::Edge::Edge(Node a, Node b)
{
	value = 0;
	A = a;
	B = b;
	a.add_connection(b);
	b.add_connection(a);
}
// constructor sets end nodes and values
Graph::Edge::Edge(Node a, Node b, int v)
{
	value = v;
	A = a;
	B = b;
}
// destructor
Graph::Edge::~Edge()
{
	A.remove_connection(B.get_value());
	B.remove_connection(A.get_value());
}
// gets value of edge
double Graph::Edge::get_value()
{
	return value;
}
// sets val of e
void Graph::Edge::set_value(int v)
{
	value = v;
}
// returns the node at one end of the edge
Graph::Node Graph::Edge::get_A()
{
	return A;
}
// returns node from other end
Graph::Node Graph::Edge::get_B()
{
	return B;
}
