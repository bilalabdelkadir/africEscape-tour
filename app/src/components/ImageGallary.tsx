import { IImage } from '@/types';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { useState } from 'react';
interface Props {
  images: IImage[];
}

const ImageGallary = ({ images }: Props) => {
  const [index, setIndex] = useState(-1);
  const photos = images.map((image) => ({
    src: image.url,
    width: 800,
    height: 600,
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <PhotoAlbum
        photos={photos}
        layout="columns"
        targetRowHeight={120}
        columns={2}
        spacing={5}
        onClick={({ index }) => setIndex(index)}
        // make the images rounded
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
};

export default ImageGallary;
