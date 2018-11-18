export default (src: string | HTMLElement): Promise<void | void[]> => {
    return typeof src === 'string' ? loadImg(src) : loadElement(src);
};

const loadImg = (src: string) => new Promise<void>((resolve, reject) => {
    const img = new Image;

    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
});

const loadElement = (element: HTMLElement) => Promise.all<void>(
    [element, Array.from(element.querySelectorAll('*'))]
        .reduce<Promise<void>[]>((paths, element: HTMLElement) => {
            if (element instanceof Image) {
                paths.push(loadImg(element.getAttribute('src')));
            }

            return paths;
        }, [])
);