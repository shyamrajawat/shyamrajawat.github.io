((typeof self !== 'undefined' ? self : this)["webpackJsonp_wix_ui_santa"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp_wix_ui_santa"] || []).push([[52],{

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

/***/ 224:
/*!******************************************!*\
  !*** ./legacy/utils/namespaceClasses.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = namespaceClasses;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ 1);

var _hoistNonReactMethods = __webpack_require__(/*! hoist-non-react-methods */ 60);

var _hoistNonReactMethods2 = _interopRequireDefault(_hoistNonReactMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isStatelessComponent = function isStatelessComponent(Component) {
  return !(Component.prototype && Component.prototype.render);
};

function namespaceClasses(Component, classes) {
  var Namespaced = function (_React$Component) {
    _inherits(Namespaced, _React$Component);

    function Namespaced() {
      _classCallCheck(this, Namespaced);

      return _possibleConstructorReturn(this, (Namespaced.__proto__ || Object.getPrototypeOf(Namespaced)).apply(this, arguments));
    }

    _createClass(Namespaced, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            styleId = _props.styleId,
            rest = _objectWithoutProperties(_props, ['styleId']);

        var withNamespace = {};
        classes.forEach(function (cls) {
          withNamespace[cls] = styleId + '_' + cls;
        });
        return isStatelessComponent(Component) ? _react2.default.createElement(Component, _extends({ classes: withNamespace }, rest)) : _react2.default.createElement(Component, _extends({ ref: function ref(_ref) {
            return _this2.wrappedComponentRef = _ref;
          }, classes: withNamespace }, rest));
      }
    }]);

    return Namespaced;
  }(_react2.default.Component);

  Namespaced.propTypes = _extends({
    styleId: _propTypes.string
  }, Component.propTypes);

  return isStatelessComponent(Component) ? Namespaced : (0, _hoistNonReactMethods2.default)(Namespaced, Component, { delegateTo: function delegateTo(c) {
      return c.wrappedComponentRef;
    }, hoistStatics: true });
}

/***/ }),

/***/ 285:
/*!****************************************************************!*\
  !*** ./legacy/components/CoreToggleSwitch/CoreToggleSwitch.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ 1);

var _utils = __webpack_require__(/*! ./utils */ 286);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = __webpack_require__(/*! lodash */ 2);

/**
 * Toggle Switch
 */

var ToggleSwitch = function (_React$PureComponent) {
  _inherits(ToggleSwitch, _React$PureComponent);

  function ToggleSwitch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToggleSwitch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToggleSwitch.__proto__ || Object.getPrototypeOf(ToggleSwitch)).call.apply(_ref, [this].concat(args))), _this), _this.id = _this.props.id || _.uniqueId('ToggleSwitch'), _this.inputRef = null, _this.toggle = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToggleSwitch, [{
    key: 'handleChange',
    value: function handleChange(e) {
      if (!this.props.disabled) {
        this.props.onChange(e);
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.inputRef.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.inputRef.blur();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          checked = _props.checked,
          disabled = _props.disabled,
          classes = _props.classes,
          styles = _props.styles,
          previewState = _props.previewState,
          dataHook = _props.dataHook,
          dataClass = _props.dataClass;
      var id = this.id;


      return _react2.default.createElement(
        'label',
        {
          className: classes.root,
          style: styles.root,
          ref: function ref(_ref2) {
            return _this2.toggle = _ref2;
          },
          'data-preview': previewState,
          onClick: function onClick() {
            return _this2.inputRef && _this2.inputRef.focus();
          },
          'data-hook': dataHook,
          'data-class': dataClass
        },
        _react2.default.createElement('input', {
          type: 'checkbox',
          id: id,
          checked: checked,
          disabled: disabled,
          onChange: function onChange(e) {
            return _this2.handleChange(e);
          },
          ref: function ref(el) {
            return _this2.inputRef = el;
          }
        }),
        _react2.default.createElement('div', { className: classes.outerLabel, style: styles.outerLabel, 'aria-label': 'Toggle' }),
        _react2.default.createElement(
          'div',
          { className: classes.innerLabel, style: styles.innerLabel },
          _react2.default.createElement(
            'svg',
            { className: classes.toggleIcon, style: styles.toggleIcon, viewBox: (0, _utils.getViewBox)(checked) },
            _react2.default.createElement('path', { d: (0, _utils.getPathDescription)(checked) })
          )
        )
      );
    }
  }]);

  return ToggleSwitch;
}(_react2.default.PureComponent);

