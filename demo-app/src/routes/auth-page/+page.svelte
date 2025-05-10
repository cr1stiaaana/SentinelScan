<script>
  import Navbar from "../../Components/Navbar.svelte";
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let errorMessage = '';

  // List of valid users (username and password pairs)
  const users = [
    { username: 'admin', password: 'admin' },
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
  ];

  function login() {
    // Check if the entered credentials match any user in the list
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Simulate storing session data (replace with actual session logic)
      sessionStorage.setItem('user', JSON.stringify(user));
      goto('/test-ur-vulnb'); // Redirect to the protected page
    } else {
      errorMessage = 'Invalid username or password.';
    }
  }
</script>



<Navbar/>

<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-gray-900 text-white font-sans px-4">
  <h1 class="text-4xl font-bold mb-6">Login</h1>

  {#if errorMessage}
    <p class="text-red-500 mb-4">{errorMessage}</p>
  {/if}

  <input
    type="text"
    bind:value={username}
    placeholder="Username"
    class="mb-4 w-full max-w-xs px-4 py-2 text-purple-700 bg-purple-200 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-700"
  />

  <input
    type="password"
    bind:value={password}
    placeholder="Password"
    class="mb-4 w-full max-w-xs px-4 py-2 text-purple-700 bg-purple-200 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-700"
  />

  <button
    class="px-6 py-2 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
    on:click={login}
  >
    Login
  </button>
</div>