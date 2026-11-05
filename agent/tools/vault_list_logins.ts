import { defineTool, toolOutput } from "eve/tools";
import { z } from "zod";

import { nativeVault } from "../../server/browser/vault/native.js";

export default defineTool({
  description:
    "List safe login metadata and opaque item IDs from the native vault. No secret values are returned. Choose only an item whose allowedHosts contains the current page host.",
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    if (ctx.session.auth?.current?.authenticator === "linq-message") throw new Error("Shared operator vaults are not available over iMessage.");
    const items = [];
    if (process.env.BELL_VAULT_MASTER_KEY?.trim())
      items.push(...await nativeVault.list());
    return { items };
  },
  toModelOutput(output) {
    return toolOutput.json(output);
  },
});
