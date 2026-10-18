# Skyforge UI — Regras para agentes

Regras obrigatórias para qualquer agente de IA (ou pessoa) que monte interface, tela, componente ou protótipo usando `@luiswagnerab/skyforge-ui`. Este arquivo diz **o que fazer e o que nunca fazer**. A referência completa de props e exemplos de cada componente está em `skyforge-ui.md`.

## Como usar este arquivo

1. Leia este arquivo inteiro antes de escrever qualquer UI.
2. Para os valores reais de cores, tipografia, espaçamentos e demais tokens, consulte o [Apêndice A](#apêndice-a--tokens-mapeados-valores-de-referência).
3. Para a API de um componente específico, consulte `skyforge-ui.md` (seção 5) e, se ainda houver dúvida, o código em `src/components/<Nome>/<Nome>.tsx` e suas stories.
4. Ao entregar, rode o [checklist final](#12-checklist-final) e cite as regras pelo identificador (ex.: "R-COR-2") quando justificar uma decisão ou desvio.

Ordem de precedência em caso de conflito: `design-tokens.json` → `src/styles.css` → `DESIGN_SYSTEM_RULES.md` → **este arquivo** → `skyforge-ui.md` → código dos componentes → stories.

Palavras normativas: **DEVE** / **NUNCA** são obrigatórias; **PREFIRA** admite exceção justificada na entrega.

---

## 1. Regras de ouro

| ID | Regra |
| --- | --- |
| R-OURO-1 | **DEVE** usar um componente Skyforge sempre que ele existir para o caso. Nunca escreva `<button>`, `<input>`, `<select>`, `<dialog>` ou tooltip próprios quando há equivalente na lib. |
| R-OURO-2 | **NUNCA** crie cópia local, wrapper que reestiliza ou "versão melhorada" de um primitivo existente. Se o componente não atende, registre a lacuna (ver [seção 10](#10-quando-o-skyforge-não-cobre-o-caso)). |
| R-OURO-3 | **NUNCA** use cor, espaçamento, raio, sombra, z-index, duração ou fonte fixos. Tudo vem de token semântico. |
| R-OURO-4 | **NUNCA** importe ou invente componentes que não existem: `Label`, `Loading`, `TableCaption`, `Card`, `Toast`, `Sidebar`, `Navbar`, `Icon`. |
| R-OURO-5 | **DEVE** funcionar em `light` e `dark`, inclusive nas camadas em portal (menus, modais, tooltips). |
| R-OURO-6 | **DEVE** importar tudo do entry principal: `import { Button } from "@luiswagnerab/skyforge-ui"`. Nunca de caminhos internos (`/dist/components/...`). |

### Inventário completo (v1.0.0)

Se não está nesta lista, **não existe** na lib:

`Accordion` (+ `AccordionItem`, `AccordionHeader`, `AccordionTrigger`, `AccordionContent`) · `Alert` · `AutoComplete` · `Avatar` (+ `AvatarImage`, `AvatarFallback`, `AvatarGroup`) · `Badge` · `Button` · `Checkbox` · `Chip` · `DatePicker` · `DropdownMenu` (+ partes) · `FormField` · `Input` · `Modal` (+ partes) · `MultiSelect` · `Pagination` · `Progress` · `RadioGroup`, `Radio` · `Select` (+ partes) · `Skeleton` · `Spinner` · `Switch` · `Table` (+ `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableEmpty`, `TableLoading`) · `Tabs` (+ `TabsList`, `TabsTrigger`, `TabsContent`) · `Tag` · `Textarea` · `Tooltip` (+ `TooltipProvider`, `TooltipTrigger`, `TooltipContent`) · `ThemeProvider`.

---

## 2. Setup obrigatório no app consumidor

| ID | Regra |
| --- | --- |
| R-SETUP-1 | Importe a folha de estilos **uma vez** no entry: `import "@luiswagnerab/skyforge-ui/styles.css";`. |
| R-SETUP-2 | **NUNCA** adicione Google Fonts para Bebas Neue ou Figtree; as fontes já vêm no pacote. |
| R-SETUP-3 | Tema global: aplique `data-theme` no `<html>` **e** use `ThemeProvider` no shell. Só o `ThemeProvider` não alcança portais. |
| R-SETUP-4 | Coloque **um** `TooltipProvider` no shell da aplicação se houver qualquer `Tooltip` ou `Tabs iconOnly`. |
| R-SETUP-5 | Densidade compacta se aplica com `data-density="compact"` num ancestral, nunca reduzindo alturas manualmente. |

```tsx
// app entry
import "@luiswagnerab/skyforge-ui/styles.css";
import { ThemeProvider, TooltipProvider } from "@luiswagnerab/skyforge-ui";

document.documentElement.dataset.theme = theme; // "light" | "dark"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme} className="min-h-screen">
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
```

---

## 3. Tokens e utilitários no app consumidor

O `styles.css` publicado é **compilado**: ele traz todas as CSS variables, mas só as classes utilitárias que a própria lib usa (mais uma safelist). Por exemplo, `p-sf-16`, `bg-surface` e `text-heading-md` existem; `p-sf-64`, `gap-sf-96`, `shadow-sf-1`, `z-sf-sticky` e `z-sf-toast` **não existem** no CSS publicado.

| ID | Regra |
| --- | --- |
| R-TOKEN-1 | **NUNCA** presuma que uma classe `*-sf-*` ou semântica existe só porque o nome segue o padrão. Se o projeto consumidor usa Tailwind, **DEVE** mapear o tema para as variáveis Skyforge (preset abaixo). |
| R-TOKEN-2 | Sem Tailwind, use as variáveis diretamente: `rgb(var(--color-surface))`, `var(--space-16)`, `var(--radius-md)`, `var(--shadow-2)`, `var(--z-sticky)`. |
| R-TOKEN-3 | Cores são canais RGB: sempre `rgb(var(--color-x) / alpha)`, nunca `var(--color-x)` direto em `color`/`background`. |
| R-TOKEN-4 | **NUNCA** use valores arbitrários do Tailwind para contornar a falta de token (`p-[18px]`, `bg-[#147672]`, `z-[60]`, `shadow-[...]`). |

Preset Tailwind v3 mínimo para o app consumidor (mesmos nomes da lib, então as classes geradas coincidem com as do pacote):

```ts
// tailwind.config.ts do app consumidor
const c = (v: string) => `rgb(var(${v}) / <alpha-value>)`;
const space = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: c("--color-background"),
        surface: c("--color-surface"),
        "surface-raised": c("--color-surface-raised"),
        "surface-sunken": c("--color-surface-sunken"),
        "surface-inverse": c("--color-surface-inverse"),
        border: c("--color-border"),
        "border-strong": c("--color-border-strong"),
        divider: c("--color-divider"),
        "content-primary": c("--color-text-primary"),
        "content-secondary": c("--color-text-secondary"),
        "content-tertiary": c("--color-text-tertiary"),
        "content-inverse": c("--color-text-inverse"),
        "icon-primary": c("--color-icon-primary"),
        "icon-secondary": c("--color-icon-secondary"),
        "icon-tertiary": c("--color-icon-tertiary"),
        "icon-accent": c("--color-icon-accent"),
        primary: c("--color-primary"),
        "primary-foreground": c("--color-primary-foreground"),
        focus: c("--color-focus"),
        "focus-gap": "rgb(var(--sf-focus-gap, var(--color-background)) / <alpha-value>)",
        link: c("--color-link"),
        "hover-surface": c("--color-hover-surface"),
        "hover-subtle": c("--color-hover-subtle"),
        "active-surface": c("--color-active-surface"),
        field: { bg: c("--color-field-bg"), "bg-filled": c("--color-field-bg-filled"), border: c("--color-field-border"), placeholder: c("--color-field-placeholder") },
        accent: { bg: c("--color-accent-bg"), border: c("--color-accent-border"), text: c("--color-accent-text"), solid: c("--color-accent-solid") },
        "neutral-solid": c("--color-neutral-solid"),
        "on-solid": c("--color-on-solid"),
        success: { bg: c("--color-success-bg"), border: c("--color-success-border"), text: c("--color-success-text"), icon: c("--color-success-icon"), solid: c("--color-success-solid") },
        warning: { bg: c("--color-warning-bg"), border: c("--color-warning-border"), text: c("--color-warning-text"), icon: c("--color-warning-icon"), solid: c("--color-warning-solid") },
        error: { bg: c("--color-error-bg"), border: c("--color-error-border"), text: c("--color-error-text"), icon: c("--color-error-icon"), solid: c("--color-error-solid") },
        info: { bg: c("--color-info-bg"), border: c("--color-info-border"), text: c("--color-info-text"), icon: c("--color-info-icon"), solid: c("--color-info-solid") }
      },
      spacing: Object.fromEntries(space.map((n) => [`sf-${n}`, `var(--space-${n})`])),
      borderRadius: { "sf-sm": "var(--radius-sm)", "sf-md": "var(--radius-md)", "sf-lg": "var(--radius-lg)", "sf-xl": "var(--radius-xl)", "sf-2xl": "var(--radius-2xl)", "sf-full": "var(--radius-full)" },
      boxShadow: { "sf-1": "var(--shadow-1)", "sf-2": "var(--shadow-2)", "sf-3": "var(--shadow-3)", "sf-popover": "var(--component-popover-shadow)", "sf-modal": "var(--component-modal-shadow)" },
      zIndex: { "sf-base": "var(--z-base)", "sf-sticky": "var(--z-sticky)", "sf-dropdown": "var(--z-dropdown)", "sf-overlay": "var(--z-overlay)", "sf-modal": "var(--z-modal)", "sf-tooltip": "var(--z-tooltip)", "sf-toast": "var(--z-toast)" },
      height: { "control-sm": "var(--control-h-sm)", "control-md": "var(--control-h-md)", "control-lg": "var(--control-h-lg)", "row-2xs": "var(--row-h-2xs)", "row-xs": "var(--row-h-xs)", "row-sm": "var(--row-h-sm)", "row-md": "var(--row-h-md)" },
      maxWidth: { shell: "var(--shell-max)" },
      fontFamily: { display: "var(--font-display)", body: "var(--font-body)", mono: "var(--font-mono)" },
      transitionDuration: { "sf-fast": "var(--duration-fast)", "sf-normal": "var(--duration-normal)", "sf-slow": "var(--duration-slow)" },
      transitionTimingFunction: { "sf-standard": "var(--ease-standard)" }
    }
  }
};
```

As classes de tipografia (`text-display-*`, `text-heading-*`, `text-body-*`, `text-label-*`, `text-caption`, `text-eyebrow`, `text-mono`) já existem todas no CSS publicado; não as redefina.

### Tokens que você vai usar com mais frequência

| Necessidade | Use | Nunca |
| --- | --- | --- |
| Fundo da página | `bg-background` | `bg-white`, `bg-gray-50` |
| Painel / card | `bg-surface border border-border` | `bg-white shadow-md` |
| Área rebaixada (trilho, input de busca, faixa) | `bg-surface-sunken` | `bg-gray-100` |
| Texto principal / secundário / terciário | `text-content-primary` / `-secondary` / `-tertiary` | `text-primary`, `text-gray-500` |
| Separação dentro de um contêiner | `border-divider`, `divide-divider` | `border-border` para linhas internas |
| Hover de linha ou item | `hover:bg-hover-surface` | `hover:opacity-80` |
| Seleção | `bg-accent-bg border-accent-border text-accent-text` | teal arbitrário |
| Status | `*-success-*`, `*-warning-*`, `*-error-*`, `*-info-*` | `text-red-500`, `bg-green-100` |
| Status preenchido (alta ênfase) | `bg-success-solid text-on-solid` (idem `neutral`, `accent`, `info`, `warning`, `error`) | `bg-success-icon text-white` |
| Foco (elemento próprio) | `outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focus-gap` | `outline-none` sem substituto |

| ID | Regra |
| --- | --- |
| R-COR-1 | **NUNCA** use `text-primary` para texto: `primary` é a cor de **ação**. Texto usa `text-content-*`. |
| R-COR-2 | **NUNCA** use `#000000`/`black` visível. Preto puro só em overlay com alfa. |
| R-COR-3 | Teal (acento) é para link, seleção e estado ativo. **NUNCA** para foco (o foco é neutro, `ring-focus`), CTA genérico nem decoração. |
| R-COR-4 | Cores de status (verde, âmbar, vermelho, azul) só comunicam estado. **NUNCA** como decoração. |
| R-COR-5 | `linen`/editorial só em superfícies de leitura longa ou editoriais; nunca em chrome de produto nem para estado. |
| R-COR-6 | Escolha o **papel** (`border` × `divider`), não o contraste. Nunca condicione cor por tema no código (`dark:bg-...`); os tokens já trocam sozinhos. |
| R-COR-7 | Preenchimento `*-solid` **DEVE** levar `text-on-solid`. O par troca de polaridade entre temas (texto branco no claro, `neutral.950` no escuro); nunca fixe `text-white`. |

---

## 4. Contexto da experiência

Antes de decidir layout, **declare o contexto** da tela. Se não estiver claro pelo pedido ou pelo projeto, pergunte.

| Contexto | Quando | Postura |
| --- | --- | --- |
| `product-operational` (padrão) | Dashboards, CRUD, admin, listas, configurações, ferramentas internas | Silencioso, denso, escaneável, previsível |
| `premium-experience` | Landing, página de marca, portfólio, lançamento | Espaçoso, tipografia display forte, movimento de entrada |
| `hybrid-product` | Produto com primeira dobra editorial e área de trabalho | Premium só na primeira dobra; o restante volta a operacional |

| ID | Regra |
| --- | --- |
| R-CTX-1 | Na dúvida, o contexto é `product-operational`. **NUNCA** aplique tratamento premium silenciosamente a fluxos de trabalho. |
| R-CTX-2 | Em operacional: espaçamento `sf-12`/`sf-16`/`sf-24`/`sf-32`; nada de `sf-64`+ em tabelas, formulários, sidebars e dashboards. |
| R-CTX-3 | Em operacional: sem gradientes decorativos, orbs, bokeh, glassmorphism ou blur em conteúdo rolável. |
| R-CTX-4 | `Button variant="editorial"` e CTA em pílula só em `premium-experience`. |

---

## 5. Escolha do componente certo

| Preciso de… | Use | Não use |
| --- | --- | --- |
| Disparar uma ação | `Button` | `<a>`, `<div onClick>`, `Chip` |
| Navegar para outra página | link do framework (`<a>`, `Link`) estilizado com `text-link` | `Button` |
| Texto curto ou número | `Input` (`type="text"` ou `"number"`) | `Input type="email|password|date"`, `Textarea` |
| Texto longo | `Textarea` | `Input` |
| Data | `DatePicker` (`locale="pt-BR"`) | `Input type="date"` |
| Booleano que vale após salvar | `Checkbox` | `Switch` |
| Liga/desliga com efeito imediato | `Switch` | `Checkbox` |
| Uma opção entre até ~5 visíveis | `RadioGroup` + `Radio` | `Select` |
| Uma opção entre muitas | `Select` | `RadioGroup`, `DropdownMenu` |
| Uma opção com busca | `AutoComplete` | `Select` com filtro improvisado |
| Várias opções | `MultiSelect` | vários `Checkbox` soltos em lista longa |
| Controle customizado com rótulo/ajuda/erro | `FormField` (render function) | `<label>` + `<p>` manuais |
| Alternar visões/painéis relacionados | `Tabs` | `Chip`, botões soltos |
| Filtro selecionável ou removível | `Chip` | `Tabs`, `Badge` |
| Metadado estático (opcionalmente removível) | `Tag` | `Chip` |
| Status ou contagem compacta | `Badge` | `Button`, `Tag` interativa |
| Ações contextuais (⋯) | `DropdownMenu` | `Select`, popover próprio |
| Decisão bloqueante / fluxo curto | `Modal` | página nova para 1 pergunta; modal para fluxos longos |
| Dica curta, não essencial | `Tooltip` | tooltip com conteúdo essencial ou interativo |
| Revelação progressiva | `Accordion` | `Accordion` como navegação principal |
| Dados tabulares | `Table` | grid de `div`s |
| Paginação | `Pagination` | botões "anterior/próximo" improvisados |
| Feedback inline do sistema | `Alert` | `div` colorida, toast improvisado |
| Progresso mensurável | `Progress` | `Spinner` |
| Carregamento de área com forma conhecida | `Skeleton` / `TableLoading` | `Spinner` centralizado na tela |
| Atividade curta e inline | `Spinner` ou prop `loading` | `Skeleton` |
| Pessoa ou serviço | `Avatar` (+ `AvatarFallback` sempre) | `img` redonda |

---

## 6. Regras por componente

Só o que mais causa erro. Props completas em `skyforge-ui.md`.

| ID | Componente | Regra |
| --- | --- | --- |
| R-BTN-1 | Button | Uma única ação `primary` por região; as demais `secondary` ou `ghost`. |
| R-BTN-2 | Button | `danger` só para ação destrutiva. Rótulos são verbos curtos ("Salvar", "Excluir release"). |
| R-BTN-3 | Button | Use `loading` (preserva largura). **NUNCA** troque o texto por `Spinner` manualmente. |
| R-BTN-4 | Button | Botão só com ícone **DEVE** ter `aria-label`; `Tooltip` não substitui o nome acessível. |
| R-BTN-5 | Button | Ícones via `leftIcon`/`rightIcon`, nunca como filho solto junto do texto. |
| R-FORM-1 | Campos | Rótulo sempre via `label` (acima do campo). Placeholder **NUNCA** substitui rótulo. |
| R-FORM-2 | Campos | Erro via `errorText` (já liga `aria-invalid` e `aria-describedby`). Não monte mensagem de erro manual. |
| R-FORM-3 | Campos | `label`, `helperText`, `errorText`, `statusText` são `string \| null`. **NUNCA** passe JSX. `null` omite o elemento. |
| R-FORM-4 | Campos | CEP, telefone, CPF e códigos são `type="text"`, não `number`. |
| R-FORM-5 | DatePicker | Valor em `DD-MM-YYYY`; converta para ISO antes de enviar à API. |
| R-FORM-6 | Checkbox/Radio | Grupos ficam em `fieldset` + `legend` ou têm `aria-label`/`aria-labelledby`. |
| R-SEL-1 | Select | Use `SelectTrigger` com `label`/`placeholder`; não envolva o Select em `<label>` próprio. |
| R-TABS-1 | Tabs | Todo `TabsList` tem `aria-label`. Sempre renderize um `TabsContent` para o valor selecionado. |
| R-TABS-2 | Tabs | `TabsTrigger` recebe `label` **ou** `children`, nunca os dois. Em `iconOnly`, `icon` e `label` são obrigatórios. |
| R-TABS-3 | Tabs | Estilize seleção por `aria-selected`, nunca por `data-[state=active]`. `iconOnly` só em desktop com ponteiro. |
| R-TABS-4 | Tabs | Pendências via `count`/`dot` no `TabsTrigger`, nunca com `Badge` solto dentro do gatilho. `dot` com significado **DEVE** ter `badgeLabel` em pt-BR (ex.: `"há novidades"`); sem ele, o ponto não é anunciado. |
| R-MENU-1 | DropdownMenu | Itens usam `onSelect`, não `onClick`. Item `danger` vai no fim, após `DropdownMenuSeparator`. |
| R-MENU-2 | DropdownMenu | Não passe `inset` em `DropdownMenuCheckboxItem`/`DropdownMenuRadioItem`: está obsoleto e não tem efeito. `inset` só em `DropdownMenuItem`/`SubTrigger` sem ícone, para alinhar aos que têm. |
| R-MODAL-1 | Modal | `ModalTitle` é obrigatório. Gatilho e fechar via `asChild` com `Button`. Conteúdo com várias seções complexas vira página. |
| R-MODAL-2 | Modal | Não sobrescreva a escala de `ModalTitle` (`text-heading-lg`) e `ModalDescription` (`text-body-md`), nem a borda e a sombra do `ModalContent`. |
| R-TIP-1 | Tooltip | Conteúdo é **string**. Nada essencial nem interativo dentro. Elementos desabilitados não disparam tooltip. |
| R-TABLE-1 | Table | Colunas numéricas: `numeric` + `alignText="right"` no `TableHead` **e** no `TableCell`. |
| R-TABLE-2 | Table | Estados com `TableLoading` e `TableEmpty` (com `title`, `description` e `action` em pt-BR). Linha selecionada via `data-selected="true"`. |
| R-TABLE-3 | Table | Não existe `TableCaption`: título próximo ligado por `aria-labelledby`. |
| R-ALERT-1 | Alert | Diga o que aconteceu e o que fazer. `error` só para falhas reais (interrompe leitor de tela). |
| R-BADGE-1 | Badge/Tag/Chip | O texto comunica o status; cor nunca sozinha. `customColor` só com contraste validado nos dois temas; em `Badge` `solid` o texto é branco nos dois temas, então a cor precisa de 4.5:1 contra branco. |
| R-BADGE-2 | Alert/Badge/Tag/Chip/Tabs | `appearance` padrão é `solid` (preenchido com o tom). Use `appearance="soft"` para a superfície tingida; **NUNCA** recrie o visual sólido ou suave com `className`. |
| R-AVATAR-1 | Avatar | Sempre `AvatarFallback`; `alt` da imagem é o nome da pessoa. |

---

## 7. Composição de telas

| ID | Regra |
| --- | --- |
| R-LAYOUT-1 | Hierarquia por **borda e contraste tonal**, não por sombra. Card/painel padrão: `rounded-sf-xl border border-border bg-surface p-sf-24`, sem sombra (mesmo raio de `Table` e `Alert`). |
| R-LAYOUT-2 | Sombra só em camada flutuante: `shadow-sf-1` (cards interativos/menus pequenos), `shadow-sf-2` (popovers), `shadow-sf-popover` (listas de opções: Select, MultiSelect, DropdownMenu), `shadow-sf-3` (overlays), `shadow-sf-modal` (Modal). A sombra dos botões preenchidos já vem do `Button`; não adicione sombra a botões. |
| R-LAYOUT-3 | **NUNCA** card dentro de card em telas operacionais. **NUNCA** sombras `inset`. |
| R-LAYOUT-4 | Títulos em Bebas Neue (`text-display-*`, `text-heading-*`); leitura, formulários e dados em Figtree (`text-body-*`, `text-label-*`). Valores técnicos em `text-mono`. |
| R-LAYOUT-5 | Hierarquia de títulos: `text-display-xl` para título de página, `text-heading-lg` para seção, `text-heading-md` para card. O título de modal vem do `ModalTitle` (`text-heading-lg`). Não pule mais de um nível. |
| R-LAYOUT-6 | Não centralize toda seção por padrão. Telas operacionais alinham à esquerda e usam `max-w-shell` quando há limite de largura. |
| R-LAYOUT-7 | Breakpoints: colapso para uma coluna em `720px`, colapso de navegação e grids maiores em `1040px`. Não invente breakpoints. |
| R-LAYOUT-8 | Z-index só com tokens (`--z-sticky` < `--z-dropdown`/`--z-overlay` < `--z-modal` < `--z-tooltip` < `--z-toast`). |
| R-LAYOUT-9 | Ícones: só Heroicons, Outline por padrão (`@heroicons/react/24/outline`), Solid apenas para ênfase/feedback forte; tamanhos 16/20/24/32; `strokeWidth={1.5}`. Ícone decorativo leva `aria-hidden="true"`. Não use ícone onde texto resolve. |
| R-LAYOUT-10 | Movimento: anime só `transform` e `opacity`, com `duration-sf-*` e `ease-sf-standard`. Em operacional, só micro-movimento. Nunca `window.addEventListener("scroll")` para animação. |

Esqueleto de referência para uma tela operacional:

```tsx
<main className="mx-auto grid max-w-shell gap-sf-24 px-sf-24 py-sf-32">
  <header className="flex items-end justify-between gap-sf-16">
    <div className="grid gap-sf-4">
      <span className="text-eyebrow uppercase text-content-tertiary">Releases</span>
      <h1 className="font-display text-display-xl text-content-primary">Rascunhos</h1>
    </div>
    <Button leftIcon={<PlusIcon />}>Novo rascunho</Button>
  </header>

  <div className="flex flex-wrap items-center gap-sf-8" role="group" aria-label="Filtros">
    <Chip selected={filtro === "todos"} onClick={() => setFiltro("todos")}>Todos</Chip>
    <Chip selected={filtro === "bloqueados"} onClick={() => setFiltro("bloqueados")}>Bloqueados</Chip>
  </div>

  <section aria-labelledby="titulo-tabela" className="grid gap-sf-12">
    <h2 id="titulo-tabela" className="font-display text-heading-lg">Fila de revisão</h2>
    <Table density="compact">{/* TableHeader / TableBody com TableLoading e TableEmpty */}</Table>
    <Pagination page={page} totalPages={total} onPageChange={setPage}
      aria-label="Paginação da fila" previousLabel="Página anterior" nextLabel="Próxima página" />
  </section>
</main>
```

---

## 8. Estados obrigatórios

Toda superfície nova **DEVE** tratar os estados aplicáveis antes de ser entregue:

| Estado | Como |
| --- | --- |
| Carregando | `Skeleton` com a forma do conteúdo, `TableLoading`, prop `loading` em `Button`/campos, `Spinner` só inline |
| Vazio | `TableEmpty` ou bloco equivalente que **explica como preencher** e oferece a ação |
| Erro de carregamento | `Alert variant="error"` com o que aconteceu e ação de tentar de novo |
| Inválido | `errorText` no campo |
| Sucesso | `Alert variant="success"` ou `status="success"` + `statusText` no campo |
| Desabilitado | prop `disabled`; legível se carrega informação |
| Hover / foco / pressionado | já embutidos nos componentes; em elementos próprios use `hover:bg-hover-surface` e o anel de foco do token |

| ID | Regra |
| --- | --- |
| R-STATE-1 | Hover muda tom ou borda, **nunca** só opacidade. |
| R-STATE-2 | Carregamento preserva o layout final (sem saltos). Vários skeletons juntos: rotule o contêiner e passe `label={null}` nos demais. |
| R-STATE-3 | **NUNCA** remova o indicador de foco (`outline-none` sem `focus-visible:ring-*`). |

---

## 9. Acessibilidade e conteúdo

| ID | Regra |
| --- | --- |
| R-A11Y-1 | Contraste mínimo: texto 4.5:1; texto grande, ícones essenciais e bordas de controle 3:1; foco 3:1 contra a superfície ao lado. |
| R-A11Y-2 | Status nunca só por cor: combine texto, ícone ou forma. |
| R-A11Y-3 | Todo grupo de controles (`TabsList`, `RadioGroup`, filtros) tem nome acessível. |
| R-A11Y-4 | Alvos de 32px (`sm`, `iconOnly`, linhas densas) só em desktop com ponteiro. Em toque, use `lg` e linhas `sm` ou maiores. |
| R-A11Y-5 | Preserve o teclado dos componentes Radix: não intercepte setas, `Esc`, `Tab` nem `Home`/`End`. |
| R-I18N-1 | Interfaces em português **DEVEM** sobrescrever os textos padrão em inglês: `closeLabel` (Modal), `previousLabel`/`nextLabel`/`aria-label` (Pagination), `removeLabel` (Tag, Chip), `placeholder`/`emptyText` (MultiSelect, AutoComplete), `clearLabel`/`formatSelectedCount` (MultiSelect), `title` (TableEmpty), `label` (Skeleton, Spinner), `locale="pt-BR"` (DatePicker). |
| R-CONT-1 | Texto real e contextual. Sem lorem ipsum, "John Doe", "Fulano", números redondos artificiais (`50%`, `99,99%`) ou jargão de marketing ("revolucionário", "next-gen"). |
| R-CONT-2 | Mensagens de erro diretas e acionáveis: "Falha na conexão. Tente novamente." |

---

## 10. Quando o Skyforge não cobre o caso

Exemplos: card, navegação lateral, header de app, toast, breadcrumb, empty state fora de tabela.

1. **Componha** com componentes Skyforge e tokens: card = `div` com borda e superfície (R-LAYOUT-1); toast = `Alert` posicionado com `--z-toast`.
2. Mantenha a composição **local e pequena**, sem API genérica que concorra com a lib.
3. **NUNCA** traga outra lib de componentes (shadcn, MUI, Chakra, Headless UI) nem outra família de ícones para cobrir a lacuna.
4. Na entrega, registre a lacuna: "Composição local de `X` porque o Skyforge UI não oferece `X`; candidata a componente na lib."
5. Se a lacuna exigir um token novo (cor, espaço, breakpoint), **NUNCA** crie no app consumidor: proponha a inclusão em `design-tokens.json`.

---

## 11. Antipadrões frequentes

```tsx
// ❌ cor e espaçamento fixos, texto com cor de ação, sombra em card padrão
<div className="rounded-lg bg-white p-5 shadow-md">
  <h3 className="text-primary text-xl font-bold">Release</h3>
</div>

// ✅
<div className="rounded-sf-xl border border-border bg-surface p-sf-24">
  <h3 className="font-display text-heading-md text-content-primary">Release</h3>
</div>
```

```tsx
// ❌ rótulo e erro manuais, JSX em prop de texto
<label>Chave</label>
<Input placeholder="Chave" errorText={<span>Obrigatório</span>} />

// ✅
<Input label="Chave do projeto" errorText="A chave do projeto é obrigatória." />
```

```tsx
// ❌ botão só com ícone sem nome; família de ícone errada
<Button variant="ghost"><FiTrash /></Button>

// ✅
<Button variant="ghost" aria-label="Excluir release" leftIcon={<TrashIcon />} />
```

```tsx
// ❌ tabs como filtro; seleção via data-state
<Tabs><TabsList><TabsTrigger value="a" className="data-[state=active]:font-bold">Ativos</TabsTrigger></TabsList></Tabs>

// ✅ filtro é Chip
<Chip selected={filtro === "ativos"} onClick={() => setFiltro("ativos")}>Ativos</Chip>
```

```tsx
// ❌ tema dark só no provider: menus e modais abrem claros
<ThemeProvider theme="dark"><App /></ThemeProvider>

// ✅
document.documentElement.dataset.theme = "dark";
<ThemeProvider theme="dark"><App /></ThemeProvider>
```

---

## 12. Checklist final

Antes de entregar, confirme e informe o resultado:

1. Contexto declarado (`product-operational`, `premium-experience` ou `hybrid-product`).
2. Todo controle usa componente Skyforge quando ele existe; nenhum componente inexistente foi importado.
3. Cor, espaço, raio, sombra, z-index, fonte e duração vêm de tokens; não há valores arbitrários nem hex.
4. As classes usadas existem no CSS publicado ou no preset do app (R-TOKEN-1).
5. Light e dark funcionam, incluindo portais (`data-theme` no `<html>`).
6. `TooltipProvider` presente se há `Tooltip` ou `Tabs iconOnly`.
7. Carregando, vazio, erro, inválido e desabilitado estão tratados.
8. Formulários usam `label`/`helperText`/`errorText` como string.
9. Ícones são Heroicons com `strokeWidth={1.5}`, decorativos com `aria-hidden`, botões só com ícone com `aria-label`.
10. Textos padrão em inglês foram traduzidos (R-I18N-1).
11. Layout funciona em 320px, 720px, 1040px e desktop.
12. Typecheck e build do projeto passam.
13. Lacunas da lib e desvios de regra (com ID) estão listados na entrega.

---

## Apêndice A — Tokens mapeados (valores de referência)

Valores extraídos de `src/styles.css` (runtime) e `design-tokens.json` (primitivos) na v1.0.0. Servem para o agente **entender** a escala, o contraste e a relação entre os papéis.

| ID | Regra |
| --- | --- |
| R-VAL-1 | **NUNCA** copie um valor desta tabela para o código (`#147672`, `16px`, `cubic-bezier(...)`). Use sempre a variável ou a classe da mesma linha. O valor muda por tema e densidade; o token não. |
| R-VAL-2 | Se precisar de um valor que não está aqui, ele não faz parte do sistema: use o token mais próximo ou registre a lacuna (seção 10). |
| R-VAL-3 | Em caso de divergência entre este apêndice e `src/styles.css` / `design-tokens.json`, o arquivo de origem vence. |

### A.1 Cores semânticas

As variáveis guardam canais RGB (`--color-surface: 255 255 255`); use `rgb(var(--color-surface))` ou `rgb(var(--color-surface) / 0.8)`. O "Nome Tailwind" combina com qualquer prefixo de cor: `bg-surface`, `text-content-primary`, `border-border`, `ring-focus`, `divide-divider`. Entre parênteses, o primitivo de origem.

**Superfícies**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-background` | `background` | `#F6F6F7` (neutral.50) | `#18181A` (neutral.950) |
| `--color-background-editorial` | `background-editorial` | `#E4E0D5` (linen.100) | `#26262A` (neutral.900) |
| `--color-surface` | `surface` | `#FFFFFF` (base.white) | `#323238` (brand.shadow-ink) |
| `--color-surface-raised` | `surface-raised` | `#FFFFFF` (base.white) | `#3B3B41` (neutral.800) |
| `--color-surface-sunken` | `surface-sunken` | `#ECECEE` (neutral.100) | `#18181A` (neutral.950) |
| `--color-surface-inverse` | `surface-inverse` | `#18181A` (neutral.950) | `#E4E0D5` (linen.100) |
| `--color-overlay` | `overlay` | `#18181A` (neutral.950) | `#000000` (base.black) |

**Bordas**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-border` | `border` | `#B7B7BB` (neutral.300) | `#8E8E93` (neutral.400) |
| `--color-border-strong` | `border-strong` | `#8E8E93` (neutral.400) | `#B7B7BB` (neutral.300) |
| `--color-divider` | `divider` | `#D8D8DB` (neutral.200) | `#3B3B41` (neutral.800) |
| `--color-control-border` | `control-border` | `#8E8E93` (neutral.400) | `#8E8E93` (neutral.400) |

**Texto**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-text-primary` | `content-primary` | `#18181A` (neutral.950) | `#F6F6F7` (neutral.50) |
| `--color-text-secondary` | `content-secondary` | `#4F4F55` (neutral.700) | `#D8D8DB` (neutral.200) |
| `--color-text-tertiary` | `content-tertiary` | `#5D5D63` (neutral.600) | `#B7B7BB` (neutral.300) |
| `--color-text-inverse` | `content-inverse` | `#F6F6F7` (neutral.50) | `#18181A` (neutral.950) |

**Ícones**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-icon-primary` | `icon-primary` | `#18181A` (neutral.950) | `#F6F6F7` (neutral.50) |
| `--color-icon-secondary` | `icon-secondary` | `#5D5D63` (neutral.600) | `#B7B7BB` (neutral.300) |
| `--color-icon-tertiary` | `icon-tertiary` | `#707076` (neutral.500) | `#8E8E93` (neutral.400) |
| `--color-icon-inverse` | `icon-inverse` | `#F6F6F7` (neutral.50) | `#18181A` (neutral.950) |
| `--color-icon-accent` | `icon-accent` | `#147672` (teal.600) | `#78B7B3` (teal.300) |
| `--color-icon-disabled` | `icon-disabled` | `#707076` (neutral.500) | `#B7B7BB` (neutral.300) |

**Ação e interação**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-primary` | `primary` | `#18181A` (neutral.950) | `#F6F6F7` (neutral.50) |
| `--color-primary-hover` | `primary-hover` | `#323238` (brand.shadow-ink) | `#ECECEE` (neutral.100) |
| `--color-primary-active` | `primary-active` | `#323238` (brand.shadow-ink) | `#D8D8DB` (neutral.200) |
| `--color-primary-foreground` | `primary-foreground` | `#F6F6F7` (neutral.50) | `#18181A` (neutral.950) |
| `--color-secondary` | `secondary` | `#FFFFFF` (base.white) | `#323238` (brand.shadow-ink) |
| `--color-secondary-hover` | `secondary-hover` | `#ECECEE` (neutral.100) | `#45454B` (fora da rampa: um degrau acima de `surface-raised`) |
| `--color-secondary-foreground` | `secondary-foreground` | `#18181A` (neutral.950) | `#F6F6F7` (neutral.50) |
| `--color-focus` | `focus` | `#18181A` (neutral.950) | `#F6F6F7` (neutral.50) |
| `--color-link` | `link` | `#147672` (teal.600) | `#78B7B3` (teal.300) |
| `--color-link-hover` | `link-hover` | `#144845` (teal.800) | `#B8E0DD` (teal.200) |
| `--color-hover-surface` | `hover-surface` | `#ECECEE` (neutral.100) | `#3B3B41` (neutral.800) |
| `--color-hover-subtle` | `hover-subtle` | `#F6F6F7` (neutral.50) | `#3B3B41` (neutral.800) |
| `--color-active-surface` | `active-surface` | `#D8D8DB` (neutral.200) | `#4F4F55` (neutral.700) |

**Acento (seleção)**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-accent-bg` | `accent-bg` | `#EFF7F6` (teal.50) | `#0F3230` (teal.900) |
| `--color-accent-border` | `accent-border` | `#B8E0DD` (teal.200) | `#175E5B` (teal.700) |
| `--color-accent-text` | `accent-text` | `#175E5B` (teal.700) | `#B8E0DD` (teal.200) |

**Campos**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-field-bg` | `field-bg` | `#FFFFFF` (base.white) | `#26262A` (neutral.900) |
| `--color-field-bg-readonly` | `field-bg-readonly` | `#F6F6F7` (neutral.50) | `#323238` (brand.shadow-ink) |
| `--color-field-bg-filled` | `field-bg-filled` | `#D8D8DB` (neutral.200) | `#323238` (brand.shadow-ink) |
| `--color-field-border` | `field-border` | `#8E8E93` (neutral.400) | `#8E8E93` (neutral.400) |
| `--color-field-border-hover` | `field-border-hover` | `#707076` (neutral.500) | `#B7B7BB` (neutral.300) |
| `--color-field-placeholder` | `field-placeholder` | `#707076` (neutral.500) | `#8E8E93` (neutral.400) |

**Feedback**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-success-bg` | `success-bg` | `#EEF8EF` (green.50) | `#132D18` (green.900) |
| `--color-success-border` | `success-border` | `#ABCDAE` (green.200) | `#2A5B33` (green.700) |
| `--color-success-text` | `success-text` | `#2A5B33` (green.700) | `#ABCDAE` (green.200) |
| `--color-success-icon` | `success-icon` | `#3D7246` (green.600) | `#86B98C` (green.300) |
| `--color-warning-bg` | `warning-bg` | `#FFF3E2` (amber.50) | `#352200` (amber.900) |
| `--color-warning-border` | `warning-border` | `#ECB965` (amber.200) | `#694700` (amber.700) |
| `--color-warning-text` | `warning-text` | `#694700` (amber.700) | `#ECB965` (amber.200) |
| `--color-warning-icon` | `warning-icon` | `#845B03` (amber.600) | `#D99D30` (amber.300) |
| `--color-error-bg` | `error-bg` | `#FFF1F0` (red.50) | `#4A1211` (red.900) |
| `--color-error-border` | `error-border` | `#F4B7B4` (red.200) | `#8E2421` (red.700) |
| `--color-error-text` | `error-text` | `#8E2421` (red.700) | `#F4B7B4` (red.200) |
| `--color-error-icon` | `error-icon` | `#C2413D` (red.500) | `#E88B86` (red.300) |
| `--color-info-bg` | `info-bg` | `#EFF6FF` (blue.50) | `#132741` (blue.900) |
| `--color-info-border` | `info-border` | `#ABC5E8` (blue.200) | `#264F84` (blue.700) |
| `--color-info-text` | `info-text` | `#264F84` (blue.700) | `#ABC5E8` (blue.200) |
| `--color-info-icon` | `info-icon` | `#3565A3` (blue.600) | `#82ACE5` (blue.300) |

**Preenchimento sólido** (alta ênfase em `Alert`, `Badge`, `Tag`, `Chip` e `Tabs`)

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-neutral-solid` | `neutral-solid` | `#4F4F55` (neutral.700) | `#B7B7BB` (neutral.300) |
| `--color-accent-solid` | `accent-solid` | `#147672` (teal.600) | `#78B7B3` (teal.300) |
| `--color-info-solid` | `info-solid` | `#3565A3` (blue.600) | `#82ACE5` (blue.300) |
| `--color-success-solid` | `success-solid` | `#3D7246` (green.600) | `#86B98C` (green.300) |
| `--color-warning-solid` | `warning-solid` | `#845B03` (amber.600) | `#D99D30` (amber.300) |
| `--color-error-solid` | `error-solid` | `#C2413D` (red.500) | `#E88B86` (red.300) |
| `--color-on-solid` | `on-solid` | `#FFFFFF` (base.white) | `#18181A` (neutral.950) |

**Desabilitado**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-disabled-bg` | `disabled-bg` | `#ECECEE` (neutral.100) | `#3B3B41` (neutral.800) |
| `--color-disabled-border` | `disabled-border` | `#D8D8DB` (neutral.200) | `#4F4F55` (neutral.700) |
| `--color-disabled-text` | `disabled-text` | `#5D5D63` (neutral.600) | `#8E8E93` (neutral.400) |

**Editorial**

| Variável | Nome Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--color-editorial-bg` | `editorial-bg` | `#FBFAF6` (linen.50) | `#2D2A21` (linen.900) |
| `--color-editorial-surface` | `editorial-surface` | `#E4E0D5` (linen.100) | `#413D33` (linen.800) |
| `--color-editorial-border` | `editorial-border` | `#B6AE99` (linen.300) | `#575245` (linen.700) |
| `--color-editorial-text` | `editorial-text` | `#413D33` (linen.800) | `#E4E0D5` (linen.100) |

Leituras importantes da tabela:

- **Light:** canvas `neutral.50` cinza-claro, superfícies brancas por cima, separadas por borda `neutral.300`. **Dark:** canvas `neutral.950`, superfícies `shadow-ink`/`neutral.800` mais claras que o canvas. A hierarquia de superfícies se inverte, por isso **nunca** escreva `dark:` à mão.
- `primary` é quase-preto no light e quase-branco no dark: o CTA principal é **neutro**, não teal.
- `focus` também é neutro (17.2:1 sobre o canvas claro): o foco é um estado do controle, não seleção nem link.
- Teal aparece só em `link`, `icon-accent`, `accent-*` (seleção) e `accent-solid`.
- `control-border`/`field-border` (`neutral.400`, 3:1) é mais forte que `border` (`neutral.300`, 2:1). Por isso controles de formulário nunca usam `border-border`.
- Feedback espelha a rampa entre temas: `bg` 50↔900, `border` 200↔700, `text` 700↔200.
- Os sólidos usam os passos `.600` (erro `.500`) no light com texto branco, pelo menos 5:1; no dark, os passos `.300` com texto `neutral.950`, pelo menos 7:1.
- `hover-surface` e `surface-sunken` coincidem no light (`neutral.100`); onde a seleção já é `surface-sunken`, o hover usa `hover-subtle`.
- `field-bg-filled` existe porque `surface-sunken` não serve ao campo `filled`: no dark ela é igual ao canvas.
- `overlay` no dark é `#000000`: o único uso permitido de preto puro, sempre com alfa (`--overlay-alpha`: 0.44 no light, 0.64 no dark).

### A.2 Rampas primitivas

Só para documentação e criação de tokens. **NUNCA** consuma um primitivo direto em componente ou tela.

| Passo | neutral | teal | green | amber | red | blue | linen |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 50 | `#F6F6F7` | `#EFF7F6` | `#EEF8EF` | `#FFF3E2` | `#FFF1F0` | `#EFF6FF` | `#FBFAF6` |
| 100 | `#ECECEE` | `#D5EEEC` | `#CEE2D0` | `#F8D6A2` | `#FFDEDC` | `#CEDDF1` | `#E4E0D5` |
| 200 | `#D8D8DB` | `#B8E0DD` | `#ABCDAE` | `#ECB965` | `#F4B7B4` | `#ABC5E8` | `#CDC7B6` |
| 300 | `#B7B7BB` | `#78B7B3` | `#86B98C` | `#D99D30` | `#E88B86` | `#82ACE5` | `#B6AE99` |
| 400 | `#8E8E93` | `#54A39E` | `#61A46C` | `#BF8500` | `#D66862` | `#5993E0` | `#9E9680` |
| 500 | `#707076` | `#328F8A` | `#4B8C56` | `#A17002` | `#C2413D` | `#447BC4` | `#867E6A` |
| 600 | `#5D5D63` | `#147672` | `#3D7246` | `#845B03` | `#A63330` | `#3565A3` | `#6E6857` |
| 700 | `#4F4F55` | `#175E5B` | `#2A5B33` | `#694700` | `#8E2421` | `#264F84` | `#575245` |
| 800 | `#3B3B41` | `#144845` | `#1F4325` | `#4E3400` | `#6D1B19` | `#1D3A61` | `#413D33` |
| 900 | `#26262A` | `#0F3230` | `#132D18` | `#352200` | `#4A1211` | `#132741` | `#2D2A21` |
| 950 | `#18181A` | — | — | — | — | — | — |

Cada família sobe em passos uniformes de lightness OKLCH (ΔL ≈ 0.078) com matiz constante. Passos que nenhum papel usa hoje são reserva para papéis futuros.

**Marca**

| Token | Valor | Descrição |
| --- | --- | --- |
| `brand.carbon-black` | `{primitive.color.neutral.950}` | v2: neutralized from #161B1E. Primary brand authority color — light theme CTAs, dark theme canvas. Anchors the neutral ramp. |
| `brand.shadow-ink` | `#323238` (brand.shadow-ink) | v2: neutralized from #323738. Dark ink surface, separated from neutral 900 for visible dark-mode surfaces. |
| `brand.charcoal` | `{primitive.color.neutral.700}` | v2: neutralized from #515656. Structural brand neutral aligned with neutral 700. |
| `brand.soft-linen` | `{primitive.color.linen.100}` | Warm editorial surface color used sparingly for narrative emphasis. The only warm family in the system. |
| `brand.muted-teal` | `{primitive.color.teal.600}` | Contrast-safe brand accent for links, selection, and functional emphasis on light surfaces. Never focus. |

### A.3 Tipografia

| Classe | Fonte | Tamanho | Line-height | Peso | Tracking | Uso |
| --- | --- | --- | --- | --- | --- | --- |
| `text-display-2xl` | Bebas Neue | 64px | 110% | 400 | 0.015em | Hero e páginas institucionais |
| `text-display-xl` | Bebas Neue | 48px | 110% | 400 | 0.015em | Título de página, modal de alto impacto |
| `text-heading-lg` | Bebas Neue | 32px | 120% | 400 | 0.015em | Seção principal |
| `text-heading-md` | Bebas Neue | 24px | 120% | 400 | 0.015em | Card, modal, grupo |
| `text-heading-sm` | Bebas Neue | 20px | 120% | 400 | 0.015em | Subtítulo, entidade |
| `text-body-md` | Figtree | 16px | 150% | 400 | 0 | Texto corrido principal |
| `text-body-sm` | Figtree | 14px | 150% | 400 | 0 | Texto secundário, formulários, listas |
| `text-label-lg` | Figtree | 20px | 120% | 600 | 0 | Identificadores grandes (iniciais de avatar) |
| `text-label-md` | Figtree | 14px | 120% | 600 | 0 | Rótulos, botões, abas |
| `text-label-sm` | Figtree | 12px | 120% | 600 | 0 | Rótulos compactos |
| `text-caption` | Figtree | 12px | 150% | 500 | 0 | Metadados, legendas |
| `text-eyebrow` | Figtree | 12px | 120% | 700 | 0.08em | Marcador editorial (com `uppercase`) |
| `text-mono` | ui-monospace | 13px | 150% | 400 | 0 | Tokens, código, valores técnicos |

Famílias: `font-display` → `var(--font-display)` (Bebas Neue), `font-body` → `var(--font-body)` (Figtree), `var(--font-mono)`. Bebas Neue tem um único peso (400): **nunca** aplique `font-bold` em títulos display.

### A.4 Espaçamento, raio e borda

| Espaço | Valor | Classe | Uso típico |
| --- | --- | --- | --- |
| `--space-4` | 4px | `*-sf-4` | Gap entre ícone e texto, rótulo e campo |
| `--space-8` | 8px | `*-sf-8` | Gap de grupos de chips/botões, padding de linha densa |
| `--space-12` | 12px | `*-sf-12` | Gap interno de seção, indentação de árvore |
| `--space-16` | 16px | `*-sf-16` | Gap entre campos de formulário, padding de toolbar |
| `--space-24` | 24px | `*-sf-24` | Padding de card (`--component-card-padding`), gap entre blocos |
| `--space-32` | 32px | `*-sf-32` | Padding de página, card editorial |
| `--space-48` | 48px | `*-sf-48` | Separação de seções grandes |
| `--space-64` | 64px | `*-sf-64` | Só premium/editorial |
| `--space-96` | 96px | `*-sf-96` | Só premium/editorial |
| `--space-128` | 128px | `*-sf-128` | Só premium/editorial |

Utilitários extras: `sf-20` (`--size-20`, 20px) e `sf-40` (`--size-40`, 40px) existem para dimensões de ícone e elemento, **não** como espaçamento.

| Raio | Valor | Classe | Uso típico |
| --- | --- | --- | --- |
| `--radius-sm` | 4px | `rounded-sf-sm` | Detalhes internos pequenos (marcas, tags dentro de campos) |
| `--radius-md` | 8px | `rounded-sf-md` | Checkbox, itens de menu e de lista, gatilhos de aba |
| `--radius-lg` | 12px | `rounded-sf-lg` | Campos (`Input`, `Select`, `Textarea`), tooltip |
| `--radius-xl` | 16px | `rounded-sf-xl` | Cards, painéis, `Table`, `Alert`, `Accordion`, popovers e listas suspensas |
| `--radius-2xl` | 24px | `rounded-sf-2xl` | `Modal`, contêineres premium |
| `--radius-full` | 9999px | `rounded-sf-full` | `Button`, `Badge`, `Tag`, `Chip`, `Avatar`, `Switch`, `Radio`, `Progress` |

Os raios são concêntricos: o elemento interno usa um degrau abaixo do contêiner (item `md` dentro de menu `xl`).

Bordas: `--border-width-default` 1px (padrão em tudo), `--border-width-strong` 2px (contorno de foco global).

### A.5 Alturas e densidade

| Token | Padrão | `data-density="compact"` | Classe |
| --- | --- | --- | --- |
| `--control-h-sm` | 32px | 32px | `h-control-sm`, `w-control-sm` |
| `--control-h-md` | 40px | 32px | `h-control-md` |
| `--control-h-lg` | 48px | 40px | `h-control-lg` |
| `--row-h-md` | 48px | 40px | `h-row-md` |
| `--row-h-sm` | 40px | 32px | `h-row-sm` |
| `--row-h-xs` | 30px | 30px | `h-row-xs` |
| `--row-h-2xs` | 26px | 26px | `h-row-2xs` |
| `--row-indent` | 12px | 12px | `pl-row-indent` |

### A.6 Elevação, camadas e movimento

| Token | Valor | Uso |
| --- | --- | --- |
| `--shadow-none` | `none` | Cards e painéis padrão |
| `--shadow-1` | `0 1px 2px rgb(24 24 26 / .06), 0 8px 24px rgb(24 24 26 / .05)` | Cards interativos, menus pequenos |
| `--shadow-2` | `0 8px 24px rgb(24 24 26 / .10), 0 24px 48px rgb(24 24 26 / .08)` | Popovers, painéis flutuantes |
| `--shadow-3` | `0 24px 64px rgb(24 24 26 / .18), 0 48px 96px rgb(24 24 26 / .14)` | Modais, overlays |

| Token de componente | Light | Dark | Uso |
| --- | --- | --- | --- |
| `--component-popover-shadow` (`shadow-sf-popover`) | `0 1px 2px rgb(24 24 26 / .06), 0 8px 24px rgb(24 24 26 / .08)` | linha de luz no topo + `0 1px 2px rgb(0 0 0 / .24), 0 8px 24px rgb(0 0 0 / .28)` | Listas de opções |
| `--component-modal-shadow` (`shadow-sf-modal`) | `var(--shadow-3)` | linha de luz no topo + `0 2px 8px rgb(0 0 0 / .4), 0 24px 64px rgb(0 0 0 / .55)` | `ModalContent` |
| `--component-button-shadow` / `-hover` (`shadow-sf-button` / `-hover`) | `0 1px 2px` / `0 6px 16px rgb(24 24 26 / .16)` | `0 1px 2px rgb(0 0 0 / .6)` / `0 6px 16px rgb(0 0 0 / .5)` | Variantes preenchidas de `Button` |

As sombras `--shadow-*` são as mesmas nos dois temas e quase invisíveis no dark: no dark a separação vem do contraste tonal das superfícies. Os tokens de componente acima são a exceção e trocam para uma pilha em preto no dark. A linha de luz (`inset 0 1px 0 rgb(255 255 255 / .06)`) é interna ao componente; `--shadow-inset` existe, mas é proibido em componentes e telas (R-LAYOUT-3).

| Camada | Valor | Uso |
| --- | --- | --- |
| `--z-base` | 0 | Conteúdo |
| `--z-sticky` | 100 | Headers e toolbars fixos |
| `--z-overlay` | 300 | Overlay do modal |
| `--z-modal` | 400 | Modal |
| `--z-dropdown` | 500 | Select, menus, popovers (acima do modal de propósito) |
| `--z-tooltip` | 600 | Tooltips |
| `--z-toast` | 700 | Notificações flutuantes |

| Movimento | Valor | Uso |
| --- | --- | --- |
| `--duration-fast` | 120ms | Hover, foco, pressionado |
| `--duration-normal` | 180ms | Abrir menus, trocar estado |
| `--duration-slow` | 240ms | Modais, entradas maiores |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Curva única de todas as transições |

### A.7 Layout e componentes

| Token | Valor | Uso |
| --- | --- | --- |
| `layout.breakpoint.mobile` | 720px | Colapso para uma coluna |
| `layout.breakpoint.tablet` | 1040px | Colapso de navegação e grids maiores |
| `--shell-max` | 1180px | Largura máxima do shell (`max-w-shell`) |
| `--component-button-height-sm` / `-md` / `-lg` | 32 / 40 / 48px | Alturas de `Button` |
| `--component-button-padding-x-sm` / `-md` / `-lg` | 12 / 16 / 24px | Padding horizontal de `Button` |
| `--component-input-height-md` / `-lg` | 40 / 48px | Alturas de campos |
| `--component-card-padding` | 24px | Padding de card operacional |
| `--component-card-padding-editorial` | 32px | Padding de card editorial |
| `--component-modal-width-sm` / `-md` / `-lg` / `-xl` | 400 / 560 / 720 / 960px | `ModalContent size` |
| `--component-tabs-height` | 40px | Altura de `Tabs` |
| `--component-tabs-indicator-height` | 2px | Sublinhado da aba ativa |
| `--component-badge-height-sm` / `-md` | 20 / 24px | Alturas de `Badge` |
| `--overlay-alpha` | 0.44 (dark: 0.64) | Opacidade do overlay de modal |

Tokens de cor internos dos componentes. Estão aqui para entender o resultado; **NUNCA** os consuma em telas (R-VAL-1).

| Token | Light | Dark | Uso |
| --- | --- | --- | --- |
| `--component-modal-border` | `#B7B7BB` (neutral.300) | `#4F4F55` (neutral.700) | Borda do `ModalContent` |
| `--component-modal-close-bg` / `-hover` | `#ECECEE` / `#D8D8DB` (neutral.100 / .200) | `#4F4F55` / `#5D5D63` (neutral.700 / .600) | Botão de fechar do modal |
| `--component-option-highlight` | `#ECECEE` (neutral.100) | `#4F4F55` (neutral.700) | Opção em destaque em listas |
| `--component-option-divider` | `#D8D8DB` (neutral.200) | `#4F4F55` (neutral.700) | Separadores e tecla de atalho em listas |
| `--component-button-danger` | `#C2413D` (red.500) | `#E88B86` (red.300) | `Button variant="danger"` |
| `--component-button-danger-hover` / `-active` | `#A8332F` / `#8E2421` (red.700) | `#F0A19D` / `#DD7A74` | Hover e pressionado do `danger` |
| `--component-button-danger-foreground` | `#F6F6F7` (neutral.50) | `#18181A` (neutral.950) | Texto do `danger` |
| `--component-button-editorial-hover` / `-active` | `#DAD5C8` / `#CFC9B9` | `#4B463B` / `#575245` (linen.700) | Hover e pressionado do `editorial` |

Breakpoints não existem como variável CSS (media queries não leem `var()`); use os valores literais `720px` e `1040px` **somente** em media queries.
