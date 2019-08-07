((typeof self !== 'undefined' ? self : this)["webpackJsonp_wix_ui_santa"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp_wix_ui_santa"] || []).push([[40],{

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

/***/ 200:
/*!**************************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/ProgressBar/ProgressBar.st.css ***!
  \**************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "ProgressBar4187730703",
  {"mixin-range-track":"ProgressBar4187730703--mixin-range-track","mixin-range-thumb":"ProgressBar4187730703--mixin-range-thumb","container":"ProgressBar4187730703--container","loading":"ProgressBar4187730703--loading","progress":"ProgressBar4187730703--progress","range":"ProgressBar4187730703--range","root":"ProgressBar4187730703--root","range-track-height":"4px","range-thumb-height":"4px","range-thumb-hover-height":"12px","range-thumb-bg":"#fff","border-radius":"50px","progress-size":"12px","progress-bar-stripes":"ProgressBar4187730703--progress-bar-stripes"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/ProgressBar/ProgressBar.st.css */ 200
);



/***/ }),

/***/ 223:
/*!***************************************************!*\
  !*** ./components/MusicPlayer/MusicPlayer.st.css ***!
  \***************************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "MusicPlayer2902040282",
  {"root":"MusicPlayer2902040282--root","title":"MusicPlayer2902040282--title","cover":"MusicPlayer2902040282--cover","progressRangeBar":"MusicPlayer2902040282--progressRangeBar","playButton":"MusicPlayer2902040282--playButton","titleLayout":"MusicPlayer2902040282--titleLayout","progressLayout":"MusicPlayer2902040282--progressLayout","timeStamp":"MusicPlayer2902040282--timeStamp","playLayout":"MusicPlayer2902040282--playLayout","mainLayout":"MusicPlayer2902040282--mainLayout","upperLayout":"MusicPlayer2902040282--upperLayout","lowerLayout":"MusicPlayer2902040282--lowerLayout","coverLayout":"MusicPlayer2902040282--coverLayout","backgroundColor":"color_11","font":"font_8","regularColor":"color_15","hoverColor":"color_18","borderColor":"color_15","borderSize":"0","borderRadius":"0","boxShadow":"none"},
  "",
  2,
  /*! ./components/MusicPlayer/MusicPlayer.st.css */ 223
);

exports.default.$skin = {"params":{"backgroundColor":"COLOR_ALPHA","font":"FONT","regularColor":"COLOR","hoverColor":"COLOR","borderColor":"BORDER_COLOR_ALPHA","borderSize":"BORDER_SIZE","borderRadius":"BORDER_RADIUS","boxShadow":"BOX_SHADOW"},"paramsDefaults":{"backgroundColor":"color_11","font":"font_8","regularColor":"color_15","hoverColor":"color_18","borderColor":"color_15","borderSize":"0","borderRadius":"0","boxShadow":"none"}};
exports.default.$skin.$render = function render_css($id, $params, $functions) {
  return "\n" + $id + " .PlayPauseAnimated2824183530--button{display: block;width: 20px;height: 20px;padding: 0;border: 0;fill: currentColor;background: transparent;cursor: pointer;color: currentColor;transition: color .4s ease, opacity .4s ease}\n" + $id + " .ArtistName359008608--title{color: inherit;font-size: 16px;line-height: 1;display: inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}\n" + $id + " .TimeStamp3517976143--time{display: block;padding: 4px 0 4px 12px;opacity: .6;font-size: 12px;line-height: 1;white-space: nowrap;font-family: Helvetica Neue, HelveticaNeue-Light, Helvetica Neue Light, Avenir, Gordita, Helvetica, Arial, sans-serif}\n" + $id + " .TrackName1300930541--title{color: inherit;font-size: 16px;line-height: 1;display: inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}\n" + $id + " .PlayPause3591112310--button{display: block;width: 16px;height: 20px;padding: 0;border: 0;fill: currentColor;background: transparent;cursor: pointer;color: currentColor;transition: color .4s ease, opacity .4s ease}\n" + $id + " .Cover1797498688--cover{display: block;width: 70px;height: 70px;background-position: center;background-size: cover}\n" + $id + " .ProgressBar4187730703--mixin-range-track{background: transparent;border: 0;border-radius: 50px;height: 100%;user-select: none}\n" + $id + " .ProgressBar4187730703--mixin-range-thumb{background: #fff;border: 0;border-radius: 50px;height: 4px;width: 4px;margin: 0;position: relative;transition: all 0.3s ease}\n" + $id + " .ProgressBar4187730703--container{position: relative;width: 100%;height: 4px;margin: 8px 0}\n" + $id + " .ProgressBar4187730703--container::before, " + $id + " .ProgressBar4187730703--container::after{content: '';position: absolute;top: 0;left: 0;width: 100%;height: 100%;border-radius: 50px;display: none}\n" + $id + " .ProgressBar4187730703--container::before{display: block;opacity: .2;background: currentColor}\n@keyframes ProgressBar4187730703--progress-bar-stripes{\n  from{background-position: 12px 0}\n  to{background-position: 0 0}\n}\n" + $id + " .ProgressBar4187730703--container.ProgressBar4187730703--loading::after{display: block;pointer-events: none;opacity: .15;background: linear-gradient(45deg,currentColor 25%,transparent 25%,transparent 50%,currentColor 50%,currentColor 75%,transparent 75%,transparent);background-size: 12px 12px;animation: ProgressBar4187730703--progress-bar-stripes 1s linear infinite}\n" + $id + " .ProgressBar4187730703--progress{position: absolute;top: 0;left: 0;width: 100%;height: 100%;margin: 0;border: 0;border-radius: 50px;background-color: transparent;color: currentColor;opacity: .3;-webkit-appearance: none}\n" + $id + " .ProgressBar4187730703--progress::-webkit-progress-bar{background-color: transparent;border-radius: 50px}\n" + $id + " .ProgressBar4187730703--progress::-moz-progress-bar{background-color: currentColor;border-radius: 50px}\n" + $id + " .ProgressBar4187730703--progress::-webkit-progress-value{background-color: currentColor;border-radius: 50px}\n" + $id + " .ProgressBar4187730703--progress::-ms-fill{border-radius: 50px}\n" + $id + " .ProgressBar4187730703--range{position: absolute;top: -8px;left: 0;width: 100%;height: 100%;display: block;box-sizing: content-box;padding: 8px 0;margin: 0;border: 0;border-radius: 50px;background: transparent;color: currentColor;transition: color 0.3s ease;cursor: pointer;-webkit-appearance: none}\n" + $id + " .ProgressBar4187730703--range::-webkit-slider-runnable-track{background: transparent;border: 0;border-radius: 50px;height: 100%;user-select: none;background-image: linear-gradient(to right,currentColor var(--value,0%),transparent var(--value,0%))}\n" + $id + " .ProgressBar4187730703--range::-webkit-slider-thumb{background: #fff;border: 0;border-radius: 50px;height: 4px;width: 4px;margin: 0;position: relative;transition: all 0.3s ease;transform: translateX(var(--value,0%));margin-left: -2px;-webkit-appearance: none}\n" + $id + " .ProgressBar4187730703--range::-moz-range-track{background: transparent;border: 0;border-radius: 50px;height: 100%;user-select: none}\n" + $id + " .ProgressBar4187730703--range::-moz-range-thumb{background: #fff;border: 0;border-radius: 50px;height: 4px;width: 4px;margin: 0;position: relative;transition: all 0.3s ease;transform: translateX(-2px)}\n" + $id + " .ProgressBar4187730703--range::-moz-range-progress{background: currentColor;border-radius: 50px;height: 100%}\n" + $id + " .ProgressBar4187730703--range::-moz-focus-outer{border: 0}\n" + $id + " .ProgressBar4187730703--range:hover::-webkit-slider-thumb, " + $id + " .ProgressBar4187730703--range:active::-webkit-slider-thumb{transform: scale(3)}\n" + $id + " .ProgressBar4187730703--range:hover::-moz-range-thumb, " + $id + " .ProgressBar4187730703--range:active::-moz-range-thumb{transform: scale(3)}\n" + $id + " .ProgressBar4187730703--range:hover::-ms-thumb, " + $id + " .ProgressBar4187730703--range:active::-ms-thumb{transform: scale(3)}\n" + $id + " .Mute2509028899--button{display: block;padding: 0;border: 0;background: transparent;outline: 0;cursor: pointer;color: inherit;transition: color .4s ease, opacity .4s ease}\n" + $id + " .Rate4132433626--button{display: block;padding: 0;border: 0;background: transparent;outline: 0;cursor: pointer;color: inherit;transition: color .4s ease, opacity .4s ease}\n" + $id + " .Forward3758161361--button{display: block;padding: 0;border: 0;background: transparent;outline: 0;cursor: pointer;color: inherit;transition: color .4s ease, opacity .4s ease}\n" + $id + ".MusicPlayer2902040282--root{box-shadow: none;border: " + $params["borderSize"] + " solid " + $params["borderColor"] + ";border-radius: " + $params["borderRadius"] + ";position: relative;width: 100%;height: 70px;text-align: left;background: " + $params["backgroundColor"] + ";color: " + $params["regularColor"] + ";font: " + $params["font"] + ";overflow: hidden;box-sizing: border-box;display: flex}\n" + $id + " .MusicPlayer2902040282--title{text-align: left;font-size: inherit}\n" + $id + " .MusicPlayer2902040282--title + .MusicPlayer2902040282--title{opacity: 0.6}\n" + $id + " .MusicPlayer2902040282--title + .MusicPlayer2902040282--title::before{content: '-';padding: 0.4em;opacity: 1}\n" + $id + " .MusicPlayer2902040282--title:empty + .MusicPlayer2902040282--title::before{content: '';display: none}\n" + $id + " .MusicPlayer2902040282--title + .MusicPlayer2902040282--title:empty::before{content: '';display: none}\n" + $id + " .MusicPlayer2902040282--cover{height: 100%;width: 100%}\n" + $id + " .MusicPlayer2902040282--progressRangeBar::-webkit-slider-thumb{background-color: " + $params["regularColor"] + "}\n" + $id + " .MusicPlayer2902040282--progressRangeBar::-moz-range-thumb{background-color: " + $params["regularColor"] + "}\n" + $id + " .MusicPlayer2902040282--progressRangeBar:hover{color: " + $params["hoverColor"] + "}\n" + $id + " .MusicPlayer2902040282--playButton:hover{color: " + $params["hoverColor"] + "}\n" + $id + " .MusicPlayer2902040282--titleLayout{display: flex;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}\n" + $id + " .MusicPlayer2902040282--progressLayout{width: auto;flex-grow: 1}\n" + $id + " .MusicPlayer2902040282--timeStamp{opacity: 1;font-size: 12px;line-height: 16px;padding: 2px 0}\n" + $id + " .MusicPlayer2902040282--playLayout{margin-right: 14px}\n" + $id + " .MusicPlayer2902040282--mainLayout{display: flex;flex-direction: column;justify-content: space-around;padding: 12px 16px;width: 100%;overflow: hidden;box-sizing: border-box}\n" + $id + " .MusicPlayer2902040282--upperLayout{display: flex;box-sizing: border-box;width: 100%}\n" + $id + " .MusicPlayer2902040282--lowerLayout{display: flex;align-items: center;width: 100%}\n" + $id + " .MusicPlayer2902040282--coverLayout{width: 70px;flex: 0 0 70px}\n" + $id + ".MusicPlayer2902040282--root[data-musicplayer2902040282-hassinglerow]{height: 40px}\n" + $id + ".MusicPlayer2902040282--root[data-musicplayer2902040282-hasprogressbar] .MusicPlayer2902040282--timeStamp{opacity: 0.6;padding-left: 12px}\n" + $id + ".MusicPlayer2902040282--root[data-musicplayer2902040282-hasonlyplay] .MusicPlayer2902040282--playLayout{position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);margin-right: 0}\n" + $id + ".MusicPlayer2902040282--root[data-musicplayer2902040282-hassinglerow] .MusicPlayer2902040282--coverLayout{width: 40px;flex-basis: 40px}\n" + $id + ".MusicPlayer2902040282--root[data-musicplayer2902040282-hastitletimerow] .MusicPlayer2902040282--timeStamp{font-size: 14px;padding-left: 12px}\n" + $id + ".MusicPlayer2902040282--root[data-musicplayer2902040282-ishoverstate] .MusicPlayer2902040282--playButton, " + $id + ".MusicPlayer2902040282--root[data-musicplayer2902040282-ishoverstate] .MusicPlayer2902040282--progressRangeBar{color: " + $params["hoverColor"] + "}\n";
};

