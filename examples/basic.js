var reflection = require('../lib/reflection');

function func1(arg1 /* [@isNumber] */, arg2) {
  /* [@DOC{author:'Demetrius Johnson', desc:'adds two numbers'}] */
 return arg1 + arg2;
}

var json = {
  abc: function(arg1 /* [@magic] */) {
    
  }
}

func1.reflect();
reflection.reflect(json);

console.log(func1.args);
console.log(func1.func);

console.log(json.abc.args);
console.log(json.abc.func);
