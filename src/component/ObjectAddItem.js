require('codemirror/lib/codemirror.css');
require('codemirror/lib/codemirror.js');
require('codemirror/theme/material.css');
require('codemirror/mode/yaml/yaml.js');
require('codemirror/mode/javascript/javascript.js');
var React = znui.React || require('react');
var Radio = require('./Radio');
var RC = require('react-codemirror2');
var CodeMirror = RC ? RC.UnControlled: null;
//console.log(codemirror2);
//import { UnControlled as CodeMirror } from 'react-codemirror2';

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			_key: '',
			value: null,
			fold: true,
			parent: null,
			displayClosure: true,
			displayItemCount: true
		};
	},
	getInitialState: function () {
		return {
			_key: this.props._key || '',
			type: this.props.type || 'string',
			value: this.props.value || '',
			editable: true,
			removal: true,
			keyEditable: true,
		};
	},
	__onKeyChange: function (event){
		var _input = event.target;
		this.setState({
			_key: _input.value
		});
	},
	__onSelectChange: function (event){
		var _input = event.target;
		this.setState({
			type: _input.value
		});
	},
	__onInputChange: function (event){
		var _input = event.target;
		this.setState({
			value: _input.value
		});
	},
	__onKeyKeyUp: function (event){
		if(event.keyCode==13){
			this.state._key = event.target.value;
			this.__onCreate();
		}
	},
	__onValueKeyUp: function (event){
		if(event.keyCode==13){
			this.state.value = event.target.value;
			this.__onCreate();
		}
	},
	__renderValueInput: function (){
		switch(this.state.type){
			case "string":
				return <input ref={(ref)=>this._valuedom = ref} onKeyUp={this.__onValueKeyUp} value={this.state.value} onChange={(event)=>this.setState({ value: event.target.value })} className="input" name="value" type="text" />;
			case "number":
				return <input ref={(ref)=>this._valuedom = ref} onKeyUp={this.__onValueKeyUp} value={this.state.value} onChange={(event)=>this.setState({ value: event.target.value })} className="input" name="value" type="number" />;
			case "date":
				return <input ref={(ref)=>this._valuedom = ref} onKeyUp={this.__onValueKeyUp} value={this.state.value} onChange={(event)=>this.setState({ value: event.target.value })} className="input" name="value" type="date" />;
			case "boolean":
				return <Radio onChange={(data, index)=>this.setState({ value: data.value })} data={[{ label: 'True', value: true }, { label: 'False', value: false }]} style={{width: '100%'}} />;
			case "object":
			case "array":
			case "function":
				return <CodeMirror
                            value={''}
                            options={{
                                mode: 'json',
                                theme: 'material',
                                lineNumbers: true
                            }}
                            onChange={(editor, data, value) => {
								this.state.value = value;
                                this.forceUpdate();
                            }}
                        />;
		}
	},
	__onCreate: function (){
		if(this.state._key != undefined && !this.state._key){
			if(this._keydom){
				this._keydom.focus();
			}
			return alert("The Key is required."), false;
		}
		if(!this.state.type) {
			return alert("The Type is required."), false;
		}
		if(!this.state.value) {
			if(this._valuedom){
				this._valuedom.focus();
			}
			return alert("The Value is required."), false;
		}else{
			switch(this.state.type){
				case "object":
				case "array":
					this.state.value = JSON.parse(this.state.value);
					break;
				case "function":
					this.state.value = eval(this.state.value);
					break;
				case "number":
					this.state.value = (new Number(this.state.value)).valueOf();
					break;
				case "boolean":
					this.state.value = (new Boolean(this.state.value)).valueOf();
					break;
				case "date":
					this.state.value = (new Date(this.state.value)).toLocaleDateString();
					break;
			}
		}

		this.props.onSubmit && this.props.onSubmit(this.state);
	},
	render: function(){
		return (
			<div className={znui.react.classname("zr-json-component-object-add-item", this.props.className)} style={this.props.style}>
				<span title="CANCEL" onClick={this.props.onCancel} className="form-btn cancel">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" className="icon svg-inline--fa fa-times-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
				</span>
				{
					(this.state._key != null) && <div className="form-item">
						<span className="label">Key:</span>
						<input onKeyUp={this.__onKeyKeyUp} ref={(ref)=>this._keydom = ref} defaultValue={this.state._key} onChange={this.__onKeyChange} className="input" name="_key" type="text" />
					</div>
				}
				<div className="form-item">
					<span className="label">Type:</span>
					<select disabled={!!this.props.type} required defaultValue={this.state.value||"string"} className="rt-json-editor-data-type-select" onChange={this.__onSelectChange}>
						{
							[
								'string', 'number', 'boolean', 'date', 'object', 'array', 'function'
							].map(function (item, index){
								return <option key={index} value={item}>{item}</option>;
							})
						}
					</select>
				</div>
				<div className="form-item">
					<span className="label">Value: </span>
					{this.__renderValueInput()}
				</div>
				<div className="form-btns">
					<span onClick={this.__onCreate} className="form-btn submit">
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="icon svg-inline--fa fa-plus fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
						Create
					</span>
				</div>
			</div>
		);
	}
});
