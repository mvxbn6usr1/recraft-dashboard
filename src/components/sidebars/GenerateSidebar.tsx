import { useState } from 'react';
import { Wand2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { STYLES, IMAGE_SIZES, RECRAFT_V3_SUBSTYLES, RECRAFT_20B_SUBSTYLES } from '@/lib/constants';
import type { RecraftGenerateParams, StyleType, RecraftModel, RGB } from '@/types/recraft';

interface GenerateSidebarProps {
  onGenerate: (params: RecraftGenerateParams) => Promise<void>;
  loading: boolean;
}

export function GenerateSidebar({ onGenerate, loading }: GenerateSidebarProps) {
  const [params, setParams] = useState<RecraftGenerateParams>({
    prompt: '',
    style: 'realistic_image',
    model: 'recraftv3',
    size: '1024x1024',
    controls: {
      colors: [],
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(params);
  };

  const getSubstyles = (style: StyleType, model: RecraftModel) => {
    if (model === 'recraftv3') {
      return RECRAFT_V3_SUBSTYLES[style] || [];
    }
    return RECRAFT_20B_SUBSTYLES[style] || [];
  };

  const addColor = () => {
    setParams(prev => ({
      ...prev,
      controls: {
        ...prev.controls,
        colors: [...(prev.controls?.colors || []), { rgb: [0, 0, 0] }],
      },
    }));
  };

  const removeColor = (index: number) => {
    setParams(prev => ({
      ...prev,
      controls: {
        ...prev.controls,
        colors: prev.controls?.colors?.filter((_, i) => i !== index) || [],
      },
    }));
  };

  const updateColor = (index: number, color: RGB) => {
    setParams(prev => ({
      ...prev,
      controls: {
        ...prev.controls,
        colors: prev.controls?.colors?.map((c, i) => i === index ? color : c) || [],
      },
    }));
  };

  const updateBackgroundColor = (color: RGB) => {
    setParams(prev => ({
      ...prev,
      controls: {
        ...prev.controls,
        background_color: color,
      },
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Wand2 className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Generate Image</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Describe your image..."
            value={params.prompt}
            onChange={(e) => setParams({ ...params, prompt: e.target.value })}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Select
            value={params.style}
            onValueChange={(value: StyleType) => setParams({ ...params, style: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {STYLES.map((style) => (
                <SelectItem key={style} value={style}>
                  {style.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {params.style && params.style !== 'any' && (
          <div className="space-y-2">
            <Label htmlFor="substyle">Substyle</Label>
            <Select
              value={params.substyle}
              onValueChange={(value) => setParams({ ...params, substyle: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select substyle" />
              </SelectTrigger>
              <SelectContent>
                {getSubstyles(params.style, params.model || 'recraftv3').map((substyle) => (
                  <SelectItem key={substyle} value={substyle}>
                    {substyle.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select
            value={params.model}
            onValueChange={(value: RecraftModel) => setParams({ ...params, model: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recraftv3">Recraft V3</SelectItem>
              <SelectItem value="recraft20b">Recraft 20B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Select
            value={params.size}
            onValueChange={(value) => setParams({ ...params, size: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {IMAGE_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Colors</Label>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addColor}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {params.controls?.colors?.map((color, index) => (
            <div key={index} className="flex items-start space-x-2">
              <ColorPicker
                label={`Color ${index + 1}`}
                value={color}
                onChange={(newColor) => updateColor(index, newColor)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeColor(index)}
                className="h-8 w-8 mt-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <ColorPicker
          label="Background Color"
          value={params.controls?.background_color}
          onChange={updateBackgroundColor}
        />

        <Button type="submit" className="w-full" disabled={loading || !params.prompt}>
          {loading ? (
            <span className="flex items-center">
              Generating...
            </span>
          ) : (
            <span className="flex items-center">
              <Wand2 className="mr-2 h-4 w-4" />
              Generate
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}