ToggleSwitch.propTypes = {
  /** Is the toggleSwitch checked or not */
  checked: _propTypes.bool,
  /** Callback function when user changes the value of the component */
  onChange: _propTypes.func.isRequired,
  /** Is the toggleSwitch disabled or not */
  disabled: _propTypes.bool,
  /** Classes object */
  classes: _propTypes.object.isRequired,
  /** Component ID, will be generated automatically if not provided */
  /** Styles object */
  styles: _propTypes.object,
  /** Component ID, will be generated automatically if not provided */
  id: _propTypes.string,
  /** Preview state, initiate hover, focus, etc. synthetically */
  previewState: _propTypes.string,
  dataHook: _propTypes.string,
  dataClass: _propTypes.string
};
ToggleSwitch.defaultProps = {
  checked: false,
  styles: {},
  previewState: ''
};
exports.default = ToggleSwitch;

/***/ }),

/***/ 286:
/*!*****************************************************!*\
  !*** ./legacy/components/CoreToggleSwitch/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var activeViewBox = exports.activeViewBox = '0 0 41 32';
var activePathD = exports.activePathD = 'M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z';

var inactiveViewBox = exports.inactiveViewBox = '0 0 143 32';
var inactivePathD = exports.inactivePathD = 'M0 0h142.545v32h-142.545v-32z';

var getViewBox = exports.getViewBox = function getViewBox(checked) {
  return checked ? activeViewBox : inactiveViewBox;
};

var getPathDescription = exports.getPathDescription = function getPathDescription(checked) {
  return checked ? activePathD : inactivePathD;
};

/***/ }),

/***/ 411:
/*!*************************************************!*\
  !*** ./legacy/components/ToggleSwitch/index.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ToggleSwitch = __webpack_require__(/*! ./ToggleSwitch */ 463);

exports.default = {
  componentType: 'wixui.ToggleSwitch',
  component: _ToggleSwitch.ToggleSwitchWithClasses,
  santaComponent: _ToggleSwitch.ToggleSwitchSanta,
  skin: _ToggleSwitch.skinJson
};

/***/ }),

/***/ 463:
/*!********************************************************!*\
  !*** ./legacy/components/ToggleSwitch/ToggleSwitch.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleSwitchSanta = exports.skinJson = exports.ToggleSwitchWithClasses = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createReactClass = __webpack_require__(/*! create-react-class */ 17);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(/*! lodash */ 2);

var _lodash2 = _interopRequireDefault(_lodash);

var _CoreToggleSwitch = __webpack_require__(/*! ../CoreToggleSwitch/CoreToggleSwitch */ 285);

var _CoreToggleSwitch2 = _interopRequireDefault(_CoreToggleSwitch);

var _propTypes = __webpack_require__(/*! prop-types */ 1);

var _theme = __webpack_require__(/*! ./theme */ 464);

var skin = _interopRequireWildcard(_theme);

var _santaComponents = __webpack_require__(/*! santa-components */ 15);

var _namespaceClasses = __webpack_require__(/*! ../../utils/namespaceClasses */ 224);

