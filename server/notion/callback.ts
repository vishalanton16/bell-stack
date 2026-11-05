import { getNotionOAuth, type NotionOAuth } from "./oauth";

const headers = { "cache-control": "no-store", "referrer-policy": "no-referrer" };

export async function notionCallback(request: Request, service: () => NotionOAuth = getNotionOAuth): Promise<Response> {
  try {
    const params = new URL(request.url).searchParams;
    for (const name of ["state", "code", "error", "iss"]) {
      if (params.getAll(name).length > 1) throw new Error("Duplicate OAuth parameter.");
    }
    const target = await service().forward(Object.fromEntries(params));
    return new Response(null, { status: 303, headers: { ...headers, location: target } });
  } catch {
    return new Response("Notion authorization failed. Return to Bell and request a new connection link.", {
      status: 400, headers: { ...headers, "content-type": "text/plain; charset=utf-8" },
    });
  }
}
