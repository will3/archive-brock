var THREE = require('three');

window.onload = function() {
    var engine = require('../src/engine')();

    var player = engine.addEntity();

    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    var object = new THREE.Mesh(geometry, material);

    engine.setObject3D(player, object);
};