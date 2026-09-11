target: the components
total_score: 20
max_score: 40
na_heuristics:
p0_count: 2
p1_count: 2
target_identity: "file:/home/luiswagnerab/Projetos/Skyforge/skyforge-ui/src/components"
timestamp: 2026-09-05T18-18-12Z
slug: src-components
---

**Método: agente duplo (A: aff045583b6dec7fc · B: a312a58b61d907dcd)**
**Alvo:** `src/components` — 26 componentes · Skyforge UI · Modo Operate

## Pontuação de Saúde do Design

| # | Heurística | Pontuação | Problema principal |
|---|------------|-----------|--------------------|
| 1 | Visibilidade do Status do Sistema | 2 | `loading` existe em 3 de 26 componentes. O modo indeterminado de `Progress` renderiza uma barra estática de 42% com `animate-pulse` (`Progress.tsx:101`) — uma porcentagem falsa que nunca muda. AutoComplete/Select/MultiSelect/DatePicker não possuem estado de loading. |
| 2 | Correspondência entre o Sistema e o Mundo Real | 2 | `DatePicker` fixa `DD-MM-YYYY` (`DatePicker.tsx:51`) independentemente de `locale`. `Spinner tone="primary"` é teal, enquanto `Button variant="primary"` é carbon black. |
| 3 | Controle e Liberdade do Usuário | 2 | `Alert` não possui dismiss nem `onClose` (`Alert.tsx:23-28`). AutoComplete (`:221`) e DatePicker forçam o popover a abrir em `onFocus`, sem opção para desativar esse comportamento. |
| 4 | Consistência e Padrões | 1 | `accent` é teal em Badge/Avatar e carbon com 10% de opacidade em Tag/Chip. `className` é aplicado ao controle em Input/Select e ao wrapper em AutoComplete/MultiSelect. Existem três implementações separadas de status de campo. |
| 5 | Prevenção de Erros | 1 | `utils/cn.ts:1-3` é `filter(Boolean).join(" ")` — sem tailwind-merge, então overrides de `className` feitos pelo consumidor são resolvidos pela ordem da stylesheet em todos os 26 componentes. `required` nunca chega a nenhum controle. |
| 6 | Reconhecimento em vez de Memorização | 2 | É necessário usar a combinação `label={null} helperText={null}` para aninhar um campo em `FormField`. Saber quais componentes aceitam `containerClassName` ou quais possuem `size="sm"` depende de memorização. |
| 7 | Flexibilidade e Eficiência de Uso | 2 | `Input`/`Select`/`Textarea` não possuem tamanho `sm` (`Input.tsx:19`). Não existe `Card`, apesar de `DESIGN_SYSTEM_RULES.md:285-287`. Table não possui prop para ordenação ou seleção de linha. |
| 8 | Design Estético e Minimalista | 2 | A sombra `.sf-premium-control` aparece em 30 pontos distribuídos por 18 arquivos, contrariando uma identidade declaradamente baseada em bordas. Cabeçalho e rodapé de `Table` recebem tonalidade da família linen. |
| 9 | Recuperação de Erros | 3 | `errorText` → `aria-describedby` + `aria-invalid` está corretamente conectado em nove componentes. Porém, `Radio` não possui nada disso (`Radio.tsx:18-24`). |
| 10 | Ajuda e Documentação | 3 | Registro de componentes, `autodocs` em todas as 26 stories e painel de swatches de Foundations. Porém, apenas 3 de 26 stories possuem testes `play`, e a matriz de estados obrigatória não existe. |
| **Total** | | **20/40** | **Aceitável — melhorias significativas são necessárias** |

## Veredito sobre a Especificidade do Design

**Avaliação do LLM:** Um wrapper Radix/shadcn bem tokenizado vestindo um manifesto que ele próprio não segue. O ponto de vista existe em `design-tokens.json`, `src/styles.css` e `DESIGN_SYSTEM_RULES.md` — e desaparece assim que se entra em `src/components/`.

