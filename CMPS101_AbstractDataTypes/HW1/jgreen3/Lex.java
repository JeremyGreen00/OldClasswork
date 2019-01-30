//-------------------------------------------------------------------------------//
//	Name: Jeremy Green
//	CruzID: jgreen3
//	Assignment: pa1
//	Lex.java
//	Takes 2 arguments for input and ouput file locations. Reads in input as string
//	and sorts alphabetically using ADT List. Outputs sorted as text file.
//-------------------------------------------------------------------------------//

import java.io.*;
import java.util.Scanner;

public class Lex 
{

	public static void main(String[] args) throws IOException 
	{
		//Define variables
		Scanner in = null;
		PrintWriter out = null;
		String line = "";
		String[] token = null;
		List sorted = new List();

		//Checks to see if 2 arguments were provided
		if(args.length < 2)
		{
			System.err.println("Usage: Lex infile outfile");
			System.exit(1);
		}
		
		//Opens files at reader and writer locations
		in = new Scanner(new File(args[0]));
		out = new PrintWriter(new FileWriter(args[1]));
		
		//Creates array of strings for sorting
		while( in.hasNextLine() )
		{
			line += in.nextLine() + "\n";
		}
		token = line.split("\n");
		
		//Sorts by generating List from array similar to insertion sort.
		sorted.append(0);
		for (int i = 1; i < token.length; i++)
		{
			sorted.moveFront();
			if(token[sorted.front()].compareTo(token[i])>0)
			{
				sorted.prepend(i);
			}
			else
			{
				do
				{
					sorted.moveNext();
				}
				while( sorted.index()>=0 && token[sorted.get()].compareTo(token[i])<0);

				if(sorted.index()==-1) sorted.append(i);
				else sorted.insertBefore(i);
			}
		}
		
		//Outputs sorted list
		sorted.moveFront();
		while(sorted.index()!=-1)
		{
			out.println(token[sorted.get()]);
			sorted.moveNext();
		}

		//Close files. Very important
		in.close();
		out.close();
	}

}
