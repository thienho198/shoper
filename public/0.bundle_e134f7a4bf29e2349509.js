(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/react-fast-compare/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-fast-compare/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (((error.message || '').match(/stack|recursion/i))) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/react-helmet/es/Helmet.js":
/*!************************************************!*\
  !*** ./node_modules/react-helmet/es/Helmet.js ***!
  \************************************************/
/*! exports provided: default, Helmet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Helmet", function() { return HelmetExport; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-side-effect */ "./node_modules/react-side-effect/lib/index.js");
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_side_effect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-fast-compare */ "./node_modules/react-fast-compare/index.js");
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_4__);






var ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src",
    TARGET: "target"
};

var REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = "data-react-helmet";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
        bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case ATTRIBUTE_NAMES.BODY:
        case ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            classCallCheck(this, HelmetWrapper);
            return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default()(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case TAG_NAMES.SCRIPT:
                case TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _babelHelpers$extends;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _babelHelpers$extends2, _babelHelpers$extends3;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));

                case TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _babelHelpers$extends4;

                newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (true) {
                if (!VALID_TAG_NAMES.some(function (name) {
                    return child.type === name;
                })) {
                    if (typeof child.type === "function") {
                        return warn("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                    }

                    return warn("Only elements types " + VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
                }

                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                    return typeof nestedChild !== "string";
                }))) {
                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
                }
            }

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            react__WEBPACK_IMPORTED_MODULE_3___default.a.Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = convertReactPropstoHtmlAttributes(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case TAG_NAMES.LINK:
                    case TAG_NAMES.META:
                    case TAG_NAMES.NOSCRIPT:
                    case TAG_NAMES.SCRIPT:
                    case TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, newProps);
        };

        createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Object} bodyAttributes: {"className": "root"}
             * @param {String} defaultTitle: "Default Title"
             * @param {Boolean} defer: true
             * @param {Boolean} encodeSpecialCharacters: true
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
             * @param {String} title: "Title"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {String} titleTemplate: "MySite.com - %s"
             */
            set: function set$$1(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);
        return HelmetWrapper;
    }(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component), _class.propTypes = {
        base: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
        bodyAttributes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
        children: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node]),
        defaultTitle: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
        defer: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
        encodeSpecialCharacters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
        htmlAttributes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
        link: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
        meta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
        noscript: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
        onChangeClientState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
        script: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
        style: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
        title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
        titleAttributes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
        titleTemplate: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = react_side_effect__WEBPACK_IMPORTED_MODULE_1___default()(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

/* harmony default export */ __webpack_exports__["default"] = (HelmetExport);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/react-side-effect/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-side-effect/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = /*#__PURE__*/function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it
      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return /*#__PURE__*/React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.PureComponent);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLy8vLy8vLy8vLy8vLi9ub2RlX21vZHVsZXMvcmVhY3QtZmFzdC1jb21wYXJlL2luZGV4LmpzIiwid2VicGFjazovLy8vLy8vLy8vLy8vLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1oZWxtZXQvZXMvSGVsbWV0LmpzIiwid2VicGFjazovLy8vLy8vLy8vLy8vLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1zaWRlLWVmZmVjdC9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7O0FBRUEsd0JBQXdCLHdEQUFjOztBQUV0QztBQUNBOztBQUVlLDJFQUFZLEVBQUM7QUFDTTs7Ozs7Ozs7Ozs7Ozs7QUNsNUJyQjs7QUFFYiwrQkFBK0IsaUZBQWlGOztBQUVoSCxZQUFZLG1CQUFPLENBQUMsNENBQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiIwLmJ1bmRsZV9lMTM0ZjdhNGJmMjllMjM0OTUwOS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBNYXA6cmVhZG9ubHksIFNldDpyZWFkb25seSwgQXJyYXlCdWZmZXI6cmVhZG9ubHkgKi9cblxudmFyIGhhc0VsZW1lbnRUeXBlID0gdHlwZW9mIEVsZW1lbnQgIT09ICd1bmRlZmluZWQnO1xudmFyIGhhc01hcCA9IHR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbic7XG52YXIgaGFzU2V0ID0gdHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJztcbnZhciBoYXNBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiAhIUFycmF5QnVmZmVyLmlzVmlldztcblxuLy8gTm90ZTogV2UgKipkb24ndCoqIG5lZWQgYGVudkhhc0JpZ0ludDY0QXJyYXlgIGluIGZkZSBlczYvaW5kZXguanNcblxuZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICAvLyBTVEFSVDogZmFzdC1kZWVwLWVxdWFsIGVzNi9pbmRleC5qcyAzLjEuMVxuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIGlmIChhLmNvbnN0cnVjdG9yICE9PSBiLmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgbGVuZ3RoLCBpLCBrZXlzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gU1RBUlQ6IE1vZGlmaWNhdGlvbnM6XG4gICAgLy8gMS4gRXh0cmEgYGhhczxUeXBlPiAmJmAgaGVscGVycyBpbiBpbml0aWFsIGNvbmRpdGlvbiBhbGxvdyBlczYgY29kZVxuICAgIC8vICAgIHRvIGNvLWV4aXN0IHdpdGggZXM1LlxuICAgIC8vIDIuIFJlcGxhY2UgYGZvciBvZmAgd2l0aCBlczUgY29tcGxpYW50IGl0ZXJhdGlvbiB1c2luZyBgZm9yYC5cbiAgICAvLyAgICBCYXNpY2FsbHksIHRha2U6XG4gICAgLy9cbiAgICAvLyAgICBgYGBqc1xuICAgIC8vICAgIGZvciAoaSBvZiBhLmVudHJpZXMoKSlcbiAgICAvLyAgICAgIGlmICghYi5oYXMoaVswXSkpIHJldHVybiBmYWxzZTtcbiAgICAvLyAgICBgYGBcbiAgICAvL1xuICAgIC8vICAgIC4uLiBhbmQgY29udmVydCB0bzpcbiAgICAvL1xuICAgIC8vICAgIGBgYGpzXG4gICAgLy8gICAgaXQgPSBhLmVudHJpZXMoKTtcbiAgICAvLyAgICB3aGlsZSAoIShpID0gaXQubmV4dCgpKS5kb25lKVxuICAgIC8vICAgICAgaWYgKCFiLmhhcyhpLnZhbHVlWzBdKSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vICAgIGBgYFxuICAgIC8vXG4gICAgLy8gICAgKipOb3RlKio6IGBpYCBhY2Nlc3Mgc3dpdGNoZXMgdG8gYGkudmFsdWVgLlxuICAgIHZhciBpdDtcbiAgICBpZiAoaGFzTWFwICYmIChhIGluc3RhbmNlb2YgTWFwKSAmJiAoYiBpbnN0YW5jZW9mIE1hcCkpIHtcbiAgICAgIGlmIChhLnNpemUgIT09IGIuc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaXQgPSBhLmVudHJpZXMoKTtcbiAgICAgIHdoaWxlICghKGkgPSBpdC5uZXh0KCkpLmRvbmUpXG4gICAgICAgIGlmICghYi5oYXMoaS52YWx1ZVswXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGl0ID0gYS5lbnRyaWVzKCk7XG4gICAgICB3aGlsZSAoIShpID0gaXQubmV4dCgpKS5kb25lKVxuICAgICAgICBpZiAoIWVxdWFsKGkudmFsdWVbMV0sIGIuZ2V0KGkudmFsdWVbMF0pKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGhhc1NldCAmJiAoYSBpbnN0YW5jZW9mIFNldCkgJiYgKGIgaW5zdGFuY2VvZiBTZXQpKSB7XG4gICAgICBpZiAoYS5zaXplICE9PSBiLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGl0ID0gYS5lbnRyaWVzKCk7XG4gICAgICB3aGlsZSAoIShpID0gaXQubmV4dCgpKS5kb25lKVxuICAgICAgICBpZiAoIWIuaGFzKGkudmFsdWVbMF0pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gRU5EOiBNb2RpZmljYXRpb25zXG5cbiAgICBpZiAoaGFzQXJyYXlCdWZmZXIgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KGEpICYmIEFycmF5QnVmZmVyLmlzVmlldyhiKSkge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYS5jb25zdHJ1Y3RvciA9PT0gUmVnRXhwKSByZXR1cm4gYS5zb3VyY2UgPT09IGIuc291cmNlICYmIGEuZmxhZ3MgPT09IGIuZmxhZ3M7XG4gICAgaWYgKGEudmFsdWVPZiAhPT0gT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mKSByZXR1cm4gYS52YWx1ZU9mKCkgPT09IGIudmFsdWVPZigpO1xuICAgIGlmIChhLnRvU3RyaW5nICE9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKSByZXR1cm4gYS50b1N0cmluZygpID09PSBiLnRvU3RyaW5nKCk7XG5cbiAgICBrZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCAhPT0gT2JqZWN0LmtleXMoYikubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIEVORDogZmFzdC1kZWVwLWVxdWFsXG5cbiAgICAvLyBTVEFSVDogcmVhY3QtZmFzdC1jb21wYXJlXG4gICAgLy8gY3VzdG9tIGhhbmRsaW5nIGZvciBET00gZWxlbWVudHNcbiAgICBpZiAoaGFzRWxlbWVudFR5cGUgJiYgYSBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIGN1c3RvbSBoYW5kbGluZyBmb3IgUmVhY3QvUHJlYWN0XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBpZiAoKGtleXNbaV0gPT09ICdfb3duZXInIHx8IGtleXNbaV0gPT09ICdfX3YnIHx8IGtleXNbaV0gPT09ICdfX28nKSAmJiBhLiQkdHlwZW9mKSB7XG4gICAgICAgIC8vIFJlYWN0LXNwZWNpZmljOiBhdm9pZCB0cmF2ZXJzaW5nIFJlYWN0IGVsZW1lbnRzJyBfb3duZXJcbiAgICAgICAgLy8gUHJlYWN0LXNwZWNpZmljOiBhdm9pZCB0cmF2ZXJzaW5nIFByZWFjdCBlbGVtZW50cycgX192IGFuZCBfX29cbiAgICAgICAgLy8gICAgX192ID0gJF9vcmlnaW5hbCAvICRfdm5vZGVcbiAgICAgICAgLy8gICAgX19vID0gJF9vd25lclxuICAgICAgICAvLyBUaGVzZSBwcm9wZXJ0aWVzIGNvbnRhaW4gY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgYXJlIG5vdCBuZWVkZWQgd2hlblxuICAgICAgICAvLyBjb21wYXJpbmcgdGhlIGFjdHVhbCBlbGVtZW50cyAoYW5kIG5vdCB0aGVpciBvd25lcnMpXG4gICAgICAgIC8vIC4kJHR5cGVvZiBhbmQgLl9zdG9yZSBvbiBqdXN0IHJlYXNvbmFibGUgbWFya2VycyBvZiBlbGVtZW50c1xuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGwgb3RoZXIgcHJvcGVydGllcyBzaG91bGQgYmUgdHJhdmVyc2VkIGFzIHVzdWFsXG4gICAgICBpZiAoIWVxdWFsKGFba2V5c1tpXV0sIGJba2V5c1tpXV0pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEVORDogcmVhY3QtZmFzdC1jb21wYXJlXG5cbiAgICAvLyBTVEFSVDogZmFzdC1kZWVwLWVxdWFsXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gYSAhPT0gYSAmJiBiICE9PSBiO1xufVxuLy8gZW5kIGZhc3QtZGVlcC1lcXVhbFxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzRXF1YWwoYSwgYikge1xuICB0cnkge1xuICAgIHJldHVybiBlcXVhbChhLCBiKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoKChlcnJvci5tZXNzYWdlIHx8ICcnKS5tYXRjaCgvc3RhY2t8cmVjdXJzaW9uL2kpKSkge1xuICAgICAgLy8gd2FybiBvbiBjaXJjdWxhciByZWZlcmVuY2VzLCBkb24ndCBjcmFzaFxuICAgICAgLy8gYnJvd3NlcnMgZ2l2ZSB0aGlzIGRpZmZlcmVudCBlcnJvcnMgbmFtZSBhbmQgbWVzc2FnZXM6XG4gICAgICAvLyBjaHJvbWUvc2FmYXJpOiBcIlJhbmdlRXJyb3JcIiwgXCJNYXhpbXVtIGNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiXG4gICAgICAvLyBmaXJlZm94OiBcIkludGVybmFsRXJyb3JcIiwgdG9vIG11Y2ggcmVjdXJzaW9uXCJcbiAgICAgIC8vIGVkZ2U6IFwiRXJyb3JcIiwgXCJPdXQgb2Ygc3RhY2sgc3BhY2VcIlxuICAgICAgY29uc29sZS53YXJuKCdyZWFjdC1mYXN0LWNvbXBhcmUgY2Fubm90IGhhbmRsZSBjaXJjdWxhciByZWZzJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIHNvbWUgb3RoZXIgZXJyb3IuIHdlIHNob3VsZCBkZWZpbml0ZWx5IGtub3cgYWJvdXQgdGhlc2VcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcbiIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFNpZGVFZmZlY3QgZnJvbSAncmVhY3Qtc2lkZS1lZmZlY3QnO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAncmVhY3QtZmFzdC1jb21wYXJlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgb2JqZWN0QXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuXG52YXIgQVRUUklCVVRFX05BTUVTID0ge1xuICAgIEJPRFk6IFwiYm9keUF0dHJpYnV0ZXNcIixcbiAgICBIVE1MOiBcImh0bWxBdHRyaWJ1dGVzXCIsXG4gICAgVElUTEU6IFwidGl0bGVBdHRyaWJ1dGVzXCJcbn07XG5cbnZhciBUQUdfTkFNRVMgPSB7XG4gICAgQkFTRTogXCJiYXNlXCIsXG4gICAgQk9EWTogXCJib2R5XCIsXG4gICAgSEVBRDogXCJoZWFkXCIsXG4gICAgSFRNTDogXCJodG1sXCIsXG4gICAgTElOSzogXCJsaW5rXCIsXG4gICAgTUVUQTogXCJtZXRhXCIsXG4gICAgTk9TQ1JJUFQ6IFwibm9zY3JpcHRcIixcbiAgICBTQ1JJUFQ6IFwic2NyaXB0XCIsXG4gICAgU1RZTEU6IFwic3R5bGVcIixcbiAgICBUSVRMRTogXCJ0aXRsZVwiXG59O1xuXG52YXIgVkFMSURfVEFHX05BTUVTID0gT2JqZWN0LmtleXMoVEFHX05BTUVTKS5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gVEFHX05BTUVTW25hbWVdO1xufSk7XG5cbnZhciBUQUdfUFJPUEVSVElFUyA9IHtcbiAgICBDSEFSU0VUOiBcImNoYXJzZXRcIixcbiAgICBDU1NfVEVYVDogXCJjc3NUZXh0XCIsXG4gICAgSFJFRjogXCJocmVmXCIsXG4gICAgSFRUUEVRVUlWOiBcImh0dHAtZXF1aXZcIixcbiAgICBJTk5FUl9IVE1MOiBcImlubmVySFRNTFwiLFxuICAgIElURU1fUFJPUDogXCJpdGVtcHJvcFwiLFxuICAgIE5BTUU6IFwibmFtZVwiLFxuICAgIFBST1BFUlRZOiBcInByb3BlcnR5XCIsXG4gICAgUkVMOiBcInJlbFwiLFxuICAgIFNSQzogXCJzcmNcIixcbiAgICBUQVJHRVQ6IFwidGFyZ2V0XCJcbn07XG5cbnZhciBSRUFDVF9UQUdfTUFQID0ge1xuICAgIGFjY2Vzc2tleTogXCJhY2Nlc3NLZXlcIixcbiAgICBjaGFyc2V0OiBcImNoYXJTZXRcIixcbiAgICBjbGFzczogXCJjbGFzc05hbWVcIixcbiAgICBjb250ZW50ZWRpdGFibGU6IFwiY29udGVudEVkaXRhYmxlXCIsXG4gICAgY29udGV4dG1lbnU6IFwiY29udGV4dE1lbnVcIixcbiAgICBcImh0dHAtZXF1aXZcIjogXCJodHRwRXF1aXZcIixcbiAgICBpdGVtcHJvcDogXCJpdGVtUHJvcFwiLFxuICAgIHRhYmluZGV4OiBcInRhYkluZGV4XCJcbn07XG5cbnZhciBIRUxNRVRfUFJPUFMgPSB7XG4gICAgREVGQVVMVF9USVRMRTogXCJkZWZhdWx0VGl0bGVcIixcbiAgICBERUZFUjogXCJkZWZlclwiLFxuICAgIEVOQ09ERV9TUEVDSUFMX0NIQVJBQ1RFUlM6IFwiZW5jb2RlU3BlY2lhbENoYXJhY3RlcnNcIixcbiAgICBPTl9DSEFOR0VfQ0xJRU5UX1NUQVRFOiBcIm9uQ2hhbmdlQ2xpZW50U3RhdGVcIixcbiAgICBUSVRMRV9URU1QTEFURTogXCJ0aXRsZVRlbXBsYXRlXCJcbn07XG5cbnZhciBIVE1MX1RBR19NQVAgPSBPYmplY3Qua2V5cyhSRUFDVF9UQUdfTUFQKS5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgb2JqW1JFQUNUX1RBR19NQVBba2V5XV0gPSBrZXk7XG4gICAgcmV0dXJuIG9iajtcbn0sIHt9KTtcblxudmFyIFNFTEZfQ0xPU0lOR19UQUdTID0gW1RBR19OQU1FUy5OT1NDUklQVCwgVEFHX05BTUVTLlNDUklQVCwgVEFHX05BTUVTLlNUWUxFXTtcblxudmFyIEhFTE1FVF9BVFRSSUJVVEUgPSBcImRhdGEtcmVhY3QtaGVsbWV0XCI7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlO1xuICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxudmFyIGVuY29kZVNwZWNpYWxDaGFyYWN0ZXJzID0gZnVuY3Rpb24gZW5jb2RlU3BlY2lhbENoYXJhY3RlcnMoc3RyKSB7XG4gICAgdmFyIGVuY29kZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgIGlmIChlbmNvZGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoc3RyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpLnJlcGxhY2UoLycvZywgXCImI3gyNztcIik7XG59O1xuXG52YXIgZ2V0VGl0bGVGcm9tUHJvcHNMaXN0ID0gZnVuY3Rpb24gZ2V0VGl0bGVGcm9tUHJvcHNMaXN0KHByb3BzTGlzdCkge1xuICAgIHZhciBpbm5lcm1vc3RUaXRsZSA9IGdldElubmVybW9zdFByb3BlcnR5KHByb3BzTGlzdCwgVEFHX05BTUVTLlRJVExFKTtcbiAgICB2YXIgaW5uZXJtb3N0VGVtcGxhdGUgPSBnZXRJbm5lcm1vc3RQcm9wZXJ0eShwcm9wc0xpc3QsIEhFTE1FVF9QUk9QUy5USVRMRV9URU1QTEFURSk7XG5cbiAgICBpZiAoaW5uZXJtb3N0VGVtcGxhdGUgJiYgaW5uZXJtb3N0VGl0bGUpIHtcbiAgICAgICAgLy8gdXNlIGZ1bmN0aW9uIGFyZyB0byBhdm9pZCBuZWVkIHRvIGVzY2FwZSAkIGNoYXJhY3RlcnNcbiAgICAgICAgcmV0dXJuIGlubmVybW9zdFRlbXBsYXRlLnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGlubmVybW9zdFRpdGxlKSA/IGlubmVybW9zdFRpdGxlLmpvaW4oXCJcIikgOiBpbm5lcm1vc3RUaXRsZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGlubmVybW9zdERlZmF1bHRUaXRsZSA9IGdldElubmVybW9zdFByb3BlcnR5KHByb3BzTGlzdCwgSEVMTUVUX1BST1BTLkRFRkFVTFRfVElUTEUpO1xuXG4gICAgcmV0dXJuIGlubmVybW9zdFRpdGxlIHx8IGlubmVybW9zdERlZmF1bHRUaXRsZSB8fCB1bmRlZmluZWQ7XG59O1xuXG52YXIgZ2V0T25DaGFuZ2VDbGllbnRTdGF0ZSA9IGZ1bmN0aW9uIGdldE9uQ2hhbmdlQ2xpZW50U3RhdGUocHJvcHNMaXN0KSB7XG4gICAgcmV0dXJuIGdldElubmVybW9zdFByb3BlcnR5KHByb3BzTGlzdCwgSEVMTUVUX1BST1BTLk9OX0NIQU5HRV9DTElFTlRfU1RBVEUpIHx8IGZ1bmN0aW9uICgpIHt9O1xufTtcblxudmFyIGdldEF0dHJpYnV0ZXNGcm9tUHJvcHNMaXN0ID0gZnVuY3Rpb24gZ2V0QXR0cmlidXRlc0Zyb21Qcm9wc0xpc3QodGFnVHlwZSwgcHJvcHNMaXN0KSB7XG4gICAgcmV0dXJuIHByb3BzTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvcHNbdGFnVHlwZV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgfSkubWFwKGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICByZXR1cm4gcHJvcHNbdGFnVHlwZV07XG4gICAgfSkucmVkdWNlKGZ1bmN0aW9uICh0YWdBdHRycywgY3VycmVudCkge1xuICAgICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHRhZ0F0dHJzLCBjdXJyZW50KTtcbiAgICB9LCB7fSk7XG59O1xuXG52YXIgZ2V0QmFzZVRhZ0Zyb21Qcm9wc0xpc3QgPSBmdW5jdGlvbiBnZXRCYXNlVGFnRnJvbVByb3BzTGlzdChwcmltYXJ5QXR0cmlidXRlcywgcHJvcHNMaXN0KSB7XG4gICAgcmV0dXJuIHByb3BzTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvcHNbVEFHX05BTUVTLkJBU0VdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIH0pLm1hcChmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BzW1RBR19OQU1FUy5CQVNFXTtcbiAgICB9KS5yZXZlcnNlKCkucmVkdWNlKGZ1bmN0aW9uIChpbm5lcm1vc3RCYXNlVGFnLCB0YWcpIHtcbiAgICAgICAgaWYgKCFpbm5lcm1vc3RCYXNlVGFnLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0YWcpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlS2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgbG93ZXJDYXNlQXR0cmlidXRlS2V5ID0gYXR0cmlidXRlS2V5LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJpbWFyeUF0dHJpYnV0ZXMuaW5kZXhPZihsb3dlckNhc2VBdHRyaWJ1dGVLZXkpICE9PSAtMSAmJiB0YWdbbG93ZXJDYXNlQXR0cmlidXRlS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5uZXJtb3N0QmFzZVRhZy5jb25jYXQodGFnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5uZXJtb3N0QmFzZVRhZztcbiAgICB9LCBbXSk7XG59O1xuXG52YXIgZ2V0VGFnc0Zyb21Qcm9wc0xpc3QgPSBmdW5jdGlvbiBnZXRUYWdzRnJvbVByb3BzTGlzdCh0YWdOYW1lLCBwcmltYXJ5QXR0cmlidXRlcywgcHJvcHNMaXN0KSB7XG4gICAgLy8gQ2FsY3VsYXRlIGxpc3Qgb2YgdGFncywgZ2l2aW5nIHByaW9yaXR5IGlubmVybW9zdCBjb21wb25lbnQgKGVuZCBvZiB0aGUgcHJvcHNsaXN0KVxuICAgIHZhciBhcHByb3ZlZFNlZW5UYWdzID0ge307XG5cbiAgICByZXR1cm4gcHJvcHNMaXN0LmZpbHRlcihmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHNbdGFnTmFtZV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHByb3BzW3RhZ05hbWVdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB3YXJuKFwiSGVsbWV0OiBcIiArIHRhZ05hbWUgKyBcIiBzaG91bGQgYmUgb2YgdHlwZSBcXFwiQXJyYXlcXFwiLiBJbnN0ZWFkIGZvdW5kIHR5cGUgXFxcIlwiICsgX3R5cGVvZihwcm9wc1t0YWdOYW1lXSkgKyBcIlxcXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pLm1hcChmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BzW3RhZ05hbWVdO1xuICAgIH0pLnJldmVyc2UoKS5yZWR1Y2UoZnVuY3Rpb24gKGFwcHJvdmVkVGFncywgaW5zdGFuY2VUYWdzKSB7XG4gICAgICAgIHZhciBpbnN0YW5jZVNlZW5UYWdzID0ge307XG5cbiAgICAgICAgaW5zdGFuY2VUYWdzLmZpbHRlcihmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgICB2YXIgcHJpbWFyeUF0dHJpYnV0ZUtleSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGFnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVLZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBsb3dlckNhc2VBdHRyaWJ1dGVLZXkgPSBhdHRyaWJ1dGVLZXkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIFNwZWNpYWwgcnVsZSB3aXRoIGxpbmsgdGFncywgc2luY2UgcmVsIGFuZCBocmVmIGFyZSBib3RoIHByaW1hcnkgdGFncywgcmVsIHRha2VzIHByaW9yaXR5XG4gICAgICAgICAgICAgICAgaWYgKHByaW1hcnlBdHRyaWJ1dGVzLmluZGV4T2YobG93ZXJDYXNlQXR0cmlidXRlS2V5KSAhPT0gLTEgJiYgIShwcmltYXJ5QXR0cmlidXRlS2V5ID09PSBUQUdfUFJPUEVSVElFUy5SRUwgJiYgdGFnW3ByaW1hcnlBdHRyaWJ1dGVLZXldLnRvTG93ZXJDYXNlKCkgPT09IFwiY2Fub25pY2FsXCIpICYmICEobG93ZXJDYXNlQXR0cmlidXRlS2V5ID09PSBUQUdfUFJPUEVSVElFUy5SRUwgJiYgdGFnW2xvd2VyQ2FzZUF0dHJpYnV0ZUtleV0udG9Mb3dlckNhc2UoKSA9PT0gXCJzdHlsZXNoZWV0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlBdHRyaWJ1dGVLZXkgPSBsb3dlckNhc2VBdHRyaWJ1dGVLZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgaW5uZXJIVE1MIHdoaWNoIGRvZXNuJ3Qgd29yayBsb3dlcmNhc2VkXG4gICAgICAgICAgICAgICAgaWYgKHByaW1hcnlBdHRyaWJ1dGVzLmluZGV4T2YoYXR0cmlidXRlS2V5KSAhPT0gLTEgJiYgKGF0dHJpYnV0ZUtleSA9PT0gVEFHX1BST1BFUlRJRVMuSU5ORVJfSFRNTCB8fCBhdHRyaWJ1dGVLZXkgPT09IFRBR19QUk9QRVJUSUVTLkNTU19URVhUIHx8IGF0dHJpYnV0ZUtleSA9PT0gVEFHX1BST1BFUlRJRVMuSVRFTV9QUk9QKSkge1xuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QXR0cmlidXRlS2V5ID0gYXR0cmlidXRlS2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFwcmltYXJ5QXR0cmlidXRlS2V5IHx8ICF0YWdbcHJpbWFyeUF0dHJpYnV0ZUtleV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRhZ1twcmltYXJ5QXR0cmlidXRlS2V5XS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZiAoIWFwcHJvdmVkU2VlblRhZ3NbcHJpbWFyeUF0dHJpYnV0ZUtleV0pIHtcbiAgICAgICAgICAgICAgICBhcHByb3ZlZFNlZW5UYWdzW3ByaW1hcnlBdHRyaWJ1dGVLZXldID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaW5zdGFuY2VTZWVuVGFnc1twcmltYXJ5QXR0cmlidXRlS2V5XSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU2VlblRhZ3NbcHJpbWFyeUF0dHJpYnV0ZUtleV0gPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFhcHByb3ZlZFNlZW5UYWdzW3ByaW1hcnlBdHRyaWJ1dGVLZXldW3ZhbHVlXSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU2VlblRhZ3NbcHJpbWFyeUF0dHJpYnV0ZUtleV1bdmFsdWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KS5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgICByZXR1cm4gYXBwcm92ZWRUYWdzLnB1c2godGFnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHNlZW4gdGFncyB3aXRoIHRhZ3MgZnJvbSB0aGlzIGluc3RhbmNlXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoaW5zdGFuY2VTZWVuVGFncyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZUtleSA9IGtleXNbaV07XG4gICAgICAgICAgICB2YXIgdGFnVW5pb24gPSBvYmplY3RBc3NpZ24oe30sIGFwcHJvdmVkU2VlblRhZ3NbYXR0cmlidXRlS2V5XSwgaW5zdGFuY2VTZWVuVGFnc1thdHRyaWJ1dGVLZXldKTtcblxuICAgICAgICAgICAgYXBwcm92ZWRTZWVuVGFnc1thdHRyaWJ1dGVLZXldID0gdGFnVW5pb247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXBwcm92ZWRUYWdzO1xuICAgIH0sIFtdKS5yZXZlcnNlKCk7XG59O1xuXG52YXIgZ2V0SW5uZXJtb3N0UHJvcGVydHkgPSBmdW5jdGlvbiBnZXRJbm5lcm1vc3RQcm9wZXJ0eShwcm9wc0xpc3QsIHByb3BlcnR5KSB7XG4gICAgZm9yICh2YXIgaSA9IHByb3BzTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgcHJvcHMgPSBwcm9wc0xpc3RbaV07XG5cbiAgICAgICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcblxudmFyIHJlZHVjZVByb3BzVG9TdGF0ZSA9IGZ1bmN0aW9uIHJlZHVjZVByb3BzVG9TdGF0ZShwcm9wc0xpc3QpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBiYXNlVGFnOiBnZXRCYXNlVGFnRnJvbVByb3BzTGlzdChbVEFHX1BST1BFUlRJRVMuSFJFRiwgVEFHX1BST1BFUlRJRVMuVEFSR0VUXSwgcHJvcHNMaXN0KSxcbiAgICAgICAgYm9keUF0dHJpYnV0ZXM6IGdldEF0dHJpYnV0ZXNGcm9tUHJvcHNMaXN0KEFUVFJJQlVURV9OQU1FUy5CT0RZLCBwcm9wc0xpc3QpLFxuICAgICAgICBkZWZlcjogZ2V0SW5uZXJtb3N0UHJvcGVydHkocHJvcHNMaXN0LCBIRUxNRVRfUFJPUFMuREVGRVIpLFxuICAgICAgICBlbmNvZGU6IGdldElubmVybW9zdFByb3BlcnR5KHByb3BzTGlzdCwgSEVMTUVUX1BST1BTLkVOQ09ERV9TUEVDSUFMX0NIQVJBQ1RFUlMpLFxuICAgICAgICBodG1sQXR0cmlidXRlczogZ2V0QXR0cmlidXRlc0Zyb21Qcm9wc0xpc3QoQVRUUklCVVRFX05BTUVTLkhUTUwsIHByb3BzTGlzdCksXG4gICAgICAgIGxpbmtUYWdzOiBnZXRUYWdzRnJvbVByb3BzTGlzdChUQUdfTkFNRVMuTElOSywgW1RBR19QUk9QRVJUSUVTLlJFTCwgVEFHX1BST1BFUlRJRVMuSFJFRl0sIHByb3BzTGlzdCksXG4gICAgICAgIG1ldGFUYWdzOiBnZXRUYWdzRnJvbVByb3BzTGlzdChUQUdfTkFNRVMuTUVUQSwgW1RBR19QUk9QRVJUSUVTLk5BTUUsIFRBR19QUk9QRVJUSUVTLkNIQVJTRVQsIFRBR19QUk9QRVJUSUVTLkhUVFBFUVVJViwgVEFHX1BST1BFUlRJRVMuUFJPUEVSVFksIFRBR19QUk9QRVJUSUVTLklURU1fUFJPUF0sIHByb3BzTGlzdCksXG4gICAgICAgIG5vc2NyaXB0VGFnczogZ2V0VGFnc0Zyb21Qcm9wc0xpc3QoVEFHX05BTUVTLk5PU0NSSVBULCBbVEFHX1BST1BFUlRJRVMuSU5ORVJfSFRNTF0sIHByb3BzTGlzdCksXG4gICAgICAgIG9uQ2hhbmdlQ2xpZW50U3RhdGU6IGdldE9uQ2hhbmdlQ2xpZW50U3RhdGUocHJvcHNMaXN0KSxcbiAgICAgICAgc2NyaXB0VGFnczogZ2V0VGFnc0Zyb21Qcm9wc0xpc3QoVEFHX05BTUVTLlNDUklQVCwgW1RBR19QUk9QRVJUSUVTLlNSQywgVEFHX1BST1BFUlRJRVMuSU5ORVJfSFRNTF0sIHByb3BzTGlzdCksXG4gICAgICAgIHN0eWxlVGFnczogZ2V0VGFnc0Zyb21Qcm9wc0xpc3QoVEFHX05BTUVTLlNUWUxFLCBbVEFHX1BST1BFUlRJRVMuQ1NTX1RFWFRdLCBwcm9wc0xpc3QpLFxuICAgICAgICB0aXRsZTogZ2V0VGl0bGVGcm9tUHJvcHNMaXN0KHByb3BzTGlzdCksXG4gICAgICAgIHRpdGxlQXR0cmlidXRlczogZ2V0QXR0cmlidXRlc0Zyb21Qcm9wc0xpc3QoQVRUUklCVVRFX05BTUVTLlRJVExFLCBwcm9wc0xpc3QpXG4gICAgfTtcbn07XG5cbnZhciByYWZQb2x5ZmlsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2xvY2sgPSBEYXRlLm5vdygpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGlmIChjdXJyZW50VGltZSAtIGNsb2NrID4gMTYpIHtcbiAgICAgICAgICAgIGNsb2NrID0gY3VycmVudFRpbWU7XG4gICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50VGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByYWZQb2x5ZmlsbChjYWxsYmFjayk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH07XG59KCk7XG5cbnZhciBjYWZQb2x5ZmlsbCA9IGZ1bmN0aW9uIGNhZlBvbHlmaWxsKGlkKSB7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG59O1xuXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdykgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHJhZlBvbHlmaWxsIDogZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByYWZQb2x5ZmlsbDtcblxudmFyIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IGNhZlBvbHlmaWxsIDogZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IGNhZlBvbHlmaWxsO1xuXG52YXIgd2FybiA9IGZ1bmN0aW9uIHdhcm4obXNnKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiICYmIGNvbnNvbGUud2Fybihtc2cpO1xufTtcblxudmFyIF9oZWxtZXRDYWxsYmFjayA9IG51bGw7XG5cbnZhciBoYW5kbGVDbGllbnRTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUNsaWVudFN0YXRlQ2hhbmdlKG5ld1N0YXRlKSB7XG4gICAgaWYgKF9oZWxtZXRDYWxsYmFjaykge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShfaGVsbWV0Q2FsbGJhY2spO1xuICAgIH1cblxuICAgIGlmIChuZXdTdGF0ZS5kZWZlcikge1xuICAgICAgICBfaGVsbWV0Q2FsbGJhY2sgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29tbWl0VGFnQ2hhbmdlcyhuZXdTdGF0ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9oZWxtZXRDYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29tbWl0VGFnQ2hhbmdlcyhuZXdTdGF0ZSk7XG4gICAgICAgIF9oZWxtZXRDYWxsYmFjayA9IG51bGw7XG4gICAgfVxufTtcblxudmFyIGNvbW1pdFRhZ0NoYW5nZXMgPSBmdW5jdGlvbiBjb21taXRUYWdDaGFuZ2VzKG5ld1N0YXRlLCBjYikge1xuICAgIHZhciBiYXNlVGFnID0gbmV3U3RhdGUuYmFzZVRhZyxcbiAgICAgICAgYm9keUF0dHJpYnV0ZXMgPSBuZXdTdGF0ZS5ib2R5QXR0cmlidXRlcyxcbiAgICAgICAgaHRtbEF0dHJpYnV0ZXMgPSBuZXdTdGF0ZS5odG1sQXR0cmlidXRlcyxcbiAgICAgICAgbGlua1RhZ3MgPSBuZXdTdGF0ZS5saW5rVGFncyxcbiAgICAgICAgbWV0YVRhZ3MgPSBuZXdTdGF0ZS5tZXRhVGFncyxcbiAgICAgICAgbm9zY3JpcHRUYWdzID0gbmV3U3RhdGUubm9zY3JpcHRUYWdzLFxuICAgICAgICBvbkNoYW5nZUNsaWVudFN0YXRlID0gbmV3U3RhdGUub25DaGFuZ2VDbGllbnRTdGF0ZSxcbiAgICAgICAgc2NyaXB0VGFncyA9IG5ld1N0YXRlLnNjcmlwdFRhZ3MsXG4gICAgICAgIHN0eWxlVGFncyA9IG5ld1N0YXRlLnN0eWxlVGFncyxcbiAgICAgICAgdGl0bGUgPSBuZXdTdGF0ZS50aXRsZSxcbiAgICAgICAgdGl0bGVBdHRyaWJ1dGVzID0gbmV3U3RhdGUudGl0bGVBdHRyaWJ1dGVzO1xuXG4gICAgdXBkYXRlQXR0cmlidXRlcyhUQUdfTkFNRVMuQk9EWSwgYm9keUF0dHJpYnV0ZXMpO1xuICAgIHVwZGF0ZUF0dHJpYnV0ZXMoVEFHX05BTUVTLkhUTUwsIGh0bWxBdHRyaWJ1dGVzKTtcblxuICAgIHVwZGF0ZVRpdGxlKHRpdGxlLCB0aXRsZUF0dHJpYnV0ZXMpO1xuXG4gICAgdmFyIHRhZ1VwZGF0ZXMgPSB7XG4gICAgICAgIGJhc2VUYWc6IHVwZGF0ZVRhZ3MoVEFHX05BTUVTLkJBU0UsIGJhc2VUYWcpLFxuICAgICAgICBsaW5rVGFnczogdXBkYXRlVGFncyhUQUdfTkFNRVMuTElOSywgbGlua1RhZ3MpLFxuICAgICAgICBtZXRhVGFnczogdXBkYXRlVGFncyhUQUdfTkFNRVMuTUVUQSwgbWV0YVRhZ3MpLFxuICAgICAgICBub3NjcmlwdFRhZ3M6IHVwZGF0ZVRhZ3MoVEFHX05BTUVTLk5PU0NSSVBULCBub3NjcmlwdFRhZ3MpLFxuICAgICAgICBzY3JpcHRUYWdzOiB1cGRhdGVUYWdzKFRBR19OQU1FUy5TQ1JJUFQsIHNjcmlwdFRhZ3MpLFxuICAgICAgICBzdHlsZVRhZ3M6IHVwZGF0ZVRhZ3MoVEFHX05BTUVTLlNUWUxFLCBzdHlsZVRhZ3MpXG4gICAgfTtcblxuICAgIHZhciBhZGRlZFRhZ3MgPSB7fTtcbiAgICB2YXIgcmVtb3ZlZFRhZ3MgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKHRhZ1VwZGF0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHRhZ1R5cGUpIHtcbiAgICAgICAgdmFyIF90YWdVcGRhdGVzJHRhZ1R5cGUgPSB0YWdVcGRhdGVzW3RhZ1R5cGVdLFxuICAgICAgICAgICAgbmV3VGFncyA9IF90YWdVcGRhdGVzJHRhZ1R5cGUubmV3VGFncyxcbiAgICAgICAgICAgIG9sZFRhZ3MgPSBfdGFnVXBkYXRlcyR0YWdUeXBlLm9sZFRhZ3M7XG5cblxuICAgICAgICBpZiAobmV3VGFncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFkZGVkVGFnc1t0YWdUeXBlXSA9IG5ld1RhZ3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFRhZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZW1vdmVkVGFnc1t0YWdUeXBlXSA9IHRhZ1VwZGF0ZXNbdGFnVHlwZV0ub2xkVGFncztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2IgJiYgY2IoKTtcblxuICAgIG9uQ2hhbmdlQ2xpZW50U3RhdGUobmV3U3RhdGUsIGFkZGVkVGFncywgcmVtb3ZlZFRhZ3MpO1xufTtcblxudmFyIGZsYXR0ZW5BcnJheSA9IGZ1bmN0aW9uIGZsYXR0ZW5BcnJheShwb3NzaWJsZUFycmF5KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocG9zc2libGVBcnJheSkgPyBwb3NzaWJsZUFycmF5LmpvaW4oXCJcIikgOiBwb3NzaWJsZUFycmF5O1xufTtcblxudmFyIHVwZGF0ZVRpdGxlID0gZnVuY3Rpb24gdXBkYXRlVGl0bGUodGl0bGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBpZiAodHlwZW9mIHRpdGxlICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LnRpdGxlICE9PSB0aXRsZSkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IGZsYXR0ZW5BcnJheSh0aXRsZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQXR0cmlidXRlcyhUQUdfTkFNRVMuVElUTEUsIGF0dHJpYnV0ZXMpO1xufTtcblxudmFyIHVwZGF0ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVzKHRhZ05hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICB2YXIgZWxlbWVudFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpWzBdO1xuXG4gICAgaWYgKCFlbGVtZW50VGFnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaGVsbWV0QXR0cmlidXRlU3RyaW5nID0gZWxlbWVudFRhZy5nZXRBdHRyaWJ1dGUoSEVMTUVUX0FUVFJJQlVURSk7XG4gICAgdmFyIGhlbG1ldEF0dHJpYnV0ZXMgPSBoZWxtZXRBdHRyaWJ1dGVTdHJpbmcgPyBoZWxtZXRBdHRyaWJ1dGVTdHJpbmcuc3BsaXQoXCIsXCIpIDogW107XG4gICAgdmFyIGF0dHJpYnV0ZXNUb1JlbW92ZSA9IFtdLmNvbmNhdChoZWxtZXRBdHRyaWJ1dGVzKTtcbiAgICB2YXIgYXR0cmlidXRlS2V5cyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVLZXlzW2ldO1xuICAgICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgXCJcIjtcblxuICAgICAgICBpZiAoZWxlbWVudFRhZy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnRUYWcuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhlbG1ldEF0dHJpYnV0ZXMuaW5kZXhPZihhdHRyaWJ1dGUpID09PSAtMSkge1xuICAgICAgICAgICAgaGVsbWV0QXR0cmlidXRlcy5wdXNoKGF0dHJpYnV0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5kZXhUb1NhdmUgPSBhdHRyaWJ1dGVzVG9SZW1vdmUuaW5kZXhPZihhdHRyaWJ1dGUpO1xuICAgICAgICBpZiAoaW5kZXhUb1NhdmUgIT09IC0xKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzVG9SZW1vdmUuc3BsaWNlKGluZGV4VG9TYXZlLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gYXR0cmlidXRlc1RvUmVtb3ZlLmxlbmd0aCAtIDE7IF9pID49IDA7IF9pLS0pIHtcbiAgICAgICAgZWxlbWVudFRhZy5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlc1RvUmVtb3ZlW19pXSk7XG4gICAgfVxuXG4gICAgaWYgKGhlbG1ldEF0dHJpYnV0ZXMubGVuZ3RoID09PSBhdHRyaWJ1dGVzVG9SZW1vdmUubGVuZ3RoKSB7XG4gICAgICAgIGVsZW1lbnRUYWcucmVtb3ZlQXR0cmlidXRlKEhFTE1FVF9BVFRSSUJVVEUpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudFRhZy5nZXRBdHRyaWJ1dGUoSEVMTUVUX0FUVFJJQlVURSkgIT09IGF0dHJpYnV0ZUtleXMuam9pbihcIixcIikpIHtcbiAgICAgICAgZWxlbWVudFRhZy5zZXRBdHRyaWJ1dGUoSEVMTUVUX0FUVFJJQlVURSwgYXR0cmlidXRlS2V5cy5qb2luKFwiLFwiKSk7XG4gICAgfVxufTtcblxudmFyIHVwZGF0ZVRhZ3MgPSBmdW5jdGlvbiB1cGRhdGVUYWdzKHR5cGUsIHRhZ3MpIHtcbiAgICB2YXIgaGVhZEVsZW1lbnQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoVEFHX05BTUVTLkhFQUQpO1xuICAgIHZhciB0YWdOb2RlcyA9IGhlYWRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodHlwZSArIFwiW1wiICsgSEVMTUVUX0FUVFJJQlVURSArIFwiXVwiKTtcbiAgICB2YXIgb2xkVGFncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRhZ05vZGVzKTtcbiAgICB2YXIgbmV3VGFncyA9IFtdO1xuICAgIHZhciBpbmRleFRvRGVsZXRlID0gdm9pZCAwO1xuXG4gICAgaWYgKHRhZ3MgJiYgdGFncy5sZW5ndGgpIHtcbiAgICAgICAgdGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgIHZhciBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgYXR0cmlidXRlIGluIHRhZykge1xuICAgICAgICAgICAgICAgIGlmICh0YWcuaGFzT3duUHJvcGVydHkoYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlID09PSBUQUdfUFJPUEVSVElFUy5JTk5FUl9IVE1MKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdFbGVtZW50LmlubmVySFRNTCA9IHRhZy5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBUQUdfUFJPUEVSVElFUy5DU1NfVEVYVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gdGFnLmNzc1RleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGFnLmNzc1RleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHR5cGVvZiB0YWdbYXR0cmlidXRlXSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiXCIgOiB0YWdbYXR0cmlidXRlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShIRUxNRVRfQVRUUklCVVRFLCBcInRydWVcIik7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSBhIGR1cGxpY2F0ZSB0YWcgZnJvbSBkb21UYWdzdG9SZW1vdmUsIHNvIGl0IGlzbid0IGNsZWFyZWQuXG4gICAgICAgICAgICBpZiAob2xkVGFncy5zb21lKGZ1bmN0aW9uIChleGlzdGluZ1RhZywgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpbmRleFRvRGVsZXRlID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQuaXNFcXVhbE5vZGUoZXhpc3RpbmdUYWcpO1xuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICBvbGRUYWdzLnNwbGljZShpbmRleFRvRGVsZXRlLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VGFncy5wdXNoKG5ld0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbGRUYWdzLmZvckVhY2goZnVuY3Rpb24gKHRhZykge1xuICAgICAgICByZXR1cm4gdGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFnKTtcbiAgICB9KTtcbiAgICBuZXdUYWdzLmZvckVhY2goZnVuY3Rpb24gKHRhZykge1xuICAgICAgICByZXR1cm4gaGVhZEVsZW1lbnQuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG9sZFRhZ3M6IG9sZFRhZ3MsXG4gICAgICAgIG5ld1RhZ3M6IG5ld1RhZ3NcbiAgICB9O1xufTtcblxudmFyIGdlbmVyYXRlRWxlbWVudEF0dHJpYnV0ZXNBc1N0cmluZyA9IGZ1bmN0aW9uIGdlbmVyYXRlRWxlbWVudEF0dHJpYnV0ZXNBc1N0cmluZyhhdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLnJlZHVjZShmdW5jdGlvbiAoc3RyLCBrZXkpIHtcbiAgICAgICAgdmFyIGF0dHIgPSB0eXBlb2YgYXR0cmlidXRlc1trZXldICE9PSBcInVuZGVmaW5lZFwiID8ga2V5ICsgXCI9XFxcIlwiICsgYXR0cmlidXRlc1trZXldICsgXCJcXFwiXCIgOiBcIlwiICsga2V5O1xuICAgICAgICByZXR1cm4gc3RyID8gc3RyICsgXCIgXCIgKyBhdHRyIDogYXR0cjtcbiAgICB9LCBcIlwiKTtcbn07XG5cbnZhciBnZW5lcmF0ZVRpdGxlQXNTdHJpbmcgPSBmdW5jdGlvbiBnZW5lcmF0ZVRpdGxlQXNTdHJpbmcodHlwZSwgdGl0bGUsIGF0dHJpYnV0ZXMsIGVuY29kZSkge1xuICAgIHZhciBhdHRyaWJ1dGVTdHJpbmcgPSBnZW5lcmF0ZUVsZW1lbnRBdHRyaWJ1dGVzQXNTdHJpbmcoYXR0cmlidXRlcyk7XG4gICAgdmFyIGZsYXR0ZW5lZFRpdGxlID0gZmxhdHRlbkFycmF5KHRpdGxlKTtcbiAgICByZXR1cm4gYXR0cmlidXRlU3RyaW5nID8gXCI8XCIgKyB0eXBlICsgXCIgXCIgKyBIRUxNRVRfQVRUUklCVVRFICsgXCI9XFxcInRydWVcXFwiIFwiICsgYXR0cmlidXRlU3RyaW5nICsgXCI+XCIgKyBlbmNvZGVTcGVjaWFsQ2hhcmFjdGVycyhmbGF0dGVuZWRUaXRsZSwgZW5jb2RlKSArIFwiPC9cIiArIHR5cGUgKyBcIj5cIiA6IFwiPFwiICsgdHlwZSArIFwiIFwiICsgSEVMTUVUX0FUVFJJQlVURSArIFwiPVxcXCJ0cnVlXFxcIj5cIiArIGVuY29kZVNwZWNpYWxDaGFyYWN0ZXJzKGZsYXR0ZW5lZFRpdGxlLCBlbmNvZGUpICsgXCI8L1wiICsgdHlwZSArIFwiPlwiO1xufTtcblxudmFyIGdlbmVyYXRlVGFnc0FzU3RyaW5nID0gZnVuY3Rpb24gZ2VuZXJhdGVUYWdzQXNTdHJpbmcodHlwZSwgdGFncywgZW5jb2RlKSB7XG4gICAgcmV0dXJuIHRhZ3MucmVkdWNlKGZ1bmN0aW9uIChzdHIsIHRhZykge1xuICAgICAgICB2YXIgYXR0cmlidXRlSHRtbCA9IE9iamVjdC5rZXlzKHRhZykuZmlsdGVyKGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHJldHVybiAhKGF0dHJpYnV0ZSA9PT0gVEFHX1BST1BFUlRJRVMuSU5ORVJfSFRNTCB8fCBhdHRyaWJ1dGUgPT09IFRBR19QUk9QRVJUSUVTLkNTU19URVhUKTtcbiAgICAgICAgfSkucmVkdWNlKGZ1bmN0aW9uIChzdHJpbmcsIGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdmFyIGF0dHIgPSB0eXBlb2YgdGFnW2F0dHJpYnV0ZV0gPT09IFwidW5kZWZpbmVkXCIgPyBhdHRyaWJ1dGUgOiBhdHRyaWJ1dGUgKyBcIj1cXFwiXCIgKyBlbmNvZGVTcGVjaWFsQ2hhcmFjdGVycyh0YWdbYXR0cmlidXRlXSwgZW5jb2RlKSArIFwiXFxcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZyA/IHN0cmluZyArIFwiIFwiICsgYXR0ciA6IGF0dHI7XG4gICAgICAgIH0sIFwiXCIpO1xuXG4gICAgICAgIHZhciB0YWdDb250ZW50ID0gdGFnLmlubmVySFRNTCB8fCB0YWcuY3NzVGV4dCB8fCBcIlwiO1xuXG4gICAgICAgIHZhciBpc1NlbGZDbG9zaW5nID0gU0VMRl9DTE9TSU5HX1RBR1MuaW5kZXhPZih0eXBlKSA9PT0gLTE7XG5cbiAgICAgICAgcmV0dXJuIHN0ciArIFwiPFwiICsgdHlwZSArIFwiIFwiICsgSEVMTUVUX0FUVFJJQlVURSArIFwiPVxcXCJ0cnVlXFxcIiBcIiArIGF0dHJpYnV0ZUh0bWwgKyAoaXNTZWxmQ2xvc2luZyA/IFwiLz5cIiA6IFwiPlwiICsgdGFnQ29udGVudCArIFwiPC9cIiArIHR5cGUgKyBcIj5cIik7XG4gICAgfSwgXCJcIik7XG59O1xuXG52YXIgY29udmVydEVsZW1lbnRBdHRyaWJ1dGVzdG9SZWFjdFByb3BzID0gZnVuY3Rpb24gY29udmVydEVsZW1lbnRBdHRyaWJ1dGVzdG9SZWFjdFByb3BzKGF0dHJpYnV0ZXMpIHtcbiAgICB2YXIgaW5pdFByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICAgIG9ialtSRUFDVF9UQUdfTUFQW2tleV0gfHwga2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9LCBpbml0UHJvcHMpO1xufTtcblxudmFyIGNvbnZlcnRSZWFjdFByb3BzdG9IdG1sQXR0cmlidXRlcyA9IGZ1bmN0aW9uIGNvbnZlcnRSZWFjdFByb3BzdG9IdG1sQXR0cmlidXRlcyhwcm9wcykge1xuICAgIHZhciBpbml0QXR0cmlidXRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMocHJvcHMpLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgICAgb2JqW0hUTUxfVEFHX01BUFtrZXldIHx8IGtleV0gPSBwcm9wc1trZXldO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sIGluaXRBdHRyaWJ1dGVzKTtcbn07XG5cbnZhciBnZW5lcmF0ZVRpdGxlQXNSZWFjdENvbXBvbmVudCA9IGZ1bmN0aW9uIGdlbmVyYXRlVGl0bGVBc1JlYWN0Q29tcG9uZW50KHR5cGUsIHRpdGxlLCBhdHRyaWJ1dGVzKSB7XG4gICAgdmFyIF9pbml0UHJvcHM7XG5cbiAgICAvLyBhc3NpZ25pbmcgaW50byBhbiBhcnJheSB0byBkZWZpbmUgdG9TdHJpbmcgZnVuY3Rpb24gb24gaXRcbiAgICB2YXIgaW5pdFByb3BzID0gKF9pbml0UHJvcHMgPSB7XG4gICAgICAgIGtleTogdGl0bGVcbiAgICB9LCBfaW5pdFByb3BzW0hFTE1FVF9BVFRSSUJVVEVdID0gdHJ1ZSwgX2luaXRQcm9wcyk7XG4gICAgdmFyIHByb3BzID0gY29udmVydEVsZW1lbnRBdHRyaWJ1dGVzdG9SZWFjdFByb3BzKGF0dHJpYnV0ZXMsIGluaXRQcm9wcyk7XG5cbiAgICByZXR1cm4gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoVEFHX05BTUVTLlRJVExFLCBwcm9wcywgdGl0bGUpXTtcbn07XG5cbnZhciBnZW5lcmF0ZVRhZ3NBc1JlYWN0Q29tcG9uZW50ID0gZnVuY3Rpb24gZ2VuZXJhdGVUYWdzQXNSZWFjdENvbXBvbmVudCh0eXBlLCB0YWdzKSB7XG4gICAgcmV0dXJuIHRhZ3MubWFwKGZ1bmN0aW9uICh0YWcsIGkpIHtcbiAgICAgICAgdmFyIF9tYXBwZWRUYWc7XG5cbiAgICAgICAgdmFyIG1hcHBlZFRhZyA9IChfbWFwcGVkVGFnID0ge1xuICAgICAgICAgICAga2V5OiBpXG4gICAgICAgIH0sIF9tYXBwZWRUYWdbSEVMTUVUX0FUVFJJQlVURV0gPSB0cnVlLCBfbWFwcGVkVGFnKTtcblxuICAgICAgICBPYmplY3Qua2V5cyh0YWcpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdmFyIG1hcHBlZEF0dHJpYnV0ZSA9IFJFQUNUX1RBR19NQVBbYXR0cmlidXRlXSB8fCBhdHRyaWJ1dGU7XG5cbiAgICAgICAgICAgIGlmIChtYXBwZWRBdHRyaWJ1dGUgPT09IFRBR19QUk9QRVJUSUVTLklOTkVSX0hUTUwgfHwgbWFwcGVkQXR0cmlidXRlID09PSBUQUdfUFJPUEVSVElFUy5DU1NfVEVYVCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGFnLmlubmVySFRNTCB8fCB0YWcuY3NzVGV4dDtcbiAgICAgICAgICAgICAgICBtYXBwZWRUYWcuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgPSB7IF9faHRtbDogY29udGVudCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXBwZWRUYWdbbWFwcGVkQXR0cmlidXRlXSA9IHRhZ1thdHRyaWJ1dGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0eXBlLCBtYXBwZWRUYWcpO1xuICAgIH0pO1xufTtcblxudmFyIGdldE1ldGhvZHNGb3JUYWcgPSBmdW5jdGlvbiBnZXRNZXRob2RzRm9yVGFnKHR5cGUsIHRhZ3MsIGVuY29kZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFRBR19OQU1FUy5USVRMRTpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9Db21wb25lbnQ6IGZ1bmN0aW9uIHRvQ29tcG9uZW50KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVUaXRsZUFzUmVhY3RDb21wb25lbnQodHlwZSwgdGFncy50aXRsZSwgdGFncy50aXRsZUF0dHJpYnV0ZXMsIGVuY29kZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVRpdGxlQXNTdHJpbmcodHlwZSwgdGFncy50aXRsZSwgdGFncy50aXRsZUF0dHJpYnV0ZXMsIGVuY29kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBBVFRSSUJVVEVfTkFNRVMuQk9EWTpcbiAgICAgICAgY2FzZSBBVFRSSUJVVEVfTkFNRVMuSFRNTDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9Db21wb25lbnQ6IGZ1bmN0aW9uIHRvQ29tcG9uZW50KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udmVydEVsZW1lbnRBdHRyaWJ1dGVzdG9SZWFjdFByb3BzKHRhZ3MpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbGVtZW50QXR0cmlidXRlc0FzU3RyaW5nKHRhZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRvQ29tcG9uZW50OiBmdW5jdGlvbiB0b0NvbXBvbmVudCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlVGFnc0FzUmVhY3RDb21wb25lbnQodHlwZSwgdGFncyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVRhZ3NBc1N0cmluZyh0eXBlLCB0YWdzLCBlbmNvZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgfVxufTtcblxudmFyIG1hcFN0YXRlT25TZXJ2ZXIgPSBmdW5jdGlvbiBtYXBTdGF0ZU9uU2VydmVyKF9yZWYpIHtcbiAgICB2YXIgYmFzZVRhZyA9IF9yZWYuYmFzZVRhZyxcbiAgICAgICAgYm9keUF0dHJpYnV0ZXMgPSBfcmVmLmJvZHlBdHRyaWJ1dGVzLFxuICAgICAgICBlbmNvZGUgPSBfcmVmLmVuY29kZSxcbiAgICAgICAgaHRtbEF0dHJpYnV0ZXMgPSBfcmVmLmh0bWxBdHRyaWJ1dGVzLFxuICAgICAgICBsaW5rVGFncyA9IF9yZWYubGlua1RhZ3MsXG4gICAgICAgIG1ldGFUYWdzID0gX3JlZi5tZXRhVGFncyxcbiAgICAgICAgbm9zY3JpcHRUYWdzID0gX3JlZi5ub3NjcmlwdFRhZ3MsXG4gICAgICAgIHNjcmlwdFRhZ3MgPSBfcmVmLnNjcmlwdFRhZ3MsXG4gICAgICAgIHN0eWxlVGFncyA9IF9yZWYuc3R5bGVUYWdzLFxuICAgICAgICBfcmVmJHRpdGxlID0gX3JlZi50aXRsZSxcbiAgICAgICAgdGl0bGUgPSBfcmVmJHRpdGxlID09PSB1bmRlZmluZWQgPyBcIlwiIDogX3JlZiR0aXRsZSxcbiAgICAgICAgdGl0bGVBdHRyaWJ1dGVzID0gX3JlZi50aXRsZUF0dHJpYnV0ZXM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYmFzZTogZ2V0TWV0aG9kc0ZvclRhZyhUQUdfTkFNRVMuQkFTRSwgYmFzZVRhZywgZW5jb2RlKSxcbiAgICAgICAgYm9keUF0dHJpYnV0ZXM6IGdldE1ldGhvZHNGb3JUYWcoQVRUUklCVVRFX05BTUVTLkJPRFksIGJvZHlBdHRyaWJ1dGVzLCBlbmNvZGUpLFxuICAgICAgICBodG1sQXR0cmlidXRlczogZ2V0TWV0aG9kc0ZvclRhZyhBVFRSSUJVVEVfTkFNRVMuSFRNTCwgaHRtbEF0dHJpYnV0ZXMsIGVuY29kZSksXG4gICAgICAgIGxpbms6IGdldE1ldGhvZHNGb3JUYWcoVEFHX05BTUVTLkxJTkssIGxpbmtUYWdzLCBlbmNvZGUpLFxuICAgICAgICBtZXRhOiBnZXRNZXRob2RzRm9yVGFnKFRBR19OQU1FUy5NRVRBLCBtZXRhVGFncywgZW5jb2RlKSxcbiAgICAgICAgbm9zY3JpcHQ6IGdldE1ldGhvZHNGb3JUYWcoVEFHX05BTUVTLk5PU0NSSVBULCBub3NjcmlwdFRhZ3MsIGVuY29kZSksXG4gICAgICAgIHNjcmlwdDogZ2V0TWV0aG9kc0ZvclRhZyhUQUdfTkFNRVMuU0NSSVBULCBzY3JpcHRUYWdzLCBlbmNvZGUpLFxuICAgICAgICBzdHlsZTogZ2V0TWV0aG9kc0ZvclRhZyhUQUdfTkFNRVMuU1RZTEUsIHN0eWxlVGFncywgZW5jb2RlKSxcbiAgICAgICAgdGl0bGU6IGdldE1ldGhvZHNGb3JUYWcoVEFHX05BTUVTLlRJVExFLCB7IHRpdGxlOiB0aXRsZSwgdGl0bGVBdHRyaWJ1dGVzOiB0aXRsZUF0dHJpYnV0ZXMgfSwgZW5jb2RlKVxuICAgIH07XG59O1xuXG52YXIgSGVsbWV0ID0gZnVuY3Rpb24gSGVsbWV0KENvbXBvbmVudCkge1xuICAgIHZhciBfY2xhc3MsIF90ZW1wO1xuXG4gICAgcmV0dXJuIF90ZW1wID0gX2NsYXNzID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAgICAgaW5oZXJpdHMoSGVsbWV0V3JhcHBlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICAgICAgZnVuY3Rpb24gSGVsbWV0V3JhcHBlcigpIHtcbiAgICAgICAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEhlbG1ldFdyYXBwZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEhlbG1ldFdyYXBwZXIucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiAhaXNFcXVhbCh0aGlzLnByb3BzLCBuZXh0UHJvcHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIEhlbG1ldFdyYXBwZXIucHJvdG90eXBlLm1hcE5lc3RlZENoaWxkcmVuVG9Qcm9wcyA9IGZ1bmN0aW9uIG1hcE5lc3RlZENoaWxkcmVuVG9Qcm9wcyhjaGlsZCwgbmVzdGVkQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICghbmVzdGVkQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoIChjaGlsZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBUQUdfTkFNRVMuU0NSSVBUOlxuICAgICAgICAgICAgICAgIGNhc2UgVEFHX05BTUVTLk5PU0NSSVBUOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBuZXN0ZWRDaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY2FzZSBUQUdfTkFNRVMuU1RZTEU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NUZXh0OiBuZXN0ZWRDaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCI8XCIgKyBjaGlsZC50eXBlICsgXCIgLz4gZWxlbWVudHMgYXJlIHNlbGYtY2xvc2luZyBhbmQgY2FuIG5vdCBjb250YWluIGNoaWxkcmVuLiBSZWZlciB0byBvdXIgQVBJIGZvciBtb3JlIGluZm9ybWF0aW9uLlwiKTtcbiAgICAgICAgfTtcblxuICAgICAgICBIZWxtZXRXcmFwcGVyLnByb3RvdHlwZS5mbGF0dGVuQXJyYXlUeXBlQ2hpbGRyZW4gPSBmdW5jdGlvbiBmbGF0dGVuQXJyYXlUeXBlQ2hpbGRyZW4oX3JlZikge1xuICAgICAgICAgICAgdmFyIF9iYWJlbEhlbHBlcnMkZXh0ZW5kcztcblxuICAgICAgICAgICAgdmFyIGNoaWxkID0gX3JlZi5jaGlsZCxcbiAgICAgICAgICAgICAgICBhcnJheVR5cGVDaGlsZHJlbiA9IF9yZWYuYXJyYXlUeXBlQ2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRQcm9wcyA9IF9yZWYubmV3Q2hpbGRQcm9wcyxcbiAgICAgICAgICAgICAgICBuZXN0ZWRDaGlsZHJlbiA9IF9yZWYubmVzdGVkQ2hpbGRyZW47XG5cbiAgICAgICAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgYXJyYXlUeXBlQ2hpbGRyZW4sIChfYmFiZWxIZWxwZXJzJGV4dGVuZHMgPSB7fSwgX2JhYmVsSGVscGVycyRleHRlbmRzW2NoaWxkLnR5cGVdID0gW10uY29uY2F0KGFycmF5VHlwZUNoaWxkcmVuW2NoaWxkLnR5cGVdIHx8IFtdLCBbX2V4dGVuZHMoe30sIG5ld0NoaWxkUHJvcHMsIHRoaXMubWFwTmVzdGVkQ2hpbGRyZW5Ub1Byb3BzKGNoaWxkLCBuZXN0ZWRDaGlsZHJlbikpXSksIF9iYWJlbEhlbHBlcnMkZXh0ZW5kcykpO1xuICAgICAgICB9O1xuXG4gICAgICAgIEhlbG1ldFdyYXBwZXIucHJvdG90eXBlLm1hcE9iamVjdFR5cGVDaGlsZHJlbiA9IGZ1bmN0aW9uIG1hcE9iamVjdFR5cGVDaGlsZHJlbihfcmVmMikge1xuICAgICAgICAgICAgdmFyIF9iYWJlbEhlbHBlcnMkZXh0ZW5kczIsIF9iYWJlbEhlbHBlcnMkZXh0ZW5kczM7XG5cbiAgICAgICAgICAgIHZhciBjaGlsZCA9IF9yZWYyLmNoaWxkLFxuICAgICAgICAgICAgICAgIG5ld1Byb3BzID0gX3JlZjIubmV3UHJvcHMsXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRQcm9wcyA9IF9yZWYyLm5ld0NoaWxkUHJvcHMsXG4gICAgICAgICAgICAgICAgbmVzdGVkQ2hpbGRyZW4gPSBfcmVmMi5uZXN0ZWRDaGlsZHJlbjtcblxuICAgICAgICAgICAgc3dpdGNoIChjaGlsZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBUQUdfTkFNRVMuVElUTEU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgbmV3UHJvcHMsIChfYmFiZWxIZWxwZXJzJGV4dGVuZHMyID0ge30sIF9iYWJlbEhlbHBlcnMkZXh0ZW5kczJbY2hpbGQudHlwZV0gPSBuZXN0ZWRDaGlsZHJlbiwgX2JhYmVsSGVscGVycyRleHRlbmRzMi50aXRsZUF0dHJpYnV0ZXMgPSBfZXh0ZW5kcyh7fSwgbmV3Q2hpbGRQcm9wcyksIF9iYWJlbEhlbHBlcnMkZXh0ZW5kczIpKTtcblxuICAgICAgICAgICAgICAgIGNhc2UgVEFHX05BTUVTLkJPRFk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgbmV3UHJvcHMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlBdHRyaWJ1dGVzOiBfZXh0ZW5kcyh7fSwgbmV3Q2hpbGRQcm9wcylcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFRBR19OQU1FUy5IVE1MOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2V4dGVuZHMoe30sIG5ld1Byb3BzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sQXR0cmlidXRlczogX2V4dGVuZHMoe30sIG5ld0NoaWxkUHJvcHMpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX2V4dGVuZHMoe30sIG5ld1Byb3BzLCAoX2JhYmVsSGVscGVycyRleHRlbmRzMyA9IHt9LCBfYmFiZWxIZWxwZXJzJGV4dGVuZHMzW2NoaWxkLnR5cGVdID0gX2V4dGVuZHMoe30sIG5ld0NoaWxkUHJvcHMpLCBfYmFiZWxIZWxwZXJzJGV4dGVuZHMzKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgSGVsbWV0V3JhcHBlci5wcm90b3R5cGUubWFwQXJyYXlUeXBlQ2hpbGRyZW5Ub1Byb3BzID0gZnVuY3Rpb24gbWFwQXJyYXlUeXBlQ2hpbGRyZW5Ub1Byb3BzKGFycmF5VHlwZUNoaWxkcmVuLCBuZXdQcm9wcykge1xuICAgICAgICAgICAgdmFyIG5ld0ZsYXR0ZW5lZFByb3BzID0gX2V4dGVuZHMoe30sIG5ld1Byb3BzKTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXJyYXlUeXBlQ2hpbGRyZW4pLmZvckVhY2goZnVuY3Rpb24gKGFycmF5Q2hpbGROYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9iYWJlbEhlbHBlcnMkZXh0ZW5kczQ7XG5cbiAgICAgICAgICAgICAgICBuZXdGbGF0dGVuZWRQcm9wcyA9IF9leHRlbmRzKHt9LCBuZXdGbGF0dGVuZWRQcm9wcywgKF9iYWJlbEhlbHBlcnMkZXh0ZW5kczQgPSB7fSwgX2JhYmVsSGVscGVycyRleHRlbmRzNFthcnJheUNoaWxkTmFtZV0gPSBhcnJheVR5cGVDaGlsZHJlblthcnJheUNoaWxkTmFtZV0sIF9iYWJlbEhlbHBlcnMkZXh0ZW5kczQpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3RmxhdHRlbmVkUHJvcHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgSGVsbWV0V3JhcHBlci5wcm90b3R5cGUud2Fybk9uSW52YWxpZENoaWxkcmVuID0gZnVuY3Rpb24gd2Fybk9uSW52YWxpZENoaWxkcmVuKGNoaWxkLCBuZXN0ZWRDaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGlmICghVkFMSURfVEFHX05BTUVTLnNvbWUoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkLnR5cGUgPT09IG5hbWU7XG4gICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZC50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3YXJuKFwiWW91IG1heSBiZSBhdHRlbXB0aW5nIHRvIG5lc3QgPEhlbG1ldD4gY29tcG9uZW50cyB3aXRoaW4gZWFjaCBvdGhlciwgd2hpY2ggaXMgbm90IGFsbG93ZWQuIFJlZmVyIHRvIG91ciBBUEkgZm9yIG1vcmUgaW5mb3JtYXRpb24uXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdhcm4oXCJPbmx5IGVsZW1lbnRzIHR5cGVzIFwiICsgVkFMSURfVEFHX05BTUVTLmpvaW4oXCIsIFwiKSArIFwiIGFyZSBhbGxvd2VkLiBIZWxtZXQgZG9lcyBub3Qgc3VwcG9ydCByZW5kZXJpbmcgPFwiICsgY2hpbGQudHlwZSArIFwiPiBlbGVtZW50cy4gUmVmZXIgdG8gb3VyIEFQSSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5lc3RlZENoaWxkcmVuICYmIHR5cGVvZiBuZXN0ZWRDaGlsZHJlbiAhPT0gXCJzdHJpbmdcIiAmJiAoIUFycmF5LmlzQXJyYXkobmVzdGVkQ2hpbGRyZW4pIHx8IG5lc3RlZENoaWxkcmVuLnNvbWUoZnVuY3Rpb24gKG5lc3RlZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgbmVzdGVkQ2hpbGQgIT09IFwic3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgfSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlbG1ldCBleHBlY3RzIGEgc3RyaW5nIGFzIGEgY2hpbGQgb2YgPFwiICsgY2hpbGQudHlwZSArIFwiPi4gRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIGNoaWxkcmVuIGluIGJyYWNlcz8gKCA8XCIgKyBjaGlsZC50eXBlICsgXCI+e2BgfTwvXCIgKyBjaGlsZC50eXBlICsgXCI+ICkgUmVmZXIgdG8gb3VyIEFQSSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBIZWxtZXRXcmFwcGVyLnByb3RvdHlwZS5tYXBDaGlsZHJlblRvUHJvcHMgPSBmdW5jdGlvbiBtYXBDaGlsZHJlblRvUHJvcHMoY2hpbGRyZW4sIG5ld1Byb3BzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGFycmF5VHlwZUNoaWxkcmVuID0ge307XG5cbiAgICAgICAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgICAgIGlmICghY2hpbGQgfHwgIWNoaWxkLnByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgX2NoaWxkJHByb3BzID0gY2hpbGQucHJvcHMsXG4gICAgICAgICAgICAgICAgICAgIG5lc3RlZENoaWxkcmVuID0gX2NoaWxkJHByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZFByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX2NoaWxkJHByb3BzLCBbXCJjaGlsZHJlblwiXSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGRQcm9wcyA9IGNvbnZlcnRSZWFjdFByb3BzdG9IdG1sQXR0cmlidXRlcyhjaGlsZFByb3BzKTtcblxuICAgICAgICAgICAgICAgIF90aGlzMi53YXJuT25JbnZhbGlkQ2hpbGRyZW4oY2hpbGQsIG5lc3RlZENoaWxkcmVuKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hpbGQudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFRBR19OQU1FUy5MSU5LOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRBR19OQU1FUy5NRVRBOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRBR19OQU1FUy5OT1NDUklQVDpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUQUdfTkFNRVMuU0NSSVBUOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRBR19OQU1FUy5TVFlMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5VHlwZUNoaWxkcmVuID0gX3RoaXMyLmZsYXR0ZW5BcnJheVR5cGVDaGlsZHJlbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IGNoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5VHlwZUNoaWxkcmVuOiBhcnJheVR5cGVDaGlsZHJlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDaGlsZFByb3BzOiBuZXdDaGlsZFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RlZENoaWxkcmVuOiBuZXN0ZWRDaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UHJvcHMgPSBfdGhpczIubWFwT2JqZWN0VHlwZUNoaWxkcmVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZDogY2hpbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UHJvcHM6IG5ld1Byb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NoaWxkUHJvcHM6IG5ld0NoaWxkUHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVzdGVkQ2hpbGRyZW46IG5lc3RlZENoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBuZXdQcm9wcyA9IHRoaXMubWFwQXJyYXlUeXBlQ2hpbGRyZW5Ub1Byb3BzKGFycmF5VHlwZUNoaWxkcmVuLCBuZXdQcm9wcyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3UHJvcHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgSGVsbWV0V3JhcHBlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFtcImNoaWxkcmVuXCJdKTtcblxuICAgICAgICAgICAgdmFyIG5ld1Byb3BzID0gX2V4dGVuZHMoe30sIHByb3BzKTtcblxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgbmV3UHJvcHMgPSB0aGlzLm1hcENoaWxkcmVuVG9Qcm9wcyhjaGlsZHJlbiwgbmV3UHJvcHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIG5ld1Byb3BzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjcmVhdGVDbGFzcyhIZWxtZXRXcmFwcGVyLCBudWxsLCBbe1xuICAgICAgICAgICAga2V5OiBcImNhblVzZURPTVwiLFxuXG5cbiAgICAgICAgICAgIC8vIENvbXBvbmVudC5wZWVrIGNvbWVzIGZyb20gcmVhY3Qtc2lkZS1lZmZlY3Q6XG4gICAgICAgICAgICAvLyBGb3IgdGVzdGluZywgeW91IG1heSB1c2UgYSBzdGF0aWMgcGVlaygpIG1ldGhvZCBhdmFpbGFibGUgb24gdGhlIHJldHVybmVkIGNvbXBvbmVudC5cbiAgICAgICAgICAgIC8vIEl0IGxldHMgeW91IGdldCB0aGUgY3VycmVudCBzdGF0ZSB3aXRob3V0IHJlc2V0dGluZyB0aGUgbW91bnRlZCBpbnN0YW5jZSBzdGFjay5cbiAgICAgICAgICAgIC8vIERvbuKAmXQgdXNlIGl0IGZvciBhbnl0aGluZyBvdGhlciB0aGFuIHRlc3RpbmcuXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGJhc2U6IHtcInRhcmdldFwiOiBcIl9ibGFua1wiLCBcImhyZWZcIjogXCJodHRwOi8vbXlzaXRlLmNvbS9cIn1cbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5QXR0cmlidXRlczoge1wiY2xhc3NOYW1lXCI6IFwicm9vdFwifVxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRUaXRsZTogXCJEZWZhdWx0IFRpdGxlXCJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVmZXI6IHRydWVcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5jb2RlU3BlY2lhbENoYXJhY3RlcnM6IHRydWVcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBodG1sQXR0cmlidXRlczoge1wibGFuZ1wiOiBcImVuXCIsIFwiYW1wXCI6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpbms6IFt7XCJyZWxcIjogXCJjYW5vbmljYWxcIiwgXCJocmVmXCI6IFwiaHR0cDovL215c2l0ZS5jb20vZXhhbXBsZVwifV1cbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1ldGE6IFt7XCJuYW1lXCI6IFwiZGVzY3JpcHRpb25cIiwgXCJjb250ZW50XCI6IFwiVGVzdCBkZXNjcmlwdGlvblwifV1cbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG5vc2NyaXB0OiBbe1wiaW5uZXJIVE1MXCI6IFwiPGltZyBzcmM9J2h0dHA6Ly9teXNpdGUuY29tL2pzL3Rlc3QuanMnXCJ9XVxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25DaGFuZ2VDbGllbnRTdGF0ZTogXCIobmV3U3RhdGUpID0+IGNvbnNvbGUubG9nKG5ld1N0YXRlKVwiXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBzY3JpcHQ6IFt7XCJ0eXBlXCI6IFwidGV4dC9qYXZhc2NyaXB0XCIsIFwic3JjXCI6IFwiaHR0cDovL215c2l0ZS5jb20vanMvdGVzdC5qc1wifV1cbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlOiBbe1widHlwZVwiOiBcInRleHQvY3NzXCIsIFwiY3NzVGV4dFwiOiBcImRpdiB7IGRpc3BsYXk6IGJsb2NrOyBjb2xvcjogYmx1ZTsgfVwifV1cbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZTogXCJUaXRsZVwiXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdGl0bGVBdHRyaWJ1dGVzOiB7XCJpdGVtcHJvcFwiOiBcIm5hbWVcIn1cbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZVRlbXBsYXRlOiBcIk15U2l0ZS5jb20gLSAlc1wiXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGNhblVzZURPTSkge1xuICAgICAgICAgICAgICAgIENvbXBvbmVudC5jYW5Vc2VET00gPSBjYW5Vc2VET007XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcbiAgICAgICAgcmV0dXJuIEhlbG1ldFdyYXBwZXI7XG4gICAgfShSZWFjdC5Db21wb25lbnQpLCBfY2xhc3MucHJvcFR5cGVzID0ge1xuICAgICAgICBiYXNlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBib2R5QXR0cmlidXRlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5ub2RlKSwgUHJvcFR5cGVzLm5vZGVdKSxcbiAgICAgICAgZGVmYXVsdFRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkZWZlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVuY29kZVNwZWNpYWxDaGFyYWN0ZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaHRtbEF0dHJpYnV0ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxpbms6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgICAgICBtZXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICAgICAgbm9zY3JpcHQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgICAgICBvbkNoYW5nZUNsaWVudFN0YXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2NyaXB0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICAgICAgc3R5bGU6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdGl0bGVBdHRyaWJ1dGVzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0aXRsZVRlbXBsYXRlOiBQcm9wVHlwZXMuc3RyaW5nXG4gICAgfSwgX2NsYXNzLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZGVmZXI6IHRydWUsXG4gICAgICAgIGVuY29kZVNwZWNpYWxDaGFyYWN0ZXJzOiB0cnVlXG4gICAgfSwgX2NsYXNzLnBlZWsgPSBDb21wb25lbnQucGVlaywgX2NsYXNzLnJld2luZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1hcHBlZFN0YXRlID0gQ29tcG9uZW50LnJld2luZCgpO1xuICAgICAgICBpZiAoIW1hcHBlZFN0YXRlKSB7XG4gICAgICAgICAgICAvLyBwcm92aWRlIGZhbGxiYWNrIGlmIG1hcHBlZFN0YXRlIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgbWFwcGVkU3RhdGUgPSBtYXBTdGF0ZU9uU2VydmVyKHtcbiAgICAgICAgICAgICAgICBiYXNlVGFnOiBbXSxcbiAgICAgICAgICAgICAgICBib2R5QXR0cmlidXRlczoge30sXG4gICAgICAgICAgICAgICAgZW5jb2RlU3BlY2lhbENoYXJhY3RlcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgaHRtbEF0dHJpYnV0ZXM6IHt9LFxuICAgICAgICAgICAgICAgIGxpbmtUYWdzOiBbXSxcbiAgICAgICAgICAgICAgICBtZXRhVGFnczogW10sXG4gICAgICAgICAgICAgICAgbm9zY3JpcHRUYWdzOiBbXSxcbiAgICAgICAgICAgICAgICBzY3JpcHRUYWdzOiBbXSxcbiAgICAgICAgICAgICAgICBzdHlsZVRhZ3M6IFtdLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHRpdGxlQXR0cmlidXRlczoge31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcHBlZFN0YXRlO1xuICAgIH0sIF90ZW1wO1xufTtcblxudmFyIE51bGxDb21wb25lbnQgPSBmdW5jdGlvbiBOdWxsQ29tcG9uZW50KCkge1xuICAgIHJldHVybiBudWxsO1xufTtcblxudmFyIEhlbG1ldFNpZGVFZmZlY3RzID0gd2l0aFNpZGVFZmZlY3QocmVkdWNlUHJvcHNUb1N0YXRlLCBoYW5kbGVDbGllbnRTdGF0ZUNoYW5nZSwgbWFwU3RhdGVPblNlcnZlcikoTnVsbENvbXBvbmVudCk7XG5cbnZhciBIZWxtZXRFeHBvcnQgPSBIZWxtZXQoSGVsbWV0U2lkZUVmZmVjdHMpO1xuSGVsbWV0RXhwb3J0LnJlbmRlclN0YXRpYyA9IEhlbG1ldEV4cG9ydC5yZXdpbmQ7XG5cbmV4cG9ydCBkZWZhdWx0IEhlbG1ldEV4cG9ydDtcbmV4cG9ydCB7IEhlbG1ldEV4cG9ydCBhcyBIZWxtZXQgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RfX2RlZmF1bHQgPSBfaW50ZXJvcERlZmF1bHQoUmVhY3QpO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufVxuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbmZ1bmN0aW9uIHdpdGhTaWRlRWZmZWN0KHJlZHVjZVByb3BzVG9TdGF0ZSwgaGFuZGxlU3RhdGVDaGFuZ2VPbkNsaWVudCwgbWFwU3RhdGVPblNlcnZlcikge1xuICBpZiAodHlwZW9mIHJlZHVjZVByb3BzVG9TdGF0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgcmVkdWNlUHJvcHNUb1N0YXRlIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGhhbmRsZVN0YXRlQ2hhbmdlT25DbGllbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGhhbmRsZVN0YXRlQ2hhbmdlT25DbGllbnQgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbWFwU3RhdGVPblNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1hcFN0YXRlT25TZXJ2ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG1hcFN0YXRlT25TZXJ2ZXIgdG8gZWl0aGVyIGJlIHVuZGVmaW5lZCBvciBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUoV3JhcHBlZENvbXBvbmVudCkge1xuICAgIHJldHVybiBXcmFwcGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IFdyYXBwZWRDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JztcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKFdyYXBwZWRDb21wb25lbnQpIHtcbiAgICBpZiAodHlwZW9mIFdyYXBwZWRDb21wb25lbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgV3JhcHBlZENvbXBvbmVudCB0byBiZSBhIFJlYWN0IGNvbXBvbmVudC4nKTtcbiAgICB9XG5cbiAgICB2YXIgbW91bnRlZEluc3RhbmNlcyA9IFtdO1xuICAgIHZhciBzdGF0ZTtcblxuICAgIGZ1bmN0aW9uIGVtaXRDaGFuZ2UoKSB7XG4gICAgICBzdGF0ZSA9IHJlZHVjZVByb3BzVG9TdGF0ZShtb3VudGVkSW5zdGFuY2VzLm1hcChmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLnByb3BzO1xuICAgICAgfSkpO1xuXG4gICAgICBpZiAoU2lkZUVmZmVjdC5jYW5Vc2VET00pIHtcbiAgICAgICAgaGFuZGxlU3RhdGVDaGFuZ2VPbkNsaWVudChzdGF0ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hcFN0YXRlT25TZXJ2ZXIpIHtcbiAgICAgICAgc3RhdGUgPSBtYXBTdGF0ZU9uU2VydmVyKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgU2lkZUVmZmVjdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1B1cmVDb21wb25lbnQpIHtcbiAgICAgIF9pbmhlcml0c0xvb3NlKFNpZGVFZmZlY3QsIF9QdXJlQ29tcG9uZW50KTtcblxuICAgICAgZnVuY3Rpb24gU2lkZUVmZmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIF9QdXJlQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gVHJ5IHRvIHVzZSBkaXNwbGF5TmFtZSBvZiB3cmFwcGVkIGNvbXBvbmVudFxuICAgICAgLy8gRXhwb3NlIGNhblVzZURPTSBzbyB0ZXN0cyBjYW4gbW9ua2V5cGF0Y2ggaXRcbiAgICAgIFNpZGVFZmZlY3QucGVlayA9IGZ1bmN0aW9uIHBlZWsoKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH07XG5cbiAgICAgIFNpZGVFZmZlY3QucmV3aW5kID0gZnVuY3Rpb24gcmV3aW5kKCkge1xuICAgICAgICBpZiAoU2lkZUVmZmVjdC5jYW5Vc2VET00pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgb25seSBjYWxsIHJld2luZCgpIG9uIHRoZSBzZXJ2ZXIuIENhbGwgcGVlaygpIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVjb3JkZWRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICBzdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgbW91bnRlZEluc3RhbmNlcyA9IFtdO1xuICAgICAgICByZXR1cm4gcmVjb3JkZWRTdGF0ZTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBfcHJvdG8gPSBTaWRlRWZmZWN0LnByb3RvdHlwZTtcblxuICAgICAgX3Byb3RvLlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBVTlNBRkVfY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBtb3VudGVkSW5zdGFuY2VzLnB1c2godGhpcyk7XG4gICAgICAgIGVtaXRDaGFuZ2UoKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIGVtaXRDaGFuZ2UoKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB2YXIgaW5kZXggPSBtb3VudGVkSW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gICAgICAgIG1vdW50ZWRJbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZW1pdENoYW5nZSgpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIHRoaXMucHJvcHMpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFNpZGVFZmZlY3Q7XG4gICAgfShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShTaWRlRWZmZWN0LCBcImRpc3BsYXlOYW1lXCIsIFwiU2lkZUVmZmVjdChcIiArIGdldERpc3BsYXlOYW1lKFdyYXBwZWRDb21wb25lbnQpICsgXCIpXCIpO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KFNpZGVFZmZlY3QsIFwiY2FuVXNlRE9NXCIsIGNhblVzZURPTSk7XG5cbiAgICByZXR1cm4gU2lkZUVmZmVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aXRoU2lkZUVmZmVjdDtcbiJdLCJzb3VyY2VSb290IjoiIn0=