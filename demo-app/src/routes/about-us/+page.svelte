<script>
  import { goto } from "$app/navigation"; // Import the goto function

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const dropdown = document.getElementById("topMenu");
    if (dropdown) {
      dropdown.style.display = isMenuOpen ? "flex" : "none";
    }
  }
</script>

<!-- Top Navigation Bar -->
<header class="bg-purple-800 text-white p-4 flex items-center relative">
  <button class="text-2xl mr-4" on:click={toggleMenu}>☰</button>
  <div class="text-xl font-bold tracking-widest">SentinelScan</div>
</header>

<!-- Dropdown Menu -->
<div
  id="topMenu"
  class="hidden absolute bg-purple-900 p-4 rounded-lg flex-col gap-2 left-4 top-[64px] z-10 shadow-lg"
>
  <button 
  on:click={() => goto("/terms-and-co")}
  class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black">

    Terms and Conditions
  </button>
  <button
    on:click={() => goto("/test-ur-vulnb")}
    class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black"
  >
    Test
  </button>
  <button
    on:click={() => goto("/main-page")}
    class="border-2 border-purple-300 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-purple-300 hover:text-black"
  >
    Main Page
  </button>
</div>

<!-- Main Content -->
<div class="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-gray-900 text-white font-sans px-4 pt-16">
  <!-- About Us Section -->
  <div class="group mb-6 p-4 rounded-lg">
    <p class="text-5xl font-bold mb-2 group-hover:mb-6 transition-all duration-300">
      About Us
    </p>
    <p
      class="text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
      veritatis quod? Nesciunt expedita maiores ut corporis reiciendis sed vero
      nemo praesentium eligendi excepturi non assumenda unde blanditiis, aperiam
      aspernatur? Consectetur.
    </p>
  </div>

  <!-- What Kind of Vulnerabilities We Test Section -->
  <div class="group mb-6 p-4 rounded-lg">
    <p class="text-5xl font-bold mb-2 group-hover:mb-6 transition-all duration-300">
      What kind of vulnerabilities do we test?
    </p>
    <p
      class="text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      voluptatibus! Quod, cumque? Quisquam, voluptatibus! Quod, cumque? Quisquam,
      voluptatibus! Quod, cumque?
    </p>
  </div>

  <!-- How We Test Those Vulnerabilities Section -->
  <div class="group mb-6 p-4 rounded-lg">
    <p class="text-5xl font-bold mb-2 group-hover:mb-6 transition-all duration-300">
      How do we test those vulnerabilities?
    </p>
    <p
      class="text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      voluptatibus! Quod, cumque? Quisquam, voluptatibus! Quod, cumque? Quisquam,
      voluptatibus! Quod, cumque?
    </p>
  </div>
</div>
