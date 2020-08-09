"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      data: []
    };
  },
  getInitialState: function getInitialState() {
    return {};
  },
  __onItemClick: function __onItemClick(item, index) {
    this.setState({
      value: item.value
    });
    this.props.onChange && this.props.onChange(item, index);
  },
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-json-component-radio", this.props.className),
      style: znui.react.style(this.props.style)
    }, this.props.data.map(function (item, index) {
      var _this = this;

      return /*#__PURE__*/React.createElement("div", {
        key: index,
        onClick: function onClick() {
          return _this.__onItemClick(item, index);
        },
        className: "radio-item " + (this.state.value == item.value ? 'actived' : '')
      }, /*#__PURE__*/React.createElement("span", {
        className: "item-tag"
      }), /*#__PURE__*/React.createElement("span", {
        className: "item-label"
      }, item.label));
    }.bind(this)));
  }
});