import { useEffect } from "react";

type PageMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
};

function upsertMeta(property: string, value: string) {
  const selector = property.startsWith("og:") ? `meta[property="${property}"]` : `meta[name="${property}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property.startsWith("og:") ? "property" : "name", property);
    element.dataset.ojwRouteMetadata = "true";
    document.head.append(element);
  }
  element.content = value;
}

export function usePageMetadata({ title, description, canonicalUrl, ogTitle = title, ogDescription = description }: PageMetadata) {
  useEffect(() => {
    const initialTitle = document.title;
    const descriptionElement = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const initialDescription = descriptionElement?.content ?? "";

    document.title = title;
    upsertMeta("description", description);
    upsertMeta("og:title", ogTitle);
    upsertMeta("og:description", ogDescription);
    upsertMeta("og:url", canonicalUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.dataset.ojwRouteMetadata = "true";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    return () => {
      document.title = initialTitle;
      if (descriptionElement) descriptionElement.content = initialDescription;
      document.head.querySelectorAll('[data-ojw-route-metadata="true"]').forEach((element) => element.remove());
    };
  }, [canonicalUrl, description, ogDescription, ogTitle, title]);
}
