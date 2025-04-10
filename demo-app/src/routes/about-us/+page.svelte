<script>
  import { goto } from "$app/navigation"; // Import the goto function
    import Navbar from "../../Components/Navbar.svelte";

  let isMenuOpen = false;

 </script>

<!-- Top Navigation Bar -->
<!-- Dropdown Menu -->

<Navbar/>
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
