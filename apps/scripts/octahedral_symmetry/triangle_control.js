export let slider = {A: 1 / 3, B: 1 / 3, C: 1 / 3};

const triCanvas = document.createElement('canvas');
const size = 200 + 10; // logical size
const dpr = window.devicePixelRatio || 1;
triCanvas.width = size * dpr;
triCanvas.height = 173 * dpr + 10 * dpr;
triCanvas.style.width = size + 'px';
triCanvas.style.height = (173 + 10) + 'px';
triCanvas.style.position = 'fixed';
triCanvas.style.top = '10px';
triCanvas.style.right = '10px';
triCanvas.style.zIndex = '100';
triCanvas.style.background = 'rgba(255,255,255,0.1)';
document.body.appendChild(triCanvas);

const ctx = triCanvas.getContext('2d');
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
function drawPolygon(ctx, points, color) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; ++i) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function ptFromBarycentric(b, c) {
  const w = size;
  const h = 173 + 10;
  const margin = 5;

  const A = { x: w / 2, y: margin };
  const Bv = { x: margin - A.x, y: h - margin - A.y };
  const Cv = { x: w - margin - A.x, y: h - margin - A.y };
  return {
    x: A.x + b * Bv.x + c * Cv.x,
    y: A.y + b * Bv.y + c * Cv.y
  };
}

export function drawTriangle() {
  const w = size;
  const h = 173 + 10;
  const margin = 5;
  ctx.clearRect(0, 0, w, h);
  const A = { x: w / 2, y: margin };
  const B = { x: margin, y: h - margin };
  const C = { x: w - margin, y: h - margin };

  drawPolygon(ctx, [ptFromBarycentric(0, 0), ptFromBarycentric(0, 1), ptFromBarycentric(1, 0)], '#FFBBDD');
  drawPolygon(ctx, [
    ptFromBarycentric(0, 0.585786),
    ptFromBarycentric(0.25273, 0.437741),
    ptFromBarycentric(0.366025, 0.633975),
    ptFromBarycentric(0, 1)
  ], '#BBDDFF');
  drawPolygon(ctx, [
    ptFromBarycentric(0, 0.585786),
    ptFromBarycentric(0.25273, 0.437741),
    ptFromBarycentric(0.323544, 0.280197),
    ptFromBarycentric(0, 0.41421)
  ], '#220022');
  drawPolygon(ctx, [
    ptFromBarycentric(0, 0.414214),
    ptFromBarycentric(0.323544, 0.280197),
    ptFromBarycentric(0.44949, 0),
    ptFromBarycentric(0, 0)
  ], '#222200');
  drawPolygon(ctx, [
    ptFromBarycentric(0.417738, 0.241181),
    ptFromBarycentric(0.323544, 0.280197),
    ptFromBarycentric(0.44949, 0),
    ptFromBarycentric(0.55051, 0)
  ], '#002222');
  drawPolygon(ctx, [
    ptFromBarycentric(0.633975, 0.366025),
    ptFromBarycentric(0.417738, 0.241181),
    ptFromBarycentric(0.55051, 0),
    ptFromBarycentric(1., 0)
  ], '#DDFFBB');
  drawPolygon(ctx, [
    ptFromBarycentric(0.336565, 0.388631),
    ptFromBarycentric(0.417738, 0.241181),
    ptFromBarycentric(0.633975, 0.366025),
    ptFromBarycentric(0.464102, 0.535898)
  ], '#DDBBFF');
  drawPolygon(ctx, [
    ptFromBarycentric(0.336565, 0.388631),
    ptFromBarycentric(0.25273, 0.437741),
    ptFromBarycentric(0.366025, 0.633975),
    ptFromBarycentric(0.464102, 0.535898)
  ], '#BBFFDD');
  drawPolygon(ctx, [
    ptFromBarycentric(0.25273, 0.437741),
    ptFromBarycentric(0.26529, 0.417723),
    ptFromBarycentric(0.277024, 0.399849),
    ptFromBarycentric(0.288048, 0.38378),
    ptFromBarycentric(0.298455, 0.369243),
    ptFromBarycentric(0.308322, 0.35602),
    ptFromBarycentric(0.31771, 0.343931),
    ptFromBarycentric(0.32667, 0.332829),
    ptFromBarycentric(0.335247, 0.322592),
    ptFromBarycentric(0.343478, 0.313116),
    ptFromBarycentric(0.351392, 0.304315),
    ptFromBarycentric(0.359019, 0.296114),
    ptFromBarycentric(0.36638, 0.288449),
    ptFromBarycentric(0.373496, 0.281267),
    ptFromBarycentric(0.380386, 0.27452),
    ptFromBarycentric(0.387065, 0.268167),
    ptFromBarycentric(0.393547, 0.262171),
    ptFromBarycentric(0.399845, 0.256501),
    ptFromBarycentric(0.405969, 0.251128),
    ptFromBarycentric(0.41193, 0.246029),
    ptFromBarycentric(0.417738, 0.241181),
    ptFromBarycentric(0.323544, 0.280197)
  ], '#FFDDBB');

  ctx.beginPath();
  ctx.arc(
    A.x + slider['B'] * (B.x - A.x) + slider['C'] * (C.x - A.x),
    A.y + slider['B'] * (B.y - A.y) + slider['C'] * (C.y - A.y),
    4, 0, 2 * Math.PI
  );
  ctx.strokeStyle = '#FFF';
  ctx.stroke();
}

const sliderHTML = {
  A: document.getElementById('slider-a'),
  B: document.getElementById('slider-b'),
  C: document.getElementById('slider-c')
};

let dragging = false;
triCanvas.addEventListener('mousedown', (e) => {
  dragging = true;
  handlePointer(e);
});
window.addEventListener('mousemove', (e) => {
  if (dragging) handlePointer(e);
});
window.addEventListener('mouseup', () => {
  dragging = false;
});

function handlePointer(e) {
  const rect = triCanvas.getBoundingClientRect();
  // Map mouse to logical coordinates
  const logicalX = (e.clientX - rect.left) * (size / rect.width);
  const logicalY = (e.clientY - rect.top) * ((173 + 10) / rect.height);

  const w = size;
  const margin = 5;

  const A = { x: w / 2, y: margin };

  const delAx = logicalX - A.x;
  const delAy = logicalY - A.y;
  const cB = Math.min(1, Math.max(0, -delAx / 200 + delAy / 346));
  const cC = Math.min(1, Math.max(0, delAx / 200 + delAy / 346));

  slider['B'] = cB / Math.max(1, cB + cC);
  slider['C'] = cC / Math.max(1, cB + cC);
  slider['A'] = 1 - slider['B'] - slider['C'];

  drawTriangle();

  sliderHTML['A'].textContent = slider['A'].toFixed(2);
  sliderHTML['B'].textContent = slider['B'].toFixed(2);
  sliderHTML['C'].textContent = slider['C'].toFixed(2);
};
