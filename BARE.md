# pi-bare — 80% token saving fork

Fork of `badlogic/pi-mono`. Default is **read+bash only**.  
*Note: vanilla pi ships with 0 skills; I added 29 in `~/.kilo/skills` for testing — savings above show both vanilla and my setup.*

## What changed (vs 0.84.2)

| Area | Before | After | Saving |
|---|---|---|---|
| system prompt | 1712 chars, ~428 tok, docs + guidelines | `pi agent. CWD:/tmp Tools:read,bash. Be concise.` ~58 chars, 15 tok | -96% |
| my skills* | `~/.kilo/skills` 29 custom (1856 tok in my setup; vanilla pi has 0) | 0 tok unless `PI_BARE_SKILLS=1` | -100% if you have them |
| tools | 4 tools verbose desc (`Read the contents… 360 chars`) | `read:Read file`, `bash:Run bash`, params `path/cmd/old/new` | -55% tool tok |
| default tools | `read,bash,edit,write` | `read,bash` (edit/write opt-in: `pi --tools read,bash,edit,write`) | -500 tok |
| compaction | keep 20000 / reserve 16384 | keep 4096 / reserve 4000 | -12k context |

**Total: vanilla ~2,228 → ~815 (-63%); with my 29 skills ~4,084 → ~815 (-80%)**  
*my skills added later — clarify per your note, not in vanilla pi

## Usage

```bash
# bare (default)
pi -p "fix file.ts"

# with edit/write
pi --tools read,bash,edit,write -p "fix file.ts"

# re-enable skills/context if needed
PI_BARE_SKILLS=1 PI_BARE_CTX=1 pi

# full 7 tools (old behaviour)
pi --tools read,bash,edit,write,grep,find,ls
```

## Install from this fork

```bash
git clone https://github.com/amitashwinibhagat/pi-bare.git
cd pi-bare
npm run build   # requires tsgo (npm install -g @earendil-works/tsgo or use bun)
npm link        # or npm install -g ./packages/coding-agent
```

## Source changes
- `packages/coding-agent/src/core/system-prompt.ts`
- `packages/coding-agent/src/core/tools/index.ts` (coding = read+bash)
- `packages/coding-agent/src/core/skills.ts` (opt-in)
- `packages/coding-agent/src/core/compaction/compaction.ts` + `settings-manager.ts`
- `packages/coding-agent/src/core/tools/{read,bash,edit,write,grep,find,ls}.ts` (short descs)

Revert: `git checkout main -- packages/coding-agent/src/core`
