import { drawOctahedralRegions, drawIcosahedralRegions } from './region_drawer.js'
export let slider = {A: 1 / 3, B: 1 / 3, C: 1 / 3};
export function setupTriangleControl(symmetry) {
  const triCanvas = document.createElement('canvas');
  const size = 200 + 10;
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

  function drawTriangle() {
    const w = size;
    const h = 173 + 10;
    const margin = 5;
    ctx.clearRect(0, 0, w, h);
    const A = { x: w / 2, y: margin };
    const B = { x: margin, y: h - margin };
    const C = { x: w - margin, y: h - margin };

    if (symmetry == "Octahedral") drawOctahedralRegions(ctx);
    if (symmetry == "Icosahedral") drawIcosahedralRegions(ctx);

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

    sliderHTML['A'].textContent = Math.abs(slider['A']).toFixed(2);
    sliderHTML['B'].textContent = slider['B'].toFixed(2);
    sliderHTML['C'].textContent = slider['C'].toFixed(2);
  };
  drawTriangle()
}
