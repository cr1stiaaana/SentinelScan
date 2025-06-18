import mysql from 'mysql2/promise';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

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
    // ✅ Updated list of allowed scripts
    const allowedScripts = [
      'sql_injection_test',
      'script_xss',
      'script_CSRF',
      'script_dir_trav',
      'script_full_scan',
      'script_sql_injection',
      'script_ssl',
      'output_vuln'
    ];

    console.log('Requested script:', script_name);
    console.log('Allowed scripts:', allowedScripts);

    if (!allowedScripts.includes(script_name)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Script not allowed' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ✅ Construct absolute path to scripts directory
    const scriptsDir = path.resolve(process.cwd(), 'scripts');
    const scriptPath = path.join(scriptsDir, `${script_name}.sh`);

    // ✅ Execute script with proper path and arguments
    const command = `bash ${scriptPath} ${ip_address}`;
    console.log(`Executing: ${command}`);
    
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
    return new Response(JSON.stringify({ 
      success: false, 
      message: err.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await db.end();
  }
}
