const BASE_URL = import.meta.env.DEV
  ? "http://localhost:8000/api/v1"
  : "/api/v1";

const apiClient = {
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    const headers = options.body instanceof FormData 
      ? {} 
      : { "Content-Type": "application/json", ...options.headers };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const res = await fetch(url, {
      headers,
      credentials: "include",
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `HTTP ${res.status}`);
    }
    return data.data || data;
  },

  get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return this.request(url);
  },

  post(endpoint, body) {
    const isFormData = body instanceof FormData;
    return this.request(endpoint, { 
      method: "POST", 
      body: isFormData ? body : JSON.stringify(body) 
    });
  },

  patch(endpoint, body) {
    const isFormData = body instanceof FormData;
    return this.request(endpoint, { 
      method: "PATCH", 
      body: isFormData ? body : JSON.stringify(body) 
    });
  },

  put(endpoint, body) {
    const isFormData = body instanceof FormData;
    return this.request(endpoint, { 
      method: "PUT", 
      body: isFormData ? body : JSON.stringify(body) 
    });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
};

export default apiClient;