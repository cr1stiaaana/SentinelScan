import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    host: 'localhost',
    user: 'userSite',
    password: 'SentinelScan1',
    database: 'SentinelScan',
    port: 5432,
});

export async function GET({ url }) {
  const username = url.searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username is required' }), { status: 400 });
  }

  try {
    const result = await pool.query(
      'SELECT ip, scan_type, result, suggestions, timestamp FROM scans WHERE username = $1 ORDER BY timestamp DESC',
      [username]
    );
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to fetch scans' }), { status: 500 });
  }
}