import axios from 'axios';
import type { RecraftGenerateParams, RecraftResponse } from '@/types/recraft';

const RECRAFT_API_TOKEN = import.meta.env.VITE_RECRAFT_API_TOKEN;

if (!RECRAFT_API_TOKEN) {
  throw new Error('Missing RECRAFT_API_TOKEN environment variable');
}

const api = axios.create({
  baseURL: 'https://external.api.recraft.ai/v1',
  headers: {
    'Authorization': `Bearer ${RECRAFT_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export async function generateImage(params: RecraftGenerateParams): Promise<RecraftResponse> {
  try {
    const response = await api.post('/images/generations', {
      ...params,
      model: params.model || 'recraftv3',
      response_format: params.response_format || 'url',
      size: params.size || '1024x1024',
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to generate image');
    }
    throw new Error('Failed to generate image');
  }
}