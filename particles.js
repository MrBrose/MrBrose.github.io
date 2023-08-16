function OnLoad(callback) { //https://stackoverflow.com/a/54179702
	if (document.readyState === 'complete') {
		callback();
	} else {
		window.addEventListener("load", callback);
	}
}

class Particles {
	MIN_SIZE=2;			// pixels
	MAX_SIZE=10;
	
	MIN_XVEL=-0.03;
	MAX_XVEL=0.07;
	
	MIN_YVEL=-0.0;
	MAX_YVEL=0.13;
	
	MIN_ALPHA=.0;			// 0 < x < 1
	MAX_ALPHA=.2;
	
	PARTICLES_PER_PIXEL = 2.05;
	
	PARTICLE_R = 0;		// 0 < x < 255
	PARTICLE_G = 150;
	PARTICLE_B = 255;
	
	CLICK_AMOUNT = 10;
	
	MOUSE_VEL_FADE_SPEED = 0.0005;
	
	MOUSE_REPULSION = 2.5;
	MAX_REPULSION_VEL = .3;


	constructor(dustCanvas){
		this.dustCanvas = dustCanvas;
		this.previousTimeStamp;
		this.particles=[];
	}

	start(){ OnLoad(()=>{
		window.addEventListener("resize",this.resizeCanvas.bind(this));
		this.resizeCanvas();

		window.requestAnimationFrame(this.renderCanvas.bind(this));
		
		for (let i = 0; i < this.PARTICLES_PER_PIXEL*this.dustCanvas.height; i++){this.createInitialParticle()}
	
		document.addEventListener("mousemove", e=>this.makeParticlesScaredOfPoint(e.pageX,e.pageY));
		document.addEventListener("touchmove", e=>this.makeParticlesScaredOfPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY));
	
		document.addEventListener("mousedown", e=>this.createParticles(this.CLICK_AMOUNT,{X:e.pageX,Y:e.pageY, mouseMade:true, both: true}));
	}); }
	
	createInitialParticle(){
		this.createParticle({
			X: this.dustCanvas.width * Math.random(),
			Y: this.dustCanvas.height * Math.random()
		});
	}

	createParticle(defaultObj={}){
		let pos=Math.random()*(this.dustCanvas.width+this.dustCanvas.height)
		let p = Object.assign({
			size: defaultObj.size || (Math.random()*(this.MAX_SIZE-this.MIN_SIZE)+this.MIN_SIZE),
			X: defaultObj.X || (pos>this.dustCanvas.height? pos-this.dustCanvas.height:-this.MAX_SIZE),
			Y: defaultObj.Y || (pos<this.dustCanvas.height? pos:this.dustCanvas.height),
			velX: defaultObj.velX || (
				defaultObj.both ? (Math.random() > .5 ? 1 : -1) : 1
			) * (Math.random()*(this.MAX_XVEL-this.MIN_XVEL)+this.MIN_XVEL),
			velY: defaultObj.velY || (
				defaultObj.both ? (Math.random() > .5 ? 1 : -1) : 1
			) * (-Math.random()*(this.MAX_YVEL-this.MIN_YVEL)-this.MIN_YVEL),
			alpha: defaultObj.alpha || ( Math.random()*(this.MAX_ALPHA-this.MIN_ALPHA)+this.MIN_ALPHA),
			fadeVelY: 0,
			fadeVelX: 0,
		}, defaultObj);
		this.particles.push(p);
		return p;
	}
	createParticles(amount, defaultObj={}){for (let i = 0; i < amount; i++) {this.createParticle(defaultObj)}}

	isInBounds(particle) { return particle.X < this.dustCanvas.width && particle.Y > 0 && particle.X > 0 && particle.Y < this.dustCanvas.height;}

	renderCanvas(timeStamp) {
		let dt=timeStamp-this.previousTimeStamp;
		if (this.previousTimeStamp === undefined){
			this.previousTimeStamp=timeStamp;
			window.requestAnimationFrame(this.renderCanvas.bind(this));
			return;
		}

		const ctx = this.dustCanvas.getContext('2d');
		ctx.clearRect(0, 0, this.dustCanvas.width, this.dustCanvas.height);

		let oldParticleLen = this.particles.filter(p=>!p.mouseMade).length;

		this.particles=this.particles.map(particle=>{
			particle.X += ( particle.fadeVelX + particle.velX ) * dt;
			particle.fadeVelX -= particle.fadeVelX * this.MOUSE_VEL_FADE_SPEED * dt;
			particle.Y += ( particle.fadeVelY + particle.velY ) * dt;
			particle.fadeVelY -= particle.fadeVelY * this.MOUSE_VEL_FADE_SPEED * dt;
			return particle;
		}).filter(this.isInBounds.bind(this));

		this.createParticles(oldParticleLen-this.particles.filter(p=>!p.mouseMade).length);

		this.particles.forEach(particle=>{
			ctx.fillStyle = `rgba(${this.PARTICLE_R}, ${this.PARTICLE_G}, ${this.PARTICLE_B}, ${particle.alpha})`;
			ctx.fillRect(particle.X, particle.Y, particle.size, particle.size);
		});

		this.previousTimeStamp=timeStamp;
		window.requestAnimationFrame(this.renderCanvas.bind(this));
	}

	resizeCanvas(){
		this.dustCanvas.width = document.body.getBoundingClientRect().width;
		this.dustCanvas.height = document.body.getBoundingClientRect().height;
	}


	makeParticlesScaredOfPoint(x,y){this.particles.forEach(p=>this.makeParticleScaredOfPoint(p,x,y))}
	makeParticleScaredOfPoint(p,x,y){
		let Vx = (p.X - x);
		let Vy = (p.Y - y);
		
		let dist = Math.sqrt(Vx*Vx + Vy*Vy);
		
		let unitX = Vx/dist;
		let unitY = Vy/dist;

		let t;
		t = this.MOUSE_REPULSION*(unitX/dist);
		p.fadeVelX = Math.min(this.MAX_REPULSION_VEL, Math.abs(t)) * Math.sign(t);
		t = this.MOUSE_REPULSION*(unitY/dist);
		p.fadeVelY = Math.min(this.MAX_REPULSION_VEL, Math.abs(t)) * Math.sign(t);
	}
}
OnLoad(()=>{
	const TheDustCanvas=document.getElementById("dust");
	if (TheDustCanvas !== null) { (new Particles(TheDustCanvas)).start(); }
})

