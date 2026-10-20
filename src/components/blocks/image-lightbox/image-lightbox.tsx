"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
};

/**
 * Clickable image thumbnail that opens a larger preview in a dialog.
 *
 * @param props - Lightbox props.
 * @param props.src - Image URL.
 * @param props.alt - Accessible alternative text for the image.
 * @param props.className - Classes for the muted thumbnail container.
 * @param props.imageClassName - Classes for the thumbnail image.
 */
export function ImageLightbox({
  src,
  alt,
  className,
  imageClassName,
}: ImageLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "bg-muted flex w-full cursor-zoom-in justify-center rounded-[8px] p-8 transition-opacity hover:opacity-90 focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none",
            className,
          )}
          aria-label={`Agrandir l'image : ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className={cn(
              "max-h-72 w-full max-w-md object-contain",
              imageClassName,
            )}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-background max-h-[90vh] w-full max-w-[min(96vw,64rem)] overflow-auto p-2 sm:max-w-[min(96vw,64rem)] sm:p-4">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">
          Aperçu agrandi de l&apos;image. Appuyez sur Échap ou sur le bouton
          fermer pour quitter.
        </DialogDescription>
        <img
          src={src}
          alt={alt}
          className="mx-auto max-h-[calc(90vh-2rem)] w-auto max-w-full object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
