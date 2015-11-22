/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*
* bootstrap-table - v1.8.1 - 2015-05-29
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2015 zhixin wen
* Licensed MIT License
*/
!function(a){"use strict";var b=37,c=null,d="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==",e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7XQMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC",f="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII= ",g=function(a){var b=arguments,c=!0,d=1;return a=a.replace(/%s/g,function(){var a=b[d++];return"undefined"==typeof a?(c=!1,""):a}),c?a:""},h=function(b,c,d,e){var f="";return a.each(b,function(a,b){return b[c]===e?(f=b[d],!1):!0}),f},i=function(b,c){var d=-1;return a.each(b,function(a,b){return b.field===c?(d=a,!1):!0}),d},j=function(){if(null===c){var b,d,e=a("<p/>").addClass("fixed-table-scroll-inner"),f=a("<div/>").addClass("fixed-table-scroll-outer");f.append(e),a("body").append(f),b=e[0].offsetWidth,f.css("overflow","scroll"),d=e[0].offsetWidth,b===d&&(d=f[0].clientWidth),f.remove(),c=b-d}return c},k=function(b,c,d,e){var f=c;if("string"==typeof c){var h=c.split(".");h.length>1?(f=window,a.each(h,function(a,b){f=f[b]})):f=window[c]}return"object"==typeof f?f:"function"==typeof f?f.apply(b,d):!f&&"string"==typeof c&&g.apply(this,[c].concat(d))?g.apply(this,[c].concat(d)):e},l=function(a){return"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):a},m=function(b){var c=0;return b.children().each(function(){c<a(this).outerHeight(!0)&&(c=a(this).outerHeight(!0))}),c},n=function(a){for(var b in a){var c=b.split(/(?=[A-Z])/).join("-").toLowerCase();c!==b&&(a[c]=a[b],delete a[b])}return a},o=function(b,c){this.options=c,this.$el=a(b),this.$el_=this.$el.clone(),this.timeoutId_=0,this.timeoutFooter_=0,this.init()};o.DEFAULTS={classes:"table table-hover",height:void 0,undefinedText:"-",sortName:void 0,sortOrder:"asc",striped:!1,columns:[],data:[],method:"get",url:void 0,ajax:void 0,cache:!0,contentType:"application/json",dataType:"json",ajaxOptions:{},queryParams:function(a){return a},queryParamsType:"limit",responseHandler:function(a){return a},pagination:!1,sidePagination:"client",totalRows:0,pageNumber:1,pageSize:10,pageList:[10,25,50,100],paginationHAlign:"right",paginationVAlign:"bottom",paginationDetailHAlign:"left",paginationFirstText:"&laquo;",paginationPreText:"&lsaquo;",paginationNextText:"&rsaquo;",paginationLastText:"&raquo;",search:!1,searchAlign:"right",selectItemName:"btSelectItem",showHeader:!0,showFooter:!1,showColumns:!1,showPaginationSwitch:!1,showRefresh:!1,showToggle:!1,buttonsAlign:"right",smartDisplay:!0,minimumCountColumns:1,idField:void 0,uniqueId:void 0,cardView:!1,detailView:!1,detailFormatter:function(){return""},trimOnSearch:!0,clickToSelect:!1,singleSelect:!1,toolbar:void 0,toolbarAlign:"left",checkboxHeader:!0,sortable:!0,maintainSelected:!1,searchTimeOut:500,searchText:"",iconSize:void 0,iconsPrefix:"glyphicon",icons:{paginationSwitchDown:"glyphicon-collapse-down icon-chevron-down",paginationSwitchUp:"glyphicon-collapse-up icon-chevron-up",refresh:"glyphicon-refresh icon-refresh",toggle:"glyphicon-list-alt icon-list-alt",columns:"glyphicon-th icon-th"},rowStyle:function(){return{}},rowAttributes:function(){return{}},onAll:function(){return!1},onClickCell:function(){return!1},onDblClickCell:function(){return!1},onClickRow:function(){return!1},onDblClickRow:function(){return!1},onSort:function(){return!1},onCheck:function(){return!1},onUncheck:function(){return!1},onCheckAll:function(){return!1},onUncheckAll:function(){return!1},onCheckSome:function(){return!1},onUncheckSome:function(){return!1},onLoadSuccess:function(){return!1},onLoadError:function(){return!1},onColumnSwitch:function(){return!1},onPageChange:function(){return!1},onSearch:function(){return!1},onToggle:function(){return!1},onPreBody:function(){return!1},onPostBody:function(){return!1},onPostHeader:function(){return!1},onExpandRow:function(){return!1},onCollapseRow:function(){return!1}},o.LOCALES=[],o.LOCALES["en-US"]={formatLoadingMessage:function(){return"Loading, please wait..."},formatRecordsPerPage:function(a){return g("%s records per page",a)},formatShowingRows:function(a,b,c){return g("Showing %s to %s of %s rows",a,b,c)},formatSearch:function(){return"Search"},formatNoMatches:function(){return"No matching records found"},formatPaginationSwitch:function(){return"Hide/Show pagination"},formatRefresh:function(){return"Refresh"},formatToggle:function(){return"Toggle"},formatColumns:function(){return"Columns"},formatAllRows:function(){return"All"}},a.extend(o.DEFAULTS,o.LOCALES["en-US"]),o.COLUMN_DEFAULTS={radio:!1,checkbox:!1,checkboxEnabled:!0,field:void 0,title:void 0,"class":void 0,align:void 0,halign:void 0,falign:void 0,valign:void 0,width:void 0,sortable:!1,order:"asc",visible:!0,switchable:!0,clickToSelect:!0,formatter:void 0,footerFormatter:void 0,events:void 0,sorter:void 0,sortName:void 0,cellStyle:void 0,searchable:!0,cardVisible:!0},o.EVENTS={"all.bs.table":"onAll","click-cell.bs.table":"onClickCell","dbl-click-cell.bs.table":"onDblClickCell","click-row.bs.table":"onClickRow","dbl-click-row.bs.table":"onDblClickRow","sort.bs.table":"onSort","check.bs.table":"onCheck","uncheck.bs.table":"onUncheck","check-all.bs.table":"onCheckAll","uncheck-all.bs.table":"onUncheckAll","check-some.bs.table":"onCheckSome","uncheck-some.bs.table":"onUncheckSome","load-success.bs.table":"onLoadSuccess","load-error.bs.table":"onLoadError","column-switch.bs.table":"onColumnSwitch","page-change.bs.table":"onPageChange","search.bs.table":"onSearch","toggle.bs.table":"onToggle","pre-body.bs.table":"onPreBody","post-body.bs.table":"onPostBody","post-header.bs.table":"onPostHeader","expand-row.bs.table":"onExpandRow","collapse-row.bs.table":"onCollapseRow"},o.prototype.init=function(){this.initContainer(),this.initTable(),this.initHeader(),this.initData(),this.initFooter(),this.initToolbar(),this.initPagination(),this.initBody(),this.initServer()},o.prototype.initContainer=function(){this.$container=a(['<div class="bootstrap-table">','<div class="fixed-table-toolbar"></div>',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination" style="clear: both;"></div>':"",'<div class="fixed-table-container">','<div class="fixed-table-header"><table></table></div>','<div class="fixed-table-body">','<div class="fixed-table-loading">',this.options.formatLoadingMessage(),"</div>","</div>",'<div class="fixed-table-footer"><table><tr></tr></table></div>',"bottom"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination"></div>':"","</div>","</div>"].join("")),this.$container.insertAfter(this.$el),this.$tableContainer=this.$container.find(".fixed-table-container"),this.$tableHeader=this.$container.find(".fixed-table-header"),this.$tableBody=this.$container.find(".fixed-table-body"),this.$tableLoading=this.$container.find(".fixed-table-loading"),this.$tableFooter=this.$container.find(".fixed-table-footer"),this.$toolbar=this.$container.find(".fixed-table-toolbar"),this.$pagination=this.$container.find(".fixed-table-pagination"),this.$tableBody.append(this.$el),this.$container.after('<div class="clearfix"></div>'),this.$el.addClass(this.options.classes),this.options.striped&&this.$el.addClass("table-striped"),-1!==a.inArray("table-no-bordered",this.options.classes.split(" "))&&this.$tableContainer.addClass("table-no-bordered")},o.prototype.initTable=function(){var b=this,c=[],d=[];this.$header=this.$el.find("thead"),this.$header.length||(this.$header=a("<thead></thead>").appendTo(this.$el)),this.$header.find("tr").length||this.$header.append("<tr></tr>"),this.$header.find("th").each(function(){var b=a.extend({},{title:a(this).html(),"class":a(this).attr("class")},a(this).data());c.push(b)}),this.options.columns=a.extend(!0,[],c,this.options.columns),a.each(this.options.columns,function(c,d){b.options.columns[c]=a.extend({},o.COLUMN_DEFAULTS,{field:c},d)}),this.options.data.length||(this.$el.find("tbody tr").each(function(){var c={};c._id=a(this).attr("id"),c._class=a(this).attr("class"),c._data=n(a(this).data()),a(this).find("td").each(function(d){var e=b.options.columns[d].field;c[e]=a(this).html(),c["_"+e+"_id"]=a(this).attr("id"),c["_"+e+"_class"]=a(this).attr("class"),c["_"+e+"_rowspan"]=a(this).attr("rowspan"),c["_"+e+"_data"]=n(a(this).data())}),d.push(c)}),this.options.data=d)},o.prototype.initHeader=function(){var c=this,d=[],e=[];this.header={fields:[],styles:[],classes:[],formatters:[],events:[],sorters:[],sortNames:[],cellStyles:[],clickToSelects:[],searchables:[]},!this.options.cardView&&this.options.detailView&&(e.push('<th class="detail"><div class="fht-cell"></div></th>'),d.push({})),a.each(this.options.columns,function(a,b){var f="",h="",i="",j="",k=g(' class="%s"',b["class"]),l=(c.options.sortOrder||b.order,"px"),m=b.width;return b.visible?void((!c.options.cardView||b.cardVisible)&&(void 0===b.width||c.options.cardView||"string"==typeof b.width&&-1!==b.width.indexOf("%")&&(l="%"),b.width&&"string"==typeof b.width&&(m=b.width.replace("%","").replace("px","")),h=g("text-align: %s; ",b.halign?b.halign:b.align),i=g("text-align: %s; ",b.align),j=g("vertical-align: %s; ",b.valign),j+=g("width: %s%s; ",b.checkbox||b.radio?36:m,l),d.push(b),c.header.fields.push(b.field),c.header.styles.push(i+j),c.header.classes.push(k),c.header.formatters.push(b.formatter),c.header.events.push(b.events),c.header.sorters.push(b.sorter),c.header.sortNames.push(b.sortName),c.header.cellStyles.push(b.cellStyle),c.header.clickToSelects.push(b.clickToSelect),c.header.searchables.push(b.searchable),e.push("<th",b.checkbox||b.radio?g(' class="bs-checkbox %s"',b["class"]||""):k,g(' style="%s"',h+j),">"),e.push(g('<div class="th-inner %s">',c.options.sortable&&b.sortable?"sortable":"")),f=b.title,b.checkbox&&(!c.options.singleSelect&&c.options.checkboxHeader&&(f='<input name="btSelectAll" type="checkbox" />'),c.header.stateField=b.field),b.radio&&(f="",c.header.stateField=b.field,c.options.singleSelect=!0),e.push(f),e.push("</div>"),e.push('<div class="fht-cell"></div>'),e.push("</div>"),e.push("</th>"))):void(b.field===c.options.sortName&&c.header.fields.push(b.field))}),this.$header.find("tr").html(e.join("")),this.$header.find("th").each(function(b){a(this).data(d[b])}),this.$container.off("click",".th-inner").on("click",".th-inner",function(b){c.options.sortable&&a(this).parent().data().sortable&&c.onSort(b)}),!this.options.showHeader||this.options.cardView?(this.$header.hide(),this.$tableHeader.hide(),this.$tableLoading.css("top",0)):(this.$header.show(),this.$tableHeader.show(),this.$tableLoading.css("top",b+"px"),this.getCaretHtml()),this.$selectAll=this.$header.find('[name="btSelectAll"]'),this.$container.off("click",'[name="btSelectAll"]').on("click",'[name="btSelectAll"]',function(){var b=a(this).prop("checked");c[b?"checkAll":"uncheckAll"]()})},o.prototype.initFooter=function(){!this.options.showFooter||this.options.cardView?this.$tableFooter.hide():this.$tableFooter.show()},o.prototype.initData=function(a,b){this.data="append"===b?this.data.concat(a):"prepend"===b?[].concat(a).concat(this.data):a||this.options.data,this.options.data="append"===b?this.options.data.concat(a):"prepend"===b?[].concat(a).concat(this.options.data):this.data,"server"!==this.options.sidePagination&&this.initSort()},o.prototype.initSort=function(){var b=this,c=this.options.sortName,d="desc"===this.options.sortOrder?-1:1,e=a.inArray(this.options.sortName,this.header.fields);-1!==e&&this.data.sort(function(f,g){b.header.sortNames[e]&&(c=b.header.sortNames[e]);var h=f[c],i=g[c],j=k(b.header,b.header.sorters[e],[h,i]);return void 0!==j?d*j:((void 0===h||null===h)&&(h=""),(void 0===i||null===i)&&(i=""),a.isNumeric(h)&&a.isNumeric(i)?(h=parseFloat(h),i=parseFloat(i),i>h?-1*d:d):h===i?0:("string"!=typeof h&&(h=h.toString()),-1===h.localeCompare(i)?-1*d:d))})},o.prototype.onSort=function(b){var c=a(b.currentTarget).parent(),d=this.$header.find("th").eq(c.index());return this.$header.add(this.$header_).find("span.order").remove(),this.options.sortName===c.data("field")?this.options.sortOrder="asc"===this.options.sortOrder?"desc":"asc":(this.options.sortName=c.data("field"),this.options.sortOrder="asc"===c.data("order")?"desc":"asc"),this.trigger("sort",this.options.sortName,this.options.sortOrder),c.add(d).data("order",this.options.sortOrder),this.getCaretHtml(),"server"===this.options.sidePagination?void this.initServer():(this.initSort(),void this.initBody())},o.prototype.initToolbar=function(){var b,c,d=this,e=[],f=0,h=0;this.$toolbar.html(""),"string"==typeof this.options.toolbar&&a(g('<div class="bars pull-%s"></div>',this.options.toolbarAlign)).appendTo(this.$toolbar).append(a(this.options.toolbar)),e=[g('<div class="columns columns-%s btn-group pull-%s">',this.options.buttonsAlign,this.options.buttonsAlign)],"string"==typeof this.options.icons&&(this.options.icons=k(null,this.options.icons)),this.options.showPaginationSwitch&&e.push(g('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">',this.options.formatPaginationSwitch()),g('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.paginationSwitchDown),"</button>"),this.options.showRefresh&&e.push(g('<button class="btn btn-default'+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+'" type="button" name="refresh" title="%s">',this.options.formatRefresh()),g('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.refresh),"</button>"),this.options.showToggle&&e.push(g('<button class="btn btn-default'+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+'" type="button" name="toggle" title="%s">',this.options.formatToggle()),g('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.toggle),"</button>"),this.options.showColumns&&(e.push(g('<div class="keep-open btn-group" title="%s">',this.options.formatColumns()),'<button type="button" class="btn btn-default'+(void 0==this.options.iconSize?"":" btn-"+this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">',g('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.columns),' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'),a.each(this.options.columns,function(a,b){if(!(b.radio||b.checkbox||d.options.cardView&&!b.cardVisible)){var c=b.visible?' checked="checked"':"";b.switchable&&(e.push(g('<li><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>',b.field,a,c,b.title)),h++)}}),e.push("</ul>","</div>")),e.push("</div>"),(this.showToolbar||e.length>2)&&this.$toolbar.append(e.join("")),this.options.showPaginationSwitch&&this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click",a.proxy(this.togglePagination,this)),this.options.showRefresh&&this.$toolbar.find('button[name="refresh"]').off("click").on("click",a.proxy(this.refresh,this)),this.options.showToggle&&this.$toolbar.find('button[name="toggle"]').off("click").on("click",function(){d.toggleView()}),this.options.showColumns&&(b=this.$toolbar.find(".keep-open"),h<=this.options.minimumCountColumns&&b.find("input").prop("disabled",!0),b.find("li").off("click").on("click",function(a){a.stopImmediatePropagation()}),b.find("input").off("click").on("click",function(){var b=a(this);d.toggleColumn(i(d.options.columns,a(this).data("field")),b.prop("checked"),!1),d.trigger("column-switch",a(this).data("field"),b.prop("checked"))})),this.options.search&&(e=[],e.push('<div class="pull-'+this.options.searchAlign+' search">',g('<input class="form-control'+(void 0===this.options.iconSize?"":" input-"+this.options.iconSize)+'" type="text" placeholder="%s">',this.options.formatSearch()),"</div>"),this.$toolbar.append(e.join("")),c=this.$toolbar.find(".search input"),c.off("keyup drop").on("keyup drop",function(a){clearTimeout(f),f=setTimeout(function(){d.onSearch(a)},d.options.searchTimeOut)}),""!==this.options.searchText&&(c.val(this.options.searchText),clearTimeout(f),f=setTimeout(function(){c.trigger("keyup")},d.options.searchTimeOut)))},o.prototype.onSearch=function(b){var c=a.trim(a(b.currentTarget).val());this.options.trimOnSearch&&a(b.currentTarget).val()!==c&&a(b.currentTarget).val(c),c!==this.searchText&&(this.searchText=c,this.options.pageNumber=1,this.initSearch(),this.updatePagination(),this.trigger("search",c))},o.prototype.initSearch=function(){var b=this;if("server"!==this.options.sidePagination){var c=this.searchText&&this.searchText.toLowerCase(),d=a.isEmptyObject(this.filterColumns)?null:this.filterColumns;this.data=d?a.grep(this.options.data,function(a){for(var b in d)if(a[b]!==d[b])return!1;return!0}):this.options.data,this.data=c?a.grep(this.data,function(d,e){for(var f in d){f=a.isNumeric(f)?parseInt(f,10):f;var g=d[f],h=b.options.columns[i(b.options.columns,f)],j=a.inArray(f,b.header.fields);g=k(h,b.header.formatters[j],[g,d,e],g);var l=a.inArray(f,b.header.fields);if(-1!==l&&b.header.searchables[l]&&("string"==typeof g||"number"==typeof g)&&-1!==(g+"").toLowerCase().indexOf(c))return!0}return!1}):this.data}},o.prototype.initPagination=function(){if(!this.options.pagination)return void this.$pagination.hide();this.$pagination.show();var b,c,d,e,f,h,i,j,k,l=this,m=[],n=!1,o=this.getData();if("server"!==this.options.sidePagination&&(this.options.totalRows=o.length),this.totalPages=0,this.options.totalRows){if(this.options.pageSize===this.options.formatAllRows())this.options.pageSize=this.options.totalRows,n=!0;else if(this.options.pageSize===this.options.totalRows){var p="string"==typeof this.options.pageList?this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").toLowerCase().split(","):this.options.pageList;p.indexOf(this.options.formatAllRows().toLowerCase())>-1&&(n=!0)}this.totalPages=~~((this.options.totalRows-1)/this.options.pageSize)+1,this.options.totalPages=this.totalPages}this.totalPages>0&&this.options.pageNumber>this.totalPages&&(this.options.pageNumber=this.totalPages),this.pageFrom=(this.options.pageNumber-1)*this.options.pageSize+1,this.pageTo=this.options.pageNumber*this.options.pageSize,this.pageTo>this.options.totalRows&&(this.pageTo=this.options.totalRows),m.push('<div class="pull-'+this.options.paginationDetailHAlign+' pagination-detail">','<span class="pagination-info">',this.options.formatShowingRows(this.pageFrom,this.pageTo,this.options.totalRows),"</span>"),m.push('<span class="page-list">');var q=[g('<span class="btn-group %s">',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?"dropdown":"dropup"),'<button type="button" class="btn btn-default '+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">','<span class="page-size">',n?this.options.formatAllRows():this.options.pageSize,"</span>",' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'],r=this.options.pageList;if("string"==typeof this.options.pageList){var s=this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").split(",");r=[],a.each(s,function(a,b){r.push(b.toUpperCase()===l.options.formatAllRows().toUpperCase()?l.options.formatAllRows():+b)})}for(a.each(r,function(a,b){if(!l.options.smartDisplay||0===a||r[a-1]<=l.options.totalRows){var c;c=n?b===l.options.formatAllRows()?' class="active"':"":b===l.options.pageSize?' class="active"':"",q.push(g('<li%s><a href="javascript:void(0)">%s</a></li>',c,b))}}),q.push("</ul></span>"),m.push(this.options.formatRecordsPerPage(q.join(""))),m.push("</span>"),m.push("</div>",'<div class="pull-'+this.options.paginationHAlign+' pagination">','<ul class="pagination'+(void 0===this.options.iconSize?"":" pagination-"+this.options.iconSize)+'">','<li class="page-first"><a href="javascript:void(0)">'+this.options.paginationFirstText+"</a></li>",'<li class="page-pre"><a href="javascript:void(0)">'+this.options.paginationPreText+"</a></li>"),this.totalPages<5?(c=1,d=this.totalPages):(c=this.options.pageNumber-2,d=c+4,1>c&&(c=1,d=5),d>this.totalPages&&(d=this.totalPages,c=d-4)),b=c;d>=b;b++)m.push('<li class="page-number'+(b===this.options.pageNumber?" active":"")+'">','<a href="javascript:void(0)">',b,"</a>","</li>");m.push('<li class="page-next"><a href="javascript:void(0)">'+this.options.paginationNextText+"</a></li>",'<li class="page-last"><a href="javascript:void(0)">'+this.options.paginationLastText+"</a></li>","</ul>","</div>"),this.$pagination.html(m.join("")),e=this.$pagination.find(".page-list a"),f=this.$pagination.find(".page-first"),h=this.$pagination.find(".page-pre"),i=this.$pagination.find(".page-next"),j=this.$pagination.find(".page-last"),k=this.$pagination.find(".page-number"),this.options.pageNumber<=1&&(f.addClass("disabled"),h.addClass("disabled")),this.options.pageNumber>=this.totalPages&&(i.addClass("disabled"),j.addClass("disabled")),this.options.smartDisplay&&(this.totalPages<=1&&this.$pagination.find("div.pagination").hide(),(r.length<2||this.options.totalRows<=r[0])&&this.$pagination.find("span.page-list").hide(),this.$pagination[this.getData().length?"show":"hide"]()),n&&(this.options.pageSize=this.options.formatAllRows()),e.off("click").on("click",a.proxy(this.onPageListChange,this)),f.off("click").on("click",a.proxy(this.onPageFirst,this)),h.off("click").on("click",a.proxy(this.onPagePre,this)),i.off("click").on("click",a.proxy(this.onPageNext,this)),j.off("click").on("click",a.proxy(this.onPageLast,this)),k.off("click").on("click",a.proxy(this.onPageNumber,this))},o.prototype.updatePagination=function(b){b&&a(b.currentTarget).hasClass("disabled")||(this.options.maintainSelected||this.resetRows(),this.initPagination(),"server"===this.options.sidePagination?this.initServer():this.initBody(),this.trigger("page-change",this.options.pageNumber,this.options.pageSize))},o.prototype.onPageListChange=function(b){var c=a(b.currentTarget);c.parent().addClass("active").siblings().removeClass("active"),this.options.pageSize=c.text().toUpperCase()===this.options.formatAllRows().toUpperCase()?this.options.formatAllRows():+c.text(),this.$toolbar.find(".page-size").text(this.options.pageSize),this.updatePagination(b)},o.prototype.onPageFirst=function(a){this.options.pageNumber=1,this.updatePagination(a)},o.prototype.onPagePre=function(a){this.options.pageNumber--,this.updatePagination(a)},o.prototype.onPageNext=function(a){this.options.pageNumber++,this.updatePagination(a)},o.prototype.onPageLast=function(a){this.options.pageNumber=this.totalPages,this.updatePagination(a)},o.prototype.onPageNumber=function(b){this.options.pageNumber!==+a(b.currentTarget).text()&&(this.options.pageNumber=+a(b.currentTarget).text(),this.updatePagination(b))},o.prototype.initBody=function(b){var c=this,d=[],e=this.getData();this.trigger("pre-body",e),this.$body=this.$el.find("tbody"),this.$body.length||(this.$body=a("<tbody></tbody>").appendTo(this.$el)),this.options.pagination&&"server"!==this.options.sidePagination||(this.pageFrom=1,this.pageTo=e.length);for(var f=this.pageFrom-1;f<this.pageTo;f++){var j,m=e[f],n={},o=[],p="",q={},r=[];if(n=k(this.options,this.options.rowStyle,[m,f],n),n&&n.css)for(j in n.css)o.push(j+": "+n.css[j]);if(q=k(this.options,this.options.rowAttributes,[m,f],q))for(j in q)r.push(g('%s="%s"',j,l(q[j])));m._data&&!a.isEmptyObject(m._data)&&a.each(m._data,function(a,b){"index"!==a&&(p+=g(' data-%s="%s"',a,b))}),d.push("<tr",g(" %s",r.join(" ")),g(' id="%s"',a.isArray(m)?void 0:m._id),g(' class="%s"',n.classes||(a.isArray(m)?void 0:m._class)),g(' data-index="%s"',f),g(' data-uniqueid="%s"',m[this.options.uniqueId]),g("%s",p),">"),this.options.cardView&&d.push(g('<td colspan="%s">',this.header.fields.length)),!this.options.cardView&&this.options.detailView&&d.push("<td>",'<a class="detail-icon" href="javascript:">','<i class="glyphicon glyphicon-plus icon-plus"></i>',"</a>","</td>"),a.each(this.header.fields,function(b,e){var j="",l=m[e],p="",q={},r="",s=c.header.classes[b],t="",u="",v=c.options.columns[i(c.options.columns,e)];if(n=g('style="%s"',o.concat(c.header.styles[b]).join("; ")),l=k(v,c.header.formatters[b],[l,m,f],l),m["_"+e+"_id"]&&(r=g(' id="%s"',m["_"+e+"_id"])),m["_"+e+"_class"]&&(s=g(' class="%s"',m["_"+e+"_class"])),m["_"+e+"_rowspan"]&&(u=g(' rowspan="%s"',m["_"+e+"_rowspan"])),q=k(c.header,c.header.cellStyles[b],[l,m,f],q),q.classes&&(s=g(' class="%s"',q.classes)),q.css){var w=[];for(var x in q.css)w.push(x+": "+q.css[x]);n=g('style="%s"',w.concat(c.header.styles[b]).join("; "))}m["_"+e+"_data"]&&!a.isEmptyObject(m["_"+e+"_data"])&&a.each(m["_"+e+"_data"],function(a,b){"index"!==a&&(t+=g(' data-%s="%s"',a,b))}),v.checkbox||v.radio?(p=v.checkbox?"checkbox":p,p=v.radio?"radio":p,j=[c.options.cardView?'<div class="card-view">':'<td class="bs-checkbox">',"<input"+g(' data-index="%s"',f)+g(' name="%s"',c.options.selectItemName)+g(' type="%s"',p)+g(' value="%s"',m[c.options.idField])+g(' checked="%s"',l===!0||l&&l.checked?"checked":void 0)+g(' disabled="%s"',!v.checkboxEnabled||l&&l.disabled?"disabled":void 0)+" />",c.options.cardView?"</div>":"</td>"].join(""),m[c.header.stateField]=l===!0||l&&l.checked):(l="undefined"==typeof l||null===l?c.options.undefinedText:l,j=c.options.cardView?['<div class="card-view">',c.options.showHeader?g('<span class="title" %s>%s</span>',n,h(c.options.columns,"field","title",e)):"",g('<span class="value">%s</span>',l),"</div>"].join(""):[g("<td%s %s %s %s %s>",r,s,n,t,u),l,"</td>"].join(""),c.options.cardView&&c.options.smartDisplay&&""===l&&(j="")),d.push(j)}),this.options.cardView&&d.push("</td>"),d.push("</tr>")}d.length||d.push('<tr class="no-records-found">',g('<td colspan="%s">%s</td>',this.$header.find("th").length,this.options.formatNoMatches()),"</tr>"),this.$body.html(d.join("")),b||this.scrollTo(0),this.$body.find("> tr > td").off("click").on("click",function(){var b=a(this),d=b.parent(),e=c.data[d.data("index")],f=b[0].cellIndex,h=c.$header.find("th:eq("+f+")"),i=h.data("field"),j=e[i];c.trigger("click-cell",i,j,e,b),c.trigger("click-row",e,d),c.options.clickToSelect&&c.header.clickToSelects[d.children().index(a(this))]&&d.find(g('[name="%s"]',c.options.selectItemName))[0].click()}),this.$body.find("> tr > td").off("dblclick").on("dblclick",function(){var b=a(this),d=b.parent(),e=c.data[d.data("index")],f=b[0].cellIndex,g=c.$header.find("th:eq("+f+")"),h=g.data("field"),i=e[h];c.trigger("dbl-click-cell",h,i,e,b),c.trigger("dbl-click-row",e,d)}),this.$body.find("> tr > td > .detail-icon").off("click").on("click",function(){var b=a(this),d=b.parent().parent(),e=d.data("index"),f=c.options.data[e];d.next().is("tr.detail-view")?(b.find("i").attr("class","glyphicon glyphicon-plus icon-plus"),d.next().remove(),c.trigger("collapse-row",e,f)):(b.find("i").attr("class","glyphicon glyphicon-minus icon-minus"),d.after(g('<tr class="detail-view"><td colspan="%s">%s</td></tr>',d.find("td").length,k(c.options,c.options.detailFormatter,[e,f],""))),c.trigger("expand-row",e,f,d.next().find("td"))),c.resetView()}),this.$selectItem=this.$body.find(g('[name="%s"]',this.options.selectItemName)),this.$selectItem.off("click").on("click",function(b){b.stopImmediatePropagation();var d=a(this).prop("checked"),e=c.data[a(this).data("index")];e[c.header.stateField]=d,c.options.singleSelect&&(c.$selectItem.not(this).each(function(){c.data[a(this).data("index")][c.header.stateField]=!1}),c.$selectItem.filter(":checked").not(this).prop("checked",!1)),c.updateSelected(),c.trigger(d?"check":"uncheck",e)}),a.each(this.header.events,function(b,d){if(d){"string"==typeof d&&(d=k(null,d)),!c.options.cardView&&c.options.detailView&&(b+=1);for(var e in d)c.$body.find("tr").each(function(){var f=a(this),g=f.find(c.options.cardView?".card-view":"td").eq(b),h=e.indexOf(" "),i=e.substring(0,h),j=e.substring(h+1),k=d[e];g.find(j).off(i).on(i,function(a){var d=f.data("index"),e=c.data[d],g=e[c.header.fields[b]];k.apply(this,[a,g,e,d])})})}}),this.updateSelected(),this.resetView(),this.trigger("post-body")},o.prototype.initServer=function(b,c){var d,e=this,f={},g={pageSize:this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize,pageNumber:this.options.pageNumber,searchText:this.searchText,sortName:this.options.sortName,sortOrder:this.options.sortOrder};(this.options.url||this.options.ajax)&&("limit"===this.options.queryParamsType&&(g={search:g.searchText,sort:g.sortName,order:g.sortOrder},this.options.pagination&&(g.limit=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize,g.offset=this.options.pageSize===this.options.formatAllRows()?0:this.options.pageSize*(this.options.pageNumber-1))),a.isEmptyObject(this.filterColumnsPartial)||(g.filter=JSON.stringify(this.filterColumnsPartial,null)),f=k(this.options,this.options.queryParams,[g],f),a.extend(f,c||{}),f!==!1&&(b||this.$tableLoading.show(),d=a.extend({},k(null,this.options.ajaxOptions),{type:this.options.method,url:this.options.url,data:"application/json"===this.options.contentType&&"post"===this.options.method?JSON.stringify(f):f,cache:this.options.cache,contentType:this.options.contentType,dataType:this.options.dataType,success:function(a){a=k(e.options,e.options.responseHandler,[a],a),e.load(a),e.trigger("load-success",a)},error:function(a){e.trigger("load-error",a.status)},complete:function(){b||e.$tableLoading.hide()}}),this.options.ajax?k(this,this.options.ajax,[d],null):a.ajax(d)))},o.prototype.getCaretHtml=function(){var b=this;a.each(this.$header.find("th"),function(c,g){a(g).data("field")===b.options.sortName?a(g).find(".sortable").css("background-image","url("+("desc"===b.options.sortOrder?f:d)+")"):a(g).find(".sortable").css("background-image","url("+e+")")})},o.prototype.updateSelected=function(){var b=this.$selectItem.filter(":enabled").length===this.$selectItem.filter(":enabled").filter(":checked").length;this.$selectAll.add(this.$selectAll_).prop("checked",b),this.$selectItem.each(function(){a(this).parents("tr")[a(this).prop("checked")?"addClass":"removeClass"]("selected")})},o.prototype.updateRows=function(){var b=this;this.$selectItem.each(function(){b.data[a(this).data("index")][b.header.stateField]=a(this).prop("checked")})},o.prototype.resetRows=function(){var b=this;a.each(this.data,function(a,c){b.$selectAll.prop("checked",!1),b.$selectItem.prop("checked",!1),c[b.header.stateField]=!1})},o.prototype.trigger=function(b){var c=Array.prototype.slice.call(arguments,1);b+=".bs.table",this.options[o.EVENTS[b]].apply(this.options,c),this.$el.trigger(a.Event(b),c),this.options.onAll(b,c),this.$el.trigger(a.Event("all.bs.table"),[b,c])},o.prototype.resetHeader=function(){clearTimeout(this.timeoutId_),this.timeoutId_=setTimeout(a.proxy(this.fitHeader,this),this.$el.is(":hidden")?100:0)},o.prototype.fitHeader=function(){var b,c,d=this;return d.$el.is(":hidden")?void(d.timeoutFooter_=setTimeout(a.proxy(d.fitHeader,d),100)):(b=this.$tableBody.get(0),c=b.scrollWidth>b.clientWidth&&b.scrollHeight>b.clientHeight+this.$header.height()?j():0,this.$el.css("margin-top",-this.$header.height()),this.$header_=this.$header.clone(!0,!0),this.$selectAll_=this.$header_.find('[name="btSelectAll"]'),this.$tableHeader.css({"margin-right":c}).find("table").css("width",this.$el.css("width")).html("").attr("class",this.$el.attr("class")).append(this.$header_),this.$header.find("th").each(function(b){d.$header_.find("th").eq(b).data(a(this).data())}),this.$body.find("tr:first-child:not(.no-records-found) > *").each(function(b){d.$header_.find("div.fht-cell").eq(b).width(a(this).innerWidth())
}),this.$tableBody.off("scroll").on("scroll",function(){d.$tableHeader.scrollLeft(a(this).scrollLeft())}),void d.trigger("post-header"))},o.prototype.resetFooter=function(){var b=this,c=b.getData(),d=[];this.options.showFooter&&!this.options.cardView&&(!this.options.cardView&&this.options.detailView&&d.push("<td></td>"),a.each(this.options.columns,function(a,e){var f="",h="",i=g(' class="%s"',e["class"]);e.visible&&(!b.options.cardView||e.cardVisible)&&(f=g("text-align: %s; ",e.falign?e.falign:e.align),h=g("vertical-align: %s; ",e.valign),d.push("<td",i,g(' style="%s"',f+h),">"),d.push(k(e,e.footerFormatter,[c],"&nbsp;")||"&nbsp;"),d.push("</td>"))}),this.$tableFooter.find("tr").html(d.join("")),clearTimeout(this.timeoutFooter_),this.timeoutFooter_=setTimeout(a.proxy(this.fitFooter,this),this.$el.is(":hidden")?100:0))},o.prototype.fitFooter=function(){var b,c,d;return clearTimeout(this.timeoutFooter_),this.$el.is(":hidden")?void(this.timeoutFooter_=setTimeout(a.proxy(this.fitFooter,this),100)):(c=this.$el.css("width"),d=c>this.$tableBody.width()?j():0,this.$tableFooter.css({"margin-right":d}).find("table").css("width",c).attr("class",this.$el.attr("class")),b=this.$tableFooter.find("td"),void this.$tableBody.find("tbody tr:first-child:not(.no-records-found) > td").each(function(c){b.eq(c).outerWidth(a(this).outerWidth())}))},o.prototype.toggleColumn=function(a,b,c){if(-1!==a&&(this.options.columns[a].visible=b,this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns)){var d=this.$toolbar.find(".keep-open input").prop("disabled",!1);c&&d.filter(g('[value="%s"]',a)).prop("checked",b),d.filter(":checked").length<=this.options.minimumCountColumns&&d.filter(":checked").prop("disabled",!0)}},o.prototype.toggleRow=function(b,c,d){-1!==b&&a(this.$body[0]).children().filter(g(c?'[data-uniqueid="%s"]':'[data-index="%s"]',b))[d?"show":"hide"]()},o.prototype.resetView=function(a){var c=0;if(a&&a.height&&(this.options.height=a.height),this.$selectAll.prop("checked",this.$selectItem.length>0&&this.$selectItem.length===this.$selectItem.filter(":checked").length),this.options.height){var d=m(this.$toolbar),e=m(this.$pagination),f=this.options.height-d-e;this.$tableContainer.css("height",f+"px")}return this.options.cardView?(this.$el.css("margin-top","0"),void this.$tableContainer.css("padding-bottom","0")):(this.options.showHeader&&this.options.height?(this.$tableHeader.show(),this.resetHeader(),c+=b):(this.$tableHeader.hide(),this.trigger("post-header")),this.options.showFooter&&(this.resetFooter(),this.options.height&&(c+=b)),this.getCaretHtml(),void this.$tableContainer.css("padding-bottom",c+"px"))},o.prototype.getData=function(b){return!this.searchText&&a.isEmptyObject(this.filterColumns)&&a.isEmptyObject(this.filterColumnsPartial)?b?this.options.data.slice(this.pageFrom-1,this.pageTo):this.options.data:b?this.data.slice(this.pageFrom-1,this.pageTo):this.data},o.prototype.load=function(b){var c=!1;"server"===this.options.sidePagination?(this.options.totalRows=b.total,c=b.fixedScroll,b=b.rows):a.isArray(b)||(c=b.fixedScroll,b=b.data),this.initData(b),this.initSearch(),this.initPagination(),this.initBody(c)},o.prototype.append=function(a){this.initData(a,"append"),this.initSearch(),this.initPagination(),this.initBody(!0)},o.prototype.prepend=function(a){this.initData(a,"prepend"),this.initSearch(),this.initPagination(),this.initBody(!0)},o.prototype.remove=function(b){var c,d,e=this.options.data.length;if(b.hasOwnProperty("field")&&b.hasOwnProperty("values")){for(c=e-1;c>=0;c--)d=this.options.data[c],d.hasOwnProperty(b.field)&&-1!==a.inArray(d[b.field],b.values)&&this.options.data.splice(c,1);e!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initBody(!0))}},o.prototype.removeAll=function(){this.options.data.length>0&&(this.options.data.splice(0,this.options.data.length),this.initSearch(),this.initPagination(),this.initBody(!0))},o.prototype.removeByUniqueId=function(a){var b,c,d=this.options.uniqueId,e=this.options.data.length;for(b=e-1;b>=0;b--)c=this.options.data[b],c.hasOwnProperty(d)&&("string"==typeof c[d]?a=a.toString():"number"==typeof c[d]&&(Number(c[d])===c[d]&&c[d]%1===0?a=parseInt(a):c[d]===Number(c[d])&&0!==c[d]&&(a=parseFloat(a))),c[d]===a&&this.options.data.splice(b,1));e!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initBody(!0))},o.prototype.insertRow=function(a){a.hasOwnProperty("index")&&a.hasOwnProperty("row")&&(this.data.splice(a.index,0,a.row),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0))},o.prototype.updateRow=function(b){b.hasOwnProperty("index")&&b.hasOwnProperty("row")&&(a.extend(this.data[b.index],b.row),this.initSort(),this.initBody(!0))},o.prototype.showRow=function(a){a.hasOwnProperty("index")&&this.toggleRow(a.index,void 0===a.isIdField?!1:!0,!0)},o.prototype.hideRow=function(a){a.hasOwnProperty("index")&&this.toggleRow(a.index,void 0===a.isIdField?!1:!0,!1)},o.prototype.getRowsHidden=function(b){var c=a(this.$body[0]).children().filter(":hidden"),d=0;if(b)for(;d<c.length;d++)a(c[d]).show();return c},o.prototype.mergeCells=function(b){var c,d,e=b.index,f=a.inArray(b.field,this.header.fields),g=b.rowspan||1,h=b.colspan||1,i=this.$body.find("tr"),j=i.eq(e).find("td").eq(f);if(!this.options.cardView&&this.options.detailView&&(f+=1),j=i.eq(e).find("td").eq(f),!(0>e||0>f||e>=this.data.length)){for(c=e;e+g>c;c++)for(d=f;f+h>d;d++)i.eq(c).find("td").eq(d).hide();j.attr("rowspan",g).attr("colspan",h).show()}},o.prototype.updateCell=function(a){a.hasOwnProperty("rowIndex")&&a.hasOwnProperty("fieldName")&&a.hasOwnProperty("fieldValue")&&(this.data[a.rowIndex][a.fieldName]=a.fieldValue,this.initSort(),this.initBody(!0))},o.prototype.getOptions=function(){return this.options},o.prototype.getSelections=function(){var b=this;return a.grep(this.data,function(a){return a[b.header.stateField]})},o.prototype.getAllSelections=function(){var b=this;return a.grep(this.options.data,function(a){return a[b.header.stateField]})},o.prototype.checkAll=function(){this.checkAll_(!0)},o.prototype.uncheckAll=function(){this.checkAll_(!1)},o.prototype.checkAll_=function(a){var b;a||(b=this.getSelections()),this.$selectItem.filter(":enabled").prop("checked",a),this.updateRows(),this.updateSelected(),a&&(b=this.getSelections()),this.trigger(a?"check-all":"uncheck-all",b)},o.prototype.check=function(a){this.check_(!0,a)},o.prototype.uncheck=function(a){this.check_(!1,a)},o.prototype.check_=function(a,b){this.$selectItem.filter(g('[data-index="%s"]',b)).prop("checked",a),this.data[b][this.header.stateField]=a,this.updateSelected(),this.trigger(a?"check":"uncheck",this.data[b])},o.prototype.checkBy=function(a){this.checkBy_(!0,a)},o.prototype.uncheckBy=function(a){this.checkBy_(!1,a)},o.prototype.checkBy_=function(b,c){if(c.hasOwnProperty("field")&&c.hasOwnProperty("values")){var d=this,e=[];a.each(this.options.data,function(f,h){return h.hasOwnProperty(c.field)?void(-1!==a.inArray(h[c.field],c.values)&&(d.$selectItem.filter(g('[data-index="%s"]',f)).prop("checked",b),h[d.header.stateField]=b,e.push(h),d.trigger(b?"check":"uncheck",h))):!1}),this.updateSelected(),this.trigger(b?"check-some":"uncheck-some",e)}},o.prototype.destroy=function(){this.$el.insertBefore(this.$container),a(this.options.toolbar).insertBefore(this.$el),this.$container.next().remove(),this.$container.remove(),this.$el.html(this.$el_.html()).css("margin-top","0").attr("class",this.$el_.attr("class")||"")},o.prototype.showLoading=function(){this.$tableLoading.show()},o.prototype.hideLoading=function(){this.$tableLoading.hide()},o.prototype.togglePagination=function(){this.options.pagination=!this.options.pagination;var a=this.$toolbar.find('button[name="paginationSwitch"] i');this.options.pagination?a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchDown):a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchUp),this.updatePagination()},o.prototype.refresh=function(a){a&&a.url&&(this.options.url=a.url,this.options.pageNumber=1),this.initServer(a&&a.silent,a&&a.query)},o.prototype.resetWidth=function(){this.options.showHeader&&this.options.height&&this.fitHeader(),this.options.showFooter&&this.fitFooter()},o.prototype.showColumn=function(a){this.toggleColumn(i(this.options.columns,a),!0,!0)},o.prototype.hideColumn=function(a){this.toggleColumn(i(this.options.columns,a),!1,!0)},o.prototype.filterBy=function(b){this.filterColumns=a.isEmptyObject(b)?{}:b,this.options.pageNumber=1,this.initSearch(),this.updatePagination()},o.prototype.scrollTo=function(a){return"string"==typeof a&&(a="bottom"===a?this.$tableBody[0].scrollHeight:0),"number"==typeof a&&this.$tableBody.scrollTop(a),"undefined"==typeof a?this.$tableBody.scrollTop():void 0},o.prototype.getScrollPosition=function(){return this.scrollTo()},o.prototype.selectPage=function(a){a>0&&a<=this.options.totalPages&&(this.options.pageNumber=a,this.updatePagination())},o.prototype.prevPage=function(){this.options.pageNumber>1&&(this.options.pageNumber--,this.updatePagination())},o.prototype.nextPage=function(){this.options.pageNumber<this.options.totalPages&&(this.options.pageNumber++,this.updatePagination())},o.prototype.toggleView=function(){this.options.cardView=!this.options.cardView,this.initHeader(),this.initBody(),this.trigger("toggle",this.options.cardView)};var p=["getOptions","getSelections","getAllSelections","getData","load","append","prepend","remove","removeAll","insertRow","updateRow","updateCell","removeByUniqueId","showRow","hideRow","getRowsHidden","mergeCells","checkAll","uncheckAll","check","uncheck","checkBy","uncheckBy","refresh","resetView","resetWidth","destroy","showLoading","hideLoading","showColumn","hideColumn","filterBy","scrollTo","getScrollPosition","selectPage","prevPage","nextPage","togglePagination","toggleView"];a.fn.bootstrapTable=function(b){var c,d=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=a(this),f=e.data("bootstrap.table"),g=a.extend({},o.DEFAULTS,e.data(),"object"==typeof b&&b);if("string"==typeof b){if(a.inArray(b,p)<0)throw new Error("Unknown method: "+b);if(!f)return;c=f[b].apply(f,d),"destroy"===b&&e.removeData("bootstrap.table")}f||e.data("bootstrap.table",f=new o(this,g))}),"undefined"==typeof c?this:c},a.fn.bootstrapTable.Constructor=o,a.fn.bootstrapTable.defaults=o.DEFAULTS,a.fn.bootstrapTable.columnDefaults=o.COLUMN_DEFAULTS,a.fn.bootstrapTable.locales=o.LOCALES,a.fn.bootstrapTable.methods=p,a(function(){a('[data-toggle="table"]').bootstrapTable()})}(jQuery);
/*
* bootstrap-table - v1.8.1 - 2015-05-29
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2015 zhixin wen
* Licensed MIT License
*/
!function(a){"use strict";a.fn.bootstrapTable.locales["ro-RO"]={formatLoadingMessage:function(){return"Se incarca, va rugam asteptati..."},formatRecordsPerPage:function(a){return a+" inregistrari pe pagina"},formatShowingRows:function(a,b,c){return"Arata de la "+a+" pana la "+b+" din "+c+" randuri"},formatSearch:function(){return"Cauta"},formatNoMatches:function(){return"Nu au fost gasite inregistrari"},formatPaginationSwitch:function(){return"Ascunde/Arata paginatia"},formatRefresh:function(){return"Reincarca"},formatToggle:function(){return"Comuta"},formatColumns:function(){return"Coloane"},formatAllRows:function(){return"Toate"}},a.extend(a.fn.bootstrapTable.defaults,a.fn.bootstrapTable.locales["ro-RO"])}(jQuery);
var icons = '<svg id="glyphs-sheet" xmlns=\"http://www.w3.org/2000/svg\" style=\"display:none;\"><defs><symbol id=\"stroked-bacon-burger\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M41\x2018H3c\x2D.6\x200\x2D1\x2D.4\x2D1\x2D1v\x2D2C2\x208.9\x206.9\x204\x2013\x204h18c6\x200\x2011\x204.9\x2011\x2011v2c0\x20.6\x2D.4\x201\x2D1\x201zM39\x2037H5c\x2D1.7\x200\x2D3\x2D1.3\x2D3\x2D3v\x2D2c0\x2D.6.4\x2D1\x201\x2D1h38c.5\x200\x201\x20.5\x201\x201v2c0\x201.7\x2D1.3\x203\x2D3\x203zM1\x2027h42M1\x2022c3.5\x200\x203.5\x202\x207\x202s3.5\x2D2\x207\x2D2\x203.5\x202\x207\x202\x203.5\x2D2\x207\x2D2\x203.5\x202\x207\x202\x203.5\x2D2\x207\x2D2\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinecap\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-paper-coffee-cup\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M31.6\x2043H12.4L9\x209h26z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M35\x206H9V2c0\x2D.6.4\x2D1\x201\x2D1h24c.6\x200\x201\x20.4\x201\x201v4z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M7\x206h30v3H7zM9.8\x2017h24.4M11.6\x2035h20.8\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-round-coffee-mug\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M33\x2011v16c0\x208.8\x2D7.2\x2016\x2D16\x2016S1\x2035.8\x201\x2027V11h32zM37\x2027h\x2D4V15h4c3.3\x200\x206\x202.7\x206\x206s\x2D2.7\x206\x2D6\x206z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-wireless-router\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M33\x2027v3h\x2D3M39\x2027v3h\x2D3\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M41\x2034H3c\x2D1.1\x200\x2D2\x2D.9\x2D2\x2D2v\x2D6c0\x2D1.1.9\x2D2\x202\x2D2h38c1.1\x200\x202\x20.9\x202\x202v6c0\x201.1\x2D.9\x202\x2D2\x202z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M5\x2034h6v3H5zM33\x2034h6v3h\x2D6z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M14\x2024L7\x2013.3M30\x2024l7\x2D10.7\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M25.4\x2015c\x2D.7\x2D1.2\x2D2\x2D2\x2D3.4\x2D2s\x2D2.7.8\x2D3.4\x201.9M29.4\x2010.3C27.6\x208.3\x2024.9\x207\x2022\x207c\x2D2.9\x200\x2D5.5\x201.3\x2D7.4\x203.3\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-pen-tip\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M26.7\x206L38\x2017.3l\x2D6.3\x2013.4L2\x2042l11.3\x2D29.7zM2\x2042l19.1\x2D19.1\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2223.2\x22\x20cy\x3D\x2220.8\x22\x20r\x3D\x223\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M30.5\x201.3l12.2\x2012.2c.5.5.4\x201.3\x2D.3\x201.6L38\x2017.3\x2026.7\x206l2.2\x2D4.4c.3\x2D.7\x201.1\x2D.8\x201.6\x2D.3z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-usb-flash-drive\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M30\x2043H14c\x2D1.1\x200\x2D2\x2D.9\x2D2\x2D2V11h20v30c0\x201.1\x2D.9\x202\x2D2\x202zM15\x201h14v10H15z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M20\x204v3h\x2D3M25\x204v3h\x2D3\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-toiler-paper\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M9.9\x201H33c3.9\x200\x207\x205.8\x207\x2013s\x2D3.1\x2013\x2D6.9\x2013H9.9C6.1\x2027\x203\x2021.2\x203\x2014S6.1\x201\x209.9\x201z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cellipse\x20cx\x3D\x2233\x22\x20cy\x3D\x2214\x22\x20rx\x3D\x227\x22\x20ry\x3D\x2213\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cellipse\x20cx\x3D\x2233\x22\x20cy\x3D\x2214\x22\x20rx\x3D\x223\x22\x20ry\x3D\x227\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M33.1\x2027c3.8\x200\x206.9\x2D5.8\x206.9\x2D13v29l\x2D4\x2D2\x2D4\x202\x2D4\x2D2\x2D4\x202\x2D4\x2D2\x2D3\x202V27h16.1z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-pencil\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M13.7\x2036.9l\x2D7.1\x2D7.1L34.9\x201.6c.8\x2D.8\x202\x2D.8\x202.8\x200L42\x205.8c.8.8.8\x202\x200\x202.8L13.7\x2036.9zM1\x2042.6l5.7\x2D12.7\x207\x207zM32.8\x203.7l7.1\x207.1\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-brush\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M18.6\x2030l\x2D3.9\x2D3.9c\x2D.4\x2D.4\x2D.4\x2D1\x200\x2D1.4L38.1\x202.5c1.1\x2D1.1\x203\x2D1.1\x204.1.1\x201.1\x201.1\x201.1\x202.9.1\x204.1L20.1\x2030c\x2D.4.4\x2D1.1.4\x2D1.5\x200z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x2039.9s4.1\x2D3.3\x205.4\x2D7.7c1.1\x2D3.7\x203.6\x2D6.2\x207.1\x2D5.6\x203.5.6\x205.7\x204.4\x204.2\x207.6\x2D1.6\x203.3\x2D8\x206.3\x2D16.7\x205.7z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-email\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M1\x209h42v26H1z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M17.1\x2022L1\x2035h42L26.9\x2022\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M22\x2026L1\x209h42z\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-open-letter\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M22\x2026l21\x2017H1z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M1\x2017v26h42V17\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M26.9\x2030L43\x2017\x2022\x201\x201\x2017l16.1\x2013\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-laptop-computer-and-mobile\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M33\x2031H1v3c0\x20.6.4\x201\x201\x201h31\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M42\x2037h\x2D8c\x2D.6\x200\x2D1\x2D.4\x2D1\x2D1V18c0\x2D.6.4\x2D1\x201\x2D1h8c.6\x200\x201\x20.4\x201\x201v18c0\x20.6\x2D.4\x201\x2D1\x201zM33\x2021h10M33\x2033h10\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M39\x2017v\x2D7c0\x2D.6\x2D.4\x2D1\x2D1\x2D1H6c\x2D.6\x200\x2D1\x20.4\x2D1\x201v21h28\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-hourglass\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M21.7\x2022L12\x2011.7C9.7\x209.2\x2011.5\x205\x2015\x205h12.9c3.4\x200\x205.3\x204.1\x203\x206.6L21.7\x2022zM21.7\x2022L12\x2032.3c\x2D2.3\x202.5\x2D.5\x206.7\x203\x206.7h12.9c3.4\x200\x205.3\x2D4.1\x203\x2D6.6L21.7\x2022zM33.2\x205h\x2D24c\x2D.6\x200\x2D1\x2D.4\x2D1\x2D1V2c0\x2D.6.4\x2D1\x201\x2D1h24c.6\x200\x201\x20.4\x201\x201v2c0\x20.6\x2D.4\x201\x2D1\x201zM33.2\x2043h\x2D24c\x2D.6\x200\x2D1\x2D.4\x2D1\x2D1v\x2D2c0\x2D.6.4\x2D1\x201\x2D1h24c.6\x200\x201\x20.4\x201\x201v2c0\x20.6\x2D.4\x201\x2D1\x201z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M14.1\x2013.5h15M11.6\x2034.5h4.8c.6\x200\x201.1\x2D.1\x201.6\x2D.3l2.1\x2D.9c1\x2D.5\x202.2\x2D.5\x203.2\x200l2.1.9c.5.2\x201.1.3\x201.6.3h4.5\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-internal-hard-drive\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M34.1\x207H9.9C8.2\x207\x206.6\x208.1\x206.1\x209.7L1.6\x2023.2c\x2D.4\x201.2\x2D.6\x202.5\x2D.6\x203.7V32c0\x202.2\x201.8\x204\x204\x204h34c2.2\x200\x204\x2D1.8\x204\x2D4v\x2D5.1c0\x2D1.3\x2D.2\x2D2.6\x2D.6\x2D3.8L37.9\x209.7C37.4\x208.1\x2035.8\x207\x2034.1\x207z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M32.2\x2013.7c3\x203.4\x2D.6\x208\x2D10.2\x208s\x2D13.2\x2D4.7\x2D10.2\x2D8c1.9\x2D2.1\x206.2\x2D3.3\x2010.2\x2D3.3s8.3\x201.2\x2010.2\x203.3z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M24.3\x2015.6c.7.7\x2D.1\x201.7\x2D2.3\x201.7s\x2D3\x2D1\x2D2.3\x2D1.7c.4\x2D.4\x201.4\x2D.7\x202.3\x2D.7s1.9.3\x202.3.7z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M1\x2026h42\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinecap\x3D\x22round\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M14.3\x2019.6l3.3\x2D1.6\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M6\x2029v4M9\x2029v4M12\x2029v4M15\x2029v4\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinecap\x3D\x22round\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M33\x2031h6\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-external-hard-drive\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M34.1\x207H9.9C8.2\x207\x206.6\x208.1\x206.1\x209.7L1.6\x2023.2c\x2D.4\x201.2\x2D.6\x202.5\x2D.6\x203.7V32c0\x202.2\x201.8\x204\x204\x204h34c2.2\x200\x204\x2D1.8\x204\x2D4v\x2D5.1c0\x2D1.3\x2D.2\x2D2.6\x2D.6\x2D3.8L37.9\x209.7C37.4\x208.1\x2035.8\x207\x2034.1\x207zM1\x2026h42\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinecap\x3D\x22round\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M33\x2031h6M5\x2031h2\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-flag\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M9\x203v41M37\x2018.2C25.9\x2014\x2020.1\x2024\x209\x2019.8v\x2D16C20.1\x208\x2025.9\x2D2\x2037\x202.2v16z\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-desktop-computer-and-mobile\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M39\x2019V8c0\x2D1.1\x2D.9\x2D2\x2D2\x2D2H3c\x2D1.1\x200\x2D2\x20.9\x2D2\x202v22c0\x201.1.9\x202\x202\x202h30M27\x2032l1.3\x204.5c.4\x201.3\x2D.6\x202.5\x2D1.9\x202.5h\x2D8.7c\x2D1.3\x200\x2D2.3\x2D1.3\x2D1.9\x2D2.5L17\x2032M1\x2027h32\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M42\x2039h\x2D8c\x2D.6\x200\x2D1\x2D.4\x2D1\x2D1V20c0\x2D.6.4\x2D1\x201\x2D1h8c.6\x200\x201\x20.4\x201\x201v18c0\x20.6\x2D.4\x201\x2D1\x201zM33\x2023h10M33\x2035h10\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-database\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M42\x206c0\x2D2.8\x2D9\x2D5\x2D20\x2D5S2\x203.2\x202\x206v32c0\x202.8\x209\x205\x2020\x205s20\x2D2.2\x2020\x2D5V6z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M42\x206c0\x202.8\x2D9\x205\x2D20\x205S2\x208.8\x202\x206M42\x2017c0\x202.8\x2D9\x205\x2D20\x205S2\x2019.8\x202\x2017M42\x2027c0\x202.8\x2D9\x205\x2D20\x205S2\x2029.8\x202\x2027\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-hand-cursor\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M33.1\x2018.3c\x2D.7\x200\x2D1.4.3\x2D2\x20.8\x2D.4\x2D1.3\x2D1.6\x2D2.2\x2D3\x2D2.2\x2D1\x200\x2D1.8.4\x2D2.4\x201.1\x2D.5\x2D1\x2D1.6\x2D1.7\x2D2.7\x2D1.7\x2D1.3\x200\x2D2.6.8\x2D3.1\x202V4c0\x2D1.7\x2D1.3\x2D3\x2D3\x2D3s\x2D3\x201.3\x2D3\x203v19.9c\x2D1.7\x2D2.1\x2D3.8\x2D3.7\x2D6.5\x2D4\x2D3.6\x2D.4\x2D4.2\x202.8\x2D2.9\x203.5\x203.6\x201.8\x206.9\x207\x208.5\x2010.4\x202.1\x205.2\x202.5\x209.3\x2011.3\x209.3\x204.8\x200\x207.9\x2D1.6\x209.7\x2D5.6\x201.5\x2D3.3\x202.1\x2D7.1\x202.1\x2D14v\x2D1.9c.2\x2D1.8\x2D1.3\x2D3.4\x2D3\x2D3.3z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-arrow-cursor\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M6\x201l6.5\x2040.5\x207.9\x2D8.9L26.9\x2043l7.6\x2D4.8\x2D6.4\x2D10.3\x2011.4\x2D3.3z\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-chevron-up\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M11.4\x2027.7L22\x2017.1l10.6\x2010.6\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-chevron-right\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M16.7\x2011.4L27.3\x2022\x2016.7\x2032.6\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-chevron-left\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M27.3\x2032.6L16.7\x2022l10.6\x2D10.6\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-chevron-down\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M11.4\x2016.7L22\x2027.3l10.6\x2D10.6\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-arrow-up\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M12.1\x2021.1l9.9\x2D9.9\x209.9\x209.9M22\x2034.2v\x2D23\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-arrow-right\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M22.9\x2012.1l9.9\x209.9\x2D9.9\x209.9M9.8\x2022h23\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-arrow-left\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M19.7\x2031.9L9.8\x2022l9.9\x2D9.9M32.8\x2022h\x2D23\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-arrow-down\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M31.9\x2024.3L22\x2034.2l\x2D9.9\x2D9.9M22\x2011.2v23\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-video\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2036\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x2033V3c0\x2D1.1.9\x2D2\x202\x2D2h38c1.1\x200\x202\x20.9\x202\x202v30c0\x201.1\x2D.9\x202\x2D2\x202H3c\x2D1.1\x200\x2D2\x2D.9\x2D2\x2D2zM43\x2027H1\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M25.653\x2015.832l\x2D6.197\x204.13c\x2D.665.444\x2D1.555\x2D.032\x2D1.555\x2D.83v\x2D8.264c0\x2D.8.89\x2D1.275\x201.557\x2D.832l6.197\x204.13c.594.398.594\x201.27\x200\x201.666z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20d\x3D\x22M5\x2031h34\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-female-user\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2043.477\x2041.979\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M40.476\x2040.98c1.21\x200\x202.144\x2D1.068\x201.982\x2D2.267l\x2D.005\x2D.037c\x2D.273\x2D2.062\x2D1.634\x2D3.818\x2D3.58\x2D4.555\x2D3.146\x2D1.19\x2D7.507\x2D2.84\x2D8.05\x2D3.04\x2D.4\x2D.14\x2D1.08\x2D1.3\x2D1.32\x2D1.84\x2D.24\x2D.52\x2D1.86\x2D1.58\x2D2.28\x2D1.64l\x2D.06\x2D2.2\x207.26\x2D2.68s\x2D1.58\x2D2.94\x2D2.06\x2D4.58c\x2D.48\x2D1.64\x2D.78\x2D4.2\x2D.78\x2D4.44\x200\x2D.24\x2D.98\x2D6.12\x2D1.52\x2D7.26\x2D.52\x2D1.14\x2D1.26\x2D2.7\x2D2.5\x2D3.46\x2D1.22\x2D.76\x2D3.06\x2D1.84\x2D5.7\x2D1.98h\x2D.24c\x2D2.64.14\x2D4.48\x201.22\x2D5.7\x201.98\x2D1.24.76\x2D1.98\x202.32\x2D2.5\x203.46\x2D.54\x201.14\x2D1.52\x207.02\x2D1.52\x207.26\x200\x20.24\x2D.28\x202.9\x2D.74\x204.54\x2D.48\x201.64\x2D2.1\x204.48\x2D2.1\x204.48l7.26\x202.68\x2D.06\x202.2c\x2D.42.06\x2D2.04\x201.12\x2D2.28\x201.64\x2D.24.54\x2D.92\x201.7\x2D1.32\x201.84\x2D.53.197\x2D4.715\x201.704\x2D7.843\x202.83\x2D2.07.744\x2D3.523\x202.596\x2D3.8\x204.777l\x2D.005.038C.863\x2039.92\x201.795\x2040.98\x203\x2040.98h37.476z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-film\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2042\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M39\x2043H3c\x2D1.1\x200\x2D2\x2D.9\x2D2\x2D2V3c0\x2D1.1.9\x2D2\x202\x2D2h36c1.1\x200\x202\x20.9\x202\x202v38c0\x201.1\x2D.9\x202\x2D2\x202zM9\x201v42M33\x201v42M33\x2022H9\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M3\x208h2.993V5M3\x2014h2.993v\x2D3M3\x2020h2.993v\x2D3M3\x2026h2.993v\x2D3M3\x2032h2.993v\x2D3M3\x2038h2.993v\x2D3M35\x208h2.993V5M35\x2014h2.993v\x2D3M35\x2020h2.993v\x2D3M35\x2026h2.993v\x2D3M35\x2032h2.993v\x2D3M35\x2038h2.993v\x2D3\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-male-user\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044.02\x2043\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x2038.207c0\x2D1.983\x201.168\x2D3.777\x202.983\x2D4.575\x202.325\x2D1.022\x205.505\x2D2.42\x207.638\x2D3.366\x201.925\x2D.85\x202.34\x2D1.363\x204.28\x2D2.235\x200\x200\x20.2\x2D1.012.13\x2D1.615h1.516s.347.206\x200\x2D2.176c0\x200\x2D1.85\x2D.5\x2D1.936\x2D4.294\x200\x200\x2D1.39.476\x2D1.475\x2D1.823\x2D.058\x2D1.56\x2D1.243\x2D2.912.462\x2D4.03l\x2D.867\x2D2.38s\x2D1.733\x2D9.617\x203.25\x2D8.206c\x2D2.1\x2D2.56\x2011.92\x2D5.117\x2012.83\x203\x200\x200\x20.65\x204.38\x200\x207.38\x200\x200\x202.05\x2D.24.68\x203.765\x200\x200\x2D.75\x202.882\x2D1.907\x202.235\x200\x200\x20.19\x203.646\x2D1.632\x204.265\x200\x200\x20.13\x201.94.13\x202.073l1.736.265s\x2D.26\x201.588.043\x201.764c0\x200\x202.49\x201.29\x204.506\x202.074\x202.378.917\x204.86\x202.002\x206.714\x202.84\x201.788.81\x202.932\x202.592\x202.93\x204.555\x200\x20.847.003\x201.63.01\x202.007.023\x201.224\x2D.873\x202.27\x2D2.1\x202.27H3.105C1.943\x2042\x201\x2041.057\x201\x2039.895v\x2D1.688z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-upload\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2028\x2041.414\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M17\x2014.414h8c1.105\x200\x202\x20.895\x202\x202v22c0\x201.105\x2D.895\x202\x2D2\x202H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2v\x2D22c0\x2D1.105.895\x2D2\x202\x2D2h8M14\x2027.414v\x2D26M8.002\x207.412L14\x201.414l5.998\x205.998\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-monitor\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2034\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x201h42v28H1z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20d\x3D\x22M17\x2029v4M27\x2029v4M32\x2033H12\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M38\x2026h2M35\x2026h2\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-trash\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2040\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M4\x205l4\x2038h24l4\x2D38zM0\x205h40M12\x205V1h16v4\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-line-graph\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2033\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22currentColor\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M1\x200v32h43.004\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22currentColor\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x20d\x3D\x22M43\x2032H1v\x2D5l14\x2D14\x2014\x208L43\x204z\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-tag\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2042.143\x2042.15\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20clip\x2Drule\x3D\x22evenodd\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M40.555\x2025.002l\x2D15.56\x2015.56c\x2D.78.78\x2D2.04.785\x2D2.813.012L1.576\x2019.968c\x2D.373\x2D.374\x2D.58\x2D.882\x2D.576\x2D1.413l.143\x2D15.557C1.153\x201.9\x202.05\x201.01\x203.148\x201.01L18.558\x201c.525\x200\x201.027.207\x201.397.576L40.568\x2022.19c.772.772.767\x202.032\x2D.013\x202.812z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x229.44\x22\x20cy\x3D\x229.447\x22\x20r\x3D\x223\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-tablet-1\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2032\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M29\x2043H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V3c0\x2D1.105.895\x2D2\x202\x2D2h26c1.105\x200\x202\x20.895\x202\x202v38c0\x201.105\x2D.895\x202\x2D2\x202zM1\x2037h30M1\x207h30M15\x2040h2\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-table\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2034\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x201h42v32H1z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20d\x3D\x22M43\x209H1M43\x2017H1M43\x2025H1M4\x205h8M4\x2013h8M4\x2021h8M4\x2029h8M18\x205h8M32\x205h8M15\x201v32M29\x201v32\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-star\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2041.681\x2041.585\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M22.652\x202.15l4.53\x209.666c.282.604.848\x201.027\x201.507\x201.128l10.29\x201.575c1.61.244\x202.265\x202.205\x201.13\x203.37l\x2D7.576\x207.78c\x2D.442.453\x2D.643\x201.09\x2D.54\x201.716l1.77\x2010.87c.267\x201.65\x2D1.483\x202.88\x2D2.944\x202.072l\x2D9.012\x2D4.99c\x2D.603\x2D.335\x2D1.335\x2D.335\x2D1.938\x200l\x2D9.013\x204.99c\x2D1.46.808\x2D3.21\x2D.424\x2D2.943\x2D2.072l1.77\x2D10.87c.102\x2D.627\x2D.1\x2D1.264\x2D.54\x2D1.718L1.567\x2017.89c\x2D1.135\x2D1.165\x2D.478\x2D3.126\x201.13\x2D3.373L12.99\x2012.94c.66\x2D.1\x201.223\x2D.523\x201.506\x2D1.127l4.53\x2D9.665c.722\x2D1.534\x202.905\x2D1.534\x203.625\x200z\x22\x20clip\x2Drule\x3D\x22evenodd\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-sound-on\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2037\x2031.135\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M9\x2023.002H2c\x2D.552\x200\x2D1\x2D.448\x2D1\x2D1v\x2D12c0\x2D.552.448\x2D1\x201\x2D1h7v14zM19.445\x2029.965L9\x2023.002v\x2D14l10.4\x2D7.8c.66\x2D.494\x201.6\x2D.024\x201.6.8v27.13c0\x20.8\x2D.89\x201.276\x2D1.555.833zM27\x2016.002h10M25.464\x2022.466l7.072\x207.07M25.464\x209.537l7.072\x2D7.07\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-printer\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2043\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M9\x2034H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V16c0\x2D1.105.895\x2D2\x202\x2D2h38c1.105\x200\x202\x20.895\x202\x202v16c0\x201.105\x2D.895\x202\x2D2\x202h\x2D6\x22\x20clip\x2Drule\x3D\x22evenodd\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20clip\x2Drule\x3D\x22evenodd\x22\x20d\x3D\x22M9\x2029h26v13H9zM9\x2014V1h26v13\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x2022h42\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-plus-sign\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M11\x2022h22M22\x2010v23\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-landscape\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2034\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M41\x2033H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V3c0\x2D1.105.895\x2D2\x202\x2D2h38c1.105\x200\x202\x20.895\x202\x202v28c0\x201.105\x2D.895\x202\x2D2\x202z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20d\x3D\x22M1\x2022.417l13\x2D13\x2012.708\x2015.708\x209.25\x2D6.25L43.168\x2028\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2232.167\x22\x20cy\x3D\x2210\x22\x20r\x3D\x223\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-paperclip\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2039.918\x2044.292\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M39\x2019.872L18.588\x2040.285c\x2D4.01\x204.01\x2D10.57\x204.01\x2D14.58\x200s\x2D4.01\x2D10.57\x200\x2D14.58l22.6\x2D22.6c2.807\x2D2.807\x207.4\x2D2.807\x2010.206\x200\x202.807\x202.807\x202.807\x207.4\x200\x2010.206L16.4\x2033.726c\x2D1.604\x201.604\x2D4.228\x201.604\x2D5.832\x200s\x2D1.604\x2D4.228\x200\x2D5.832L28.794\x209.666\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-notepad\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M41\x2043H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V6c0\x2D1.105.895\x2D2\x202\x2D2h38c1.105\x200\x202\x20.895\x202\x202v35c0\x201.105\x2D.895\x202\x2D2\x202zM1\x2015h42M9\x200v8M35\x200v8M5\x2021h34M5\x2026h34M5\x2031h34M5\x2036h34\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-music\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2037\x2043.623\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M36\x2010.623l\x2D23\x204V6.305c0\x2D.972.7\x2D1.804\x201.657\x2D1.97l19\x2D3.304C34.88.82\x2036\x201.76\x2036\x203v7.623zM8\x2042.623H6c\x2D2.76\x200\x2D5\x2D2.24\x2D5\x2D5s2.24\x2D5\x205\x2D5h7v5c0\x202.76\x2D2.24\x205\x2D5\x205zM12.995\x2014.626v22.85M31\x2038.623h\x2D2c\x2D2.76\x200\x2D5\x2D2.24\x2D5\x2D5s2.24\x2D5\x205\x2D5h7v5c0\x202.76\x2D2.24\x205\x2D5\x205zM35.995\x2010.626v22.85\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-mobile-device\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2024\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M21\x2043H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V3c0\x2D1.105.895\x2D2\x202\x2D2h18c1.105\x200\x202\x20.895\x202\x202v38c0\x201.105\x2D.895\x202\x2D2\x202zM1\x2037h22M1\x207h22M10\x204h4M11\x2040h2\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-two-messages\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2039.035\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M40.962\x2018.79c.01\x2D.217.038\x2D.43.038\x2D.647C41\x208.675\x2032.046\x201\x2021\x201S1\x208.675\x201\x2018.143c0\x204.466\x202.01\x208.52\x205.275\x2011.572\x2D.612\x202.002\x2D1.97\x205.11\x2D4.83\x207.05\x200\x200\x206.747\x2D.76\x2011.067\x2D3.117\x202.58\x201.04\x205.45\x201.638\x208.49\x201.638.253\x200\x20.5\x2D.025.752\x2D.033\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M29\x2013c7.732\x200\x2014\x205.373\x2014\x2012\x200\x203.127\x2D1.407\x205.965\x2D3.692\x208.1.428\x201.4\x201.38\x203.577\x203.382\x204.935\x200\x200\x2D4.724\x2D.533\x2D7.748\x2D2.182C33.136\x2036.58\x2031.128\x2037\x2029\x2037c\x2D7.732\x200\x2D14\x2D5.373\x2D14\x2D12s6.268\x2D12\x2014\x2D12z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2221\x22\x20cy\x3D\x2225\x22\x20r\x3D\x222\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2229\x22\x20cy\x3D\x2225\x22\x20r\x3D\x222\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2237\x22\x20cy\x3D\x2225\x22\x20r\x3D\x222\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-empty-message\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2039.553\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M22\x201C10.402\x201\x201\x209.06\x201\x2019c0\x204.69\x202.11\x208.947\x205.538\x2012.15\x2D.643\x202.102\x2D2.07\x205.365\x2D5.073\x207.403\x200\x200\x207.086\x2D.8\x2011.62\x2D3.273C15.795\x2036.372\x2018.81\x2037\x2022\x2037c11.598\x200\x2021\x2D8.06\x2021\x2D18S33.598\x201\x2022\x201z\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-map\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2038.838\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M43\x2032.42l\x2D14\x205\x2D14\x2D5\x2D14\x205v\x2D31l14\x2D5\x2014\x205\x2014\x2D5zM15\x201.42v31M29\x206.42v31\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-lock\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2034\x2040\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x2014v24c0\x20.552.448\x201\x201\x201h30c.552\x200\x201\x2D.448\x201\x2D1V14c0\x2D.552\x2D.448\x2D1\x2D1\x2D1H2c\x2D.552\x200\x2D1\x20.448\x2D1\x201zM8\x2013V6c0\x2D2.76\x202.24\x2D5\x205\x2D5h8c2.76\x200\x205\x202.24\x205\x205v7\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2217\x22\x20cy\x3D\x2224\x22\x20r\x3D\x223\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M17\x2027v5\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-location-pin\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2030\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M29\x2015c0\x2011.58\x2D14\x2028\x2D14\x2028S1\x2027.024\x201\x2015C1\x207.268\x207.268\x201\x2015\x201s14\x206.268\x2014\x2014z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2215\x22\x20cy\x3D\x2215\x22\x20r\x3D\x226\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-chain\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2039.689\x2039.689\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20clip\x2Drule\x3D\x22evenodd\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M18.43\x2021.26l2.828\x202.827c1.556\x201.556\x204.1\x201.556\x205.657\x200L37.522\x2013.48c1.556\x2D1.556\x201.556\x2D4.1\x200\x2D5.657l\x2D5.657\x2D5.657c\x2D1.556\x2D1.556\x2D4.1\x2D1.556\x2D5.657\x200l\x2D9.192\x209.192\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M21.26\x2018.43l\x2D2.83\x2D2.828c\x2D1.555\x2D1.556\x2D4.1\x2D1.556\x2D5.656\x200L2.167\x2026.208c\x2D1.556\x201.556\x2D1.556\x204.1\x200\x205.657l5.657\x205.657c1.556\x201.556\x204.1\x201.556\x205.657\x200l9.194\x2D9.192\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-key\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2041.284\x2044.113\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2228.284\x22\x20cy\x3D\x2213\x22\x20r\x3D\x2212\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M19.8\x2021.485L.706\x2040.577M2.828\x2038.456l7.07\x2D7.07\x204.244\x204.242\x2D7.07\x207.07z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-heart\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2036.504\x22>\x0D\x0A\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M42.087\x2017.245C40.037\x2022.188\x2027.21\x2032.09\x2023.2\x2035.103c\x2D.712.535\x2D1.68.535\x2D2.393\x200\x2D4.01\x2D3.01\x2D16.843\x2D12.915\x2D18.894\x2D17.858C\x2D.543\x2011.323\x202.126\x204.47\x207.876\x201.94\x2013.126\x2D.37\x2019.126\x201.723\x2022\x206.61c2.874\x2D4.887\x208.874\x2D6.98\x2014.124\x2D4.67\x205.75\x202.53\x208.42\x209.383\x205.963\x2015.305z\x22\x20clip\x2Drule\x3D\x22evenodd\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x2F\x3E\x0D\x0A</symbol><symbol id=\"stroked-home\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2043.447\x2043.448\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M42.723\x2023.448l\x2D21\x2D22\x2D21\x2022\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M5.723\x2018.448v24h11v\x2D16h10v16h11v\x2D24\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-gear\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M41.803\x2018.1l\x2D3.013\x2D1.003c\x2D.36\x2D1.23\x2D.84\x2D2.408\x2D1.447\x2D3.51l1.416\x2D2.833c.335\x2D.674.203\x2D1.487\x2D.33\x2D2.02l\x2D3.166\x2D3.166c\x2D.533\x2D.533\x2D1.346\x2D.665\x2D2.02\x2D.328l\x2D2.832\x201.416c\x2D1.102\x2D.606\x2D2.28\x2D1.088\x2D3.51\x2D1.447l\x2D1.005\x2D3.015C25.66\x201.482\x2024.992\x201\x2024.237\x201h\x2D4.475c\x2D.753\x200\x2D1.422.482\x2D1.66\x201.197L17.098\x205.21c\x2D1.23.36\x2D2.408.84\x2D3.51\x201.447L10.753\x205.24c\x2D.674\x2D.337\x2D1.487\x2D.205\x2D2.02.328L5.568\x208.734c\x2D.533.533\x2D.665\x201.346\x2D.328\x202.02l1.416\x202.832c\x2D.606\x201.102\x2D1.088\x202.28\x2D1.447\x203.51L2.194\x2018.1C1.482\x2018.34\x201\x2019.01\x201\x2019.76v4.478c0\x20.753.482\x201.422\x201.197\x201.66l3.013\x201.004c.36\x201.23.84\x202.408\x201.447\x203.51L5.24\x2033.247c\x2D.337.674\x2D.205\x201.487.328\x202.02l3.166\x203.166c.533.533\x201.346.665\x202.02.328l2.832\x2D1.415c1.102.606\x202.28\x201.088\x203.51\x201.447l1.005\x203.014c.24.714.91\x201.196\x201.66\x201.196h4.48c.752\x200\x201.42\x2D.482\x201.66\x2D1.197l1.003\x2D3.013c1.23\x2D.36\x202.408\x2D.84\x203.51\x2D1.447l2.833\x201.416c.674.337\x201.487.205\x202.02\x2D.33l3.166\x2D3.164c.534\x2D.533.666\x2D1.346.33\x2D2.02l\x2D1.417\x2D2.832c.606\x2D1.102\x201.088\x2D2.28\x201.447\x2D3.51l3.013\x2D1.005c.715\x2D.238\x201.197\x2D.907\x201.197\x2D1.66v\x2D4.477c0\x2D.754\x2D.482\x2D1.423\x2D1.197\x2D1.66z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2211\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-folder\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2034\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M23\x203c0\x2D1.105\x2D.895\x2D2\x2D2\x2D2H3c\x2D1.105\x200\x2D2\x20.895\x2D2\x202v28c0\x201.105.895\x202\x202\x202h38c1.105\x200\x202\x2D.895\x202\x2D2V7c0\x2D1.105\x2D.895\x2D2\x2D2\x2D2H25c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2zM1\x209h41.992\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-open-folder\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2043.62\x2034\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M22.81\x203c0\x2D1.105\x2D.895\x2D2\x2D2\x2D2h\x2D16c\x2D1.105\x200\x2D2\x20.895\x2D2\x202v8h38V7c0\x2D1.105\x2D.895\x2D2\x2D2\x2D2h\x2D14c\x2D1.104\x200\x2D2\x2D.895\x2D2\x2D2zM1.008\x2013.18l1.636\x2018c.094\x201.03.958\x201.82\x201.993\x201.82h34.347c1.034\x200\x201.898\x2D.79\x201.992\x2D1.82l1.636\x2D18c.106\x2D1.17\x2D.816\x2D2.18\x2D1.992\x2D2.18H3c\x2D1.176\x200\x2D2.098\x201.01\x2D1.992\x202.18z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-eye\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044.409\x2030\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20clip\x2Drule\x3D\x22evenodd\x22\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M22.204\x201c\x2D11.603\x200\x2D21\x2014\x2D21\x2014s9.397\x2014\x2021\x2014\x2021\x2D14\x2021\x2D14\x2D9.397\x2D14\x2D21\x2D14z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222.204\x22\x20cy\x3D\x2215\x22\x20r\x3D\x228\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222.204\x22\x20cy\x3D\x2215\x22\x20r\x3D\x222\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-download\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2028\x2040\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M17\x2013h8c1.105\x200\x202\x20.895\x202\x202v22c0\x201.105\x2D.895\x202\x2D2\x202H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V15c0\x2D1.105.895\x2D2\x202\x2D2h8M14\x200v26\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M19.998\x2020.002L14\x2026l\x2D5.998\x2D5.998\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-blank-document\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2034\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M31\x2043H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V3c0\x2D1.105.895\x2D2\x202\x2D2h17.172c.53\x200\x201.04.21\x201.414.586l10.828\x2010.828c.375.375.586.884.586\x201.414V41c0\x201.105\x2D.895\x202\x2D2\x202z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M21\x201v9.952c0\x201.105.895\x202\x202\x202h10\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-desktop\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2037\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M41\x2029H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V3c0\x2D1.105.895\x2D2\x202\x2D2h38c1.105\x200\x202\x20.895\x202\x202v24c0\x201.105\x2D.895\x202\x2D2\x202zM27\x2029l1.272\x204.45c.365\x201.278\x2D.595\x202.55\x2D1.923\x202.55h\x2D8.7c\x2D1.33\x200\x2D2.288\x2D1.272\x2D1.923\x2D2.55L17\x2029M1\x2024h42\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-dashboard-dial\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2032\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M22\x2010v11\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2224\x22\x20r\x3D\x223\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M22\x204v3M13\x206.412l1.5\x202.598M6.412\x2013l2.598\x201.5M4\x2022h3M40\x2022h\x2D3M37.588\x2013l\x2D2.598\x201.5M31\x206.412L29.5\x209.01M41.514\x2029.714c1.134\x2D2.848\x201.677\x2D5.993\x201.426\x2D9.302C42.143\x209.907\x2033.437\x201.464\x2022.91\x201.02\x2010.9.51\x201\x2010.1\x201\x2022c0\x202.73.536\x205.327\x201.487\x207.716C2.794\x2030.486\x203.53\x2031\x204.36\x2031h35.28c.83\x200\x201.566\x2D.515\x201.874\x2D1.286z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-clock\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M31\x2022h\x2D9V5\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M22\x2036v3M39\x2022h\x2D3M8\x2022H5\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-clipboard-with-paper\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2032\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M23\x205h6c1.105\x200\x202\x20.895\x202\x202v34c0\x201.105\x2D.895\x202\x2D2\x202H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V7c0\x2D1.105.895\x2D2\x202\x2D2h6\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M20\x203c0\x2D1.105\x2D.895\x2D2\x2D2\x2D2h\x2D4c\x2D1.105\x200\x2D2\x20.895\x2D2\x202h\x2D2c\x2D.552\x200\x2D1\x20.448\x2D1\x201v2c0\x20.552.448\x201\x201\x201h12c.552\x200\x201\x2D.448\x201\x2D1V4c0\x2D.552\x2D.448\x2D1\x2D1\x2D1h\x2D2zM12\x2016h16M5\x2014h4v4H5zM12\x2024h16M5\x2022h4v4H5zM12\x2032h16M5\x2030h4v4H5z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-checkmark\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M34.58\x2014.11L17.61\x2031.08l\x2D9.19\x2D9.19\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-cancel\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2222\x22\x20r\x3D\x2221\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M13.868\x2014.075l15.557\x2015.557M30.132\x2013.368L13.868\x2029.632\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-camcorder\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2024\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M31\x2023H3c\x2D1.1\x200\x2D2\x2D.9\x2D2\x2D2V3c0\x2D1.1.9\x2D2\x202\x2D2h28c1.1\x200\x202\x20.9\x202\x202v18c0\x201.1\x2D.9\x202\x2D2\x202zM41.375\x2021.7L33\x2015V9l8.375\x2D6.7C42.03\x201.776\x2043\x202.242\x2043\x203.08v17.84c0\x20.838\x2D.97\x201.304\x2D1.625.78z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-camera\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2033\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M30.497\x204.743l\x2D.994\x2D2.486C29.2\x201.497\x2028.463\x201\x2027.646\x201H16.354c\x2D.818\x200\x2D1.553.498\x2D1.857\x201.257l\x2D.994\x202.486C13.2\x205.503\x2012.463\x206\x2011.646\x206H3c\x2D1.105\x200\x2D2\x20.895\x2D2\x202v22c0\x201.105.895\x202\x202\x202h38c1.105\x200\x202\x2D.895\x202\x2D2V8c0\x2D1.105\x2D.895\x2D2\x2D2\x2D2h\x2D8.646c\x2D.818\x200\x2D1.553\x2D.498\x2D1.857\x2D1.257z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Ccircle\x20cx\x3D\x2222\x22\x20cy\x3D\x2219\x22\x20r\x3D\x229\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M32\x2011h4\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-calendar\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M41\x2043H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V6c0\x2D1.105.895\x2D2\x202\x2D2h38c1.105\x200\x202\x20.895\x202\x202v35c0\x201.105\x2D.895\x202\x2D2\x202zM1\x2015h42M9\x200v8M35\x200v8\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M5\x2023h4v\x2D4M12\x2023h4v\x2D4M19\x2023h4v\x2D4M26\x2023h4v\x2D4M33\x2023h4v\x2D4M5\x2030h4v\x2D4M12\x2030h4v\x2D4M19\x2030h4v\x2D4M26\x2030h4v\x2D4M33\x2030h4v\x2D4M5\x2037h4v\x2D4M12\x2037h4v\x2D4M19\x2037h4v\x2D4M26\x2037h4v\x2D4M33\x2037h4v\x2D4\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-calendar-blank\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M41\x2043H3c\x2D1.105\x200\x2D2\x2D.895\x2D2\x2D2V6c0\x2D1.105.895\x2D2\x202\x2D2h38c1.105\x200\x202\x20.895\x202\x202v35c0\x201.105\x2D.895\x202\x2D2\x202zM1\x2015h42M9\x200v8M35\x200v8\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-basket\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2043\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M20\x2016V1h4v15M36.18\x2042H7.82c\x2D.477\x200\x2D.887\x2D.336\x2D.98\x2D.804L3\x2022h38l\x2D3.84\x2019.196c\x2D.093.468\x2D.503.804\x2D.98.804zM42\x2022H2c\x2D.552\x200\x2D1\x2D.448\x2D1\x2D1v\x2D4c0\x2D.552.448\x2D1\x201\x2D1h40c.552\x200\x201\x20.448\x201\x201v4c0\x20.552\x2D.448\x201\x2D1\x201z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-bag\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2039.797\x2044\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M11.9\x2012V9c0\x2D4.418\x203.58\x2D8\x208\x2D8\x204.417\x200\x208\x203.582\x208\x208v3M34.083\x2043H5.713c\x2D1.03\x200\x2D1.89\x2D.782\x2D1.99\x2D1.807L1.005\x2013.096C.948\x2012.51\x201.41\x2012\x202\x2012h35.797c.59\x200\x201.052.51.995\x201.096l\x2D2.72\x2028.096c\x2D.098\x201.026\x2D.96\x201.808\x2D1.99\x201.808z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-app-window\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2038\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x2035V3c0\x2D1.1.9\x2D2\x202\x2D2h38c1.1\x200\x202\x20.9\x202\x202v32c0\x201.1\x2D.9\x202\x2D2\x202H3c\x2D1.1\x200\x2D2\x2D.9\x2D2\x2D2zM43\x209H1M4\x205h2M7\x205h2M10\x205h2\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol><symbol id=\"stroked-app-window-with-content\" class=\"glyph-svg stroked\" viewBox\x3D\x220\x200\x2044\x2038\x22>\x0D\x0A\x20\x20\x20\x20\x3Cg\x20class\x3D\x22line\x22\x20fill\x3D\x22none\x22\x20stroke\x3D\x22\x23000\x22\x20stroke\x2Dwidth\x3D\x222\x22\x20stroke\x2Dmiterlimit\x3D\x2210\x22\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M1\x2035V3c0\x2D1.1.9\x2D2\x202\x2D2h38c1.1\x200\x202\x20.9\x202\x202v32c0\x201.1\x2D.9\x202\x2D2\x202H3c\x2D1.1\x200\x2D2\x2D.9\x2D2\x2D2zM43\x209H1M4\x205h2M7\x205h2M10\x205h2M20\x2024h20M20\x2028h20M20\x2032h20\x22\x20stroke\x2Dlinejoin\x3D\x22round\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x3Cpath\x20d\x3D\x22M5\x2013h34.008v7H5zM5\x2024h12v8H5z\x22\x2F\x3E\x0D\x0A\x20\x20\x20\x20\x3C\x2Fg\x3E\x0D\x0A</symbol></defs></svg>';function out(){document.write( icons );document.write( styles );document.close();}var styles = '\x3Cstyle\x20id\x3D\x22glyphs\x2Dstyle\x22\x20type\x3D\x22text\x2Fcss\x22\x3E\x0A.glyph\x7B\x0A\x09fill\x3AcurrentColor\x3B\x0A\x09display\x3Ainline\x2Dblock\x3B\x0A\x09margin\x2Dleft\x3Aauto\x3B\x0A\x09margin\x2Dright\x3Aauto\x3B\x0A\x09position\x3Arelative\x3B\x0A\x09text\x2Dalign\x3Acenter\x3B\x0A\x09vertical\x2Dalign\x3Amiddle\x3B\x0A\x09width\x3A70\x25\x3B\x0A\x09height\x3A70\x25\x3B\x0A\x7D\x0A\x0A.glyph.sm\x7Bwidth\x3A30\x25\x3Bheight\x3A30\x25\x3B\x7D\x0A.glyph.md\x7Bwidth\x3A50\x25\x3Bheight\x3A50\x25\x3B\x7D\x0A.glyph.lg\x7Bheight\x3A100\x25\x3Bwidth\x3A100\x25\x3B\x7D\x0A.glyph\x2Dsvg\x7Bwidth\x3A100\x25\x3Bheight\x3A100\x25\x3B\x7D\x0A.glyph\x2Dsvg\x20.fill\x7Bfill\x3Ainherit\x3B\x7D\x0A.glyph\x2Dsvg\x20.line\x7Bstroke\x3AcurrentColor\x3Bstroke\x2Dwidth\x3Ainherit\x3B\x7D\x0A.glyph.spin\x7Banimation\x3A\x20spin\x201s\x20linear\x20infinite\x3B\x7D\x0A\x0A\x40\x2Dwebkit\x2Dkeyframes\x20spin\x20\x7B\x0A\x09from\x20\x7B\x20transform\x3Arotate\x280deg\x29\x3B\x20\x7D\x0A\x09to\x20\x7B\x20transform\x3Arotate\x28360deg\x29\x3B\x20\x7D\x0A\x7D\x0A\x40\x2Dmoz\x2Dkeyframes\x20spin\x20\x7B\x0A\x09from\x20\x7B\x20transform\x3Arotate\x280deg\x29\x3B\x20\x7D\x0A\x09to\x20\x7B\x20transform\x3Arotate\x28360deg\x29\x3B\x20\x7D\x0A\x7D\x0A\x40keyframes\x20spin\x20\x7B\x0A\x09from\x20\x7B\x20transform\x3Arotate\x280deg\x29\x3B\x20\x7D\x0A\x09to\x20\x7B\x20transform\x3Arotate\x28360deg\x29\x3B\x20\x7D\x0A\x7D\x0A\x3C\x2Fstyle\x3E';out();
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

////////////////////////////
// Menu utilizatori collapse
////////////////////////////
$(document).ready(function() {

	var utilizatori = $.cookie('utilizatori');
	var utilizatori_icon = $(this).find('#utilizatoriCollapse i:first');

	$('ul.nav li.parent a#utilizatoriCollapse').click(function() {

		// $(this).find('em:first').toggleClass("fa-chevron-down");
		utilizatori_icon.toggleClass("fa-chevron-down");

		if(utilizatori != null) {
			$.removeCookie('utilizatori', { path: '/' });
		} else {
			$.cookie('utilizatori', 'collapsed', { expires: 7, path: '/' });
		}
	});

	utilizatori_icon.addClass("fa-chevron-right");
	
	if(utilizatori != null) {
		utilizatori_icon.addClass("fa-chevron-right");
	} else {
		utilizatori_icon.addClass("fa-chevron-down");
	}
});
//# sourceMappingURL=backend.js.map
