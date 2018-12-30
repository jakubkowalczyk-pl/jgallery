import AlbumItem from './album-item';
export default interface Album {
    title: string;
    items: Array<AlbumItem>;
}
