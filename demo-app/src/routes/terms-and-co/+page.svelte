<script>
  import { goto } from "$app/navigation"; // Import the goto function
    import Navbar from "../../Components/Navbar.svelte";

  let isMenuOpen = false;


</script>

<!-- Top Navigation Bar -->

<!-- Dropdown Menu -->

<Navbar/>

<div class = "margin-left: 200px;">
    <!-- Main Content -->
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-gray-900 text-white font-sans px-4 pt-16">
    <!-- Terms and Conditions Section -->
    <div class="group mb-6 p-4 rounded-lg">
        <p class="text-5xl font-bold mb-2 group-hover:mb-6 transition-all duration-300">
        Terms and Conditions
        </p>
        <p
        class="text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
        By using this website, you agree to the following terms and conditions. All
        users must comply with the rules and regulations outlined here. Failure to
        adhere to these terms may result in restricted access or other consequences.
        </p>
        <ul
        class="list-disc list-inside opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
        <li>Respect all applicable laws and regulations.</li>
        <li>Do not misuse the platform or its resources.</li>
        <li>Ensure the accuracy of the information you provide.</li>
        </ul>
    </div>

    <!-- Privacy Policy Section -->
    <div class="group mb-6 p-4 rounded-lg">
        <p class="text-5xl font-bold mb-2 group-hover:mb-6 transition-all duration-300">
        Privacy Policy
        </p>
        <p
        class="text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
        We value your privacy and are committed to protecting your personal
        information. Please review our privacy policy to understand how we collect,
        use, and safeguard your data.
        </p>
        <ul
        class="list-disc list-inside opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
        <li>Your data is collected only with your consent.</li>
        <li>We do not share your personal information with third parties.</li>
        <li>You can request to delete your data at any time.</li>
        </ul>
    </div>

    <!-- User Responsibilities Section -->
    <div class="group mb-6 p-4 rounded-lg">
        <p class="text-5xl font-bold mb-2 group-hover:mb-6 transition-all duration-300">
        User Responsibilities
        </p>
        <p
        class="text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
        Users are responsible for ensuring that their actions on this website comply
        with all applicable laws and regulations. Any misuse of the platform may
        result in immediate suspension or termination of access.
        </p>
        <ul
        class="list-disc list-inside opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
        <li>Do not engage in illegal activities on the platform.</li>
        <li>Report any suspicious or harmful behavior.</li>
        <li>Maintain the confidentiality of your account credentials.</li>
        </ul>
    </div>
    </div>
</div>