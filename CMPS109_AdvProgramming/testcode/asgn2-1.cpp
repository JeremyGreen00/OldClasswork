//assignment 3
//Kevin Tran

#include <iostream>
#include <vector>
#include <ctime>
#include <cstdlib>
#include <limits>
#include <set>
#include <utility>
#include <algorithm>

using namespace std;

typedef int vertex_n;
typedef double weight_n;

inline double probability(){ return 1.0*rand()/RAND_MAX;}

struct node 
{
  vertex_n target;
  weight_n weight;
  node(vertex_n temp_target, weight_n temp_weight)
    : target(temp_target), weight(temp_weight) {}
};

class graph{
public:
  const weight_n max_weight = numeric_limits<double>::infinity();
  
	//constructor
	graph(int s, double d){
	size = s;
    edgeList.resize(size);
	
    //cycle through the graph
   	for(auto i = 0; i < size; i++){
      edgeList.resize(size);
      for(auto j = 0; j < size; j++){
        if(probability()< d) {
          //if the node already has a number don't create node
          auto pred = [j](const node & item){
            return item.target == j;
          };
          if(find_if(begin(edgeList[i]), end(edgeList[i]), pred) != end(edgeList[i]) ){
            continue;
          }
          int randomNum = ((1.0*rand()/RAND_MAX)*200)+1;

          edgeList[i].push_back(node(j,randomNum));
          edgeList[j].push_back(node(i,randomNum));
        } 
      }
    }
}
 
  int getSize()
  {
    return size;
  }

  //dijkstra algorithm  
  void dijkstra(vertex_n beginning, vertex_n end)
  {
    //stores the min weight
    vector<weight_n> dist;
    dist.resize(size, max_weight);
    dist[beginning] = 0;
   
   //stores the min edge
    vector<vertex_n> previous;
    previous.resize(size, -1);

    //vector to see is node is traveled
    vector<bool> visited(size, false);

    //Priority queue
    set<pair<weight_n, vertex_n>> vQueue;
    vQueue.insert(make_pair(dist[beginning], beginning));

    weight_n distEdge;
    vertex_n nextNode;

    //stores current shortest path.
    double shortestPath = max_weight;

    //for loop that starts the search
    for(int i = 0; i < size; ++i){
      do{
         if(vQueue.empty()){
          shortestPath = dist[end];
		  cout << "The shortest path is " << shortestPath;
          return;
        }
        distEdge = vQueue.begin()->first;
        nextNode = vQueue.begin()->second;
        vQueue.erase(vQueue.begin());
      
	  }while(visited[nextNode] == true);

      visited[nextNode] = true;
 
      if(nextNode == end){
        shortestPath = dist[end];
		cout << shortestPath << " ";
        return;
      }

      //travel through all edges of a node
      vector<node> &nEdge = edgeList[nextNode];
      for(int i = 0; i<nEdge.size(); i++) {
        vertex_n tempNode = nEdge[i].target;
        weight_n weight = nEdge[i].weight;
        weight_n distance_across = distEdge + weight;
        
		//get rid of the distance if it is shorter than the current one.
        if (distance_across < dist[tempNode]) {
          vQueue.erase(make_pair(dist[tempNode], tempNode));
   
          dist[tempNode] = distance_across;
          previous[tempNode] = nextNode;
          vQueue.insert(make_pair(dist[tempNode], tempNode));
   
        }
      }
    }
  }

private:
  //size of the graph
  int size;
  vector<vector<node>> edgeList;

};

int main(){
 
  cout << "Graph of size 50 with density .2." << endl;
  
  //creating 50 graphs
  for(int i = 0; i < 50; i++){
    //gets a random start and end node for abritrary graph
    int startNode = (1.0*rand()/RAND_MAX)*50;
    int endNode = (1.0*rand()/RAND_MAX)*50;
    graph test1(50, 0.2);
    test1.dijkstra(startNode, endNode);

  }
 
 cout << endl;
 cout << "Graph of size 50 with density .4." << endl;
  
  for(int i = 0; i < 50; i++){
    //gets a random start and end node for abritrary graph
    int startNode = (1.0*rand()/RAND_MAX)*50;
    int endNode = (1.0*rand()/RAND_MAX)*50;
    graph test1(50, 0.4);
	test1.dijkstra(startNode, endNode);
	
  }

  return 0;
}