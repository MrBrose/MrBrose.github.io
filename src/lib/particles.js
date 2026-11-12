export class Particles {
  MIN_SIZE = 2
  MAX_SIZE = 10

  MIN_XVEL = -0.07
  MAX_XVEL = 0.07

  MIN_YVEL = -0.07
  MAX_YVEL = 0.07

  MIN_ALPHA = 0
  MAX_ALPHA = 1

  PARTICLES_PER_PIXEL = 0.05
  INITIAL_PARTICLES_PER_PIXEL = this.PARTICLES_PER_PIXEL

  PARTICLE_R = 32
  PARTICLE_G = 40
  PARTICLE_B = 63

  CLICK_AMOUNT = 10

  MOUSE_VEL_FADE_SPEED = 0.0005

  MOUSE_REPULSION = 2.5
  MAX_REPULSION_VEL = 0.3

  constructor(dustCanvas) {
    this.dustCanvas = dustCanvas
    this.previousTimeStamp = undefined
    this.particles = []
  }

  stop() {
    this.running = false
    removeEventListener("resize", this.resizeListener)
    this.bodyObserver?.disconnect()
    document.removeEventListener("mousemove", this.mousemoveListener)
    document.removeEventListener("touchmove", this.touchmoveListener)
    document.removeEventListener("mousedown", this.mousedownListener)
  }

  start() {
    this.running = true

    this.resizeListener = this.resizeCanvas.bind(this)
    addEventListener("resize", this.resizeListener)
    this.bodyObserver = new ResizeObserver(this.resizeListener)
    this.bodyObserver.observe(document.body)

    this.resizeCanvas()

    requestAnimationFrame(this.renderCanvas.bind(this))

    for (let i = 0; i < this.INITIAL_PARTICLES_PER_PIXEL * this.dustCanvas.height; i++) this.createInitialParticle()

    this.mousemoveListener = e => this.makeParticlesScaredOfPoint(e.pageX, e.pageY)
    document.addEventListener("mousemove", this.mousemoveListener)
    this.touchmoveListener = e => this.makeParticlesScaredOfPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    document.addEventListener("touchmove", this.touchmoveListener)

    this.mousedownListener = e => this.createParticles(this.CLICK_AMOUNT, { X: e.pageX, Y: e.pageY, mouseMade: true, both: true })
    document.addEventListener("mousedown", this.mousedownListener)
  }

  createInitialParticle() {
    this.createParticle({
      X: this.dustCanvas.width * Math.random(),
      Y: this.dustCanvas.height * Math.random()
    })
  }

  createParticle(defaultObj = {}) {
    const pos = Math.random() * (this.dustCanvas.width + this.dustCanvas.height)
    const p = Object.assign({
      size: defaultObj.size || (Math.random() * (this.MAX_SIZE - this.MIN_SIZE) + this.MIN_SIZE),
      X: defaultObj.X || (pos > this.dustCanvas.height ? pos - this.dustCanvas.height : -this.MAX_SIZE),
      Y: defaultObj.Y || (pos < this.dustCanvas.height ? pos : this.dustCanvas.height),
      velX: defaultObj.velX || (defaultObj.both ? (Math.random() > 0.5 ? 1 : -1) : 1) * (Math.random() * (this.MAX_XVEL - this.MIN_XVEL) + this.MIN_XVEL),
      velY: defaultObj.velY || (defaultObj.both ? (Math.random() > 0.5 ? 1 : -1) : 1) * -(Math.random() * (this.MAX_YVEL - this.MIN_YVEL) + this.MIN_YVEL),
      alpha: defaultObj.alpha || (Math.random() * (this.MAX_ALPHA - this.MIN_ALPHA) + this.MIN_ALPHA),
      fadeVelY: 0,
      fadeVelX: 0
    }, defaultObj)

    if (p.velX ** 2 / this.MAX_XVEL ** 2 + p.velY ** 2 / this.MAX_YVEL ** 2 > 1) return this.createParticle(defaultObj)

    if (p.velX < 0 && p.X === -this.MAX_SIZE) p.X = this.dustCanvas.width
    if (p.velY > 0 && p.Y === this.dustCanvas.height) p.Y = -this.MAX_SIZE

    this.particles.push(p)
    return p
  }

  createParticles(amount, defaultObj = {}) {
    for (let i = 0; i < amount; i++) this.createParticle(defaultObj)
  }

  isInBounds(particle) {
    return particle.X < this.dustCanvas.width && particle.Y > -this.MAX_SIZE && particle.X > -this.MAX_SIZE && particle.Y < this.dustCanvas.height
  }

  renderParticle(ctx, particle) {
    ctx.fillStyle = `rgba(${this.PARTICLE_R}, ${this.PARTICLE_G}, ${this.PARTICLE_B}, ${particle.alpha})`
    ctx.fillRect(particle.X, particle.Y, particle.size, particle.size)
  }

  renderCanvas(timeStamp) {
    if (!this.running) return
    const dt = timeStamp - this.previousTimeStamp
    if (this.previousTimeStamp === undefined) {
      this.previousTimeStamp = timeStamp
      requestAnimationFrame(this.renderCanvas.bind(this))
      return
    }

    const ctx = this.dustCanvas.getContext("2d")
    ctx.clearRect(0, 0, this.dustCanvas.width, this.dustCanvas.height)

    const oldParticleLen = this.particles.filter(p => !p.mouseMade).length

    this.particles = this.particles.map(particle => {
      particle.X += (particle.fadeVelX + particle.velX) * dt
      particle.fadeVelX -= particle.fadeVelX * this.MOUSE_VEL_FADE_SPEED * dt
      particle.Y += (particle.fadeVelY + particle.velY) * dt
      particle.fadeVelY -= particle.fadeVelY * this.MOUSE_VEL_FADE_SPEED * dt
      return particle
    }).filter(this.isInBounds.bind(this))

    this.createParticles(oldParticleLen - this.particles.filter(p => !p.mouseMade).length)

    this.particles.forEach(p => this.renderParticle(ctx, p))

    this.previousTimeStamp = timeStamp
    requestAnimationFrame(this.renderCanvas.bind(this))
  }

  resizeCanvas() {
    const { width, height } = document.body.getBoundingClientRect()
    if (this.dustCanvas.width !== width) this.dustCanvas.width = width
    if (this.dustCanvas.height !== height) this.dustCanvas.height = height
  }

  makeParticlesScaredOfPoint(x, y) {
    this.particles.forEach(p => this.makeParticleScaredOfPoint(p, x, y))
  }

  makeParticleScaredOfPoint(p, x, y) {
    const Vx = p.X - x
    const Vy = p.Y - y
    const dist = Math.sqrt(Vx * Vx + Vy * Vy)
    const unitX = Vx / dist
    const unitY = Vy / dist
    let t = this.MOUSE_REPULSION * (unitX / dist)
    p.fadeVelX = Math.min(this.MAX_REPULSION_VEL, Math.abs(t)) * Math.sign(t)
    t = this.MOUSE_REPULSION * (unitY / dist)
    p.fadeVelY = Math.min(this.MAX_REPULSION_VEL, Math.abs(t)) * Math.sign(t)
  }
}

