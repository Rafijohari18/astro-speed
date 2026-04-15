import { useState } from 'preact/hooks';

// Komponen ini HYDRATED karena menggunakan client:visible
// Bandingkan: hanya KOMPONEN INI yang mengirim JS ke browser

export default function InteractiveCounter({ label = 'Counter' }) {
  const [count, setCount] = useState(0);

  return (
    <div style="text-align: center;">
      <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem;">{label}</p>
      <div style="font-size: 3rem; font-weight: 800; font-family: var(--font-mono); color: var(--accent-light); margin: 0.5rem 0;">
        {count}
      </div>
      <div style="display: flex; gap: 0.5rem; justify-content: center;">
        <button class="btn btn-primary" onClick={() => setCount(c => c - 1)}>-</button>
        <button class="btn btn-outline" onClick={() => setCount(0)}>Reset</button>
        <button class="btn btn-primary" onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
}
