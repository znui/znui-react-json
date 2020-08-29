"use strict";

var React = znui.React || require('react');

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
      }, item.icon && /*#__PURE__*/React.createElement("span", {
        className: "icon"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa " + item.icon
      })), item.label);
    }));
  }
});