((typeof self !== 'undefined' ? self : this)["webpackJsonp_wix_ui_santa"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp_wix_ui_santa"] || []).push([[47],{

/***/ 12:
/*!**********************************************!*\
  !*** ../node_modules/object-assign/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 17:
/*!***************************************************!*\
  !*** ../node_modules/create-react-class/index.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var React = __webpack_require__(/*! react */ 0);
var factory = __webpack_require__(/*! ./factory */ 18);

if (typeof React === 'undefined') {
  throw Error(
    'create-react-class could not find the React object. If you are using script tags, ' +
      'make sure that React is being loaded before create-react-class.'
  );
}

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),

/***/ 18:
/*!*****************************************************!*\
  !*** ../node_modules/create-react-class/factory.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(/*! object-assign */ 12);

var emptyObject = __webpack_require__(/*! fbjs/lib/emptyObject */ 19);
var _invariant = __webpack_require__(/*! fbjs/lib/invariant */ 9);

if (false) { var warning; }

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (false) {} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillMount`.
     *
     * @optional
     */
    UNSAFE_componentWillMount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillReceiveProps`.
     *
     * @optional
     */
    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillUpdate`.
     *
     * @optional
     */
    UNSAFE_componentWillUpdate: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Similar to ReactClassInterface but for static methods.
   */
  var ReactClassStaticInterface = {
    /**
     * This method is invoked after a component is instantiated and when it
     * receives new props. Return an object to update state in response to
     * prop changes. Return null to indicate no change to state.
     *
     * If an object is returned, its keys will be merged into the existing state.
     *
     * @return {object || null}
     * @optional
     */
    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (false) {}
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (false) {}
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (false) {}
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (false) {}
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (false) { var isMixinValid, typeofSpec; }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (false) {}
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }

    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isAlreadyDefined = name in Constructor;
      if (isAlreadyDefined) {
        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
          ? ReactClassStaticInterface[name]
          : null;

        _invariant(
          specPolicy === 'DEFINE_MANY_MERGED',
          'ReactClass: You are attempting to define ' +
            '`%s` on your component more than once. This conflict may be ' +
            'due to a mixin.',
          name
        );

        Constructor[name] = createMergedResultFunction(Constructor[name], property);

        return;
      }

      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (false) { var _bind, componentName; }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (false) {}
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (false) {}

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (false) {}
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (false) {}

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (false) {}

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;


/***/ }),

/***/ 19:
/*!***********************************************!*\
  !*** ../node_modules/fbjs/lib/emptyObject.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {}

module.exports = emptyObject;

/***/ }),

/***/ 358:
/*!****************************************************************************!*\
  !*** ../node_modules/wix-ui-core/dist/src/components/slider/Slider.st.css ***!
  \****************************************************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "Slider2560888197",
  {"root":"Slider2560888197--root","tooltip":"Slider2560888197--tooltip","track":"Slider2560888197--track","inner":"Slider2560888197--inner","trackFill":"Slider2560888197--trackFill","thumb":"Slider2560888197--thumb","thumbShape":"Slider2560888197--thumbShape","tick":"Slider2560888197--tick","tickLineWidth":"1px","tickLineHeight":"10px","tickDotSize":"3px","tickMarksGap":"12px","tooltipGap":"10px"},
  "",
  1,
  /*! ../node_modules/wix-ui-core/dist/src/components/slider/Slider.st.css */ 358
);



/***/ }),

/***/ 359:
/*!*****************************************!*\
  !*** ./components/Slider/Slider.st.css ***!
  \*****************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "Slider3992224720",
  {"root":"Slider3992224720--root","thumbBackground":"color_25","thumbBackgroundHover":"color_23","thumbBackgroundFocus":"color_22","thumbBackgroundDisabled":"color_21","thumbBoxShadow":"0 1px 4px rgba(0, 0, 0, .6)","trackFill":"color_22","trackFillHover":"color_23","trackFillFocus":"color_24","trackFillDisabled":"color_25","trackBoxShadow":"0 1px 4px rgba(0, 0, 0, .6)","trackBackground":"color_26","trackBackgroundHover":"color_27","trackBackgroundFocus":"color_28","trackBackgroundDisabled":"color_29","tooltipBackground":"color_30","tooltipFontSize":"14","tooltipFontFamily":"arial","tooltipFontColor":"color_1","tooltipBoxShadow":"initial","tickMarkColor":"color_4","thumbBorderColor":"color_22","thumbBorderColorHover":"color_23","thumbBorderColorFocus":"color_24","thumbBorderColorDisabled":"color_25","thumbBorderWidth":"4","thumbBorderWidthHover":"4","thumbBorderWidthFocus":"4","thumbBorderWidthDisabled":"4","thumbBorderRadius":"8px","trackBorderColor":"color_28","trackBorderColorHover":"color_29","trackBorderColorFocus":"color_30","trackBorderColorDisabled":"color_31","trackBorderWidth":"7","trackBorderWidthHover":"6","trackBorderWidthFocus":"6","trackBorderWidthDisabled":"6","tooltipBorderRadius":"2px","trackBorderRadius":"8px"},
  "",
  7,
  /*! ./components/Slider/Slider.st.css */ 359
);

exports.default.$skin = {"params":{"thumbBackground":"COLOR_ALPHA","thumbBackgroundHover":"COLOR_ALPHA","thumbBackgroundFocus":"COLOR_ALPHA","thumbBackgroundDisabled":"COLOR_ALPHA","thumbBoxShadow":"BOX_SHADOW","trackFill":"COLOR_ALPHA","trackFillHover":"COLOR_ALPHA","trackFillFocus":"COLOR_ALPHA","trackFillDisabled":"COLOR_ALPHA","trackBoxShadow":"BOX_SHADOW","trackBackground":"COLOR_ALPHA","trackBackgroundHover":"COLOR_ALPHA","trackBackgroundFocus":"COLOR_ALPHA","trackBackgroundDisabled":"COLOR_ALPHA","tooltipBackground":"COLOR_ALPHA","tooltipFontSize":"TEXT_SIZE","tooltipFontFamily":"FONT_FAMILY","tooltipFontColor":"TEXT_COLOR","tooltipBoxShadow":"BOX_SHADOW","tickMarkColor":"COLOR_ALPHA","thumbBorderColor":"COLOR_ALPHA","thumbBorderColorHover":"COLOR_ALPHA","thumbBorderColorFocus":"COLOR_ALPHA","thumbBorderColorDisabled":"COLOR_ALPHA","thumbBorderWidth":"BORDER_SIZE","thumbBorderWidthHover":"BORDER_SIZE","thumbBorderWidthFocus":"BORDER_SIZE","thumbBorderWidthDisabled":"BORDER_SIZE","thumbBorderRadius":"BORDER_RADIUS","trackBorderColor":"COLOR_ALPHA","trackBorderColorHover":"COLOR_ALPHA","trackBorderColorFocus":"COLOR_ALPHA","trackBorderColorDisabled":"COLOR_ALPHA","trackBorderWidth":"BORDER_SIZE","trackBorderWidthHover":"BORDER_SIZE","trackBorderWidthFocus":"BORDER_SIZE","trackBorderWidthDisabled":"BORDER_SIZE","tooltipBorderRadius":"BORDER_RADIUS","trackBorderRadius":"BORDER_RADIUS"},"paramsDefaults":{"thumbBackground":"color_25","thumbBackgroundHover":"color_23","thumbBackgroundFocus":"color_22","thumbBackgroundDisabled":"color_21","thumbBoxShadow":"0 1px 4px rgba(0, 0, 0, .6)","trackFill":"color_22","trackFillHover":"color_23","trackFillFocus":"color_24","trackFillDisabled":"color_25","trackBoxShadow":"0 1px 4px rgba(0, 0, 0, .6)","trackBackground":"color_26","trackBackgroundHover":"color_27","trackBackgroundFocus":"color_28","trackBackgroundDisabled":"color_29","tooltipBackground":"color_30","tooltipFontSize":"14","tooltipFontFamily":"arial","tooltipFontColor":"color_1","tooltipBoxShadow":"initial","tickMarkColor":"color_4","thumbBorderColor":"color_22","thumbBorderColorHover":"color_23","thumbBorderColorFocus":"color_24","thumbBorderColorDisabled":"color_25","thumbBorderWidth":"4","thumbBorderWidthHover":"4","thumbBorderWidthFocus":"4","thumbBorderWidthDisabled":"4","thumbBorderRadius":"8px","trackBorderColor":"color_28","trackBorderColorHover":"color_29","trackBorderColorFocus":"color_30","trackBorderColorDisabled":"color_31","trackBorderWidth":"7","trackBorderWidthHover":"6","trackBorderWidthFocus":"6","trackBorderWidthDisabled":"6","tooltipBorderRadius":"2px","trackBorderRadius":"8px"}};
exports.default.$skin.$render = function render_css($id, $params, $functions) {
  return "\n" + $id + ".Slider2560888197--root{position: relative;box-sizing: border-box;outline: none}\n" + $id + ".Slider2560888197--root *{box-sizing: border-box}\n" + $id + " .Slider2560888197--tooltip{position: absolute;background: #363636;color: #fff;padding: 4px 12px;text-align: center;font-size: 14px;line-height: 1.5;border-radius: 3px;white-space: nowrap}\n" + $id + " .Slider2560888197--tooltip::after, " + $id + " .Slider2560888197--tooltip::before{content: ' ';position: absolute;margin-left: -8px;border-width: 8px;border-style: solid}\n" + $id + " .Slider2560888197--track{z-index: 0;width: 100%;height: 25%;position: relative;cursor: pointer;background: #dadada;opacity: 1;border-radius: 8px;overflow: hidden;border: 2px solid transparent;min-height: 1px}\n" + $id + " .Slider2560888197--inner{display: flex;position: relative;align-items: center;justify-content: center;width: 100%;height: 100%}\n" + $id + " .Slider2560888197--trackFill{position: absolute;background: linear-gradient(to right,#4992e3,#70bff3);height: 100%;width: 100%}\n" + $id + ".Slider2560888197--root[data-slider2560888197-dir=\"rtl\"] .Slider2560888197--trackFill{right: 0}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--track{width: 25%;height: 100%}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--trackFill{background: linear-gradient(to top,#4992e3,#70bff3)}\n" + $id + " .Slider2560888197--thumb{z-index: 2;position: absolute;cursor: pointer}\n" + $id + " .Slider2560888197--thumbShape{width: 100%;height: 100%;background: green;border: 2px solid blue}\n" + $id + " .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"circle\"]{border-radius: 50%}\n" + $id + " .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"square\"]{border-radius: 7px}\n" + $id + " .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"rectangle\"]{border-radius: 37px}\n" + $id + " .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"bar\"]{border-radius: 7px}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"] .Slider2560888197--tooltip[data-slider2560888197-normalposition]{left: 50%;top: calc(-7px - 10px);transform: translate(-50%,-100%)}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"] .Slider2560888197--tooltip[data-slider2560888197-acrossposition]{left: 50%;bottom: calc(-7px - 10px);transform: translate(-50%,100%)}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip[data-slider2560888197-normalposition]{left: 50%;left: calc(-7px - 10px);transform: translate(-100%,-50%)}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip[data-slider2560888197-acrossposition]{right: calc(-7px - 10px);transform: translate(100%,-50%)}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"] .Slider2560888197--tooltip[data-slider2560888197-normalposition]::after, " + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"] .Slider2560888197--tooltip[data-slider2560888197-normalposition]::before{border-color: #363636 transparent transparent transparent;top: 100%;left: 50%}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"] .Slider2560888197--tooltip[data-slider2560888197-acrossposition]::after, " + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"] .Slider2560888197--tooltip[data-slider2560888197-acrossposition]::before{border-color: transparent transparent #363636 transparent;bottom: 100%;left: 50%}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip{top: 50%}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip::after, " + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip::before{top: 50%;transform: translateY(-50%)}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip[data-slider2560888197-normalposition]::after, " + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip[data-slider2560888197-normalposition]::before{left: 100%;margin-left: 0;border-color: transparent transparent transparent #363636}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip[data-slider2560888197-acrossposition]::after, " + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip[data-slider2560888197-acrossposition]::before{right: 100%;border-color: transparent #363636 transparent transparent}\n" + $id + " .Slider2560888197--tick{display: inline-block;position: absolute;background: #000;cursor: pointer}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"][data-slider2560888197-tickmarksshape=\"line\"] .Slider2560888197--tick{width: 1px;height: 10px}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"][data-slider2560888197-tickmarksshape=\"line\"] .Slider2560888197--tick{height: 1px;width: 10px}\n" + $id + ".Slider2560888197--root[data-slider2560888197-tickmarksshape=\"dot\"] .Slider2560888197--tick{width: 3px;height: 3px;border-radius: 50%}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"][data-slider2560888197-tickmarksshape=\"dot\"] .Slider2560888197--tick{transform: translateX(calc(- 3px,2))}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"][data-slider2560888197-tickmarksshape=\"dot\"] .Slider2560888197--tick{transform: translateY(calc(3px,2))}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"][data-slider2560888197-tickmarksposition=\"normal\"] .Slider2560888197--tick{bottom: 0}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"][data-slider2560888197-tickmarksposition=\"normal\"] .Slider2560888197--tick{right: 0}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"][data-slider2560888197-tickmarksposition=\"middle\"] .Slider2560888197--tick{top: 50%;transform: translateY(-50%)}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"][data-slider2560888197-tickmarksposition=\"middle\"] .Slider2560888197--tick{left: 50%;transform: translateX(-50%)}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"horizontal\"][data-slider2560888197-tickmarksposition=\"across\"] .Slider2560888197--tick{top: 0}\n" + $id + ".Slider2560888197--root[data-slider2560888197-orientation=\"vertical\"][data-slider2560888197-tickmarksposition=\"across\"] .Slider2560888197--tick{left: 0}\n" + $id + ".Slider3992224720--root{z-index: 0}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape{background: " + $params["thumbBackground"] + ";border-color: " + $params["thumbBorderColor"] + ";border-width: " + $params["thumbBorderWidth"] + ";box-shadow: " + $params["thumbBoxShadow"] + ";border-style: solid}\n" + $id + ".Slider3992224720--root .Slider2560888197--tick{background: " + $params["tickMarkColor"] + "}\n" + $id + ".Slider3992224720--root .Slider2560888197--tooltip{font-family: " + $params["tooltipFontFamily"] + ";font-size: " + $params["tooltipFontSize"] + ";color: " + $params["tooltipFontColor"] + ";background: " + $params["tooltipBackground"] + ";border-width: 0;border-radius: " + $params["tooltipBorderRadius"] + ";box-shadow: " + $params["tooltipBoxShadow"] + "}\n" + $id + ".Slider3992224720--root .Slider2560888197--tooltip::before{border-width: 0}\n" + $id + ".Slider3992224720--root[data-slider2560888197-orientation=\"horizontal\"] .Slider2560888197--tooltip[data-slider2560888197-normalposition]::after{border-color: " + $params["tooltipBackground"] + " transparent transparent transparent}\n" + $id + ".Slider3992224720--root[data-slider2560888197-orientation=\"horizontal\"] .Slider2560888197--tooltip[data-slider2560888197-acrossposition]::after{border-color: transparent transparent " + $params["tooltipBackground"] + " transparent}\n" + $id + ".Slider3992224720--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip[data-slider2560888197-normalposition]::after{border-color: transparent transparent transparent " + $params["tooltipBackground"] + "}\n" + $id + ".Slider3992224720--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--tooltip[data-slider2560888197-acrossposition]::after{border-color: transparent " + $params["tooltipBackground"] + " transparent transparent}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-hover] .Slider2560888197--thumbShape, " + $id + ".Slider3992224720--root:hover .Slider2560888197--thumbShape{background: " + $params["thumbBackgroundHover"] + ";border-color: " + $params["thumbBorderColorHover"] + ";border-width: " + $params["thumbBorderWidthHover"] + "}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-focus] .Slider2560888197--thumbShape, " + $id + ".Slider3992224720--root:focus .Slider2560888197--thumbShape{background: " + $params["thumbBackgroundFocus"] + ";border-color: " + $params["thumbBorderColorFocus"] + ";border-width: " + $params["thumbBorderWidthFocus"] + "}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-disabled] .Slider2560888197--thumbShape, " + $id + ".Slider3992224720--root[data-slider2560888197-disabled] .Slider2560888197--thumbShape{background: " + $params["thumbBackgroundDisabled"] + ";border-color: " + $params["thumbBorderColorDisabled"] + ";border-width: " + $params["thumbBorderWidthDisabled"] + "}\n" + $id + ".Slider3992224720--root .Slider2560888197--track{background: " + $params["trackBackground"] + ";border-radius: " + $params["trackBorderRadius"] + ";border-color: " + $params["trackBorderColor"] + ";border-width: " + $params["trackBorderWidth"] + ";box-shadow: " + $params["trackBoxShadow"] + "}\n" + $id + ".Slider3992224720--root .Slider2560888197--trackFill{background: " + $params["trackFill"] + ";border-radius: " + $params["trackBorderRadius"] + "}\n" + $id + ".Slider3992224720--root[data-slider2560888197-orientation=\"horizontal\"][data-slider2560888197-dir=\"ltr\"] .Slider2560888197--trackFill{border-top-left-radius: 0;border-bottom-left-radius: 0}\n" + $id + ".Slider3992224720--root[data-slider2560888197-orientation=\"horizontal\"][data-slider2560888197-dir=\"rtl\"] .Slider2560888197--trackFill{border-top-right-radius: 0;border-bottom-right-radius: 0}\n" + $id + ".Slider3992224720--root[data-slider2560888197-orientation=\"vertical\"] .Slider2560888197--trackFill{border-bottom-right-radius: 0;border-bottom-left-radius: 0}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-hover] .Slider2560888197--trackFill, " + $id + ".Slider3992224720--root:hover .Slider2560888197--trackFill{background: " + $params["trackFillHover"] + "}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-focus] .Slider2560888197--trackFill, " + $id + ".Slider3992224720--root:focus .Slider2560888197--trackFill{background: " + $params["trackFillFocus"] + "}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-disabled] .Slider2560888197--trackFill, " + $id + ".Slider3992224720--root[data-slider2560888197-disabled] .Slider2560888197--trackFill{background: " + $params["trackFillDisabled"] + "}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-hover] .Slider2560888197--track, " + $id + ".Slider3992224720--root:hover .Slider2560888197--track{background: " + $params["trackBackgroundHover"] + ";border-color: " + $params["trackBorderColorHover"] + ";border-width: " + $params["trackBorderWidthHover"] + "}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-focus] .Slider2560888197--track, " + $id + ".Slider3992224720--root:focus .Slider2560888197--track{background: " + $params["trackBackgroundFocus"] + ";border-color: " + $params["trackBorderColorFocus"] + ";border-width: " + $params["trackBorderWidthFocus"] + "}\n" + $id + ".Slider3992224720--root[data-slider3992224720-preview-disabled] .Slider2560888197--track, " + $id + ".Slider3992224720--root[data-slider2560888197-disabled] .Slider2560888197--track{background: " + $params["trackBackgroundDisabled"] + ";border-color: " + $params["trackBorderColorDisabled"] + ";border-width: " + $params["trackBorderWidthDisabled"] + "}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"circle\"]{border-radius: 50%}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"circle\"][data-slider2560888197-shapetype=\"circle\"]{border-radius: " + $params["thumbBorderRadius"] + "}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"square\"]{border-radius: 17px}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"square\"][data-slider2560888197-shapetype=\"square\"]{border-radius: " + $params["thumbBorderRadius"] + "}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"rectangle\"]{border-radius: 37px}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"rectangle\"][data-slider2560888197-shapetype=\"rectangle\"]{border-radius: " + $params["thumbBorderRadius"] + "}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"bar\"]{border-radius: 5px}\n" + $id + ".Slider3992224720--root .Slider2560888197--thumbShape[data-slider2560888197-shapetype=\"bar\"][data-slider2560888197-shapetype=\"bar\"]{border-radius: " + $params["thumbBorderRadius"] + "}\n";
};

/***/ }),

/***/ 441:
/*!************************************!*\
  !*** ./components/Slider/index.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Slider = __webpack_require__(/*! ./Slider */ 665);

var _SliderSt = __webpack_require__(/*! ./Slider.st.css */ 359);

var _SliderSt2 = _interopRequireDefault(_SliderSt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  componentType: 'wixui.Slider',
  component: _Slider.Slider,
  santaComponent: _Slider.santaSlider,
  skin: _SliderSt2.default.$skin
};

/***/ }),

/***/ 6:
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ../node_modules/@wix/search-box/dist/src/components/ClearButton/index.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/QuickResultItem/QuickResultItem.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/SearchBox.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/SearchIcon.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/index.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/measure/index.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/measure/measure.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SuggestionItem/SuggestionItem.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/index.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/clients/GoogleMaps/google2address/google2address.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/address-input/AddressInput.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/button-next/button-next.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/captcha/Captcha.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/deprecated/divider/Divider.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/dropdown-content/DropdownContent.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/dropdown-option/DropdownOption.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/dropdown-option/OptionFactory.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/dropdown/Dropdown.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/input-with-options/InputWithOptions.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/input/Input.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/linear-progress-bar/LinearProgressBar.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/pagination/PageStrip.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/pagination/Pagination.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/popover/Popover.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/popover/index.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/popover/modifiers.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/radio-button/RadioButton.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/slider/Slider.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/slider/Thumb.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/slider/Ticks.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/time-picker/Tickers.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/time-picker/TimePicker.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/Video.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/DailyMotion.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/Facebook.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/Playable.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/Twitch.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/Vimeo.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/YouTube.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/playerHOC.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/hocs/Focusable/FocusableHOC.js (referenced with cjs require) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ 665:
/*!*************************************!*\
  !*** ./components/Slider/Slider.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.santaSlider = exports.Slider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _createReactClass = __webpack_require__(/*! create-react-class */ 17);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _lodash = __webpack_require__(/*! lodash */ 2);

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = __webpack_require__(/*! prop-types */ 1);

var _slider = __webpack_require__(/*! wix-ui-core/slider */ 666);

var _SliderSt = __webpack_require__(/*! ./Slider.st.css */ 359);

var _SliderSt2 = _interopRequireDefault(_SliderSt);

var _santaComponents = __webpack_require__(/*! santa-components */ 15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = exports.Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider() {
    _classCallCheck(this, Slider);

    return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
  }

  _createClass(Slider, [{
    key: 'focus',
    value: function focus() {
      this.node.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.node.blur();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          previewState = _props.previewState,
          componentViewMode = _props.componentViewMode,
          isMobileView = _props.isMobileView,
          tooltipPosition = _props.tooltipPosition,
          orientation = _props.orientation,
          isDisabled = _props.isDisabled,
          restOfProps = _objectWithoutProperties(_props, ['previewState', 'componentViewMode', 'isMobileView', 'tooltipPosition', 'orientation', 'isDisabled']);

      var styles = (0, _SliderSt2.default)('root', _defineProperty({}, 'preview-' + previewState, true), restOfProps);
      var shouldAlwaysShowTooltip = componentViewMode === 'editor' && this.props.tooltipVisibility !== 'none';
      var overriddenProps = {
        tooltipVisibility: shouldAlwaysShowTooltip ? 'always' : this.props.tooltipVisibility,
        tooltipPosition: isMobileView ? 'normal' : tooltipPosition,
        orientation: isMobileView ? 'horizontal' : orientation
      };
      var overriddenStyle = {
        width: this.props.style.width,
        height: this.props.style.height
      };

      return _react2.default.createElement(_slider.Slider, _extends({
        ref: function ref(node) {
          return _this2.node = node;
        }
      }, restOfProps, styles, overriddenProps, {
        disabled: isDisabled,
        style: overriddenStyle,
        'aria-label': 'range'
      }));
    }
  }]);

  return Slider;
}(_react2.default.Component);

Slider.displayName = 'Slider';
Slider.propTypes = {
  previewState: _propTypes.string,
  tooltipVisibility: _propTypes.string,
  componentViewMode: _propTypes.string,
  tooltipPosition: _propTypes.string,
  orientation: _propTypes.string,
  isMobileView: _propTypes.bool,
  isDisabled: _propTypes.bool,
  style: _propTypes.object
};
Slider.defaultProps = {
  style: { width: 0, height: 0 }
};

var skinBasedComp = _santaComponents.mixins.skinBasedComp,
    runTimeCompData = _santaComponents.mixins.runTimeCompData,
    inputFocusMixin = _santaComponents.mixins.inputFocusMixin;


var getComponentSkins = function getComponentSkins() {
  return {
    'wixui.skins.Slider': _SliderSt2.default.$skin
  };
};

/**
 * @class components.slider
 * @extends {core.skinBasedComp}
 */

var santaSlider = exports.santaSlider = (0, _createReactClass2.default)({
  displayName: 'Slider',

  mixins: [skinBasedComp(getComponentSkins()), runTimeCompData, inputFocusMixin],

  propTypes: {
    structure: _santaComponents.santaTypesDefinitions.Component.structure.isRequired,
    compProp: _santaComponents.santaTypesDefinitions.Component.compProp.isRequired,
    compData: _santaComponents.santaTypesDefinitions.Component.compData.isRequired,
    componentViewMode: _santaComponents.santaTypesDefinitions.RenderFlags.componentViewMode,
    componentPreviewState: _santaComponents.santaTypesDefinitions.RenderFlags.componentPreviewState,
    styleId: _santaComponents.santaTypesDefinitions.Component.styleId,
    style: _santaComponents.santaTypesDefinitions.Component.style,
    isMobileView: _santaComponents.santaTypesDefinitions.isMobileView
  },

  statics: {
    compSpecificIsDomOnlyOverride: function compSpecificIsDomOnlyOverride() {
      return false;
    },
    behaviors: _lodash2.default.clone(inputFocusMixin.INPUT_FOCUS_BEHAVIORS),
    getComponentSkins: getComponentSkins
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.compData.value
    };
  },
  UNSAFE_componentWillReceiveProps: function UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-line
    this.setState({ value: nextProps.compData.value });
  },
  handleChange: function handleChange(value) {
    var nextState = { value: value };
    this.setState(nextState);
    this.updateData(nextState);
    this.handleAction('change', nextState);
  },
  focus: function focus() {
    this.sliderRef.focus();
  },
  blur: function blur() {
    this.sliderRef.blur();
  },
  handleFocus: function handleFocus() {
    this.handleAction('focus');
  },
  handleBlur: function handleBlur() {
    this.handleAction('blur');
  },
  getSkinProperties: function getSkinProperties() {
    var _this3 = this;

    var sliderProps = _lodash2.default.assign({}, this.props.compData, this.props.compProp, {
      styleId: this.props.styleId,
      className: this.props.styleId,
      style: this.props.style,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      value: this.state.value,
      width: _lodash2.default.get(this.props.structure, 'layout.width', 0),
      height: _lodash2.default.get(this.props.structure, 'layout.height', 0),
      previewState: this.props.componentPreviewState,
      componentViewMode: this.props.componentViewMode,
      isMobileView: this.props.isMobileView,
      ref: function ref(sliderRef) {
        _this3.sliderRef = sliderRef;
      }
    });

    return {
      '': {
        children: [_santaComponents.utils.createReactElement(Slider, sliderProps)]
      }
    };
  }
});

/***/ }),

/***/ 666:
/*!*********************************************!*\
  !*** ../node_modules/wix-ui-core/slider.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/src/components/slider */ 667);


/***/ }),

/***/ 667:
/*!***********************************************************************!*\
  !*** ../node_modules/wix-ui-core/dist/src/components/slider/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Slider_1 = __webpack_require__(/*! ./Slider */ 668);
exports.Slider = Slider_1.Slider;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 668:
/*!************************************************************************!*\
  !*** ../node_modules/wix-ui-core/dist/src/components/slider/Slider.js ***!
  \************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ 6);
var React = __webpack_require__(/*! react */ 0);
var Ticks_1 = __webpack_require__(/*! ./Ticks */ 669);
var Thumb_1 = __webpack_require__(/*! ./Thumb */ 670);
var Slider_st_css_1 = __webpack_require__(/*! ./Slider.st.css */ 358);
var noop = __webpack_require__(/*! lodash/noop */ 671);
var CONTINUOUS_STEP = 0.01;
var Slider = /** @class */ (function (_super) {
    tslib_1.__extends(Slider, _super);
    function Slider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dragging: false,
            mouseDown: false,
            thumbHover: false,
            inKeyPress: false,
        };
        _this.setTrackNode = function (track) {
            _this.track = track;
        };
        _this.handleBlur = function () {
            _this.setState({ inKeyPress: false });
            _this.props.onBlur();
        };
        _this.handleMouseDown = function () {
            _this.setState({ mouseDown: true });
        };
        _this.handleMouseUp = function () {
            _this.setState({ mouseDown: false, dragging: false });
        };
        _this.handleKeyDown = function (ev) {
            var _a = _this.props, min = _a.min, max = _a.max, value = _a.value, disabled = _a.disabled, readOnly = _a.readOnly, dir = _a.dir;
            var ltr = dir === 'ltr';
            if (disabled || readOnly) {
                return;
            }
            var step = _this.getStepValue();
            var nextValue;
            switch (ev.key) {
                case 'ArrowDown':
                    nextValue = value - step;
                    break;
                case 'ArrowLeft':
                    if (ltr) {
                        nextValue = value - step;
                    }
                    else {
                        nextValue = value + step;
                    }
                    break;
                case 'ArrowUp':
                    nextValue = value + step;
                    break;
                case 'ArrowRight':
                    if (ltr) {
                        nextValue = value + step;
                    }
                    else {
                        nextValue = value - step;
                    }
                    break;
                case 'PageDown':
                    nextValue = value - 0.1 * (max - min);
                    break;
                case 'PageUp':
                    nextValue = value + 0.1 * (max - min);
                    break;
                case 'Home':
                    nextValue = min;
                    break;
                case 'End':
                    nextValue = max;
                    break;
                default:
                    nextValue = undefined;
            }
            if (typeof nextValue !== 'undefined') {
                _this.handleChange(nextValue);
                _this.setState({
                    inKeyPress: true,
                });
                ev.preventDefault();
            }
        };
        _this.handleMouseMove = function (ev) {
            if (_this.state.mouseDown && !_this.state.dragging) {
                _this.setState({ dragging: true });
            }
            if (_this.state.dragging) {
                _this.moveThumbByMouse(ev);
            }
        };
        _this.handleThumbEnter = function () {
            _this.setState({ thumbHover: true });
        };
        _this.handleThumbLeave = function () {
            _this.setState({ thumbHover: false });
        };
        _this.moveThumbByMouse = function (ev) {
            if (ev.touches) {
                ev.preventDefault();
                ev = ev.touches[0];
            }
            var _a = _this.props, min = _a.min, max = _a.max, disabled = _a.disabled, readOnly = _a.readOnly, dir = _a.dir;
            var rtl = _this.isRtl();
            if (disabled || readOnly) {
                return;
            }
            var isVertical = _this.isVertical();
            var step = _this.getStepValue();
            var thumbSize = _this.getThumbSizeMainAxis();
            var totalSteps = Math.ceil((max - min) / step);
            var rect = _this.track.getBoundingClientRect();
            var value, pxStep, sliderPos;
            if (isVertical) {
                sliderPos = rect.bottom - (ev.clientY + thumbSize / 2);
                pxStep = (rect.height - thumbSize) / totalSteps;
            }
            else {
                if (rtl) {
                    sliderPos = rect.left + rect.width - thumbSize / 2 - ev.clientX;
                }
                else {
                    sliderPos = ev.clientX - (rect.left + thumbSize / 2);
                }
                pxStep = (rect.width - thumbSize) / totalSteps;
            }
            value = min + step * Math.round(sliderPos / pxStep);
            _this.handleChange(value);
        };
        return _this;
    }
    Slider.prototype.componentDidMount = function () {
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('touchend', this.handleMouseUp);
        document.addEventListener('touchmove', this.handleMouseMove, {
            passive: false,
        });
    };
    Slider.prototype.componentWillUnmount = function () {
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('touchend', this.handleMouseUp);
        document.removeEventListener('touchmove', this.handleMouseMove);
    };
    Slider.prototype.focus = function () {
        this.root.focus();
        this.props.onFocus();
    };
    Slider.prototype.blur = function () {
        this.root.blur();
        this.props.onBlur();
    };
    Slider.prototype.getStartPos = function () {
        return this.props.dir === 'rtl' ? 'right' : 'left';
    };
    Slider.prototype.calcDiscreteStepValue = function (min, max, step, stepType) {
        if (stepType === 'count') {
            return (max - min) / step;
        }
        return step;
    };
    Slider.prototype.getStepValue = function () {
        var _a = this.props, min = _a.min, max = _a.max, step = _a.step, stepType = _a.stepType;
        if (step > 0) {
            return this.calcDiscreteStepValue(min, max, step, stepType);
        }
        return CONTINUOUS_STEP;
    };
    Slider.prototype.isShallowEqual = function (v, o) {
        for (var key in v) {
            if (!(key in o) || v[key] !== o[key]) {
                return false;
            }
        }
        for (var key in o) {
            if (!(key in v) || v[key] !== o[key]) {
                return false;
            }
        }
        return true;
    };
    Slider.prototype.getSliderSize = function () {
        var _a = this.props.style, width = _a.width, height = _a.height;
        var isVertical = this.isVertical();
        var val = isVertical ? width : height;
        return Math.min(val, Math.min(width, height));
    };
    Slider.prototype.getSliderLength = function () {
        return this.isVertical() ? this.props.style.height : this.props.style.width;
    };
    Slider.prototype.getThumbSize = function () {
        var size = Thumb_1.getThumbSize(this.props.thumbShape, this.getSliderSize(), this.isVertical());
        var offsets = this.getInnerOffsets();
        var offset = offsets.offsetHeight || offsets.offsetWidth || 0;
        return {
            width: size.width - offset,
            height: size.height - offset,
        };
    };
    Slider.prototype.getThumbSizeMainAxis = function () {
        var size = this.getThumbSize();
        return this.isVertical() ? size.height : size.width;
    };
    Slider.prototype.getThumbSizeCrossAxis = function () {
        var size = this.getThumbSize();
        return this.isVertical() ? size.width : size.height;
    };
    Slider.prototype.handleChange = function (value) {
        value = this.floorValue(this.clamp(value, this.props.min, this.props.max), 2);
        if (value !== this.props.value) {
            this.props.onChange(value);
        }
    };
    Slider.prototype.clamp = function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    };
    Slider.prototype.isRtl = function () {
        return this.props.dir === 'rtl';
    };
    Slider.prototype.isVertical = function () {
        return this.props.orientation === 'vertical';
    };
    Slider.prototype.isContinuous = function () {
        return !this.props.step;
    };
    Slider.prototype.shouldShowTooltip = function () {
        switch (this.props.tooltipVisibility) {
            case 'always':
                return true;
            case 'none':
                return false;
            default:
            case 'hover':
                return (this.state.dragging || this.state.thumbHover || this.state.inKeyPress);
        }
    };
    Slider.prototype.calcThumbProgressPosition = function () {
        var thumbSize = this.getThumbSizeMainAxis();
        var _a = this.props, value = _a.value, min = _a.min, max = _a.max;
        var pct = (value - min) / (max - min);
        var clampedPct = this.clamp(pct, 0, 1);
        return "calc(" + clampedPct + " *(100% - " + thumbSize + "px))";
    };
    Slider.prototype.calcTrackFillPosition = function () {
        var thumbSize = this.getThumbSizeMainAxis();
        var _a = this.props, value = _a.value, min = _a.min, max = _a.max;
        var pct = (value - min) / (max - min);
        var clampedPct = this.clamp(pct, 0, 1);
        return "calc(" + clampedPct + " *(100% - " + thumbSize + "px) + " + thumbSize + "px - 2px)";
    };
    Slider.prototype.calcThumbCrossPosition = function () {
        var thumbSize = this.getThumbSizeCrossAxis();
        return "calc(50% - " + thumbSize / 2 + "px)";
    };
    Slider.prototype.calcThumbPosition = function () {
        var _a;
        var progressVal = this.calcThumbProgressPosition();
        var crossVal = this.calcThumbCrossPosition();
        if (this.isVertical()) {
            return { bottom: progressVal, left: 0 };
        }
        return _a = {}, _a[this.getStartPos()] = progressVal, _a.top = 0, _a;
    };
    Slider.prototype.floorValue = function (value, precision) {
        if (precision === void 0) { precision = 1; }
        var clampedValue = Math.floor(Math.pow(10, precision) * value) / Math.pow(10, precision);
        return clampedValue;
    };
    Slider.prototype.renderTooltip = function () {
        var _a;
        if (!this.shouldShowTooltip()) {
            return null;
        }
        var tooltipPosition = this.props.tooltipPosition;
        var positionClassname = tooltipPosition + 'Position';
        var clampedValue = this.floorValue(this.props.value);
        return (React.createElement("div", tslib_1.__assign({ "data-hook": "tooltip" }, Slider_st_css_1.default('tooltip', (_a = {}, _a[positionClassname] = true, _a))),
            this.props.tooltipPrefix,
            clampedValue,
            this.props.tooltipSuffix));
    };
    Slider.prototype.ticksShown = function () {
        return !this.isContinuous() && this.props.tickMarksShape !== 'none';
    };
    Slider.prototype.getInnerOffsets = function () {
        var showTicks = this.ticksShown();
        if (!showTicks) {
            return {};
        }
        var isHorizontal = !this.isVertical();
        var tickSize = this.props.tickMarksShape === 'line' ? 10 : 3;
        var tickMarksPos = this.props.tickMarksPosition;
        var tickMarksGap = 12;
        var offsetWidth, offsetHeight, offsetLeft, offsetTop;
        if (tickMarksPos === 'normal') {
            offsetHeight = tickSize + tickMarksGap;
        }
        else if (tickMarksPos === 'across') {
            offsetTop = tickSize + tickMarksGap;
            offsetHeight = tickSize + tickMarksGap;
        }
        if (isHorizontal) {
            return { offsetHeight: offsetHeight, offsetTop: offsetTop };
        }
        return { offsetWidth: offsetHeight, offsetLeft: offsetTop };
    };
    Slider.prototype.getInnerDims = function () {
        var offsets = this.getInnerOffsets();
        var style = {};
        if (offsets.offsetTop) {
            style.top = offsets.offsetTop;
        }
        if (offsets.offsetLeft) {
            style.left = offsets.offsetLeft;
        }
        if (offsets.offsetHeight) {
            style.height = "calc(100% - " + offsets.offsetHeight + "px)";
        }
        if (offsets.offsetWidth) {
            style.width = "calc(100% - " + offsets.offsetWidth + "px)";
        }
        return style;
    };
    Slider.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, min = _a.min, max = _a.max, trackSize = _a.trackSize, disabled = _a.disabled, dir = _a.dir, onFocus = _a.onFocus, tickMarksPosition = _a.tickMarksPosition, tickMarksShape = _a.tickMarksShape, thumbShape = _a.thumbShape, orientation = _a.orientation, style = _a.style;
        var vertical = this.isVertical();
        var thumbSize = this.getThumbSize();
        var crossThumbSize = this.getThumbSizeCrossAxis();
        var mainThumbSize = this.getThumbSizeMainAxis();
        var showTicks = this.ticksShown();
        var step = this.getStepValue();
        var thumbPosition = this.calcThumbPosition();
        var trackStyle = vertical
            ? { width: trackSize + "%" }
            : { height: trackSize + "%" };
        var trackFillPosition = vertical
            ? {
                bottom: 0,
                height: this.calcTrackFillPosition(),
            }
            : {
                width: this.calcTrackFillPosition(),
            };
        return (React.createElement("div", tslib_1.__assign({}, Slider_st_css_1.default('root', {
            orientation: vertical ? 'vertical' : 'horizontal',
            dir: dir,
            tickMarksPosition: tickMarksPosition,
            tickMarksShape: tickMarksShape,
            disabled: disabled,
        }, this.props), { onMouseDown: this.handleMouseDown, onTouchStart: this.handleMouseDown, onKeyDown: this.handleKeyDown, onFocus: onFocus, onBlur: this.handleBlur, "data-value": value, "data-min": min, "data-max": max, "data-orientation": orientation, "data-dir": dir, tabIndex: 0, style: style, ref: function (root) { return (_this.root = root); }, role: "slider", "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, "aria-label": this.props['aria-label'] }),
            React.createElement("div", { className: Slider_st_css_1.default.inner, style: this.getInnerDims() },
                React.createElement("div", { "data-hook": "track", ref: this.setTrackNode, className: Slider_st_css_1.default.track, onClick: this.moveThumbByMouse, style: trackStyle },
                    React.createElement("div", { className: Slider_st_css_1.default.trackFill, style: trackFillPosition })),
                React.createElement(Thumb_1.Thumb, { shape: thumbShape, thumbPosition: thumbPosition, thumbSize: thumbSize, onMouseEnter: this.handleThumbEnter, onMouseLeave: this.handleThumbLeave }, this.renderTooltip())),
            showTicks && (React.createElement(Ticks_1.Ticks, { pStyle: Slider_st_css_1.default, step: step, min: min, max: max, thumbSize: mainThumbSize, vertical: vertical, trackSize: vertical
                    ? this.props.style.height - mainThumbSize
                    : this.props.style.width - crossThumbSize, tickMarksShape: tickMarksShape, onTickClick: this.moveThumbByMouse }))));
    };
    Slider.displayName = 'Slider';
    Slider.defaultProps = {
        min: 0,
        max: 10,
        value: 5,
        stepType: 'value',
        thumbShape: 'circle',
        orientation: 'horizontal',
        disabled: false,
        readOnly: false,
        tooltipVisibility: 'hover',
        tooltipPosition: 'normal',
        tooltipPrefix: '',
        tooltipSuffix: '',
        tickMarksPosition: 'normal',
        tickMarksShape: 'line',
        dir: 'ltr',
        onFocus: noop,
        onBlur: noop,
        style: {
            width: 0,
            height: 0,
        },
    };
    return Slider;
}(React.PureComponent));
exports.Slider = Slider;
//# sourceMappingURL=Slider.js.map

/***/ }),

/***/ 669:
/*!***********************************************************************!*\
  !*** ../node_modules/wix-ui-core/dist/src/components/slider/Ticks.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ 6);
var React = __webpack_require__(/*! react */ 0);
var Ticks = /** @class */ (function (_super) {
    tslib_1.__extends(Ticks, _super);
    function Ticks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ticks.prototype.calcMaximumTickDensity = function () {
        if (this.props.tickMarksShape === 'line') {
            return 1 / 8;
        }
        return 1 / 16;
    };
    Ticks.prototype.calcStep = function () {
        var _a = this.props, step = _a.step, min = _a.min, max = _a.max, trackSize = _a.trackSize;
        var totalTickCount = (max - min) / Number(step);
        var density = Math.min(totalTickCount / trackSize, this.calcMaximumTickDensity());
        var adjustedStep = (max - min) / (trackSize * density);
        return adjustedStep;
    };
    Ticks.prototype.renderTick = function (i, min, max, vertical, thumbSize, pStyle) {
        var tickMarksShape = this.props.tickMarksShape;
        var pct = (i - min) / (max - min);
        var val = "calc(" + pct + " * calc(100% - " + thumbSize + "px) + " + thumbSize /
            2 + "px)";
        return (React.createElement("div", tslib_1.__assign({}, pStyle('tick', { tickMarksShape: tickMarksShape }), { key: i, "data-hook": "tick", onClick: this.props.onTickClick, style: vertical ? { bottom: val } : { left: val } })));
    };
    Ticks.prototype.render = function () {
        var _a = this.props, min = _a.min, max = _a.max, thumbSize = _a.thumbSize, vertical = _a.vertical, trackSize = _a.trackSize, pStyle = _a.pStyle;
        if (!trackSize) {
            return null;
        }
        var step = this.calcStep();
        var ticks = [];
        for (var i = min; i < max; i += step) {
            ticks.push(this.renderTick(i, min, max, vertical, thumbSize, pStyle));
        }
        ticks.push(this.renderTick(max, min, max, vertical, thumbSize, pStyle));
        return React.createElement("div", { "data-hook": "ticks-wrapper" }, ticks);
    };
    return Ticks;
}(React.PureComponent));
exports.Ticks = Ticks;
//# sourceMappingURL=Ticks.js.map

/***/ }),

/***/ 670:
/*!***********************************************************************!*\
  !*** ../node_modules/wix-ui-core/dist/src/components/slider/Thumb.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ 6);
var React = __webpack_require__(/*! react */ 0);
var Slider_st_css_1 = __webpack_require__(/*! ./Slider.st.css */ 358);
var Thumb = /** @class */ (function (_super) {
    tslib_1.__extends(Thumb, _super);
    function Thumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Thumb.prototype.render = function () {
        var _a = this.props, shape = _a.shape, thumbSize = _a.thumbSize;
        var ThumbShape = thumbShapes[shape];
        return (React.createElement("div", { "data-hook": "thumb", className: Slider_st_css_1.default.thumb, onMouseEnter: this.props.onMouseEnter, onMouseLeave: this.props.onMouseLeave, style: tslib_1.__assign({}, this.props.thumbPosition, thumbSize) },
            React.createElement(ThumbShape.component, null),
            this.props.children));
    };
    return Thumb;
}(React.Component));
exports.Thumb = Thumb;
function getThumbSize(shape) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var _a;
    return (_a = thumbShapes[shape]).getThumbSize.apply(_a, rest);
}
exports.getThumbSize = getThumbSize;
var CircleThumb = /** @class */ (function (_super) {
    tslib_1.__extends(CircleThumb, _super);
    function CircleThumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircleThumb.prototype.render = function () {
        return (React.createElement("div", tslib_1.__assign({}, Slider_st_css_1.default('thumbShape', { shapeType: 'circle' }), { style: { borderRadius: '50%' } })));
    };
    return CircleThumb;
}(React.PureComponent));
var RectangleThumb = /** @class */ (function (_super) {
    tslib_1.__extends(RectangleThumb, _super);
    function RectangleThumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RectangleThumb.prototype.render = function () {
        return React.createElement("div", tslib_1.__assign({}, Slider_st_css_1.default('thumbShape', { shapeType: 'rectangle' })));
    };
    return RectangleThumb;
}(React.PureComponent));
var SquareThumb = /** @class */ (function (_super) {
    tslib_1.__extends(SquareThumb, _super);
    function SquareThumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SquareThumb.prototype.render = function () {
        return React.createElement("div", tslib_1.__assign({}, Slider_st_css_1.default('thumbShape', { shapeType: 'square' })));
    };
    return SquareThumb;
}(React.PureComponent));
var BarThumb = /** @class */ (function (_super) {
    tslib_1.__extends(BarThumb, _super);
    function BarThumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarThumb.prototype.render = function () {
        return React.createElement("div", tslib_1.__assign({}, Slider_st_css_1.default('thumbShape', { shapeType: 'bar' })));
    };
    return BarThumb;
}(React.PureComponent));
var thumbShapes = {
    circle: {
        component: CircleThumb,
        getThumbSize: function (sliderSize) { return ({ width: sliderSize, height: sliderSize }); },
    },
    rectangle: {
        component: RectangleThumb,
        getThumbSize: function (sliderSize, isVertical) {
            var _a;
            return (_a = {},
                _a[isVertical ? 'height' : 'width'] = 1.5 * sliderSize,
                _a[isVertical ? 'width' : 'height'] = sliderSize,
                _a);
        },
    },
    square: {
        component: SquareThumb,
        getThumbSize: function (sliderSize) { return ({ width: sliderSize, height: sliderSize }); },
    },
    bar: {
        component: BarThumb,
        getThumbSize: function (sliderSize, isVertical) {
            var _a;
            return (_a = {},
                _a[isVertical ? 'height' : 'width'] = 0.5 * sliderSize,
                _a[isVertical ? 'width' : 'height'] = sliderSize,
                _a);
        },
    },
};
//# sourceMappingURL=Thumb.js.map

/***/ }),

/***/ 671:
/*!**************************************!*\
  !*** ../node_modules/lodash/noop.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! lodash */ 2).noop

/***/ }),

/***/ 9:
/*!*********************************************!*\
  !*** ../node_modules/fbjs/lib/invariant.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ })

}]);
//# sourceMappingURL=wixui.Slider.chunk.js.map