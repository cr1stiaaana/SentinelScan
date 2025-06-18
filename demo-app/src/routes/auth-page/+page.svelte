<script>
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let errorMessage = '';

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

  async function handleLogin() {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        // Properly store the user session
        sessionStorage.setItem('user', JSON.stringify({
          username: data.user.username,
          isAdmin: data.user.username === 'admin'
        }));
        goto('/user-page');
      } else {
        error = data.error || 'Login failed';
      }
    } catch (err) {
      console.error('Login error:', err);
      error = 'Login failed. Please try again.';
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
