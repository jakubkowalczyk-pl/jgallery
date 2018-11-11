import Dropdown from "../dropdown/index";
import {Gallery} from './index';

export default <T extends {new(...args:any[]):Gallery}>(constructor: T) =>
    class extends constructor {
        constructor(...args: any[]) {
            super(...args);
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