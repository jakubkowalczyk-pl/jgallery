interface Options {
    style?: Partial<CSSStyleDeclaration>;
    children?: HTMLElement[];
}

const defaultOptions: Options = {
    style: {},
    children: [],
};

export default function (html: string, options?: Options): HTMLElement {
    const element = <HTMLElement>(new DOMParser().parseFromString(html, 'text/html').body.firstChild);

    options = {...defaultOptions, ...options};

    for (let key in options.style) {
        element.style[key] = options.style[key];
    }

    options.children.forEach(child => element.appendChild(child));

    return element;
};