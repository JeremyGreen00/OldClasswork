//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa5
// Graph.h
// Graph containing vertecies and edges
//-----------------------------------------------------------------------------

#include "Graph.h"


typedef struct GraphObj
{
	int size;
	int edgeSize;

	//DFS var
	int* discover;
	int* finish;
	int* parent;
	char* color;

	List* Vertecies;
} GraphObj;

/*** Constructors-Destructors ***/

// Returns a new graph of size n
Graph newGraph(int n)
{
	Graph G = malloc(sizeof(GraphObj));
	G->size = n;
	G->edgeSize = 0;
	G->discover = (int*)calloc(n + 1, sizeof(int));
	G->finish = (int*)calloc(n + 1, sizeof(int));
	G->parent = (int*)calloc(n + 1, sizeof(int));
	G->color = (char*)calloc(n + 1, sizeof(char));
	//Allocate space for n vertices
	G->Vertecies = (List*)calloc(n + 1, sizeof(List));
	for (int i = 0; i <= n; i++)
	{
		G->Vertecies[i] = newList();
		G->parent[i] = NIL;
		G->discover[i] = INF;
		G->finish[i] = INF;
		G->color[i] = 'w';
	}
	return G;
}

// Deletes graph from memory
void freeGraph(Graph* pG)
{
	for (int i = 0; i <= getOrder(*pG); i++)
	{
		freeList(&(*pG)->Vertecies[i]);
	}
	free((*pG)->Vertecies);
	(*pG)->Vertecies = NULL;
	free((*pG)->discover);
	(*pG)->discover = NULL;
	free((*pG)->parent);
	(*pG)->parent = NULL;
	free((*pG)->finish);
	(*pG)->finish = NULL;
	free((*pG)->color);
	(*pG)->color = NULL;

	free(*pG);
	*pG = NULL;
}

/*** Access functions ***/
// Returns number of VERTECIES
int getOrder(Graph G)
{
	return G->size;
}

// Returns number of EDGES
int getSize(Graph G)
{
	return G->edgeSize;
}

// Returns parent of vertex u provided BFS has been called, otherwise NIL
int getParent(Graph G, int u)
{
	return G->parent[u];
}

//returns discovery time of u /* Pre: 1<=u<=n=getOrder(G) */
int getDiscover(Graph G, int u)
{
	if (1 <= u && u <= getOrder(G)) return G->discover[u];
	return NIL;
}

//returns finish time of u /* Pre: 1<=u<=n=getOrder(G) */
int getFinish(Graph G, int u)
{
	if (1 <= u && u <= getOrder(G)) return G->finish[u];
	return NIL;
}

/*** Manipulation procedures ***/

// Deletes all edges. Returning graph to original state
void makeNull(Graph G)
{
	for (int j = 1; j <= G->size; j++)
	{
		clear(G->Vertecies[j]);
	}
	G->edgeSize = 0;
}

// Adds edge between u and v
void addEdge(Graph G, int u, int v)
{
	if (u > G->size || u<1 || v>G->size || v < 1 || v == u) return;

	// reference from node u
	moveFront(G->Vertecies[u]);

	while (get(G->Vertecies[u]) != -1 && get(G->Vertecies[u])<v)
	{
		moveNext(G->Vertecies[u]);
	}

	if (get(G->Vertecies[u]) == v) return;
	if (get(G->Vertecies[u]) == -1) append(G->Vertecies[u], v);
	else insertBefore(G->Vertecies[u], v);

	// reference from node v
	moveFront(G->Vertecies[v]);

	while (get(G->Vertecies[v]) != -1 && get(G->Vertecies[v])<u)
	{
		moveNext(G->Vertecies[v]);
	}

	if (get(G->Vertecies[v]) == u) return;
	if (get(G->Vertecies[v]) == -1) append(G->Vertecies[v], u);
	else insertBefore(G->Vertecies[v], u);

	G->edgeSize++;
}

// Adds DIRECTIONAL edge that points from u to v
void addArc(Graph G, int u, int v)
{
	if (u > G->size || u<1 || v>G->size || v < 1) return;

	// reference from node u
	moveFront(G->Vertecies[u]);

	while (get(G->Vertecies[u]) != -1 && get(G->Vertecies[u])<v)
	{
		moveNext(G->Vertecies[u]);
	}

	if (get(G->Vertecies[u]) == v) return;
	if (get(G->Vertecies[u]) == -1) append(G->Vertecies[u], v);
	else insertBefore(G->Vertecies[u], v);

	G->edgeSize++;
}

//******************************************************
//
//  Deapth First Search
//
//******************************************************
void DFS(Graph G, List L)
{
	if (length(L) != getOrder(G)) return;
	moveFront(L);
	for (int i = 0; i<getOrder(G); i++)
	{
		G->color[i] = 'w';
		G->parent[i] = NIL;
		if (1 > get(L) || get(L) > getOrder(G)) return;
		moveNext(L);
	}
	int time = 0;
	moveFront(L);
	while (get(L) != -1)
	{
		if (G->color[get(L)] == 'w')
		{
			Visit(G, get(L), L, &time);
		}
		moveNext(L);
	}

	//  sort verts by decreasing finishing order
	clear(L);
	for (int i = 1; i <= getOrder(G); i++)
	{
		int v = getFinish(G, i);
		moveFront(L);

		while (get(L) != -1 && G->finish[get(L)]>v)
		{
			moveNext(L);
		}

		if (get(L) == -1) append(L, i);
		else insertBefore(L, i);
	}
}
void Visit(Graph G, int u, List L, int* time)
{
	G->color[u] = 'g';
	G->discover[u] = ++(*time);
	moveFront(G->Vertecies[u]);
	while (get(G->Vertecies[u]) != -1)
	{
		if (G->color[get(G->Vertecies[u])] == 'w')
		{
			G->parent[get(G->Vertecies[u])] = u;
			Visit(G, get(G->Vertecies[u]), L, &(*time));
		}
		moveNext(G->Vertecies[u]);
	}
	G->color[u] = 'b';
	G->finish[u] = ++(*time);
}

/*** Other operations ***/

//  Returns transpose of G
Graph transpose(Graph G)
{
	Graph T = newGraph(getOrder(G));

	for (int j = 1; j <= getOrder(G); j++)
	{
		moveFront(G->Vertecies[j]);
		while (get(G->Vertecies[j]) != -1)
		{
			addArc(T, get(G->Vertecies[j]), j);
			moveNext(G->Vertecies[j]);
		}
	}

	return T;
}

// returns copy of G
Graph copyGraph(Graph G)
{
	Graph T = newGraph(getOrder(G));

	for (int j = 1; j <= getOrder(G); j++)
	{
		moveFront(G->Vertecies[j]);
		while (get(G->Vertecies[j]) != -1)
		{
			addArc(T, j, get(G->Vertecies[j]));
			moveNext(G->Vertecies[j]);
		}
	}

	return T;
}

// Prints G
void printGraph(FILE* out, Graph G)
{
	if (G == NULL)
	{
		printf("Graph Error: calling printGraph() on NULL Graph reference\n");
		exit(1);
	}

	for (int j = 1; j <= G->size; j++)
	{
		fprintf(out, "%d: ", j);
		printList(out, G->Vertecies[j]);
		fprintf(out, "\r\n");
	}
}

