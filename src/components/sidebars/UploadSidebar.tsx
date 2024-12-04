import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { FileUploadParams } from '@/types/recraft';

interface UploadSidebarProps {
  title: string;
  description: string;
  icon: typeof Upload;
  onUpload: (params: FileUploadParams) => Promise<void>;
  loading: boolean;
}

export function UploadSidebar({ title, description, icon: Icon, onUpload, loading }: UploadSidebarProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      await onUpload({ file });
      setFile(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Icon className="h-6 w-6" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Upload Image</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              id="file"
              accept="image/png"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <label
              htmlFor="file"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {file ? file.name : description}
              </span>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading || !file}>
          {loading ? (
            <span className="flex items-center">Processing...</span>
          ) : (
            <span className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}