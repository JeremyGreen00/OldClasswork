#include "Graph.h"
#include <vector>
#include <utility>
#include <list>

	Graph::Graph(int order){
		this->order = order;
		adj = new std::list< std::pair<int, double> >[order+1];
		size = 0;
		
		
	}

	//returns the number of vertices in the graph
	int Graph::V(){
		return order;
	}


	//returns the number of edges in the graph
	int Graph::E(){
		return size;
	}

	//tests whether there is an edge from node x to node y.
	bool adjacent(int x, int y){
		return true;
	}


  	//lists all nodes y such that there is an edge from x to y.
	std::list< std::pair<int, double> >& Graph::neighbors (int x){
		return adj[x]; 
	}
		 
	//adds to G the edge from x to y, if it is not there.
	void Graph::addEdge(int x,int y,double v){
		adj[x].push_back(std::make_pair(y, v));
    	adj[y].push_back(std::make_pair(x, v));
    	size++;
	}
		
	//removes the edge from x to y, if it is there.
	void Graph::deleteEdge(int x,int y){
		
	}
		
	//returns the value associated with the node x.
	int Graph::get_node_value (int x){
		return 1;
	}
		
		//sets the value associated with the node x to a.
	void Graph::set_node_value(int x,int a){
	}
		
	//returns the value associated to the edge (x,y).
	int Graph::get_edge_value(int x,int y){
		return 1;
	}
	// 	
// 	sets the value associated to the edge (x,y) to v.
// 	void Graph::set_edge_value (int x,int y,int v){
// 	}