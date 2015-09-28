var $ = require('jquery');
var THREE = require('three');

var Drawing = function() {
    var renderer, scene, camera, container;

    var init = function() {
        container = document.getElementById('container');
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 10;
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
    };

    var render = function() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    if (typeof document === 'undefined') {
        console.log('cant draw without a document');
    } else {
        init();
        render();
    }

    var objectMap = {};

    var tick = function(componentMap) {
        for (var id in componentMap) {
            var component = componentMap[id];

            var object = objectMap[id];

            if (object !== component.object) {
                if (object !== null && object !== undefined) {
                    scene.remove(object);
                    delete objectMap[id];
                }

                if (component.object !== null) {
                    scene.add(component.object);
                    objectMap[id] = component.object;
                }
            }

            if (component.object !== null) {
                var transform = component.entity.transform;
                component.object.position.copy(transform.position);
                component.object.rotation.copy(transform.rotation);
                component.object.scale.copy(transform.scale);
            }
        }
    };

    return {
        componentType: ['renderState'],
        tick: tick,
        renderer: renderer
    };
};

module.exports = Drawing;