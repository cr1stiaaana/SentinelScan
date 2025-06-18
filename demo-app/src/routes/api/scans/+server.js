import { json } from '@sveltejs/kit';
import { db } from '$lib/db'; // ensure this is your DB pool

export async function GET({ locals }) {
  const user = locals.user;
  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [logs] = await db.query(
    `SELECT id, ip_address, vuln_type, script_name, result, timestamp
     FROM testingLogs
     WHERE username = ?
     ORDER BY timestamp DESC`,
    [user.username]
  );

  return json(logs);
}
