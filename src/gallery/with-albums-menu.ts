import Dropdown from "../dropdown/index";
import {GalleryDecorator} from './index';
import Params from './parameters';
import AlbumItem from "../album-item";
import withTooltip from "../utils/with-tooltip";
import createElement from "../utils/create-element";

const withAlbumsMenu: GalleryDecorator = (constructor) =>
    class extends constructor {
        private dropdown: Dropdown;

        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);

            const container = createElement('<span class="j-gallery-albums-drop-down"/>');

            this.dropdown = new Dropdown({
                items: this.albums.map(album => album.title),
                textColor: params.textColor,
                backgroundColor: params.backgroundColor,
                onChange: value => {
                    this.goToAlbum(value);
                }
            });

            container.appendChild(this.dropdown.getElement());

            withTooltip(container, {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                },
                content: params.tooltipSeeOtherAlbums,
            });

            this.appendControlsElements([container]);
        }

        protected initialize() {
            super.initialize();
            this.dropdown.setActive(this.albums.indexOf(this.album));
        }
    };

export default withAlbumsMenu;