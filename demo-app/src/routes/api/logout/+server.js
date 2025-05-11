import { json } from '@sveltejs/kit';

export function POST({ cookies }) {
  // Delete the cookie (must match path used when setting it)
  cookies.delete('user', { path: '/' });

  // Return JSON response
  return json({ success: true });
}

  