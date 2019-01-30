//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa5
// Graph.h
// Header file for Graph ADT
//-----------------------------------------------------------------------------

#include <stdlib.h>
#include <stdio.h>
#include "List.h"

#define INF -10;
#define NIL -20;

#ifndef _GRAPH_H_INCLUDE_
#define _GRAPH_H_INCLUDE_


typedef struct GraphObj* Graph;

/*** Constructors-Destructors ***/
Graph newGraph(int n);                      //[x]
void freeGraph(Graph* pG);                  //[x]

/*** Access functions ***/
int getOrder(Graph G);                      //[x]
int getSize(Graph G);                       //[x]
int getParent(Graph G, int u);              //[x]

int getDiscover(Graph G, int u);            //returns discovery time of u /* Pre: 1<=u<=n=getOrder(G) */
int getFinish(Graph G, int u);              //returns finish time of u /* Pre: 1<=u<=n=getOrder(G) */
/*** Manipulation procedures ***/
void makeNull(Graph G);                     //[x]
void addEdge(Graph G, int u, int v);        //[x]
void addArc(Graph G, int u, int v);         //[x]
void DFS(Graph G,List L);
void Visit(Graph G,int u, List L, int* time);

/*** Other operations ***/
Graph transpose(Graph G);                   //[x]
Graph copyGraph(Graph G);                   //[x]
void printGraph(FILE* out, Graph G);        //[x]

#endif