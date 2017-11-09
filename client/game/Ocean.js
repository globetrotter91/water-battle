class Ocean {
	constructor(game) {
		this.game = game;
		this.parameters = {
			oceanSide: 30000,
            size: 1.0,
            distortionScale: 3.7,
            alpha: 1.0
		}
		this.object = new THREE.Water(
			this.parameters.oceanSide * 5,
			this.parameters.oceanSide * 5,
			{
				textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', (texture) => {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }),
                alpha: 	this.parameters.alpha,
                sunDirection: this.game.mainDirectionalLight.position.clone().normalize(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: this.parameters.distortionScale,
			}
		);
	}

	initiate() {
        this.object.rotation.x = - Math.PI / 2;
        this.object.receiveShadow = true;

		this.game.scene.add(this.object);
	}

	update() {
		this.object.material.uniforms.time.value += 1.0 / 60.0;
        this.object.material.uniforms.size.value = this.parameters.size;
        this.object.material.uniforms.distortionScale.value = this.parameters.distortionScale;
        this.object.material.uniforms.alpha.value = this.parameters.alpha;
	}
}

export default Ocean;