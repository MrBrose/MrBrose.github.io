
function isPointInTriangle(p, t){
	if (
		p.X < t.topLeft.X ||
		p.X > t.topLeft.X+t.size ||
		p.Y < t.topLeft.Y ||
		p.Y > t.topLeft.Y+t.size
	) { return false } // this is where the point is not even in the bounding box
	switch (t.side){
		case "topLeft":return (p.X-t.topLeft.X)+(p.Y-t.topLeft.Y) < t.size;
		case "topRight":return (p.Y-t.topLeft.Y) < (p.X-t.topLeft.X);
		case "bottomLeft":return (p.Y-t.topLeft.Y) > (p.X-t.topLeft.X);
		case "bottomRight":return (p.X-t.topLeft.X)+(p.Y-t.topLeft.Y) > t.size;
	}
	return true; //this means it is on the boundry this case dosent realy matter
}
function isPointInRect(p, r){ return (
	p.X > r.topLeft.X &&
	p.X < r.bottomRight.X &&
	p.Y > r.topLeft.Y &&
	p.Y < r.bottomRight.Y
); }

function renderTriangle(ctx, t){
	let points;
	switch (t.side){
		case "topLeft":points = [
			t.topLeft,
			{X:t.topLeft.X+t.size, Y: t.topLeft.Y},
			{X:t.topLeft.X, Y: t.topLeft.Y+t.size}
		];break;
		case "topRight":points = [
			{X:t.topLeft.X+t.size, Y: t.topLeft.Y},
			{X:t.topLeft.X+t.size, Y: t.topLeft.Y+t.size},
			t.topLeft
		];break;
		case "bottomLeft":points = [
			{X:t.topLeft.X, Y: t.topLeft.Y+t.size},
			{X:t.topLeft.X+t.size, Y: t.topLeft.Y+t.size},
			t.topLeft
		];break;
		case "bottomRight":points = [
			{X:t.topLeft.X+t.size, Y: t.topLeft.Y+t.size},
			{X:t.topLeft.X+t.size, Y: t.topLeft.Y},
			{X:t.topLeft.X, Y: t.topLeft.Y+t.size}
		];break;
		default: throw "ERROR: triangle invalid format";
	}
	let path=new Path2D();
	path.moveTo(points[0].X, points[0].Y);
	path.lineTo(points[1].X, points[1].Y);
	path.lineTo(points[2].X, points[2].Y);
	ctx.fill(path);
}

function renderRect(ctx, r){ ctx.fillRect(
	r.topLeft.X,
	r.topLeft.Y,
	r.bottomRight.X - r.topLeft.X,
	r.bottomRight.Y - r.topLeft.Y,
); }

class fancyParticles extends Particles{
	INITIAL_PARTICLES_PER_PIXEL = 3;
	MIN_ALPHA =  0;
	MAX_ALPHA = 0.75;
	MOUSE_REPULSION = 1;
	IN_TEXT_SPEED_MODIFIER = 0.1;
	OUT_OF_TEXT_OPACITY_MODIFIER = 0.3;

	createParticle(defaultArg){
		let p = super.createParticle(defaultArg);
		p.initVelX = p.velX;
		p.initVelY = p.velY;
		p.initAlpha = p.alpha;
	}

	isInFormation(p){
		const thisAndNotThat = (ths,tht) => (ths&&!tht);

		let centerX = this.dustCanvas.width/2;

		return (
			thisAndNotThat(
				isPointInTriangle(p, {topLeft:{X:centerX-438, Y:200}, size:200, side: "bottomRight"}),
				isPointInTriangle(p, {topLeft:{X:centerX-338, Y:300}, size:50, side: "bottomRight"}) ||
				isPointInTriangle(p, {topLeft:{X:centerX-438, Y:350}, size:50, side: "bottomRight"})
			) ||
			isPointInRect(p, {topLeft:{X:centerX-288,Y:400},bottomRight:{X:centerX-238,Y:500}}) ||
			isPointInRect(p, {topLeft:{X:centerX-238,Y:350},bottomRight:{X:centerX-188,Y:400}})
		) || (
			isPointInRect(p, {topLeft:{X: centerX-88, Y: 250}, bottomRight:{X: centerX-38, Y: 450}}) ||
			isPointInTriangle(p, {topLeft:{X:centerX-88, Y:200}, size:50, side: "bottomRight"}) ||
			isPointInTriangle(p, {topLeft:{X:centerX-38, Y:250}, size:25, side: "topLeft"}) ||
			isPointInRect(p, {topLeft:{X: centerX-38, Y: 200}, bottomRight:{X: centerX+37, Y: 250}}) ||
			isPointInTriangle(p, {topLeft:{X:centerX+12, Y:250}, size:25, side: "topRight"}) ||
			isPointInTriangle(p, {topLeft:{X:centerX+37, Y:200}, size:50, side: "bottomLeft"}) ||
			isPointInRect(p, {topLeft:{X: centerX+37, Y: 250}, bottomRight:{X: centerX+87, Y: 450}}) ||
			isPointInTriangle(p, {topLeft:{X:centerX-88, Y:450}, size:50, side: "topRight"}) ||
			isPointInTriangle(p, {topLeft:{X:centerX-38, Y:425}, size:25, side: "bottomLeft"}) ||
			isPointInRect(p, {topLeft:{X: centerX-38, Y: 450}, bottomRight:{X: centerX+37, Y: 500}}) ||
			isPointInTriangle(p, {topLeft:{X:centerX+12, Y:425}, size:25, side: "bottomRight"}) ||
			isPointInTriangle(p, {topLeft:{X:centerX+37, Y:450}, size:50, side: "topLeft"})
		) || (
			thisAndNotThat(
				isPointInTriangle(p, {topLeft:{X:centerX+137, Y:200}, size:200, side: "bottomRight"}),
				isPointInTriangle(p, {topLeft:{X:centerX+237, Y:300}, size:50, side: "bottomRight"}) ||
				isPointInTriangle(p, {topLeft:{X:centerX+137, Y:350}, size:50, side: "bottomRight"})
			) || (
				isPointInRect(p, {topLeft:{X:centerX+287,Y:400},bottomRight:{X:centerX+337,Y:500}}) ||
				isPointInRect(p, {topLeft:{X:centerX+337,Y:350},bottomRight:{X:centerX+387,Y:400}})
			)
		);
	}


