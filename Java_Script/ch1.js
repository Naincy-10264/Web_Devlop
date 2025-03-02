const prompt = require("prompt-sync")();
function find(number){
    if(number%3==0 && number%5==0){
        console.log("FizzBuzz");
    }
    else if(number%3==0){
        console.log("Fizz");
    }
    else if(number%5==0){
        console.log("Buzz");
    }
}
let num=prompt("enter the number ");
find(num);