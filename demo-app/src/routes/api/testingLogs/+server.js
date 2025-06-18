import { pool } from '$lib/db.js';

export async function GET({ url }) {
  const username = url.searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    let query, params;
    
    if (username === 'admin') {
      query = 'SELECT * FROM testingLogs ORDER BY timestamp DESC';
      params = [];
    } else {
      query = 'SELECT * FROM testingLogs WHERE username = ? ORDER BY timestamp DESC';
      params = [username];
    }

    const [rows] = await pool.execute(query, params);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Database error:', err);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch testing logs',
      details: err.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}