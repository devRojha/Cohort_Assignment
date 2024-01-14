/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

const currtime = new Date();

function calculateTime(n) {
    let count = 0;
    let t1 = currtime.getTime(); // Record the starting time

    for (let i = 1; i <= n; i++) {
        count += i;
    }

    let t2 = currtime.getTime(); // Record the ending time
    let elapsedTime = t2 - t1; // Calculate the time difference in milliseconds

    return elapsedTime;
}

let elapsedTime = calculateTime(10000000000);
console.log(elapsedTime + " ms"); // Print the time in milliseconds
