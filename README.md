# Loja Corrigida v2

✅ Corrigido:
- Erro 404 do favicon (favicon embutido inline no HTML)
- Erro 500 da função `enviarParaNotion` com logs e validações aprimoradas
- Estrutura de pastas compatível com Netlify (`netlify/functions/...`)
- Instruções claras para configurar as variáveis de ambiente

**Instruções:**
1. Suba todos os arquivos na raiz do GitHub (inclusive a pasta `netlify`).
2. No Netlify, configure as variáveis de ambiente:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
3. Faça o deploy novamente.

Para testar localmente:
```
npm install
npm start
# ou
netlify dev
```
