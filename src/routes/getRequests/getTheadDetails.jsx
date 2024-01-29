import { useState, useEffect } from "react";

const getThreadDetails = (threadID) => {
  const [threadDetails, setThreadDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://parleyserver-production.up.railway.app/parley/thread/messages/${threadID} `, {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setThreadDetails(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { threadDetails, error, loading };
};

export default getThreadDetails;
