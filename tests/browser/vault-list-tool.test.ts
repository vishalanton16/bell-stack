import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import vaultList from "../../agent/tools/vault_list_logins";

const mocks = vi.hoisted(() => ({ nativeList: vi.fn() }));
vi.mock("../../server/browser/vault/native.js", () => ({ nativeVault: { list: mocks.nativeList } }));

describe("configured vault discovery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("BELL_VAULT_MASTER_KEY", "");
    mocks.nativeList.mockResolvedValue([{ provider: "native", itemId: "local-item" }]);
  });
  afterEach(() => vi.unstubAllEnvs());

  it("does not contact an unconfigured native vault", async () => {
    expect(await vaultList.execute({}, { session: { auth: { current: { authenticator: "http-basic" } } } } as never)).toEqual({ items: [] });
    expect(mocks.nativeList).not.toHaveBeenCalled();
  });

  it("discovers native logins when a master key is configured", async () => {
    vi.stubEnv("BELL_VAULT_MASTER_KEY", "fixture-key");
    expect(await vaultList.execute({}, { session: { auth: { current: { authenticator: "http-basic" } } } } as never)).toEqual({
      items: [{ provider: "native", itemId: "local-item" }],
    });
  });
});

it("does not expose the operator's vault to an iMessage sender", async () => {
  mocks.nativeList.mockClear();
  await expect(vaultList.execute({}, { session: { auth: { current: { authenticator: "linq-message" } } } } as never)).rejects.toThrow("Shared operator vaults are not available over iMessage.");
  expect(mocks.nativeList).not.toHaveBeenCalled();
});
