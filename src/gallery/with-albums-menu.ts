import Dropdown from "../dropdown/index";
import {GalleryDecorator, Params} from './index';
import AlbumItem from "../album-item";

const withAlbumsMenu: GalleryDecorator = (constructor) =>
    class extends constructor {
        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);
            this.appendControlsElements([new Dropdown({
                items: this.albums.map(album => album.title),
                onChange: value => {
                    this.stopSlideshow();
                    this.thumbnails.setAlbum(this.albums[value]);
                    this.album = this.albums[value];
                    this.goToItem(this.album.items[0]);
                }
            }).getElement()]);
        }
    };

export default withAlbumsMenu;