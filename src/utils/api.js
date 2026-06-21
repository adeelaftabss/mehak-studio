// Centralized fetch wrapper for the Mehak Studio backend API.
// Set VITE_API_URL in a .env file to point at your deployed backend
// (e.g. https://api.mehakstudio.com). Defaults to localhost for local dev.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request(path, { method = "GET", body, isFormData = false } = {}) {
  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      credentials: "include", // sends/receives the httpOnly auth cookie
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });
  } catch (networkErr) {
    throw new ApiError(
      "Couldn't reach the server. Please check your connection and try again.",
      0
    );
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // No JSON body (e.g. 204) — that's fine for some endpoints
  }

  if (!res.ok) {
    throw new ApiError(data?.message || "Something went wrong. Please try again.", res.status, data?.errors);
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body, opts = {}) => request(path, { method: "POST", body, ...opts }),
  patch: (path, body, opts = {}) => request(path, { method: "PATCH", body, ...opts }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export { ApiError };