O principal indício é `.sf-premium-control` (`styles.css:575-591`): uma sombra ambiente aplicada a todos os Button, Input, Textarea, trigger de Select, Checkbox, Radio, Switch, Avatar, track de Progress, lista de Tabs, botão de Pagination, trigger de DropdownMenu, navegação de DatePicker e fechamento de Modal — 30 ocorrências. PRODUCT.md afirma que sombras são reservadas para camadas flutuantes. As regras dizem: "Se tudo está elevado, nada está elevado" (`DESIGN_SYSTEM_RULES.md:180`). Ainda assim, `sf-premium-surface` (= `--shadow-2`, o token de popover) aparece em um `Alert` inline (`Alert.tsx:84`), uma `Table` (`Table.tsx:62`) e um `AccordionItem` (`Accordion.tsx:24`) — nenhum deles flutua. A classe é chamada de *premium* em uma biblioteca cuja governança proíbe tratamento premium em superfícies operacionais (`DESIGN_SYSTEM_RULES.md:278-279`).

O vocabulário de movimento confirma isso: `hover:-translate-y-px` + `active:scale-[0.98]` em Button, Select, MultiSelect, Checkbox, Radio, Switch, trigger de Tabs, Pagination, DropdownMenu, células de DatePicker, fechamento de Modal e AvatarGroup. `Button.tsx:71` faz o ícone se mover, elevar e escalar de forma independente. Um checkbox que levita no hover não é brutalismo contido; é o hover-lift SaaS de 2021, e esse é o gesto mais repetido na base de código. Todos os botões usam `rounded-sf-full` — geometria de pill que as regras restringem a CTAs premium e proíbem em toolbar densa, linha de tabela, tarefa e controles destrutivos (`DESIGN_SYSTEM_RULES.md:277-279`).

O que realmente possui autoria: a variante `editorial` de Button, o trilho esquerdo de 4px de Alert, o traço primário simples de TableEmpty, o comentário de z-index em `styles.css:42-45`, a observação de WCAG 1.4.11 de `--color-control-border` e o bloco `forced-colors`. Cinco momentos de autoria real em 6.687 linhas. Remova as sombras e o raio pill e existe, por baixo, um sistema genuinamente distinto e orientado por bordas.

**Varredura determinística:** Varredura estática de `src/components`: **1 ocorrência** — `side-tab` em `Table.tsx:114` (`border-l-4`), um **falso positivo** (um marcador de linha `data-selected=true`, não um destaque de card). `src/stories`: limpo. **Zero cores hardcoded** em `src/components/**/*.tsx`. Console: 0 erros, 0 warnings em 173 mensagens.

Varreduras renderizadas em 16 URLs de stories, nos dois temas: 12 ocorrências em componentes — `cramped-padding` ×2 e `nested-cards` ×2 nos estados de Table, `marquee` ×1 em Table (falso positivo: shimmer de `.sf-skeleton::after`), `cramped-padding` ×1 em Tabs (falso positivo: alinhamento rente à borda faz parte do design de tabs com underline). Button, Input, Select, Modal, Alert, DatePicker, MultiSelect, AutoComplete, DropdownMenu, Badge, Progress, Checkbox e Tooltip: limpos nos dois temas. A story de documentação Foundations retornou mais 10 ocorrências, mas isso é documentação, não componentes distribuídos.

**O ponto em que eles discordam importa mais do que aquele em que concordam.** O detector permanece praticamente silencioso enquanto a revisão de design atribui 20/40. Todos os defeitos aqui são sistêmicos e internamente consistentes: uma sombra errada aplicada uniformemente, um raio errado aplicado uniformemente, uma colisão de tokens, um estado ausente. Detectores de padrões encontram descuidos locais. Esta biblioteca não possui isso. Ela possui uma execução coerente de um design diferente daquele que documenta.

**Overlays visuais:** A injeção funcionou. Servidor ativo na porta 8400, `detect.js` carregado, 10 globais registrados, 17 nós de overlay, `impeccableDetectAsync()` retornou 9 grupos de elementos em Foundations — consistente com a varredura por URL da CLI. Tanto o servidor ativo quanto o Storybook foram encerrados antes do relatório.

