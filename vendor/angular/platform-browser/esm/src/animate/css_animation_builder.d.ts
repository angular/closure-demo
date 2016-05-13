import { CssAnimationOptions } from './css_animation_options';
import { Animation } from './animation';
import { BrowserDetails } from './browser_details';
export declare class CssAnimationBuilder {
    browserDetails: BrowserDetails;
    data: CssAnimationOptions;
    /**
     * Accepts public properties for CssAnimationBuilder
     */
    constructor(browserDetails: BrowserDetails);
    /**
     * Adds a temporary class that will be removed at the end of the animation
     */
    addAnimationClass(className: string): CssAnimationBuilder;
    /**
     * Adds a class that will remain on the element after the animation has finished
     */
    addClass(className: string): CssAnimationBuilder;
    /**
     * Removes a class from the element
     */
    removeClass(className: string): CssAnimationBuilder;
    /**
     * Sets the animation duration (and overrides any defined through CSS)
     */
    setDuration(duration: number): CssAnimationBuilder;
    /**
     * Sets the animation delay (and overrides any defined through CSS)
     */
    setDelay(delay: number): CssAnimationBuilder;
    /**
     * Sets styles for both the initial state and the destination state
     */
    setStyles(from: {
        [key: string]: any;
    }, to: {
        [key: string]: any;
    }): CssAnimationBuilder;
    /**
     * Sets the initial styles for the animation
     */
    setFromStyles(from: {
        [key: string]: any;
    }): CssAnimationBuilder;
    /**
     * Sets the destination styles for the animation
     */
    setToStyles(to: {
        [key: string]: any;
    }): CssAnimationBuilder;
    /**
     * Starts the animation and returns a promise
     */
    start(element: HTMLElement): Animation;
}
