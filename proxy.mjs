import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors'; // Importa el middleware CORS

const app = express();
const port = 3000;

app.use(express.json());

// Habilita CORS para todas las solicitudes
app.use(cors());

app.post('/api/proxy', async (req, res) => {
  const url = 'https://urlscan.io/api/v1/scan/';
  const apiKey = '6d6bb659-037c-48e2-9c03-8435774e0753';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': apiKey,
      },
      body: JSON.stringify({ url: req.body.url }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al realizar la solicitud a la API' });
  }
});

app.listen(port, () => {
  console.log(`Servidor proxy en ejecución en el puerto ${port}`);
});
