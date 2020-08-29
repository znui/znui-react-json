"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = znui.React || require('react');

var ItemToolBar = require('../component/ItemToolBar.js');

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      removal: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key,
      value: this.props.value,
      valueSchema: null
    };
  },
  componentDidMount: function componentDidMount() {
    this.setState({
      valueSchema: this.__matchItem(this.props.keys, this.state._key)
    });
  },
  __matchItem: function __matchItem(data, key) {
    for (var i = 0, _len = data.length; i < _len; i++) {
      if (data[i].key == key) {
        return data[i];
      }
    }
  },
  __renderEditableKey: function __renderEditableKey() {
    return /*#__PURE__*/React.createElement("select", {
      className: "editable-key",
      onChange: this.__doKeyChange,
      required: true,
      defaultValue: this.state._key
    }, this.props.keys.map(function (item, index) {
      return /*#__PURE__*/React.createElement("option", {
        key: index,
        value: item.key
      }, item.key);
    }));
  },
  __doKeyChange: function __doKeyChange(event) {
    var _key = event.target.value,
        _schema = this.__matchItem(this.props.keys, _key),
        _value = this.props.parent.__getSchemaInitialValue(_schema);

    this.props.parent.state.value[this.state._key] = null;
    delete this.props.parent.state.value[this.state._key];
    this.props.parent.state.value[_key] = _value;
    this.setState({
      _key: _key,
      value: _value,
      valueSchema: _schema
    });
  },
  __renderInput: function __renderInput() {
    if (this.state.valueSchema) {
      var types = require('./index');

      var _Type = types[this.state.valueSchema.type];

      if (_Type) {
        return /*#__PURE__*/React.createElement(_Type, _extends({}, this.props, this.state.valueSchema, {
          _key: this.state._key,
          value: this.state.value
        }));
      }
    }
  },
  __renderDesc: function __renderDesc() {
    if (this.props.desc) {
      return /*#__PURE__*/React.createElement("div", {
        className: "field-desc"
      }, /*#__PURE__*/React.createElement("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fas",
        "data-icon": "info-circle",
        className: "svg-inline--fa fa-info-circle fa-w-16 ",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
      })), this.props.desc);
    }
  },
  __onRemove: function __onRemove() {
    this.props.onRemove && this.props.onRemove(this.state._key, this);
  },
  render: function render() {
    var _toolbars = [];

    if (this.props.removal && !this.props.required) {
      _toolbars.push({
        icon: 'fa-trash',
        onClick: this.__onRemove
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname('zr-json-viewer-base zr-json-viewer-dynamic', this.props.required ? ' required' : '', this.props.className || ''),
      style: znui.react.style(this.props.style)
    }, /*#__PURE__*/React.createElement("div", {
      className: "field-warp dynamic-editing"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dynamic-meta meta-data"
    }, this.__renderEditableKey(), /*#__PURE__*/React.createElement(ItemToolBar, {
      items: _toolbars
    })), /*#__PURE__*/React.createElement("div", {
      className: "dynamic-input"
    }, this.__renderInput())), this.__renderDesc());
  }
});