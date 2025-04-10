<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
    import Navbar from "../Components/Navbar.svelte";

    let isScriptRunning = false;

  async function runScript(scriptName) {
    isScriptRunning = true;
    const response = await fetch(`/api/run-script?scriptName=${scriptName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    isScriptRunning = false;
  }


</script>

<!-- Page Layout -->


  <!-- Optional Script Button (Commented Out) -->
  <!--
  <button
    class="menu-icon text-2xl bg-none border-2 border-purple-300 font-bold py-2 px-4 rounded-lg hover:bg-purple-300"
    on:click={() => runScript('script1')}
    aria-label="Toggle menu"
  >
    Run script
  </button>
  -->

  
<Navbar/>

<div class ="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-gray-900 text-white font-sans">

   <!-- Main Content -->
  <main class="flex flex-col items-center justify-center text-center flex-grow px-4 py-8">
    <h2 class="text-lg tracking-widest mb-4">WELCOME TO</h2>
    <h1
      class="text-6xl font-bold mb-8"
      style="text-shadow: 2px 2px 0 #000, 2px 2px 5px #e57aff"
    >
      Sentinel Scan
    </h1>
    <button
      on:click={() => goto("/test-ur-vulnb")}
      class="bg-purple-600 border-2 border-purple-300 text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-purple-500"
    >
      Test Your Vulnerabilities
    </button>
  </main>



  <footer class="text-center text-sm text-gray-300 pb-4">
    Your Beloved Vulnerability Scanner
  </footer>


</div>