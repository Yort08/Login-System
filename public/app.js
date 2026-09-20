// Since backend and frontend are hosted together on Vercel, API_URL is relative (no CORS!)
const API_URL = "";

async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    document.getElementById("message").innerText = "Please fill in all fields.";
    return;
  }

  document.getElementById("message").innerText = "Creating account...";

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    document.getElementById("message").innerText =
      data.message || "Registration complete";
  } catch (error) {
    document.getElementById("message").innerText = "Cannot connect to server";
  }
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    document.getElementById("message").innerText = "Please enter email and password.";
    return;
  }

  document.getElementById("message").innerText = "Logging in...";

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("message").innerText =
        data.message || "Login failed";
    }
  } catch (error) {
    document.getElementById("message").innerText = "Cannot connect to server";
  }
}