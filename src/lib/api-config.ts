import axios from 'axios';

export const RECRAFT_API_TOKEN = import.meta.env.VITE_RECRAFT_API_TOKEN;

if (!RECRAFT_API_TOKEN) {
  throw new Error('Missing RECRAFT_API_TOKEN environment variable');
}

export const api = axios.create({
  baseURL: 'https://external.api.recraft.ai/v1',
  headers: {
    'Authorization': `Bearer ${RECRAFT_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});