/***/ }),

/***/ 306:
/*!***********************************************!*\
  !*** ./components/MusicPlayer/MusicPlayer.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ 1);

var _soundheadReact = __webpack_require__(/*! @wix/soundhead-react */ 854);

var _MusicPlayerSt = __webpack_require__(/*! ./MusicPlayer.st.css */ 223);

var _MusicPlayerSt2 = _interopRequireDefault(_MusicPlayerSt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line complexity
var MusicPlayer = function MusicPlayer(santaProps) {
  var showCover = santaProps.showCover,
      showArtistName = santaProps.showArtistName,
      showTrackName = santaProps.showTrackName,
      showProgressBar = santaProps.showProgressBar,
      showTimeStamp = santaProps.showTimeStamp,
      isMobileView = santaProps.isMobileView,
      previewState = santaProps.previewState;


  var showTitle = showTrackName || showArtistName;
  var styleState = {
    isMobileView: isMobileView,
    isDesktopView: !isMobileView,
    hasCover: showCover,
    hasProgressBar: showProgressBar,
    hasTitleTimeRow: showTitle && showTimeStamp && !showProgressBar,
    hasSingleRow: showTitle !== showProgressBar || !showTitle && !showProgressBar && showTimeStamp,
    hasOnlyPlay: !showTitle && !showProgressBar && !showTimeStamp,
    isHoverState: previewState === 'hover'
  };

  return _react2.default.createElement(
    _soundheadReact.SlavePlayer,
    santaProps,
    _react2.default.createElement(
      'div',
      _extends({}, (0, _MusicPlayerSt2.default)('root', styleState, santaProps), { 'data-hook': 'player' }),
      (showCover || styleState.hasOnlyPlay) && _react2.default.createElement(
        'div',
        { className: _MusicPlayerSt2.default.coverLayout, 'data-hook': 'coverLayout' },
        showCover && _react2.default.createElement(_soundheadReact.Cover, { className: _MusicPlayerSt2.default.cover, dataHook: 'cover' }),
        styleState.hasOnlyPlay && _react2.default.createElement(
          'div',
          { className: _MusicPlayerSt2.default.playLayout, 'data-hook': 'playLayout' },
          _react2.default.createElement(_soundheadReact.PlayPause, { className: _MusicPlayerSt2.default.playButton, dataHook: 'play' })
        )
      ),
      !styleState.hasOnlyPlay && _react2.default.createElement(
        'div',
        { className: _MusicPlayerSt2.default.mainLayout },
        _react2.default.createElement(
          'div',
          { className: _MusicPlayerSt2.default.upperLayout },
          showTitle && showProgressBar && _react2.default.createElement(
            'div',
            { className: _MusicPlayerSt2.default.titleLayout, 'data-hook': 'titleLayout' },
            showTrackName && _react2.default.createElement(_soundheadReact.TrackName, { className: _MusicPlayerSt2.default.title, dataHook: 'trackName' }),
            showArtistName && _react2.default.createElement(_soundheadReact.ArtistName, { className: _MusicPlayerSt2.default.title, dataHook: 'artistName' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _MusicPlayerSt2.default.lowerLayout },
          _react2.default.createElement(
            'div',
            { className: _MusicPlayerSt2.default.playLayout, 'data-hook': 'playLayout' },
            _react2.default.createElement(_soundheadReact.PlayPause, { className: _MusicPlayerSt2.default.playButton, dataHook: 'play' })
          ),
          showProgressBar && _react2.default.createElement(
            'div',
            { className: _MusicPlayerSt2.default.progressLayout, 'data-hook': 'progressLayout' },
            _react2.default.createElement(_soundheadReact.ProgressBar, {
              classNameRangeBar: _MusicPlayerSt2.default.progressRangeBar,
              dataHook: 'progressBar'
            })
          ),
          !showProgressBar && showTitle && _react2.default.createElement(
            'div',
            { className: _MusicPlayerSt2.default.titleLayout, 'data-hook': 'titleLayout' },
            showTrackName && _react2.default.createElement(_soundheadReact.TrackName, { className: _MusicPlayerSt2.default.title, dataHook: 'trackName' }),
            showArtistName && _react2.default.createElement(_soundheadReact.ArtistName, { className: _MusicPlayerSt2.default.title, dataHook: 'artistName' })
          ),
          showTimeStamp && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_soundheadReact.TimeStamp, {
              className: _MusicPlayerSt2.default.timeStamp,
              dataHook: 'timeStamp',
              display: isMobileView ? 'remaining' : 'full'
            })
          )
        )
      )
    )
  );
};

MusicPlayer.propTypes = {
  previewState: _propTypes.string,
  isMobileView: _propTypes.bool,
  showCover: _propTypes.bool,
  showArtistName: _propTypes.bool,
  showTrackName: _propTypes.bool,
  showProgressBar: _propTypes.bool,
  showTimeStamp: _propTypes.bool
};

MusicPlayer.displayName = 'MusicPlayer';

exports.default = MusicPlayer;

/***/ }),

/***/ 400:
/*!*****************************************!*\
  !*** ./components/MusicPlayer/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MusicPlayer = __webpack_require__(/*! ./MusicPlayer */ 306);

var _MusicPlayer2 = _interopRequireDefault(_MusicPlayer);

var _MusicPlayer3 = __webpack_require__(/*! ./MusicPlayer.santa */ 460);

var _MusicPlayer4 = _interopRequireDefault(_MusicPlayer3);

var _MusicPlayerSt = __webpack_require__(/*! ./MusicPlayer.st.css */ 223);

var _MusicPlayerSt2 = _interopRequireDefault(_MusicPlayerSt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  componentType: 'wixui.MusicPlayer',
  component: _MusicPlayer2.default,
  santaComponent: _MusicPlayer4.default,
  skin: _MusicPlayerSt2.default.$skin
};

/***/ }),

/***/ 401:
/*!************************************************!*\
  !*** ../node_modules/fast-deep-equal/index.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a!==a && b!==b;
};


/***/ }),

/***/ 402:
/*!************************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/ArtistName/ArtistName.st.css ***!
  \************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "ArtistName359008608",
  {"title":"ArtistName359008608--title","root":"ArtistName359008608--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/ArtistName/ArtistName.st.css */ 402
);



/***/ }),

/***/ 403:
/*!**************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/Cover/Cover.st.css ***!
  \**************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "Cover1797498688",
  {"cover":"Cover1797498688--cover","root":"Cover1797498688--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/Cover/Cover.st.css */ 403
);



/***/ }),

/***/ 404:
/*!**********************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/TimeStamp/TimeStamp.st.css ***!
  \**********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "TimeStamp3517976143",
  {"time":"TimeStamp3517976143--time","root":"TimeStamp3517976143--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/TimeStamp/TimeStamp.st.css */ 404
);



/***/ }),

/***/ 405:
/*!**********************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/TrackName/TrackName.st.css ***!
  \**********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "TrackName1300930541",
  {"title":"TrackName1300930541--title","root":"TrackName1300930541--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/TrackName/TrackName.st.css */ 405
);



/***/ }),

/***/ 406:
/*!**********************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPause/PlayPause.st.css ***!
  \**********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "PlayPause3591112310",
  {"button":"PlayPause3591112310--button","root":"PlayPause3591112310--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPause/PlayPause.st.css */ 406
);



/***/ }),

/***/ 407:
/*!**************************************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPauseAnimated/PlayPauseAnimated.st.css ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "PlayPauseAnimated2824183530",
  {"button":"PlayPauseAnimated2824183530--button","root":"PlayPauseAnimated2824183530--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPauseAnimated/PlayPauseAnimated.st.css */ 407
);



/***/ }),

/***/ 408:
/*!************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/Mute/Mute.st.css ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "Mute2509028899",
  {"button":"Mute2509028899--button","root":"Mute2509028899--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/Mute/Mute.st.css */ 408
);



/***/ }),

/***/ 409:
/*!************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/Rate/Rate.st.css ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "Rate4132433626",
  {"button":"Rate4132433626--button","root":"Rate4132433626--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/Rate/Rate.st.css */ 409
);



/***/ }),

/***/ 410:
/*!******************************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/components/Forward/Forward.st.css ***!
  \******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true })

exports.default = __webpack_require__.stylable.create(
  "root",
  "Forward3758161361",
  {"button":"Forward3758161361--button","root":"Forward3758161361--root"},
  "",
  1,
  /*! ../node_modules/@wix/soundhead-react/dist/es/src/components/Forward/Forward.st.css */ 410
);



/***/ }),

/***/ 44:
/*!**********************************************!*\
  !*** ../node_modules/eventemitter3/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 460:
/*!*****************************************************!*\
  !*** ./components/MusicPlayer/MusicPlayer.santa.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = __webpack_require__(/*! lodash */ 2);

var _lodash2 = _interopRequireDefault(_lodash);

var _createReactClass = __webpack_require__(/*! create-react-class */ 17);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _santaComponents = __webpack_require__(/*! santa-components */ 15);

var _musicPlayerBehaviors = __webpack_require__(/*! ./behaviors/musicPlayerBehaviors */ 461);

var _MusicPlayer = __webpack_require__(/*! ./MusicPlayer */ 306);

var _MusicPlayer2 = _interopRequireDefault(_MusicPlayer);

var _events = __webpack_require__(/*! ./bi/events */ 462);

var _events2 = _interopRequireDefault(_events);

var _url = __webpack_require__(/*! ../../utils/url */ 95);

var _MusicPlayerSt = __webpack_require__(/*! ./MusicPlayer.st.css */ 223);

