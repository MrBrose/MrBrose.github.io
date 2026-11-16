function isOverText(e) {
  if (e.target.closest("input, textarea, select, [contenteditable]")) return true
  const node = document.caretPositionFromPoint(e.clientX, e.clientY)?.offsetNode
  if (node?.nodeType !== Node.TEXT_NODE) return false
  const range = document.createRange()
  range.selectNodeContents(node)
  return Array.from(range.getClientRects()).some(r => e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom)
}

const random = (min, max) => Math.random() * (max - min) + min
const randomSign = () => Math.random() > 0.5 ? 1 : -1

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

  PARTICLE_R = 32
  PARTICLE_G = 40
  PARTICLE_B = 63

  CLICK_AMOUNT = 10

  MOUSE_VEL_FADE_SPEED = 0.0005

  MOUSE_REPULSION = 2.5
  MAX_REPULSION_VEL = 0.3

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.particles = []
  }

  start() {
    this.controller = new AbortController()
    const { signal } = this.controller

    this.observer = new ResizeObserver(() => this.resize())
    this.observer.observe(document.body)
    this.resize()

    const { width, height } = this.canvas
    for (let i = 0; i < this.PARTICLES_PER_PIXEL * height; i++) this.particles.push(this.spawn({ X: Math.random() * width, Y: Math.random() * height }))

    document.addEventListener("mousemove", e => this.pointer = { x: e.pageX, y: e.pageY }, { signal })
    document.addEventListener("touchmove", e => this.pointer = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY }, { signal, passive: true })
    document.addEventListener("mousedown", e => this.burst(e), { signal })

    this.frame = requestAnimationFrame(time => this.render(time))
  }

  stop() {
    cancelAnimationFrame(this.frame)
    this.controller.abort()
    this.observer.disconnect()
  }

  spawn(at, burst = false) {
    let velX, velY
    for (let i = 0; i < 20; i++) {
      velX = (burst ? randomSign() : 1) * random(this.MIN_XVEL, this.MAX_XVEL)
      velY = (burst ? randomSign() : 1) * -random(this.MIN_YVEL, this.MAX_YVEL)
      if (velX ** 2 / this.MAX_XVEL ** 2 + velY ** 2 / this.MAX_YVEL ** 2 <= 1) break
    }

    let X = at?.X
    let Y = at?.Y
    if (!at) {
      const { width, height } = this.canvas
      const pos = Math.random() * (width + height)
      if (pos > height) {
        X = pos - height
        Y = velY > 0 ? -this.MAX_SIZE : height
      } else {
        X = velX < 0 ? width : -this.MAX_SIZE
        Y = pos
      }
    }

    return {
      X,
      Y,
      velX,
      velY,
      fadeVelX: 0,
      fadeVelY: 0,
      size: random(this.MIN_SIZE, this.MAX_SIZE),
      alpha: random(this.MIN_ALPHA, this.MAX_ALPHA),
      burst
    }
  }

  burst(e) {
    if (e.detail > 1 && !isOverText(e)) e.preventDefault()
    for (let i = 0; i < this.CLICK_AMOUNT; i++) this.particles.push(this.spawn({ X: e.pageX, Y: e.pageY }, true))
  }

  repel({ x, y }) {
    const max = this.MAX_REPULSION_VEL
    for (const p of this.particles) {
      const dx = p.X - x
      const dy = p.Y - y
      const distSq = dx * dx + dy * dy
      if (!distSq) continue
      p.fadeVelX = Math.max(-max, Math.min(max, this.MOUSE_REPULSION * dx / distSq))
      p.fadeVelY = Math.max(-max, Math.min(max, this.MOUSE_REPULSION * dy / distSq))
    }
  }

  render(time) {
    this.frame = requestAnimationFrame(time => this.render(time))
    const dt = Math.min(time - (this.lastTime ?? time), 100)
    this.lastTime = time

    if (this.pointer) {
      this.repel(this.pointer)
      this.pointer = null
    }

    const { ctx, particles } = this
    const { width, height } = this.canvas
    const fade = 1 - this.MOUSE_VEL_FADE_SPEED * dt
    const edge = -this.MAX_SIZE

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = `rgb(${this.PARTICLE_R}, ${this.PARTICLE_G}, ${this.PARTICLE_B})`

    let kept = 0
    for (let p of particles) {
      p.X += (p.fadeVelX + p.velX) * dt
      p.Y += (p.fadeVelY + p.velY) * dt
      p.fadeVelX *= fade
      p.fadeVelY *= fade
      if (p.X <= edge || p.X >= width || p.Y <= edge || p.Y >= height) {
        if (p.burst) continue
        p = this.spawn()
      }
      ctx.globalAlpha = p.alpha
      ctx.fillRect(p.X, p.Y, p.size, p.size)
      particles[kept++] = p
    }
    particles.length = kept
    ctx.globalAlpha = 1
  }

  resize() {
    const { width, height } = document.body.getBoundingClientRect()
    const w = Math.round(width)
    const h = Math.round(height)
    if (this.canvas.width !== w) this.canvas.width = w
    if (this.canvas.height !== h) this.canvas.height = h
  }
}
