/**
 * ULTRA-MINIMAL system prompt - bare-bone token edition (read+bash only)
 */
import { formatSkillsForPrompt, type Skill } from "./skills.ts";

export interface BuildSystemPromptOptions {
  customPrompt?: string;
  selectedTools?: string[];
  toolSnippets?: Record<string, string>;
  promptGuidelines?: string[];
  appendSystemPrompt?: string;
  cwd: string;
  contextFiles?: Array<{ path: string; content: string }>;
  skills?: Skill[];
}

export function buildSystemPrompt(options: BuildSystemPromptOptions): string {
  const { customPrompt, selectedTools, toolSnippets, cwd, contextFiles: providedContextFiles, skills: providedSkills, appendSystemPrompt } = options;
  const promptCwd = cwd.replace(/\\/g, "/");
  const appendSection = appendSystemPrompt ? `\n${appendSystemPrompt}` : "";
  if (customPrompt) {
    let prompt = customPrompt + appendSection;
    const ctx = providedContextFiles ?? [];
    if (process.env.PI_BARE_CTX === "1" && ctx.length > 0) {
      prompt += "\n<ctx>\n";
      for (const { path: pr, content } of ctx) prompt += `${pr}:${content.slice(0,800)}\n`;
      prompt += "</ctx>";
    }
    if (process.env.PI_BARE_SKILLS === "1" && providedSkills?.length) {
      const t = formatSkillsForPrompt(providedSkills);
      if (t) prompt += t;
    }
    prompt += `\nCWD:${promptCwd}`;
    return prompt;
  }
  const tools = selectedTools || ["read", "bash"];
  const visibleTools = tools.filter((n) => !!toolSnippets?.[n]);
  const toolsList = visibleTools.length > 0 ? visibleTools.join(",") : "none";
  let prompt = `pi agent. CWD:${promptCwd} Tools:${toolsList}. Be concise.${appendSection}`;
  if (process.env.PI_BARE_SKILLS === "1" && providedSkills?.length) {
    const t = formatSkillsForPrompt(providedSkills);
    if (t) prompt += t;
  }
  const ctx = providedContextFiles ?? [];
  if (process.env.PI_BARE_CTX === "1" && ctx.length > 0) {
    prompt += "\n<ctx>\n";
    for (const { path: pr, content } of ctx) prompt += `${pr}:${content.slice(0,800)}\n`;
    prompt += "</ctx>";
  }
  return prompt;
}
