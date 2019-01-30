//-----------------------------------------------------------------------------
// Jeremy Green
// jgreen3
// pa4
// List.c
// Implementation file for List ADT
//-----------------------------------------------------------------------------

#include <stdlib.h>
#include<stdio.h>
#include<stdlib.h>
#include "List.h"

// structs --------------------------------------------------------------------

// private NodeObj type
typedef struct NodeObj {
	int data;
	struct NodeObj* next;
	struct NodeObj* prev;
} NodeObj;

// private Node type
typedef NodeObj* Node;

// private QueueObj type
typedef struct ListObj {
	Node front;
	Node back;
	Node i;
	int length;
	int index;
} ListObj;


// Constructors-Destructors ---------------------------------------------------

// newNode()
// Returns reference to new Node object. Initializes next and data fields.
// Private.
Node newNode(int data) {
	Node N = malloc(sizeof(NodeObj));
	N->data = data;
	N->next = NULL;
	N->prev = NULL;
	return(N);
}

// freeNode()
// Frees heap memory pointed to by *pN, sets *pN to NULL.
// Private.
void freeNode(Node* pN) {
	if (pN != NULL && *pN != NULL) {
		free(*pN);
		*pN = NULL;
	}
}

// newQueue()
// Returns reference to new empty Queue object.
List newList(void) {
	List Q;
	Q = malloc(sizeof(ListObj));
	Q->front = Q->back = Q->i = NULL;
	Q->length = 0;
	Q->index = 0;
	return(Q);
}


// freeQueue()
// Frees all heap memory associated with Queue *pQ, and sets *pQ to NULL.S
void freeList(List* pQ) {
	if (pQ != NULL && *pQ != NULL) {
		while (length(*pQ)>0) {
			deleteFront(*pQ);
		}
		free(*pQ);
		*pQ = NULL;
	}
}


// Access functions -----------------------------------------------------------

// Returns the number of elements in this List.
int length(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling length() on NULL List reference\n");
		exit(1);
	}
	return L->length;
}

// If cursor is defined, returns the index of the cursor element,
// otherwise returns -1.
int index(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling index() on NULL List reference\n");
		exit(1);
	}
	if (L->i == NULL)
		return -1;
	return L->index;
}

// Returns front element. Pre: length()>0
int front(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling front() on NULL List reference\n");
		exit(1);
	}
	if (length>0) return L->front->data;
	return -1;
}

// Returns back element. Pre: length()>0
int back(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling back() on NULL List reference\n");
		exit(1);
	}
	if(length>0) return L->back->data;
	return -1;
}

// Returns cursor element. Pre: length()>0, index()>=0
int get(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling get() on NULL List reference\n");
		exit(1);
	}
	if (L->i == NULL) return -1;
	return L->i->data;
}

// Returns true if and only if this List and L are the same
// integer sequence. The states of the cursors in the two Lists
// are not used in determining equality.
int equals(List A, List B)
{
	if (A == NULL || B == NULL)
	{
		printf("List Error: calling equals() on NULL List reference\n");
		exit(1);
	}

	int eq = 1;
	Node N = A->front, M = B->front;

	while (eq && N != NULL && M != NULL)
	{
		if (N->data != M->data)
			eq = 0;
		N = N->next;
		M = M->next;
	}
	return eq;
}

// Manipulation procedures

// Resets this List to its original empty state.
void clear(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling clear() on NULL List reference\n");
		exit(1);
	}

	while (length(L)>0) {
		deleteFront(L);
	}
	L->i = L->front = L->back = NULL;
	L->length = L->index = 0;
}

// If List is non-empty, places the cursor under the front element,
// otherwise does nothing.
void moveFront(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling moveFront() on NULL List reference\n");
		exit(1);
	}

	if (L->length != 0)
	{
		L->i = L->front;
		L->index = 0;
	}
}

// If List is non-empty, places the cursor under the back element,
// otherwise does nothing.
void moveBack(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling moveBack() on NULL List reference\n");
		exit(1);
	}

	if (L->length != 0)
	{
		L->i = L->back;
		L->index = L->length - 1;
	}
}


// If cursor is defined and not at front, moves cursor one step toward
// front of this List, if cursor is defined and at front, cursor becomes
// undefined, if cursor is undefined does nothing.
void movePrev(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling movePrev() on NULL List reference\n");
		exit(1);
	}

	if (L->length > 0 && L->index >= 0)
	{
		L->index--;
		L->i = L->i->prev;
	}
}

// If cursor is defined and not at back, moves cursor one step toward
// back of this List, if cursor is defined and at back, cursor becomes
// undefined, if cursor is undefined does nothing.
void moveNext(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling moveNext() on NULL List reference\n");
		exit(1);
	}

	if (L->i != NULL)
	{
		L->i = L->i->next;
		L->index++;
	}
}