var _MusicPlayerSt2 = _interopRequireDefault(_MusicPlayerSt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var skinBasedComp = _santaComponents.mixins.skinBasedComp,
    runTimeCompData = _santaComponents.mixins.runTimeCompData,
    compStateMixin = _santaComponents.mixins.compStateMixin;
var imageClientApi = _santaComponents.utils.imageClientApi;
var ACTION_TYPES = _santaComponents.constants.SITE.ACTION_TYPES;

var MAX_COVER_SIZE = 140;
var COVER_TRANSFORM_TYPE = { transformType: 'fit', quality: 90 };
var FITTING_SCALE_TO_FILL = imageClientApi.fittingTypes.SCALE_TO_FILL;

var getComponentSkins = function getComponentSkins() {
  return {
    'wixui.skins.MusicPlayer': _MusicPlayerSt2.default.$skin
  };
};

function getPublicState(state) {
  var isPlaying = _lodash2.default.get(state, 'isPlaying');
  var currentTime = _lodash2.default.get(state, 'currentTime');
  var duration = _lodash2.default.get(state, 'duration');
  var volume = _lodash2.default.get(state, 'volume');
  var isMuted = _lodash2.default.get(state, 'isMuted');

  return {
    isPlaying: isPlaying,
    currentTime: currentTime,
    duration: duration,
    volume: volume,
    isMuted: isMuted
  };
}

var MusicPlayerSanta = (0, _createReactClass2.default)({
  displayName: 'MusicPlayerSanta',

  mixins: [skinBasedComp(getComponentSkins()), runTimeCompData, compStateMixin(getPublicState)],

  propTypes: {
    componentPreviewState: _santaComponents.santaTypesDefinitions.RenderFlags.componentPreviewState,
    reportBI: _santaComponents.santaTypesDefinitions.reportBI,
    styleId: _santaComponents.santaTypesDefinitions.Component.styleId,
    style: _santaComponents.santaTypesDefinitions.Component.style,
    isMobileView: _santaComponents.santaTypesDefinitions.isMobileView,
    id: _santaComponents.santaTypesDefinitions.Component.id,
    compProp: _santaComponents.santaTypesDefinitions.Component.compProp,
    compData: _santaComponents.santaTypesDefinitions.Component.compData,
    isPlayingAllowed: _santaComponents.santaTypesDefinitions.RenderFlags.isPlayingAllowed,
    staticMediaUrl: _santaComponents.santaTypesDefinitions.ServiceTopology.staticMediaUrl,
    staticAudioUrl: _santaComponents.santaTypesDefinitions.ServiceTopology.staticAudioUrl
  },

  statics: {
    behaviors: _musicPlayerBehaviors.musicPlayerBehaviors,
    getComponentSkins: getComponentSkins
  },

  getInitialState: function getInitialState() {
    var duration = this.getDuration();
    var volume = 100;
    var isMuted = volume === 0;

    return {
      isReady: false,
      isPlaying: false,
      currentTime: 0,
      duration: duration,
      volume: volume,
      isMuted: isMuted
    };
  },
  getDefaultBiProps: function getDefaultBiProps() {
    var _props = this.props,
        id = _props.id,
        compProp = _props.compProp,
        compData = _props.compData;
    var audioRef = compData.audioRef,
        audioUrl = compData.audioUrl;

    var source = 'upload';
    var track = _lodash2.default.get(audioRef, 'uri');
    var url = null;

    if (!audioRef) {
      source = (0, _url.guessAudioProvider)(audioUrl);
      track = audioUrl;
      url = audioUrl;
    }

    return {
      url: url,
      source: source,
      trackID: track,
      comp_id: id,
      layout: compProp.layout
    };
  },
  UNSAFE_componentWillReceiveProps: function UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.isPlayingAllowed && this.props.isPlayingAllowed) {
      this.stop();
    }
  },
  play: function play() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lodash2.default.noop;

    this.playerRef.play().then(function () {
      return callback();
    });
  },
  pause: function pause() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lodash2.default.noop;

    this.playerRef.pause().then(function () {
      return callback();
    });
  },
  stop: function stop() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lodash2.default.noop;

    this.playerRef.seekTo(0);
    this.playerRef.pause().then(function () {
      return callback();
    });
  },
  togglePlay: function togglePlay() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lodash2.default.noop;

    this.playerRef.togglePlay().then(function () {
      return callback();
    });
  },
  mute: function mute() {
    var _this = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lodash2.default.noop;

    if (this.state.isMuted) {
      callback();
      return;
    }

    this.playerRef.toggleMute().then(function () {
      _this.setState({ isMuted: true });
      callback();
    });
  },
  unMute: function unMute() {
    var _this2 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lodash2.default.noop;

    if (!this.state.isMuted) {
      callback();
      return;
    }

    this.playerRef.toggleMute().then(function () {
      _this2.setState({ isMuted: false });
      callback();
    });
  },
  seek: function seek(time) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _lodash2.default.noop;

    var timePoint = Number(time);

    if (_lodash2.default.isFinite(timePoint)) {
      this.playerRef.seekTo(timePoint).then(function () {
        return callback();
      });
    }
  },
  setVolume: function setVolume(volume) {
    var _this3 = this;

    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _lodash2.default.noop;

    this.playerRef.changeVolume(Number(volume) / 100).then(function () {
      _this3.setState({
        volume: Number(volume)
      });
      callback();
    });
  },
  onVolumeChanged: function onVolumeChanged(volume) {
    this.setState({
      volume: 100 * volume
    });
  },
  onMuteChanged: function onMuteChanged(isMuted) {
    this.setState({
      isMuted: isMuted
    });
  },
  onDurationChanged: function onDurationChanged(duration) {
    this.setState({
      duration: duration
    });
  },
  onPlayRequested: function onPlayRequested() {
    this.props.reportBI(_events2.default.playClicked, this.getDefaultBiProps());
  },
  onPlay: function onPlay() {
    this.setState({
      isPlaying: true
    });
    this.handleAction(ACTION_TYPES.ON_PLAY);

    var duration = this.state.duration;

    this.props.reportBI(_events2.default.playStarted, _extends({
      duration: duration
    }, this.getDefaultBiProps()));
  },
  onPause: function onPause() {
    this.setState({
      isPlaying: false
    });
    this.handleAction(ACTION_TYPES.ON_PAUSE);
  },
  onEnded: function onEnded() {
    this.setState({
      isPlaying: false
    });
    this.handleAction(ACTION_TYPES.ON_ENDED);
    this.props.reportBI(_events2.default.playFinished, this.getDefaultBiProps());
  },
  onError: function onError(error) {
    this.props.reportBI(_events2.default.playError, _extends({
      errorMessage: _lodash2.default.get(error, 'message')
    }, this.getDefaultBiProps()));
  },
  onTimeUpdated: function onTimeUpdated(currentTime) {
    this.setState({
      currentTime: currentTime
    });

    this.handleAction(ACTION_TYPES.ON_PROGRESS, currentTime);
  },
  getDuration: function getDuration() {
    return _lodash2.default.get(this.props.compData, 'audioRef.duration', 0);
  },
  getCoverUrl: function getCoverUrl() {
    var coverUrl = this.props.compData.coverUrl;

    if (coverUrl) {
      return coverUrl;
    }

    var coverRef = this.props.compData.coverRef;

    if (!_lodash2.default.isObject(coverRef)) {
      return null;
    }

    var _props$compData$cover = this.props.compData.coverRef,
        width = _props$compData$cover.width,
        height = _props$compData$cover.height,
        uri = _props$compData$cover.uri;

    var src = { id: uri, width: width, height: height };

    var target = {
      width: MAX_COVER_SIZE,
      height: MAX_COVER_SIZE
    };

    var previewData = imageClientApi.getData(FITTING_SCALE_TO_FILL, src, target, COVER_TRANSFORM_TYPE);

    return this.props.staticMediaUrl + '/' + previewData.uri;
  },
  getAudioUrl: function getAudioUrl() {
    var audioUrl = this.props.compData.audioUrl;

    if (audioUrl) {
      return audioUrl;
    }

    var audioRef = this.props.compData.audioRef;

    if (audioRef) {
      return this.props.staticAudioUrl + '/' + audioRef.uri;
    }

    return null;
  },
  getSkinProperties: function getSkinProperties() {
    var _this4 = this;

    var _props2 = this.props,
        id = _props2.id,
        styleId = _props2.styleId,
        style = _props2.style,
        isMobileView = _props2.isMobileView;
    var _props$compProp = this.props.compProp,
        showCover = _props$compProp.showCover,
        showArtistName = _props$compProp.showArtistName,
        showTrackName = _props$compProp.showTrackName,
        showProgressBar = _props$compProp.showProgressBar,
        showTimeStamp = _props$compProp.showTimeStamp,
        loop = _props$compProp.loop;
    var _props$compData = this.props.compData,
        artistName = _props$compData.artistName,
        trackName = _props$compData.trackName;


    var props = {
      className: styleId,
      playerId: id,
      style: style,
      isMobileView: isMobileView,
      showCover: showCover,
      showArtistName: showArtistName,
      showTrackName: showTrackName,
      showProgressBar: showProgressBar,
      showTimeStamp: showTimeStamp,
      loop: loop,
      duration: this.getDuration(),
      playlist: [{
        artistName: artistName,
        trackName: trackName,
        cover: this.getCoverUrl(),
        url: this.getAudioUrl()
      }],
      onPlayRequested: this.onPlayRequested,
      onPlay: this.onPlay,
      onPause: this.onPause,
      onError: this.onError,
      onTimeUpdated: this.onTimeUpdated,
      onDurationChanged: this.onDurationChanged,
      onVolumeChanged: this.onVolumeChanged,
      onMuteChanged: this.onMuteChanged,
      onEnded: this.onEnded,
      playerRef: function playerRef(player) {
        _this4.playerRef = player;
      },
      previewState: this.props.componentPreviewState
    };

    return {
      '': {
        children: [_santaComponents.utils.createReactElement(_MusicPlayer2.default, props)]
      }
    };
  }
});

exports.default = MusicPlayerSanta;

/***/ }),

/***/ 461:
/*!******************************************************************!*\
  !*** ./components/MusicPlayer/behaviors/musicPlayerBehaviors.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var musicPlayerBehaviors = exports.musicPlayerBehaviors = {
  togglePlay: { methodName: 'togglePlay' },
  play: { methodName: 'play' },
  pause: { methodName: 'pause' },
  stop: { methodName: 'stop' },
  mute: { methodName: 'mute' },
  unMute: { methodName: 'unMute' },
  seek: { methodName: 'seek', params: ['time'] },
  setVolume: { methodName: 'setVolume', params: ['volume'] }
};

/***/ }),

/***/ 462:
/*!*********************************************!*\
  !*** ./components/MusicPlayer/bi/events.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function composeBiEvent(eventId) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    evid: eventId,
    src: 9,
    fields: _extends({}, fields, {
      comp_id: 'string',
      url: 'string',
      source: 'string',
      trackID: 'string',
      layout: 'string'
    })
  };
}

var playClicked = composeBiEvent(1201);
var playStarted = composeBiEvent(1202, { duration: 'number' });
var playFinished = composeBiEvent(1203);
var playError = composeBiEvent(1204, { errorMessage: 'string' });

exports.default = {
  playClicked: playClicked,
  playStarted: playStarted,
  playFinished: playFinished,
  playError: playError
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

/***/ 854:
/*!******************************************************************************!*\
  !*** ../node_modules/@wix/soundhead-react/dist/es/src/index.js + 43 modules ***!
  \******************************************************************************/
