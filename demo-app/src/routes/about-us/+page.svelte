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
      We are a small team of passionate people who are trying their best to takle an important problem 
      in the world of cybersecurity. We are trying to implement an easy-to-use, all-in-one tool that tests
      whether or not your machine is vulnerable to a set of known threats, using a collection of open-source software,
      so that the whole process is transparent. This tool is still in alpha, so please bear with us.
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
      This tool is specialized in testing for vulnerabilities related to the network layer.
      We are trying to implement a set of tests that will cover the most common vulnerabilities in this layer,
      including: open ports, misconfigured services, outdated software, and potential security risks. 

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
      Using Nmap, duhh! We are using Nmap to scan the target machine for open ports and services,
      and then we are using a set of scripts to test those services for known vulnerabilities.
      We are also using it to test for misconfigured services and outdated software.
      Later implementation of other open-source programs will be added to this tool, as we develop it further.
    </p>
  </div>
</div>
