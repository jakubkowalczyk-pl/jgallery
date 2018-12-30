export interface Params {
    content: string;
    style?: Partial<CSSStyleDeclaration>;
}
declare const withTooltip: <T extends HTMLElement>(element: T, params: Params) => T;
export default withTooltip;