/*! exports provided: MasterPlayer, SlavePlayer, SinglePlayer, ArtistName, Cover, TimeStamp, TrackName, PlayPause, PlayPauseAnimated, ProgressBar, Mute, Rate, Forward, withPlaybackContext */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/ArtistName/ArtistName.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/Cover/Cover.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/Forward/Forward.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/Mute/Mute.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPause/PlayPause.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPauseAnimated/PlayPauseAnimated.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/ProgressBar/ProgressBar.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/Rate/Rate.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/TimeStamp/TimeStamp.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/@wix/soundhead-react/dist/es/src/components/TrackName/TrackName.st.css (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/eventemitter3/index.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/tslib/tslib.es6.js (<- Module is referenced from these modules with unsupported syntax: ../node_modules/@wix/search-box/dist/src/components/ClearButton/index.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/QuickResultItem/QuickResultItem.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/SearchBox.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/SearchIcon.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/index.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/measure/index.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SearchBox/measure/measure.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/components/SuggestionItem/SuggestionItem.js (referenced with cjs require), ../node_modules/@wix/search-box/dist/src/index.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/clients/GoogleMaps/google2address/google2address.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/address-input/AddressInput.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/button-next/button-next.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/captcha/Captcha.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/deprecated/divider/Divider.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/dropdown-content/DropdownContent.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/dropdown-option/DropdownOption.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/dropdown-option/OptionFactory.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/dropdown/Dropdown.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/input-with-options/InputWithOptions.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/input/Input.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/linear-progress-bar/LinearProgressBar.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/pagination/PageStrip.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/pagination/Pagination.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/popover/Popover.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/popover/index.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/popover/modifiers.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/radio-button/RadioButton.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/slider/Slider.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/slider/Thumb.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/slider/Ticks.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/time-picker/Tickers.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/time-picker/TimePicker.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/Video.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/DailyMotion.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/Facebook.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/Playable.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/Twitch.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/Vimeo.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/YouTube.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/components/video/players/playerHOC.js (referenced with cjs require), ../node_modules/wix-ui-core/dist/src/hocs/Focusable/FocusableHOC.js (referenced with cjs require)) */
/*! ModuleConcatenation bailout: Cannot concat with external {"amd":"react","commonjs":"react","commonjs2":"react","root":"React"} (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(6);

// EXTERNAL MODULE: ../node_modules/eventemitter3/index.js
var eventemitter3 = __webpack_require__(44);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-playback/dist/es/src/constants/events.js
var PLAYBACK_EVENTS;
(function (PLAYBACK_EVENTS) {
    PLAYBACK_EVENTS["PLAYER_CHANGED"] = "playback-events/player-changed";
    PLAYBACK_EVENTS["PLAYLIST_CHANGED"] = "playback-events/playlist-changed";
    PLAYBACK_EVENTS["TRACK_CHANGED"] = "playback-events/track-changed";
    PLAYBACK_EVENTS["STATE_CHANGED"] = "playback-events/state-changed";
})(PLAYBACK_EVENTS || (PLAYBACK_EVENTS = {}));
var STATE_EVENTS;
(function (STATE_EVENTS) {
    STATE_EVENTS["INIT"] = "playback-state/init";
    STATE_EVENTS["SRC_SET"] = "playback-state/src-set";
    STATE_EVENTS["LOAD_STARTED"] = "playback-state/load-started";
    STATE_EVENTS["METADATA_LOADED"] = "playback-state/metadata-loaded";
    STATE_EVENTS["READY_TO_PLAY"] = "playback-state/ready-to-play";
    STATE_EVENTS["SEEK_IN_PROGRESS"] = "playback-state/seek-in-progress";
    STATE_EVENTS["PLAY_REQUESTED"] = "playback-state/play-requested";
    STATE_EVENTS["WAITING"] = "playback-state/waiting";
    STATE_EVENTS["PLAYING"] = "playback-state/playing";
    STATE_EVENTS["PAUSED"] = "playback-state/paused";
    STATE_EVENTS["ENDED"] = "playback-state/ended";
})(STATE_EVENTS || (STATE_EVENTS = {}));
var AUDIO_EVENTS;
(function (AUDIO_EVENTS) {
    AUDIO_EVENTS["DURATION_CHANGED"] = "audio-events/duration-changed";
    AUDIO_EVENTS["TIME_UPDATED"] = "audio-events/time-updated";
    AUDIO_EVENTS["BUFFER_UPDATED"] = "audio-events/buffer-updated";
    AUDIO_EVENTS["VOLUME_CHANGED"] = "audio-events/volume-changed";
    AUDIO_EVENTS["MUTE_CHANGED"] = "audio-events/mute-changed";
    AUDIO_EVENTS["RATE_CHANGED"] = "audio-events/rate-changed";
    AUDIO_EVENTS["CAN_PLAY_TROUGH"] = "audio-events/can-play-through";
    AUDIO_EVENTS["ABORT"] = "audio-events/abort";
    AUDIO_EVENTS["ERROR"] = "audio-events/error";
})(AUDIO_EVENTS || (AUDIO_EVENTS = {}));
//# sourceMappingURL=events.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-playback/dist/es/src/core/audio-events.js

var NATIVE_EVENTS = [
    'progress',
    'abort',
    'error',
    'canplaythrough',
    'durationchange',
    'timeupdate',
    'volumechange',
    'loadedmetadata',
    'ratechange',
];
var audio_events_AudioEvents = /** @class */ (function () {
    function AudioEvents(eventEmitter, audioElement) {
        var _this = this;
        this._processEventFromAudio = function (event) {
            switch (event.type) {
                case 'durationchange': {
                    _this._eventEmitter.emit(AUDIO_EVENTS.DURATION_CHANGED, _this._audioElement.duration);
                    break;
                }
                case 'timeupdate': {
                    _this._eventEmitter.emit(AUDIO_EVENTS.TIME_UPDATED, _this._audioElement.currentTime);
                    break;
                }
                case 'loadedmetadata':
                case 'progress': {
                    _this._checkBufferChanges();
                    break;
                }
                case 'volumechange': {
                    _this._checkVolumeChanges();
                    break;
                }
                case 'ratechange': {
                    _this._eventEmitter.emit(AUDIO_EVENTS.RATE_CHANGED, _this._audioElement.playbackRate);
                    break;
                }
                case 'canplaythrough': {
                    _this._eventEmitter.emit(AUDIO_EVENTS.CAN_PLAY_TROUGH);
                    break;
                }
                case 'abort': {
                    _this._eventEmitter.emit(AUDIO_EVENTS.ABORT);
                    break;
                }
                case 'error': {
                    _this._eventEmitter.emit(AUDIO_EVENTS.ERROR, _this._audioElement.error);
                    break;
                }
                default:
            }
        };
        this._eventEmitter = eventEmitter;
        this._audioElement = audioElement;
        this._currentMute = this._audioElement.muted;
        this._currentVolume = this._audioElement.volume;
        this._currentBuffer = this._audioElement.buffered;
        this._bindEvents();
    }
    AudioEvents.prototype._bindEvents = function () {
        var _this = this;
        NATIVE_EVENTS.forEach(function (event) {
            return _this._audioElement.addEventListener(event, _this._processEventFromAudio);
        });
    };
    AudioEvents.prototype._unbindEvents = function () {
        var _this = this;
        NATIVE_EVENTS.forEach(function (event) {
            return _this._audioElement.removeEventListener(event, _this._processEventFromAudio);
        });
    };
    AudioEvents.prototype._checkVolumeChanges = function () {
        var audio = this._audioElement;
        if (this._currentVolume !== audio.volume) {
            this._currentVolume = audio.volume;
            this._eventEmitter.emit(AUDIO_EVENTS.VOLUME_CHANGED, this._currentVolume);
        }
        if (this._currentMute !== audio.muted) {
            this._currentMute = audio.muted;
            this._eventEmitter.emit(AUDIO_EVENTS.MUTE_CHANGED, this._currentMute);
        }
    };
    AudioEvents.prototype._checkBufferChanges = function () {
        var audio = this._audioElement;
        if (this._currentBuffer !== audio.buffered) {
            var buffered = this._audioElement.buffered;
            var duration = this._audioElement.duration;
            var bufferProgress = 0;
            if (duration && buffered.length) {
                bufferProgress = buffered.end(buffered.length - 1) / duration;
            }
            this._eventEmitter.emit(AUDIO_EVENTS.BUFFER_UPDATED, bufferProgress);
        }
    };
    AudioEvents.prototype.destroy = function () {
        this._unbindEvents();
        delete this._audioElement;
        delete this._eventEmitter;
    };
    return AudioEvents;
}());
/* harmony default export */ var audio_events = (audio_events_AudioEvents);
//# sourceMappingURL=audio-events.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-playback/dist/es/src/core/state-events.js

var state_events_NATIVE_EVENTS = [
    'loadstart',
    'loadedmetadata',
    'canplay',
    'play',
    'playing',
    'pause',
    'ended',
    'waiting',
    'seeking',
    'seeked',
];
var state_events_StateEvents = /** @class */ (function () {
    function StateEvents(eventEmitter, audioElement) {
        var _this = this;
        this._currentState = STATE_EVENTS.INIT;
        this._processEventFromAudio = function (event) {
            switch (event.type) {
                case 'loadstart': {
                    _this.setState(STATE_EVENTS.LOAD_STARTED);
                    break;
                }
                case 'loadedmetadata': {
                    _this.setState(STATE_EVENTS.METADATA_LOADED);
                    break;
                }
                case 'canplay': {
                    if (_this._currentState === STATE_EVENTS.METADATA_LOADED) {
                        _this.setState(STATE_EVENTS.READY_TO_PLAY);
                    }
                    break;
                }
                case 'play': {
                    _this.setState(STATE_EVENTS.PLAY_REQUESTED);
                    break;
                }
                case 'playing': {
                    _this.setState(STATE_EVENTS.PLAYING);
                    break;
                }
                case 'waiting': {
                    _this.setState(STATE_EVENTS.WAITING);
                    break;
                }
                case 'pause': {
                    _this.setState(STATE_EVENTS.PAUSED);
                    break;
                }
                case 'ended': {
                    _this.setState(STATE_EVENTS.ENDED);
                    break;
                }
                case 'seeking': {
                    _this.setState(STATE_EVENTS.SEEK_IN_PROGRESS);
                    break;
                }
                case 'seeked': {
                    _this.setState(_this._audioElement.paused
                        ? STATE_EVENTS.PAUSED
                        : STATE_EVENTS.PLAYING);
                    break;
                }
                default:
            }
        };
        this._eventEmitter = eventEmitter;
        this._audioElement = audioElement;
        this._bindEvents();
    }
    StateEvents.prototype._bindEvents = function () {
        var _this = this;
        state_events_NATIVE_EVENTS.forEach(function (event) {
            return _this._audioElement.addEventListener(event, _this._processEventFromAudio);
        });
    };
    StateEvents.prototype._unbindEvents = function () {
        var _this = this;
        state_events_NATIVE_EVENTS.forEach(function (event) {
            return _this._audioElement.removeEventListener(event, _this._processEventFromAudio);
        });
    };
    StateEvents.prototype.setState = function (state) {
        if (state === this._currentState) {
            return;
        }
        this._eventEmitter.emit(PLAYBACK_EVENTS.STATE_CHANGED, {
            prevState: this._currentState,
            nextState: state,
        });
        this._eventEmitter.emit(state);
        this._currentState = state;
    };
    StateEvents.prototype.getState = function () {
        return this._currentState;
    };
    StateEvents.prototype.destroy = function () {
        this._unbindEvents();
        delete this._audioElement;
        delete this._eventEmitter;
    };
    return StateEvents;
}());
/* harmony default export */ var state_events = (state_events_StateEvents);
//# sourceMappingURL=state-events.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-playback/dist/es/src/core/playback.js





var defaultAudioProps = {
    muted: false,
    volume: 1,
    playbackRate: 1,
    loop: false,
};
var awaitEvent = function (eventEmitter, eventName) {
    return new Promise(function (resolve) {
        eventEmitter.once(eventName, function () { return resolve(); });
    });
};
/**
 * Playback instances ties actual audio element, track properties and event
 * handling together.
 * @doc Playback
 */
var playback_Playback = /** @class */ (function () {
    function Playback() {
        this._audioProps = defaultAudioProps;
        this._playerId = '';
        this._playlist = [];
        this._trackIndex = 0;
        this._eventEmitter = new eventemitter3["EventEmitter"]();
        this._audioElement = new Audio();
        this._stateEvents = new state_events(this._eventEmitter, this._audioElement);
        this._audioEvents = new audio_events(this._eventEmitter, this._audioElement);
    }
    /**
     * Removes audio element, all event listeners and calls [`reset()`](#reset)
     */
    Playback.prototype.destroy = function () {
        this._eventEmitter.removeAllListeners();
        this._stateEvents.destroy();
        this._audioEvents.destroy();
        this.reset();
        delete this._audioElement;
    };
    /**
     * Removes audio src, empties playlist
     */
    Playback.prototype.reset = function () {
        this._playerId = '';
        this._playlist = [];
        this._trackIndex = 0;
        this._audioElement.pause();
        this._audioElement.src = '';
    };
    /**
     * Register player with provided id and fires
     * `playback-events/player-changed` event.
     */
    Playback.prototype.registerPlayer = function (playerId) {
        this._playerId = playerId;
        this._eventEmitter.emit(PLAYBACK_EVENTS.PLAYER_CHANGED, playerId);
    };
    /**
     * Returns true if [`registerPlayer`](#registerPlayer) has
     * been called and player id exists.
     */
    Playback.prototype.hasRegisteredPlayer = function () {
        return Boolean(this._playerId);
    };
    Playback.prototype.getPlayerId = function () {
        return this._playerId;
    };
    Playback.prototype.getPlaylist = function () {
        return this._playlist;
    };
    /**
     * Sets provided playlist and fires `playback-events/playlist-changed` event.
     */
    Playback.prototype.setPlaylist = function (playlist) {
        this._playlist = playlist;
        this._eventEmitter.emit(PLAYBACK_EVENTS.PLAYLIST_CHANGED, playlist);
    };
    /**
     * Track index represents current track in playlist.
     */
    Playback.prototype.getTrackIndex = function () {
        return this._trackIndex;
    };
    /**
     * Sets track index (if not provided, sets to 0) and fires two events:
     * `playback-events/track-changed` and `playback-state/src-set`.
     * It will pause player.
     */
    Playback.prototype.setTrackIndex = function (trackIndex) {
        if (trackIndex === void 0) { trackIndex = 0; }
        var track = this._playlist[trackIndex];
        if (!track) {
            return;
        }
        this._audioElement.pause();
        this._audioElement.src = track.url;
        this._audioElement.volume = this._audioProps.volume;
        this._audioElement.muted = this._audioProps.muted;
        this._audioElement.playbackRate = this._audioProps.playbackRate;
        this._audioElement.loop = this._audioProps.loop;
        this._trackIndex = trackIndex;
        this._stateEvents.setState(STATE_EVENTS.SRC_SET);
        this._eventEmitter.emit(PLAYBACK_EVENTS.TRACK_CHANGED, trackIndex);
    };
    Playback.prototype.getAudioProps = function () {
        return this._audioProps;
    };
    Playback.prototype.setAudioProps = function (audioProps) {
        // @TODO reset to default when set?
        this._audioProps = tslib_es6["__assign"]({}, this._audioProps, audioProps);
    };
    /**
     * Mutes volume and fires `audio-events/mute-changed` event.
     */
    Playback.prototype.setMute = function (muted) {
        this._audioProps.muted = muted;
        this._audioElement.muted = muted;
        // @TODO check current muted state
        return awaitEvent(this._eventEmitter, AUDIO_EVENTS.MUTE_CHANGED);
    };
    /**
     * Sets volume in percentage and fires `audio-events/volume-changed` event.
     */
    Playback.prototype.setVolume = function (volume) {
        this._audioProps.volume = volume;
        this._audioElement.volume = volume;
        return awaitEvent(this._eventEmitter, AUDIO_EVENTS.VOLUME_CHANGED);
    };
    /**
     * Sets playback rate and fires `audio-events/rate-changed` event.
     */
    Playback.prototype.setPlaybackRate = function (playbackRate) {
        this._audioProps.playbackRate = playbackRate;
        this._audioElement.playbackRate = playbackRate;
        return awaitEvent(this._eventEmitter, AUDIO_EVENTS.RATE_CHANGED);
    };
    Playback.prototype.setLoop = function (loop) {
        this._audioProps.loop = loop;
        this._audioElement.loop = loop;
    };
    /**
     * Starts/resumes playing and fires `playback-state/play-requested` event.
     */
    Playback.prototype.play = function () {
        var playPromise = this._audioElement.play();
        if (playPromise !== undefined) {
            return playPromise;
        }
        return awaitEvent(this._eventEmitter, STATE_EVENTS.PLAY_REQUESTED);
    };
    /**
     * Pauses and fires `playback-state/paused` event.
     */
    Playback.prototype.pause = function () {
        this._audioElement.pause();
        return awaitEvent(this._eventEmitter, STATE_EVENTS.PAUSED);
    };
    /**
     * Moves track playing position and fires `audio-events/time-updated` event.
     */
    Playback.prototype.seekTo = function (value) {
        this._audioElement.currentTime = value;
        return awaitEvent(this._eventEmitter, AUDIO_EVENTS.TIME_UPDATED);
    };
    Playback.prototype.on = function (event, fn, context) {
        return this._eventEmitter.on(event, fn, context);
    };
    Playback.prototype.once = function (event, fn, context) {
        return this._eventEmitter.once(event, fn, context);
    };
    Playback.prototype.off = function (event, fn, context, once) {
        return this._eventEmitter.off(event, fn, context, once);
    };
    return Playback;
}());
/* harmony default export */ var playback = (playback_Playback);
//# sourceMappingURL=playback.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-playback/dist/es/src/core/singleton.js

var singleton_Singleton = /** @class */ (function () {
    function Singleton() {
    }
    Singleton.getInstance = function () {
        Singleton._instance = Singleton._instance || new playback();
        return Singleton._instance;
    };
    return Singleton;
}());
/* harmony default export */ var singleton = (singleton_Singleton);
//# sourceMappingURL=singleton.js.map
// EXTERNAL MODULE: external {"amd":"react","commonjs":"react","commonjs2":"react","root":"React"}
var external_amd_react_commonjs_react_commonjs2_react_root_React_ = __webpack_require__(0);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/common/PlaybackContext.js

var PlaybackContext_context = external_amd_react_commonjs_react_commonjs2_react_root_React_["createContext"](null);
var PlaybackContextProvider = PlaybackContext_context.Provider;
var PlaybackContextConsumer = PlaybackContext_context.Consumer;
//# sourceMappingURL=PlaybackContext.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/types.js
var KeyboardKey;
(function (KeyboardKey) {
    KeyboardKey[KeyboardKey["Enter"] = 13] = "Enter";
    KeyboardKey[KeyboardKey["Space"] = 32] = "Space";
    KeyboardKey[KeyboardKey["Left"] = 37] = "Left";
    KeyboardKey[KeyboardKey["Up"] = 38] = "Up";
    KeyboardKey[KeyboardKey["Right"] = 39] = "Right";
    KeyboardKey[KeyboardKey["Down"] = 40] = "Down";
})(KeyboardKey || (KeyboardKey = {}));
//# sourceMappingURL=types.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/utils/formatTime.js
var formatTime = function (time) {
    var hours = Math.floor(time / 3600);
    var minute = Math.floor((time - hours * 3600) / 60);
    var second = Math.floor(time % 60);
    var minuteDisplay = minute < 10 ? "0" + minute : minute;
    var secondDisplay = second < 10 ? "0" + second : second;
    return "" + (hours > 0 ? hours + ":" : '') + minuteDisplay + ":" + secondDisplay;
};
/* harmony default export */ var utils_formatTime = (formatTime);
//# sourceMappingURL=formatTime.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/utils/debounce.js
var debounce = function (func, delay) {
    var inDebounce;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(function () { return func.apply(context, args); }, delay);
    };
};
/* harmony default export */ var utils_debounce = (debounce);
//# sourceMappingURL=debounce.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/utils/noop.js
var noop = function () { return null; };
/* harmony default export */ var utils_noop = (noop);
//# sourceMappingURL=noop.js.map
// EXTERNAL MODULE: ../node_modules/fast-deep-equal/index.js
var fast_deep_equal = __webpack_require__(401);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/utils/isEqual.js

