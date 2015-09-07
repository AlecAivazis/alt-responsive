/*
 * Expose all the decorators.
 */

// third parts imports
import alt from '../alt_import'
import MediaQuery from 'mediaquery'
import {mapValues, transform, keys} from 'lodash'

const breakpoints  = {
  small: 300,
  medium: 600,
  big: 890,
  huge: 990,
  infinity: Infinity
}

const media_queries = MediaQuery.asObject(breakpoints)

class ResponsiveStore {

    constructor() {
        // the current width of the browser
        const browser_width = window.innerWidth
        // set the initial values
        this.browser_width = browser_width
        this.current_media_type = this.get_current_media_type(browser_width)
        // create a dictionary that tracks wether the browser is less than a given breakpoint
        this.browser_less_than = this.get_less_than(browser_width)
        this.browser_greater_than = this.get_greater_than(browser_width)


        // when the browser resizes
        window.addEventListener('resize', (event) => {
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
        return transform(breakpoints, (result, breakpoint, media_type) => {
            // if the breakpoint is a number 
            if (typeof breakpoint === 'number'){
                // store wether or not it is less than the breakpoint
                result[media_type] = browser_width < breakpoint
            } else {
                result[media_type] = false
            }
        })
    }


    get_greater_than(browser_width) {
        return transform(breakpoints, (result, breakpoint, media_type) => {
            // if the breakpoint is a number 
            if (typeof breakpoint === 'number'){
                // store wether or not it is less than the breakpoint
                result[media_type] = browser_width > breakpoint
            } else {
                result[media_type] = false
            }
        })
    }


    // get the current media type from the browser width
    get_current_media_type(browser_width) {
        // loop over the keys of the media query
        const current_media = keys(media_queries).reduce((final_type, current_type) => {
            // grab the corresponding query string
            const query_string = media_queries[current_type]
            // if the browser matches the string
            if (window.matchMedia(query_string).matches) {
                // return the current target
                return current_type
            // otherwise the browser does not match 
            } else {
                // return the previous type
                return final_type
            }
        })

        // return the current media type
        return current_media

    }
}

export default alt.createStore(ResponsiveStore)
// end of file
