'use strict';

// TODO: deprecate and remove this because it is only used to determine if we need helmet security exceptions
// stores the state of the Apollo landingPage (playground)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var playground = ((ctx)=>{
    let enabled = false;
    return {
        setEnabled (val) {
            enabled = val;
        },
        isEnabled () {
            return enabled;
        }
    };
});

module.exports = playground;
//# sourceMappingURL=playground.js.map
