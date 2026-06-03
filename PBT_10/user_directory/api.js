const api = {
  baseURL: "https://jsonplaceholder.typicode.com",

  async getUsers() {
    const response = await fetch(`${this.baseURL}/users`);

    if (!response.ok) {
      throw new Error("Cannot load users");
    }

    return response.json();
  },

  async getUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`);

    if (!response.ok) {
      throw new Error("Cannot load user");
    }

    return response.json();
  },

  async createUser(data) {
    const response = await fetch(`${this.baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  async updateUser(id, data) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  async deleteUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: "DELETE",
    });

    return response;
  },
};
