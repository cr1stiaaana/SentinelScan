
<script>
    
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let isMenuOpen = false;

    function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.style.display = isMenuOpen ? "flex" : "none";
    }
  }

  onMount(() => {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) dropdownMenu.style.display = "none";
  });
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
    > Terms and Conditions
    </button>
    <button
      on:click={() => goto("/about-us")}
      class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black"
    >
      About Us
    </button>
    <button
    on:click={() => goto("/auth-page")}
    class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black"
  >
    Login
  </button>
  </div>

 </div>