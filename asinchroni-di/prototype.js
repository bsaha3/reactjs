
var plant=function(){
    this.name='banyan';
};

plant.prototype.age=function(num){
    this.old=num;
    console.log(this.name+" tree is "+this.old+" years old");
};

var flower=function(color){
     this.flowerColor=color;
};

flower.prototype=new plant();

flower.prototype.hello=function(){
    console.log('hello world');
};



var obj=new flower('red');

obj.age(77);

console.log(obj.flowerColor);

obj.hello();