var _namespaceClasses2 = _interopRequireDefault(_namespaceClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function handleClick(e, onClick) {
  e.stopPropagation();
  if (e.target.tagName === 'INPUT') {
    onClick();
  }
}

function concatPercent(value) {
  return value !== 0 ? value + '%' : value;
}

function calcUncheckedLeftValue(pKnobSize, pTrackHeight, knobWidth, isRtl) {
  if (isRtl) {
    return pKnobSize > pTrackHeight ? 100 - knobWidth : 100 - knobWidth - (pTrackHeight - pKnobSize) / 4;
  } else {
    return pKnobSize > pTrackHeight ? 0 : (pTrackHeight - pKnobSize) / 4;
  }
}

function calcCheckedLeftValue(pKnobSize, pTrackHeight, knobWidth, isRtl) {
  if (isRtl) {
    return pKnobSize > pTrackHeight ? 0 : (pTrackHeight - pKnobSize) / 4;
  } else {
    return pKnobSize > pTrackHeight ? 100 - knobWidth : 100 - knobWidth - (pTrackHeight - pKnobSize) / 4;
  }
}

var ToggleSwitch = function (_React$Component) {
  _inherits(ToggleSwitch, _React$Component);

  function ToggleSwitch() {
    _classCallCheck(this, ToggleSwitch);

    return _possibleConstructorReturn(this, (ToggleSwitch.__proto__ || Object.getPrototypeOf(ToggleSwitch)).apply(this, arguments));
  }

  _createClass(ToggleSwitch, [{
    key: 'focus',
    value: function focus() {
      this.coreRef.focus();
      this.props.onFocus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.coreRef.blur();
      this.props.onBlur();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          checked = _props.checked,
          id = _props.id,
          trackHeight = _props.trackHeight,
          knobSize = _props.knobSize,
          isDisabled = _props.isDisabled,
          displayKnobIcons = _props.displayKnobIcons,
          onChange = _props.onChange,
          _onClick = _props.onClick,
          onFocus = _props.onFocus,
          onBlur = _props.onBlur,
          isRtl = _props.isRtl,
          previewState = _props.previewState,
          coreProps = _objectWithoutProperties(_props, ['classes', 'checked', 'id', 'trackHeight', 'knobSize', 'isDisabled', 'displayKnobIcons', 'onChange', 'onClick', 'onFocus', 'onBlur', 'isRtl', 'previewState']);

      var pKnobSize = Number(knobSize);
      var knobHeight = pKnobSize;
      var knobWidth = pKnobSize / 2;
      var pTrackHeight = Number(trackHeight);

      var uncheckedLeft = calcUncheckedLeftValue(pKnobSize, pTrackHeight, knobWidth, isRtl);
      var checkedLeft = calcCheckedLeftValue(pKnobSize, pTrackHeight, knobWidth, isRtl);

      var parsedPreviewState = (previewState || '').replace('regular', '').trim().replace(/ /g, ':');
      var isChecked = previewState ? parsedPreviewState.indexOf('checked') !== -1 : checked;

      var styles = {
        outerLabel: {
          height: pTrackHeight + '%'
        },
        innerLabel: {
          width: concatPercent(knobWidth),
          height: concatPercent(knobHeight),
          left: isChecked ? concatPercent(checkedLeft) : concatPercent(uncheckedLeft)
        },
        toggleIcon: {
          display: displayKnobIcons ? 'block' : 'none'
        }
      };

      var style = { display: 'inline-block', width: '100%', height: '100%' };
      return _react2.default.createElement(
        'div',
        { style: style, onClick: function onClick(e) {
            return handleClick(e, _onClick);
          }, onFocus: onFocus, onBlur: onBlur },
        _react2.default.createElement(_CoreToggleSwitch2.default, _extends({
          classes: classes,
          styles: styles,
          disabled: isDisabled,
          checked: isChecked,
          id: id,
          onChange: onChange,
          previewState: parsedPreviewState,
          ref: function ref(e) {
            return _this2.coreRef = e;
          }
        }, coreProps))
      );
    }
  }]);

  return ToggleSwitch;
}(_react2.default.Component);

ToggleSwitch.displayName = 'ToggleSwitch';
ToggleSwitch.propTypes = _extends({}, _CoreToggleSwitch2.default.propTypes, {
  classes: _propTypes.object,
  checked: _propTypes.bool,
  id: _propTypes.string.isRequired,
  trackHeight: _propTypes.number.isRequired,
  knobSize: _propTypes.number.isRequired,
  isDisabled: _propTypes.bool,
  displayKnobIcons: _propTypes.bool,
  onChange: _propTypes.func.isRequired,
  onClick: _propTypes.func,
  onFocus: _propTypes.func,
  onBlur: _propTypes.func,
  isRtl: _propTypes.bool,
  previewState: _propTypes.string
});
ToggleSwitch.defaultProps = {
  onClick: function onClick() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  isRtl: false,
  previewState: ''
};

var ToggleSwitchWithClasses = exports.ToggleSwitchWithClasses = (0, _namespaceClasses2.default)(ToggleSwitch, skin.classes);

var skinBasedComp = _santaComponents.mixins.skinBasedComp,
    runTimeCompData = _santaComponents.mixins.runTimeCompData,
    inputFocusMixin = _santaComponents.mixins.inputFocusMixin;
var skinJson = exports.skinJson = skin.json;

var getComponentSkins = function getComponentSkins() {
  return skinJson;
};

/**
     * @class components.toggleSwitch
     * @extends {core.skinBasedComp}
     */

var ToggleSwitchSanta = exports.ToggleSwitchSanta = (0, _createReactClass2.default)({
  displayName: 'ToggleSwitch',

  mixins: [skinBasedComp(getComponentSkins()), runTimeCompData, inputFocusMixin],

  propTypes: {
    structure: _santaComponents.santaTypesDefinitions.Component.structure.isRequired,
    compProp: _santaComponents.santaTypesDefinitions.Component.compProp.isRequired,
    compData: _santaComponents.santaTypesDefinitions.Component.compData.isRequired,
    componentViewMode: _santaComponents.santaTypesDefinitions.RenderFlags.componentViewMode,
    componentPreviewState: _santaComponents.santaTypesDefinitions.RenderFlags.componentPreviewState,
    styleId: _santaComponents.santaTypesDefinitions.Component.styleId,
    style: _santaComponents.santaTypesDefinitions.Component.style,
    id: _santaComponents.santaTypesDefinitions.Component.id,
    isMobileView: _santaComponents.santaTypesDefinitions.isMobileView
  },

  statics: {
    behaviors: _lodash2.default.assign({}, inputFocusMixin.INPUT_FOCUS_BEHAVIORS),
    getComponentSkins: getComponentSkins
  },

  focus: function focus() {
    this.toggleSwitchRef.focus();
  },
  blur: function blur() {
    this.toggleSwitchRef.blur();
  },
  getInitialState: function getInitialState() {
    return {
      checked: Boolean(this.props.compData.checked)
    };
  },
  UNSAFE_componentWillReceiveProps: function UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-line
    this.setState({
      checked: Boolean(nextProps.compData.checked)
    });
  },
  onChange: function onChange() {
    var updatedData = {
      checked: !this.state.checked
    };
    this.setState(updatedData);
    this.updateData(updatedData);
    this.handleAction('change', updatedData);
  },
  onFocus: function onFocus() {
    this.handleAction('focus');
  },
  onBlur: function onBlur() {
    this.handleAction('blur');
  },
  onClick: function onClick() {
    this.handleAction('click');
  },
  getSkinProperties: function getSkinProperties() {
    var _this3 = this;

    var checked = this.state.checked;
    var _props2 = this.props,
        id = _props2.id,
        styleId = _props2.styleId;
    var _props$compProp = this.props.compProp,
        trackHeight = _props$compProp.trackHeight,
        knobSize = _props$compProp.knobSize,
        isDisabled = _props$compProp.isDisabled,
        displayKnobIcons = _props$compProp.displayKnobIcons,
        alignment = _props$compProp.alignment;


    var toggleProps = {
      id: 'toggle-switch-' + id,
      styleId: styleId,
      checked: checked,
      trackHeight: trackHeight,
      knobSize: knobSize,
      isDisabled: isDisabled,
      displayKnobIcons: displayKnobIcons,
      isRtl: alignment === 'right',
      previewState: this.getComponentPreviewState(),
      onChange: function onChange() {
        return _this3.onChange();
      },
      onFocus: function onFocus() {
        return _this3.onFocus();
      },
      onBlur: function onBlur() {
        return _this3.onBlur();
      },
      onClick: function onClick() {
        return _this3.onClick();
      },
      ref: function ref(toggleSwitchRef) {
        _this3.toggleSwitchRef = toggleSwitchRef;
      }
    };

    return {
      '': {
        children: [_santaComponents.utils.createReactElement(ToggleSwitchWithClasses, toggleProps)]
      }
    };
  }
});

