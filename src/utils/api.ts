const BASE_URL = import.meta.env.VITE_BASE_URL;

export class ApiError extends Error {
  errors?: Array<{ field: string; message: string }>;
  statusCode?: number;
  constructor(
    message: string,
    errors?: Array<{ field: string; message: string }>,
    statusCode?: number
  ) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export const api = {
  async post(endpoint: string, data: unknown) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        errorData.errors,
        response.status
      );
    }

    return response.json();
  },

  async get(endpoint: string) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        errorData.errors,
        response.status
      );
    }

    return response.json();
  },
};
