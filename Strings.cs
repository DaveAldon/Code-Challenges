// C# console palindrome finder

using System;
using System.Collections.Generic;

class Palindrome
{
	static void Main(string[] args)
	{
		// Get input
		Console.WriteLine("Input string: ");
		string input = Console.ReadLine();
		
		// New list of chars to hold the string
		List<char> charList = new List<char>();
		// The AddRange method takes an IEnumerable<char>, and the String class implements IEnumerable<char>, so you can add it here
		charList.AddRange(input);
		// Reverse the string that's split into the list of chars
		charList.Reverse();
		// Convert the list to an array and pass it into the string constructor
		string reversal = new string(charList.ToArray());
		
		Console.WriteLine(reversal);
		// If the reverse is equal to the input, then it's a palindrome!
		if(reversal == input) {
			Console.WriteLine("Is a palindrome");
		} else {
			Console.WriteLine("Is not a palindrome");
		}
	}
}
