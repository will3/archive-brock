var THREE = require('three');
var _ = require('lodash');
var drawing = require('./drawing')();

var Engine = function() {
    var systems = {
        'drawing': drawing
    };

    var use = function(key, system) {
        systems[key] = system;
        system.start();
    }

    var entityMap = {};
    var componentMap = {};

    var addEntity = function(entity) {
        if (entity.id == null) {
            entity.id = THREE.Math.generateUUID();
        }

        entityMap[entity.id] = {
            entity: entity,
            components: []
        };
    };

    var attachComponent = function(entity, component) {
        if (component.id == null) {
            component.id = THREE.Math.generateUUID();
        }

        if (component.type == null) {
            component.type = 'script';
        }

        var map = componentMap[component.type];
        if (map == null) {
            map = componentMap[component.type] = {};
        }

        map[component.id] = component;

        entityMap[entity.id].components.push(component);
    };

    var removeEntity = function(entity) {
        var id = entity.id;
        delete entityMap[id];
    };

    var dettachComponent = function(entity, component) {
        delete componentMap[component.type][component.id];
        _.pull(entityMap[entity.id].components, component);
    };

    var frameRate = 48.0;
    var interval = function() {
        for (var key in systems) {
            var system = systems[key];

            var components = [];
            (system.types || []).forEach(function(type) {
                for (var id in componentMap[type]) {
                    components.push(componentMap[type][id]);
                }
            });

            system.tick(components);
        }

        setTimeout(interval, 1000 / frameRate);
    };

    interval();

    return {
        addEntity: addEntity,
        removeEntity: removeEntity,
        attachComponent: attachComponent,
        dettachComponent: dettachComponent
    }
};

module.exports = Engine;