/* harmony default export */ var isEqual = (fast_deep_equal);
//# sourceMappingURL=isEqual.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/utils/index.js




//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/containers/PlayerEngine/PlayerEngine.js






var PlayerEngine_PlayerEngine = /** @class */ (function (_super) {
    tslib_es6["__extends"](PlayerEngine, _super);
    function PlayerEngine(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isPlaying: false,
            isLoading: false,
            isSeeking: false,
            isPlayingInterrupted: false,
            trackIndex: 0,
            buffered: 0,
            currentTime: 0,
            currentTimeFormatted: '00:00',
        };
        _this.saveAudioProps = function (audioProps) {
            _this.setState(tslib_es6["__assign"]({}, audioProps));
        };
        _this._onPlaybackStateChanged = function (_a) {
            var nextState = _a.nextState;
            _this.setState({
                playbackState: nextState,
                isPlaying: [STATE_EVENTS.PLAY_REQUESTED, STATE_EVENTS.PLAYING].some(function (state) { return nextState === state; }),
                isLoading: [
                    STATE_EVENTS.SEEK_IN_PROGRESS,
                    STATE_EVENTS.WAITING,
                    STATE_EVENTS.LOAD_STARTED,
                ].some(function (state) { return nextState === state; }),
            });
        };
        _this._onTrackChanged = function (trackIndex) {
            _this.setState(tslib_es6["__assign"]({}, trackIndex));
        };
        _this._onDurationChanged = function (duration) {
            var isLiveStream = !(!!duration && isFinite(duration));
            _this.setState(function (_a) {
                var currentTime = _a.currentTime;
                return ({
                    duration: duration,
                    isLiveStream: isLiveStream,
                    durationFormatted: utils_formatTime(duration),
                    remainingFormatted: utils_formatTime(duration - currentTime),
                });
            });
            _this.props.onDurationChanged(duration);
        };
        _this._onBufferUpdated = function (buffered) {
            _this.setState({ buffered: buffered });
        };
        _this._onTimeUpdated = function (currentTime) {
            _this.setState(function (_a) {
                var duration = _a.duration;
                return ({
                    currentTime: currentTime,
                    currentTimeFormatted: utils_formatTime(currentTime),
                    remainingFormatted: utils_formatTime(duration - currentTime),
                });
            });
            _this.props.onTimeUpdated(currentTime);
        };
        _this._onVolumeChanged = function (volume) {
            _this.setState({ volume: volume });
            _this.props.onVolumeChanged(volume);
        };
        _this._onMuteChanged = function (muted) {
            _this.setState({ muted: muted });
            _this.props.onMuteChanged(muted);
        };
        _this._onRateChange = function (playbackRate) {
            _this.setState({ playbackRate: playbackRate });
            _this.props.onRateChanged(playbackRate);
        };
        _this.play = function () {
            _this.props.handleFocus();
            if (_this.state.isPlayingInterrupted) {
                _this.setState({
                    isPlayingInterrupted: false,
                });
            }
            return _this.playback.play();
        };
        /**
         * @param {boolean} interrupted Mark player to return to playing after interruption is over
         */
        _this.pause = function (interrupted) {
            _this.props.handleFocus();
            if (interrupted) {
                _this.setState({
                    isPlayingInterrupted: true,
                });
            }
            return _this.playback.pause();
        };
        _this.togglePlay = function () {
            _this.props.handleFocus();
            return _this.state.isPlaying ? _this.playback.pause() : _this.playback.play();
        };
        _this.seekTo = function (value) {
            _this.props.handleFocus();
            return _this.playback.seekTo(value);
        };
        _this.changePlaybackRate = function (value) {
            _this.props.handleFocus();
            return _this.playback.setPlaybackRate(value);
        };
        _this.changeVolume = function (value) {
            _this.props.handleFocus();
            return _this.playback.setVolume(value);
        };
        _this.toggleMute = function () {
            _this.props.handleFocus();
            return _this.playback.setMute(!_this.state.muted);
        };
        _this._updateTime = utils_debounce(function (value) { return tslib_es6["__awaiter"](_this, void 0, void 0, function () {
            return tslib_es6["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.seekTo(value)];
                    case 1:
                        _a.sent();
                        this.setState({ isSeeking: false });
                        if (!this.state.isPlayingInterrupted) return [3 /*break*/, 3];
                        this.setState({ isPlayingInterrupted: false });
                        return [4 /*yield*/, this.play()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); }, 200);
        _this.handleKeyDown = function (e) { return tslib_es6["__awaiter"](_this, void 0, void 0, function () {
            var _a, currentTime, duration, isPlaying, isLiveStream, onePercent, tenPercents, nextTime, _b;
            return tslib_es6["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.state, currentTime = _a.currentTime, duration = _a.duration, isPlaying = _a.isPlaying, isLiveStream = _a.isLiveStream;
                        onePercent = duration * 0.01;
                        tenPercents = duration * 0.1;
                        nextTime = currentTime;
                        _b = e.keyCode;
                        switch (_b) {
                            case KeyboardKey.Left: return [3 /*break*/, 1];
                            case KeyboardKey.Up: return [3 /*break*/, 2];
                            case KeyboardKey.Right: return [3 /*break*/, 3];
                            case KeyboardKey.Down: return [3 /*break*/, 4];
                            case KeyboardKey.Space: return [3 /*break*/, 5];
                            case KeyboardKey.Enter: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1:
                        nextTime -= onePercent;
                        return [3 /*break*/, 10];
                    case 2:
                        nextTime += tenPercents;
                        return [3 /*break*/, 10];
                    case 3:
                        nextTime += onePercent;
                        return [3 /*break*/, 10];
                    case 4:
                        nextTime -= tenPercents;
                        return [3 /*break*/, 10];
                    case 5: return [4 /*yield*/, this.togglePlay()];
                    case 6:
                        _c.sent();
                        return [2 /*return*/];
                    case 7: return [4 /*yield*/, this.togglePlay()];
                    case 8:
                        _c.sent();
                        return [2 /*return*/];
                    case 9: return [2 /*return*/];
                    case 10:
                        if (isLiveStream) {
                            return [2 /*return*/];
                        }
                        if (nextTime > duration) {
                            nextTime = duration;
                        }
                        else if (nextTime < 0) {
                            nextTime = 0;
                        }
                        if (!isPlaying) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.pause(true)];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12:
                        this.setState({ currentTime: nextTime, isSeeking: true });
                        this._updateTime(nextTime);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = tslib_es6["__assign"]({}, _this.state, { duration: props.duration, durationFormatted: utils_formatTime(props.duration), remainingFormatted: utils_formatTime(props.duration), volume: props.volume, playbackRate: props.playbackRate, muted: props.muted, loop: props.loop });
        return _this;
    }
    PlayerEngine.prototype.componentWillUnmount = function () {
        this.unbindAudioEvents();
    };
    PlayerEngine.prototype.injectPlayback = function (playback) {
        this.playback = playback;
    };
    PlayerEngine.prototype.registerPlayer = function () {
        this.playback.registerPlayer(this.props.playerId);
        this.playback.setPlaylist(this.props.playlist);
        this.updateTrack();
    };
    PlayerEngine.prototype.updateTrack = function () {
        var _this = this;
        var _a = this.state, volume = _a.volume, muted = _a.muted, playbackRate = _a.playbackRate, loop = _a.loop, trackIndex = _a.trackIndex, currentTime = _a.currentTime;
        var audioProps = {
            volume: volume,
            muted: muted,
            playbackRate: playbackRate,
            loop: loop,
        };
        this.playback.setAudioProps(audioProps);
        this.playback.setTrackIndex(trackIndex);
        if (currentTime !== 0) {
            var onCanPlay_1 = function () {
                _this.playback.seekTo(currentTime);
            };
            this.playback.once(AUDIO_EVENTS.CAN_PLAY_TROUGH, onCanPlay_1);
            this.audioEventSubscriptions.push(function () {
                return _this.playback.off(AUDIO_EVENTS.CAN_PLAY_TROUGH, onCanPlay_1);
            });
        }
    };
    PlayerEngine.prototype.bindAudioEvents = function () {
        var _this = this;
        this.audioEventSubscriptions = [];
        var eventsMap = [
            [PLAYBACK_EVENTS.STATE_CHANGED, this._onPlaybackStateChanged],
            [PLAYBACK_EVENTS.TRACK_CHANGED, this._onTrackChanged],
            [AUDIO_EVENTS.DURATION_CHANGED, this._onDurationChanged],
            [AUDIO_EVENTS.TIME_UPDATED, this._onTimeUpdated],
            [AUDIO_EVENTS.BUFFER_UPDATED, this._onBufferUpdated],
            [AUDIO_EVENTS.VOLUME_CHANGED, this._onVolumeChanged],
            [AUDIO_EVENTS.MUTE_CHANGED, this._onMuteChanged],
            [AUDIO_EVENTS.RATE_CHANGED, this._onRateChange],
            [AUDIO_EVENTS.ABORT, this.props.onAborted],
            [AUDIO_EVENTS.ERROR, this.props.onError],
            [STATE_EVENTS.READY_TO_PLAY, this.props.onTrackReadyToPlay],
            [STATE_EVENTS.PLAY_REQUESTED, this.props.onPlayRequested],
            [STATE_EVENTS.PLAYING, this.props.onPlay],
            [STATE_EVENTS.PAUSED, this.props.onPause],
            [STATE_EVENTS.ENDED, this.props.onEnded],
        ];
        eventsMap.forEach(function (_a) {
            var event = _a[0], fn = _a[1];
            _this.playback.on(event, fn);
            _this.audioEventSubscriptions.push(function () { return _this.playback.off(event, fn); });
        });
    };
    PlayerEngine.prototype.unbindAudioEvents = function () {
        if (this.audioEventSubscriptions) {
            this.audioEventSubscriptions.forEach(function (unbind) {
                unbind();
            });
            this.audioEventSubscriptions = null;
        }
    };
    PlayerEngine.prototype.resetPlaybackState = function () {
        this.setState({
            playbackState: null,
            isPlaying: false,
            isLoading: false,
        });
    };
    PlayerEngine.prototype.render = function () {
        var _a = this.props, children = _a.children, playlist = _a.playlist;
        var _b = this.state, trackIndex = _b.trackIndex, restOfState = tslib_es6["__rest"](_b, ["trackIndex"]);
        var track = playlist[trackIndex];
        var playbackContext = tslib_es6["__assign"]({ play: this.play, pause: this.pause, togglePlay: this.togglePlay, seekTo: this.seekTo, setPlaybackRate: this.changePlaybackRate, toggleMute: this.toggleMute, setVolume: this.changeVolume, handleKeyDown: this.handleKeyDown }, restOfState, track);
        return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"](PlaybackContextProvider, { value: playbackContext }, children));
    };
    PlayerEngine.displayName = 'PlayerEngine';
    PlayerEngine.defaultProps = {
        loop: false,
        muted: false,
        volume: 1,
        playbackRate: 1,
        duration: 0,
        onTrackReadyToPlay: utils_noop,
        onPlayRequested: utils_noop,
        onPlay: utils_noop,
        onPause: utils_noop,
        onTimeUpdated: utils_noop,
        onDurationChanged: utils_noop,
        onVolumeChanged: utils_noop,
        onMuteChanged: utils_noop,
        onRateChanged: utils_noop,
        onEnded: utils_noop,
        onAborted: utils_noop,
        onError: utils_noop,
        handleFocus: utils_noop,
    };
    return PlayerEngine;
}(external_amd_react_commonjs_react_commonjs2_react_root_React_["Component"]));
/* harmony default export */ var containers_PlayerEngine_PlayerEngine = (PlayerEngine_PlayerEngine);
//# sourceMappingURL=PlayerEngine.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/containers/PlayerEngine/index.js

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/containers/MasterPlayer/MasterPlayer.js




var MasterPlayer_MasterPlayer = /** @class */ (function (_super) {
    tslib_es6["__extends"](MasterPlayer, _super);
    function MasterPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            playlist: [],
        };
        _this._onPlaylistChanged = function (playlist) {
            _this.setState({ playlist: playlist });
        };
        _this._setPlayerRef = function (instance) {
            _this.player = instance;
        };
        return _this;
    }
    MasterPlayer.prototype.componentDidMount = function () {
        this.playback = singleton.getInstance();
        this.playback.on(PLAYBACK_EVENTS.PLAYLIST_CHANGED, this._onPlaylistChanged);
        this.player.injectPlayback(this.playback);
        this.player.bindAudioEvents();
    };
    MasterPlayer.prototype.componentWillUnmount = function () {
        this.playback.off(PLAYBACK_EVENTS.PLAYLIST_CHANGED, this._onPlaylistChanged);
        delete this.playback;
    };
    MasterPlayer.prototype.render = function () {
        return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"](containers_PlayerEngine_PlayerEngine, tslib_es6["__assign"]({ ref: this._setPlayerRef, playlist: this.state.playlist }, this.props)));
    };
    MasterPlayer.displayName = 'MasterPlayer';
    return MasterPlayer;
}(external_amd_react_commonjs_react_commonjs2_react_root_React_["Component"]));
/* harmony default export */ var containers_MasterPlayer_MasterPlayer = (MasterPlayer_MasterPlayer);
//# sourceMappingURL=MasterPlayer.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/containers/MasterPlayer/index.js

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/containers/SlavePlayer/SlavePlayer.js





var SlavePlayer_SlavePlayer = /** @class */ (function (_super) {
    tslib_es6["__extends"](SlavePlayer, _super);
    function SlavePlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFocused = false;
        _this._checkFocus = function (playerId) {
            if (playerId === _this.props.playerId) {
                _this._onFocus();
            }
            else if (_this.isFocused) {
                _this._onBlur();
            }
        };
        _this._handleFocus = function () {
            if (!_this.isFocused && _this.player) {
                _this.player.registerPlayer();
            }
        };
        _this._setPlayerRef = function (instance) {
            _this.props.playerRef(instance);
            _this.player = instance;
        };
        return _this;
    }
    SlavePlayer.prototype.componentDidMount = function () {
        this.playback = singleton.getInstance();
        this.playback.on(PLAYBACK_EVENTS.PLAYER_CHANGED, this._checkFocus);
        this.player.injectPlayback(this.playback);
        if (!this.playback.hasRegisteredPlayer()) {
            this.player.registerPlayer();
        }
    };
    SlavePlayer.prototype.componentWillUnmount = function () {
        this.playback.off(PLAYBACK_EVENTS.PLAYER_CHANGED, this._checkFocus);
        if (this.isFocused) {
            this.playback.reset();
        }
        delete this.playback;
    };
    SlavePlayer.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        [
            ['loop', 'setLoop'],
            ['volume', 'setVolume'],
            ['playbackRate', 'setPlaybackRate'],
            ['muted', 'setMute'],
        ].forEach(function (_a) {
            var prop = _a[0], method = _a[1];
            var _b;
            if (prevProps[prop] !== _this.props[prop]) {
                _this.player.saveAudioProps((_b = {}, _b[prop] = _this.props[prop], _b));
                if (_this.isFocused) {
                    _this.playback[method](_this.props[prop]);
                }
            }
        });
        if (this.isFocused && !isEqual(prevProps.playlist, this.props.playlist)) {
            this.playback.setPlaylist(this.props.playlist);
            this.player.updateTrack();
        }
    };
    SlavePlayer.prototype._onFocus = function () {
        this.player.bindAudioEvents();
        this.isFocused = true;
    };
    SlavePlayer.prototype._onBlur = function () {
        this.player.unbindAudioEvents();
        this.player.resetPlaybackState();
        this.isFocused = false;
    };
    SlavePlayer.prototype.render = function () {
        return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"](containers_PlayerEngine_PlayerEngine, tslib_es6["__assign"]({ ref: this._setPlayerRef, handleFocus: this._handleFocus }, this.props)));
    };
    SlavePlayer.displayName = 'SlavePlayer';
    SlavePlayer.defaultProps = {
        playerRef: utils_noop,
    };
    return SlavePlayer;
}(external_amd_react_commonjs_react_commonjs2_react_root_React_["Component"]));
/* harmony default export */ var containers_SlavePlayer_SlavePlayer = (SlavePlayer_SlavePlayer);
//# sourceMappingURL=SlavePlayer.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/containers/SlavePlayer/index.js

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/containers/SinglePlayer/SinglePlayer.js





var SinglePlayer_SinglePlayer = /** @class */ (function (_super) {
    tslib_es6["__extends"](SinglePlayer, _super);
    function SinglePlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._setPlayerRef = function (instance) {
            _this.props.playerRef(instance);
            _this.player = instance;
        };
        return _this;
    }
    SinglePlayer.prototype.componentDidMount = function () {
        this.playback = new playback();
        this.player.injectPlayback(this.playback);
        this.player.bindAudioEvents();
        this.player.registerPlayer();
    };
    SinglePlayer.prototype.componentWillUnmount = function () {
        this.playback.destroy();
        delete this.playback;
    };
    SinglePlayer.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        [
            ['loop', 'setLoop'],
            ['volume', 'setVolume'],
            ['playbackRate', 'setPlaybackRate'],
            ['muted', 'setMute'],
        ].forEach(function (_a) {
            var prop = _a[0], method = _a[1];
            var _b;
            if (prevProps[prop] !== _this.props[prop]) {
                _this.player.saveAudioProps((_b = {}, _b[prop] = _this.props[prop], _b));
                _this.playback[method](_this.props[prop]);
            }
        });
        if (!isEqual(prevProps.playlist, this.props.playlist)) {
            this.playback.setPlaylist(this.props.playlist);
            this.player.updateTrack();
        }
    };
    SinglePlayer.prototype.render = function () {
        return external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"](containers_PlayerEngine_PlayerEngine, tslib_es6["__assign"]({ ref: this._setPlayerRef }, this.props));
    };
    SinglePlayer.displayName = 'SinglePlayer';
    SinglePlayer.defaultProps = {
        playerRef: utils_noop,
    };
    return SinglePlayer;
}(external_amd_react_commonjs_react_commonjs2_react_root_React_["Component"]));
/* harmony default export */ var containers_SinglePlayer_SinglePlayer = (SinglePlayer_SinglePlayer);
//# sourceMappingURL=SinglePlayer.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/containers/SinglePlayer/index.js

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/common/withPlaybackContext.js



