import { handleAuth } from '@auth0/nextjs-auth0';

// this creates routes:
// /api/auth/login - the route used to perform login with Auth0
// /api/auth/logout - the route used to log the user out
// /api/auth/callback - the router Auth0 will redirect the user to after a successful login
// /api/auth/me - the route to fetch user profile from

export const GET = handleAuth();
