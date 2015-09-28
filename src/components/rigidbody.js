var THREE = require('three');

var RigidBody = function() {
    this.type = 'rigidBody';

    //immovable by default
    this.mass = Infinity;
    this.acceleration = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
};

RigidBody.prototype = {
    constructor: RigidBody,

    applyForce: function(force) {
        var acceleration = force.clone().multiplyScalar(1 / this.mass);
        this.acceleration.add(acceleration);
    }
};

module.exports = RigidBody;