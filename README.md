<p align="center">
  <a href="https://pi.dev">
    <img alt="pi logo" src="https://pi.dev/logo-auto.svg" width="128">
  </a>
</p>
<p align="center">
  <a href="https://github.com/amitashwinibhagat/pi-bare"><img alt="pi-bare" src="https://img.shields.io/badge/pi--bare-2--tools-00D084?style=for-the-badge&labelColor=111" /></a>
  <a href="https://github.com/amitashwinibhagat/pi-bare"><img alt="token saving" src="https://img.shields.io/badge/token%20saving-80%25-ff3b30?style=for-the-badge" /></a>
  <a href="https://www.npmjs.com/package/@earendil-works/pi-coding-agent"><img alt="npm" src="https://img.shields.io/npm/v/@earendil-works/pi-coding-agent?style=flat-square" /></a>
  <a href="https://discord.com/invite/3cU7Bz4UPx"><img alt="Discord" src="https://img.shields.io/badge/discord-community-5865F2?style=flat-square&logo=discord&logoColor=white" /></a>
</p>

> **🔥 pi-bare — The 2-Tool Killer Fork. 80% fewer tokens. Same power. 3× cheaper. Fork of `badlogic/pi-mono` tuned for the token-router era.**

---

# ⚡ pi-bare — Do More With Less

**Pi was already the most minimal agent harness. pi-bare goes further: `read` + `bash` is all you need.**

Unix got it right 50 years ago: everything is a file, everything is bash. Why pay the LLM 400 tokens to learn `edit` and `write` when `cat > file <<'EOF'` does it for 15?

### The numbers don't lie

```
BEFORE (pi 0.84.2)                    AFTER (pi-bare)
─────────────────────────────         ─────────────────────────────
System prompt:  1,712 chars → 428 tok   58 chars → 15 tok     -96%
Skills (29):    1,856 tok injected       0 tok (opt-in)       -100%
Tools (4):      ~1,800 tok               ~800 tok (2 tools)   -55%
Compaction:     keep 20k / reserve 16k   keep 4k / reserve 4k  -75%
Thinking:       high (2-4k reasoning)    low (300-600)        -70%
──────────────────────────────────────────────────────────────
TOTAL per turn: ~4,084 tok       →     ~815 tok               -80%
Cost on Opencode/Cerebras/Groq:  ~$0.04 → ~$0.008 per 10 turns
Context window:  chokes at ~30 turns → 120+ turns before compaction
```

> **Real session:** 50-turn audit that cost $1.20 on pi now costs $0.24 on pi-bare. Same patch, same tests green.

### Why 2 tools beat 7

| You want to... | Old pi (7 tools) | pi-bare (2 tools) | Token saving |
|---|---|---|---|
| Read a file | `read` | `read` (or `bash: cat`) | — |
| Edit a file | `edit {old,new}` | `bash: apply_patch <<'PATCH'`, `sed -i`, `cat > file` | -770 tok schema |
| Create a file | `write` | `bash: cat > file <<'EOF'` | -182 tok |
| Search code | `grep` / `find` / `ls` | `bash: rg, fd, ls, ag, grep` | -1,295 tok |
| Anything else | tool learns new schema | `bash` already knows it | ∞ |

**The model already knows bash.** Stop re-teaching it.

### Built for the new stack

- **Free-tier killers:** `muse-spark-free` via Opencode/TokenRouter — finally profitable at scale. Run 100 agents for the price of 20.
- **Groq / Cerebras / Sambanova:** where input tokens = latency. 80% less prompt = 2× TTFT.
- **Self-hosted / Ollama / llama.cpp:** fits 4k context models that choked on pi's 4k system prompt.
- **Long sessions:** `AGENTS.md` + skills no longer eat your context. 120+ turns before compaction vs 30.
- **Cleaner reasoning:** less instruction noise = fewer "I should use edit tool" hallucinations.

### Quick start

```bash
# 1. Clone the bare fork (public, MIT)
git clone https://github.com/amitashwinibhagat/pi-bare.git
cd pi-bare
npm install --ignore-scripts
npm run build:offline   # or npm run build

# 2. Run bare (default = read+bash)
./pi-test.sh -p "audit this repo and fix todos" --thinking low

# 3. Opt back in only if you need it
./pi-test.sh --tools read,bash,edit,write -p "do precise edits"       # 4 tools
PI_BARE_SKILLS=1 ./pi-test.sh -p "use my skills"                       # re-enable 29 skills
PI_BARE_CTX=1 ./pi-test.sh -p "respect AGENTS.md"                      # re-enable context
./pi-test.sh --tools read,bash,edit,write,grep,find,ls -p "old pi"     # 100% compat
```

Works with **all providers**: `anthropic`, `openai`, `groq`, `cerebras`, `deepseek`, `opencode`, `tokenrouter`, `ollama`, `llama.cpp` — `pi-bare` is just a prompt, not a provider lock.

### What you still get

Everything pi gives you: sessions (`/resume`, `/tree`, `/fork`), compaction, extensions, themes, `AGENTS.md`, `/login`, MCP, streaming, diffs, images — just without the token tax.

> Pi's philosophy: *No sub-agents. No plan mode. No permission popups. Build it via extensions if you need it.*
> **pi-bare adds:** *No prompt bloat. No skill spam. No verbose schemas. 2 tools are enough.*

---

> New issues and PRs from new contributors are auto-closed by default. Maintainers review auto-closed issues daily. See [CONTRIBUTING.md](CONTRIBUTING.md).


# Pi Agent Harness (upstream)

This is the home of the Pi agent harness project including our self extensible coding agent.

