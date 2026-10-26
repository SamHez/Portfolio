import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { communityPhotography } from "@/content/recognition";
export function CommunityGallery() {
  return (
    <div className="community-photo-pair">
      {communityPhotography.map((photo) => (
        <ScrollReveal key={photo.image}>
          <figure data-reveal>
            <Image
              src={photo.image}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 560px) 100vw, 50vw"
            />
            <figcaption className="mono">{photo.caption}</figcaption>
          </figure>
        </ScrollReveal>
      ))}
    </div>
  );
}
