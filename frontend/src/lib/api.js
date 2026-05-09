const RAW_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").trim();
const BASE_URLS = Array.from(
  new Set([
    RAW_BASE_URL,
    RAW_BASE_URL.replace("localhost", "127.0.0.1"),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ])
);

async function apiRequest(path, options = {}) {
  for (const baseUrl of BASE_URLS) {
    try {
      const res = await fetch(`${baseUrl}${path}`, options);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      return data;
    } catch (error) {
      // If the server responded with an app error, don't try other hosts.
      if (!(error instanceof TypeError)) {
        throw error;
      }
      // keep trying alternate base URLs
    }
  }

  throw new Error(
    `Network error. Could not reach backend. Tried: ${BASE_URLS.join(", ")}`
  );
}

export const authApi = {
  register(payload) {
    return apiRequest("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
  login(payload) {
    return apiRequest("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
  logout(token) {
    return apiRequest("/api/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export const postsApi = {
  list(page = 1) {
    return apiRequest(`/api/posts?page=${page}`);
  },
  listMine(token) {
    return apiRequest("/api/posts/mine", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  random() {
    return apiRequest("/api/posts/random");
  },
  feelingLow(limit = 20) {
    return apiRequest(`/api/posts/feeling-low?limit=${limit}`);
  },
  create(token, payload) {
    const form = new FormData();
    form.append("text", payload.text);
    if (payload.category) form.append("category", payload.category);
    if (payload.link) form.append("link", payload.link);
    if (payload.imageFile) form.append("image", payload.imageFile);
    return apiRequest("/api/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
  },
  remove(token, postId) {
    return apiRequest(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  toggleHeart(token, postId) {
    return apiRequest(`/api/posts/${postId}/heart`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
