export interface Options {
    style?: Partial<CSSStyleDeclaration>;
    children?: HTMLElement[];
}
export default function (html: string, options?: Options): HTMLElement;
