# alt-responsive

An alt store for easily creating responsive designs in a flux architecture

## Usage

First you must create the singleton store based on your custom breakpoints.
```js
// stores/ResponsiveStore.js

// import your singleton alt instance
import alt from 'my-alt-import'
// import our factory
import create_responsive_store from 'alt-responsive'

// define your own breakpoints
let breakpoints = {
  small: 300,
  medium: 600,
  big: 890,
  huge: 990,
}

// pass your breakpoints to our factory
let ResponsiveStoreClass = create_responsive_store(breakpoints)
// pass the store class to alt's wrapper    
let ResponsiveStore = alt.createStore(ResponsiveStoreClass)

// export the alt store
export default ResponsiveStore
```

Then you can listen to this store in any React component that you wish to be
responsive.
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
            return (<p>
                You will only see this on small screens!
            </p>)
        } else if (this.props.browser_less_than.medium) {
            return (<p>
                You will only see this on medium screens!
            </p>)
        } else {
            return (<p>
                You will only see this on screens above medium size!
            </p>)
        }
    }
}
```
