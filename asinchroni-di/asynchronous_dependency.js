var Asynchrony = require('asynchrony-di');
var should = require('should');

describe('Async Dependency Injection', function () {
    it('Basic Scenario for async test', function (done) {
        var asynchrony = new Asynchrony();

        var rand = (Math.random() * 99387593793);
        var count = 0;

        asynchrony.add('thing1', [function (done) {
            setTimeout(function () {
                count++;
                return done(null, rand);
            },1000);
        }]);

        count.should.be.exactly(0);

        asynchrony.invoke(['thing1', function (thing1) {
            count.should.be.exactly(1);
            thing1.should.be.exactly(rand);
            asynchrony.invoke(['thing1', function (thing1) {
                count.should.be.exactly(1);
                thing1.should.be.exactly(rand);
                done();
            }]);  
        }]);
    });

    it('Basic Scenario for async test', function (done) {
        var asynchrony = new Asynchrony();

        var rand = (Math.random() * 99387593793);
        var count = 0;

        asynchrony.add('thing1', [function (done) {
            setTimeout(function () {
                count++;
                return done(null, rand);
            });
        }]);

        count.should.be.exactly(0);

        asynchrony.invoke(['thing1', function (thing1) {
            count.should.be.exactly(1);
            thing1.should.be.exactly(rand);
            asynchrony.invoke(['thing1', function (thing1) {
                count.should.be.exactly(1);
                thing1.should.be.exactly(rand);
                done();
            }]);  
        }]);
    });


});