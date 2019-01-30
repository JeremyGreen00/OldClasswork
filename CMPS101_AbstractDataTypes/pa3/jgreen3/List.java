//-------------------------------------------------------------------------------//
//	Name: Jeremy Green
//	CruzID: jgreen3
//	Assignment: pa3
//	List.java
//	Class that stores data as nodes. Includes iterator to select from list.
//-------------------------------------------------------------------------------//

public class List {
	
	private class Node{
		// Fields
		Object data;
		Node next, prev;
		
		// Constructor
		Node(Object data) { this.data = data; next = null; prev = null;}
	      
		// toString():  overrides Object's toString() method
		public String toString() 
		{ 
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
	Object front()
	{
		if( length()==0 )
		{
	         throw new RuntimeException("List Error: front() called on empty List");
		}
		return front.data;
	}
	
	// Returns back element. Pre: length()>0
	Object back()
	{
		if( length()==0 )
		{
	         throw new RuntimeException("List Error: back() called on empty List");
		}
		return back.data;
	}
	
	// Returns cursor element. Pre: length()>0, index()>=0
	Object get() 
	{
		if( length()==0 || i==null)
		{
			//throw new RuntimeException("List Error: get() called on empty List");
			return null;
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
		if(length()>0 && index()>=0)
		{
			index--;
			i=i.prev;
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
	void prepend(Object data)
	{
		Node N = new Node(data);

		if(length()==0)
			back=front=N;
		else
		{
			N.next = front;
			front.prev = N;
			front = N;
		}
		if(i!=null) index++;
		length++;
	}
	
	
	// Insert new element into this List. If List is non-empty,
	// insertion takes place after back element.
	void append(Object data)
	{
		Node N = new Node(data);
		
		if(length()==0)
			back=front=N;
		else
		{
			back.next = N;
			N.prev = back;
			back = N;
		}
		
		length++;
	}
	
	
	// Insert new element before cursor.
	// Pre: length()>0, index()>=0
	void insertBefore(Object data)
	{
		if(i==front) 
			prepend(data);
		else if(length()>0 && index()>=0)
		{
			Node N = new Node(data);
			
			N.prev=i.prev;
			i.prev.next=N;
			N.next=i;
			i.prev=N;
			
			index++;
			length++;
		}
	}
	
	
	// Inserts new element after cursor.
	// Pre: length()>0, index()>=0
	void insertAfter(Object data)
	{
		if(i==back) 
			append(data);
		else if(length()>0 && index()>=0)
		{
			Node N = new Node(data);
			
			N.next=i.next;
			i.next.prev=N;
			N.prev=i;
			i.next=N;
			
			length++;
		}
	}
	
	
	// Deletes the front element. Pre: length()>0
	void deleteFront()
	{
		if(length()>0) 
		{
			front=front.next;
			front.prev=null;
			length--;
			if(i!=null) index--;
		}
	}
	
	
	// Deletes the back element. Pre: length()>0
	void deleteBack()
	{
		if(length()>0)
		{
			back=back.prev;
			back.next=null;
			length--;
		}
	}
	
	
	// Deletes cursor element, making cursor undefined.
	// Pre: length()>0, index()>=0
	void delete() 
	{
		if(length()>0 && index()>=0)
		{
			Node temp = i.next;
			if(i.prev!=null) i.prev.next = temp;
			else front = temp;
			if(temp!=null) temp.prev = i.prev;
			else back = i.prev;
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

}
