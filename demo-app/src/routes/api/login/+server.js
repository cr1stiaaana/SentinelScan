import { pool } from '$lib/db.js';

export async function POST({ request }) {
  const { username, password } = await request.json();

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      // Set user data in session storage
      const userData = {
        username: rows[0].username,
        id: rows[0].id
      };

      return new Response(JSON.stringify({
        success: true,
        user: userData
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid credentials'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({
      success: false,
      error: 'Server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
