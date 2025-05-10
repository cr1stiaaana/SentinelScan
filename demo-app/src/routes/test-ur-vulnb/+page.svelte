<script>
    import { goto } from "$app/navigation";
    import Navbar from "../../Components/Navbar.svelte";
  
    let selectedParameter = "";
    let parameters = ["SQL Injection", "XSS", "CSRF", "Directory Traversal"];
    let isTesting = false;
    let isMenuOpen = false;
    let targetIp = "";
  
    function validateIp(ip) {
      // Regex to match IPv4 addresses
      const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      return ipRegex.test(ip);
    }
  
    function startTest() {
      if (!targetIp) {
        alert("Please enter a target IP address.");
        return;
      }
  
      if (!validateIp(targetIp)) {
        alert("Invalid IP address format. Please enter a valid IPv4 address.");
        return;
      }
  
      if (selectedParameter) {
        isTesting = true;
        setTimeout(() => {
          alert(`Testing ${selectedParameter} vulnerabilities on ${targetIp} completed!`);
          isTesting = false;
        }, 2000);
      } else {
        alert("Please select a parameter to test.");
      }
    }
  
  </script>
  
  <Navbar/>
  
  
  <!-- Dropdown Menu -->
  
  
  <!-- Main Content -->
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
        <option value="" disabled selected>Select a parameter</option>
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
  
    {#if isTesting}
      <p class="mt-4 text-lg font-semibold">
        Testing {selectedParameter} vulnerabilities on {targetIp}...
      </p>
    {/if}

    <footer class="text-center text-sm text-gray-300 pb-4">
      <br>
      Before you check your vulnerabilities, please read our <a href="/terms-and-co" class="text-purple-300 hover:underline">Terms and Conditions</a>.
    </footer>

  </div>

  