Dois efeitos colaterais da Avaliação B: um Storybook preexistente na porta 6006 foi encerrado pelo padrão de limpeza do agente. E o commit `2c524db "refactor: audit ajust"` foi aplicado por outro ator no meio da sessão; todas as medições se referem a essa árvore.

## Impressão Geral

A engenharia é melhor do que a disciplina de design. A cobertura de tokens é total, a infraestrutura de acessibilidade da família de campos está acima da média comercial, e o tratamento de `forced-colors` é algo que quase ninguém implementa corretamente. Depois disso, porém, os componentes aplicam um tratamento de sombra e elevação que as próprias regras do projeto proíbem, em praticamente todos os controles.

A maior oportunidade não é adicionar nada. Remova `.sf-premium-control`, elimine o hover-lift e retire o formato pill dos botões operacionais — e o sistema orientado por bordas que `styles.css` já descreve finalmente se torna visível.

## O que está funcionando

1. **O contrato de foco supera o de muitas bibliotecas comerciais.** `styles.css:308-314` dá a todo elemento focável — inclusive markup do próprio consumidor — um outline de 2px com `--color-focus`. `styles.css:316-331` o restabelece como um `outline` real sob `@media (forced-colors: active)`, porque as utilities `ring-*` do Tailwind são box-shadows que o Windows High Contrast não renderiza. Medido em execução: **5,03:1 no tema claro, 7,79:1 no escuro**, em 27 de 30 paradas de tabulação, verificadas por navegação real com Tab (49 eventos de foco por tema).

2. **`utils/fieldStatus.ts:26-37` é a abstração correta.** Ele reduz `errorText`, `status="error"` explícito e `aria-invalid` bruto a uma única verdade resolvida. Select, AutoComplete, MultiSelect e DatePicker passam por essa lógica e emitem `aria-invalid`, `data-invalid`, `data-status` e um `feedbackId` incorporado em `aria-describedby`.

3. **O modelo de teclado do calendário de DatePicker é escrito manualmente e completo.** Arrow keys, Home, End, PageUp e PageDown com rollover correto de limites de mês, `tabIndex` móvel e um mapa `dayButtonRefs` que refoca a célula correta após a nova renderização. Navegação de grid em nível APG que a maioria das bibliotecas terceiriza.

## Problemas Prioritários

### [P0] Tema escuro: todas as variantes `filled` de campos possuem limite visual inexistente

**O quê:** `styles.css:201` define `--color-surface-sunken: 24 24 26` — byte a byte idêntico a `--color-background` na linha 197. No tema claro eles diferem (236 236 238 vs 246 246 247). Toda variante `filled` usa `border-transparent bg-surface-sunken`, portanto, no tema escuro, mede **1,00:1** de contraste entre o preenchimento e a página, com borda transparente. Afeta Input (`:41`), Select (`:41`), Textarea (`:28`), MultiSelect (`:44`), AutoComplete (`:46`) e DatePicker (`:167`).

**Por que importa:** PRODUCT.md se compromete com contraste suficiente dos limites de controles nos dois temas. WCAG 1.4.11 exige 3:1. Aqui é 1,00. No tema claro é 1,09 — também falha. Um usuário de uma aplicação Skyforge em tema escuro não consegue perceber onde clicar, e todos os projetos consumidores herdam exatamente o mesmo problema.

**Correção:** Dê ao `--color-surface-sunken` escuro um valor distinto e use uma borda real `--color-control-border` ≥3:1 na variante `filled` nos dois temas, em vez de `border-transparent`. Adicione uma story em Foundations que garanta `sunken ≠ background` por tema.

**Comando sugerido:** `/impeccable audit`, depois `/impeccable harden`

### [P0] Todos os overlays renderizados via portal escapam do `ThemeProvider`

**O quê:** `src/theme/ThemeProvider.tsx:11-17` escreve `data-theme` em uma `div` wrapper. Modal, Select, DropdownMenu, Tooltip, DatePicker, AutoComplete e MultiSelect fazem portal para `document.body` — fora dessa `div` — e passam a resolver as variáveis do tema claro em `:root`.

