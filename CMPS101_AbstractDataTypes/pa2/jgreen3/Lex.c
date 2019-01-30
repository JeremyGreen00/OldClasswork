//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa2
// Lex.c
// Sorts input file using list object
//-----------------------------------------------------------------------------

#define _CRT_SECURE_NO_DEPRECATE
#include <stdio.h>
#include <string.h>
#include "List.h"

#define MAX_LEN 160
#define MAX_LINES 255

void exit(int);

int main(int argc, char * argv[]) {

	int count = 0;
	FILE *in, *out;
	char line[MAX_LINES][MAX_LEN];
	List sorted = newList();

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

	//copies files to line array
	while (fgets(line[count], MAX_LEN, in) != NULL)
	{
		count++;
	}
	strcat(line[count - 1], "\n");

	append(sorted, 0);
	/* read each line of input file, then count and print tokens */
	for (int i = 1; i < count; i++)
	{
		moveFront(sorted);
		if (strcmp(line[front(sorted)], line[i])>0)
		{
			prepend(sorted, i);
		}
		else
		{
			do
			{
				moveNext(sorted);
			} while (index(sorted) >= 0 && strcmp(line[get(sorted)], line[i])<0);

			if (index(sorted) == -1) append(sorted, i);
			else insertBefore(sorted, i);
		}
	}

	//Outputs sorted list
	moveFront(sorted);
	while (index(sorted) != -1)
	{
		fprintf(out, "%s", line[get(sorted)]);
		moveNext(sorted);
	}

	/* close files */
	fclose(in);
	fclose(out);

	freeList(&sorted);

	return(0);
}