import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const tokensPath = join(root, "design-tokens.json");
const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));
const primitive = tokens.primitive?.typography;
const semantic = tokens.semantic?.typography;

if (!primitive || !semantic) {
  throw new Error("design-tokens.json must define primitive.typography and semantic.typography");
}

const roleOrder = [
  "display-2xl",
  "display-xl",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "body-md",
  "body-sm",
  "label-lg",
  "label-md",
  "label-sm",
  "label",
  "caption",
  "eyebrow",
  "mono"
];

const referencePattern = /^\{([^}]+)\}$/;

function tokenAt(path) {
  const token = path.split(".").reduce((value, key) => value?.[key], tokens);
  if (!token || !("$value" in token)) throw new Error(`Unknown token reference: {${path}}`);
  return token;
}

function resolveValue(value, seen = new Set()) {
  if (typeof value === "string") {
    const reference = value.match(referencePattern)?.[1];
    if (!reference) return value;
    if (seen.has(reference)) throw new Error(`Circular token reference: {${reference}}`);
    return resolveValue(tokenAt(reference).$value, new Set([...seen, reference]));
  }
  if (Array.isArray(value)) return value.map((entry) => resolveValue(entry, seen));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, resolveValue(entry, seen)]));
  }
  return value;
}

function roleValue(name) {
  const role = semantic[name];
  if (!role || role.$type !== "typography") throw new Error(`Missing typography role: ${name}`);
  const value = resolveValue(role.$value);
  const fields = ["fontFamily", "fontSize", "fontWeight", "letterSpacing", "lineHeight"];
  for (const field of fields) {
    if (value[field] === undefined) throw new Error(`${name} is missing ${field}`);
  }
  return value;
}

function referenceVariable(value) {
  const reference = typeof value === "string" ? value.match(referencePattern)?.[1] : undefined;
  if (!reference?.startsWith("primitive.typography.")) {
    throw new Error(`Semantic typography fields must reference primitives: ${String(value)}`);
  }
  const [, , category, name] = reference.split(".");
  const prefixes = {
    "font-family": "font",
    "font-size": "font-size",
    "font-weight": "font-weight",
    "line-height": "line-height",
    "letter-spacing": "letter-spacing"
  };
  return `--${prefixes[category]}-${name}`;
}

function sourceRoleValue(name) {
  let value = semantic[name].$value;
  const alias = typeof value === "string" ? value.match(referencePattern)?.[1] : undefined;
  if (alias?.startsWith("semantic.typography.")) value = tokenAt(alias).$value;
  return value;
}

function dimension(value) {
  if (!value || typeof value !== "object" || typeof value.value !== "number" || typeof value.unit !== "string") {
    throw new Error(`Invalid dimension: ${JSON.stringify(value)}`);
  }
  return `${value.value}${value.unit}`;
}

function family(value) {
  if (!Array.isArray(value)) throw new Error(`Invalid fontFamily: ${JSON.stringify(value)}`);
  const generic = new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace"]);
  return value.map((name) => generic.has(name) ? name : `"${name}"`).join(", ");
}

for (const role of roleOrder) roleValue(role);

const cssLines = [
  "/* Generated from design-tokens.json by scripts/generate-typography-tokens.mjs. */",
  "@layer base {",
  "  :root {"
];

for (const [name, token] of Object.entries(primitive["font-family"])) cssLines.push(`    --font-${name}: ${family(resolveValue(token.$value))};`);
cssLines.push("");
for (const [name, token] of Object.entries(primitive["font-size"])) cssLines.push(`    --font-size-${name}: ${dimension(resolveValue(token.$value))};`);
cssLines.push("");
for (const [name, token] of Object.entries(primitive["font-weight"])) cssLines.push(`    --font-weight-${name}: ${resolveValue(token.$value)};`);
cssLines.push("");
for (const [name, token] of Object.entries(primitive["line-height"])) cssLines.push(`    --line-height-${name}: ${resolveValue(token.$value)};`);
cssLines.push("");
for (const [name, token] of Object.entries(primitive["letter-spacing"])) cssLines.push(`    --letter-spacing-${name}: ${dimension(resolveValue(token.$value))};`);
cssLines.push("  }", "}", "");
const css = cssLines.join("\n");