**Por que importa:** Uma aplicação Skyforge em modo escuro abre modais e dropdowns brancos. Paridade entre temas é um comportamento central do produto e um compromisso duradouro de marca. Pior: `.storybook/preview.tsx:24-27` define o tema em `documentElement`, portanto a principal superfície de revisão da biblioteca estruturalmente não consegue reproduzir o bug.

**Correção:** Escreva `data-theme` em `document.documentElement` dentro de um effect (mantenha a `div` para escopo aninhado), use por padrão `matchMedia("(prefers-color-scheme: dark)")` em vez de `"light"` hardcoded e persista em `localStorage` dentro de um `try/catch`. Adicione uma story que monte `ThemeProvider theme="dark"` e abra um Modal.

**Comando sugerido:** `/impeccable harden`

### [P1] `sf-premium-control` contradiz a identidade declarada em 30 pontos

**O quê:** `styles.css:575-591` aplica `box-shadow: 0 10px 28px …` a todos os controles interativos, aprofundando a sombra no hover. `sf-premium-surface` aplica `--shadow-2`, equivalente a popover, em Alert, Table e AccordionItem. Ambas ficam fora de `@layer base`, portanto têm precedência sobre qualquer utility Tailwind que um consumidor tente usar para removê-las.

**Por que importa:** Essa é a decisão que torna a biblioteca genérica. Ela viola a regra de sombras de PRODUCT.md e quatro linhas distintas de `DESIGN_SYSTEM_RULES.md`. Em conjunto com o raio pill e o hover-lift, ela transforma um sistema brutalista orientado por bordas em um kit SaaS com hover-lift.

**Correção:** Exclua `.sf-premium-control` e remova-a dos 30 pontos; deixe as bordas e `--color-control-border` definirem o limite dos controles. Mantenha `sf-premium-surface` apenas em conteúdo de popovers e Modal; remova-a de `Alert.tsx:84`, `Table.tsx:62` e `Accordion.tsx:24`. Troque `hover:-translate-y-px` / `hover:scale-*` por mudanças tonais e de borda conforme `DESIGN_SYSTEM_RULES.md:240`; mantenha transformações `active:`. Remova o formato pill dos botões operacionais conforme `:277-279`.

**Comando sugerido:** `/impeccable distill`

### [P1] MultiSelect parece um listbox, mas na prática é um conjunto de botões toggle

**O quê:** `MultiSelect.tsx:159-196` renderiza o conteúdo do popover sem `role="listbox"` e as opções como `<button aria-pressed>`, sem `role="option"`. O trigger (`:124-137`) não possui `aria-expanded`, `aria-haspopup` nem `aria-controls`. Radix Popover não fornece foco móvel, então cada opção vira sua própria parada de Tab, sem arrow keys e sem type-ahead.

**Por que importa:** Um usuário de leitor de tela ouve "button, pressed" — sem indicação de lista, quantidade ou total selecionado. Um usuário de teclado precisa pressionar Tab em todas as N opções para sair. `AutoComplete.tsx:210-215` implementa corretamente o padrão combobox no mesmo repositório, portanto isso é uma falha de consistência, não uma lacuna de conhecimento.

**Correção:** Use `role="listbox" aria-multiselectable="true"` no conteúdo, `role="option" aria-selected` nos itens, `aria-expanded`/`aria-haspopup="listbox"`/`aria-controls` no trigger e implemente `aria-activedescendant` com um handler de setas semelhante a `AutoComplete.tsx:143-179` ou um `tabIndex` móvel. Dê ao trigger um resumo acessível.

**Comando sugerido:** `/impeccable harden`

### [P2] A saída de emergência via `className` não funciona, e `required`/`readOnly` estão especificados, mas ausentes

**O quê:** `utils/cn.ts:1-3` é `filter(Boolean).join(" ")`, portanto overrides de `className` feitos pelo consumidor são resolvidos pela ordem da stylesheet em todos os 26 componentes; `Button.stories.tsx:85` documenta `className="w-sf-40 px-0"` como padrão de botão apenas com ícone, e isso funciona apenas por sorte na ordem. `required` existe apenas em `FormField`, renderiza um asterisco com `aria-hidden` e está ausente de `FormFieldRenderProps`. `readOnly` possui zero implementação, apesar de `--color-field-bg-readonly` estar definido nos dois temas e exposto em `tailwind.config.ts:56`.