// Insert new element into this List. If List is non-empty,
// insertion takes place before front element.
void prepend(List L, int data)
{
	if (L == NULL)
	{
		printf("List Error: calling prepend() on NULL List reference\n");
		exit(1);
	}

	Node N = newNode(data);

	if (L->length == 0)
		L->back = L->front = N;
	else
	{
		N->next = L->front;
		L->front->prev = N;
		L->front = N;
	}
	if (L->i != NULL) L->index++;
	L->length++;
}


// Insert new element into this List. If List is non-empty,
// insertion takes place after back element.
void append(List L, int data)
{
	if (L == NULL)
	{
		printf("List Error: calling append() on NULL List reference\n");
		exit(1);
	}

	Node N = newNode(data);

	if (L->length == 0)
		L->back = L->front = N;
	else
	{
		L->back->next = N;
		N->prev = L->back;
		L->back = N;
	}

	L->length++;
}


// Insert new element before cursor.
// Pre: length()>0, index()>=0
void insertBefore(List L, int data)
{
	if (L == NULL)
	{
		printf("List Error: calling insertBefore() on NULL List reference\n");
		exit(1);
	}

	if (L->i == L->front)
		prepend(L, data);
	else if (L->length>0 && L->index > 0)
	{
		Node N = newNode(data);

		N->prev = L->i->prev;
		L->i->prev->next = N;
		N->next = L->i;
		L->i->prev = N;

		L->index++;
		L->length++;
	}
}


// Inserts new element after cursor.
// Pre: length()>0, index()>=0
void insertAfter(List L, int data)
{
	if (L == NULL)
	{
		printf("List Error: calling insertAfter() on NULL List reference\n");
		exit(1);
	}

	if (L->i == L->back)
		append(L, data);
	else if (L->length>0 && L->index >= 0)
	{
		Node N = newNode(data);

		N->next = L->i->next;
		L->i->next->prev = N;
		N->prev = L->i;
		L->i->next = N;

		L->length++;
	}
}


// Deletes the front element. Pre: length()>0
void deleteFront(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling deleteFront() on NULL List reference\n");
		exit(1);
	}

	if (L->length>0)
	{
		Node temp = L->front;
		L->front = L->front->next;
		if (L->front != NULL) L->front->prev = NULL;
		L->length--;
		freeNode(&temp);
		if (L->i != NULL) L->index--;
	}
}


// Deletes the back element. Pre: length()>0
void deleteBack(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling deleteBack() on NULL List reference\n");
		exit(1);
	}

	if (L->length>0)
	{
		Node temp = L->back;
		L->back = L->back->prev;
		if (L->back != NULL) L->back->next = NULL;
		L->length--;
		freeNode(&temp);
	}
}


// Deletes cursor element, making cursor undefined.
// Pre: length()>0, index()>=0
void delete(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling delete() on NULL List reference\n");
		exit(1);
	}

	if (L->length>0 && L->index >= 0)
	{
		Node temp = L->i->next;
		L->i->prev->next = temp;
		temp->prev = L->i->prev;
		freeNode(&L->i);
		L->i = NULL;
		L->length--;
	}
}

// Other methods

void printList(FILE* out, List L)
{
	if (L == NULL)
	{
		printf("List Error: calling printList() on NULL List reference\n");
		exit(1);
	}

	Node temp = L->front;

	for (int j = 0; j < L->length && temp!=NULL; j++)
	{
		fprintf(out, "%d ", temp->data);
		temp = temp->next;
	}

}

// Returns a new List representing the same integer sequence as this
// List. The cursor in the new list is undefined, regardless of the
// state of the cursor in this List. This List is unchanged.
List copyList(List L)
{
	if (L == NULL)
	{
		printf("List Error: calling copyList() on NULL List reference\n");
		exit(1);
	}

	List copy = newList();
	Node temp = L->front;

	for (int j = 0; j<L->length; j++)
	{
		append(copy, temp->data);
		temp = temp->next;
	}
	return copy;
}

// Returns a new List which is the concatenation of
// this list followed by L. The cursor in the new List
// is undefined, regardless of the states of the cursors
// in this List and L. The states of this List and L are
// unchanged.
List concat(List A, List B)
{
	if (A == NULL || B == NULL)
	{
		printf("List Error: calling concat() on NULL List reference\n");
		exit(1);
	}

	List copy = newList();
	Node temp = A->front;

	for (int j = 0; j<A->length; j++)
	{
		append(copy, temp->data);
		temp = temp->next;
	}
	temp = B->front;

	for (int j = 0; j<B->length; j++)
	{
		append(copy, temp->data);
		temp = temp->next;
	}
	return copy;
}
