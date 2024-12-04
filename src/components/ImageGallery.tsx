import { ImageIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ImageGalleryProps {
  images: string[];
  loading: boolean;
}

export function ImageGallery({ images, loading }: ImageGalleryProps) {
  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border bg-muted"
              >
                <img
                  src={url}
                  alt={`Generated image ${index + 1}`}
                  className="object-cover w-full h-full transition-all hover:scale-105"
                />
              </div>
            ))}
            {loading && (
              <div className="relative aspect-square rounded-lg overflow-hidden border bg-muted animate-pulse flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
          </div>
          {images.length === 0 && !loading && (
            <div className="h-[80vh] flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium">No images generated yet</h3>
              <p className="text-sm">Use the sidebar to generate your first image</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}