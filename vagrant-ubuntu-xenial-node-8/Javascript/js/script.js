// var a = 5;

// function test() {
//     var a = 3;
//     alert(a);
// }
// test();
// alert(a);


var videoCourses = [
    "html",
    "plsql",
    "javascript",
    "array",
    "sass",
    "gulp",
    "less",
    "aem",
    "bla",
    "bla",
    "bla"
];
var result = document.getElementById("result");


var i = 0;

while (i < videoCourses.length) {
    result.innerHTML += videoCourses[i] + "<br>";

    i++;
}