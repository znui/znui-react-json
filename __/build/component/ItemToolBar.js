"use strict";

var React = znui.React || require('react');

var SVGIcon = require('./SVGIcon');

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-json-component-item-toolbar", this.props.className),
      style: this.props.style
    }, this.props.items && this.props.items.map(function (item, index) {
      return /*#__PURE__*/React.createElement("span", {
        key: index,
        onClick: item.onClick,
        className: "icon-btn",
        title: item.title || ''
      }, item.icon && /*#__PURE__*/React.createElement(SVGIcon, {
        icon: item.icon
      }), item.label);
    }));
  }
});