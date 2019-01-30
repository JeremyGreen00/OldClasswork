//-------------------------------------------------------------------------------//
//	Name: Jeremy Green
//	CruzID: jgreen3
//	Assignment: pa3
//	Matrix.java
//	Class that stores data in a matrix.
//-------------------------------------------------------------------------------//

public class Matrix {
	
	//variables
	private List[] list;
	
	private class data
	{
		//variables
		int index;
		double data;
		
		//constructor
		data(double d, int ind) {this.data = d; this.index = ind;}

		// toString():  overrides Object's toString() method
		public String toString() 
		{ 
			return String.valueOf(data); 
		}
	}
	
	// Constructor
	Matrix(int n) // Makes a new n x n zero Matrix. pre: n>=1
	{
		if( n<1 )
		{
	         throw new RuntimeException("Matrix Error: Size must be n>=1");
		}
		list = new List[n+1];
		for(int i=0;i<n+1;i++)
			list[i] = new List();
	}
	
	// Access functions
	
	 // Returns n, the number of rows and columns of this Matrix
	int getSize()
	{
		return this.list.length-1;
	}
	 // Returns the number of non-zero entries in this Matrix
	int getNNZ()
	{
		int count = 0;
		
		for(int i=1; i<=getSize();i++)
		{
			list[i].moveFront();
			while(list[i].get()!=null)
			{
				list[i].moveNext();
				count++;
			}
		}
		return count;
	}
	
	 // overrides Object's equals() method
	public boolean equals(Object x)
	{
		for(int i=1; i<=getSize();i++)
		{
			if(!list[i].equals(((Matrix) x).list[i])) return false;
		}
		return true;
	}
	
	// Manipulation procedures
	
	 // sets this Matrix to the zero state
	void makeZero()
	{
		for(int i=1; i<=getSize();i++)
		{
			list[i].clear();
		}
	}
	// returns a new Matrix having the same entries as this Matrix
	Matrix copy()
	{
		Matrix c = new Matrix(getSize());
		
		for(int i=1; i<=getSize();i++)
		{
			list[i].moveFront();
			while(list[i].get()!=null)
			{
				data d = ((data) list[i].get());
				c.changeEntry(i,d.index, d.data);
				list[i].moveNext();
			}
		}
		
		return c;
	}

	 // changes ith row, jth column of this Matrix to x
	 // pre: 1<=i<=getSize(), 1<=j<=getSize()
	void changeEntry(int i, int j, double x)
	{
		// check that i & j are in bounds of matrix
		if(1<=i && i<=getSize() && 1<=j && j<=getSize())
		{
			//get matrix index
			list[i].moveFront();
			
			int ind = -1;
			data d = new data(x,j);
			
			try	//tests if list is empty
			{
				while(list[i].get()!=list[i].back() && ((data) list[i].get()).index != j) list[i].moveNext();
				
				ind = ((data) list[i].get()).index;
			} 
			catch(RuntimeException err) // empty list, just add new element
			{
				//if(x!=0.0) list[i].prepend(d);
			}
			// check if x == 0, if so erase, else add new element
			if(x==0.0)
			{
				if(ind == j) list[i].delete();
			}
			else
			{
				if(ind == j)
				{	
					list[i].insertAfter(d);
					list[i].delete();
				}
				else if(ind < j)
					list[i].append(d);
				else
				{
					while(((data) list[i].get()).index >j) list[i].movePrev();
					if(list[i].get()==null) list[i].prepend(d);
					else list[i].insertAfter(d);
				}
			}
		}
	}

	 // returns a new Matrix that is the scalar product of this Matrix with x
	Matrix scalarMult(double x)
	{
		Matrix c = new Matrix(getSize());
		
		if(x==0.0)//matrix multiplied by zero is zero matrix
		{
			return c;
		}
		for(int i=1; i<=getSize();i++)
		{
			list[i].moveFront();
			while(list[i].get()!=null)
			{
				data d = ((data) list[i].get());
				c.changeEntry(i,d.index,(d.data * x));
				list[i].moveNext();
			}
		}
		
		return c;
	}
	
