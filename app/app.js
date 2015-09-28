var THREE = require('three');

window.onload = function() {
    var engine = require('../src/engine')();
    var renderer = engine.getRenderer();
    renderer.setClearColor(0xffffff);

    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    var object = new THREE.Mesh(geometry, material);

    var player = engine.addEntity({
        object: object,
        mass: 10
    });

    player.applyForce(new THREE.Vector3(0, 1, 0));
};