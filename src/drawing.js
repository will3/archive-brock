var $ = require('jquery');
var THREE = require('three');

var Drawing = function() {
    var container = typeof document === undefined ? null : document.getElementById('container');

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 10;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();

    var objectMap = {};

    var tick = function(componentMap) {
        for (var id in componentMap) {
            var component = componentMap[id];

            var object = objectMap[id];

            if (object !== component.renderState) {
                if (object !== null && object !== undefined) {
                    scene.remove(object);
                    delete objectMap[id];
                }

                if (component.renderState !== null) {
                    scene.add(component.renderState);
                    objectMap[id] = component.renderState;
                }
            }
        }
    };

    return {
        types: ['renderState'],
        tick: tick
    };
};

module.exports = function() {
    return new Drawing();
};