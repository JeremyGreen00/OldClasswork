//-------------------------------------------------------------------------------//
//	Name: Jeremy Green
//	CruzID: jgreen3
//	Assignment: pa3
//	MatrixTest.java
//	Tests Matrix.java
//-------------------------------------------------------------------------------//
import java.io.IOException;

public class MatrixTest {
	public static void main(String[] args) throws IOException 
	{
		Matrix A = new Matrix(3);
		Matrix B = new Matrix(3);
		
		A.changeEntry(1, 1, 1.0);
		A.changeEntry(1, 2, 2.0);
		A.changeEntry(1, 3, 3.0);
		
		A.changeEntry(2, 1, 1.0);
		A.changeEntry(2, 2, 2.0);
		A.changeEntry(2, 3, 3.0);
		
		A.changeEntry(3, 1, 3.0);
		A.changeEntry(3, 2, 2.0);
		A.changeEntry(3, 3, 1.0);
		
		B.changeEntry(3, 1, 3.0);
		B.changeEntry(3, 2, 0.0);
		B.changeEntry(3, 3, 1.0);
		
		B.changeEntry(2, 1, 2.0);
		B.changeEntry(2, 2, 2.5);
		B.changeEntry(2, 3, 0.0);
		
		B.changeEntry(1, 1, 1.0);
		B.changeEntry(1, 2, 0.0);
		B.changeEntry(1, 3, 3.0);
		
		System.out.println("A:\n" + A.toString());
		System.out.println("B:\n" + B.toString());
		
		B.changeEntry(2, 2, 0.0);
		B.changeEntry(0, 2, 5.0);
		B.changeEntry(2, 0, 6.0);
		
		B.changeEntry(3, 1, 1.2);
		
		System.out.println("Testing elm removal and change as well as out of bounds on B:\n" + B.toString());
		
		B.changeEntry(3, 1, 3.0);

		System.out.println("Testing element change on B:\n" + B.toString());
		
		Matrix C = B.transpose();
		
		System.out.println("B^T:\n" + C.toString());
		
		Matrix D = A.mult(B);
		//	Expected answer for A*B
		// 	1: (1, 14.0) (3, 6.0) 
		//	2: (1, 14.0) (3, 6.0) 
		//	3: (1, 10.0) (3, 10.0)
		 

		System.out.println("A*B:\n" + D.toString());
		
		//test scaler multiplication
		C = D.scalarMult(-1.0);
		
		System.out.println("A*B*(-1):\n" + C.toString());
		
		C = D.scalarMult(0);
		
		System.out.println("A*B*(0):\n" + C.toString());
		
		//test addition
		C = A.add(B);
		
		System.out.println("A+B:\n" + C.toString());
		
		//test subtraction
		C = A.sub(B);
		
		System.out.println("A-B:\n" + C.toString());
		
		//TEST TWO!!
		
		Matrix Am = new Matrix(1000000);
		Matrix Bm = new Matrix(1000000);
		
		Am.changeEntry(100000, 1, 1.0);
		Am.changeEntry(100000, 2, 2.0);
		Am.changeEntry(100000, 3, 3.0);
		
		Am.changeEntry(200000, 1, 1.0);
		Am.changeEntry(200000, 2, 2.0);
		Am.changeEntry(200000, 3, 3.0);
		
		Am.changeEntry(300000, 1, 3.0);
		Am.changeEntry(300000, 2, 2.0);
		Am.changeEntry(300000, 3, 1.0);
		
		Bm.changeEntry(3, 100000, 3.0);
		Bm.changeEntry(3, 200000, 0.0);
		Bm.changeEntry(3, 300000, 1.0);
		
		Bm.changeEntry(2, 100000, 2.0);
		Bm.changeEntry(2, 200000, 2.5);
		Bm.changeEntry(2, 300000, 0.0);
		
		Bm.changeEntry(1, 100000, 1.0);
		Bm.changeEntry(1, 200000, 0.0);
		Bm.changeEntry(1, 300000, 3.0);
		
		System.out.println("Am:\n" + Am.toString());
		System.out.println("Bm:\n" + Bm.toString());
		
		Bm.changeEntry(2, 200000, 0.0);
		Bm.changeEntry(0, 200000, 5.0);
		Bm.changeEntry(-12, 0, 6.0);
		
		Bm.changeEntry(3, 100000, 1.2);
		
		System.out.println("Testing elm removal and change as well as out of bounds on Bm:\n" + Bm.toString());
		
		Bm.changeEntry(3, 100000, 3.0);

		System.out.println("Testing element change on Bm:\n" + Bm.toString());
		
		Matrix Cm = Bm.transpose();
		
		System.out.println("Bm^T:\n" + Cm.toString());
		
		Matrix Dm = Am.mult(Bm);
		//	Expected answer for Am*Bm
		// 	1: (1, 14.0) (3, 6.0) 
		//	2: (1, 14.0) (3, 6.0) 
		//	3: (1, 10.0) (3, 10.0)
		 

		System.out.println("Am*Bm:\n" + Dm.toString());
		
		//test scaler multiplication
		Cm = Dm.scalarMult(-1.0);
		
		System.out.println("Am*Bm*(-1):\n" + Cm.toString());
		
		Cm = Dm.scalarMult(0);
		
		System.out.println("Am*Bm*(0):\n" + Cm.toString());
		
		//test addition
		Cm = Am.add(Bm);
		
		System.out.println("Am+Bm:\n" + Cm.toString());
		
		//test subtraction
		Cm = Am.sub(Bm);
		
		System.out.println("Am-Bm:\n" + Cm.toString());
		
		Cm.makeZero();
		
		System.out.println("Cm:\n" + Cm.toString());
	}
}
/*
		A:
		1: (1, 1.0) (2, 2.0) (3, 3.0) 
		2: (1, 1.0) (2, 2.0) (3, 3.0) 
		3: (1, 3.0) (2, 2.0) (3, 1.0) 
		
		B:
		1: (1, 1.0) (3, 3.0) 
		2: (1, 2.0) 
		3: (1, 3.0) (3, 1.0) 
*/
