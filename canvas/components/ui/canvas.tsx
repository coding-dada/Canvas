function n(e) {
  // @ts-expect-error: e might be undefined, but init handles it internally
  this.init(e || {});
}
n.prototype = {
  // @ts-expect-error: e might be undefined, but init handles it internally
  init: function (e) {
    // @ts-expect-error: e might be undefined, but init handles it internally
    this.phase = e.phase || 0;
    // @ts-expect-error: e might be undefined, but init handles it internally
    this.offset = e.offset || 0;
    // @ts-expect-error: e might be undefined, but init handles it internally
    this.frequency = e.frequency || 0.001;
    // @ts-expect-error: e might be undefined, but init handles it internally
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    return (
      // @ts-expect-error: e might be undefined, but init handles it internally
      (this.phase += this.frequency),
      // @ts-expect-error: e might be undefined, but init handles it internally
      (e = this.offset + Math.sin(this.phase) * this.amplitude)
    );
  },
  value: function () {
    return e;
  },
};

// @ts-expect-error: e might be undefined, but init handles it internally
function Line(e) {
  // @ts-expect-error: e might be undefined, but init handles it internally
  this.init(e || {});
}

Line.prototype = {
  // @ts-expect-error: e might be undefined, but init handles it internally
  init: function (e) {
    // @ts-expect-error: e might be undefined, but init handles it internally
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    // @ts-expect-error: e might be undefined, but init handles it internally
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    // @ts-expect-error: e might be undefined, but init handles it internally
    this.nodes = [];
    for (let t, n = 0; n < E.size; n++) {
      t = new Node();
      // @ts-expect-error: e might be undefined, but init handles it internally
      t.x = pos.x;
      // @ts-expect-error: e might be undefined, but init handles it internally
      t.y = pos.y;
      // @ts-expect-error: e might be undefined, but init handles it internally
      this.nodes.push(t);
    }
  },
  update: function () {
    // @ts-expect-error: e might be undefined, but init handles it internally
    let e = this.spring,
      // @ts-expect-error: e might be undefined, but init handles it internally
      t = this.nodes[0];
    // @ts-expect-error: e might be undefined, but init handles it internally
    t.vx += (pos.x - t.x) * e;
    // @ts-expect-error: e might be undefined, but init handles it internally
    t.vy += (pos.y - t.y) * e;
    // @ts-expect-error: e might be undefined, but init handles it internally
    for (let n, i = 0, a = this.nodes.length; i < a; i++)
      // @ts-expect-error: e might be undefined, but init handles it internally
      (t = this.nodes[i]),
        0 < i &&
          // @ts-expect-error: e might be undefined, but init handles it internally
          ((n = this.nodes[i - 1]),
          (t.vx += (n.x - t.x) * e),
          (t.vy += (n.y - t.y) * e),
          (t.vx += n.vx * E.dampening),
          (t.vy += n.vy * E.dampening)),
        // @ts-expect-error: e might be undefined, but init handles it internally
        (t.vx *= this.friction),
        // @ts-expect-error: e might be undefined, but init handles it internally
        (t.vy *= this.friction),
        (t.x += t.vx),
        (t.y += t.vy),
        (e *= E.tension);
  },
  draw: function () {
    let e,
      t,
      // @ts-expect-error: e might be undefined, but init handles it internally
      n = this.nodes[0].x,
      // @ts-expect-error: e might be undefined, but init handles it internally
      i = this.nodes[0].y;
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.beginPath();
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.moveTo(n, i);
    // @ts-expect-error: e might be undefined, but init handles it internally
    for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
      // @ts-expect-error: e might be undefined, but init handles it internally
      e = this.nodes[a];
      // @ts-expect-error: e might be undefined, but init handles it internally
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      // @ts-expect-error: e might be undefined, but init handles it internally
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    // @ts-expect-error: e might be undefined, but init handles it internally
    e = this.nodes[a];
    // @ts-expect-error: e might be undefined, but init handles it internally
    t = this.nodes[a + 1];
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.stroke();
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.closePath();
  },
};

// @ts-expect-error: e might be undefined, but init handles it internally
function onMousemove(e) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }
  // @ts-expect-error: e might be undefined, but init handles it internally
  function c(e) {
    e.touches
      ? // @ts-expect-error: e might be undefined, but init handles it internally
        ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
      : // @ts-expect-error: e might be undefined, but init handles it internally
        ((pos.x = e.clientX), (pos.y = e.clientY)),
      e.preventDefault();
  }
  // @ts-expect-error: e might be undefined, but init handles it internally
  function l(e) {
    // @ts-expect-error: e might be undefined, but init handles it internally
    1 == e.touches.length &&
      ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
  }
  document.removeEventListener("mousemove", onMousemove),
    document.removeEventListener("touchstart", onMousemove),
    document.addEventListener("mousemove", c),
    document.addEventListener("touchmove", c),
    document.addEventListener("touchstart", l),
    c(e),
    o(),
    render();
}

function render() {
  // @ts-expect-error: e might be undefined, but init handles it internally
  if (ctx.running) {
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.globalCompositeOperation = "source-over";
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.globalCompositeOperation = "lighter";
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.lineWidth = 10;
    for (let e, t = 0; t < E.trails; t++) {
      // @ts-expect-error: e might be undefined, but init handles it internally
      (e = lines[t]).update();
      e.draw();
    }
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  // @ts-expect-error: e might be undefined, but init handles it internally
  ctx.canvas.width = window.innerWidth - 20;
  // @ts-expect-error: e might be undefined, but init handles it internally
  ctx.canvas.height = window.innerHeight;
}

// @ts-expect-error: e might be undefined, but init handles it internally
let ctx,
  // @ts-expect-error: e might be undefined, but init handles it internally
  f,
  e = 0,
  pos = {},
  // @ts-expect-error: e might be undefined, but init handles it internally
  lines = []
  const E = {
    debug: true,
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };
const pos = {}

function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

export const renderCanvas = function () {
  // @ts-expect-error: e might be undefined, but init handles it internally
  ctx = document.getElementById("canvas").getContext("2d");
  ctx.running = true;
  ctx.frame = 1;
  f = new n({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => {
    // @ts-expect-error: e might be undefined, but init handles it internally
    if (!ctx.running) {
      // @ts-expect-error: e might be undefined, but init handles it internally
      ctx.running = true;
      render();
    }
  });
  window.addEventListener("blur", () => {
    // @ts-expect-error: e might be undefined, but init handles it internally
    ctx.running = true;
  });
  resizeCanvas();
};
