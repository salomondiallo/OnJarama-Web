import type { ImgHTMLAttributes } from "react";
import type { ResponsiveImageSources } from "../data/responsiveAssets";

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> & {
  sources: ResponsiveImageSources;
  sizes: string;
};

export function ResponsiveImage({ sources, sizes, ...imageProps }: ResponsiveImageProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      <img src={sources.fallback} {...imageProps} />
    </picture>
  );
}