var withPlaybackContext = function (Component) { return function (props) { return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"](PlaybackContextConsumer, null, function (value) { return external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"](Component, tslib_es6["__assign"]({}, props, { context: value })); })); }; };
/* harmony default export */ var common_withPlaybackContext = (withPlaybackContext);
//# sourceMappingURL=withPlaybackContext.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/ArtistName/ArtistName.st.css
var ArtistName_st = __webpack_require__(402);
var ArtistName_st_default = /*#__PURE__*/__webpack_require__.n(ArtistName_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/ArtistName/ArtistName.js



var ArtistName = function (props) { return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("span", { className: ArtistName_st_default.a.title + " " + props.className, "data-hook": props.dataHook }, props.context.artistName)); };
ArtistName.displayName = 'ArtistName';
ArtistName.defaultProps = {
    className: '',
    dataHook: '',
};
/* harmony default export */ var ArtistName_ArtistName = (common_withPlaybackContext(ArtistName));
//# sourceMappingURL=ArtistName.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/ArtistName/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Cover/Cover.st.css
var Cover_st = __webpack_require__(403);
var Cover_st_default = /*#__PURE__*/__webpack_require__.n(Cover_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Cover/Cover.js



var Cover = function (props) { return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("div", { style: { backgroundImage: "url(" + props.context.cover + ")" }, className: Cover_st_default.a.cover + " " + props.className, "data-hook": props.dataHook })); };
Cover.displayName = 'Cover';
Cover.defaultProps = {
    className: '',
    dataHook: '',
};
/* harmony default export */ var Cover_Cover = (common_withPlaybackContext(Cover));
//# sourceMappingURL=Cover.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Cover/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/TimeStamp/TimeStamp.st.css
var TimeStamp_st = __webpack_require__(404);
var TimeStamp_st_default = /*#__PURE__*/__webpack_require__.n(TimeStamp_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/TimeStamp/TimeStamp.js



var TimeStamp = function (props) {
    var _a;
    var _b = props.context, currentTimeFormatted = _b.currentTimeFormatted, durationFormatted = _b.durationFormatted, remainingFormatted = _b.remainingFormatted, isLiveStream = _b.isLiveStream;
    var display = isLiveStream ? 'currentTime' : props.display;
    return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("span", { className: TimeStamp_st_default.a.time + " " + props.className, "data-hook": props.dataHook }, (_a = {},
        _a['full'] = currentTimeFormatted + " / " + durationFormatted,
        _a['duration'] = "" + durationFormatted,
        _a['currentTime'] = "" + currentTimeFormatted,
        _a['remaining'] = "-" + remainingFormatted,
        _a)[display]));
};
TimeStamp.displayName = 'TimeStamp';
TimeStamp.defaultProps = {
    className: '',
    dataHook: '',
    display: 'full',
};
/* harmony default export */ var TimeStamp_TimeStamp = (common_withPlaybackContext(TimeStamp));
//# sourceMappingURL=TimeStamp.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/TimeStamp/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/TrackName/TrackName.st.css
var TrackName_st = __webpack_require__(405);
var TrackName_st_default = /*#__PURE__*/__webpack_require__.n(TrackName_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/TrackName/TrackName.js



var TrackName = function (props) { return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("span", { className: TrackName_st_default.a.title + " " + props.className, "data-hook": props.dataHook }, props.context.trackName)); };
TrackName.displayName = 'TrackName';
TrackName.defaultProps = {
    className: '',
    dataHook: '',
};
/* harmony default export */ var TrackName_TrackName = (common_withPlaybackContext(TrackName));
//# sourceMappingURL=TrackName.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/TrackName/index.js

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPause/assets/pause.js

