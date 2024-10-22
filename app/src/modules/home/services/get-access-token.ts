import { ServiceOptions } from "@/types/ServiceOptions";

interface Response {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export async function getAccessToken({
  accessToken,
}: ServiceOptions): Promise<Response> {
  URL;
  const response = await fetch(`https://oauth.fatsecret.com/connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "basic",
      client_id: "9aa65143c2254ec88a27949f42388206",
      client_secret: "fe4df7f107794622ae75a2684cdbf99a",
    }).toString(),
  });

  return (await response.json()) as Promise<Response>;
}
