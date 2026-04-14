export async function registerService(payload) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  console.log("registerService status:", res.status);
  console.log("registerService data:", data);

  if (!res.ok) {
    throw new Error(data?.message || "Registration failed");
  }

  return data;
}

export async function loginService(payload) {
  console.log("login payload sent to backend:", payload);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  console.log("loginService status:", res.status);
  console.log("loginService data:", data);

  if (!res.ok) {
    throw new Error(data?.message || "Invalid credentials");
  }

  return data;
}