**Por que importa:** Um campo obrigatório é invisível para tecnologias assistivas — o usuário envia o formulário e só então descobre que o campo era obrigatório. Sem um tratamento canônico, cada projeto Skyforge inventa seu próprio asterisco e seu próprio cinza para somente leitura. Esse tipo de divergência é justamente aquilo que a biblioteca deveria evitar.

**Correção:** Troque `cn` por `twMerge` com uma configuração que registre as escalas `sf-*`; remova `!rounded-none` de `Tabs.tsx:33`; adicione uma prop `iconOnly` de primeira classe em Button. Adicione `required` aos nove componentes de campo — asterisco no label e `aria-required` no controle — e em `FormFieldRenderProps`. Implemente `readOnly` em Input/Textarea/DatePicker usando o token que já existe.

**Comando sugerido:** `/impeccable shape`, depois `/impeccable optimize`

## Sinais de Alerta por Persona

**Alex (desenvolvedor consumindo a biblioteca rapidamente)**

- `Input.tsx:19` oferece apenas `md | lg`. Uma barra de filtros densa com `<Button size="sm">` (32px) ao lado de `<Input>` (mínimo de 40px) não consegue alinhar. Select, Textarea, AutoComplete, MultiSelect e DatePicker possuem a mesma lacuna.
- `AutoComplete.tsx:55`, `MultiSelect.tsx:53` e `FormField.tsx:22` não são `forwardRef`. O `register()` do `react-hook-form` falha silenciosamente em três dos nove componentes de campo.
- Nove componentes que carregam valor, seis formatos de change handler: `onValueChange(value)`, `onValueChange(value, option)`, `onDateChange`, `onPageChange`, `onRemove`, além de `onCheckedChange` do Radix.
- `DropdownMenuTrigger` possui `h-sf-40` fixo e apenas `secondary | ghost`. Nenhum dropdown cabe em uma toolbar de 32px.
- `utils/aliases.ts:16-33` aceita `danger`↔`error`, `variant`↔`tone`, `ghost`↔`plain`, `default`↔`comfortable`. Quatro conceitos possuem duas grafias cada, sem indicar qual é a canônica.

**Sam (usuário final dependente de acessibilidade nas aplicações construídas com a biblioteca)**

- Tema escuro, qualquer campo `filled`: limite de 1,00:1 — medido. Ele não consegue localizar o input.
- `MultiSelect.tsx:172-178`: "button, pressed" em vez de "option, selected, 2 of 8". Sem semântica de lista, N paradas de Tab.
- `Pagination.tsx:107`: a página atual está `disabled`, portanto não recebe foco, portanto seu `aria-current="page"` nunca é anunciado.
- `Avatar.tsx:47-52`: `busy`, `away` e `offline` são comunicados apenas pela cor de um ponto dentro de `aria-hidden="true"`. `DESIGN_SYSTEM_RULES.md:158` proíbe exatamente isso.
- Três containers focáveis não possuem styling de foco: a `div role="radiogroup"` nos estados de Radio e duas `div role="tablist"` em Tabs. Os tabpanels estão corretamente estilizados; o problema é somente nos containers.
- Texto desabilitado no tema escuro mede 3,41:1, enquanto no claro mede 5,54:1. WCAG isenta controles desabilitados, portanto não é uma falha de conformidade — mas a story afirma "Disabled values remain readable", e o tema escuro é materialmente pior do que a intenção declarada.
- `Radio.tsx:18-24`: sem `errorText`, sem `aria-invalid` e sem styling de estado inválido.

**Luis (único autor, precisa que isso se sustente por anos e entre diferentes projetos)**

