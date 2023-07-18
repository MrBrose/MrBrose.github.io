Number.prototype.clamp = function (min, max) {
	if (this < min) {
		return min;
	}
	if (this > max) {
		return max;
	}
	return this;
}

var menuCheckbox = document.getElementById("menuCheckbox");
menuCheckbox.checked = false;
var menuContent = document.getElementById("menuContent");
var header = document.querySelector("header");
var main = document.querySelector("main");
var footer = document.querySelector("footer");
var menuLabel = document.querySelector(".menu[for=\"menuCheckbox\"]")

menuCheckbox.addEventListener('change', e => {
	menuContent.classList.remove("hidden");
	if (!e.target.checked) {

		var value = window.getComputedStyle(menuContent).getPropertyValue("--animation-time");
		if (value.endsWith("ms")) {
			value = value.slice(0, -2);
		} else if (value.endsWith("s")) {
			value = value.slice(0, -1) * 1000;
		} else {
			console.error("ERROR: the animation time is not in the correct format");
		}
		setTimeout(() => {
			menuContent.classList.add("hidden");
		}, value);
	}
	main.toggleAttribute("inert");
	footer.toggleAttribute("inert");
});

header.addEventListener("click", e => {
	if (menuCheckbox.checked && e.clientY > header.getBoundingClientRect().bottom){
		menuCheckbox.checked = !menuCheckbox.checked;
		menuCheckbox.dispatchEvent(new Event("change"));
	}
});

menuLabel.addEventListener("keydown", e => {
	if (e.key == " " || e.key == "Enter" || (menuCheckbox.checked && e.key == "Escape")) {
		menuCheckbox.checked = !menuCheckbox.checked;
		menuCheckbox.dispatchEvent(new Event("change"));
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
	}
	if (e.key == "ArrowDown" && menuCheckbox.checked) {
		document.querySelector("#menuContent > a:first-child").focus()
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
	}
});

[...menuContent.children].forEach(el => {
	el.addEventListener("keydown", e => {
		if (e.key == "ArrowDown" && menuCheckbox.checked && e.target.nextElementSibling != null) {
			e.target.nextElementSibling.focus();
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
		}
		if (e.key == "ArrowUp" && menuCheckbox.checked) {
			if (e.target.previousElementSibling == null) {
				menuLabel.focus();
			} else {
				e.target.previousElementSibling.focus()
			}
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
		}
		if (e.key == "Escape") {
			menuCheckbox.checked = !menuCheckbox.checked;
			menuCheckbox.dispatchEvent(new Event("change"));
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
		}
	})
});



const dustCanvas=document.getElementById("dust");

let previousTimeStamp;
let particles=[];

const MIN_SIZE=2;			// pixels
const MAX_SIZE=10;

const MIN_XVEL=-0.03;
const MAX_XVEL=0.07;

const MIN_YVEL=-0.0;
const MAX_YVEL=0.13;

const MIN_ALPHA=.0;			// 0 < x < 1
const MAX_ALPHA=.15;

const PARTICLES_PER_PIXEL=5.05;

const PARTICLE_R = 0;		// 0 < x < 255
const PARTICLE_G = 150;
const PARTICLE_B = 255;

const CLICK_AMOUNT = 7;

const HOW_SCARED_PARTICLES_ARE_OF_THE_MOUSE = 2.5;

function createParticle(defaultObj={}){
	let pos=Math.random()*(dustCanvas.width+dustCanvas.height)
	particles.push(Object.assign({
		size: defaultObj.size || (Math.random()*(MAX_SIZE-MIN_SIZE)+MIN_SIZE),
		X: defaultObj.X || (pos>dustCanvas.height? pos-dustCanvas.height:0),
		Y: defaultObj.Y || (pos<dustCanvas.height? pos:dustCanvas.height),
		velX: defaultObj.velX || (
			defaultObj.both ? (Math.random() > .5 ? 1 : -1) : 1
		) * (Math.random()*(MAX_XVEL-MIN_XVEL)+MIN_XVEL),
		velY: defaultObj.velY || (
			defaultObj.both ? (Math.random() > .5 ? 1 : -1) : 1
		) * (-Math.random()*(MAX_YVEL-MIN_YVEL)-MIN_YVEL),
		alpha: defaultObj.alpha || ( Math.random()*(MAX_ALPHA-MIN_ALPHA)+MIN_ALPHA),
		fadeVelY: 0,
		fadeVelX: 0,
	}, defaultObj));
}
function createParticles(amount, defaultObj={}){for (let i = 0; i < amount; i++) {createParticle(defaultObj)}}

const isInBounds = particle => particle.X < dustCanvas.width && particle.Y > 0 && particle.X > 0 && particle.Y < dustCanvas.height;

function renderCanvas(timeStamp) {
	let dt=timeStamp-previousTimeStamp;
	if (previousTimeStamp === undefined){
		previousTimeStamp=timeStamp;
		window.requestAnimationFrame(renderCanvas);
		return;
	}

	const ctx = dustCanvas.getContext('2d');
	ctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);

	let oldParticleLen = particles.filter(p=>!p.mouseMade).length;

	particles=particles.map(particle=>{
		particle.X += ( particle.fadeVelX + particle.velX ) * dt;
		particle.fadeVelX -= particle.fadeVelX * .0005 * dt;
		particle.Y += ( particle.fadeVelY + particle.velY ) * dt;
		particle.fadeVelY -= particle.fadeVelY * .0005 * dt;
		return particle;
	}).filter(isInBounds);

	createParticles(oldParticleLen-particles.filter(p=>!p.mouseMade).length);

	particles.forEach(particle=>{
		ctx.fillStyle = `rgba(${PARTICLE_R}, ${PARTICLE_G}, ${PARTICLE_B}, ${particle.alpha})`;
		ctx.fillRect(particle.X, particle.Y, particle.size, particle.size);
	});

	previousTimeStamp=timeStamp;
	window.requestAnimationFrame(renderCanvas);
}

function resizeCanvas(){
	dustCanvas.width = document.body.getBoundingClientRect().width;
	dustCanvas.height = document.body.getBoundingClientRect().height;
}


function makeParticlesScaredOfPoint(x,y){particles.forEach(p=>{
	let dist = Math.sqrt((p.X - x)**2 + (p.Y - y)**2);

	let dirX = (p.X - x)/dist;
	let dirY = (p.Y - y)/dist;

	p.fadeVelX = HOW_SCARED_PARTICLES_ARE_OF_THE_MOUSE*(1/dist)*dirX;
	p.fadeVelY = HOW_SCARED_PARTICLES_ARE_OF_THE_MOUSE*(1/dist)*dirY;
}); }

if (dustCanvas !== null) {addEventListener("load", ()=>{
	window.addEventListener("resize",resizeCanvas);
	resizeCanvas();
	for (let i = 0; i < PARTICLES_PER_PIXEL*dustCanvas.height; i++)
	{createParticle({X: dustCanvas.width * Math.random(), Y: dustCanvas.height * Math.random()})}
	window.requestAnimationFrame(renderCanvas);
	

	document.addEventListener("mousemove", e=>makeParticlesScaredOfPoint(e.pageX,e.pageY));
	document.addEventListener("touchmove", e=>makeParticlesScaredOfPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY));

	document.addEventListener("mousedown", e=>createParticles(CLICK_AMOUNT,{X:e.pageX,Y:e.pageY, mouseMade:true, both: true}));
});}