/***/ }),

/***/ 464:
/*!*************************************************!*\
  !*** ./legacy/components/ToggleSwitch/theme.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// this file was prevaled

module.exports = { "json": { "wixui.skins.ToggleSwitch": { "params": { "outerLabelBorderSizeFocus": "BORDER_SIZE", "outerLabelBorderColorFocus": "COLOR_ALPHA", "backgroundColorFocus": "COLOR_ALPHA", "outerLabelBorderSizeDisabled": "BORDER_SIZE", "outerLabelBorderColorDisabled": "COLOR_ALPHA", "backgroundColorDisabled": "COLOR_ALPHA", "innerLabelBorderSizeDisabled": "BORDER_SIZE", "innerLabelBorderColorDisabled": "COLOR_ALPHA", "innerLabelBackgroundColorDisabled": "COLOR_ALPHA", "colorCheckedDisabled": "COLOR_ALPHA", "colorDisabled": "COLOR_ALPHA", "outerLabelBorderSizeHoverChecked": "BORDER_SIZE", "outerLabelBorderColorHoverChecked": "COLOR_ALPHA", "backgroundColorHoverChecked": "COLOR_ALPHA", "innerLabelBorderSizeHoverChecked": "BORDER_SIZE", "innerLabelBorderColorHoverChecked": "COLOR_ALPHA", "innerLabelBackgroundColorHoverChecked": "COLOR_ALPHA", "colorHoverChecked": "COLOR_ALPHA", "outerLabelBorderSizeHover": "BORDER_SIZE", "outerLabelBorderColorHover": "COLOR_ALPHA", "backgroundColorHover": "COLOR_ALPHA", "innerLabelBorderSizeHover": "BORDER_SIZE", "innerLabelBorderColorHover": "COLOR_ALPHA", "innerLabelBackgroundColorHover": "COLOR_ALPHA", "colorHover": "COLOR_ALPHA", "outerLabelBorderSizeChecked": "BORDER_SIZE", "outerLabelBorderColorChecked": "COLOR_ALPHA", "backgroundColorChecked": "COLOR_ALPHA", "innerLabelBorderSizeChecked": "BORDER_SIZE", "innerLabelBorderColorChecked": "COLOR_ALPHA", "innerLabelBackgroundColorChecked": "COLOR_ALPHA", "colorChecked": "COLOR_ALPHA", "outerLabelBoxShadow": "BOX_SHADOW", "outerLabelBorderSize": "BORDER_SIZE", "outerLabelBorderColor": "COLOR_ALPHA", "borderRadius": "BORDER_RADIUS", "backgroundColor": "COLOR_ALPHA", "innerLabelBoxShadow": "BOX_SHADOW", "innerLabelBorderSize": "BORDER_SIZE", "innerLabelBorderColor": "COLOR_ALPHA", "innerLabelBackgroundColor": "COLOR_ALPHA", "color": "COLOR_ALPHA" }, "paramsDefaults": { "outerLabelBorderSizeFocus": "0", "outerLabelBorderColorFocus": "color_23", "backgroundColorFocus": "color_6", "outerLabelBorderSizeDisabled": "0", "outerLabelBorderColorDisabled": "color_20", "backgroundColorDisabled": "color_3", "innerLabelBorderSizeDisabled": "0", "innerLabelBorderColorDisabled": "color_25", "innerLabelBackgroundColorDisabled": "color_15", "colorCheckedDisabled": "color_9", "colorDisabled": "color_8",
        "outerLabelBorderSizeHoverChecked": "0", "outerLabelBorderColorHoverChecked": "color_22", "backgroundColorHoverChecked": "color_1", "innerLabelBorderSizeHoverChecked": "0", "innerLabelBorderColorHoverChecked": "color_27", "innerLabelBackgroundColorHoverChecked": "color_17", "colorHoverChecked": "color_11", "outerLabelBorderSizeHover": "0", "outerLabelBorderColorHover": "color_21", "backgroundColorHover": "color_2", "innerLabelBorderSizeHover": "0", "innerLabelBorderColorHover": "color_26",
        "innerLabelBackgroundColorHover": "color_16", "colorHover": "color_10", "outerLabelBorderSizeChecked": "0", "outerLabelBorderColorChecked": "color_19", "backgroundColorChecked": "color_4", "innerLabelBorderSizeChecked": "0", "innerLabelBorderColorChecked": "color_24", "innerLabelBackgroundColorChecked": "color_14", "colorChecked": "color_7", "outerLabelBoxShadow": "1.5px 1.5px 1px rgba(0,0,0,0.2)", "outerLabelBorderSize": "0", "outerLabelBorderColor": "color_18", "borderRadius": "12px", "backgroundColor": "color_5", "innerLabelBoxShadow": "1.5px 1.5px 1px rgba(0,0,0,0.2)", "innerLabelBorderSize": "0", "innerLabelBorderColor": "color_23", "innerLabelBackgroundColor": "color_13", "color": "color_6" }, "css": { "%_root": "width:100%;height:100%;display:inline-flex;outline:none;position:relative;align-items:center;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);", "%_root > input[type=checkbox]": "width:1px;height:1px;margin:0;opacity:0;position:absolute;", "%_root > input[type=checkbox]:focus,%_root[data-preview~=\"focus\"] > input[type=checkbox][type=checkbox]": "outline:none;",
        "%_root > input[type=checkbox]:checked:focus,%_root[data-preview~=\"checked:focus\"] > input[type=checkbox][type=checkbox]": "outline:none;", "%_root > input[type=checkbox]:checked:focus + %_outerLabel,%_root[data-preview~=\"checked:focus\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "border-width:[outerLabelBorderSizeFocus];border-color:[outerLabelBorderColorFocus];background-color:[backgroundColorFocus];", "%_root > input[type=checkbox]:focus + %_outerLabel,%_root[data-preview~=\"focus\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "border-width:[outerLabelBorderSizeFocus];border-color:[outerLabelBorderColorFocus];background-color:[backgroundColorFocus];", "%_root > input[type=checkbox]:checked:disabled:hover + %_outerLabel,%_root[data-preview~=\"checked:disabled:hover\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "cursor:default;border-width:[outerLabelBorderSizeDisabled];border-color:[outerLabelBorderColorDisabled];background-color:[backgroundColorDisabled];", "%_root > input[type=checkbox]:checked:disabled:hover ~ %_innerLabel,%_root[data-preview~=\"checked:disabled:hover\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel": "cursor:default;border-width:[innerLabelBorderSizeDisabled];border-color:[innerLabelBorderColorDisabled];background-color:[innerLabelBackgroundColorDisabled];", "%_root > input[type=checkbox]:checked:disabled:hover ~ %_innerLabel > %_toggleIcon path,%_root[data-preview~=\"checked:disabled:hover\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel > %_toggleIcon path": "fill:[colorCheckedDisabled];", "%_root > input[type=checkbox]:disabled:hover + %_outerLabel,%_root[data-preview~=\"disabled:hover\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "cursor:default;border-width:[outerLabelBorderSizeDisabled];border-color:[outerLabelBorderColorDisabled];background-color:[backgroundColorDisabled];", "%_root > input[type=checkbox]:disabled:hover ~ %_innerLabel,%_root[data-preview~=\"disabled:hover\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel": "cursor:default;border-width:[innerLabelBorderSizeDisabled];border-color:[innerLabelBorderColorDisabled];background-color:[innerLabelBackgroundColorDisabled];", "%_root > input[type=checkbox]:disabled:hover ~ %_innerLabel > %_toggleIcon path,%_root[data-preview~=\"disabled:hover\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel > %_toggleIcon path": "fill:[colorDisabled];", "%_root > input[type=checkbox]:checked:hover + %_outerLabel,%_root[data-preview~=\"checked:hover\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "border-width:[outerLabelBorderSizeHoverChecked];border-color:[outerLabelBorderColorHoverChecked];background-color:[backgroundColorHoverChecked];", "%_root > input[type=checkbox]:checked:hover ~ %_innerLabel,%_root[data-preview~=\"checked:hover\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel": "border-width:[innerLabelBorderSizeHoverChecked];border-color:[innerLabelBorderColorHoverChecked];background-color:[innerLabelBackgroundColorHoverChecked];", "%_root > input[type=checkbox]:checked:hover ~ %_innerLabel > %_toggleIcon path,%_root[data-preview~=\"checked:hover\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel > %_toggleIcon path": "fill:[colorHoverChecked];", "%_root > input[type=checkbox]:hover + %_outerLabel,%_root[data-preview~=\"hover\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "border-width:[outerLabelBorderSizeHover];border-color:[outerLabelBorderColorHover];background-color:[backgroundColorHover];", "%_root > input[type=checkbox]:hover ~ %_innerLabel,%_root[data-preview~=\"hover\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel": "border-width:[innerLabelBorderSizeHover];border-color:[innerLabelBorderColorHover];background-color:[innerLabelBackgroundColorHover];", "%_root > input[type=checkbox]:hover ~ %_innerLabel > %_toggleIcon path,%_root[data-preview~=\"hover\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel > %_toggleIcon path": "fill:[colorHover];", "%_root > input[type=checkbox]:checked:disabled + %_outerLabel,%_root[data-preview~=\"checked:disabled\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "cursor:default;border-width:[outerLabelBorderSizeDisabled];border-color:[outerLabelBorderColorDisabled];background-color:[backgroundColorDisabled];", "%_root > input[type=checkbox]:checked:disabled ~ %_innerLabel,%_root[data-preview~=\"checked:disabled\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel": "cursor:default;border-width:[innerLabelBorderSizeDisabled];border-color:[innerLabelBorderColorDisabled];background-color:[innerLabelBackgroundColorDisabled];", "%_root > input[type=checkbox]:checked:disabled ~ %_innerLabel > %_toggleIcon path,%_root[data-preview~=\"checked:disabled\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel > %_toggleIcon path": "fill:[colorCheckedDisabled];", "%_root > input[type=checkbox]:disabled + %_outerLabel,%_root[data-preview~=\"disabled\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "cursor:default;border-width:[outerLabelBorderSizeDisabled];border-color:[outerLabelBorderColorDisabled];background-color:[backgroundColorDisabled];", "%_root > input[type=checkbox]:disabled ~ %_innerLabel,%_root[data-preview~=\"disabled\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel": "cursor:default;border-width:[innerLabelBorderSizeDisabled];border-color:[innerLabelBorderColorDisabled];background-color:[innerLabelBackgroundColorDisabled];", "%_root > input[type=checkbox]:disabled ~ %_innerLabel > %_toggleIcon path,%_root[data-preview~=\"disabled\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel > %_toggleIcon path": "fill:[colorDisabled];", "%_root > input[type=checkbox]:checked + %_outerLabel,%_root[data-preview~=\"checked\"] > input[type=checkbox][type=checkbox] + %_outerLabel": "border-width:[outerLabelBorderSizeChecked];border-color:[outerLabelBorderColorChecked];background-color:[backgroundColorChecked];", "%_root > input[type=checkbox]:checked ~ %_innerLabel,%_root[data-preview~=\"checked\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel": "left:23px;border-width:[innerLabelBorderSizeChecked];border-color:[innerLabelBorderColorChecked];background-color:[innerLabelBackgroundColorChecked];", "%_root > input[type=checkbox]:checked ~ %_innerLabel > %_toggleIcon,%_root[data-preview~=\"checked\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel > %_toggleIcon": "transition:all .3s cubic-bezier(0,1,0,1), visibility 0s;", "%_root > input[type=checkbox]:checked ~ %_innerLabel > %_toggleIcon path,%_root[data-preview~=\"checked\"] > input[type=checkbox][type=checkbox] ~ %_innerLabel > %_toggleIcon path": "fill:[colorChecked];", "%_outerLabel": "width:100%;cursor:pointer;height:100%;display:inline-block;box-sizing:border-box;transition:all .3s ease, visibility 0s;[outerLabelBoxShadow];border-width:[outerLabelBorderSize];border-color:[outerLabelBorderColor];border-style:solid;[borderRadius];background-color:[backgroundColor];", "%_innerLabel": "top:50%;left:1px;width:21px;height:22px;cursor:pointer;display:flex;position:absolute;transform:translate(0, -50%);transition:all .3s ease, visibility 0s;text-align:center;[innerLabelBoxShadow];box-sizing:border-box;align-items:center;border-width:[innerLabelBorderSize];border-color:[innerLabelBorderColor];border-style:solid;[borderRadius];justify-content:center;background-color:[innerLabelBackgroundColor];", "%_toggleIcon": "width:50%;height:50%;display:none;transition:all .3s cubic-bezier(1,0,1,0), visibility 0s;", "%_toggleIcon path": "fill:[color];" } } }, "classes": ["root", "outerLabel", "innerLabel", "toggleIcon"] };

/***/ }),

