const prompt = require("prompt-sync")();

var arr=["Naincy", "Abhishek", "Akshat"];
console.log(arr);
console.log(arr[1]);
console.log(arr.length);
var name=prompt("enter your name ");
if(arr.includes(name)){
    console.log("True! your name is there");
}
else{
    console.log("Lets! try next time");
}


