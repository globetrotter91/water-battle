import Vector from './Vector';

export default class Entity {
    constructor(position) {
        this.position = position;   // type vector
        this.velocity = new Vector(0,0,0);   // type vector
    }

    getDistance(entity) {
        return this.position.distance(entity.position);
    }
}