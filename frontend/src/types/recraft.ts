export type ImageSize = 'small' | 'medium' | 'large';
export type ToolType = 'generate' | 'vectorize' | 'removeBackground' | 'clarityUpscale' | 'generativeUpscale';
export type StyleType = 'preset' | 'custom';

export interface Controls {
  prompt_strength?: number;
  guidance_scale?: number;
  num_inference_steps?: number;
  negative_prompt?: string;
}

export interface RecraftGenerateParams {
  prompt: string;
  style_id?: string;
  size?: ImageSize;
  controls?: Controls;
  negative_prompt?: string;
}

export interface FileUploadParams {
  file: File;
  tool: ToolType;
  style_id?: string;
  controls?: Controls;
}

export interface CreateStyleParams {
  name: string;
  type: StyleType;
  parameters: Controls;
}

export interface StyleResponse {
  id: string;
  name: string;
  type: StyleType;
  parameters: Controls;
  created_at: string;
}

export interface RecraftResponse {
  id: string;
  status: 'success' | 'error';
  url?: string;
  error?: string;
  metadata?: {
    prompt?: string;
    style_id?: string;
    controls?: Controls;
    tool?: ToolType;
  };
} 