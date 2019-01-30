//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa4
// GraphTest.c
// Tests all the Graph functions
//-----------------------------------------------------------------------------

//#define _CRT_SECURE_NO_DEPRECATE
#include <stdio.h>
#include <string.h>
#include "Graph.h"

#define MAX_LEN 160
#define MAX_LINES 255

int main(int argc, char * argv[]) {

	Graph test = newGraph(10);
	List L = newList();

	printGraph(stdout, test);
	printf("Verticies: %d  ",getOrder(test));
	printf("Edges: %d", getSize(test));
	printf("\r\n");

	addArc(test, 1, 4);
	addArc(test, 1, 2);
	//addEdge(test, 1, 4);

	for (int i = 1; i <= getOrder(test); i++)
	{
		append(L,i);
		for (int j = 0; j < i; j++)
		{
			addArc(test, j, i);
		}
	}

	printGraph(stdout, test);

	printf("Verticies: %d  ", getOrder(test));
	printf("Edges: %d", getSize(test));
	printf("\r\n");

	Graph trans = transpose(test);

	printGraph(stdout, trans);

	printf("Verticies: %d  ", getOrder(trans));
	printf("Edges: %d", getSize(trans));
	printf("\r\n");

	Graph Copy = copyGraph(test);

	printGraph(stdout, Copy);

	printf("Verticies: %d  ", getOrder(Copy));
	printf("Edges: %d", getSize(Copy));
	printf("\r\n");

	printList(stdout, L);
	DFS(test, L);
	printList(stdout, L);

	printf("\r\n");

	for (int i = 1; i <= getOrder(test); i++)
	{
		printf("Vert: %d d = %d  ", i,getDiscover(test,i));
		printf("f = %d p = %d  ", getFinish(test, i),getParent(test, i));
		printf("\r\n");
	}

	freeGraph(&Copy);
	freeGraph(&trans);
	freeGraph(&test);
	freeList(&L);
	system("pause");

	return 0;
}