	renderCanvas(ts){
		this.particles.forEach(p=>{
			if (!this.isInFormation(p)){
				p.velX = p.initVelX;
				p.velY = p.initVelY;
				p.alpha = this.OUT_OF_TEXT_OPACITY_MODIFIER*p.initAlpha;
			} else {
				p.velX = this.IN_TEXT_SPEED_MODIFIER*p.initVelX;
				p.velY = this.IN_TEXT_SPEED_MODIFIER*p.initVelY;
				p.alpha = p.initAlpha;
			}
		});
		super.renderCanvas(ts);

		let ctx = this.dustCanvas.getContext('2d');
		ctx.font = "50px minecraft10";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Nothing to see here", this.dustCanvas.width / 2, 600);
		// ctx.fillStyle = this.p ? "#00ff00": "#ff0000";
		// // FOUR
		// renderTriangle(ctx, {topLeft:{X:200, Y:200}, size:200, side: "bottomRight"});
		// renderRect(ctx, {topLeft:{X:350,Y:400},bottomRight:{X:400,Y:500}});
		// renderRect(ctx, {topLeft:{X:400,Y:350},bottomRight:{X:450,Y:400}});
		
		// // NAUGHT
		// renderRect(ctx, {topLeft:{X: 550, Y: 250}, bottomRight:{X: 600, Y: 450}});
		// renderTriangle(ctx, {topLeft:{X:550, Y:200}, size:50, side: "bottomRight"});
		// renderTriangle(ctx, {topLeft:{X:600, Y:250}, size:25, side: "topLeft"});
		// renderRect(ctx, {topLeft:{X: 600, Y: 200}, bottomRight:{X: 675, Y: 250}});
		// renderTriangle(ctx, {topLeft:{X:650, Y:250}, size:25, side: "topRight"});
		// renderTriangle(ctx, {topLeft:{X:675, Y:200}, size:50, side: "bottomLeft"});
		// renderRect(ctx, {topLeft:{X: 675, Y: 250}, bottomRight:{X: 725, Y: 450}});
		// renderTriangle(ctx, {topLeft:{X:550, Y:450}, size:50, side: "topRight"});
		// renderTriangle(ctx, {topLeft:{X:600, Y:425}, size:25, side: "bottomLeft"});
		// renderRect(ctx, {topLeft:{X: 600, Y: 450}, bottomRight:{X: 675, Y: 500}});
		// renderTriangle(ctx, {topLeft:{X:650, Y:425}, size:25, side: "bottomRight"});
		// renderTriangle(ctx, {topLeft:{X:675, Y:450}, size:50, side: "topLeft"});
		
		// // FOUR
		// renderTriangle(ctx, {topLeft:{X:825, Y:200}, size:200, side: "bottomRight"});
		// renderRect(ctx, {topLeft:{X:975,Y:400},bottomRight:{X:1025,Y:500}});
		// renderRect(ctx, {topLeft:{X:1025,Y:350},bottomRight:{X:1075,Y:400}});
		
		// ctx.fillStyle = "#000000";
		// renderTriangle(ctx, {topLeft:{X:200, Y:350}, size:50, side: "bottomRight"});
		// renderTriangle(ctx, {topLeft:{X:300, Y:300}, size:50, side: "bottomRight"});
		// renderTriangle(ctx, {topLeft:{X:825, Y:350}, size:50, side: "bottomRight"});
		// renderTriangle(ctx, {topLeft:{X:925, Y:300}, size:50, side: "bottomRight"});
	}


}


OnLoad(()=> {
	const TheDustCanvas=document.getElementById("dust404");
	if (TheDustCanvas !== null) {
		let p = new fancyParticles(TheDustCanvas);
		p.start();
	}
})