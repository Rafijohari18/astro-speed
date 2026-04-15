// Island component - hanya ini yang mengirim JS ke browser
// Komponen lain di halaman ini 100% HTML statis (zero JS)

import { useState, useEffect } from 'preact/hooks';

export default function PerformanceMeter() {
  const [metrics, setMetrics] = useState(null);
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const measure = () => {
      const [nav] = performance.getEntriesByType('navigation');
      if (!nav) return;

      setMetrics({
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart),
        loadComplete: Math.round(nav.loadEventEnd - nav.loadEventStart),
        domInteractive: Math.round(nav.domInteractive - nav.startTime),
        ttfb: Math.round(nav.responseStart - nav.requestStart),
        totalLoad: Math.round(nav.loadEventEnd - nav.startTime),
        transferSize: nav.transferSize,
        htmlSize: document.documentElement.outerHTML.length,
        scriptCount: document.querySelectorAll('script').length,
      });

      setRenderTime(Math.round(performance.now() - start));
    };

    if (document.readyState === 'complete') {
      measure();
    } else {
      window.addEventListener('load', measure);
    }
  }, []);

  if (!metrics) {
    return (
      <div class="perf-panel">
        <h3>&#9889; Mengukur performa halaman...</h3>
        <div class="perf-bar-container">
          <div class="perf-bar"><div class="perf-bar-fill blue" style="width: 0%"></div></div>
        </div>
      </div>
    );
  }

  const maxTime = Math.max(metrics.totalLoad, 1000);

  return (
    <div class="perf-panel animate-in">
      <h3>&#9889; Performance Metrics (Real-time)</h3>

      <div class="perf-bar-container">
        <div class="perf-bar-label">
          <span>TTFB (Time to First Byte)</span>
          <span style={`color: var(--green)`}>{metrics.ttfb}ms</span>
        </div>
        <div class="perf-bar">
          <div class="perf-bar-fill green" style={`width: ${(metrics.ttfb / maxTime) * 100}%`}></div>
        </div>
      </div>

      <div class="perf-bar-container">
        <div class="perf-bar-label">
          <span>DOM Interactive</span>
          <span style={`color: var(--green)`}>{metrics.domInteractive}ms</span>
        </div>
        <div class="perf-bar">
          <div class="perf-bar-fill green" style={`width: ${(metrics.domInteractive / maxTime) * 100}%`}></div>
        </div>
      </div>

      <div class="perf-bar-container">
        <div class="perf-bar-label">
          <span>DOM Content Loaded</span>
          <span style={`color: var(--green)`}>{metrics.domContentLoaded}ms</span>
        </div>
        <div class="perf-bar">
          <div class="perf-bar-fill blue" style={`width: ${(metrics.domContentLoaded / maxTime) * 100}%`}></div>
        </div>
      </div>

      <div class="perf-bar-container">
        <div class="perf-bar-label">
          <span>Total Page Load</span>
          <span style={`color: var(--green)`}>{metrics.totalLoad}ms</span>
        </div>
        <div class="perf-bar">
          <div class="perf-bar-fill green" style={`width: ${(metrics.totalLoad / maxTime) * 100}%`}></div>
        </div>
      </div>

      <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;">
        <div class="metric" style="text-align: center;">
          <div class="metric-value green">{metrics.scriptCount}</div>
          <div class="metric-label">JS Scripts</div>
        </div>
        <div class="metric" style="text-align: center;">
          <div class="metric-value blue">{(metrics.htmlSize / 1024).toFixed(1)}KB</div>
          <div class="metric-label">HTML Size</div>
        </div>
        <div class="metric" style="text-align: center;">
          <div class="metric-value green">{renderTime}ms</div>
          <div class="metric-label">Hydrate Time</div>
        </div>
      </div>
    </div>
  );
}
