import { baseUrl } from "./constants";

const refreshToken = async () => {
  return await fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async (
  url: string,
  options: RequestInit | undefined
) => {
  const res = await fetch(url, options);

  if (res.ok) {
    return await res.json();
  }

  const json = await res.json();

  if (json.message === "jwt expired") {
    const refreshRes = await refreshToken();
    const json = await refreshRes.json();

    if (!json.success) {
      return json;
    }

    localStorage.setItem("accessToken", json.accessToken);
    localStorage.setItem("refreshToken", json.refreshToken);

    let opts = options || { method: "GET", headers: {} };

    opts.headers = { ...opts.headers, Authorization: json.accessToken };

    const res = await fetch(url, opts);
    return await res.json();
  } else {
    return json;
  }
};
