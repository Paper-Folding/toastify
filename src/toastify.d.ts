declare namespace StartToastifyInstance {
    function reposition(): void;
    interface Offset {
        x: number | string;
        y: number | string;
    }

    interface Options {
        text?: string;
        node?: Node;
        duration?: number;
        selector?: string | Node;
        destination?: string;
        newWindow?: boolean;
        close?: boolean;
        gravity?: "top" | "bottom";
        position?: "left" | "center" | "right";
        /**
         * Announce the toast to screen readers
         * @default 'polite'
         */
        ariaLive?: "off" | "polite" | "assertive";
        /**
         * @deprecated use style.background option instead
         */
        backgroundColor?: string;
        /**
         * Image/icon to be shown before text
         */
        avatar?: string;
        className?: string;
        /**
         * @default true
         */
        stopOnFocus?: boolean;
        /**
         * Invoked when the toast is dismissed
         */
        callback?: () => void;
        onClick?: () => void;
        offset?: Offset;
        /**
         * Toggle the default behavior of escaping HTML markup
         */
        escapeMarkup?: boolean;
        /**
         * HTML DOM Style properties to add any style directly to toast
         */
        style?: Partial<CSSStyleDeclaration>;
        /**
         * Set the order in which toasts are stacked in page
         */
        oldestFirst?: boolean;
    }
}

declare class Toastify {
    /**
     * The configuration object to configure Toastify
     */
    readonly options: StartToastifyInstance.Options;
    /**
     * The element that is the Toast
     */
    readonly toastElement: Element | null;
    /**
     * Display the toast
     */
    showToast(): void;
    /**
     * Hide the toast
     */
    hideToast(): void;
}
declare function StartToastifyInstance(options?: StartToastifyInstance.Options): Toastify;

export as namespace Toastify;

export default StartToastifyInstance;
