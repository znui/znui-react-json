"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    return /*#__PURE__*/React.createElement("select", {
      required: true,
      className: znui.react.classname("zr-json-component-data-type-selector", this.props.className),
      style: znui.react.style
    }, ['string', 'number', 'boolean', 'date', 'object', 'array', 'function'].map(function (item, index) {
      return /*#__PURE__*/React.createElement("option", {
        key: index,
        value: item
      }, item);
    }));
  }
});