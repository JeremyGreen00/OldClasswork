// Nagie Khant
// 1491415 
// HW 1
// Program adds up numbers from a vector and prints it a sum out

#include <iostream>
#include <vector>

using namespace std;
const int N = 40;

// inline function that adds sum of the values of the vector
inline void sum(int& sum, vector<int> numVector) {
	sum = 0;
	for(vector<int> :: iterator i = numVector.begin(); i != numVector.end(); ++i){
		sum = sum+ *i;
	}
}

// main function
int main(){
	int accum = 0;
	
	// assign numbers from 1-N into vector
	vector<int> data;
	for(int i = 0; i < N; ++i){
		data.push_back(i);
	}
	
	//calls function that sums values in a vector
	sum(accum, data);
	
	//print
	cout <<"sum is " << accum << endl;

}