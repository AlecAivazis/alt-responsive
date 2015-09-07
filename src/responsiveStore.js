// third parts imports
import MediaQuery from 'mediaquery'
import {transform, keys} from 'lodash'

/**
 * @arg {object} [options]  - Hash of custom breakpoints.
 * @returns {class} Responsive store class to be passed to `alt.createStore`.
 */
// export the factory (but not as default)
export function create_responsive_store(options) {
    // use `options` as hash of breakpoints
    let breakpoints = options
    // if `options` was not provided
    if (typeof options === 'undefined') {
        // use default breakpoints
        breakpoints = {
            extra_small: 480,
            small: 768,
            medium: 992,
            large: 1200,
        }
    }
    // always add `infinity` breakpoint for upper bound
    breakpoints.infinity = Infinity

    class ResponsiveStore {
        constructor() {
            // set the breakpoint variables
            this.breakpoints = breakpoints
            this.media_queries = MediaQuery.asObject(breakpoints)

            // set the initial store state

            // the current width of the browser
            const browser_width = window.innerWidth
            // set the initial values
            this.browser_width = browser_width
            this.current_media_type = this.get_current_media_type()
            // create a dictionary that tracks wether the browser is less/greater than a given breakpoint
            this.browser_less_than = this.get_less_than(browser_width)
            this.browser_greater_than = this.get_greater_than(browser_width)


            // when the browser resizes
            window.addEventListener('resize', () => {
                // the current width of the browser
                const width = window.innerWidth
                // update the store state
                this.setState({
                    browser_width: width,
                    current_media_type: this.get_current_media_type(width),
                    browser_less_than: this.get_less_than(width),
                    browser_greater_than: this.get_greater_than(width),
                })
            })
        }


        get_less_than(browser_width) {
            return transform(this.breakpoints, (result, breakpoint, media_type) => {
                // if the breakpoint is a number
                if (typeof breakpoint === 'number') {
                    // store wether or not it is less than the breakpoint
                    result[media_type] = browser_width < breakpoint
                } else {
                    result[media_type] = false
                }
            })
        }


        get_greater_than(browser_width) {
            return transform(this.breakpoints, (result, breakpoint, media_type) => {
                // if the breakpoint is a number
                if (typeof breakpoint === 'number') {
                    // store wether or not it is less than the breakpoint
                    result[media_type] = browser_width > breakpoint
                } else {
                    result[media_type] = false
                }
            })
        }


        // get the current media type from the browser width
        get_current_media_type() {
            // loop over the keys of the media query
            const current_media = keys(this.media_queries).reduce((final_type, current_type) => {
                // grab the corresponding query string
                const query_string = this.media_queries[current_type]
                // if the browser matches the string
                if (window.matchMedia(query_string).matches) {
                    // return the current target
                    return current_type
                }
                // otherwise the browser does not match
                // so return the previous type
                return final_type
            })

            // return the current media type
            return current_media
        }
    }

    return ResponsiveStore
}


// by default, export the default ResponsiveStore
export default create_responsive_store()


// end of file
