import { useState, useEffect, useCallback } from "react";
import { api, ApiError } from "../../utils/api";

// Fetches `path` on mount and exposes { data, loading, error, refetch }.
// `extract` pulls the relevant array/object out of the response payload
// (e.g. (res) => res.users).
export function useAdminFetch(path, extract = (res) => res) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(() => {
    setLoading(true);
    setError("");
    api
      .get(path)
      .then((res) => setData(extract(res)))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load data."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, setData };
}
