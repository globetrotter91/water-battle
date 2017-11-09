export default class Vector {
	// Constructor
	constructor(inX, inY, inZ=0) {
		if(typeof inX != "number")
			throw new Error("Invalid x value.");
		if(typeof inY != "number")
			throw new Error("Invalid y value.");
		
		// Store the (x, y) coordinates
		this.x = inX;
		this.y = inY;
		this.z = inZ;
	}

	get X() {
		return this.x;
	}



	get Y() {
		return this.y;
	}



	get Z() {
		return this.z;
	}


	/**
	 * Add another vector to this vector.
	 * @param {Vector} v The vector to add.
	 * @return {Vector}   The current vector. useful for daisy-chaining calls.
	 */
	add(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	/**
	 * Take another vector from this vector.
	 * @param  {Vector} v The vector to subtract from this one.
	 * @return {Vector}   The current vector. useful for daisy-chaining calls.
	 */
	subtract(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;
	}


	/**
	 * Multiply the current vector by a given value.
	 * @param  {(number|Vector)} value The number (or Vector) to multiply the current vector by.
	 * @return {Vector}	   The current vector. useful for daisy-chaining calls.
	 */
	multiply(value) {
		if(value instanceof Vector)
		{
			this.x *= value.x;
			this.y *= value.y;
			this.z *= value.z;
		}
		else if(typeof value == "number")
		{
			this.x *= value;
			this.y *= value;
			this.z *= value;
		}
		else
			throw new Error("Can't multiply by non-number value.");
		
		return this;
	}
	


	/**
	 * Return the dot product of the current vector and another vector.
	 * @param  {Vector} v   The other vector we should calculate the dot product with.
	 * @return {Vector}	 The current vector. Useful for daisy-chaining calls.
	 */
	dotProduct(v) {
		return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
	}

	/**
	 * Clones the current vector.
	 * @return {Vector} A clone of the current vector. Very useful for passing around copies of a vector if you don't want the original to be altered.
	 */
	clone() {
		return new Vector(this.x, this.y, this.z);
	}

	/**
	 * Return the distance between current vector and supplied vector.
	 * @param  {Vector} v   The other vector we should calculate the distance from.
	 * @return {Vector}	 The current vector. Useful for daisy-chaining calls.
	 */
	distance(v) {
		return Math.sqrt(Math.pow(this.x-v.x,2) + Math.pow(this.y-v.y,2) + Math.pow(this.z-v.z,2) );
	}

	
	/**
	 * Whether the vector is equal to another vector.
	 * @param  {Vector} v The vector to compare to.
	 * @return {boolean}  Whether the current vector is equal to the given vector.
	 */
	equalTo(v)	{
		if(this.x == v.x && this.y == v.y && this.z == v.z)
			return true;
		else
			return false;
	}


	/**
	 * Get the length of the current vector.
	 * @return {number} The length of the current vector.
	 */
	get length() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) );
	}

	/**
	 * Using the angle get x and y components and return vector 
	 * @param  {number} angle The angle at which the .
	 * @return {Vector}  velocity of the entity.
	 */
	getVelocityFromAngle(angle)	{
		return new Vector((Math.sin(angle)), 0, -(Math.cos(angle)));
	}


		
}