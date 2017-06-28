const css = require('./app.scss');

var myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

myArr.forEach(x => {
  console.log(x);
});

console.log("Hello from app.js!");

var node = document.createElement("h1");
node.innerHTML = "This is a later added thing.";
document.body.appendChild(node);
