interface Options {
    style?: Partial<CSSStyleDeclaration>;
}

export default function (html: string, options: Options = {}): HTMLElement {
    const element = <HTMLElement>(new DOMParser().parseFromString(html, 'text/html').body.firstChild);

    for (let key in options.style) {
        element.style[key] = options.style[key];
    }

    return element;
};