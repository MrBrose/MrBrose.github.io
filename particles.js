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
	
	MIN_XVEL=-0.07;
	MAX_XVEL=0.07;
	
	MIN_YVEL=-0.07;
	MAX_YVEL=0.07;
	
	MIN_ALPHA=0;			// 0 < x < 1
	MAX_ALPHA=1;
	
	PARTICLES_PER_PIXEL = 0.05;
	INITIAL_PARTICLES_PER_PIXEL = this.PARTICLES_PER_PIXEL;
	
	PARTICLE_R = 32;		// 0 < x < 255
	PARTICLE_G = 40;
	PARTICLE_B = 63;
	
	CLICK_AMOUNT = 10;
	
	MOUSE_VEL_FADE_SPEED = 0.0005;
	
	MOUSE_REPULSION = 2.5;
	MAX_REPULSION_VEL = .3;


	constructor(dustCanvas){
		this.dustCanvas = dustCanvas;
		this.previousTimeStamp;
		this.particles=[];
	}

	stop(){
		this.running = false;
		window.removeEventListener("resize",this.resizeListner);

		document.removeEventListener("mousemove", this.mousemoveListner);
		document.removeEventListener("touchmove", this.touchmoveListner);

		document.removeEventListener("mousedown", this.mousedownListner);
	}

	start(){ OnLoad(()=>{
		this.running = true;

		this.resizeListner = this.resizeCanvas.bind(this);
		window.addEventListener("resize",this.resizeListner);

		this.resizeCanvas();

		window.requestAnimationFrame(this.renderCanvas.bind(this));
		
		for (let i = 0; i < this.INITIAL_PARTICLES_PER_PIXEL*this.dustCanvas.height; i++){this.createInitialParticle()}
	
		this.mousemoveListner = e=>this.makeParticlesScaredOfPoint(e.pageX,e.pageY);
		document.addEventListener("mousemove", this.mousemoveListner);
		this.touchmoveListner = e=>this.makeParticlesScaredOfPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
		document.addEventListener("touchmove", this.touchmoveListner);
	
		this.mousedownListner = e=>this.createParticles(this.CLICK_AMOUNT,{X:e.pageX,Y:e.pageY, mouseMade:true, both: true});
		document.addEventListener("mousedown", this.mousedownListner);
	}); }
	
	createInitialParticle(){
		this.createParticle({
			X: this.dustCanvas.width * Math.random(),
			Y: this.dustCanvas.height * Math.random(),
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
			) * -(Math.random()*(this.MAX_YVEL-this.MIN_YVEL)+this.MIN_YVEL),
			alpha: defaultObj.alpha || ( Math.random()*(this.MAX_ALPHA-this.MIN_ALPHA)+this.MIN_ALPHA),
			fadeVelY: 0,
			fadeVelX: 0,
		}, defaultObj);


		if ((p.velX**2)/(this.MAX_XVEL**2)+(p.velY**2)/(this.MAX_YVEL**2)>1){return this.createParticle(defaultObj);}

		if (p.velX < 0 && p.X === -this.MAX_SIZE){ p.X = this.dustCanvas.width; }
		if (p.velY > 0 && p.Y === this.dustCanvas.height){ p.Y = -this.MAX_SIZE; }

		this.particles.push(p);
		return p;
	}
	createParticles(amount, defaultObj={}){for (let i = 0; i < amount; i++) {this.createParticle(defaultObj)}}

	isInBounds(particle) { return particle.X < this.dustCanvas.width && particle.Y > -this.MAX_SIZE && particle.X > -this.MAX_SIZE && particle.Y < this.dustCanvas.height;}

	renderParticle(ctx, particle){
		ctx.fillStyle = `rgba(${this.PARTICLE_R}, ${this.PARTICLE_G}, ${this.PARTICLE_B}, ${particle.alpha})`;
		ctx.fillRect(particle.X, particle.Y, particle.size, particle.size);
	}

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

		this.particles.forEach(p=>this.renderParticle(ctx, p));

		this.previousTimeStamp=timeStamp;
		if (this.running){
			window.requestAnimationFrame(this.renderCanvas.bind(this));
		}
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

