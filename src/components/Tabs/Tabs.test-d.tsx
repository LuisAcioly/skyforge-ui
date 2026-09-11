// Type contract for TabsTrigger, checked by `npm run typecheck` (excluded from the build).
import { CodeBracketIcon } from "@heroicons/react/24/outline";

import { TabsTrigger } from "./Tabs";

export const labelled = <TabsTrigger value="code" icon={<CodeBracketIcon />} label="Visão de Código" />;
export const textOnly = <TabsTrigger value="code">Código</TabsTrigger>;
export const textWithIcon = (
  <TabsTrigger value="code" icon={<CodeBracketIcon />}>
    Código
  </TabsTrigger>
);

// @ts-expect-error An icon without children needs a label for its accessible name.
export const unnamedIcon = <TabsTrigger value="code" icon={<CodeBracketIcon />} />;

export const labelAndChildren = (
  // @ts-expect-error label and children are mutually exclusive.
  <TabsTrigger value="code" label="Visão de Código">
    Código
  </TabsTrigger>
);

// @ts-expect-error label is text: it doubles as aria-label and tooltip content.
export const nodeLabel = <TabsTrigger value="code" icon={<CodeBracketIcon />} label={<span>Código</span>} />;
