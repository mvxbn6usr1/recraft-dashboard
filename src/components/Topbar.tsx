import * as React from 'react';
import { 
  Wand2, 
  FileImage,
  Eraser, 
  ArrowUpCircle, 
  Layers, 
  Palette
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ToolType } from '@/types/recraft';

interface TopbarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const tools = [
  { id: 'generate' as const, icon: Wand2, label: 'Generate Image' },
  { id: 'vectorize' as const, icon: FileImage, label: 'Vectorize Image' },
  { id: 'removeBackground' as const, icon: Eraser, label: 'Remove Background' },
  { id: 'clarityUpscale' as const, icon: ArrowUpCircle, label: 'Clarity Upscale' },
  { id: 'generativeUpscale' as const, icon: Layers, label: 'Generative Upscale' },
  { id: 'createStyle' as const, icon: Palette, label: 'Create Style' },
] as const;

export function Topbar({ activeTool, onToolChange }: TopbarProps) {
  return (
    <div className="absolute top-0 left-0 w-96 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
      <div className="flex h-full items-center justify-center px-4">
        <TooltipProvider>
          <nav className="flex items-center space-x-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Tooltip key={tool.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeTool === tool.id ? "default" : "ghost"}
                      size="icon"
                      onClick={() => onToolChange(tool.id)}
                      className={cn(
                        "h-9 w-9",
                        activeTool === tool.id && "bg-primary text-primary-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{tool.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{tool.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </TooltipProvider>
      </div>
    </div>
  );
}