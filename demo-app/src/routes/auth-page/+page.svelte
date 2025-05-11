<script>
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let errorMessage = '';

  // List of valid users (username and password pairs)
  // const users = [
  //   { username: 'admin', password: 'admin' },
  //   { username: 'user1', password: 'pass1' },
  //   { username: 'user2', password: 'pass2' }
  // ];

  async function login() {
  errorMessage = ''; // Reset error

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log("🛠 Login response:", res.status, data);

    if (res.ok && data.success) {
      console.log("✅ Login successful. Redirecting...");
      window.location.href = '/test-ur-vulnb';

    } else {
      errorMessage = data.message || 'Login failed.';
    }
  } catch (err) {
    errorMessage = 'Server error. Please try again later.';
    console.error(err);
  }
}



</script>


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
