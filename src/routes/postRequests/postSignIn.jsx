import { useState, useEffect, useCallback } from "react";

const usePostSignIn = () => {
  const [signIn, setSignIn] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptLogin = useCallback((username, password) => {
    fetch(`https://parleyserver-production.up.railway.app/parley/user/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setSignIn(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { signIn, error, loading, attemptLogin };
};

export default usePostSignIn;
