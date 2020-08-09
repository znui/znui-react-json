"use strict";

var React = require('react');

var comp = require('../component/index.js');

var ItemToolBar = comp.ItemToolBar;
var ObjectAddItem = comp.ObjectAddItem;
var SVGIcon = comp.SVGIcon;

var _array = React.createClass({
  displayName: "_array",
  getDefaultProps: function getDefaultProps() {
    return {
      fold: false,
      displayClosure: true,
      displayItemCount: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key,
      value: this.props.value || [],
      fold: this.props.fold,
      adding: false,
      editing: false
    };
  },
  getDefaultValueByType: function getDefaultValueByType(type) {
    if (type == 'array') {
      return [];
    }

    if (type == 'string' || type == 'date') {
      return '';
    }

    if (type == 'number') {
      return 0;
    }

    if (type == 'object') {
      return {};
    }

    if (type == 'function') {
      return function () {};
    }

    if (type == 'boolean') {
      return false;
    }
  },
  getValueFromSchema: function getValueFromSchema(schema) {
    var _type = Object.prototype.toString.call(schema).toLowerCase().split(' ')[1].replace(']', ''),
        _value = null;

    if (_type == 'array') {
      _value = [];
      schema.forEach(function (temp, index) {
        /*
        if(temp.schema){
        	_value.push(this.getValueFromSchema(temp.schema));
        }else{
        	_value.push(temp.value||this.getDefaultValueByType(temp.type));
        }*/
        _value.push(temp.value || this.getDefaultValueByType(temp.type));
      }.bind(this));
    } else if (_type == 'object') {
      _value = {};

      for (var key in schema) {
        var _temp = schema[key];
        /*
        if(_temp.schema){
        	_value[key] = this.getValueFromSchema(_temp.schema);
        }else{
        	_value[key] = _temp.value || null;
        }*/

        _value[key] = _temp.value || this.getDefaultValueByType(_temp.type);
      }
    }

    return _value;
  },
  __onChildValueInitial: function __onChildValueInitial(key, value, child, index) {},
  __onChildRemove: function __onChildRemove(key, child, index) {
    if (window.confirm("Do you really want to delete the key?")) {
      this.state.value.splice(index, 1);
      this.forceUpdate();
      this.props.onChange && this.props.onChange({
        key: key,
        value: undefined
      }, child, this);
    }
  },
  __onChildChange: function __onChildChange(data, child, index) {
    if (this == child.props.parent) {
      if (!data.updated && data.prevValue != data.value) {
        this.state.value.splice(index, 1, data.value);
        this.forceUpdate();
      }
    }

    this.props.onChange && this.props.onChange(data, child, this);
  },
  __onRemove: function __onRemove() {
    this.props.onRemove && this.props.onRemove(this.props._key);
  },
  __onCreateSubmit: function __onCreateSubmit(data) {
    this.state.value.push(data.value);
    this.state.adding = false;
    this.forceUpdate();
    this.props.onChange && this.props.onChange(data, this, this);
  },
  __onCreateCancel: function __onCreateCancel() {
    this.setState({
      adding: false
    });
  },
  __onKeyInputBlur: function __onKeyInputBlur(event) {
    var _prevKey = this.state._key,
        _key = event.target.value;
    this.setState({
      editing: false,
      _key: _key
    });
    this.props.onChange && this.props.onChange({
      prevKey: _prevKey,
      key: _key,
      value: this.state.value
    }, this, this);
  },
  __renderEditor: function __renderEditor() {
    return /*#__PURE__*/React.createElement(ObjectAddItem, {
      type: this.props.dataType,
      _key: null,
      onSubmit: this.__onCreateSubmit,
      onCancel: this.__onCreateCancel
    });
  },
  __onAdd: function __onAdd() {
    if (this.props.schema) {
      var _value = this.getValueFromSchema(this.props.schema);

      this.state.value.push(_value);
      this.forceUpdate();
      this.props.onArrayItemAdded && this.props.onArrayItemAdded(_value, this);
      this.props.onChange && this.props.onChange(_value, this, this);
    } else {
      this.setState({
        adding: true
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
  render: function render() {
    var _this = this;

    var FIELDS = {
      array: _array,
      object: require('./object.js'),
      "function": require('./function.js'),
      string: require('./string.boolean.date.number.js'),
      "boolean": require('./string.boolean.date.number.js'),
      date: require('./string.boolean.date.number.js'),
      number: require('./string.boolean.date.number.js')
    };
    var _btns = [];

    if (this.props.editable !== false) {
      _btns.push({
        icon: 'faPlus',
        onClick: this.__onAdd
      });
    }

    if (this.props._key && this.props.keyEditable) {
      _btns.unshift({
        icon: 'faEdit',
        onClick: function onClick() {
          return _this.setState({
            editing: true
          });
        }
      });
    }

    if (this.props.parent && this.props.removal) {
      _btns.push({
        icon: 'faTrash',
        onClick: this.__onRemove
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-json-viewer-base zr-json-viewer-array", this.state.fold ? ' fold' : ' unfold', this.props.required ? ' required' : ''),
      style: znui.react.style(this.props.style)
    }, this.state.adding && this.__renderEditor(), /*#__PURE__*/React.createElement("div", {
      className: "field-warp object-warp"
    }, /*#__PURE__*/React.createElement("div", {
      className: "meta-data"
    }, /*#__PURE__*/React.createElement("span", {
      className: "fold-icon",
      onClick: function onClick() {
        return _this.setState({
          fold: !_this.state.fold
        });
      }
    }, /*#__PURE__*/React.createElement(SVGIcon, {
      icon: this.state.fold ? 'faCaretRight' : 'faCaretDown'
    })), this.state._key && /*#__PURE__*/React.createElement("div", {
      className: "_key"
    }, this.state.editing && this.props.keyEditable ? /*#__PURE__*/React.createElement("input", {
      onBlur: this.__onKeyInputBlur,
      defaultValue: this.state._key,
      className: "key-input",
      name: "_key",
      type: "text"
    }) : /*#__PURE__*/React.createElement("span", {
      title: this.props.title,
      className: "field-key _key-name"
    }, this.props.label || this.state._key), /*#__PURE__*/React.createElement("span", {
      className: "_key-colon"
    }, ":")), this.props.displayClosure && /*#__PURE__*/React.createElement("span", {
      className: "closure-start"
    }, '['), !!this.state.fold && /*#__PURE__*/React.createElement("span", {
      className: "dots",
      onClick: function onClick() {
        return _this.setState({
          fold: !_this.state.fold
        });
      }
    }, "..."), this.props.displayItemCount && /*#__PURE__*/React.createElement("span", {
      className: "item-count"
    }, "Array[", this.state.value.length, "]"), /*#__PURE__*/React.createElement(ItemToolBar, {
      items: _btns
    })), this.__renderDesc(), !!this.state.value.length && /*#__PURE__*/React.createElement("div", {
      className: "array-values"
    }, this.state.value.map(function (item, index) {
      var _this2 = this;

      var _type = Object.prototype.toString.call(item).toLowerCase().split(' ')[1].replace(']', ''),
          _Type = FIELDS[_type];

      return /*#__PURE__*/React.createElement("div", {
        key: index.toString() + Math.random().toString(),
        className: "array-value-item"
      }, /*#__PURE__*/React.createElement("div", {
        className: "separator"
      }, "-"), /*#__PURE__*/React.createElement(_Type, {
        type: _type,
        value: item,
        index: index,
        parent: this,
        removal: this.props.childRemoval == undefined ? true : this.props.childRemoval,
        pre: this.props.pre,
        fold: this.props.fold,
        editable: this.props.editable,
        schema: this.props.schema,
        displayClosure: this.props.displayClosure,
        displayItemCount: this.props.displayItemCount,
        valuesHandler: this.props.valuesHandler,
        onValueInitial: function onValueInitial(key, value, child) {
          return _this2.__onChildValueInitial(key, value, child, index);
        },
        onChange: function onChange(data, child) {
          return _this2.__onChildChange(data, child, index);
        },
        onRemove: function onRemove(key, child) {
          return _this2.__onChildRemove(key, child, index);
        }
      }));
    }.bind(this))), this.props.displayClosure && /*#__PURE__*/React.createElement("span", {
      className: "closure-end"
    }, ']')));
  }
});

module.exports = _array;