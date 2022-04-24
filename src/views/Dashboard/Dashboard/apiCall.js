


const api_url = 'http://localhost:5500/public/contents.txt';

getJson()

async function getJson() {
  const response = await fetch(api_url);
  const data = await response.text();
  const result = data
  const results = JSON.parse(result)
}


export default getJson;