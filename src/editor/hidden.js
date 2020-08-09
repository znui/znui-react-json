var React = znui.React || require('react');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			
		};
	},
	getInitialState: function () {
		return {
			_key: this.props._key,
			value: this.props.value,
			editing: false
		};
	},
	render:function(){
		return (
			<div className={znui.react.classname("zr-json-editor-base zr-json-editor-hidden", this.props.className)} style={znui.react.style(this.props.style)}>
				
			</div>
		);
	}
});
