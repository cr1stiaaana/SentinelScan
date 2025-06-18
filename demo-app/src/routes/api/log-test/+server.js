import mysql from 'mysql2/promise';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const pool = await mysql.createPool({
  host: 'localhost',
  user: 'userSite',
  password: 'SentinelScan1',
  database: 'SentinelScan'

});

export async function POST({ request }) {
  const { username, ip_address, vuln_type, script_name } = await request.json();

  if (!username || !ip_address || !vuln_type || !script_name) {
    return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const { stdout } = await execAsync(`bash scripts/${script_name}.sh ${ip_address}`);
    const suggestions = 'Please review output for mitigation steps.';

    // ✅ Correct placeholder syntax for MySQL: use `?`
    await pool.query(
      'INSERT INTO scans (username, ip, scan_type, result, suggestions, timestamp) VALUES (?, ?, ?, ?, ?, NOW())',
      [username, ip_address, vuln_type, stdout, suggestions]
    );

    return new Response(JSON.stringify({ success: true, output: stdout }), { status: 200 });
  } catch (err) {
    console.error('Script or DB Error:', err);
    return new Response(JSON.stringify({ success: false, message: err.message || 'Internal error' }), { status: 500 });
  }
}
