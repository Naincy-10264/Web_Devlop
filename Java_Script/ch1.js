const prompt = require("prompt-sync")();
// function find(number){
//     if(number%3==0 && number%5==0){
//         console.log("FizzBuzz");
//     }
//     else if(number%3==0){
//         console.log("Fizz");
//     }
//     else if(number%5==0){
//         console.log("Buzz");
//     }
// }
// let num=prompt("enter the number ");
// find(num);

var number=[];
var count=1;
function FizzBuzz(){
    if(count%3==0 && count%5==0){
        number.push("FizzBuzz");
        }
    else if(count%3==0){
        number.push("Fizz");
    }
    else if(count%5==0){
        number.push("Buzz");
    }
    else{
        number.push(count);
    }
    count=count+1;
    console.log(number);
}
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
