import {GalleryDecorator} from './index';
import Params from './parameters';
import AlbumItem from "../album-item";

const withBrowserHistory: GalleryDecorator = (constructor) =>
    class extends constructor {
        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);

            const goToItem = this.goToItem.bind(this);
            const onhashchange = window.onhashchange || (() => {});

            window.onhashchange = (event) => {
                (<any>onhashchange)(event);
                goToItem(this.findItemByCurrentHash());
            };
        }

        protected initialize() {
            super.initialize();

            const goToItem = this.goToItem.bind(this);

            this.goToItem = async (item) => {
                history.pushState({jgallery: true}, '', `#${item.hash}`);

                return goToItem(item);
            };
        }
    };

export default withBrowserHistory;