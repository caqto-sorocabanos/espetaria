exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Método não permitido' }) };
    }

    const body = JSON.parse(event.body || '{}');
    const { nome, telefone, endereco, items, total } = body;

    if (!nome || !telefone || !endereco || !items || !total) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Campos obrigatórios faltando' }) };
    }

    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const DATABASE_ID = process.env.NOTION_DATABASE_ID;

    if (!NOTION_API_KEY || !DATABASE_ID) {
      console.error('❌ Variáveis de ambiente faltando.');
      return { statusCode: 500, body: JSON.stringify({ error: 'Variáveis de ambiente NOTION_API_KEY ou NOTION_DATABASE_ID não configuradas' }) };
    }

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
          Nome: { title: [{ text: { content: nome } }] },
          Telefone: { rich_text: [{ text: { content: telefone } }] },
          Endereco: { rich_text: [{ text: { content: endereco } }] },
          Itens: { rich_text: [{ text: { content: items } }] },
          Total: { rich_text: [{ text: { content: total } }] }
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('❌ Erro Notion API:', errText);
      return { statusCode: 500, body: JSON.stringify({ error: 'Erro ao criar página no Notion', detalhes: errText }) };
    }

    console.log('✅ Pedido registrado com sucesso no Notion');
    return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Pedido registrado com sucesso' }) };

  } catch (error) {
    console.error('❌ Erro geral:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};