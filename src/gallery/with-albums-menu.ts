import Dropdown from "../dropdown/index";
import {GalleryDecorator, Params} from './index';
import AlbumItem from "../album-item";

const withAlbumsMenu: GalleryDecorator = (constructor) =>
    class extends constructor {
        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);

            const element = new Dropdown({
                items: this.albums.map(album => album.title),
                onChange: value => {
                    this.goToAlbum(value);
                }
            }).getElement();

            element.style.fontSize = '.8em';

            this.appendControlsElements([element]);
        }
    };

export default withAlbumsMenu;