import axios from 'axios';
import type { RecraftGenerateParams, RecraftResponse, FileUploadParams, CreateStyleParams, StyleResponse } from '@/types/recraft';

const RECRAFT_API_TOKEN = import.meta.env.VITE_RECRAFT_API_TOKEN;

if (!RECRAFT_API_TOKEN) {
  throw new Error('Missing RECRAFT_API_TOKEN environment variable');
}

const api = axios.create({
  baseURL: 'https://external.api.recraft.ai/v1',
  headers: {
    'Authorization': `Bearer ${RECRAFT_API_TOKEN}`,
  },
});

export async function generateImage(params: RecraftGenerateParams): Promise<RecraftResponse> {
  try {
    const response = await api.post('/images/generations', {
      ...params,
      model: params.model || 'recraftv3',
      response_format: params.response_format || 'url',
      size: params.size || '1024x1024',
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to generate image');
    }
    throw new Error('Failed to generate image');
  }
}

export async function vectorizeImage(params: FileUploadParams): Promise<RecraftResponse> {
  try {
    const formData = new FormData();
    formData.append('file', params.file);
    if (params.response_format) {
      formData.append('response_format', params.response_format);
    }

    const response = await api.post('/images/vectorize', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return { data: [{ url: response.data.image.url }] };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to vectorize image');
    }
    throw new Error('Failed to vectorize image');
  }
}

export async function removeBackground(params: FileUploadParams): Promise<RecraftResponse> {
  try {
    const formData = new FormData();
    formData.append('file', params.file);
    if (params.response_format) {
      formData.append('response_format', params.response_format);
    }

    const response = await api.post('/images/removeBackground', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return { data: [{ url: response.data.image.url }] };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to remove background');
    }
    throw new Error('Failed to remove background');
  }
}

export async function clarityUpscale(params: FileUploadParams): Promise<RecraftResponse> {
  try {
    const formData = new FormData();
    formData.append('file', params.file);
    if (params.response_format) {
      formData.append('response_format', params.response_format);
    }

    const response = await api.post('/images/clarityUpscale', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return { data: [{ url: response.data.image.url }] };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to upscale image');
    }
    throw new Error('Failed to upscale image');
  }
}

export async function generativeUpscale(params: FileUploadParams): Promise<RecraftResponse> {
  try {
    const formData = new FormData();
    formData.append('file', params.file);
    if (params.response_format) {
      formData.append('response_format', params.response_format);
    }

    const response = await api.post('/images/generativeUpscale', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return { data: [{ url: response.data.image.url }] };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to upscale image');
    }
    throw new Error('Failed to upscale image');
  }
}

export async function createStyle(params: CreateStyleParams): Promise<StyleResponse> {
  try {
    const formData = new FormData();
    formData.append('style', params.style);
    params.files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    const response = await api.post('/styles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to create style');
    }
    throw new Error('Failed to create style');
  }
}