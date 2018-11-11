import Gallery, {GalleryConstructor} from './gallery/index';

declare const window: Window & {
    JGallery: GalleryConstructor,
};

if (typeof window !== 'undefined' && !window.JGallery) {
    window.JGallery = Gallery;
}