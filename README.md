# Skyforge-UI

Biblioteca React + TypeScript + Tailwind + Storybook baseada em `DESIGN_SYSTEM_RULES.md` e `design-tokens.json`.

## Scripts

- `npm install`: instala dependencias.
- `npm run storybook`: abre a documentacao local na porta `6006`.
- `npm run build-storybook`: gera o Storybook estatico.
- `npm run typecheck`: valida TypeScript sem emitir arquivos.
- `npm run build`: gera tipos e bundle ESM da biblioteca.

## Componentes v1

- `Button`: variantes `primary`, `secondary`, `ghost`, `danger` e `editorial`; tamanhos `sm`, `md`, `lg`; estado `loading`.
- `Input`: variantes `outline`, `filled`, `ghost`; tamanhos `md`, `lg`; estados `success`, `warning`, `error`.
- `Card`: variantes `plain`, `interactive`, `editorial`, `metric` e slots estruturais.
- `Modal`: baseado em Radix Dialog, com foco gerenciado e fechamento por teclado.
- `Tabs`: baseado em Radix Tabs, com variantes `underline`, `segmented`, `rail`.
- `Badge`: variantes semanticas e accent funcional.
- `Alert`: variantes semanticas com role acessivel por padrao.
- `Loading`, `Spinner` e `Skeleton`: estados de carregamento e placeholders.
- `Textarea`, `FormField`, `DatePicker`, `Checkbox`, `RadioGroup`, `Switch`, `Select` e `Combobox`: controles de formulario acessiveis e temaveis.
- `Tooltip`, `Popover`, `DropdownMenu`, `Drawer`, `Toast` e `CommandPalette`: overlays e comandos baseados em primitives acessiveis quando necessario.
- `Breadcrumb`, `Pagination`, `Accordion`, `DataTable`, `Stepper`, `Avatar` e `Progress`: componentes estruturais e de navegacao para produto.

## Tokens e tema

Os componentes consomem CSS variables semanticamente temaveis em `src/styles.css`. O tema funciona por `data-theme="light"` e `data-theme="dark"` no root ou em um container isolado.

O Tailwind esta mapeado para utilities como `bg-background`, `text-content-primary`, `bg-primary`, `text-primary-foreground`, `ring-focus`, `px-sf-16` e `rounded-sf-md`, mantendo os tokens em runtime.