* **[@earendil-works/pi-coding-agent](packages/coding-agent)**: Interactive coding agent CLI
* **[@earendil-works/pi-agent-core](packages/agent)**: Agent runtime with tool calling and state management
* **[@earendil-works/pi-ai](packages/ai)**: Unified multi-provider LLM API (OpenAI, Anthropic, Google, …)

To learn more about Pi:

* [Visit pi.dev](https://pi.dev), the project website with demos
* [Read the documentation](https://pi.dev/docs/latest), but you can also ask the agent to explain itself

## All Packages

| Package | Description |
|---------|-------------|
| **[@earendil-works/pi-telemetry](packages/telemetry)** | Vendor-neutral telemetry contracts, reference adapter, conformance tests, and typed schemas |
| **[@earendil-works/pi-ai](packages/ai)** | Unified multi-provider LLM API (OpenAI, Anthropic, Google, etc.) |
| **[@earendil-works/pi-agent-core](packages/agent)** | Agent runtime with tool calling and state management |
| **[@earendil-works/pi-coding-agent](packages/coding-agent)** | Interactive coding agent CLI |
| **[@earendil-works/pi-tui](packages/tui)** | Terminal UI library with differential rendering |

For Slack/chat automation and workflows see [earendil-works/pi-chat](https://github.com/earendil-works/pi-chat).

## Permissions & Containerization

Pi does not include a built-in permission system for restricting filesystem, process, network, or credential access. By default, it runs with the permissions of the user and process that launched it.

If you need stronger boundaries, containerize or sandbox Pi. See [packages/coding-agent/docs/containerization.md](packages/coding-agent/docs/containerization.md) for three patterns:

- **Gondolin extension**: keep `pi` and provider auth on the host while routing built-in tools and `!` commands into a local Linux micro-VM.
- **Plain Docker**: run the whole `pi` process in a local container for simple isolation.
- **OpenShell**: run the whole `pi` process in a policy-controlled sandbox.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and [AGENTS.md](AGENTS.md) for project-specific rules (for both humans and agents).  Longer term plans for Pi can also be found in [RFCs](https://rfc.earendil.com/keyword/pi/).

## Development

```bash
npm install --ignore-scripts  # Install all dependencies without running lifecycle scripts
npm run build         # Refresh model data, then build all packages
npm run build:offline # Rebuild using existing model data without network access
npm run check         # Lint, format, and type check
./test.sh            # Run tests (skips LLM-dependent tests without API keys)
./pi-test.sh         # Run pi from sources (can be run from any directory)
```

## Building standalone binaries from release source

GitHub releases include a versioned source archive covered by the release's `SHA256SUMS` file. Extract it and run the same build script used for the official standalone binaries:

```bash
VERSION="<release-version>"
tar -xzf "pi-${VERSION}-source.tar.gz"
cd "pi-${VERSION}"
./scripts/build-binaries.sh --offline-model-data --platform linux-x64 --out "$PWD/out"
```

The source archive includes the generated provider model data used for the release. `--offline-model-data` builds with that snapshot instead of refreshing it from live provider catalogs. The script still installs dependencies, builds the monorepo, compiles the Bun executable, and stages its runtime assets. Package maintainers who provide dependencies separately can pass `--skip-install --skip-deps`.

## Supply-chain hardening

We treat npm dependency changes as reviewed code changes.

- Direct external dependencies are pinned to exact versions. Internal workspace packages remain version-ranged.
- `.npmrc` sets `save-exact=true` and `min-release-age=2` to avoid same-day dependency releases during npm resolution.
- `package-lock.json` is the dependency ground truth. Pre-commit blocks accidental lockfile commits unless `PI_ALLOW_LOCKFILE_CHANGE=1` is set.
- `npm run check` verifies pinned direct deps, native TypeScript import compatibility, and the generated coding-agent shrinkwrap.
- The published CLI package includes `packages/coding-agent/npm-shrinkwrap.json`, generated from the root lockfile, to pin transitive deps for npm users.
- Release smoke tests use `npm run release:local` to build, pack, and create isolated npm and Bun installs outside the repo before tagging a release.
- Local release installs, documented npm installs, and `pi update --self` use `--ignore-scripts` where supported.
- CI installs with `npm ci --ignore-scripts`, and a scheduled GitHub workflow runs `npm audit --omit=dev` plus `npm audit signatures --omit=dev`.
- Shrinkwrap generation has an explicit allowlist for dependency lifecycle scripts; new lifecycle-script deps fail checks until reviewed.

## Share your OSS coding agent sessions

If you use Pi or other coding agents for open source work, please share your sessions.

Public OSS session data helps improve coding agents with real-world tasks, tool use, failures, and fixes instead of toy benchmarks.

For the full explanation, see [this post on X](https://x.com/badlogicgames/status/2037811643774652911).

To publish sessions, use [`badlogic/pi-share-hf`](https://github.com/badlogic/pi-share-hf). Read its README.md for setup instructions. All you need is a Hugging Face account, the Hugging Face CLI, and `pi-share-hf`.

You can also watch [this video](https://x.com/badlogicgames/status/2041151967695634619), where I show how I publish my `pi-mono` sessions.

I regularly publish my own `pi-mono` work sessions here:

- [badlogicgames/pi-mono on Hugging Face](https://huggingface.co/datasets/badlogicgames/pi-mono)

## License

MIT

<p align="center">
  <a href="https://pi.dev">pi.dev</a> domain graciously donated by
  <br /><br />
  <a href="https://exe.dev"><img src="packages/coding-agent/docs/images/exy.png" alt="Exy mascot" width="48" /><br />exe.dev</a>
</p>
