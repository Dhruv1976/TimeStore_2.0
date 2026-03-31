import { useState } from 'react';

export function useAsyncOperation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeAsync = async (asyncFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      return result;
    } catch (err) {
      setError(err.message || "Operation failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeAsync };
}