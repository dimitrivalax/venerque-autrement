import { DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type PdfViewerProps = {
  src: string;
  title: string;
};

type PdfViewerListProps = {
  urls: string[];
  title: string;
};

/** A4 portrait width / height (mm), used to size the iframe to the page. */
const A4_ASPECT_RATIO = "210 / 297";

/**
 * Returns a human-readable file name from a PDF URL.
 *
 * @param src - Public URL of the PDF file.
 */
const getPdfFileName = (src: string): string => {
  try {
    const pathname = new URL(src, "https://example.invalid").pathname;
    const segment = pathname.split("/").filter(Boolean).at(-1);

    return segment ? decodeURIComponent(segment) : src;
  } catch {
    return src;
  }
};

/**
 * Native browser viewer for a single PDF, with a download link.
 *
 * The frame uses an A4 portrait aspect ratio so a full-width page fits
 * without vertical overflow for single-page A4 documents.
 *
 * @param props - Viewer props.
 * @param props.src - Public URL of the PDF file.
 * @param props.title - Accessible title used for the iframe and download link.
 */
function PdfViewerItem({ src, title }: PdfViewerProps) {
  const fileName = getPdfFileName(src);
  const iframeTitle = `Document PDF : ${title} — ${fileName}`;
  const iframeSrc = `${src}#navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div className="space-y-4">
      <h3 className="text-foreground text-lg font-medium">{fileName}</h3>
      <div
        className="border-border relative w-full overflow-hidden rounded-[8px] border"
        style={{ aspectRatio: A4_ASPECT_RATIO }}
      >
        <iframe
          src={iframeSrc}
          title={iframeTitle}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div>
        <Button asChild variant="outline" className="rounded-[8px]">
          <a href={src} target="_blank" rel="noopener noreferrer" download>
            <DownloadIcon className="size-4" />
            Télécharger {fileName}
          </a>
        </Button>
      </div>
    </div>
  );
}

/**
 * Stacked list of PDF viewers for a blog post.
 *
 * @param props - List props.
 * @param props.urls - Public URLs of the PDF files to display.
 * @param props.title - Post title used for accessible iframe titles.
 */
export function PdfViewer({ urls, title }: PdfViewerListProps) {
  if (urls.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      <h2 className="text-foreground text-2xl font-semibold">
        {urls.length > 1 ? "Documents PDF" : "Document PDF"}
      </h2>
      {urls.map((src) => (
        <PdfViewerItem key={src} src={src} title={title} />
      ))}
    </div>
  );
}
