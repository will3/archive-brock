var Physics = function() {
    var friction = 0.98;

    var tick = function(componentMap) {
        for (var id in componentMap) {
            var component = componentMap[id];
            component.velocity.add(component.acceleration);
            component.velocity.multiplyScalar(friction);
            var transform = component.entity.transform;
            transform.position.add(component.velocity);
            component.acceleration.set(0, 0, 0);
        }
    };

    return {
        componentType: 'rigidBody',
        tick: tick
    };
};

module.exports = Physics;