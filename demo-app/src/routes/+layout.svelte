<script>
    export let data;
    import Navbar from '../Components/Navbar.svelte';
  </script>
  
  <Navbar loggedIn={data.loggedIn} user={data.user} />
  
  <slot />
  