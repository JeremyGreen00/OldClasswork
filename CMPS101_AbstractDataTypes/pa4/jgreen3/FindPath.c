//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa4
// GraphTest.c
// Tests all the Graph functions
//-----------------------------------------------------------------------------

#define _CRT_SECURE_NO_DEPRECATE
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "Graph.h"

#define MAX_LEN 160
#define MAX_LINES 255

int main(int argc, char * argv[]) {

	FILE *in, *out;
	int x, y;

	// check command line for correct number of arguments
	if (argc != 3) {
		printf("Usage: %s <input file> <output file>\n", argv[0]);
		exit(1);
	}

	// open files for reading and writing 
	in = fopen(argv[1], "r");
	out = fopen(argv[2], "w");
	if (in == NULL) {
		printf("Unable to open file %s for reading\n", argv[1]);
		exit(1);
	}
	if (out == NULL) {
		printf("Unable to open file %s for writing\n", argv[2]);
		exit(1);
	}
	fscanf(in, "%d", &x);
	//printf("x = %d",x);

	Graph G = newGraph(x);

	fscanf(in, "%d %d", &x, &y);

	while (x!=0 && y!=0 && !feof(in))
	{

		//printf("\r\nx = %d, y = %d", x,y);

		addEdge(G,x,y);

		fscanf(in, "%d %d", &x, &y);
	}

	printGraph(out,G);

	//NOW TEST SOME PATHS
	List L = newList();

	fscanf(in, "%d %d", &x, &y);

	while (x != 0 && y != 0 && !feof(in))
	{
		BFS(G, x);

		fprintf(out,"\r\nThe distance from %d to %d is ", x,y);
		int dist = getDist(G, y);
		int i = INF;

		if (dist == i)
		{
			fprintf(out,"infinity");
			fprintf(out,"\r\nNo %d-%d path exists ", x, y);
		}
		else
		{
			fprintf(out,"%d", dist);
			fprintf(out,"\r\nA shortest %d-%d path is: ", x, y);

			clear(L);
			getPath(L,G,y);
			printList(out,L);
		}
		fprintf(out,"\r\n");

		fscanf(in, "%d %d", &x, &y);
	}

	/* close files */
	fclose(in);
	fclose(out);

	freeGraph(&G);
	freeList(&L);

	return 0;
}