export class GlowParticles extends Particles {
  INITIAL_PARTICLES_PER_PIXEL = 0.05
  MIN_ALPHA = 0
  MAX_ALPHA = 1
  MOUSE_REPULSION = 1
  IN_TEXT_SPEED_MODIFIER = 1
  OUT_OF_TEXT_OPACITY_MODIFIER = 1
  PARTICLE_R = 225
  PARTICLE_G = 240
  PARTICLE_B = 255
  CLICK_AMOUNT = 5000
  MIN_XVEL = -0.025
  MAX_XVEL = 0.025
  MIN_YVEL = -0.025
  MAX_YVEL = 0.025
  MOUSE_VEL_FADE_SPEED = -0.002

  renderParticle(ctx, particle) {
    ctx.beginPath()
    ctx.arc(particle.X + particle.size * 0.5, particle.Y + particle.size * 0.5, particle.size * 0.5, 0, 2 * Math.PI, false)
    ctx.fillStyle = `rgba(${this.PARTICLE_R}, ${this.PARTICLE_G}, ${this.PARTICLE_B}, ${particle.alpha})`
    ctx.fill()
  }
}

function isPointInTriangle(p, t) {
  if (p.X < t.topLeft.X || p.X > t.topLeft.X + t.size || p.Y < t.topLeft.Y || p.Y > t.topLeft.Y + t.size) return false
  switch (t.side) {
    case "topLeft": return p.X - t.topLeft.X + (p.Y - t.topLeft.Y) < t.size
    case "topRight": return p.Y - t.topLeft.Y < p.X - t.topLeft.X
    case "bottomLeft": return p.Y - t.topLeft.Y > p.X - t.topLeft.X
    case "bottomRight": return p.X - t.topLeft.X + (p.Y - t.topLeft.Y) > t.size
  }
  return true
}

function isPointInRect(p, r) {
  return p.X > r.topLeft.X && p.X < r.bottomRight.X && p.Y > r.topLeft.Y && p.Y < r.bottomRight.Y
}

