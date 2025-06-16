
import express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

admin.initializeApp();

const server = express();

// API endpoint example (Firestore)
server.get('/api/getData', async (_req, res) => {
  try {
    const snapshot = await admin.firestore().collection('projects').get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Let Next.js handle all other requests
server.all('*', (req, res) => {
  return handle(req, res);
});

export const nextApp = functions.https.onRequest(async (req, res) => {
  await app.prepare();
  return server(req, res);
});
