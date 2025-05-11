import mysql from 'mysql2/promise';

export async function POST({ request, cookies }) {
  const { username, password } = await request.json();

  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'userSite',
    password: 'SentinelScan1',
    database: 'SentinelScan'
  });

  const [users] = await db.execute(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );

  await db.end();

  if (users.length === 0) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
      status: 401
    });
  }

  cookies.set('user', username, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24 // 1 day
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
