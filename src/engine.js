var THREE = require('three');
var _ = require('lodash');
var drawing = require('./drawing')();

var Engine = function() {
    var engine = {};

    var systems = {
        'drawing': drawing
    };

    var use = function(type, system) {
        systems[type] = system;
        system.start();
    };

    var entityMap = {};
    var componentMap = {};

    var types = {};

    var register = function(type, constructor) {
        types[type] = constructor;
    };

    var addEntity = function(def) {
        var entity = {
            id: THREE.Math.generateUUID(),
            setObject3D: function(object) {
                engine.setObject3D(this, object);
            }
        };

        entityMap[entity.id] = {
            entity: entity,
            components: []
        };

        var components = _.map(def, function(componentDef) {
            var component = new types[componentDef]();
            attachComponent(entity, component);
        });

        return entity;
    };

    var getComponents = function(entity) {
        return entityMap[entity.id].components;
    };

    var getComponent = function(entity, type) {
        return _.find(getComponents(entity), function(component) {
            return component.type === type;
        });
    };

    var attachComponent = function(entity, component) {
        if (component.id === undefined) {
            component.id = THREE.Math.generateUUID();
        }

        if (component.type === undefined) {
            component.type = 'script';
        }

        var map = componentMap[component.type];
        if (map === undefined) {
            map = componentMap[component.type] = {};
        }
        map[component.id] = component;
        entityMap[entity.id].components.push(component);
    };

    var setObject3D = function(entity, object) {
        var drawing = getComponent(entity, 'drawing');
        if (drawing === undefined) {
            attachComponent(entity, {
                type: 'drawing',
                renderState: object
            });
        } else {
            drawing.renderState = object;
        }
    };

    var removeEntity = function(entity) {
        var id = entity.id;
        delete entityMap[id];
    };

    var frameRate = 48.0;
    var interval = function() {
        for (var type in systems) {
            var system = systems[type];
            system.tick(componentMap[type]);
        }

        setTimeout(interval, 1000 / frameRate);
    };

    interval();

    engine.register = register;
    engine.addEntity = addEntity;
    engine.setObject3D = setObject3D;

    return engine;
};

module.exports = Engine;