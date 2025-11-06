# Projeto corrigido - Loja exemplo

Arquivos corrigidos prontos para subir na raiz do repositório GitHub e usar com Netlify.

**Instruções rápidas**:
1. Coloque estes arquivos na raiz do seu repositório GitHub:
   - index.html
   - styles.css
   - app.js
   - package.json
   - netlify.toml
   - netlify/functions/enviarParaNotion.js

2. No Netlify, ao conectar o repositório:
   - Em *Build settings*: deixe **Build command** vazio (já que não há build) ou use `npm run build` (não faz nada).
   - **Publish directory**: deixe como `.` (raiz) — conforme netlify.toml.
   - Configure as variáveis de ambiente: `NOTION_API_KEY` e `NOTION_DATABASE_ID` para permitir que a função crie páginas no Notion.

3. Teste localmente:
   - Para testar o front-end, abra o `index.html` no navegador (ou rode `npm start` e acesse o servidor).
   - Para testar a função Netlify localmente use o Netlify CLI: `netlify dev` (requer instalação do Netlify CLI).

---

Se quiser, posso:
- Adicionar validação extra no frontend;
- Gerar um `actions` workflow para deploy automático;
- Ou empacotar de forma diferente (ex.: colocar os arquivos em `dist/` com build).
