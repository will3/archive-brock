var $ = require('jquery');
var THREE = require('three');

var Drawing = function() {
    var container = typeof document === undefined ? null : document.getElementById('container');

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, container.width / container.height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.width, container.height);
    container.appendChild(renderer.domElement);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();

    var objectMap = {};

    var tick = function(components) {
        for (var i in components) {
            var component = components[i];

            var object = objectMap[component.id];

            if (object != component.object) {
                if (object != null) {
                    scene.remove(object);
                }

                if (component.object != null) {
                    scene.addObject(component.object);
                }
            }
        }
    };

    return {
        types: ['renderState']
        tick: tick
    };
};

module.exports = function() {
    return new Drawing();
};