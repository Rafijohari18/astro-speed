import { useState, useEffect } from 'preact/hooks';

export default function PageLoadTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const start = performance.now();
    setRunning(true);
    setStarted(true);

    const interval = setInterval(() => {
      const now = performance.now();
      setElapsed(Math.round(now - start));
    }, 10);

    // Stop after 3 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setRunning(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style="text-align: center; padding: 1.5rem;">
      <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem;">
        Island hydration timer (JS aktif di sini)
      </p>
      <div style={`font-size: 2.5rem; font-weight: 800; font-family: var(--font-mono); color: ${running ? 'var(--green)' : 'var(--accent-light)'};`}>
        {started ? `${elapsed}ms` : '...'}
      </div>
      <p style="color: var(--text-secondary); font-size: 0.75rem; margin-top: 0.5rem;">
        {running ? 'Mengukur...' : 'Selesai!'}
      </p>
    </div>
  );
}
