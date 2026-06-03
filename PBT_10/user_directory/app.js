let users = [];

const userIdInput = document.getElementById("userId");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const saveBtn = document.getElementById("saveBtn");

const searchInput = document.getElementById("search");

loadUsers();

async function loadUsers() {
  try {
    ui.showLoading();

    users = await api.getUsers();

    ui.renderUsers(users);
  } catch (error) {
    ui.showError(error.message);
  }
}

saveBtn.addEventListener("click", async () => {
  const id = userIdInput.value;

  const user = {
    name: nameInput.value,
    email: emailInput.value,
  };

  try {
    if (id) {
      const updated = await api.updateUser(id, user);

      const index = users.findIndex((u) => u.id == id);

      users[index] = updated;

      ui.showSuccess("User updated");
    } else {
      const newUser = await api.createUser(user);

      newUser.id = Date.now();

      users.unshift(newUser);

      ui.showSuccess("User created");
    }

    ui.renderUsers(users);

    clearForm();
  } catch (error) {
    ui.showError(error.message);
  }
});

async function editUser(id) {
  try {
    const user = await api.getUser(id);

    userIdInput.value = user.id;

    nameInput.value = user.name;

    emailInput.value = user.email;
  } catch (error) {
    ui.showError(error.message);
  }
}

async function removeUser(id) {
  const confirmDelete = confirm("Delete this user?");

  if (!confirmDelete) {
    return;
  }

  try {
    await api.deleteUser(id);

    users = users.filter((user) => user.id !== id);

    ui.renderUsers(users);

    ui.showSuccess("User deleted");
  } catch (error) {
    ui.showError(error.message);
  }
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword),
  );

  ui.renderUsers(filtered);
});

function clearForm() {
  userIdInput.value = "";

  nameInput.value = "";

  emailInput.value = "";
}
