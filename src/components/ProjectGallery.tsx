"use client";

import { useState } from "react";

export default function ProjectGallery({ images, name, mode = "cover" }: { images: string[]; name: string; mode?: "cover" | "contain" }) {
  const [active, setActive] = useState(0);
  const change = (direction: number) => setActive((current) => (current + direction + images.length) % images.length);
  return (
    <div className="detail-gallery">
      <div className="detail-gallery-main">
        <img className={mode} src={images[active]} alt={`${name} imagen ${active + 1}`} />
        {images.length > 1 && <>
          <button className="gallery-arrow gallery-prev" onClick={() => change(-1)} aria-label="Imagen anterior">‹</button>
          <button className="gallery-arrow gallery-next" onClick={() => change(1)} aria-label="Imagen siguiente">›</button>
        </>}
      </div>
      {images.length > 1 && <div className="gallery-thumbs">{images.map((image, index) => (
        <button className={index === active ? "active" : ""} onClick={() => setActive(index)} key={image}><img src={image} alt="" /></button>
      ))}</div>}
    </div>
  );
}
