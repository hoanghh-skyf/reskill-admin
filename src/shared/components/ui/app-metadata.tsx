"use client";

import { useEffect } from "react";

export interface AppMetadataProps {
  name?: string | null;
  description?: string | null;
  /**
   * Example: "Reskill Admin | {name}"
   * If not provided, uses "Reskill Admin | {name}".
   */
  titleTemplate?: string;
}

function normalizeText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function formatTitle(name: string, template?: string): string {
  const t = normalizeText(template) ?? "Reskill Admin | {name}";
  return t.replaceAll("{name}", name);
}

export function AppMetadata({
  name,
  description,
  titleTemplate,
}: AppMetadataProps) {
  useEffect(() => {
    // Client-only safety (avoid edge cases in tests / unusual runtimes)
    if (typeof document === "undefined") return;

    const resolvedName = normalizeText(name);
    const resolvedDescription = normalizeText(description);

    // If no usable input, do nothing to avoid accidental title wipes.
    if (!resolvedName && !resolvedDescription) return;

    const previousTitle = document.title;
    const previousDescriptionContent =
      document
        .querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.getAttribute("content") ?? null;

    try {
      if (resolvedName) {
        document.title = formatTitle(resolvedName, titleTemplate);
      }

      if (resolvedDescription) {
        let meta = document.querySelector<HTMLMetaElement>(
          'meta[name="description"]',
        );
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute("name", "description");
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", resolvedDescription);
      }
    } catch {
      // Fallback: if something goes wrong, keep the app usable with a safe title.
      try {
        document.title = "Reskill Admin";
      } catch {
        // No-op
      }
    }

    return () => {
      try {
        if (resolvedName) {
          document.title = previousTitle;
        }
        if (resolvedDescription) {
          const meta = document.querySelector<HTMLMetaElement>(
            'meta[name="description"]',
          );
          if (!meta) return;

          if (previousDescriptionContent === null) {
            meta.remove();
            return;
          }
          meta.setAttribute("content", previousDescriptionContent);
        }
      } catch {
        // No-op
      }
    };
  }, [name, description, titleTemplate]);

  return null;
}
