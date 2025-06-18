export async function handle({ event, resolve }) {
    const session = event.cookies.get('session');
  
    if (session === 'admin') {
      event.locals.user = {
        id: 4,           // <-- This ID must match the `user_id` in your scans table
        username: 'admin',
        role: 'admin'
      };
    } else {
      event.locals.user = null;
    }
  
    return resolve(event);
  }
  