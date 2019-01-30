//-------------------------------------------------------------------------------//
//	Name: Jeremy Green
//	CruzID: jgreen3
//	Assignment: pa3
//	Sparse.java
//	Reads in matrix data and performs various operations
//-------------------------------------------------------------------------------//

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class Sparse {

	public static void main(String[] args) throws IOException 
	{
		//Define variables
		Scanner in = null;
		PrintWriter out = null;

		//Checks to see if 2 arguments were provided
		if(args.length < 2)
		{
			System.err.println("Usage: Sparse infile outfile");
			System.exit(1);
		}
		
		//Opens files at reader and writer locations
		in = new Scanner(new File(args[0]));
		out = new PrintWriter(new FileWriter(args[1]));
		
		//reads in size, number of non-zero values for A and B
		int mSize = in.nextInt();
		int loopA = in.nextInt();
		int loopB = in.nextInt();
		
		Matrix A = new Matrix(mSize);
		Matrix B = new Matrix(mSize);
		
		//read in matrix
		for(int i=0;i<loopA;i++)
		{
			A.changeEntry(in.nextInt(), in.nextInt(), in.nextDouble());
		}
		
		for(int i=0;i<loopB;i++)
		{
			B.changeEntry(in.nextInt(), in.nextInt(), in.nextDouble());
		}
		
		out.println("A has "+String.valueOf(A.getNNZ())+" non-zero entries:\r\n" + A.toString());
		out.println("B has "+String.valueOf(B.getNNZ())+" non-zero entries:\r\n" + B.toString());
		
		//Begin Tests
		Matrix C = A.scalarMult(1.5);
		out.println("(1.5)*A =\r\n" + C.toString());

		C = A.add(B);
		out.println("A+B =\r\n" + C.toString());

		C = A.add(A);
		out.println("A+A =\r\n" + C.toString());

		C = B.sub(A);
		out.println("B-A =\r\n" + C.toString());

		C = A.sub(A);
		out.println("A-A =\r\n" + C.toString());

		C = A.transpose();
		out.println("Transpose(A) =\r\n" + C.toString());

		C = A.mult(B);
		out.println("A*B =\r\n" + C.toString());

		C = B.mult(B);
		out.println("B*B =\r\n" + C.toString());
		
		//Close files. Very important
		in.close();
		out.close();
	}
}
