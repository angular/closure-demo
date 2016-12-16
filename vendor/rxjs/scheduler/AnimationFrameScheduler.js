import { AsyncScheduler } from './AsyncScheduler';
export class AnimationFrameScheduler extends AsyncScheduler {
    /**
     * @param {?=} action
     * @return {?}
     */
    flush(action) {
        this.active = true;
        this.scheduled = undefined;
        const { actions } = this;
        let /** @type {?} */ error;
        let /** @type {?} */ index = -1;
        let /** @type {?} */ count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}
