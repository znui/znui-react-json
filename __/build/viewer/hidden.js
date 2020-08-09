"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {};
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key,
      value: this.props.value,
      editing: false
    };
  },
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-json-viewer-base zr-json-viewer-hidden", this.props.className),
      style: znui.react.style(this.props.style)
    });
  }
});