- **Não existe `Card`.** `DESIGN_SYSTEM_RULES.md:285-287` o especifica, `:251` o exige para considerar o sistema completo e `--component-card-padding: 24px` permanece sem uso em `styles.css:76`. Cada aplicação precisa improvisar seu próprio Card.
- **`accent` já significa duas coisas em uma mesma versão.** Badge e Avatar renderizam teal; Tag e Chip renderizam carbon com 10%.
- **Escalas de tamanho mortas que aparentam estar ativas.** `Radio.tsx:31-34` mapeia tanto `sm` quanto `md` para `h-sf-8`; `Pagination.tsx:26-29` mapeia ambos para `h-sf-16`.
- **`utils/aliases.ts` institucionaliza a divergência em vez de eliminá-la.** A justificativa é não quebrar projetos consumidores — na versão 0.3.0, com um consumidor. Esta é a ocasião mais barata que essa renomeação terá.
- **Três implementações de status de campo.** `Input.tsx:51-63` e `Textarea.tsx:37-49` contêm cópias literais daquilo que `utils/fieldStatus.ts` já exporta para outros quatro componentes.

## Observações Menores

- **O estado vazio da Table fica fora da tela em 375px.** `Table.tsx:78` define `min-w-[640px]`; `Table.tsx:176` centraliza o bloco vazio. Medição: a célula ocupa 640px dentro de um scroller de 277px, então o bloco centralizado fica em x≈369 — fora do viewport. Todo o restante em 375px está limpo: 0px de overflow da página em todas as stories, 0 alvos menores que 24×24px, Modal correto em 341–343px com botões do footer empilhados.
- Contraste de placeholder em DatePicker e AutoComplete `filled`: 4,17:1, abaixo de 4,5. Placeholders no tema escuro não foram medidos.
- Inputs de texto `ghost` não possuem limite perceptível em nenhum dos temas quando estão vazios.
- Bordas de sucesso/warning/invalid medem 1,6–2,2:1 como sinal de estado. Cada estado também possui ícone e helper text, portanto o estado não é comunicado apenas por cor — porém a borda praticamente não exerce função perceptual.
- `Select.tsx:94` e `MultiSelect.tsx:90` calculam um `errorId` que nunca é utilizado.
- `Modal.tsx:50` possui `ring-1 ring-inset ring-surface-raised` — uma sombra inset da mesma cor do fundo, proibida por `DESIGN_SYSTEM_RULES.md:184-185`. `Progress.tsx:128` possui o mesmo problema.
- `Tooltip.tsx:19-25` retorna silenciosamente `null` quando `children` não é uma string.
- `p-sf-20` em `Alert.tsx:84` usa um token de sizing como spacing, fora da escala aprovada.
- `Textarea.tsx:33-34` usa `min-h-[96px]`/`min-h-[128px]` brutos, apesar de `sf-96` e `sf-128` existirem.
- Header/Body/Footer de `Modal` são funções simples, enquanto Title/Description são `forwardRef`. A mesma divisão aparece em `AvatarGroup` e `DropdownMenuShortcut`.
- `DatePicker` usa `role="row"` em elementos `display:contents`, combinação que historicamente pode desaparecer da árvore de acessibilidade.

## Questões para Considerar

1. Seu documento de regras proíbe tratamento premium em superfícies operacionais, mas sua classe CSS mais reutilizada se chama `sf-premium-control`. Qual deles representa o sistema real?
2. Se um desconhecido instalasse o pacote com sombras e raios pill removidos, cite três componentes que ainda pareceriam claramente seus. Se você não consegue citar três, a identidade está em `design-tokens.json`, não na biblioteca.
3. `utils/aliases.ts` adia uma renomeação para evitar quebrar consumidores, na versão 0.3.0, com um único consumidor. Quanto essa renomeação custa agora, e quanto custará na 1.0?
4. Os temas do Storybook são aplicados via `documentElement`; `ThemeProvider` aplica tema por meio de uma `div` wrapper. O que mais o seu ambiente de revisão é estruturalmente incapaz de mostrar?
5. `DESIGN_SYSTEM_RULES.md:251` afirma que a biblioteca não está completa sem uma matriz de estados de Card. Card não existe. Quais outras regras nesse arquivo são atualmente aspiracionais, e não obrigatórias?