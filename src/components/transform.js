var THREE = require('three');

var Transform = function() {
    this.type = 'transform';

    this.position = new THREE.Vector3();
    this.rotation = new THREE.Euler();
    this.rotation.order = 'YXZ';
    this.scale = new THREE.Vector3(1, 1, 1);
};

module.exports = Transform;