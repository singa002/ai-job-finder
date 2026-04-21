import { useState, useEffect } from 'react';

const BACKEND_URL = 'http://localhost:5000';
const ROBOT_WS_URL = 'ws://166.147.161.155:8090';

function App() {
  const [state, setState] = useState(null);
  const [map, setMap] = useState(null);
  const [telemetry, setTelemetry] = useState(null);
  const [connected, setConnected] = useState(false);
  const [targetX, setTargetX] = useState('');
  const [targetY, setTargetY] = useState('');

  // HTTP - fetch state and map
  useEffect(() => {
    fetch(`${BACKEND_URL}/state`).then(r => r.json()).then(setState);
    fetch(`${BACKEND_URL}/map`).then(r => r.json()).then(setMap);
  }, []);

  // WebSocket - live telemetry
  useEffect(() => {
    const ws = new WebSocket(ROBOT_WS_URL);
    ws.onopen = () => setConnected(true);
    ws.onmessage = (e) => setTelemetry(JSON.parse(e.data));
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    return () => ws.close();
  }, []);

  // Commands
  const sendHome = async () => {
    const res = await fetch(`${BACKEND_URL}/chassis/send-home`, { method: 'POST' });
    alert(JSON.stringify(await res.json()));
  };

  const jackUp = async () => {
    const res = await fetch(`${BACKEND_URL}/chassis/jack-up`, { method: 'POST' });
    alert(JSON.stringify(await res.json()));
  };

  const jackDown = async () => {
    const res = await fetch(`${BACKEND_URL}/chassis/jack-down`, { method: 'POST' });
    alert(JSON.stringify(await res.json()));
  };

  const moveTo = async () => {
    const res = await fetch(`${BACKEND_URL}/chassis/moves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_x: parseFloat(targetX), target_y: parseFloat(targetY) })
    });
    alert(JSON.stringify(await res.json()));
  };

  return (
    <div style={{ maxWidth: '540px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '22px' }}>Robot Control</h1>
        <span style={{
          padding: '4px 12px', borderRadius: '20px', fontSize: '13px',
          background: connected ? '#d4edda' : '#f8d7da',
          color: connected ? '#155724' : '#721c24'
        }}>
          {connected ? '● Connected' : '● Disconnected'}
        </span>
      </div>

      {/* Telemetry Cards */}
      <div style={{ display: 'grid', marginBottom: '12px' }}>
        {[
          { label: 'Battery',  value: telemetry ? `${telemetry.battery}%` : '—' },
          { label: 'Online',   value: telemetry ? (telemetry.online ? 'Yes' : 'No') : '—' },
          { label: 'Moving',   value: telemetry ? (telemetry.moving ? 'Yes' : 'No') : '—' },
          { label: 'Jack',     value: telemetry ? (telemetry.jacked_up ? 'Up' : 'Down') : '—' },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px', padding: '16px' }}>
            <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6c757d' }}>{label}</p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Pose */}
      <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
        <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6c757d' }}>Pose</p>
        <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
          X: {telemetry?.pose?.x ?? '—'} &nbsp;|&nbsp;
          Y: {telemetry?.pose?.y ?? '—'} &nbsp;|&nbsp;
          ORI: {telemetry?.pose?.ori ?? '—'}
        </p>
      </div>

      {/* Commands */}
      <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Commands</h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <button onClick={sendHome} style={btnStyle}>Send Home</button>
        <button onClick={jackUp}   style={btnStyle}>Jack Up</button>
        <button onClick={jackDown} style={btnStyle}>Jack Down</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="number" placeholder="X" value={targetX}
          onChange={e => setTargetX(e.target.value)}
          style={{ width: '80px', padding: '8px', border: '1px solid #dee2e6', borderRadius: '6px' }}
        />
        <input
          type="number" placeholder="Y" value={targetY}
          onChange={e => setTargetY(e.target.value)}
          style={{ width: '80px', padding: '8px', border: '1px solid #dee2e6', borderRadius: '6px' }}
        />
        <button onClick={moveTo} style={{ ...btnStyle, background: '#007bff', color: '#fff', border: 'none' }}>
          Move
        </button>
      </div>

    </div>
  );
}

const btnStyle = {
  padding: '8px 16px',
  border: '1px solid #dee2e6',
  borderRadius: '6px',
  background: '#fff',
  cursor: 'pointer',
  fontSize: '14px'
};

export default App;
