# alt-responsive

An alt store for easily creating responsive designs in a flux architecture

## Creating the Store

First create a store based on custom breakpoints using the provided factory. The names of these breakpoints will be used to identify them at a later time.
```js
// stores/ResponsiveStore.js

// import your singleton alt instance
import alt from 'my-alt-import'
// import our factory
import create_responsive_store_class from 'alt-responsive'

// define your own breakpoints
// NOTE: these must be in ascending order
const breakpoints = {
  small: 300,
  medium: 600,
  big: 890,
  huge: 990,
}

// pass your breakpoints to the store factory
let ResponsiveStore = create_responsive_store(breakpoints)
// pass the store class to alt's wrapper    
export default alt.createStore(ResponsiveStoreClass)
```

Now your store is ready to use. 

## Responding to Browser Width

The ReponsiveStore provides three attributes to handle responsive behavior (passed in as props to the particular component):

* `current_media_type` is a string whose value is equal to the largest breakpoint category that the browser satisfies.
* `browser_less_than` is an object of booleans that describe wether the browser is currently less than a particular breakpoint
* `browser_greater_than` is an object of booleans that describe wether the browser is currently greater than a particular breakpoint

For example,
```js
// MyComponent.js

import React from 'react'
// imports alt's nice decorator
// (see https://github.com/goatslacker/alt/blob/master/src/utils/connectToStores.js)
import connectToStores from 'alt/utils/connectToStores'
// import the store you just made
import ResponsiveStore from 'stores/responsiveStore'

@connectToStores
class MyComponent extends React.Component {
    static getStores() {
        return [ResponsiveStore]
    }


    static getPropsFromStores() {
        return ResponsiveStore.getState()
    }


    render() {
        if (this.props.browser_less_than.small) {
            return (
              <p>
                You will only see this on browser width less than the small breakpoint!
              </p>
            )
        } else if (this.props.browser_less_than.medium) {
            return (
              <p>
                You will only see this on screens less than the medium breakpoint!
              </p>
            )
        } else {
            return (
              <p>
                You will only see this on screens above medium size. 
                The browsers current media_type is {this.props.current_media_type}.
              </p>
            )
        }
    }
}
```

## Why Use a Flux Store?

There are many solutions for cleanly handling responsive designs in React applications. One common paradigm is to wrap a given component in another which is reponsible for handling the behavior. While this at first seems good and the "react way", it quickly leads to a lot of biolerplate code in a single component. Also, depending on the implementation, it is possible that many copies of the responsive container would create many different `resize` handlers. 

Using a flux store not only reduces the overall noise in a component, but also garuentees that only a single event listener is waiting for resize.
