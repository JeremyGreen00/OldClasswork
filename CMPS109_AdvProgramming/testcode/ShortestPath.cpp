//Program assignment 2 --implement Dijkstra algorithm
//Author: Xiangfeng Zhu(xzhu27@ucsc.edu)

#include <iostream>
#include <random>
#include <ctime>
#include <set>
#include <queue>
#include "Graph.h"

using namespace std;


//vertex, weight pair
using my_pair_t = std::pair<int,double>;

using my_container_t = std::vector<my_pair_t>;

//define INF
const double INF = std::numeric_limits<double>::infinity();


// To compare two vertices, compare their distance from source
class myComparator{
public:
    int operator() (const std::pair<int,double>& p1, const std::pair<int,double>& p2){
        return p1.second > p2.second;
    }
};
 

//Generate random tree with random weight
void randomTree(Graph& G,double density){
	//Generate random double from 1.0 to 10.0
   	uniform_real_distribution<double> unif1(1.0,10.0);//weight
  	default_random_engine re1(time(0));
  	//Generate random double from 0.0 to 1.0
	uniform_real_distribution<double> unif2(0.0,1.0);//prob()
  	default_random_engine re2(time(0));
  	
   	//double for loop to generate random tree with given density
   	for(int i = 1; i <=G.V();i++){
   		for(int j = 1; j <=G.V();j++){
   			if(i!=j&&(unif2(re2)<density)){
   				G.addEdge(i,j,unif1(re1));
   			}
   		}
   	}   	
   	
}
void  shortestPath(Graph& G,int src){

		// Create a priority queue to store vertices that
    	// are being processed. 
	 	priority_queue<my_pair_t, my_container_t, myComparator> pq;
 	
 		// Create a vector for distances and initialize all
    	// distances as INF
 		vector<double> dist(G.V()+1,INF);
   		
   		
   		//insert source to priority queue
   		pq.push(make_pair(src,0.0));
   		dist[src] = 0.0;
   		
   		
   		//loop trough all vertices in priority queue
   		while(pq.empty()==false){
   			//extract The first vertex from priority queue
   			my_pair_t p = pq.top();
   			pq.pop();
   			 
   			int vertex = p.first;
   			 
   			//loop through it's adjacency list
   			for (auto const& i : G.neighbors(vertex)) {
    			int v = i.first;
				double weight = i.second;
				//if there exist a shorter path, update the distance
				if(dist[v] > dist[vertex] + weight){
					dist[v] = dist[vertex] + weight;
               		pq.push(make_pair(dist[v], v));
				}	

				}
			}
		//calculate average length from source and print the average length
   		double sum = 0.0;
  	 	for (int i = 1; i <=G.V(); ++i){
  	 		if(dist[i]!=INF){
   				sum+=dist[i];
   			}
   		}
   		cout<<"average length is "<<sum/(G.V()-1)<<endl;
}

int main() {
	//get the number of edges and density from user
	int edge;
	double density;
	cout<<"How many edges? ";
	cin>>edge;
	cout<<"Density?(1.0 to 10.0)";
	cin>>density;
	//initialize the tree
	Graph G1(edge);
	randomTree(G1,density);
	//use Dijkstra algorithm to find the shortest path and calculate the average length
	shortestPath(G1,1);
	return 0;
	
}
