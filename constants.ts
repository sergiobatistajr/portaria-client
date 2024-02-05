export const apiConstants = {
  apiUrl: "http://localhost:3000",
  endpoints: {
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },
} as const;
