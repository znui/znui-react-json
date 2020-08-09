"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      data: this.props.data
    };
  },
  render: function render() {
    var _this = this;

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-json-viewer-base zr-json-viewer-comment", this.props.className),
      style: znui.react.style(this.props.style)
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "input",
      value: this.state.data,
      onChange: function onChange(event) {
        return _this.setState({
          data: event.target.value
        });
      }
    }));
  }
});