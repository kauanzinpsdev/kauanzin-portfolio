# Kauan Santos — Portfólio

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # confere tipos e gera a versão final em /dist
npm run preview  # testa a versão final
```

## Onde editar
- Contatos e links: `src/data/site.ts`
- Projetos: `src/data/projects.ts`. Hoje são 3 projetos conceito com mockups desenhados em código (`src/components/mockups/`). Para usar uma screenshot real, adicione `image`; para um site publicado, adicione `url` (o botão "Ver projeto" passa a abrir o link). Com a lista vazia, a seção mostra "Novos projetos estão chegando".
- Vídeo/imagem do Hero: `src/assets/` (`hero.mp4`, `hero-mobile.mp4`, `hero-poster*.jpg`)
- Depois de publicar: em `index.html`, troque `/og-image.jpg` pela URL completa da imagem.
