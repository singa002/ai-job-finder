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