var PauseIcon = function () { return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("svg", { width: "18px", height: "20px", viewBox: "0 0 18 20", xmlns: "http://www.w3.org/2000/svg" },
    external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("g", { fill: "currentcolor" },
        external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("path", { d: "M0,0.99, C0,0.44 0.45,0 0.99,0 L5.01,0 C5.56,0 6,0.46 6,0.99 L6,19.01 C6,19.56 5.55,20 5.01,20 L0.99,20 C0.44,20 0,19.54 0,19.01 L0,0.99 Z M10,0.99 C10,0.44 10.45,0 10.99,0 L15.01,0 C15.56,0 16,0.46 16,0.99 L16,9.01 C16,19.56 15.55,20 15.01,20 L10.99,20 C10.44,20 10,19.54 10,19.01 L10,0.99 Z" })))); };
/* harmony default export */ var pause = (PauseIcon);
//# sourceMappingURL=pause.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPause/assets/play.js

var PlayIcon = function () { return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("svg", { width: "18px", height: "20px", viewBox: "0 0 18 20", xmlns: "http://www.w3.org/2000/svg" },
    external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("g", { fill: "currentcolor" },
        external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("path", { d: "M17.29,9.02 C18.25,9.56 18.25,10.44 17.29,10.98 L1.74,19.78 C0.78,20.33 0,19.87 0,18.76 L0,1.24 C0,0.13 0.78,-0.32 1.74,0.22 L17.29,9.02 Z" })))); };
/* harmony default export */ var play = (PlayIcon);
//# sourceMappingURL=play.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPause/PlayPause.st.css
var PlayPause_st = __webpack_require__(406);
var PlayPause_st_default = /*#__PURE__*/__webpack_require__.n(PlayPause_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPause/PlayPause.js






var PlayPause = function (props) { return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("button", { className: PlayPause_st_default.a.button + " " + props.className, "data-hook": props.dataHook, "aria-label": props.context.isPlaying ? 'Pause' : 'Play', type: "button", onClick: props.context.togglePlay, onKeyDown: function (e) {
        if (e.keyCode === KeyboardKey.Space) {
            return;
        }
        props.context.handleKeyDown(e);
    } }, props.context.isPlaying || props.context.isPlayingInterrupted
    ? props.iconPause
    : props.iconPlay)); };
