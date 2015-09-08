// import the responsive store class
import ResponsiveStore from './responsiveStore'

// the default breakpoints to use for the store
const default_breakpoints = {
    extra_small: 480,
    small: 768,
    medium: 992,
    large: 1200,
}

/**
 * @arg {object} [options]  - Hash of custom breakpoints.
 * @returns {class} Responsive store class to be passed to `alt.createStore`.
 */
// export the factory (but not as default)
export function create_responsive_store(breakpoints = default_breakpoints) {
    // add `infinity` breakpoint for upper bound
    breakpoints.infinity = Infinity
    // add the breakpoints to the class
    ResponsiveStore.prototype.breakpoints = breakpoints
    // return the store
    return ResponsiveStore
}


// by default, export a ResponsiveStore with the default breakpoints
export default create_responsive_store()

// end of file
