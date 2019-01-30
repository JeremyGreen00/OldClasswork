//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa4
// Graph.h
// Graph containing vertecies and edges
//-----------------------------------------------------------------------------

#include "Graph.h"


typedef struct GraphObj
{
	int root;
	int size;
	int edgeSize;

	//BFS var
	int* distance;
	int* parent;
	char* color;

	List* Vertecies;
} GraphObj;

/*** Constructors-Destructors ***/

// Returns a new graph of size n
Graph newGraph(int n)
{
	Graph G = malloc(sizeof(GraphObj));
	G->root = NIL;
	G->size = n;
	G->edgeSize = 0;
	G->distance = (int*)calloc(n + 1, sizeof(int));
	G->parent = (int*)calloc(n + 1, sizeof(int));
	G->color = (char*)calloc(n + 1, sizeof(char));
		//Allocate space for n vertices
	G->Vertecies = (List*)calloc(n + 1, sizeof(List));
	for (int i = 0; i <= n; i++)
	{
		G->Vertecies[i] = newList();
		G->parent[i] = NIL;
		G->distance[i] = INF;
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
	free((*pG)->distance);
	(*pG)->distance = NULL;
	free((*pG)->parent);
	(*pG)->parent = NULL; 
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

// Returns most recently used vertex or NIL
int getSource(Graph G)
{
	return G->root;
}

// Returns parent of vertex u provided BFS has been called, otherwise NIL
int getParent(Graph G, int u)
{
	return G->parent[u];
}

// Returns distance from root to u provided BFS. Otherwise returns NIL
int getDist(Graph G, int u)
{	
	return G->distance[u];
}

// Appends shortest path from root to u onto List L
void getPath(List L, Graph G, int u)
{
	int i = NIL;
	if (G->root == i) return;
	if (u==G->root)
	{
		prepend(L, G->root);
	}
	else if (G->parent[u]==i)
	{
		clear(L);
		return;
	}
	else
	{
		prepend(L, u);
		getPath(L,G,G->parent[u]);
	}
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

	G->edgeSize++;
}

// Breadth First Search algorithm from source s
void BFS(Graph G, int s)
{
	G->root = s;
	for (int i = 0; i <= G->size; i++)
	{
		G->color[i] = 'w';
		G->distance[i] = INF;
		G->parent[i] = NIL;
	}
	G->color[s] = 'g';
	G->distance[s] = 0;
	G->parent[s] = NIL;
	List L = newList();
	append(L, s);

	while (length(L) != 0)
	{
		int x = back(L);
		deleteBack(L);

		//printf("Testing x = %d \r\n",x);

		moveFront(G->Vertecies[x]);
		for (int i = 0; i < length(G->Vertecies[x]); i++)
		{
			int y = get(G->Vertecies[x]);
			//printf("	length(G->Vertecies[x] = %d, y = %d \r\n", length(G->Vertecies[x],y));
			if (G->color[y] == 'w')
			{
				G->color[y] = 'g';
				G->distance[y] = G->distance[x]+1;
				G->parent[y] = x; 
				//printf("	G->parent[%d] = %d = %d \r\n", y, G->parent[y],x);
				prepend(L, y);
			}
			moveNext(G->Vertecies[x]);
		}
		if(x!=-1) G->color[x] = 'b';
	}
	freeList(&L);
}

/*** Other operations ***/
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
		printList(out,G->Vertecies[j]);
		fprintf(out, "\r\n");
	}
}

