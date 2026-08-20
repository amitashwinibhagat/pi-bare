# pi-bare — leaner fork (fewer prompt tokens)

Fork of `badlogic/pi-mono`. Default is **read+bash only**.

*Note: vanilla pi ships with 0 skills. My `~/.pi/agent/settings.json` lists 29 `~/.kilo/skills` paths, but files are not present, so 0 injected currently.*

## What changed (vs 0.84.2, est. chars/4)

| Area | Before | After | Notes |
|---|---|---|---|
| system prompt | ~1,712 chars (~428 tok*) | `pi agent. CWD:/tmp Tools:read,bash. Be concise.` ~47 chars (~12 tok*) | Smaller prompt |
| custom skills | if you add N skills, each ~50-65 tok in old XML | 0 tok unless `PI_BARE_SKILLS=1` | Opt-in |
| tools | 4 tools verbose descriptions | 2 tools terse (`Read file`, `Run bash`, params `path`/`cmd`) | Less schema |
| default tools | `read,bash,edit,write` | `read,bash` (add `edit,write` with `pi --tools read,bash,edit,write`) | Opt-in |
| compaction | keep 20,000 / reserve 16,384 | keep 20,000 / reserve 16,384 | Same as vanilla |

*Token est. using chars/4 heuristic; provider tokenizers differ.

**Total (est.): vanilla ~2,000-2,400 tok → ~1,100-1,300 tok (~-35-45% per turn, ~15-25% per session as history dominates). With N skills, subtract ~50-65 tok per skill that would have been injected. Compaction is now same as vanilla; previous 800-900 tok / -60% included 4096/4000 which summarized history too aggressively.**

## Usage

```bash
# bare (default)
pi -p "fix file.ts"

# with edit/write when you need them
pi --tools read,bash,edit,write -p "fix file.ts"

# re-enable skills/context if you have them
PI_BARE_SKILLS=1 PI_BARE_CTX=1 pi

# full 7 tools (old behaviour)
pi --tools read,bash,edit,write,grep,find,ls
```

## Install from this fork

```bash
git clone https://github.com/amitashwinibhagat/pi-bare.git
cd pi-bare
npm install --ignore-scripts
npm run build:offline   # or npm run build (requires tsgo)
npm link        # or npm install -g ./packages/coding-agent
```

## Source changes
- `packages/coding-agent/src/core/system-prompt.ts` — minimal prompt, opt-in skills/context
- `packages/coding-agent/src/core/tools/index.ts` — coding = read+bash
- `packages/coding-agent/src/core/skills.ts` — opt-in via env
- `packages/coding-agent/src/core/compaction/compaction.ts` + `settings-manager.ts` — vanilla 20000/16384 (reverted from 4096/4000)
- `packages/coding-agent/src/core/tools/{read,bash,edit,write,grep,find,ls}.ts` — short descriptions

Revert: `git checkout upstream/main -- packages/coding-agent/src/core`
