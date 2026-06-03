const ui = {
  renderUsers(users) {
    const container = document.getElementById("userList");

    container.innerHTML = "";

    users.forEach((user) => {
      container.innerHTML += `
                <div class="card">

                    <h3>${user.name}</h3>

                    <p>${user.email}</p>

                    <button
                        onclick="editUser(${user.id})"
                    >
                        Edit
                    </button>

                    <button
                        onclick="removeUser(${user.id})"
                    >
                        Delete
                    </button>

                </div>
            `;
    });
  },

  showLoading() {
    const container = document.getElementById("userList");

    container.innerHTML = "";

    for (let i = 0; i < 6; i++) {
      container.innerHTML += `
                <div class="skeleton"></div>
            `;
    }
  },

  hideLoading() {},

  showError(message) {
    document.getElementById("toast").textContent = "❌ " + message;
  },

  showSuccess(message) {
    document.getElementById("toast").textContent = "✅ " + message;
  },
};