/***/ 60:
/*!************************************************************!*\
  !*** ../node_modules/hoist-non-react-methods/lib/index.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = hoistNonReactMethods;
var REACT_PROTOTYPE = {
  autobind: true,
  childContextTypes: true,
  componentDidMount: true,
  componentDidUpdate: true,
  componentWillMount: true,
  componentWillReceiveProps: true,
  componentWillUnmount: true,
  componentWillUpdate: true,
  contextTypes: true,
  displayName: true,
  forceUpdate: true,
  getChildContext: true,
  getDefaultProps: true,
  getDOMNode: true,
  getInitialState: true,
  isMounted: true,
  mixins: true,
  propTypes: true,
  render: true,
  replaceProps: true,
  replaceState: true,
  setProps: true,
  setState: true,
  shouldComponentUpdate: true,
  statics: true,
  updateComponent: true
};

var REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  mixins: true,
  propTypes: true,
  type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  arguments: true,
  arity: true
};

var defaultConfig = {
  delegateTo: function delegateTo(w) {
    return w.refs.child;
  },
  hoistStatics: true
};

function hoistNonReactMethods(targetComponent, sourceComponent, config) {
  var targetComponentName = targetComponent.displayName || targetComponent.name || 'Wrapper';
  var sourceComponentName = sourceComponent.displayName || sourceComponent.name || 'WrappedComponent';
  var hoistStatics = config && typeof config.hoistStatics !== 'undefined' ? config.hoistStatics : defaultConfig.hoistStatics;
  var delegateTo = config && typeof config.delegateTo !== 'undefined' ? config.delegateTo : defaultConfig.delegateTo;
  // backwards compatible where config option is delegateTo function
  if (typeof config === 'function') delegateTo = config;

  if (hoistStatics) {
    var statics = Object.getOwnPropertyNames(sourceComponent).filter(function (k) {
      return !REACT_STATICS[k] && !KNOWN_STATICS[k];
    });

    statics.forEach(function (methodName) {
      if (targetComponent[methodName]) console.warn('Static method ' + methodName + ' already exists in wrapper component ' + targetComponentName + ', and won\'t be hoisted. Consider changing the name on ' + sourceComponentName + '.');
      targetComponent[methodName] = sourceComponent[methodName];
    });
  }

  var methods = Object.getOwnPropertyNames(sourceComponent.prototype).filter(function (k) {
    return !REACT_PROTOTYPE[k];
  });

  methods.forEach(function (methodName) {
    if (targetComponent.prototype[methodName]) {
      console.warn('Method ' + methodName + ' already exists in wrapper component ' + targetComponentName + ', and won\'t be hoisted. Consider changing the name on ' + sourceComponentName + '.');
      return;
    }

    targetComponent.prototype[methodName] = function () {
      var _sourceComponent$prot;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_sourceComponent$prot = sourceComponent.prototype[methodName]).call.apply(_sourceComponent$prot, [delegateTo.call(this, this)].concat(args));
    };
  });

  return targetComponent;
}
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

/***/ })

}]);
//# sourceMappingURL=wixui.ToggleSwitch.chunk.js.map