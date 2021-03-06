"use strict";

var React = znui.React || require('react');

var ItemToolBar = require("../component/ItemToolBar.js");

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      removal: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key || '',
      value: this.props.value || '',
      editing: false
    };
  },
  __parseDataType: function __parseDataType(value) {
    switch (this.props.type) {
      case "object":
      case "array":
        return JSON.parse(value);

      case "function":
        return eval(value);

      case "number":
        return new Number(value).valueOf();

      case "boolean":
        return new Boolean(value).valueOf();

      case "date":
        return new Date(value).toLocaleDateString();

      default:
        return value;
    }
  },
  __onUpdate: function __onUpdate() {
    var _prevKey = this.state._key,
        _prevValue = this.state.value,
        _key = _prevKey,
        _value = _prevValue;

    if (this._keydom) {
      _key = this._keydom.value;
    }

    if (this._valuedom) {
      _value = this.__parseDataType(this._valuedom.value);
    }

    this.setState({
      _key: _key,
      value: _value,
      editing: false
    });
    this.props.onChange && this.props.onChange({
      prevKey: _prevKey,
      prevValue: _prevValue,
      key: _key,
      value: _value
    }, this, this.props.parent);
  },
  __onRemove: function __onRemove() {
    this.props.onRemove && this.props.onRemove(this.state._key, this);
  },
  __renderValue: function __renderValue() {
    switch (this.props.type) {
      case "string":
        if (this.props.pre) {
          return /*#__PURE__*/React.createElement("pre", {
            className: "field-value"
          }, "\"", this.state.value, "\"");
        }

        return /*#__PURE__*/React.createElement("span", {
          className: "field-value"
        }, "\"", this.state.value, "\"");

      case "boolean":
        return /*#__PURE__*/React.createElement("span", {
          className: "field-value"
        }, this.state.value.toString());

      case "date":
        return /*#__PURE__*/React.createElement("span", {
          className: "field-value"
        }, "\"", this.state.value, "\"");

      case "number":
        return /*#__PURE__*/React.createElement("span", {
          className: "field-value"
        }, this.state.value);
    }
  },
  __onInputKeyUp: function __onInputKeyUp(event) {
    if (event.keyCode == 13) {
      var _value = this.__parseDataType(event.target.value);

      this.setState({
        value: _value,
        editing: false
      });
      this.props.onChange && this.props.onChange({
        key: this.state._key,
        prevValue: this.state.value,
        value: _value
      }, this, this.props.parent);
    }
  },
  __renderInput: function __renderInput() {
    var _this = this;

    if (this.props.type == "boolean") {
      return /*#__PURE__*/React.createElement("select", {
        ref: function ref(dom) {
          return _this._valuedom = dom;
        },
        required: true,
        defaultValue: this.state.value
      }, [true, false].map(function (item, index) {
        return /*#__PURE__*/React.createElement("option", {
          key: index,
          value: item
        }, item.toString());
      }));
    }

    if (this.props.values) {
      return /*#__PURE__*/React.createElement("select", {
        ref: function ref(dom) {
          return _this._valuedom = dom;
        },
        required: true,
        defaultValue: this.state.value
      }, this.props.values.map(function (item, index) {
        return /*#__PURE__*/React.createElement("option", {
          key: index,
          value: item
        }, item);
      }));
    }

    var _type = this.props.type || 'text';

    if (_type == 'string') {
      _type = 'text';
    }

    if (this.props.pre || this.props.textarea) {
      return /*#__PURE__*/React.createElement("textarea", {
        onKeyUp: this.__onInputKeyUp,
        ref: function ref(dom) {
          return _this._valuedom = dom;
        },
        defaultValue: this.state.value,
        className: "input",
        name: "value"
      });
    }

    return /*#__PURE__*/React.createElement("input", {
      onKeyUp: this.__onInputKeyUp,
      ref: function ref(dom) {
        return _this._valuedom = dom;
      },
      defaultValue: this.state.value,
      className: "input",
      name: "value",
      type: _type
    });
  },
  __renderEditableKey: function __renderEditableKey() {
    var _this2 = this;

    if (this.state._key) {
      return !!this.props.required || !this.props.keyEditable ? /*#__PURE__*/React.createElement("span", {
        className: "field-key"
      }, this.props.label || this.state._key) : /*#__PURE__*/React.createElement("input", {
        ref: function ref(dom) {
          return _this2._keydom = dom;
        },
        className: "input",
        defaultValue: this.state._key,
        name: "_key",
        type: "text"
      });
    }
  },
  __renderDesc: function __renderDesc() {
    if (this.props.desc) {
      return /*#__PURE__*/React.createElement("div", {
        className: "field-desc"
      }, this.props.desc);
    }
  },
  validate: function validate() {
    if (this.props.required) {
      switch (this.props.type) {
        case 'string':
        case 'date':
          if (this.state.value) {
            return true;
          } else {
            return false;
          }

        case 'boolean':
        case 'number':
          if (this.state.value !== undefined && this.state.value !== null) {
            return true;
          } else {
            return false;
          }

      }
    }
  },
  render: function render() {
    var _this3 = this;

    var _toolbars = [];

    if (this.props.editable !== false) {
      _toolbars.push({
        icon: 'fa-edit',
        onClick: function onClick() {
          return _this3.setState({
            editing: true
          });
        }
      });
    }

    if (this.props.removal && !this.props.required) {
      _toolbars.push({
        icon: 'fa-trash',
        onClick: this.__onRemove
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-json-editor-base zr-json-editor-string", this.props.required ? ' required' : '', this.props.hidden ? ' hidden' : '', this.props.className || ''),
      style: znui.react.style(this.props.style)
    }, !!this.state.editing ? /*#__PURE__*/React.createElement("div", {
      className: "field-warp string-editing editing-mode"
    }, /*#__PURE__*/React.createElement("div", {
      className: "meta-data"
    }, this.__renderEditableKey(), this.state._key && /*#__PURE__*/React.createElement("span", {
      className: "field-colon"
    }, ":"), this.__renderInput(), /*#__PURE__*/React.createElement("span", {
      className: "editing-btns"
    }, /*#__PURE__*/React.createElement("svg", {
      onClick: this.__onUpdate,
      title: "CONFIRM",
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "check-circle",
      className: "icon-btn svg-inline--fa fa-check-circle fa-w-16 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
    })), /*#__PURE__*/React.createElement("svg", {
      onClick: function onClick() {
        return _this3.setState({
          editing: false
        });
      },
      title: "CANCEL",
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "times-circle",
      className: "icon-btn svg-inline--fa fa-times-circle fa-w-16 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
    })))), this.__renderDesc()) : /*#__PURE__*/React.createElement("div", {
      className: "field-warp " + (this.props.type + "-warp")
    }, /*#__PURE__*/React.createElement("div", {
      className: "meta-data"
    }, this.state._key && /*#__PURE__*/React.createElement("span", {
      title: this.props.title,
      className: "field-key"
    }, this.props.label || this.state._key), this.state._key && /*#__PURE__*/React.createElement("span", {
      className: "field-colon"
    }, ":"), this.__renderValue(), /*#__PURE__*/React.createElement(ItemToolBar, {
      items: _toolbars
    })), this.__renderDesc()));
  }
});