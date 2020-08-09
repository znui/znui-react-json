var React = znui.React || require('react');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			
		};
	},
	render:function(){
		return (
			<div className={znui.react.classname("zr-json-editor-base zr-json-editor-function", this.props.className)} style={znui.react.style(this.props.style)}>
				<div className="field-warp">
					<div className="type-tag"></div>
					<div className="key">{this.props.name}</div>
					<div className="value">
						
					</div>
				</div>
			</div>
		);
	}
});