const labels = {
  "display-2xl": "Display 2XL",
  "display-xl": "Display XL",
  "heading-lg": "Heading large",
  "heading-md": "Heading medium",
  "heading-sm": "Heading small",
  "body-md": "Body medium",
  "body-sm": "Body small",
  "label-lg": "Label large",
  "label-md": "Label medium",
  "label-sm": "Label small",
  label: "Label",
  caption: "Caption",
  eyebrow: "Eyebrow",
  mono: "Mono"
};

const typographyRuntimeRoles = roleOrder.map((name) => {
  const role = semantic[name];
  const source = sourceRoleValue(name);
  const value = roleValue(name);
  const familyName = source.fontFamily.match(referencePattern)[1].split(".").at(-1);
  const tone = name.startsWith("body-") ? "text-content-secondary" : name === "caption" || name === "eyebrow" ? "text-content-tertiary" : "text-content-primary";
  return {
    token: name,
    label: labels[name],
    fontFamily: familyName,
    fontFamilyValue: `var(--font-${familyName})`,
    fontName: value.fontFamily[0],
    fontSize: dimension(value.fontSize),
    fontSizeValue: `var(${referenceVariable(source.fontSize)})`,
    fontWeight: value.fontWeight,
    fontWeightValue: `var(${referenceVariable(source.fontWeight)})`,
    letterSpacing: dimension(value.letterSpacing),
    letterSpacingValue: `var(${referenceVariable(source.letterSpacing)})`,
    lineHeight: value.lineHeight,
    lineHeightValue: `var(${referenceVariable(source.lineHeight)})`,
    textTransform: name === "eyebrow" ? "uppercase" : "none",
    description: role.$description ?? "",
    className: `font-${familyName} text-${name} ${tone}`
  };
});

const fontFamily = Object.fromEntries(Object.keys(primitive["font-family"]).map((name) => [name, [`var(--font-${name})`]]));
const fontSize = Object.fromEntries(typographyRuntimeRoles.map((role) => [role.token, [
  role.fontSizeValue,
  { lineHeight: role.lineHeightValue, letterSpacing: role.letterSpacingValue, fontWeight: role.fontWeightValue }
]]));
const runtimeJson = `${JSON.stringify(typographyRuntimeRoles, null, 2)}\n`;

const ts = [
  "// Generated from design-tokens.json by scripts/generate-typography-tokens.mjs.",
  `export const skyforgeFontFamily: Record<string, string[]> = ${JSON.stringify(fontFamily, null, 2)};`,
  "",
  `export const skyforgeFontSize: Record<string, [string, { lineHeight: string; letterSpacing: string; fontWeight: string }]> = ${JSON.stringify(fontSize, null, 2)};`,
  "",
  `export const typographyRuntimeRoles = ${JSON.stringify(typographyRuntimeRoles, null, 2)};`,
  ""
].join("\n");

const tableRows = typographyRuntimeRoles.map((role) =>
  `| \`${role.token}\` | ${role.fontName} | \`${role.fontSize}\` | \`${Math.round(role.lineHeight * 100)}%\` | \`${role.fontWeight}\` | \`${role.letterSpacing}\` | ${role.description} |`
);
const table = [
  "<!-- typography-tokens:start -->",
  "<!-- Generated from design-tokens.json. Run npm run generate:tokens. -->",
  "| Role | Font | Size | Line-height | Weight | Tracking | Use |",
  "| --- | --- | --- | --- | --- | --- | --- |",
  ...tableRows,
  "<!-- typography-tokens:end -->"
].join("\n");

const rulesPath = join(root, "DESIGN_SYSTEM_RULES.md");
const currentRules = readFileSync(rulesPath, "utf8");
const markerPattern = /<!-- typography-tokens:start -->[\s\S]*?<!-- typography-tokens:end -->/;
if (!markerPattern.test(currentRules)) throw new Error("DESIGN_SYSTEM_RULES.md is missing typography generation markers");
const rules = currentRules.replace(markerPattern, table);

const outputs = [
  [join(root, "src/generated/typography-tokens.css"), css],
  [join(root, "src/generated/typography-tokens.ts"), ts],
  [join(root, "src/generated/typography-runtime.json"), runtimeJson],
  [rulesPath, rules]
];

let stale = false;
for (const [path, content] of outputs) {
  if (checkOnly) {
    if (!existsSync(path) || readFileSync(path, "utf8") !== content) {
      console.error(`Stale generated typography consumer: ${path}`);
      stale = true;
    }
  } else {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
}

if (stale) process.exitCode = 1;
else console.log(checkOnly ? "Typography consumers are current." : "Generated typography consumers.");
