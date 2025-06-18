<script>
  import { onMount } from 'svelte';
  import { goto } from "$app/navigation";

  let selectedParameter = "";
  let parameters = [
    "SQL Injection",
    "XSS",
    "CSRF",
    "Directory Traversal", 
    "Full Scan",
    "SSL Check",
    "Output Vulnerabilities"
  ];
  let isTesting = false;
  let targetIp = "";
  let username = "guest";
  let testOutput = "";

  onMount(() => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('user')) || { username: 'guest' };
      username = userData.username || 'guest';
    } catch {
      username = 'guest';
    }
  });

  function validateIp(ip) {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  }

  async function startTest() {
    if (!targetIp) {
      alert("Please enter a target IP address.");
      return;
    }

    if (!validateIp(targetIp)) {
      alert("Invalid IP address format.");
      return;
    }

    if (!selectedParameter) {
      alert("Please select a parameter to test.");
      return;
    }

    const scriptNameMap = {
      'SQL Injection': 'script_sql_injection',
      'XSS': 'script_xss',
      'CSRF': 'script_CSRF',
      'Directory Traversal': 'script_dir_trav',
      'Full Scan': 'script_full_scan',
      'SSL Check': 'script_ssl',
      'Output Vulnerabilities': 'output_vuln'
    };

    isTesting = true;
    testOutput = "";

    const vuln_type = selectedParameter;
    const script_name = scriptNameMap[selectedParameter];

    const res = await fetch('/api/log-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        ip_address: targetIp,
        vuln_type,
        script_name
      })
    });

    const data = await res.json();

    if (data.success) {
      testOutput = data.output;
    } else {
      testOutput = `❌ Test failed: ${data.message}`;
    }

    isTesting = false;
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-gray-900 text-white font-sans px-4">
  <p class="text-5xl mb-2 font-semibold">Let's test your vulnerabilities</p>
  <p class="text-lg mb-6 text-center">Choose a parameter and target IP to begin testing:</p>

  <!-- IP Input -->
  <div class="mb-4 w-full max-w-xs">
    <input
      type="text"
      bind:value={targetIp}
      placeholder="Enter target IP address"
      class="w-full px-4 py-2 text-purple-600 bg-purple-200 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-700"
    />
  </div>

  <!-- Parameter Dropdown -->
  <div class="mb-6 w-full max-w-xs">
    <select
      bind:value={selectedParameter}
      class="w-full px-4 py-2 text-purple-700 bg-purple-200 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <option value="" disabled>Select a parameter</option>
      {#each parameters as parameter}
        <option value={parameter}>{parameter}</option>
      {/each}
    </select>
  </div>

  <!-- Test Button -->
  <button
    class="px-6 py-2 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
    on:click={startTest}
    disabled={isTesting || !selectedParameter || !targetIp}
  >
    {isTesting ? "Testing..." : "Start Test"}
  </button>

  {#if testOutput}
    <div class="mt-6 bg-gray-800 text-green-400 p-4 rounded w-full max-w-2xl whitespace-pre-wrap">
      <strong>Script Output:</strong>
      <pre>{testOutput}</pre>
    </div>
  {/if}

  <footer class="text-center text-sm text-gray-300 pb-4 mt-10">
    <br />
    Before you check your vulnerabilities, please read our 
    <a href="/terms-and-co" class="text-purple-300 hover:underline"> Terms and Conditions</a>.
  </footer>
</div>
