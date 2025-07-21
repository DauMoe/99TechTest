# Three ways to sum to n
Provide 3 unique implementations of the following function in JavaScript.  
**Input**: `n` - any integer  
*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.  
**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.  

# Solution

1. Gauss Formula. Something I were learned in mid school
2. A common way: Using for loop. A variable to carry sum value and it will be increased after each loop
3. Generate an array start from 1 to n then using `reduce` method to calculate the sum with initialize value is 0

# Did I try another approach?
- I did try recursive but it will leads to `Maximum call stack size exceeded` error if N is thousands
