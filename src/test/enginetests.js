var Engine = require('../engine');
var expect = require('chai').expect;

describe('Engine', function() {
    describe('#addEntity', function() {
        it('should add transform component', function() {
            var engine = new Engine();
            var entity = engine.addEntity();

            /*jshint expr:true */
            expect(entity.getComponent('transform')).to.exist;
        });
    });
});