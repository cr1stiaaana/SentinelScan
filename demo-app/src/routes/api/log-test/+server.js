import mysql from 'mysql2/promise';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST({ request }) {
  const { username, ip_address, vuln_type, script_name } = await request.json();

  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'userSite',
    password: 'SentinelScan1',
    database: 'SentinelScan'
  });

  try {
    // ✅ Sanitize allowed script names (important)
    const allowedScripts = ['sql_injection_test', 'xss_test'];
    if (!allowedScripts.includes(script_name)) {
      return new Response(JSON.stringify({ success: false, message: 'Script not allowed' }), {
        status: 403
      });
    }

    // ✅ Construct and execute bash command
    const command = `./scripts/${script_name}.sh ${ip_address}`;
    const { stdout, stderr } = await execAsync(command);
    const output = stderr || stdout || 'No output returned from script.';

    // ✅ Insert test result into database
    await db.execute(
      `INSERT INTO testingLogs (username, ip_address, vuln_type, script_name, output)
       VALUES (?, ?, ?, ?, ?)`,
      [username, ip_address, vuln_type, script_name, output]
    );

    return new Response(JSON.stringify({ success: true, output }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Error executing script or inserting log:', err);
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await db.end();
  }
}
