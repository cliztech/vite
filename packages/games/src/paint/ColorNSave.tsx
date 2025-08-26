import { useEffect, useRef, useState } from "react";

type Props = { width?: number; height?: number };
const PALETTE = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#f472b6", "#111827", "#ffffff"];
const STORAGE_KEY = "poody-color-n-save";

export function ColorNSave({ width = 640, height = 400 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(PALETTE[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const historyPtr = useRef(0);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = saved;
    }
    snapshot();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function snapshot() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, width, height);
    setHistory((prev) => {
      const next = prev.slice(0, historyPtr.current + 1);
      next.push(data);
      historyPtr.current = next.length - 1;
      return next;
    });
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current; if (!canvas) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsDrawing(true);
    draw(e);
  }
  function handlePointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    (e.target as Element).releasePointerCapture(e.pointerId);
    setIsDrawing(false);
    snapshot();
    persist();
  }
  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    draw(e);
  }
  function draw(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  }
  function undo() {
    if (historyPtr.current <= 0) return;
    historyPtr.current -= 1;
    restore();
    persist();
  }
  function redo() {
    if (historyPtr.current >= history.length - 1) return;
    historyPtr.current += 1;
    restore();
    persist();
  }
  function restore() {
    const ctx = canvasRef.current?.getContext("2d");
    const data = history[historyPtr.current];
    if (!ctx || !data) return;
    ctx.putImageData(data, 0, 0);
  }
  function clearAll() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    snapshot();
    persist();
  }
  function persist() {
    const dataUrl = canvasRef.current?.toDataURL("image/png");
    if (dataUrl) localStorage.setItem(STORAGE_KEY, dataUrl);
  }
  function exportPng() {
    const dataUrl = canvasRef.current?.toDataURL("image/png");
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "poody-drawing.png";
    a.click();
  }

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Color palette">
        {PALETTE.map((c) => (
          <button
            key={c}
            aria-label={`Select color ${c}`}
            className="w-8 h-8 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: c, outline: color === c ? "3px solid #f472b6" : undefined }}
            onClick={() => setColor(c)}
          />
        ))}
        <div className="grow" />
        <button className="rounded-full bg-pink-600 text-white px-3 py-2" onClick={undo} aria-label="Undo">Undo</button>
        <button className="rounded-full bg-pink-600 text-white px-3 py-2" onClick={redo} aria-label="Redo">Redo</button>
        <button className="rounded-full bg-pink-600 text-white px-3 py-2" onClick={clearAll} aria-label="Clear">Clear</button>
        <button className="rounded-full bg-yellow-400 text-slate-900 px-3 py-2" onClick={exportPng} aria-label="Export PNG">Save PNG</button>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="touch-none rounded-2xl border border-pink-200 bg-white shadow"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerCancel={handlePointerUp}
        aria-label="Coloring canvas"
        role="img"
      />
    </div>
  );
}

export default ColorNSave;

