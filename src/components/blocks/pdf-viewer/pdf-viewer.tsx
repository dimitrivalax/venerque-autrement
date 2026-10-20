import { DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type PdfViewerProps = {
  src: string;
  title: string;
};

/** A4 portrait width / height (mm), used to size the iframe to the page. */
const A4_ASPECT_RATIO = "210 / 297";

/**
 * Native browser PDF viewer with a download link for blog posts.
 *
 * The frame uses an A4 portrait aspect ratio so a full-width page fits
 * without vertical overflow for single-page A4 bulletins.
 *
 * @param props - Viewer props.
 * @param props.src - Public URL of the PDF file.
 * @param props.title - Accessible title used for the iframe and download link.
 */
export function PdfViewer({ src, title }: PdfViewerProps) {
  const iframeTitle = `Document PDF : ${title}`;
  const iframeSrc = `${src}#navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-2xl font-semibold">Document PDF</h2>
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
            Télécharger le PDF
          </a>
        </Button>
      </div>
    </div>
  );
}
