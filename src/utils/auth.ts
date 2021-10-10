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

export const fetchWithRefresh = async (url: string, options: any) => {
  const res = await fetch(url, options);

  if (res.ok) {
    return res.json();
  }

  const json = await res.json();

  if (json.message === "jwt expired") {
    const refreshRes = await refreshToken();
    const json = await refreshRes.json();

    // @ts-ignore
    if (!json.success) {
      return json;
    }

    // @ts-ignore
    localStorage.setItem("accessToken", json.accessToken);
    // @ts-ignore
    localStorage.setItem("refreshToken", json.refreshToken);

    // @ts-ignore
    options.headers.Authorization = json.accessToken;

    const res = await fetch(url, options);
    return res.json();
  } else {
    return json;
  }
};
