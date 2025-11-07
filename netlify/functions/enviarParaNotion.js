exports.handler = async (event) => {
  try {
    console.log('Iniciando função enviarParaNotion...');

    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Método não permitido' }) };
    }
    const body = JSON.parse(event.body || '{}');
    const { nome, telefone, endereco, items, total } = body;
    if (!nome || !telefone || !endereco || !items || !total)
      return { statusCode: 400, body: JSON.stringify({ error: 'Campos obrigatórios faltando' }) };

    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const DATABASE_ID = process.env.NOTION_DATABASE_ID;
    console.log('NOTION_API_KEY:', !!NOTION_API_KEY, 'DATABASE_ID:', !!DATABASE_ID);

    if (!NOTION_API_KEY || !DATABASE_ID)
      return { statusCode: 500, body: JSON.stringify({ error: 'Variáveis de ambiente não configuradas' }) };

    const payload = {
      parent: { database_id: DATABASE_ID },
      properties: {
        Nome: { title: [{ text: { content: String(nome) } }] },
        Telefone: { rich_text: [{ text: { content: String(telefone) } }] },
        Endereco: { rich_text: [{ text: { content: String(endereco) } }] },
        Itens: { rich_text: [{ text: { content: String(items) } }] },
        Total: { rich_text: [{ text: { content: String(total) } }] }
      }
    };

    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(payload)
    });

    const text = await notionRes.text();
    console.log('Resposta Notion status:', notionRes.status);
    console.log('Resposta corpo:', text);

    if (!notionRes.ok)
      return { statusCode: 500, body: JSON.stringify({ error: 'Erro ao criar página no Notion', status: notionRes.status, body: text }) };

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error('Erro inesperado:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};