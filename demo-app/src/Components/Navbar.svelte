<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let isMenuOpen = false;
  export let loggedIn = false; // Passed from layout
  export let user = '';        // Username from cookie

  onMount(() => {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) dropdownMenu.style.display = "none";
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.style.display = isMenuOpen ? "flex" : "none";
    }
  }

  async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  location.href = '/auth-page'; // ⬅️ hard reload forces new layout data
}

</script>

<div>
  <!-- Header -->
  <header class="bg-purple-700 p-4 flex items-center text-white relative">
    <button
      class="menu-icon text-2xl mr-4"
      on:click={toggleMenu}
      aria-label="Toggle menu"
    >
      ☰
    </button>
    <div class="text-xl font-bold tracking-widest">SentinelScan</div>

    <!-- Login Status -->
    <div class="ml-auto flex items-center space-x-4">
      {#if loggedIn}
        <div class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="text-sm font-medium">Logged in as {user}</span>
          <button
            on:click={logout}
            class="ml-4 px-3 py-1 bg-black text-white rounded hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      {:else}
        <button
          on:click={() => goto("/auth-page")}
          class="text-white hover:underline"
        >
          Login
        </button>
      {/if}
    </div>
  </header>

  <!-- Dropdown Menu -->
  <div
    id="dropdownMenu"
    class="hidden absolute top-[64px] left-4 bg-purple-700 p-4 rounded-lg flex-col gap-2 z-10 shadow-lg"
  >
    <button
      on:click={() => goto("/")}
      class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black"
    >
      Main Page
    </button>

    <button
      on:click={() => goto("/test-ur-vulnb")}
      class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black"
    >
      Test Your Vulnerabilities
    </button>

    <button
      on:click={() => goto("/terms-and-co")}
      class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black"
    >
      Terms and Conditions
    </button>

    <button
      on:click={() => goto("/about-us")}
      class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black"
    >
      About Us
    </button>
  </div>
</div>
