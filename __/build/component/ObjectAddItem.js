"use strict";

require('codemirror/lib/codemirror.css');

require('codemirror/lib/codemirror.js');

require('codemirror/theme/material.css');

require('codemirror/mode/yaml/yaml.js');

require('codemirror/mode/javascript/javascript.js');

var React = znui.React || require('react');

var Radio = require('./Radio');

var RC = require('react-codemirror2');

var CodeMirror = RC ? RC.UnControlled : null; //console.log(codemirror2);
//import { UnControlled as CodeMirror } from 'react-codemirror2';

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      _key: '',
      value: null,
      fold: true,
      parent: null,
      displayClosure: true,
      displayItemCount: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key || '',
      type: this.props.type || 'string',
      value: this.props.value || '',
      editable: true,
      removal: true,
      keyEditable: true
    };
  },
  __onKeyChange: function __onKeyChange(event) {
    var _input = event.target;
    this.setState({
      _key: _input.value
    });
  },
  __onSelectChange: function __onSelectChange(event) {
    var _input = event.target;
    this.setState({
      type: _input.value
    });
  },
  __onInputChange: function __onInputChange(event) {
    var _input = event.target;
    this.setState({
      value: _input.value
    });
  },
  __onKeyKeyUp: function __onKeyKeyUp(event) {
    if (event.keyCode == 13) {
      this.state._key = event.target.value;

      this.__onCreate();
    }
  },
  __onValueKeyUp: function __onValueKeyUp(event) {
    if (event.keyCode == 13) {
      this.state.value = event.target.value;

      this.__onCreate();
    }
  },
  __renderValueInput: function __renderValueInput() {
    var _this = this;

    switch (this.state.type) {
      case "string":
        return /*#__PURE__*/React.createElement("input", {
          ref: function ref(_ref) {
            return _this._valuedom = _ref;
          },
          onKeyUp: this.__onValueKeyUp,
          value: this.state.value,
          onChange: function onChange(event) {
            return _this.setState({
              value: event.target.value
            });
          },
          className: "input",
          name: "value",
          type: "text"
        });

      case "number":
        return /*#__PURE__*/React.createElement("input", {
          ref: function ref(_ref2) {
            return _this._valuedom = _ref2;
          },
          onKeyUp: this.__onValueKeyUp,
          value: this.state.value,
          onChange: function onChange(event) {
            return _this.setState({
              value: event.target.value
            });
          },
          className: "input",
          name: "value",
          type: "number"
        });

      case "date":
        return /*#__PURE__*/React.createElement("input", {
          ref: function ref(_ref3) {
            return _this._valuedom = _ref3;
          },
          onKeyUp: this.__onValueKeyUp,
          value: this.state.value,
          onChange: function onChange(event) {
            return _this.setState({
              value: event.target.value
            });
          },
          className: "input",
          name: "value",
          type: "date"
        });

      case "boolean":
        return /*#__PURE__*/React.createElement(Radio, {
          onChange: function onChange(data, index) {
            return _this.setState({
              value: data.value
            });
          },
          data: [{
            label: 'True',
            value: true
          }, {
            label: 'False',
            value: false
          }],
          style: {
            width: '100%'
          }
        });

      case "object":
      case "array":
      case "function":
        return /*#__PURE__*/React.createElement(CodeMirror, {
          value: '',
          options: {
            mode: 'json',
            theme: 'material',
            lineNumbers: true
          },
          onChange: function onChange(editor, data, value) {
            _this.state.value = value;

            _this.forceUpdate();
          }
        });
    }
  },
  __onCreate: function __onCreate() {
    if (this.state._key != undefined && !this.state._key) {
      if (this._keydom) {
        this._keydom.focus();
      }

      return alert("The Key is required."), false;
    }

    if (!this.state.type) {
      return alert("The Type is required."), false;
    }

    if (!this.state.value) {
      if (this._valuedom) {
        this._valuedom.focus();
      }

      return alert("The Value is required."), false;
    } else {
      switch (this.state.type) {
        case "object":
        case "array":
          this.state.value = JSON.parse(this.state.value);
          break;

        case "function":
          this.state.value = eval(this.state.value);
          break;

        case "number":
          this.state.value = new Number(this.state.value).valueOf();
          break;

        case "boolean":
          this.state.value = new Boolean(this.state.value).valueOf();
          break;

        case "date":
          this.state.value = new Date(this.state.value).toLocaleDateString();
          break;
      }
    }

    this.props.onSubmit && this.props.onSubmit(this.state);
  },
  render: function render() {
    var _this2 = this;

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-json-component-object-add-item", this.props.className),
      style: this.props.style
    }, /*#__PURE__*/React.createElement("span", {
      title: "CANCEL",
      onClick: this.props.onCancel,
      className: "form-btn cancel"
    }, /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "times-circle",
      className: "icon svg-inline--fa fa-times-circle fa-w-16 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
    }))), this.state._key != null && /*#__PURE__*/React.createElement("div", {
      className: "form-item"
    }, /*#__PURE__*/React.createElement("span", {
      className: "label"
    }, "Key:"), /*#__PURE__*/React.createElement("input", {
      onKeyUp: this.__onKeyKeyUp,
      ref: function ref(_ref4) {
        return _this2._keydom = _ref4;
      },
      defaultValue: this.state._key,
      onChange: this.__onKeyChange,
      className: "input",
      name: "_key",
      type: "text"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-item"
    }, /*#__PURE__*/React.createElement("span", {
      className: "label"
    }, "Type:"), /*#__PURE__*/React.createElement("select", {
      disabled: !!this.props.type,
      required: true,
      defaultValue: this.state.value || "string",
      className: "rt-json-editor-data-type-select",
      onChange: this.__onSelectChange
    }, ['string', 'number', 'boolean', 'date', 'object', 'array', 'function'].map(function (item, index) {
      return /*#__PURE__*/React.createElement("option", {
        key: index,
        value: item
      }, item);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form-item"
    }, /*#__PURE__*/React.createElement("span", {
      className: "label"
    }, "Value: "), this.__renderValueInput()), /*#__PURE__*/React.createElement("div", {
      className: "form-btns"
    }, /*#__PURE__*/React.createElement("span", {
      onClick: this.__onCreate,
      className: "form-btn submit"
    }, /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "plus",
      className: "icon svg-inline--fa fa-plus fa-w-14 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
    })), "Create")));
  }
});