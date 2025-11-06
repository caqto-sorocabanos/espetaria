const fetch=require('node-fetch');
exports.handler=async(event)=>{try{if(event.httpMethod!=='POST'){return{statusCode:405,body:JSON.stringify({error:'Method not allowed'})};}
const body=JSON.parse(event.body||'{}');const{nome,telefone,endereco,items,total}=body;
if(!nome||!telefone||!endereco||!items||!total){return{statusCode:400,body:JSON.stringify({error:'Campos obrigatórios faltando'})};}
const NOTION_API_KEY=process.env.NOTION_API_KEY;const DATABASE_ID=process.env.NOTION_DATABASE_ID;
if(!NOTION_API_KEY||!DATABASE_ID){return{statusCode:500,body:JSON.stringify({error:'Variáveis de ambiente não configuradas'})};}
const notionRes=await fetch('https://api.notion.com/v1/pages',{method:'POST',headers:{'Authorization':`Bearer ${NOTION_API_KEY}`,'Content-Type':'application/json','Notion-Version':'2022-06-28'},body:JSON.stringify({parent:{database_id:DATABASE_ID},properties:{Nome:{title:[{text:{content:String(nome)}}]},Telefone:{rich_text:[{text:{content:String(telefone)}}]},Endereço:{rich_text:[{text:{content:String(endereco)}}]},Itens:{rich_text:[{text:{content:String(items)}}]},Total:{rich_text:[{text:{content:String(total)}}]}}})});
if(!notionRes.ok){const errText=await notionRes.text();console.error('Notion API error:',errText);return{statusCode:500,body:JSON.stringify({error:'Erro ao criar página no Notion',detail:errText})};}
return{statusCode:200,body:JSON.stringify({success:true})};}catch(error){console.error('Erro na função:',error);return{statusCode:500,body:JSON.stringify({error:error.message})};}};