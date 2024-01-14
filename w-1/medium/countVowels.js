/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let check = "aeiou";
    let res = 0;
    for(let i = 0 ; i < str.length ; i+=1){
      if(check.includes(str[i].toLowerCase())){
        res += 1;
      }
    }
    return res;
}

module.exports = countVowels;