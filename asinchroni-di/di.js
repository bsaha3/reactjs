var Asynchrony = require('asynchrony-di');
var asynchrony = new Asynchrony();

asynchrony.add('FirstName', [function (done) {
  setTimeout(function () {
    done(null, 'Biswajit')
  });
}]);

asynchrony.add('LastName', ['FirstName', function (FirstName, done) {
  setTimeout(function () {
    done(null, FirstName);
  });
}]);

asynchrony.invoke(['FirstName', 'LastName', function (t1, t2) {
  console.log(t1); // prints Biswajit; 
  console.log(t2); // prints Biswajit; 
}]);

asynchrony.invokeRemainingTask(function () {
  console.log('abc');
});