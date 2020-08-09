"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-json-viewer-base zr-json-viewer-function", this.props.className),
      style: znui.react.style(this.props.style)
    }, /*#__PURE__*/React.createElement("div", {
      className: "field-warp"
    }, /*#__PURE__*/React.createElement("div", {
      className: "type-tag"
    }), /*#__PURE__*/React.createElement("div", {
      className: "key"
    }, this.props.name), /*#__PURE__*/React.createElement("div", {
      className: "value"
    })));
  }
});