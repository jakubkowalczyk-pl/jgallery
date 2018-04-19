import Canvas from './index';

export default interface Animation {
    (canvas: Canvas): Promise<void>
};