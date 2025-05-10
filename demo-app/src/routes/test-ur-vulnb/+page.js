import { redirect } from '@sveltejs/kit';

export function load() {
  // Retrieve the user session from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user'));

  // Check if the user is logged in
  if (!user) {
    // Redirect to the authentication page
    throw redirect(302, '/auth-page');
  }

  // If logged in, allow access to the page
  return { session: { user } };
}