PlayPause.displayName = 'PlayPause';
PlayPause.defaultProps = {
    className: '',
    dataHook: '',
    iconPlay: external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"](play, null),
    iconPause: external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"](pause, null),
};
/* harmony default export */ var PlayPause_PlayPause = (common_withPlaybackContext(PlayPause));
//# sourceMappingURL=PlayPause.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPause/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPauseAnimated/PlayPauseAnimated.st.css
var PlayPauseAnimated_st = __webpack_require__(407);
var PlayPauseAnimated_st_default = /*#__PURE__*/__webpack_require__.n(PlayPauseAnimated_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPauseAnimated/PlayPauseAnimated.js





var PlayPauseAnimated_PlayPauseAnimated = /** @class */ (function (_super) {
    tslib_es6["__extends"](PlayPauseAnimated, _super);
    function PlayPauseAnimated() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleKeyDown = function (e) {
            if (e.keyCode === KeyboardKey.Space) {
                return;
            }
            _this.props.context.handleKeyDown(e);
        };
        return _this;
    }
    PlayPauseAnimated.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.context.isPlaying !== this.props.context.isPlaying) {
            this.$animate.beginElement();
        }
    };
    PlayPauseAnimated.prototype.render = function () {
        var _this = this;
        var _a = this.props, playPath = _a.playPath, pausePath = _a.pausePath, context = _a.context, className = _a.className;
        return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("button", { className: PlayPauseAnimated_st_default.a.button + " " + className, "data-hook": this.props.dataHook, "aria-label": context.isPlaying ? 'Pause' : 'Play', type: "button", onClick: context.togglePlay, onKeyDown: this.handleKeyDown },
            external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("svg", { width: "100%", height: "100%", viewBox: "11 10 16 16" },
                external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("path", { d: context.isPlaying ? pausePath : playPath },
                    external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("animate", { ref: function (ref) {
                            _this.$animate = ref;
                        }, begin: "indefinite", attributeType: "XML", attributeName: "d", fill: "freeze", from: context.isPlaying ? playPath : pausePath, to: context.isPlaying ? pausePath : playPath, dur: "0.2s", keySplines: ".4 0 1 1", repeatCount: "1" })))));
    };
    PlayPauseAnimated.displayName = 'PlayPauseAnimated';
    PlayPauseAnimated.defaultProps = {
        className: '',
        dataHook: '',
        playPath: 'M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28',
        pausePath: 'M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26',
    };
    return PlayPauseAnimated;
}(external_amd_react_commonjs_react_commonjs2_react_root_React_["Component"]));
/* harmony default export */ var components_PlayPauseAnimated_PlayPauseAnimated = (common_withPlaybackContext(PlayPauseAnimated_PlayPauseAnimated));
//# sourceMappingURL=PlayPauseAnimated.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/PlayPauseAnimated/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/ProgressBar/ProgressBar.st.css
var ProgressBar_st = __webpack_require__(200);
var ProgressBar_st_default = /*#__PURE__*/__webpack_require__.n(ProgressBar_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/ProgressBar/ProgressBar.js





var ProgressBar_ProgressBar = /** @class */ (function (_super) {
    tslib_es6["__extends"](ProgressBar, _super);
    function ProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            range: 0,
            isSeeking: false,
        };
        _this.change = utils_debounce(function (value) { return tslib_es6["__awaiter"](_this, void 0, void 0, function () {
            return tslib_es6["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.context.seekTo(value)];
                    case 1:
                        _a.sent();
                        this.setState({
                            isSeeking: false,
                        });
                        if (!this.props.context.isPlayingInterrupted) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.props.context.play()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); }, 200);
        _this.handleChange = function (_a) {
            var value = _a.target.value;
            if (_this.props.context.isSeeking) {
                return;
            }
            var nextRange = value / _this.props.context.duration;
            if (_this.props.context.isPlaying) {
                _this.props.context.pause(true);
            }
            _this.setState({
                range: nextRange,
                isSeeking: true,
            });
            _this.change(+value);
        };
        return _this;
    }
    ProgressBar.getDerivedStateFromProps = function (props, state) {
        if (!state.isSeeking) {
            var nextRange = props.context.currentTime / props.context.duration;
            return {
                range: nextRange || 0,
            };
        }
        return null;
    };
    ProgressBar.prototype.render = function () {
        var _a = this.props.context, duration = _a.duration, buffered = _a.buffered, isLoading = _a.isLoading, handleKeyDown = _a.handleKeyDown, isLiveStream = _a.isLiveStream;
        var range = this.state.range;
        var rangeStyle = { '--value': 100 * range + "%" };
        var now = Math.round(range * 100);
        return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("div", { className: ProgressBar_st_default.a.container + " " + this.props.className + " " + (isLoading ? ProgressBar_st_default.a.loading : ''), "data-hook": this.props.dataHook },
            external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("progress", { className: ProgressBar_st_default.a.progress + " " + this.props.classNameProgressBar, max: 100, value: 100 * buffered }),
            external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("input", { type: "range", className: ProgressBar_st_default.a.range + " " + this.props.classNameRangeBar, min: "0", max: duration, value: range * duration, step: "0.01", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": now, "aria-valuetext": now + "%", style: rangeStyle, onChange: this.handleChange, onKeyDown: handleKeyDown, disabled: isLiveStream })));
    };
    ProgressBar.displayName = 'ProgressBar';
    ProgressBar.defaultProps = {
        className: '',
        classNameProgressBar: '',
        classNameRangeBar: '',
        dataHook: '',
    };
    return ProgressBar;
}(external_amd_react_commonjs_react_commonjs2_react_root_React_["Component"]));
/* harmony default export */ var components_ProgressBar_ProgressBar = (common_withPlaybackContext(ProgressBar_ProgressBar));
//# sourceMappingURL=ProgressBar.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/ProgressBar/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Mute/Mute.st.css
var Mute_st = __webpack_require__(408);
var Mute_st_default = /*#__PURE__*/__webpack_require__.n(Mute_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Mute/Mute.js



var Mute = function (props) { return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("button", { className: Mute_st_default.a.button + " " + props.className, "data-hook": props.dataHook, onClick: props.context.toggleMute }, props.context.muted ? props.iconUnMute : props.iconMute)); };
Mute.displayName = 'Mute';
Mute.defaultProps = {
    className: '',
    dataHook: '',
    iconMute: external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("span", null, "mute"),
    iconUnMute: external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("span", null, "unmute"),
};
/* harmony default export */ var Mute_Mute = (common_withPlaybackContext(Mute));
//# sourceMappingURL=Mute.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Mute/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Rate/Rate.st.css
var Rate_st = __webpack_require__(409);
var Rate_st_default = /*#__PURE__*/__webpack_require__.n(Rate_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Rate/Rate.js




var Rate_Rate = /** @class */ (function (_super) {
    tslib_es6["__extends"](Rate, _super);
    function Rate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function () {
            var nextRate = _this.props.context.playbackRate + _this.props.increment;
            nextRate = nextRate > _this.props.max ? _this.props.min : nextRate;
            _this.props.context.setPlaybackRate(nextRate);
        };
        return _this;
    }
    Rate.prototype.render = function () {
        return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("button", { className: Rate_st_default.a.button + " " + this.props.className, "data-hook": this.props.dataHook, onClick: this.handleChange },
            this.props.prefix,
            this.props.context.playbackRate,
            this.props.suffix));
    };
    Rate.displayName = 'Rate';
    Rate.defaultProps = {
        className: '',
        dataHook: '',
        increment: 0.5,
        max: 2,
        min: 0.5,
        prefix: '',
        suffix: 'x',
    };
    return Rate;
}(external_amd_react_commonjs_react_commonjs2_react_root_React_["Component"]));
/* harmony default export */ var components_Rate_Rate = (common_withPlaybackContext(Rate_Rate));
//# sourceMappingURL=Rate.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Rate/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Forward/Forward.st.css
var Forward_st = __webpack_require__(410);
var Forward_st_default = /*#__PURE__*/__webpack_require__.n(Forward_st);

// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Forward/Forward.js




var Forward_Forward = /** @class */ (function (_super) {
    tslib_es6["__extends"](Forward, _super);
    function Forward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var nextTime = _this.props.context.currentTime + _this.props.increment;
            _this.props.context.seekTo(nextTime);
        };
        return _this;
    }
    Forward.prototype.render = function () {
        return (external_amd_react_commonjs_react_commonjs2_react_root_React_["createElement"]("button", { className: Forward_st_default.a.button + " " + this.props.className, "data-hook": this.props.dataHook, onClick: this.handleClick }, this.props.icon));
    };
    Forward.displayName = 'Forward';
    Forward.defaultProps = {
        className: '',
        dataHook: '',
        icon: '<span>',
        increment: 15,
    };
    return Forward;
}(external_amd_react_commonjs_react_commonjs2_react_root_React_["Component"]));
/* harmony default export */ var components_Forward_Forward = (common_withPlaybackContext(Forward_Forward));
//# sourceMappingURL=Forward.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/components/Forward/index.js

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ../node_modules/@wix/soundhead-react/dist/es/src/index.js
/* concated harmony reexport MasterPlayer */__webpack_require__.d(__webpack_exports__, "MasterPlayer", function() { return containers_MasterPlayer_MasterPlayer; });
/* concated harmony reexport SlavePlayer */__webpack_require__.d(__webpack_exports__, "SlavePlayer", function() { return containers_SlavePlayer_SlavePlayer; });
/* concated harmony reexport SinglePlayer */__webpack_require__.d(__webpack_exports__, "SinglePlayer", function() { return containers_SinglePlayer_SinglePlayer; });
/* concated harmony reexport ArtistName */__webpack_require__.d(__webpack_exports__, "ArtistName", function() { return ArtistName_ArtistName; });
/* concated harmony reexport Cover */__webpack_require__.d(__webpack_exports__, "Cover", function() { return Cover_Cover; });
/* concated harmony reexport TimeStamp */__webpack_require__.d(__webpack_exports__, "TimeStamp", function() { return TimeStamp_TimeStamp; });
/* concated harmony reexport TrackName */__webpack_require__.d(__webpack_exports__, "TrackName", function() { return TrackName_TrackName; });
/* concated harmony reexport PlayPause */__webpack_require__.d(__webpack_exports__, "PlayPause", function() { return PlayPause_PlayPause; });
/* concated harmony reexport PlayPauseAnimated */__webpack_require__.d(__webpack_exports__, "PlayPauseAnimated", function() { return components_PlayPauseAnimated_PlayPauseAnimated; });
/* concated harmony reexport ProgressBar */__webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return components_ProgressBar_ProgressBar; });
/* concated harmony reexport Mute */__webpack_require__.d(__webpack_exports__, "Mute", function() { return Mute_Mute; });
/* concated harmony reexport Rate */__webpack_require__.d(__webpack_exports__, "Rate", function() { return components_Rate_Rate; });
/* concated harmony reexport Forward */__webpack_require__.d(__webpack_exports__, "Forward", function() { return components_Forward_Forward; });
/* concated harmony reexport withPlaybackContext */__webpack_require__.d(__webpack_exports__, "withPlaybackContext", function() { return common_withPlaybackContext; });














//# sourceMappingURL=index.js.map

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

/***/ }),

/***/ 95:
/*!**********************!*\
  !*** ./utils/url.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var externalUrlMatcher = /(^https?)|(^data)|(^blob)|(^\/\/)/;

function isValidExternalUrl(url) {
  return externalUrlMatcher.test(url);
}

function isAudioUrlPlayable(url) {
  return new Promise(function (resolve) {
    var audio = new Audio(url);
    audio.muted = true;
    var playPromise = audio.play();

    if (playPromise) {
      return playPromise.then(function () {
        audio.pause();
        audio.src = '';
        resolve(true);
      }).catch(function () {
        audio.pause();
        audio.src = '';
        resolve(false);
      });
    }

    audio.pause();
    audio.src = '';
    resolve(false);
  });
}

var audioProviders = {
  soundcloud: /soundcloud\.com/i,
  itunes: /itunes\.apple\.com/i,
  youtube: /youtube\.com|youtu\.be/i,
  spotify: /spotify\.com/i
};

function guessAudioProvider(url) {
  for (var key in audioProviders) {
    if (audioProviders[key].test(url)) {
      return key;
    }
  }

  return 'other_url';
}

exports.isValidExternalUrl = isValidExternalUrl;
exports.isAudioUrlPlayable = isAudioUrlPlayable;
exports.guessAudioProvider = guessAudioProvider;

/***/ })

}]);
//# sourceMappingURL=wixui.MusicPlayer.chunk.js.map