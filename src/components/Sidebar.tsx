import { FileImage, Eraser, ArrowUpCircle, Layers, Palette, Settings } from 'lucide-react';
import { GenerateSidebar } from './sidebars/GenerateSidebar';
import { UploadSidebar } from './sidebars/UploadSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ToolType, RecraftGenerateParams, FileUploadParams } from '@/types/recraft';

interface SidebarProps {
  activeTool: ToolType;
  onGenerate: (params: RecraftGenerateParams) => Promise<void>;
  loading: boolean;
}

export function Sidebar({ activeTool, onGenerate, loading }: SidebarProps) {
  const handleUpload = async (params: FileUploadParams) => {
    // TODO: Implement file upload handling
    console.log('Upload params:', params);
  };

  return (
    <div className="relative w-96 h-full border-r">
      <ScrollArea className="h-full pt-16">
        {(() => {
          switch (activeTool) {
            case 'generate':
              return <GenerateSidebar onGenerate={onGenerate} loading={loading} />;
            case 'vectorize':
              return (
                <UploadSidebar
                  title="Vectorize Image"
                  description="Upload a PNG image to convert to SVG"
                  icon={FileImage}
                  onUpload={handleUpload}
                  loading={loading}
                />
              );
            case 'removeBackground':
              return (
                <UploadSidebar
                  title="Remove Background"
                  description="Upload a PNG image to remove its background"
                  icon={Eraser}
                  onUpload={handleUpload}
                  loading={loading}
                />
              );
            case 'clarityUpscale':
              return (
                <UploadSidebar
                  title="Clarity Upscale"
                  description="Upload a PNG image to enhance resolution"
                  icon={ArrowUpCircle}
                  onUpload={handleUpload}
                  loading={loading}
                />
              );
            case 'generativeUpscale':
              return (
                <UploadSidebar
                  title="Generative Upscale"
                  description="Upload a PNG image to enhance details"
                  icon={Layers}
                  onUpload={handleUpload}
                  loading={loading}
                />
              );
            case 'createStyle':
              return (
                <UploadSidebar
                  title="Create Style"
                  description="Upload up to 5 PNG images to create a style"
                  icon={Palette}
                  onUpload={handleUpload}
                  loading={loading}
                />
              );
            default:
              return null;
          }
        })()}
      </ScrollArea>
    </div>
  );
}