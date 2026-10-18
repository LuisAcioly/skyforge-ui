# Skyforge UI — Guia de utilização

Guia de referência para quem constrói interfaces com `@luiswagnerab/skyforge-ui`, seja uma pessoa ou um agente de IA. Reúne instalação, fundamentos do design system, convenções da API e a referência completa de cada componente: finalidade, props, padrões e orientações de uso.

Versão documentada: **1.0.0**.

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Instalação e configuração](#2-instalação-e-configuração)
3. [Fundamentos](#3-fundamentos)
4. [Convenções da API](#4-convenções-da-api)
5. [Componentes](#5-componentes)
   - Ações: [Button](#button)
   - Formulários: [FormField](#formfield), [Input](#input), [Textarea](#textarea), [DatePicker](#datepicker), [Checkbox](#checkbox), [Switch](#switch), [RadioGroup e Radio](#radiogroup-e-radio), [Select](#select), [MultiSelect](#multiselect), [AutoComplete](#autocomplete)
   - Navegação: [Tabs](#tabs), [Accordion](#accordion), [Pagination](#pagination)
   - Sobreposições: [Modal](#modal), [DropdownMenu](#dropdownmenu), [Tooltip](#tooltip)
   - Dados: [Table](#table)
   - Feedback: [Alert](#alert), [Progress](#progress), [Skeleton](#skeleton), [Spinner](#spinner)
   - Metadados: [Badge](#badge), [Tag](#tag), [Chip](#chip)
   - Identidade: [Avatar](#avatar)
   - Tema: [ThemeProvider](#themeprovider)
6. [Estados obrigatórios](#6-estados-obrigatórios)
7. [Acessibilidade](#7-acessibilidade)
8. [Conteúdo](#8-conteúdo)
9. [Checklist de entrega](#9-checklist-de-entrega)

---

## 1. Visão geral

Skyforge UI é a biblioteca de componentes React do ecossistema Skyforge, construída com TypeScript, Tailwind CSS, primitivos Radix e Heroicons. A linguagem visual é minimalista, técnica e editorial:

- **Hierarquia por bordas.** Superfícies se separam por borda e contraste tonal; sombra só em camadas flutuantes e nos botões preenchidos.
- **Tokens semânticos.** Cores, espaçamentos, raios e alturas vêm de CSS variables, e os temas claro e escuro funcionam sem recompilar.
- **Acessível por padrão.** Foco visível, teclado e semântica ARIA estão embutidos, e a maioria vem do Radix.

### Ordem de precedência

Quando houver conflito entre fontes, siga esta ordem:

1. `design-tokens.json`
2. `src/styles.css`
3. `DESIGN_SYSTEM_RULES.md`
4. `skyforge-ui.md` (este guia)
5. Código dos componentes em `src/components/*`
6. Stories em `src/components/**/*.stories.tsx`

### Regras de ouro

- Use um componente Skyforge antes de escrever controle HTML próprio.
- Não crie cópias locais de primitivos que já existem.
- Não use cores fixas. Use tokens semânticos como `bg-surface`, `text-content-primary`, `border-border`, `ring-focus` e `text-error-text`.
- Não use preto puro (`#000000`) visível; ele é reservado para overlays com alfa.
- Use apenas Heroicons, com `strokeWidth={1.5}`.
- Os componentes `Label`, `Loading` e `TableCaption` não existem; não os referencie.

---

## 2. Instalação e configuração

### Instalação

```bash
npm install @luiswagnerab/skyforge-ui
```

Dependências peer que a aplicação precisa fornecer:

- `react >= 18.2.0`
- `react-dom >= 18.2.0`

Radix, Heroicons e os demais pacotes vêm como dependências da própria biblioteca.

### Estilos

A maioria dos bundlers aplica o CSS automaticamente a partir do entry do pacote. Se os estilos não aparecerem, importe a folha uma vez no entry da aplicação:

```tsx
import "@luiswagnerab/skyforge-ui/styles.css";
```

Importe os componentes pelo entry principal:

```tsx
import { Button, Input, ThemeProvider } from "@luiswagnerab/skyforge-ui";
```

| Export | Conteúdo |
| --- | --- |
| `@luiswagnerab/skyforge-ui` | Bundle ESM e declarações TypeScript |
| `@luiswagnerab/skyforge-ui/styles.css` | Folha de estilos compilada, com tokens e utilitários |

### Fontes, uso offline e CSP

Bebas Neue e Figtree vêm dentro do pacote, como WOFF2 em `dist/fonts`, acompanhadas das licenças SIL OFL. A folha de estilos não faz nenhuma requisição de rede: não usa CDN, `@import` remoto nem URIs `data:`.

- Funciona offline e em ambientes isolados.
- É compatível com CSP restritiva como `font-src 'self'`, desde que o bundler sirva os assets do pacote pela sua origem. Vite, webpack e Next.js fazem isso ao importar CSS de `node_modules`.
- Não adicione links do Google Fonts para essas famílias; os `@font-face` já estão declarados.

### Tema

Os temas suportados são `light` e `dark`, selecionados pelo atributo `data-theme`.

```tsx
import { ThemeProvider } from "@luiswagnerab/skyforge-ui";

export function App() {
  return (
    <ThemeProvider theme="dark">
      <ProductShell />
    </ThemeProvider>
  );
}
```

> **Portais e tema.** `Modal`, `Tooltip`, `Select`, `DropdownMenu`, `DatePicker`, `AutoComplete` e `MultiSelect` renderizam o conteúdo flutuante via portal em `<body>`, fora do `ThemeProvider`. Para que essas camadas acompanhem o tema escuro, aplique também `data-theme` no elemento `<html>`, por exemplo `document.documentElement.dataset.theme = "dark"`. Use o `ThemeProvider` sozinho apenas para regiões locais que não abrem sobreposições.

### Tooltips

Todo uso de `Tooltip`, incluindo `Tabs` com `iconOnly`, exige um `TooltipProvider` como ancestral. Coloque um no shell da aplicação:

```tsx
<TooltipProvider>
  <App />
</TooltipProvider>
```

---

## 3. Fundamentos

### Cores semânticas

Componentes e telas consomem apenas tokens semânticos. As variáveis guardam canais RGB (`--color-surface: 255 255 255`), e por isso aceitam alfa: `rgb(var(--color-surface) / 0.8)` ou `bg-surface/80`.

| Papel | CSS variable | Utilitário Tailwind |
| --- | --- | --- |
| Canvas | `--color-background` | `bg-background` |
| Superfície | `--color-surface` | `bg-surface` |
| Superfície elevada | `--color-surface-raised` | `bg-surface-raised` |
| Superfície rebaixada | `--color-surface-sunken` | `bg-surface-sunken` |
| Superfície invertida | `--color-surface-inverse` | `bg-surface-inverse` |
| Texto primário / secundário / terciário | `--color-text-primary` / `-secondary` / `-tertiary` | `text-content-primary` / `-secondary` / `-tertiary` |
| Ícones | `--color-icon-primary`, `-secondary`, `-tertiary`, `-accent`, `-disabled` | `text-icon-primary` etc. |
| Ação primária | `--color-primary` | `bg-primary`, `text-primary-foreground` |
| Foco | `--color-focus` | `ring-focus` |
| Link | `--color-link` | `text-link` |
| Hover / pressionado | `--color-hover-surface` / `--color-active-surface` | `bg-hover-surface` / `bg-active-surface` |
| Hover discreto | `--color-hover-subtle` | `bg-hover-subtle` |
| Seleção (acento) | `--color-accent-bg`, `-border`, `-text` | `bg-accent-bg`, `border-accent-border`, `text-accent-text` |
| Campos | `--color-field-bg`, `-bg-filled`, `-border`, `-placeholder` | `bg-field-bg`, `bg-field-bg-filled`, `border-field-border` |
| Feedback | `--color-{success,warning,error,info}-{bg,border,text,icon}` | `bg-success-bg`, `text-error-text` etc. |
| Preenchimento sólido | `--color-{neutral,accent,info,success,warning,error}-solid` + `--color-on-solid` | `bg-success-solid text-on-solid` etc. |
| Desabilitado | `--color-disabled-{bg,border,text}` | `bg-disabled-bg` etc. |
| Editorial | `--color-editorial-{bg,surface,border,text}` | `bg-editorial-bg` etc. |

Não use `text-primary` para texto de conteúdo: `primary` é a cor de ação. O texto usa `text-content-*`.

- **Foco é neutro.** `focus` é a tinta neutra (`neutral.950` no claro, `neutral.50` no escuro), não o teal: o foco lê como estado do controle, nunca como seleção ou link.
- **Teal** fica para link, seleção e estado ativo.
- **`hover-subtle`** existe porque, no tema claro, `hover-surface` e `surface-sunken` coincidem; use-o quando a seleção já é `surface-sunken`.
- **Preenchimentos `*-solid`** são a versão de alta ênfase de cada tom e sempre levam `text-on-solid`. No claro, o texto é branco sobre fills com pelo menos 5:1; no escuro, a rampa vira para os passos `.300` com texto `neutral.950` (pelo menos 7:1).

### Bordas e divisórias

| Papel | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `border` | `neutral.300` | `neutral.400` | Delimita contêineres: cards, painéis, tabelas, popovers. |
| `border-strong` | `neutral.400` | `neutral.300` | Hover, aberto e limites enfatizados; sempre um degrau acima de `border`. |
| `divider` | `neutral.200` | `neutral.800` | Separação discreta dentro de um contêiner: linhas, separadores de menu. |
| `control-border` | `neutral.400` | `neutral.400` | Limite de 3:1 que identifica um controle de formulário. |

Escolha o papel, não o nível de contraste: `border-border` para contêineres e `border-divider` ou `divide-divider` para separações internas. Os dois papéis têm valores distintos nos dois temas.

### Tipografia

Bebas Neue dá hierarquia e personalidade; Figtree é a fonte de leitura, formulários e dados.

| Classe | Fonte | Tamanho | Uso |
| --- | --- | --- | --- |
| `text-display-2xl` | Bebas Neue | 64px | Hero e páginas institucionais |
| `text-display-xl` | Bebas Neue | 48px | Títulos de página e modais de alto impacto |
| `text-heading-lg` | Bebas Neue | 32px | Seções principais |
| `text-heading-md` | Bebas Neue | 24px | Cards, modais e grupos |
| `text-heading-sm` | Bebas Neue | 20px | Subtítulos e entidades |
| `text-body-md` | Figtree | 16px | Texto corrido principal |
| `text-body-sm` | Figtree | 14px | Texto secundário, formulários e listas |
| `text-label-lg` / `-md` / `-sm` | Figtree 600 | 20 / 14 / 12px | Rótulos, botões e abas |
| `text-caption` | Figtree 500 | 12px | Metadados e legendas |
| `text-eyebrow` | Figtree 700 | 12px | Marcadores editoriais em caixa alta |
| `text-mono` | ui-monospace | 13px | Tokens, código e valores técnicos |

Use as famílias com `font-display` e `font-body`. Não fixe famílias de fonte em componentes.

### Espaçamento e raio

- **Espaçamento:** `sf-4`, `sf-8`, `sf-12`, `sf-16`, `sf-24`, `sf-32`, `sf-48`, `sf-64`, `sf-96`, `sf-128` (ex.: `p-sf-16`, `gap-sf-8`).
- **Raio:** `rounded-sf-sm` (4), `-md` (8), `-lg` (12), `-xl` (16), `-2xl` (24), `-full`.
- Em telas operacionais, prefira `12`, `16`, `24` e `32`. Reserve `64`–`128` para superfícies editoriais.

### Alturas de controles, linhas e densidade

| Token | Padrão | `data-density="compact"` | Utilitários | Uso |
| --- | --- | --- | --- | --- |
| `--control-h-sm` | 32px | 32px | `h-control-sm`, `w-control-sm` | Controles compactos e gatilhos quadrados |
| `--control-h-md` | 40px | 32px | `h-control-md` | Controles padrão |
| `--control-h-lg` | 48px | 40px | `h-control-lg` | Controles grandes; superfícies de toque |
| `--row-h-md` | 48px | 40px | `h-row-md` | Linhas padrão |
| `--row-h-sm` | 40px | 32px | `h-row-sm` | Linhas compactas |
| `--row-h-xs` | 30px | 30px | `h-row-xs`, `min-h-row-xs` | Linha densa de nível superior |
| `--row-h-2xs` | 26px | 26px | `h-row-2xs`, `min-h-row-2xs` | Linha densa repetida (árvores, listas de arquivos) |
| `--row-indent` | 12px | 12px | `pl-row-indent` | Indentação por nível |

Regras de densidade:

1. `data-density="compact"` em qualquer ancestral reduz `md` e `sm` um degrau.
2. `xs` e `2xs` são o piso da escala e não encolhem, então a ordem `md > sm > xs > 2xs` vale em qualquer densidade.
3. Densidade altera geometria, nunca paleta.
4. Linhas densas e controles de 32px servem a superfícies desktop com ponteiro. Em toque, use `sm` ou maior.

Exemplo de árvore densa:

```tsx
<div className="h-row-xs flex items-center px-sf-8">src</div>
<div
  className="h-row-2xs flex items-center px-sf-8 hover:bg-hover-surface"
  style={{ paddingInlineStart: "calc(var(--space-8) + 1 * var(--row-indent))" }}
>
  components
</div>
```

### Elevação

| Nível | Utilitário | Uso |
| --- | --- | --- |
| Nenhuma | — | Cards, painéis e grupos padrão: borda e contraste tonal |
| 1 | `shadow-sf-1` | Cards interativos e menus pequenos |
| 2 | `shadow-sf-2` | Popovers e painéis flutuantes |
| Listas | `shadow-sf-popover` | Painéis de `Select`, `MultiSelect` e `DropdownMenu`: sem borda visível, só a sombra; no dark ganha a linha de luz no topo, como o modal |
| 3 | `shadow-sf-3` | Overlays |
| Modal | `shadow-sf-modal` | `ModalContent`: igual a `shadow-sf-3` no claro; no dark, pilha em preto com a linha de luz no topo |

Não use sombras internas (`inset`) nem cards dentro de cards em telas operacionais. A linha de luz do modal e das listas no dark é a única exceção, interna aos componentes.

### Camadas (z-index)

Use `z-sf-base`, `z-sf-sticky`, `z-sf-overlay`, `z-sf-modal`, `z-sf-dropdown`, `z-sf-tooltip` e `z-sf-toast`; nunca um z-index cru. Menus e tooltips ficam acima de modais para que um `Select` aberto dentro de um `Modal` apareça na frente.

### Movimento

- Durações: `duration-sf-fast` (120ms), `duration-sf-normal` (180ms), `duration-sf-slow` (240ms), com curva `ease-sf-standard`.
- Anime apenas `transform` e `opacity`.
- `prefers-reduced-motion` já é respeitado globalmente: animações e shimmer de skeleton são desligados.

### Ícones

- Heroicons Outline (`@heroicons/react/24/outline`) por padrão; Solid só para ênfase e feedback forte.
- Tamanhos permitidos: 16, 20, 24 e 32.
- `strokeWidth={1.5}`. Componentes que recebem ícone por prop aplicam tamanho e traço automaticamente.
- Ícones decorativos levam `aria-hidden="true"`; controles só com ícone precisam de nome acessível.

### Foco

Todo elemento focável tem indicador visível. Nos componentes, o foco é um anel `ring-focus` (neutro) com offset. Em `Button`, são 2px de foco após 2px de separação; em `Tabs`, um halo de 1px da superfície atrás do controle seguido de 2px de foco. A cor dessa separação vem de `--sf-focus-gap` (utilitário `ring-offset-focus-gap`), que você pode definir num contêiner de superfície própria:

```tsx
<div className="bg-surface [--sf-focus-gap:var(--color-surface)]">...</div>
```

---

## 4. Convenções da API

- **Textos visíveis são string, `null` ou `undefined`.** `label`, `helperText`, `errorText`, `statusText`, `title`, conteúdo de tooltip e similares não aceitam objetos nem elementos React, salvo quando a tabela de props indicar `ReactNode`. Passar `null` omite o elemento.
- **Refs e props nativas.** Os componentes encaminham `ref` e repassam as props nativas do elemento ou do primitivo Radix, como `className`, `id`, `aria-*`, `data-*` e handlers.
- **Componentes compostos seguem o Radix.** `Select`, `DropdownMenu`, `Modal`, `Tooltip`, `Tabs`, `Accordion` e `RadioGroup` aceitam os modos controlado (`value`/`onValueChange`, `open`/`onOpenChange`) e não controlado (`defaultValue`, `defaultOpen`). `asChild` repassa o comportamento para o filho em vez de criar um novo elemento.
- **Aliases aceitos.**

| Canônico | Alias aceito | Onde |
| --- | --- | --- |
| `error` | `danger` | `Alert`, `Badge`, `Tag`, `Chip`, `Progress` |
| `danger` | `error` | `Button` |
| `plain` | `ghost` | `Table surface` |
| `default` | `comfortable` | `Table density` |
| `tone` | `variant` | `Progress`, `Spinner` |

- **Vocabulário de validação dos campos.** `Input`, `Textarea`, `Select`, `DatePicker`, `AutoComplete` e `MultiSelect` compartilham:
  - `status`: `"default" | "success" | "warning" | "error"`;
  - `statusText`: mensagem para `success` e `warning`;
  - `errorText`: define estado inválido, aplica estilo de erro, `aria-invalid` e liga a mensagem por `aria-describedby`.

  `errorText`, `status="error"` e `aria-invalid` significam a mesma coisa.
- **Variantes de superfície dos campos.** Os mesmos seis campos aceitam `variant`:
  - `outline` (padrão): fundo `field-bg` com borda `field-border`, que escurece no hover.
  - `filled`: sem borda; o preenchimento `field-bg-filled` sozinho separa o campo, sem mudança no hover. O placeholder usa `content-tertiary` para manter o contraste sobre o preenchimento.
  - `ghost`: transparente, sem a sombra sutil das outras variantes; ganha borda e `surface-raised` no hover.
- **Aparência `solid` × `soft`.** `Alert`, `Badge`, `Tag`, `Chip` e `Tabs` aceitam `appearance`. `solid` (padrão) preenche com o tom (`*-solid` + `on-solid`); `soft` é a superfície tingida mais discreta (`*-bg`, `*-border`, `*-text`). O atributo `data-appearance` reflete o valor no elemento.
- **Cores customizadas.** `customColor` em `Badge` e `Avatar` aceita hex (`#147672`), função RGB (`rgb(20 118 114)`) ou canais crus (`20 118 114`). Valores inválidos caem na cor primária. Valide o contraste nos dois temas. Em `Badge` com `appearance="solid"`, o texto é branco nos dois temas, então a cor precisa de 4.5:1 contra branco.

---

## 5. Componentes

As tabelas listam as props próprias de cada componente. Salvo indicação, cada componente também aceita as props do elemento HTML ou do primitivo Radix correspondente.

### Button

Ações disparadas pelo usuário.

- **Quando usar:** envio de formulários, confirmações e comandos.
- **Quando evitar:** navegação entre páginas (use link) e filtros selecionáveis (use `Chip`).

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "ghost" \| "danger" \| "editorial"` (`"error"` = `danger`) | `"primary"` | Hierarquia visual da ação |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Altura 32 / 40 / 48px |
| `loading` | `boolean` | `false` | Desabilita, preserva a largura e sinaliza `aria-busy` |
| `fullWidth` | `boolean` | `false` | Ocupa toda a largura |
| `leftIcon` / `rightIcon` | `ReactNode` | — | Ícones decorativos; tamanho e traço aplicados automaticamente |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Tipo nativo; o padrão evita submits acidentais |

Herda as props de `<button>`.

| Variante | Aparência |
| --- | --- |
| `primary` | Preenchimento neutro (`primary`) com sombra |
| `secondary` | Só contorno: fundo transparente, borda `control-border` de 1.5px, preenchimento `secondary-hover` no hover |
| `ghost` | Sem borda nem fundo; `hover-surface` no hover |
| `danger` | Preenchimento sólido da família de erro, com sombra; no escuro vira coral claro com texto escuro |
| `editorial` | Superfície linen editorial (`editorial-*`), com sombra |

Só as variantes preenchidas (`primary`, `danger`, `editorial`) têm sombra; `secondary` e `ghost` ficam planas.

```tsx
<Button variant="primary">Publicar</Button>
<Button variant="secondary" loading>Salvando</Button>
<Button variant="danger" leftIcon={<TrashIcon />}>Excluir release</Button>
```

- Rótulos são verbos curtos.
- Use uma única ação `primary` por região; `secondary` e `ghost` para as demais.
- `danger` somente para ações destrutivas.
- `editorial` fica restrito a superfícies editoriais ou premium.
- Botão só com ícone precisa de `aria-label`.

---

### FormField

Invólucro para montar campos customizados com rótulo, ajuda e erro conectados.

- **Quando usar:** um controle que não tem `label`, `helperText` e `errorText` embutidos, ou uma composição de vários elementos.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `label` | `string \| null` | — | Rótulo acima do controle |
| `helperText` | `string \| null` | — | Texto de ajuda |
| `errorText` | `string \| null` | — | Mensagem de erro; torna o campo inválido |
| `optionalText` | `string \| null` | — | Selo ao lado do rótulo (ex.: "Opcional") |
| `required` | `boolean` | `false` | Exibe o asterisco de obrigatório |
| `disabled` | `boolean` | `false` | Aplica o estilo desabilitado ao rótulo |
| `children` | `ReactNode \| (field) => ReactNode` | — | A função recebe `{ id, "aria-describedby", "aria-invalid", invalid }` |

Herda as props de `<div>`.

```tsx
<FormField label="Chave do projeto" helperText="Use um identificador curto e estável.">
  {(field) => <Input {...field} label={null} helperText={null} placeholder="release-vault" />}
</FormField>
```

- Espalhe as props recebidas na função no controle, para ligar rótulo e mensagens.
- Em campos simples, prefira as props embutidas do próprio componente.

---

### Input

Entrada de texto ou número em uma linha.

- **Quando usar:** nomes, identificadores, e-mails, chaves e valores numéricos.
- **Quando evitar:** texto longo (use `Textarea`) e datas (use `DatePicker`).

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `type` | `"text" \| "number"` | `"text"` | Apenas estes dois tipos são suportados |
| `label` | `string \| null` | — | Rótulo acima do campo |
| `helperText` | `string \| null` | — | Texto de ajuda |
| `errorText` | `string \| null` | — | Mensagem de erro; torna o campo inválido |
| `status` | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Estado de validação com ícone |
| `statusText` | `string \| null` | — | Mensagem do estado |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Tratamento da superfície |
| `size` | `"md" \| "lg"` | `"md"` | Altura 40 / 48px |
| `leftIcon` / `rightIcon` | `ReactNode` | — | Ícones internos |
| `loading` | `boolean` | `false` | Desabilita e mostra indicador de atividade |

Herda as props de `<input>`, exceto `size` e `type`.

```tsx
<Input label="Chave do projeto" helperText="Use letras minúsculas e hifens." placeholder="release-vault" />

<Input type="number" label="Limite de tentativas" min={1} max={8} defaultValue={3} />

<Input label="Chave do projeto" errorText="A chave do projeto é obrigatória." />
```

- `type="number"` só para valores realmente numéricos, como quantidades e limites.
- CEP, telefone e códigos continuam `text`.
- O rótulo fica sempre acima; o placeholder não substitui o rótulo.

---

### Textarea

Entrada de texto longo em várias linhas.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `label` | `string \| null` | — | Rótulo |
| `helperText` | `string \| null` | — | Texto de ajuda |
| `errorText` | `string \| null` | — | Mensagem de erro |
| `status` | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Estado de validação |
| `statusText` | `string \| null` | — | Mensagem do estado |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Tratamento da superfície |
| `size` | `"md" \| "lg"` | `"md"` | Escala de tipografia e espaçamento |
| `loading` | `boolean` | `false` | Desabilita e mostra atividade |

Herda as props de `<textarea>`, exceto `size`.

```tsx
<Textarea
  label="Notas da release"
  helperText="Resuma as mudanças de tokens e o risco da revisão."
  placeholder="Aliases de cor atualizados e estados de tabela revisados."
/>
```

---

### DatePicker

Campo de data com calendário.

- **Formato de exibição:** `DD-MM-YYYY`.
- **Anos disponíveis:** dos últimos 100 aos próximos 10.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string` | — | `DD-MM-YYYY`; ISO `YYYY-MM-DD` também é aceito e convertido |
| `onDateChange` | `(value: string) => void` | — | Recebe a data no formato `DD-MM-YYYY` |
| `locale` | `"en" \| "pt-BR"` | `"en"` | Idioma dos rótulos do calendário |
| `label` | `string \| null` | — | Rótulo |
| `helperText` | `string \| null` | — | Texto de ajuda |
| `errorText` | `string \| null` | — | Mensagem de erro |
| `status` / `statusText` | ver convenções | `"default"` | Estado de validação |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Tratamento da superfície |
| `size` | `"md" \| "lg"` | `"md"` | Altura 40 / 48px |

Herda as props de `<input>`, exceto `size` e `type`.

```tsx
<DatePicker
  label="Data da release"
  locale="pt-BR"
  defaultValue="18-05-2026"
  onDateChange={(data) => setData(data)}
/>
```

- Em interfaces em português, use `locale="pt-BR"`.
- Converta para ISO antes de enviar a APIs.

---

### Checkbox

Item booleano ou marcação múltipla.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `checked` / `defaultChecked` | `boolean \| "indeterminate"` | — | Estado (Radix) |
| `onCheckedChange` | `(checked) => void` | — | Mudança de estado |
| `label` | `string \| null` | — | Rótulo clicável ao lado |
| `helperText` | `string \| null` | — | Texto de ajuda |
| `errorText` | `string \| null` | — | Mensagem de erro |
| `size` | `"sm" \| "md"` | `"md"` | Tamanho da caixa |
| `containerClassName` / `labelClassName` | `string` | — | Classes do invólucro e do rótulo |

Herda as props de `Checkbox.Root` do Radix (`disabled`, `required`, `name`, `value`).

```tsx
<Checkbox
  label="Sincronizar tokens antes de publicar"
  helperText="A preferência fica salva no perfil do workspace."
/>
```

- Para marcação múltipla dentro de um grupo, envolva os itens num `fieldset` com `legend`.
- Para liga/desliga de configuração com efeito imediato, use `Switch`.

---

### Switch

Liga/desliga de configuração com efeito imediato.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `checked` / `defaultChecked` | `boolean` | — | Estado (Radix) |
| `onCheckedChange` | `(checked: boolean) => void` | — | Mudança de estado |
| `label` | `string \| null` | — | Rótulo |
| `helperText` | `string \| null` | — | Texto de ajuda |
| `errorText` | `string \| null` | — | Mensagem de erro |
| `size` | `"sm" \| "md"` | `"md"` | Tamanho |
| `containerClassName` / `labelClassName` | `string` | — | Classes do invólucro e do rótulo |

Herda as props de `Switch.Root` do Radix.

```tsx
<Switch label="Sincronização automática" helperText="Vale para novos rascunhos de release." />
```

- Não use `Switch` para escolhas que só valem após salvar um formulário; nesse caso, use `Checkbox`.

---

### RadioGroup e Radio

Escolha exatamente uma opção entre poucas, todas visíveis.

**`RadioGroup`**

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string` | — | Opção selecionada |
| `onValueChange` | `(value: string) => void` | — | Mudança de seleção |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Direção e navegação por setas |
| `fullWidth` | `boolean` | `false` | Ocupa toda a largura |

Herda as props de `RadioGroup.Root` do Radix (`name`, `required`, `disabled`).

**`Radio`**

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `value` | `string` | — | Valor da opção (obrigatório) |
| `label` | `ReactNode` | — | Rótulo |
| `helperText` | `string \| null` | — | Texto de ajuda da opção |
| `size` | `"sm" \| "md"` | `"md"` | Tamanho |
| `containerClassName` / `labelClassName` | `string` | — | Classes do invólucro e do rótulo |

```tsx
<RadioGroup defaultValue="stable" aria-label="Canal de release">
  <Radio value="stable" label="Estável" />
  <Radio value="candidate" label="Candidata" helperText="Recebe correções antes do estável." />
</RadioGroup>
```

- Até cerca de cinco opções. Acima disso, use `Select`.
- Dê nome ao grupo com `aria-label` ou `aria-labelledby`.

---

### Select

Escolha única em lista suspensa. A API é composta.

| Parte | Função |
| --- | --- |
| `Select` | Raiz: `value`, `defaultValue`, `onValueChange`, `open`, `onOpenChange`, `disabled`, `name`, `required` |
| `SelectTrigger` | Campo com rótulo, mensagens e valor selecionado |
| `SelectContent` | Lista flutuante |
| `SelectItem` | Opção |
| `SelectGroup`, `SelectLabel`, `SelectSeparator` | Agrupamento |
| `SelectValue`, `SelectViewport`, `SelectScrollUpButton`, `SelectScrollDownButton` | Partes avançadas |

**`SelectTrigger`**

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `label` | `string \| null` | — | Rótulo |
| `placeholder` | `string` | — | Texto sem seleção |
| `helperText` | `string \| null` | — | Texto de ajuda |
| `errorText` | `string \| null` | — | Mensagem de erro |
| `status` / `statusText` | ver convenções | `"default"` | Estado de validação |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Tratamento da superfície |
| `size` | `"md" \| "lg"` | `"md"` | Altura 40 / 48px |
| `containerClassName` / `labelClassName` | `string` | — | Classes do invólucro e do rótulo |
| `children` | `ReactNode` | `<SelectValue placeholder />` | Substitui a exibição do valor |

**Outras partes**

| Componente | Prop | Tipo | Padrão |
| --- | --- | --- | --- |
| `SelectContent` | `position` | `"popper" \| "item-aligned"` | `"popper"` |
| `SelectContent` | `sideOffset` | `number` | `8` |
| `SelectItem` | `value` | `string` | — |
| `SelectItem` | `inset` | `boolean` | `false` |
| `SelectItem` | `disabled` | `boolean` | — |

A opção selecionada fica em semibold, com o ✓ à direita. `inset` alinha uma opção sem conteúdo inicial às que têm ícone. `SelectLabel` é um rótulo de grupo em caixa alta (`text-eyebrow`).

```tsx
<Select defaultValue="stable">
  <SelectTrigger label="Canal de release" placeholder="Escolha o canal" />
  <SelectContent>
    <SelectItem value="stable">Estável</SelectItem>
    <SelectItem value="candidate">Candidata</SelectItem>
  </SelectContent>
</Select>
```

- Para muitas opções com busca, use `AutoComplete`.
- Para várias escolhas, use `MultiSelect`.

---

### MultiSelect

Seleção múltipla em lista suspensa, com os itens escolhidos exibidos como tags.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `options` | `MultiSelectOption[]` | — | Obrigatório: `{ value, label, description?, disabled? }` |
| `value` / `defaultValue` | `string[]` | — / `[]` | Valores selecionados |
| `onValueChange` | `(value: string[]) => void` | — | Mudança de seleção |
| `label` | `string \| null` | — | Rótulo |
| `placeholder` | `string \| null` | `"Select options"` | Texto sem seleção |
| `helperText` / `errorText` | `string \| null` | — | Mensagens |
| `status` / `statusText` | ver convenções | `"default"` | Estado de validação |
| `emptyText` | `string \| null` | `"No options available."` | Texto de lista vazia |
| `maxVisibleTags` | `number` | `2` | Tags visíveis antes do contador `+N` |
| `clearLabel` | `string \| null` | `"Clear"` | Ação do rodapé que limpa a seleção (opções desabilitadas ficam como estão); `null` oculta o rodapé |
| `formatSelectedCount` | `(count: number) => string` | `` (n) => `${n} selected` `` | Resumo da seleção no rodapé |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Tratamento da superfície |
| `size` | `"md" \| "lg"` | `"md"` | Tamanho |
| `disabled` | `boolean` | `false` | Desabilita |

Herda as props de `<div>`, exceto `defaultValue` e `onChange`.

```tsx
const verificacoes = [
  { value: "tokens", label: "Diff de tokens" },
  { value: "contrast", label: "Checagem de contraste", description: "WCAG 2.2 AA" }
];

<MultiSelect
  label="Verificações da release"
  options={verificacoes}
  defaultValue={["tokens"]}
  placeholder="Selecione as verificações"
  emptyText="Nenhuma verificação disponível."
  clearLabel="Limpar"
  formatSelectedCount={(n) => (n === 1 ? "1 selecionada" : `${n} selecionadas`)}
/>
```

- Cada opção tem uma caixa de seleção na frente do rótulo.
- O rodapé mostra o resumo e a ação de limpar. Ele só aparece quando há opções, e a ação fica desabilitada enquanto não há nada que possa ser limpo.
- Em interfaces em português, sobrescreva `placeholder`, `emptyText`, `clearLabel` e `formatSelectedCount`.

---

### AutoComplete

Seleção única com busca por texto.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `options` | `AutoCompleteOption[]` | — | Obrigatório: `{ value, label, description?, disabled? }` |
| `value` / `defaultValue` | `string \| null` | — / `null` | Valor selecionado |
| `onValueChange` | `(value: string \| null, option?) => void` | — | Mudança de seleção |
| `inputValue` | `string` | — | Texto da busca (modo controlado) |
| `onInputValueChange` | `(value: string) => void` | — | Mudança do texto da busca |
| `label` | `string \| null` | — | Rótulo |
| `placeholder` | `string \| null` | `"Search options"` | Placeholder |
| `helperText` / `errorText` | `string \| null` | — | Mensagens |
| `status` / `statusText` | ver convenções | `"default"` | Estado de validação |
| `emptyText` | `string \| null` | `"No matching options."` | Texto sem resultados |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Tratamento da superfície |
| `size` | `"md" \| "lg"` | `"md"` | Tamanho |
| `disabled` | `boolean` | `false` | Desabilita |

Herda as props de `<div>`, exceto `defaultValue` e `onChange`.

```tsx
const responsaveis = [
  { value: "maia-rocha", label: "Maia Rocha", description: "Design systems" },
  { value: "vera-calder", label: "Vera Calder", description: "Operações de release" }
];

<AutoComplete
  label="Responsável pela release"
  options={responsaveis}
  placeholder="Buscar responsável"
  emptyText="Nenhum responsável encontrado."
/>
```

---

### Tabs

Painéis relacionados e alternadores de visão. Os primitivos Radix garantem `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, `aria-controls` e navegação por setas, Home e End.

| Parte | Função |
| --- | --- |
| `Tabs` | Raiz: `value`, `defaultValue`, `onValueChange`, `orientation`, `activationMode` |
| `TabsList` | Grupo de gatilhos; precisa de `aria-label` |
| `TabsTrigger` | Gatilho |
| `TabsContent` | Painel associado a um `value` |

**`Tabs`**

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"underline" \| "segmented" \| "rail" \| "ghost"` | `"underline"` | Estilo |
| `appearance` | `"solid" \| "soft"` | `"solid"` | Tratamento do gatilho selecionado em `segmented` e `rail`; ignorado em `underline` e `ghost` |
| `iconOnly` | `boolean` | `false` | Gatilhos quadrados só com ícone e tooltip |

**`TabsList`**

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `fullWidth` | `boolean` | — | Ocupa toda a largura |

**`TabsTrigger`**

Aceita **ou** `label` **ou** `children`, nunca os dois. O tipo impede um ícone sem `label`.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `value` | `string` | — | Obrigatório |
| `label` | `string` | — | Texto visível; em `iconOnly`, vira `aria-label` e tooltip |
| `icon` | `ReactNode` | — | Ícone: 16px com texto, 20px em `iconOnly` |
| `children` | `ReactNode` | — | Conteúdo livre (alternativa a `label`) |
| `disabled` | `boolean` | — | Ignorado pelas setas; sem hover e sem tooltip |
| `count` | `number` | — | Itens pendentes ou não lidos num selo de acento (`99+` acima de 99); oculto em `0` |
| `dot` | `boolean` | `false` | Ponto de "novidade" sem número; `count` vence quando os dois existem |
| `badgeLabel` | `string` | contagem | Significado do selo, anexado ao nome acessível (ex.: `"3 novidades"`) |

**Variantes**

| Variante | Aparência | Quando usar |
| --- | --- | --- |
| `underline` | Linha inferior; ativo com sublinhado | Seções de página |
| `segmented` | Trilho rebaixado com borda; ativo preenchido em grafite (`neutral-solid` + `on-solid`) ou, com `appearance="soft"`, com fundo, borda e texto de acento | Painéis compactos de produto |
| `rail` | Lista vertical com linha lateral; ativo como em `segmented` | Configurações densas com painel ao lado |
| `ghost` | Sem trilho, borda ou padding; ativo em `surface-sunken` com texto e ícone primários; hover em `hover-subtle` | Barras de ferramentas sobre uma superfície existente |

```tsx
<Tabs defaultValue="audit" variant="segmented">
  <TabsList aria-label="Seções da release">
    <TabsTrigger value="audit">Auditoria</TabsTrigger>
    <TabsTrigger value="tokens">Tokens</TabsTrigger>
  </TabsList>
  <TabsContent value="audit">Conteúdo da auditoria.</TabsContent>
  <TabsContent value="tokens">Conteúdo dos tokens.</TabsContent>
</Tabs>
```

Com ícone e texto visível:

```tsx
<TabsTrigger value="code" icon={<CodeBracketIcon />} label="Código" />
```

**Tabs só com ícone**

```tsx
<TooltipProvider>
  <Tabs variant="ghost" iconOnly value={view} onValueChange={setView}>
    <TabsList aria-label="Visão do painel">
      <TabsTrigger value="agents" icon={<Squares2X2Icon />} label="Visão de Agentes" />
      <TabsTrigger value="code" icon={<CodeBracketIcon />} label="Visão de Código" />
    </TabsList>
    <TabsContent value="agents">...</TabsContent>
    <TabsContent value="code">...</TabsContent>
  </Tabs>
</TooltipProvider>
```

**Contagem e ponto de novidade**

```tsx
<TabsTrigger value="code" icon={<CodeBracketIcon />} label="Código" count={3} badgeLabel="3 novidades" />
<TabsTrigger value="deploy" icon={<RocketLaunchIcon />} label="Deploy" dot badgeLabel="há novidades" />
```

Em gatilhos só com ícone, o selo fica no canto do ícone, separado por um anel de 2px da superfície (`--sf-focus-gap`). Nos demais, vem depois do texto e, em `rail`, alinhado à direita. O selo é sempre de acento, então o preenchimento grafite fica reservado à seleção.

Orientações:

- **Painel obrigatório.** Renderize sempre um `TabsContent` para o valor selecionado: o `aria-controls` do gatilho ativo precisa apontar para um painel existente. Se a visão alternada fica em outro ponto do layout, suba o `Tabs` na árvore e envolva essa visão com `TabsContent`.
- **Tamanho dos gatilhos.** Icon-only mede 32×32px com ícone de 20px e foi pensado para desktop com ponteiro. Atende WCAG 2.2 2.5.8 (AA), mas não é alvo de toque; em superfícies de toque, use tabs com texto.
- **Validação em dev.** Um `TabsTrigger` sem `label` ou sem `icon` dentro de `iconOnly` gera erro no console em desenvolvimento e é renderizado como texto.
- **Estilos de seleção.** Leem `aria-selected`. Não use `data-[state=active]` em `className`: nos gatilhos icon-only, o `data-state` pertence ao tooltip.
- **Distinção entre hover e seleção.** No tema claro, `hover-surface` e `surface-sunken` coincidem; por isso o `ghost` faz hover com `hover-subtle`, mais claro, e seleciona com `surface-sunken`.
- **Peso estável.** A seleção não muda o peso da fonte, então o preenchimento sólido não altera a largura da linha.
- **Selos acessíveis.** O `count` entra no nome acessível automaticamente. Um `dot` sem `badgeLabel` é só visual; passe `badgeLabel` sempre que o ponto carregar significado.
- **Filtros.** Não use tabs para filtros de seleção múltipla; use `Chip`.

---

### Accordion

Revelação progressiva dentro de uma página ou painel.

| Parte | Função |
| --- | --- |
| `Accordion` | Raiz: `type` (`"single" \| "multiple"`), `collapsible`, `value`, `defaultValue`, `onValueChange` |
| `AccordionItem` | Item: `value` (obrigatório), `disabled` |
| `AccordionHeader` | Cabeçalho semântico |
| `AccordionTrigger` | Botão que abre e fecha |
| `AccordionContent` | Conteúdo animado |

| Prop (`Accordion`) | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"outline" \| "ghost"` | `"outline"` | Com superfície e borda, ou sem moldura |

```tsx
<Accordion type="single" collapsible defaultValue="tokens" variant="outline">
  <AccordionItem value="tokens">
    <AccordionHeader>
      <AccordionTrigger>Validação de tokens</AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>Os aliases foram verificados nos temas claro e escuro.</AccordionContent>
  </AccordionItem>
</Accordion>
```

- Não use como navegação principal.
- `type="multiple"` só quando fizer sentido abrir várias seções ao mesmo tempo.
- A animação usa variáveis de altura do Radix; não meça altura com JavaScript.

---

### Pagination

Navegação entre páginas de resultados.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `page` | `number` | — | Página atual (obrigatório, começa em 1) |
| `totalPages` | `number` | — | Total de páginas (obrigatório) |
| `onPageChange` | `(page: number) => void` | — | Mudança de página |
| `siblingCount` | `number` | `1` | Páginas visíveis de cada lado da atual |
| `size` | `"sm" \| "md"` | `"md"` | Tamanho |
| `disabled` | `boolean` | `false` | Desabilita tudo |
| `previousLabel` / `nextLabel` | `string` | `"Previous page"` / `"Next page"` | Nomes acessíveis dos botões |
| `aria-label` | `string` | `"Pagination"` | Nome do `<nav>` |

Herda as props de `<nav>`.

```tsx
<Pagination
  page={page}
  totalPages={18}
  onPageChange={setPage}
  aria-label="Paginação de releases"
  previousLabel="Página anterior"
  nextLabel="Próxima página"
/>
```

---

### Modal

Diálogo com foco preso, para decisões bloqueantes ou fluxos curtos.

| Parte | Função |
| --- | --- |
| `Modal` | Raiz: `open`, `defaultOpen`, `onOpenChange`, `modal` |
| `ModalTrigger` | Abre o modal (use `asChild` com `Button`) |
| `ModalContent` | Painel com overlay e botão de fechar |
| `ModalHeader`, `ModalTitle`, `ModalDescription` | Cabeçalho acessível |
| `ModalBody`, `ModalFooter` | Corpo e ações |
| `ModalClose` | Fecha o modal (use `asChild`) |
| `ModalOverlay`, `ModalPortal` | Partes avançadas |

| Prop (`ModalContent`) | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Largura máxima 400 / 560 / 720 / 960px |
| `showClose` | `boolean` | `true` | Exibe o botão de fechar |
| `closeLabel` | `string` | `"Close modal"` | Nome acessível do botão de fechar |

```tsx
<Modal>
  <ModalTrigger asChild>
    <Button>Revisar release</Button>
  </ModalTrigger>
  <ModalContent closeLabel="Fechar">
    <ModalHeader>
      <ModalTitle>Revisar release</ModalTitle>
      <ModalDescription>Confirme as mudanças do pacote antes de publicar.</ModalDescription>
    </ModalHeader>
    <ModalBody>Diff de tokens e checagem de acessibilidade prontos.</ModalBody>
    <ModalFooter>
      <ModalClose asChild>
        <Button variant="secondary">Cancelar</Button>
      </ModalClose>
      <Button>Publicar</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

- `ModalTitle` é obrigatório para acessibilidade. Ele já aplica `text-heading-lg` e `ModalDescription` aplica `text-body-md`; não sobrescreva a escala.
- O painel se separa pela elevação (`shadow-sf-modal`) com uma borda leve (`modal-border`); o botão de fechar é preenchido (`modal-close`). No escuro, o overlay fica mais opaco (`--overlay-alpha: 0.64`).
- Se o conteúdo crescer para várias seções complexas, prefira uma página.

---

### DropdownMenu

Menu de ações contextuais. A API é composta.

| Parte | Props próprias | Função |
| --- | --- | --- |
| `DropdownMenu` | `open`, `onOpenChange`, `modal` | Raiz |
| `DropdownMenuTrigger` | `variant: "secondary" \| "ghost"` (padrão `"secondary"`) | Botão que abre o menu |
| `DropdownMenuContent` | `align` (padrão `"start"`), `sideOffset` (padrão `8`) | Painel |
| `DropdownMenuItem` | `danger` (padrão `false`), `inset` (padrão `false`), `onSelect`, `disabled` | Ação |
| `DropdownMenuCheckboxItem` | `checked`, `onCheckedChange` | Item marcável |
| `DropdownMenuRadioGroup` + `DropdownMenuRadioItem` | `value`, `onValueChange`; item com `value` | Escolha única |
| `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuGroup` | — | Organização |
| `DropdownMenuSub`, `DropdownMenuSubTrigger` (`inset`), `DropdownMenuSubContent` | — | Submenu |
| `DropdownMenuShortcut` | — | Atalho alinhado à direita, em forma de tecla |
| `DropdownMenuPortal` | — | Parte avançada |

Anatomia das opções, compartilhada com `Select` e `MultiSelect`: um espaço inicial de 16px (ícone, caixa de seleção ou rádio), o rótulo e um espaço final (atalho, ✓ ou seta de submenu). Como o espaço inicial está no fluxo, os rótulos se alinham entre itens mistos.

- Em `DropdownMenuCheckboxItem` e `DropdownMenuRadioItem`, `inset` está **obsoleto** e não tem efeito: o indicador já ocupa o espaço inicial.
- Em `DropdownMenuItem` e `DropdownMenuSubTrigger`, `inset` alinha um item sem ícone aos que têm.
- `DropdownMenuLabel` é um rótulo de grupo em caixa alta (`text-eyebrow`).

```tsx
<DropdownMenu>
  <DropdownMenuTrigger variant="ghost">Ações</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Ações da release</DropdownMenuLabel>
    <DropdownMenuItem onSelect={duplicar}>
      Duplicar rascunho
      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem danger onSelect={arquivar}>
      Arquivar release
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

- Use `onSelect`, não `onClick`, nos itens.
- `danger` somente para ações destrutivas, de preferência no fim do menu após um separador.
- Não use o menu para navegação principal nem para escolher valores de formulário (use `Select`).

---

### Tooltip

Dica curta e não crítica sobre um elemento.

| Parte | Props próprias | Função |
| --- | --- | --- |
| `TooltipProvider` | `delayDuration` (padrão `120`), `skipDelayDuration` (padrão `100`) | Obrigatório como ancestral |
| `Tooltip` | `open`, `defaultOpen`, `onOpenChange`, `delayDuration` | Raiz |
| `TooltipTrigger` | `asChild` | Elemento que dispara |
| `TooltipContent` | `children: string \| null`, `side`, `align`, `sideOffset` (padrão `8`) | Conteúdo |
| `TooltipPortal` | — | Parte avançada |

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Status dos tokens</Button>
    </TooltipTrigger>
    <TooltipContent>Última exportação concluída há 14 minutos.</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

- O conteúdo precisa ser string; qualquer outro valor não renderiza nada.
- Não coloque informação essencial nem elementos interativos no tooltip.
- O tooltip não substitui o nome acessível de um botão só com ícone: o botão continua precisando de `aria-label`.
- Elementos desabilitados não disparam tooltip.

---

### Table

Dados tabulares estruturados.

| Parte | Props próprias | Função |
| --- | --- | --- |
| `Table` | ver abaixo | Tabela com contêiner rolável |
| `TableHeader`, `TableBody`, `TableFooter` | — | Seções |
| `TableRow` | `data-selected="true"` | Linha; seleção com fundo de acento e marca lateral |
| `TableHead` / `TableCell` | `alignText` (padrão `"left"`), `numeric` (padrão `false`) | Cabeçalho e célula |
| `TableEmpty` | `colSpan` (obrigatório), `title` (padrão `"No records found"`), `description`, `action` | Estado vazio |
| `TableLoading` | `colSpan` (obrigatório), `rows` (padrão `3`) | Estado de carregamento |

**`Table`**

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `density` | `"default" \| "compact"` (`"comfortable"` = `default`) | `"default"` | Espaçamento das células |
| `surface` | `"outline" \| "plain"` (`"ghost"` = `plain`) | `"outline"` | Com superfície e borda, ou transparente |
| `containerClassName` | `string` | — | Classes do contêiner rolável |

```tsx
<Table density="compact">
  <TableHeader>
    <TableRow>
      <TableHead>Responsável</TableHead>
      <TableHead>Status</TableHead>
      <TableHead alignText="right" numeric>Risco</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-selected="true">
      <TableCell>Maia Rocha</TableCell>
      <TableCell><Badge variant="success">Pronto</Badge></TableCell>
      <TableCell alignText="right" numeric>18,7%</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

Estados:

```tsx
<TableBody>
  <TableLoading colSpan={3} rows={3} />
</TableBody>

<TableBody>
  <TableEmpty
    colSpan={3}
    title="Nenhuma release encontrada"
    description="Crie um rascunho de release para preencher esta tabela."
    action={<Button size="sm">Criar rascunho</Button>}
  />
</TableBody>
```

- Colunas numéricas usam `numeric` e `alignText="right"` para alinhar os dígitos.
- A tabela tem largura mínima de 640px e rola horizontalmente em telas estreitas.
- Não existe `TableCaption`. Descreva a tabela com um título próximo ligado por `aria-labelledby`.

---

### Alert

Feedback de sistema inline.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"info" \| "success" \| "warning" \| "error"` (`"danger"` = `error`) | `"info"` | Semântica |
| `appearance` | `"solid" \| "soft"` | `"solid"` | Preenchido com o tom, ou superfície tingida com barra lateral |
| `title` | `string \| null` | — | Título |
| `icon` | `ReactNode` | ícone da variante | Substitui o ícone; `null` remove |
| `action` | `ReactNode` | — | Ações abaixo do texto |
| `children` | `ReactNode` | — | Descrição |

Herda as props de `<div>`, exceto `title`. O `role` é `alert` para `error` e `status` para as demais variantes. Em `solid`, a barra lateral some (o preenchimento já carrega o tom) e o ícone acompanha a cor do texto.

```tsx
<Alert
  variant="warning"
  title="Contraste abaixo do mínimo"
  action={<Button size="sm" variant="secondary">Revisar tokens</Button>}
>
  Dois pares de cor não atingem 4.5:1 no tema escuro.
</Alert>
```

- Explique o que aconteceu e o que a pessoa pode fazer.
- Use `error` só para falhas reais, porque ele interrompe leitores de tela.

---

### Progress

Progresso mensurável de uma tarefa.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `value` | `number \| null` | — | Valor atual, limitado a `0..max`; `null` indica progresso sem medição disponível (barra pulsante e texto "In progress" em `showValue`) |
| `max` | `number` | `100` | Valor máximo |
| `label` | `string \| null` | — | Rótulo |
| `helperText` | `string \| null` | — | Texto de ajuda |
| `showValue` | `boolean` | `false` | Exibe o valor formatado |
| `valueFormatter` | `(value: number, max: number) => string` | percentual | Formatação do valor |
| `tone` (alias `variant`) | `"primary" \| "success" \| "warning" \| "error"` (`"danger"` = `error`) | `"primary"` | Cor |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Espessura |
| `containerClassName` | `string` | — | Classes do invólucro |

Herda as props de `Progress.Root` do Radix.

```tsx
<Progress
  label="Progresso da release"
  helperText="Validação aprovada em dois de três ambientes."
  value={64}
  showValue
/>
```

- Para atividade sem medida, use `Spinner`. Reserve `value={null}` para quando o progresso existe, mas o valor atual não está disponível.

---

### Skeleton

Placeholder de carregamento com a forma do conteúdo.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"block" \| "text" \| "avatar"` | `"block"` | Forma |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Altura (block 32/48/96, text 12/16/20, avatar 32/40/48px) |
| `lines` | `number` | `1` | Linhas de texto (`variant="text"`) |
| `label` | `string \| null` | `"Loading content"` | Nome acessível (`role="status"`); `null` torna decorativo |

Herda as props de `<div>`.

```tsx
<Skeleton variant="text" lines={4} label="Carregando notas da release" />
```

- Espelhe o layout real para evitar saltos.
- Com vários skeletons juntos, rotule um contêiner e passe `label={null}` nos demais.
- O shimmer é desligado com `prefers-reduced-motion`.

---

### Spinner

Atividade indeterminada, compacta e inline.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `label` | `string \| null` | `"Loading"` | Nome acessível (`role="status"`); `null` torna decorativo |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamanho |
| `tone` (alias `variant`) | `"primary" \| "secondary" \| "inverse"` | `"secondary"` | Cor |

Herda as props de `<span>`.

```tsx
<Spinner size="sm" label="Carregando" />
```

- Para áreas inteiras, prefira `Skeleton`.
- Botões e campos já têm a prop `loading`.

---

### Badge

Metadado compacto e não interativo: status ou contagem.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"neutral" \| "accent" \| "info" \| "success" \| "warning" \| "error" \| "custom"` (`"danger"` = `error`) | `"neutral"` | Semântica |
| `appearance` | `"solid" \| "soft"` | `"solid"` | Preenchido com o tom, ou superfície tingida |
| `size` | `"sm" \| "md"` | `"md"` | Altura 20 / 24px |
| `dot` | `boolean` | `false` | Ponto indicador antes do texto |
| `icon` | `ReactNode` | — | Ícone decorativo |
| `customColor` | `string` | — | Cor para `variant="custom"` |

Herda as props de `<span>`.

```tsx
<Badge dot variant="success">Online</Badge>
<Badge variant="warning">3 pendentes</Badge>
<Badge appearance="soft" variant="info">Na fila</Badge>
<Badge variant="custom" customColor="#147672">Fila de revisão</Badge>
```

- Badge não é CTA.
- Não dependa só da cor: o texto precisa comunicar o status.
- Em `solid`, ponto e ícone acompanham a cor do texto.
- Com `variant="custom"` em `solid`, o texto é branco nos dois temas: a cor precisa de 4.5:1 contra branco.

---

### Tag

Metadado compacto, com remoção opcional.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `"neutral" \| "accent" \| "info" \| "success" \| "warning" \| "error"` (`"danger"` = `error`) | `"neutral"` | Semântica |
| `appearance` | `"solid" \| "soft"` | `"solid"` | Preenchido com o tom, ou superfície tingida |
| `size` | `"sm" \| "md"` | `"md"` | Tamanho |
| `leftIcon` / `rightIcon` | `ReactNode` | — | Ícones |
| `onRemove` | `() => void` | — | Exibe o botão de remover |
| `removeLabel` | `string` | `"Remove tag"` | Nome acessível do botão de remover |
| `disabled` | `boolean` | `false` | Desabilita |

Herda as props de `<span>`. Em `solid`, a `Tag` usa peso médio, mais discreta que um `Badge` sólido: a tag classifica, o badge comunica status.

```tsx
<Tag variant="success">Validado</Tag>
<Tag variant="error" onRemove={() => remover("bloqueado")} removeLabel="Remover filtro bloqueado">
  Bloqueado
</Tag>
```

- Sempre informe `removeLabel` específico e no idioma da interface.

---

### Chip

Filtro compacto selecionável e/ou removível.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | Torna o chip um botão com `aria-pressed` |
| `selected` | `boolean` | `false` | Estado selecionado; mostra ✓ se não houver `leftIcon` |
| `actionLabel` | `string` | — | Nome acessível do botão principal, quando o texto não basta |
| `onRemove` | `() => void` | — | Exibe o botão de remover |
| `removeLabel` | `string` | `"Remove chip"` | Nome acessível do botão de remover |
| `variant` | `"neutral" \| "accent" \| "info" \| "success" \| "warning" \| "error"` (`"danger"` = `error`) | `"neutral"` | Semântica |
| `appearance` | `"solid" \| "soft"` | `"solid"` | Ver abaixo |
| `size` | `"sm" \| "md"` | `"md"` | Tamanho |
| `leftIcon` / `rightIcon` | `ReactNode` | — | Ícones |
| `disabled` | `boolean` | `false` | Desabilita |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Tipo do botão principal |

Herda as props de `<span>`, exceto `onClick`.

| `appearance` | Chip estático ou selecionado | Chip interativo não selecionado |
| --- | --- | --- |
| `solid` | Preenchido com o tom (`*-solid` + `on-solid`) | Só contorno (`border`), texto secundário: o preenchimento sozinho marca a seleção |
| `soft` | Superfície tingida; selecionado ganha um anel sutil | Superfície tingida |

```tsx
<Chip selected={filtro === "ativos"} onClick={() => setFiltro("ativos")}>
  Ativos
</Chip>

<Chip variant="error" onRemove={() => remover("bloqueado")} removeLabel="Remover filtro bloqueado">
  Bloqueado
</Chip>
```

- **`Chip` × `Tag`:** use `Chip` quando a pessoa interage (filtrar, alternar) e `Tag` para metadado estático.

---

### Avatar

Identidade de pessoa ou serviço.

| Parte | Função |
| --- | --- |
| `Avatar` | Contêiner com tamanho, status e cor |
| `AvatarImage` | Imagem: `src`, `alt` |
| `AvatarFallback` | Iniciais exibidas enquanto a imagem carrega ou quando ela falha |
| `AvatarGroup` | Pilha sobreposta de avatares |

**`Avatar`**

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamanho |
| `status` | `"online" \| "away" \| "busy" \| "offline"` | — | Indicador de presença |
| `variant` | `"neutral" \| "accent" \| "custom"` | `"neutral"` | Cor do fallback |
| `customColor` | `string` | — | Cor para `variant="custom"` |

**`AvatarFallback`**

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `children` | `string \| null` | — | Iniciais |
| `delayMs` | `number` | `250` | Atraso antes de exibir o fallback |

```tsx
<Avatar status="online">
  <AvatarImage src="/avatars/maia-rocha.jpg" alt="Maia Rocha" />
  <AvatarFallback>MR</AvatarFallback>
</Avatar>

<AvatarGroup>
  <Avatar><AvatarFallback>MR</AvatarFallback></Avatar>
  <Avatar variant="accent"><AvatarFallback>VC</AvatarFallback></Avatar>
</AvatarGroup>
```

- Sempre inclua `AvatarFallback`.
- O `alt` da imagem é o nome da pessoa.
- O status não deve depender só da cor: exponha a presença em texto por perto quando ela importar.

---

### ThemeProvider

Aplica o tema a uma região.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `theme` | `"light" \| "dark"` | `"light"` | Define `data-theme` na `<div>` |

Herda as props de `<div>` e aplica `bg-background text-content-primary`.

```tsx
<ThemeProvider theme="dark" className="min-h-screen">
  <App />
</ThemeProvider>
```

- Para tema global com sobreposições, aplique também `data-theme` no `<html>` (ver [Tema](#tema)).

---

## 6. Estados obrigatórios

Toda superfície nova construída com Skyforge UI precisa tratar os estados aplicáveis:

| Estado | Tratamento |
| --- | --- |
| Padrão | Estilo de repouso alinhado aos tokens |
| Hover | Mudança tonal ou de borda, nunca só opacidade |
| Pressionado | Translate ou scale sutil |
| Foco visível | `ring-focus` (neutro) com offset, ou halo em Tabs |
| Desabilitado | Não interativo, mas legível |
| Carregando | `Progress`, `Skeleton`, `TableLoading`, `Spinner` ou a prop `loading` |
| Inválido | `errorText`, `aria-invalid` e tokens de erro |
| Vazio | Estado vazio com o próximo passo útil (`TableEmpty`) |
| Perigo | Semântica de erro, sem vermelhos arbitrários |

---

## 7. Acessibilidade

- Mensagens de ajuda e erro ficam ligadas ao controle por `aria-describedby`; as props embutidas já fazem isso.
- Controles só com ícone precisam de nome acessível: `aria-label` ou `label` em `TabsTrigger`.
- Ícones decorativos levam `aria-hidden="true"`.
- Não comunique status só por cor; combine texto ou forma.
- Preserve a interação por teclado dos componentes Radix e não remova indicadores de foco.
- Todo `TabsList`, `RadioGroup` e grupo de controles precisa de nome (`aria-label` ou `aria-labelledby`).
- Contraste mínimo: texto 4.5:1; texto grande, ícones essenciais e bordas de controle 3:1; foco contra a superfície adjacente 3:1.
- Alvos de 32px servem só a desktop com ponteiro; em toque, use controles `lg`.
- Traduza os textos padrão em inglês (`removeLabel`, `closeLabel`, `previousLabel`, `emptyText` etc.) em interfaces em português.

---

## 8. Conteúdo

- Use texto real e contextual; evite lorem ipsum.
- Evite nomes genéricos como "Fulano de Tal" ou "John Doe".
- Evite números artificialmente redondos, como `99,99%` ou `50%`.
- Mensagens de erro são diretas: "Falha na conexão. Tente novamente."
- Evite jargão de marketing: "revolucionário", "sem esforço", "next-gen".
- Rótulos de botão são verbos curtos: "Publicar", "Salvar", "Excluir".

---

## 9. Checklist de entrega

Antes de entregar uma interface, verifique:

1. O componente existe no Skyforge UI antes de escrever código próprio.
2. Cor, espaçamento, raio, altura e foco usam tokens semânticos.
3. Os temas claro e escuro funcionam, inclusive nas sobreposições em portal.
4. Rótulos, ajuda e erros são strings.
5. Foco, hover, pressionado, desabilitado, carregando, vazio e inválido estão tratados.
6. Os ícones são Heroicons com `strokeWidth={1.5}`.
7. Colunas numéricas usam `numeric`.
8. Os formulários ligam ajuda e erro aos controles.
9. `TooltipProvider` está presente onde há tooltips ou `Tabs iconOnly`.
10. Nenhum componente inexistente (`Label`, `Loading`, `TableCaption`) é referenciado.
11. Build e typecheck passam.
