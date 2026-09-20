const API_URL = "";

function toggleAuth(showRegister) {
  const loginView = document.getElementById("loginView");
  const registerView = document.getElementById("registerView");
  const loginMsg = document.getElementById("loginMessage");
  const regMsg = document.getElementById("registerMessage");

  if (loginMsg) loginMsg.textContent = "";
  if (regMsg) regMsg.textContent = "";

  if (showRegister) {
    loginView.classList.add("hidden");
    registerView.classList.remove("hidden");
  } else {
    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");
  }
}

async function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const message = document.getElementById("registerMessage");
  const btn = document.getElementById("registerBtn");

  if (!name || !email || !password) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "#ef4444";
    return;
  }

  message.textContent = "Creating account...";
  message.style.color = "#64748b";
  btn.disabled = true;

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message || "Registration failed.";
      message.style.color = "#ef4444";
      btn.disabled = false;
      return;
    }

    message.textContent = "Registration successful! Redirecting to sign in...";
    message.style.color = "#10b981";

    setTimeout(() => {
      document.getElementById("registerForm").reset();
      toggleAuth(false);
      const loginEmail = document.getElementById("email");
      if (loginEmail) loginEmail.value = email;
      const loginMsg = document.getElementById("loginMessage");
      if (loginMsg) {
        loginMsg.textContent = "Account created. You can now sign in.";
        loginMsg.style.color = "#10b981";
      }
      btn.disabled = false;
    }, 1200);
  } catch (error) {
    message.textContent = "Cannot connect to server.";
    message.style.color = "#ef4444";
    btn.disabled = false;
  }
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("loginMessage");
  const btn = document.getElementById("loginBtn");

  if (!email || !password) {
    message.textContent = "Please enter email and password.";
    message.style.color = "#ef4444";
    return;
  }

  message.textContent = "Signing in...";
  message.style.color = "#64748b";
  btn.disabled = true;

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      message.textContent = "Sign in successful!";
      message.style.color = "#10b981";
      window.location.href = "dashboard.html";
    } else {
      message.textContent = data.message || "Invalid email or password.";
      message.style.color = "#ef4444";
      btn.disabled = false;
    }
  } catch (error) {
    message.textContent = "Cannot connect to server.";
    message.style.color = "#ef4444";
    btn.disabled = false;
  }
}