	 // returns a new Matrix that is the sum of this Matrix with M
	 // pre: getSize()==M.getSize()
	Matrix add(Matrix M)
	{
		if(M.getSize()==this.getSize())
		{
			Matrix c = new Matrix(getSize());
			
			//entering first row
			for(int i=1; i<=getSize();i++)
			{
				//add all columns of both rows together
				List ad = addLists(list[i],M.list[i]);
				
				ad.moveFront();
				
				//add new list to new matrix
				while(ad.get()!=null)
				{
					c.changeEntry(i, ((data) ad.get()).index, ((data) ad.get()).data);
					
					ad.moveNext();
				}
			}
			
			return c;
		}
		return null;
	}

	 // returns a new Matrix that is the difference of this Matrix with M
	 // pre: getSize()==M.getSize()
	Matrix sub(Matrix M)
	{
		Matrix inv = M.scalarMult(-1.0);
		return add(inv);
	}

	 // returns a new Matrix that is the transpose of this Matrix
	Matrix transpose()
	{
		Matrix c = new Matrix(getSize());
		
		for(int i=1; i<=getSize();i++)
		{
			list[i].moveFront();
			while(list[i].get()!=null)
			{
				data d = ((data) list[i].get());
				c.changeEntry(d.index,i,d.data);
				list[i].moveNext();
			}
		}
		
		return c;
	}

	 // returns a new Matrix that is the product of this Matrix with M
	 // pre: getSize()==M.getSize()
	Matrix mult(Matrix M)
	{
		if(M.getSize()==this.getSize())
		{
			Matrix T = M.transpose();
			Matrix c = new Matrix(getSize());
			
			//entering first row
			for(int i=1; i<=getSize();i++)
			{
				list[i].moveFront();
				//entering columns
				for(int j=1; (j<=T.getSize() && (list[i].get()!=null));j++)
				{
					//contains dot product of row i to column j
					double cdata=dot(list[i],T.list[j]);
					c.changeEntry(i, j, cdata);
					list[i].moveFront();
				}
			}
			return c;
		}
		return null;
	}

	// Other functions
	
	 // overrides Object's toString() method
	public String toString()
	{
		String c = "";
		
		for(int i=1; i<=getSize();i++)
		{
			list[i].moveFront();
			if(list[i].get()!=null)
			{
				c+=String.valueOf(i)+": ";
				
				for(int j=0; j<list[i].length();j++)
				{
					data d = ((data) list[i].get());
					c+="("+String.valueOf(d.index)+", "+String.valueOf(d.data)+") ";
					//c+= " length: "+String.valueOf(list[i].length());
					list[i].moveNext();
				}
				
				c+="\r\n";
			}
		}
		
		return c;
	}
	
	// Helper functions
	
	//Return the addition of 2 lists A and B
	private List addLists(List A, List b)
	{
		List B = new List();
		List c = new List();
		
		//avoid skipping bug when adding to self
		b.moveFront();
		while(b.get()!=null)
		{
			B.append(b.get());
			b.moveNext();
		}
		//
		
		A.moveFront();
		B.moveFront();
		
		//increment through list as long as both exists
		while(A.get()!=null && B.get()!=null)
		{
			
			//if indexs are equel: append sum and advance both
			//else if index B is less, append and advance B
			//else if index A is less, append and advance A
			if(((data) A.get()).index==((data) B.get()).index)
			{
				data d = new data(((data) A.get()).data+((data) B.get()).data, ((data) A.get()).index);
				
				c.append(d);
				
				A.moveNext();
				B.moveNext();
			}
			else if(((data) A.get()).index > ((data) B.get()).index)
			{
				c.append(B.get());
				
				B.moveNext();
			}
			else if(((data) A.get()).index < ((data) B.get()).index)
			{
				c.append(A.get());
				
				A.moveNext();
			}
		}
		//If B no longer exists so add the rest of A
		while(A.get()!=null)
		{
			c.append(A.get());
			A.moveNext();
		}
		//If A no longer exists so add the rest of B
		while(B.get()!=null)
		{
			c.append(B.get());
			B.moveNext();
		}
		
		return c;
	}
	
	// returns dot product of two lists as double
	private static double dot(List P, List Q)
	{
		double c=0;
		
		P.moveFront();
		Q.moveFront();
		
		//Perform dot product here
		while(P.get()!=null)
		{
			if(Q.get()==null)
			{
				P.moveNext();
				Q.moveFront();
			}
			else
			{
				if (((data) P.get()).index==((data) Q.get()).index) 
					c+=((data) P.get()).data * ((data) Q.get()).data;

				Q.moveNext();
			}
		}
		
		return c;
	}

}
