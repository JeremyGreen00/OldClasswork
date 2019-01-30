//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa5
// FindComponents.c
// Finds the strongly connected components of graph G
//-----------------------------------------------------------------------------

#define _CRT_SECURE_NO_DEPRECATE
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "Graph.h"

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

    Graph G = newGraph(x);
    List L = newList();

    fscanf(in, "%d %d", &x, &y);

    while (x != 0 && y != 0 && !feof(in))
    {
        addArc(G, x, y);

        fscanf(in, "%d %d", &x, &y);
    }

    for (int i = 1; i <= getOrder(G); i++) append(L, i);

    fprintf(out, "Adjacency list representation of G:\r\n");
    printGraph(out, G);

    // Calculate components
    DFS(G,L);
    Graph T = transpose(G);
    DFS(T, L);

    List Print = newList();
    int nil = NIL;  //for some reason I get an error when accessing NIL directly
    int count = 0;

    moveFront(L);
    while (get(L) != -1)
    {
        if (getParent(T, get(L)) == nil) count++;
        moveNext(L);
    }

    fprintf(out, "\r\nG contains %d strongly connected components: ", count);
    count = 0;

    moveBack(L);
    while (get(L) != -1)
    {
        prepend(Print, get(L));
        if (getParent(T,get(L)) == nil)
        {
            fprintf(out, "\r\nComponent %d: ", ++count);
            printList(out, Print);
            clear(Print);
        }
        movePrev(L);
    }

    /* close files */
    fclose(in);
    fclose(out);

    freeGraph(&G);
    freeGraph(&T);
    freeList(&L);
    freeList(&Print);

    return 0;
}
