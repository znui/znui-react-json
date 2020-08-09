var React = znui.React || require('react');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			data: this.props.data
		};
	},
	render: function(){
		return (
			<div className={znui.react.classname("zr-json-viewer-base zr-json-viewer-comment", this.props.className)} style={znui.react.style(this.props.style)}>
				<textarea className="input" value={this.state.data} 
					onChange={(event)=>this.setState({ data: event.target.value })} />
			</div>
		);
	}
});
