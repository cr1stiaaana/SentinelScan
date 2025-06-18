<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let isMenuOpen = false;
  export let loggedIn = false; // Prop to track login state

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.style.display = isMenuOpen ? "flex" : "none";
    }
  }

  function logout() {
    sessionStorage.removeItem("user"); // Clear session storage
    loggedIn = false; // Update loggedIn state
    goto("/auth-page"); // Redirect to login page
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

    <!-- Navbar Links -->
    <div class="ml-auto flex items-center space-x-4">
      <button
        on:click={() => goto("/")}
        class="text-white hover:underline"
      >
        Home
      </button>
      {#if loggedIn}
        <button
          on:click={() => goto("/user-page")}
          class="text-white hover:underline"
        >
          My Profile
        </button>
        <button
          on:click={logout}
          class="text-red-400 hover:underline"
        >
          Logout
        </button>
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
