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


  </div>

  