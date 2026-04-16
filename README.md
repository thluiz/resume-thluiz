# Resume — Thiago Luiz Silva

![resume-template](./preview.png "My Resume")

🌐 [resume.thluiz.com](https://resume.thluiz.com)

Currículo interativo (site Gatsby) + exports estáticos em HTML/PDF gerados a partir da mesma fonte de dados (`data/jsonresume.json` no formato [JSON Resume](https://jsonresume.org/)).

Baseado em [Gatsby Starter Resume CMS](https://github.com/barancezayirli/gatsby-starter-resume-cms) de [Baran Cezayirli](https://twitter.com/barancezayirli).

## Development

```bash
npm install          # primeira vez
npm run develop      # http://localhost:8000
npm run build        # output em ./public
```

Requisitos: Node.js 18 (o build usa `NODE_OPTIONS=--openssl-legacy-provider` para compatibilidade com o Gatsby 2.x antigo).

## Deploy

**resume.thluiz.com** servido via AWS S3 + CloudFront (us-east-1). Pushes para `master` disparam o workflow GitHub Actions (`.github/workflows/deploy.yml`), que corre `npm run build`, sync `public/` para S3 com cache em camadas (HTML 1h, assets 1y immutable) e invalida a distribution.

## Generate PDF / alternative themes

Há dois fluxos paralelos de geração:

1. **Site interativo** (Gatsby, dados em `data/profile.json`) — publicado em `resume.thluiz.com`.
2. **Exports estáticos** (JSON Resume, dados em `data/jsonresume.json`) — HTML e PDF prontos para enviar.

Para regenerar os exports:

```bash
bash generate-resume.sh
```

O script gera `resume-stackoverflow.html` + variantes nos temas `elegant` e `class`, aplica fixes de pós-processamento (light mode, barras de skills completas, layout de impressão) e produz `resume.pdf` via Chrome headless (puppeteer-core).

Detalhes, fontes de tema e fixes manuais: ver [`RESUME-GENERATION.md`](./RESUME-GENERATION.md).

## Customizações sobre o template do Cezayirli

- **Summary**: permite tags HTML
- **Experience**: descrições multi-parágrafo; lista "Key Achievements" com label customizável
- **Projects**: título e subtítulo da secção; campo `technologies`; descrições multi-parágrafo; múltiplos links por projeto com label customizável
- **Education**: subtítulo; link da instituição

## License

MIT (código) — ver [LICENSE](./LICENSE). Conteúdo do currículo (`data/`) é direito autoral do autor.
