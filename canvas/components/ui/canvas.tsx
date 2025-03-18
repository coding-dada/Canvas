// Define necessary interfaces and types
interface WaveConfig {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

interface LineConfig {
  spring: number;
  friction?: number;
  size?: number;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface CanvasContext extends CanvasRenderingContext2D {
  running: boolean;
  frame: number;
}

interface Position {
  x: number;
  y: number;
}

interface ConfigType {
  debug: boolean;
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
}

// Global variables with proper typing
let ctx: CanvasContext;
let wave: Wave;
const pos: Position = { x: 0, y: 0 };
let lines: Line[] = [];
const config: ConfigType = {
  debug: true,
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

// Wave class (previously named 'n')
class Wave {
  phase: number = 0;
  offset: number = 0;
  frequency: number = 0.001;
  amplitude: number = 1;

  constructor(config: WaveConfig = {}) {
    this.init(config);
  }

  init(config: WaveConfig): void {
    this.phase = config.phase || 0;
    this.offset = config.offset || 0;
    this.frequency = config.frequency || 0.001;
    this.amplitude = config.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }

  value(): number {
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

// Node class
class Node implements NodeType {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

class Line {
  spring: number = 0;
  friction: number = 0;
  nodes: NodeType[] = [];

  constructor(config: LineConfig) {
    this.init(config);
  }

  init(config: LineConfig): void {
    this.spring = config.spring + 0.1 * Math.random() - 0.05;
    // Use global config friction value if not provided in the config
    this.friction = (config.friction !== undefined ? config.friction : 0.5) + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    
    // Use default size from global config if not provided
    const size = config.size ?? 50;
    for (let i = 0; i < size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update(): void {
    let spring = this.spring;
    let node = this.nodes[0];
    
    node.vx += (pos.x - node.x) * spring;
    node.vy += (pos.y - node.y) * spring;
    
    for (let i = 0, len = this.nodes.length; i < len; i++) {
      node = this.nodes[i];
      
      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        node.vx += (prevNode.x - node.x) * spring;
        node.vy += (prevNode.y - node.y) * spring;
        node.vx += prevNode.vx * config.dampening;
        node.vy += prevNode.vy * config.dampening;
      }
      
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= config.tension;
    }
  }

  draw(): void {
    if (!ctx) return;
    
    let current: NodeType;
    let next: NodeType;
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
      current = this.nodes[i];
      next = this.nodes[i + 1];
      x = 0.5 * (current.x + next.x);
      y = 0.5 * (current.y + next.y);
      ctx.quadraticCurveTo(current.x, current.y, x, y);
    }
    
    current = this.nodes[this.nodes.length - 2];
    next = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(current.x, current.y, next.x, next.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function initLines(): void {
  lines = [];
  for (let i = 0; i < config.trails; i++) {
    lines.push(new Line({ 
      spring: 0.45 + (i / config.trails) * 0.025,
      friction: config.friction,
      size: config.size
    }));
  }
}

function handleMouseMove(e: MouseEvent | TouchEvent): void {
  if ('touches' in e) {
    if (e.touches.length > 0) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  } else {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }
  e.preventDefault();
}

function onMousemove(e: MouseEvent | TouchEvent): void {
  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('touchstart', onMousemove as EventListener);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleMouseMove as EventListener);
  document.addEventListener('touchstart', handleMouseMove as EventListener);
  
  handleMouseMove(e);
  initLines();
  render();
}

function render(): void {
  if (!ctx || !ctx.running) return;
  
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "hsla(" + Math.round(wave.update()) + ",100%,50%,0.025)";
  ctx.lineWidth = 10;
  
  for (let i = 0; i < config.trails; i++) {
    const line = lines[i];
    line.update();
    line.draw();
  }
  
  ctx.frame++;
  window.requestAnimationFrame(render);
}

function resizeCanvas(): void {
  if (!ctx || !ctx.canvas) return;
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

export const renderCanvas = function(): void {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;
  
  ctx = canvas.getContext("2d") as CanvasContext;
  if (!ctx) return;
  
  ctx.running = true;
  ctx.frame = 1;
  
  wave = new Wave({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove as EventListener);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  
  window.addEventListener("focus", () => {
    if (ctx && !ctx.running) {
      ctx.running = true;
      render();
    }
  });
  
  window.addEventListener("blur", () => {
    if (ctx) {
      ctx.running = true;
    }
  });
  
  resizeCanvas();
};
