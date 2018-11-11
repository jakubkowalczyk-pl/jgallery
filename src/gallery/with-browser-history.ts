import {Gallery} from './index';

export default <T extends {new(...args:any[]):Gallery}>(constructor: T) =>
    class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const goToItem = this.goToItem.bind(this);
            const onhashchange = window.onhashchange || (() => {});

            window.onhashchange = (event) => {
                (<any>onhashchange)(event);
                goToItem(this.findItemByCurrentHash());
            };
            requestAnimationFrame(() => {
                this.goToItem = async (item) => {
                    history.pushState({jgallery: true}, '', `#${item.hash}`);

                    return goToItem(item);
                };
            });
        }
    };