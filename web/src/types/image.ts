import { ImageProps } from "next/image";

export interface ImageLoaderInterface  extends Omit<ImageProps, 'src' | 'alt' | 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  skeletonClassName?: string;
  fadeInDuration?: number;
  showShimmer?: boolean;
  fallbackSrc?: string | null;
  onLoad?: (() => void) | null;
  onError?: (() => void) | null;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
}
