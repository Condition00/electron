import { API_BASE_URL } from '@/lib/api';

const AUTH_TOKEN_KEY = 'electron_auth_token';

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const authorizedFetch = (input: string, init: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
};

export const logout = async (): Promise<void> => {
  try {
    await authorizedFetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
    });
  } finally {
    clearAuthToken();
  }
};
