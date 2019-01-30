
#ifndef _GRAPH_H_INCLUDE_
#define _GRAPH_H_INCLUDE_
#include <vector>
#include <utility>
#include <list>

class Graph{
 	private:
 		//we need to store vertex gezand weight pair for every edge, adj list
 		

  		//the number of vertices (called the order of the graph)
    	int order;
    	//the number of edges (called the size of the graph)
    	int size;
 	public:
 		std::list< std::pair<int, double> > *adj;
 		//constructor
  		Graph(int order);
  		

  		//returns the number of vertices in the graph
  		int V();
  		
		//returns the number of edges in the grap)
		int E();
		//tests whether there is an edge from node x to node y.
		bool adjacent (int x, int y);
	
		//lists all nodes y such that there is an edge from x to y.
		std::list< std::pair<int, double> >& neighbors (int x);
		 
		//adds to G the edge from x to y, if it is not there.
		void addEdge(int x,int y,double v); 
		
		//removes the edge from x to y, if it is there.
		void deleteEdge(int x,int y);
		
		//returns the value associated with the node x.
		int get_node_value (int x);
		
		//sets the value associated with the node x to a.
		void set_node_value(int x,int a); 
		
		//returns the value associated to the edge (x,y).
		int get_edge_value(int x,int y);
		
		//sets the value associated to the edge (x,y) to v.
		//void set_edge_value (int x,int y,int v);	

};

#endif
