import Vector from './Vector';

export default class Entity {
    constructor(position) {
        this.position = position;   // type vector
        this.velocity = new Vector(0,0);   // type vector
    }

    nextPosition() {
        return this.position.add(this.velocity);
    }

    positioWithVelocity(velocity) {
        return this.position.add(velocity);
    }

    update() {
        this.position = this.nextPosition();
    }

    getDistance(entity) {
        return this.position.distance(entity.position);
    }
}