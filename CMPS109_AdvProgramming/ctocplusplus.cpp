// Convert this program to C++

// change to C++ io

// change to one line comments

// change defines of constants to const

// change array to vector<>

// inline any short function


using namespace std;

#include <iostream>
#include <vector>

const int N = 40;

//	Adds total int in vector to p
inline void sum(int*p, vector<int> d)

{

	for (int i = 0; i < d.size(); ++i)

		*p = *p + d[i];

}

int main()

{

	int accum = 0;

	vector<int> data;

	for (int i = 0; i < N; ++i)

		data.push_back (i);

	sum(&accum, data);

	cout << "sum is " << accum << "\n";
}