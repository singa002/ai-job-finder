import { useState, useEffect } from 'react';

const BACKEND_URL = 'http://localhost:5000';

function App() {
  const [state, setState] = useState(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stateRes, mapRes] = await Promise.all([
          fetch(`${BACKEND_URL}/state`),
          fetch(`${BACKEND_URL}/map`)
        ]);
        setState(await stateRes.json());
        setMap(await mapRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const moveTo = async (x, y) => {
    const res = await fetch(`${BACKEND_URL}/chassis/moves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_x: x, target_y: y })
    });
    alert(JSON.stringify(await res.json()));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Robot Control</h1>

      <h2>State</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>

      <h2>Map</h2>
      <pre>{JSON.stringify(map, null, 2)}</pre>

      <h2>Commands</h2>
      <button onClick={sendHome}>Send Home</button>
      <button onClick={jackUp}>Jack Up</button>
      <button onClick={jackDown}>Jack Down</button>
      <button onClick={() => moveTo(2.5, 1.0)}>Move to (2.5, 1.0)</button>
    </div>
  );
}

export default App;



# App.js (frontend)

import { useState, useEffect } from 'react';

const BACKEND_URL = 'http://localhost:5000';
const ROBOT_WS_URL = 'ws://166.147.161.155:8090';

function App() {
  const [state, setState] = useState(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [telemetry, setTelemetry] = useState(null);
  const [connected, setConnected] = useState(false);

  // HTTP - fetch state and map
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stateRes, mapRes] = await Promise.all([
          fetch(`${BACKEND_URL}/state`),
          fetch(`${BACKEND_URL}/map`)
        ]);
        setState(await stateRes.json());
        setMap(await mapRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // WebSocket - live telemetry direct from robot
  useEffect(() => {
    const ws = new WebSocket(ROBOT_WS_URL);
    ws.onopen = () => setConnected(true);
    ws.onmessage = (event) => setTelemetry(JSON.parse(event.data));
    ws.onerror = () => setConnected(false);
    ws.onclose = () => setConnected(false);
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

  const moveTo = async (x, y) => {
    const res = await fetch(`${BACKEND_URL}/chassis/moves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_x: x, target_y: y })
    });
    alert(JSON.stringify(await res.json()));
  };

  if (loading) return <p style={{ padding: '40px', fontFamily: 'sans-serif' }}>Loading...</p>;
  if (error) return <p style={{ padding: '40px', fontFamily: 'sans-serif', color: 'red' }}>Error: {error}</p>;

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Robot Control</h1>
        <div style={{ ...styles.badge, background: connected ? '#d4edda' : '#f8d7da', color: connected ? '#155724' : '#721c24' }}>
          {connected ? '● Connected' : '● Disconnected'}
        </div>
      </div>

      {/* Live Telemetry */}
      <h2 style={styles.sectionTitle}>Live Telemetry</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <p style={styles.label}>Battery</p>
          <p style={styles.value}>{telemetry ? `${telemetry.battery}%` : '—'}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.label}>Moving</p>
          <p style={styles.value}>{telemetry ? (telemetry.moving ? 'Yes' : 'No') : '—'}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.label}>Jack</p>
          <p style={styles.value}>{telemetry ? (telemetry.jacked_up ? 'Up' : 'Down') : '—'}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.label}>Online</p>
          <p style={styles.value}>{telemetry ? (telemetry.online ? 'Yes' : 'No') : '—'}</p>
        </div>
      </div>

      {/* Pose */}
      <div style={{ ...styles.card, marginBottom: '24px' }}>
        <p style={styles.label}>Live Pose</p>
        <p style={styles.value}>
          X: {telemetry?.pose?.x ?? '—'} &nbsp;
          Y: {telemetry?.pose?.y ?? '—'} &nbsp;
          ORI: {telemetry?.pose?.ori ?? '—'}
        </p>
      </div>

      {/* State & Map */}
      <h2 style={styles.sectionTitle}>State</h2>
      <pre style={styles.pre}>{JSON.stringify(state, null, 2)}</pre>

      <h2 style={styles.sectionTitle}>Map</h2>
      <pre style={styles.pre}>{JSON.stringify(map, null, 2)}</pre>

      {/* Commands */}
      <h2 style={styles.sectionTitle}>Commands</h2>
      <div style={styles.btnRow}>
        <button style={styles.btn} onClick={sendHome}>Send Home</button>
        <button style={styles.btn} onClick={jackUp}>Jack Up</button>
        <button style={styles.btn} onClick={jackDown}>Jack Down</button>
        <button style={styles.btn} onClick={() => moveTo(2.5, 1.0)}>Move to (2.5, 1.0)</button>
      </div>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: '640px',
    margin: '40px auto',
    padding: '0 16px',
    fontFamily: 'sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    margin: 0,
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: '16px',
    color: '#495057',
    marginBottom: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '12px',
  },
  card: {
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '16px',
  },
  label: {
    margin: '0 0 4px 0',
    fontSize: '13px',
    color: '#6c757d',
  },
  value: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '500',
  },
  pre: {
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '13px',
    marginBottom: '24px',
    overflow: 'auto',
  },
  btnRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '10px 16px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    background: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default App;
