import React, { useState, useCallback, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ImageGallery } from './components/ImageGallery';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';
import { generateImage, vectorizeImage, removeBackground, clarityUpscale, generativeUpscale, createStyle } from './lib/recraft';
import { imageStorage, type ImageMetadata } from './lib/image-storage';
import { Debug } from './components/Debug';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./components/ui/alert-dialog";
import { styleStorage } from './lib/style-storage';
import type { RecraftGenerateParams, ToolType, FileUploadParams, CreateStyleParams, StyleType } from './types/recraft';

// ... rest of the file 