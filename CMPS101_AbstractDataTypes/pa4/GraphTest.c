//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa4
// GraphTest.c
// Tests all the Graph functions
//-----------------------------------------------------------------------------

//#define _CRT_SECURE_NO_DEPRECATE
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "Graph.h"

#define MAX_LEN 160
#define MAX_LINES 255

int main(int argc, char * argv[]) {

	Graph test = newGraph(10);

	printGraph(stdout, test);
	printf("Verticies: %d  ",getOrder(test));
	printf("Edges: %d", getSize(test));
	printf("\r\n");

	addArc(test, 1, 4);
	addArc(test, 1, 2);
	//addEdge(test, 1, 4);

	for (int i = 0; i <= getOrder(test); i++)
	{

		for (int j = 0; j < i; j++)
		{
			addArc(test, j, i);
		}
	}

	printGraph(stdout, test);

	printf("Verticies: %d  ", getOrder(test));
	printf("Edges: %d", getSize(test));
	printf("\r\n");

	BFS(test, 5);

	List L = newList();
	getPath(L, test, 10);

	printf("Source: %d  ", getSource(test));
	printf("Parent of 10: %d", getParent(test,10));
	printf("\r\n");

	printf("\r\n path from 5 to 1  After BFS\r\n");
	printList(stdout,L);


	printf("\r\n");

	makeNull(test);

	printGraph(stdout, test);

	printf("Verticies: %d  ", getOrder(test));
	printf("Edges: %d", getSize(test));
	printf("\r\n TEST 2 \r\n");

	// test 2

	addEdge(test, 1, 2);
	addEdge(test, 2, 3);
	addEdge(test, 3, 4);
	addEdge(test, 4, 1);
	addEdge(test, 1, 3);
	addEdge(test, 3, 5);

	printGraph(stdout, test);

	printf("Verticies: %d  ", getOrder(test));
	printf("Edges: %d", getSize(test));
	printf("\r\n");

	BFS(test, 1);

	clear(L);
	getPath(L, test, 5);

	printf("Source: %d  ", getSource(test));
	printf("Parent of 5: %d", getParent(test, 5));
	printf("\r\n");

	printf("\r\n path from 1 to 5  After BFS\r\n");
	printList(stdout, L);


	printf("\r\n");


	freeGraph(&test);
	freeList(&L);
	//system("pause");

	return 0;
}