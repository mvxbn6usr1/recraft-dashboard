import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { ImageGallery } from '@/components/ImageGallery';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { generateImage } from '@/lib/recraft';
import { Debug } from '@/components/Debug';
import type { RecraftGenerateParams, ToolType } from '@/types/recraft';

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('generate');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (params: RecraftGenerateParams) => {
    setLoading(true);
    try {
      const response = await generateImage(params);
      setImages(prev => [...prev, response.data[0].url]);
      toast({
        title: 'Image generated successfully',
        description: 'Your image has been added to the gallery.',
      });
    } catch (error: any) {
      toast({
        title: 'Error generating image',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="recraft-theme">
      <Debug />
      <Layout>
        <div className="flex flex-col h-screen overflow-hidden bg-background">
          <Topbar activeTool={activeTool} onToolChange={setActiveTool} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar 
              activeTool={activeTool}
              onGenerate={handleGenerate} 
              loading={loading} 
            />
            <ImageGallery images={images} loading={loading} />
          </div>
        </div>
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;