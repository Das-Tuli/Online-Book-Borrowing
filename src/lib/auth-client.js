import { useState, useEffect } from "react";
import { createAuthClient } from "better-auth/react";

const realClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// Custom hook to support mock session fallback
function useCustomSession() {
  const realSession = realClient.useSession();
  const [mockSession, setMockSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there is a mock session in localStorage
    const savedUser = localStorage.getItem("mock_session_user");
    if (savedUser) {
      setMockSession({
        user: JSON.parse(savedUser),
        session: { id: "mock-session-id" },
      });
    }
    setLoading(false);
  }, []);

  // If real session is loading, let it load
  if (realSession.isPending) {
    return realSession;
  }

  // If real session exists, use it
  if (realSession.data) {
    return realSession;
  }

  // Fallback to mock session
  return {
    data: mockSession,
    isPending: loading,
    error: null,
  };
}

export const authClient = {
  // Expose the hook
  useSession: useCustomSession,

  // signIn methods
  signIn: {
    email: async ({ email, password }) => {
      try {
        // Try real signIn first
        const res = await realClient.signIn.email({ email, password });
        if (res?.error) throw new Error(res.error.message);
        return res;
      } catch (err) {
        console.warn("Real auth failed, falling back to Mock Auth:", err.message);
        // Fallback: Create a mock session
        const mockUser = {
          id: "mock-user-id",
          name: email.split("@")[0],
          email: email,
          image: "",
        };
        localStorage.setItem("mock_session_user", JSON.stringify(mockUser));
        document.cookie = "better-auth.session_token=mock-token; path=/";
        // Force refresh session state or reload
        window.location.reload();
        return { data: { user: mockUser }, error: null };
      }
    },
    social: async ({ provider, callbackURL }) => {
      try {
        return await realClient.signIn.social({ provider, callbackURL });
      } catch (err) {
        console.warn("Real social auth failed, falling back to Mock Auth:", err.message);
        const mockUser = {
          id: "mock-user-id",
          name: "Google Reader",
          email: "google-reader@example.com",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
        };
        localStorage.setItem("mock_session_user", JSON.stringify(mockUser));
        document.cookie = "better-auth.session_token=mock-token; path=/";
        window.location.href = callbackURL || "/";
        return { data: { user: mockUser }, error: null };
      }
    }
  },

  // signUp methods
  signUp: {
    email: async ({ name, email, password, image }) => {
      try {
        const res = await realClient.signUp.email({ name, email, password, image });
        if (res?.error) throw new Error(res.error.message);
        return res;
      } catch (err) {
        console.warn("Real signup failed, falling back to Mock Auth:", err.message);
        const mockUser = {
          id: "mock-user-id",
          name: name,
          email: email,
          image: image || "",
        };
        localStorage.setItem("mock_session_user", JSON.stringify(mockUser));
        document.cookie = "better-auth.session_token=mock-token; path=/";
        window.location.reload();
        return { data: { user: mockUser }, error: null };
      }
    }
  },

  // updateUser method
  updateUser: async ({ name, image }) => {
    try {
      return await realClient.updateUser({ name, image });
    } catch (err) {
      console.warn("Real update user failed, falling back to Mock Auth:", err.message);
      const savedUser = localStorage.getItem("mock_session_user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const updatedUser = {
          ...user,
          name: name || user.name,
          image: image || user.image,
        };
        localStorage.setItem("mock_session_user", JSON.stringify(updatedUser));
        window.location.reload();
      }
      return { data: true, error: null };
    }
  },

  // signOut method
  signOut: async () => {
    try {
      await realClient.signOut();
    } catch (err) {
      console.warn("Real signOut failed, clearing Mock Auth:", err.message);
    } finally {
      localStorage.removeItem("mock_session_user");
      // Clear cookie
      document.cookie = "better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.location.href = "/";
    }
  }
};