export class FancyParticles extends Particles {
  INITIAL_PARTICLES_PER_PIXEL = 5
  MIN_ALPHA = 0
  MAX_ALPHA = 0.75
  MOUSE_REPULSION = 5
  IN_TEXT_SPEED_MODIFIER = 0.1
  OUT_OF_TEXT_OPACITY_MODIFIER = 0
  PARTICLE_R = 118
  PARTICLE_G = 33
  PARTICLE_B = 32

  createParticle(defaultArg) {
    super.createParticle(defaultArg)
    this.initVelX = this.velX
    this.initVelY = this.velY
    this.initAlpha = this.alpha
  }

  isInFormation(p) {
    const thisAndNotThat = (ths, tht) => ths && !tht
    const centerX = this.dustCanvas.width / 2
    return (
      thisAndNotThat(
        isPointInTriangle(p, { topLeft: { X: centerX - 438, Y: 200 - 50 }, size: 200, side: "bottomRight" }),
        isPointInTriangle(p, { topLeft: { X: centerX - 338 - 15, Y: 300 - 70 }, size: 80, side: "bottomRight" }) ||
        isPointInTriangle(p, { topLeft: { X: centerX - 438, Y: 350 - 50 }, size: 50, side: "bottomRight" })
      ) ||
      isPointInRect(p, { topLeft: { X: centerX - 288, Y: 400 - 50 }, bottomRight: { X: centerX - 238, Y: 500 - 50 } }) ||
      isPointInRect(p, { topLeft: { X: centerX - 238, Y: 350 - 50 }, bottomRight: { X: centerX - 188, Y: 400 - 50 } })
    ) || (
      isPointInRect(p, { topLeft: { X: centerX - 88, Y: 250 - 50 }, bottomRight: { X: centerX - 38, Y: 450 - 50 } }) ||
      isPointInTriangle(p, { topLeft: { X: centerX - 88, Y: 200 - 50 }, size: 50, side: "bottomRight" }) ||
      isPointInTriangle(p, { topLeft: { X: centerX - 38, Y: 250 - 50 }, size: 25, side: "topLeft" }) ||
      isPointInRect(p, { topLeft: { X: centerX - 38, Y: 200 - 50 }, bottomRight: { X: centerX + 37, Y: 250 - 50 } }) ||
      isPointInTriangle(p, { topLeft: { X: centerX + 12, Y: 250 - 50 }, size: 25, side: "topRight" }) ||
      isPointInTriangle(p, { topLeft: { X: centerX + 37, Y: 200 - 50 }, size: 50, side: "bottomLeft" }) ||
      isPointInRect(p, { topLeft: { X: centerX + 37, Y: 250 - 50 }, bottomRight: { X: centerX + 87, Y: 450 - 50 } }) ||
      isPointInTriangle(p, { topLeft: { X: centerX - 88, Y: 450 - 50 }, size: 50, side: "topRight" }) ||
      isPointInTriangle(p, { topLeft: { X: centerX - 38, Y: 425 - 50 }, size: 25, side: "bottomLeft" }) ||
      isPointInRect(p, { topLeft: { X: centerX - 38, Y: 450 - 50 }, bottomRight: { X: centerX + 37, Y: 500 - 50 } }) ||
      isPointInTriangle(p, { topLeft: { X: centerX + 12, Y: 425 - 50 }, size: 25, side: "bottomRight" }) ||
      isPointInTriangle(p, { topLeft: { X: centerX + 37, Y: 450 - 50 }, size: 50, side: "topLeft" })
    ) || (
      thisAndNotThat(
        isPointInTriangle(p, { topLeft: { X: centerX + 137, Y: 200 - 50 }, size: 200, side: "bottomRight" }),
        isPointInTriangle(p, { topLeft: { X: centerX + 237 - 15, Y: 300 - 70 }, size: 80, side: "bottomRight" }) ||
        isPointInTriangle(p, { topLeft: { X: centerX + 137, Y: 350 - 50 }, size: 50, side: "bottomRight" })
      ) || (
        isPointInRect(p, { topLeft: { X: centerX + 287, Y: 400 - 50 }, bottomRight: { X: centerX + 337, Y: 500 - 50 } }) ||
        isPointInRect(p, { topLeft: { X: centerX + 337, Y: 350 - 50 }, bottomRight: { X: centerX + 387, Y: 400 - 50 } })
      )
    )
  }

  renderCanvas(ts) {
    this.particles.forEach(p => {
      if (!this.isInFormation(p)) {
        p.velX = p.initVelX
        p.velY = p.initVelY
        p.alpha = this.OUT_OF_TEXT_OPACITY_MODIFIER * p.initAlpha
      } else {
        p.velX = this.IN_TEXT_SPEED_MODIFIER * p.initVelX
        p.velY = this.IN_TEXT_SPEED_MODIFIER * p.initVelY
        p.alpha = p.initAlpha
      }
    })
    super.renderCanvas(ts)
  }
}
