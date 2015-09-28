var THREE = require('three');
var _ = require('lodash');
var Drawing = require('./systems/drawing');
var Physics = require('./systems/physics');
var types = require('./types');

var Engine = function() {
    var engine = {};

    var systems = {
        'drawing': new Drawing(),
        'physics': new Physics()
    };

    var use = function(type, system) {
        systems[type] = system;
        system.start();
    };

    var entityMap = {};
    var componentMap = {};

    var register = function(type, constructor) {
        types[type] = constructor;
    };

    var addEntity = function() {
        var entity = {
            id: THREE.Math.generateUUID(),
            setObject3D: function(object) {
                engine.setObject3D(this, object);
            },
            getComponents: function() {
                return getComponents(this);
            },
            getComponent: function(type) {
                return getComponent(this, type);
            },
            attachComponent: function(type) {
                return attachComponent(type);
            }
        };

        entityMap[entity.id] = {
            entity: entity,
            components: []
        };

        if (getComponent(entity, 'transform') === undefined) {
            attachComponent(entity, 'transform');
        }

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
        if (_.isString(component)) {
            component = new types[component]();
        }

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

        return component;
    };

    var setObject3D = function(entity, object) {
        var renderState = getComponent(entity, 'renderState');
        if (renderState === undefined) {
            renderState = attachComponent(entity, 'renderState');
        }
        renderState.object = object;
    };

    var removeEntity = function(entity) {
        var id = entity.id;
        delete entityMap[id];
    };

    var frameRate = 48.0;
    var interval = function() {
        for (var type in systems) {
            var system = systems[type];
            system.tick(componentMap[system.componentType]);
        }

        setTimeout(interval, 1000 / frameRate);
    };

    interval();

    engine.register = register;
    engine.addEntity = addEntity;
    engine.setObject3D = setObject3D;

    return engine;
};

module.exports = function() {
    return new Engine();
};