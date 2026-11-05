# BELL

<p align="center"> <img width="128" height="128" alt="BELL" src="https://github.com/user-attachments/assets/f4c9363d-2ab0-4205-a3c7-7d7ad61ec6c6"/></p>

[BELL](https://www.browserbase.com/blog/bell-personal-assistant-stack) is a reference architecture and sample app for running your own personal assistant. It combines browser automation, messaging, and personal memory.

- Browserbase: Browser + Stagehand
- Eve by Vercel: Agent Framework
- Parallel: Public Web Research
- Linq: Messaging Infrastruture
- Notion: Personal memory, notes, and activity history


## Run locally

Requires Node.js 24, pnpm 10.33.4, a Vercel AI Gateway key, and a Browserbase API key.

```sh
git clone https://github.com/browserbase/bell-stack.git
cd bell-stack
pnpm install --frozen-lockfile
cp .env.example .env
```

Set `AI_GATEWAY_API_KEY` and `BROWSERBASE_API_KEY` in `.env`. Eve routes the model through Vercel AI Gateway; on Vercel, project OIDC can replace the gateway key. For ordinary browsing, set `BELL_DEMO_URL` to your target website. 
Set `PARALLEL_API_KEY` to enable public-web research. Keep research inputs public; use the browser for authenticated pages and actions.

```sh
pnpm dev
```


## Start here

| Integration | What it does | Guide |
| --- | --- | --- |
| Browserbase + Stagehand | Browser sessions, automation, saved Contexts, and human handoff | [Browser runtime](docs/browser-runtime.md) |
| Eve by Vercel | Agent configuration, tools, conversation state, and channels | [Eve in Bell](docs/repository.md#eve-by-vercel) |
| Notion | Personal context, notes, decisions, and activity history across conversations | [Memory setup](docs/notion.md) |
| Parallel | Public-web research and persistent watches with configurable frequency | Set `PARALLEL_API_KEY` in `.env`; [watch setup](docs/monitors.md) |
| Linq | iMessage and SMS through a signed webhook and sender allowlist | [Messaging setup](docs/linq.md) |


See the [repository layout and implementation map](docs/repository.md) to extend Bell.



## Development

```sh
pnpm check
```

Runs tests, type checking, lint, and the production build. [Live provider checks](docs/provider-tests.md) are opt-in.

Bell is a sample app for one trusted operator. Before deploying, configure application authentication and durable storage using the [browser runtime guide](docs/browser-runtime.md).


## License

[MIT](LICENSE).
