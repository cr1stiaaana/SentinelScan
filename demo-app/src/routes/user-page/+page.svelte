<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  let scans = [];
  let error = '';
  let username = '';
  let isAdmin = false;
  let isLoading = true;

  onMount(async () => {
    try {
      // Check for user session
      const userDataStr = sessionStorage.getItem('user');
      if (!userDataStr) {
        goto('/auth-page');
        return;
      }

      const userData = JSON.parse(userDataStr);
      if (!userData || !userData.username) {
        goto('/auth-page');
        return;
      }

      username = userData.username;
      isAdmin = username === 'admin';

      // Fetch scan history
      const res = await fetch(`/api/testingLogs?username=${username}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      scans = data;
      
    } catch (err) {
      console.error('Error:', err);
      error = 'Failed to load scan history. Please try again.';
    } finally {
      isLoading = false;
    }
  });
</script>

<div class="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-700 to-gray-900 text-white font-sans px-4 py-8">
  <div class="w-full max-w-6xl">
    <h1 class="text-4xl font-bold mb-8">
      {#if isAdmin}
        All Users Scan History
      {:else}
        Your Scan History
      {/if}
    </h1>

    {#if isLoading}
      <div class="bg-gray-800 rounded-lg p-6 text-center">
        <p class="text-gray-400">Loading scan history...</p>
      </div>
    {:else if error}
      <div class="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
        <p class="text-red-400">{error}</p>
      </div>
    {:else if scans.length === 0}
      <div class="bg-gray-800 rounded-lg p-6 text-center">
        <p class="text-gray-400">No scan results available yet.</p>
      </div>
    {:else}
      <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <!-- Scan results table -->
        <table class="min-w-full divide-y divide-gray-700">
          <thead class="bg-gray-900">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">IP Address</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Script Name</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Timestamp</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Output</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            {#each scans as scan}
              <tr class="hover:bg-gray-700/50 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-300">{scan.ip_address}</td>
                <td class="px-6 py-4 text-sm text-gray-300">{scan.script_name}</td>
                <td class="px-6 py-4 text-sm text-gray-300">
                  {new Date(scan.timestamp).toLocaleString()}
                </td>
                <td class="px-6 py-4">
                  <details class="text-sm">
                    <summary class="cursor-pointer text-purple-400 hover:text-purple-300">
                      View Output
                    </summary>
                    <div class="mt-2 p-3 bg-gray-900 rounded text-gray-300 whitespace-pre-wrap">
                      {scan.output}
                    </div>
                  </details>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>
