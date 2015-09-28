var THREE = require('three');

var RigidBody = function() {
    this.type = 'rigidBody';

    this.acceleration = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
};

module.exports = RigidBody;