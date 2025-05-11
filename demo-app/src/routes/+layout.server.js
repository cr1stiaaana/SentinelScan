/** @type {import('./$types').LayoutLoad} */

export function load({ cookies }) {
  const user = cookies.get('user');

  return {
    loggedIn: Boolean(user),
    user: user || ''
  };
}