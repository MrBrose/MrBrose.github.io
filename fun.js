

class GlowParticle extends Particles{
	INITIAL_PARTICLES_PER_PIXEL = 0.1;
	MIN_ALPHA =  0;
	MAX_ALPHA = 0.75;
	MOUSE_REPULSION = 1;
	IN_TEXT_SPEED_MODIFIER = 1;
	OUT_OF_TEXT_OPACITY_MODIFIER = 1;
	PARTICLE_R = 130;		// 0 < x < 255
	PARTICLE_G = 140;
	PARTICLE_B = 170;
	CLICK_AMOUNT = 5000;
	MIN_XVEL=-0.05;
	MAX_XVEL=0.05;
	MIN_YVEL=-0.05;
	MAX_YVEL=0.05;
	MOUSE_VEL_FADE_SPEED = -0.003;

	renderParticle(ctx, particle){
		
		ctx.beginPath();
		ctx.arc(particle.X+particle.size*0.5, particle.Y+particle.size*0.5, particle.size*0.5, 0, 2 * Math.PI, false);
		ctx.fillStyle = `rgba(${this.PARTICLE_R}, ${this.PARTICLE_G}, ${this.PARTICLE_B}, ${particle.alpha})`;
		ctx.fill();
	}

}


OnLoad(()=> {
	const TheDustCanvas=document.getElementById("dust404");
	if (TheDustCanvas !== null) {
		let p = new GlowParticle(TheDustCanvas);
		p.start();
	}
})