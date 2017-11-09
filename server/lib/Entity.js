import Vector from './Vector';
/**
 * @class Entity
 * @description This class is base class any entity there is on the screen
 * Every entity has a position and a velocity
 */
export default class Entity {
    /**
     * 
     * @param {Vector} position position of the entity
     */
    constructor(position) {

        this.position = position;   // type vector
        this.velocity = new Vector(0,0,0);   // type vector

    }

    /**
     * 
     * @param {*} entity distance to be calculated from this entity
     * @description This method calculates the distance between entities
     */
    getDistance(entity) {
        return this.position.distance(entity.position);
    }
}