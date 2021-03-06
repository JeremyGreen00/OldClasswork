//-------------------------------------------------------------------------------//
//  List.java
//  Class that stores data as nodes. Includes iterator to select from list.
//-------------------------------------------------------------------------------//

public class List {
	
	private class Node{
		// Fields
		int data;
		Node next;
		
		// Constructor
		Node(int data) { this.data = data; next = null;}
	      
		// toString():  overrides Object's toString() method
		public String toString() { 
			return String.valueOf(data); 
		}
   	}
	
	private Node i,front,back;
	private int length,index;

		// Constructor
	// Creates a new empty list.
	List()
	{
		i=front=back=null;
		length=index=0;
	}
	
		// Access functions
	// Returns the number of elements in this List.
	int length() 
	{
		return length;
	}
	
	// If cursor is defined, returns the index of the cursor element,
	// otherwise returns -1.
	int index() 
	{
		if(i==null)
			return -1;
		return index;
	}
	
	// Returns front element. Pre: length()>0
	int front()
	{
		if( length==0 ){
	         throw new RuntimeException("List Error: front() called on empty List");
		}
		return front.data;
	}
	
	// Returns back element. Pre: length()>0
	int back()
	{
		if( length==0 ){
	         throw new RuntimeException("List Error: back() called on empty List");
		}
		return back.data;
	}
	
	// Returns cursor element. Pre: length()>0, index()>=0
	int get() 
	{
		if( length==0 || i==null){
			throw new RuntimeException("List Error: get() called on empty List");
		}
		return i.data;
	}
	
	// Returns true if and only if this List and L are the same
	// integer sequence. The states of the cursors in the two Lists
	// are not used in determining equality.
	boolean equals(List L) 
	{
		boolean eq = true;
		Node N=front, M=L.front;
		
		while(eq && N!=null && M!=null)
		{
			if(N.data!=M.data)
				eq=false;
			N=N.next;
			M=M.next;
		}
		return eq;
	}

		// Manipulation procedures
	
	// Resets this List to its original empty state.
	void clear() 
	{
		i=front=back=null;
		length=index=0;
	}
	
	// If List is non-empty, places the cursor under the front element,
	// otherwise does nothing.
	void moveFront()
	{
		if(length!=0)
		{
			i=front;
			index=0;
		}
	}
	
	// If List is non-empty, places the cursor under the back element,
	// otherwise does nothing.
	void moveBack()
	{
		if(length!=0)
		{
			i=back;
			index=length-1;
		}
	}
	
	
	// If cursor is defined and not at front, moves cursor one step toward
	// front of this List, if cursor is defined and at front, cursor becomes
	// undefined, if cursor is undefined does nothing.
	void movePrev() 
	{
		if(i!=null && index>=0)
		{
			--index;
			i=front;
			for(int j=0;j<index;j++)
				i=i.next;
		}
	}
	
	// If cursor is defined and not at back, moves cursor one step toward
	// back of this List, if cursor is defined and at back, cursor becomes
	// undefined, if cursor is undefined does nothing.
	void moveNext()
	{
		if(i!=null)
		{
			i=i.next;
			index++;
		}
	}
	
	// Insert new element into this List. If List is non-empty,
	// insertion takes place before front element.
	void prepend(int data)
	{
		Node N = new Node(data);

		if(length==0)
			back=front=N;
		else
		{
			N.next = front;
			front = N;
		}
		
		length++;
	}
	
	
	// Insert new element into this List. If List is non-empty,
	// insertion takes place after back element.
	void append(int data)
	{
		Node N = new Node(data);
		
		if(length==0)
			back=front=N;
		else
		{
			back.next = N;
			back = N;
		}
		
		length++;
	}
	
	
	// Insert new element before cursor.
	// Pre: length()>0, index()>=0
	void insertBefore(int data)
	{
		if(i==front) {this.prepend(data);}
		else if(length>0 && index>=0)
		{
			this.movePrev();
			this.insertAfter(data);
			this.moveNext();
			this.moveNext();
		}
	}
	
	
	// Inserts new element after cursor.
	// Pre: length()>0, index()>=0
	void insertAfter(int data)
	{
		if(length>0 && index>=0)
		{
			Node N = new Node(data);
			
			N.next=i.next;
			i.next=N;
			
			length++;
		}
	}
	
	
	// Deletes the front element. Pre: length()>0
	void deleteFront()
	{
		if(length>0) 
			{
				front=front.next;
				length--;
			}
	}
	
	
	// Deletes the back element. Pre: length()>0
	void deleteBack()
	{
		if(length>0)
		{
			length--;
			Node temp=front;
			for(int j=0;j<length;j++)
				temp=temp.next;
			back=temp;
			back.next=null;
		}
	}
	
	
	// Deletes cursor element, making cursor undefined.
	// Pre: length()>0, index()>=0
	void delete() 
	{
		if(length>0 && index>=0)
		{
			Node temp = i.next;
			this.movePrev();
			i.next = temp;
			i=null;
			length--;
		}
	}
	
		// Other methods
	
	// Overrides Object's toString method. Returns a String
	// representation of this List consisting of a space
	// separated sequence of integers, with front on left.
	public String toString() 
	{
		String total = new String("");
		Node temp = front;
		for(int j=0;j<length;j++)
		{
			total+=temp.toString() + " ";
			temp=temp.next;
		}
		return total;
	}
	
	
	// Returns a new List representing the same integer sequence as this
	// List. The cursor in the new list is undefined, regardless of the
	// state of the cursor in this List. This List is unchanged.
	List copy()
	{
		List copy = new List(); 
		Node temp = front;
		for(int j=0;j<length;j++)
		{
			copy.append(temp.data);
			temp=temp.next;
		}
		return copy;
	}
	
	// Returns a new List which is the concatenation of
	// this list followed by L. The cursor in the new List
	// is undefined, regardless of the states of the cursors
	// in this List and L. The states of this List and L are
	// unchanged.
	List concat(List L)
	{
		List copy = new List(); 
		Node temp = front;
		for(int j=0;j<length;j++)
		{
			copy.append(temp.data);
			temp=temp.next;
		}
		temp = L.front;
		for(int j=0;j<L.length;j++)
		{
			copy.append(temp.data);
			temp=temp.next;
		}
		return copy;
	}

	

}
