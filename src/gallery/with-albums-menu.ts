import Dropdown from "../dropdown/index";
import {GalleryDecorator, Params} from './index';
import AlbumItem from "../album-item";

const withAlbumsMenu: GalleryDecorator = (constructor) =>
    class extends constructor {
        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);

            const dropdown = new Dropdown({
                items: this.albums.map(album => album.title),
                textColor: params.textColor,
                backgroundColor: params.backgroundColor,
                onChange: value => {
                    this.goToAlbum(value);
                }
            });

            this.appendControlsElements([dropdown.getElement()]);
            requestAnimationFrame(() => {
                dropdown.setActive(this.albums.indexOf(this.album));
            });
        }
    };

export default withAlbumsMenu;