var React = znui.React || require('react');
module.exports = React.createClass({
	render:function(){
		return (
			<div className={znui.react.classname("zr-json-component-item-toolbar", this.props.className)} style={this.props.style}>
				{
					this.props.items && this.props.items.map(function (item, index){
						return <span key={index} onClick={item.onClick} className="icon-btn" title={item.title||''}>
							{item.icon && <span className="icon"><i className={"fa " + item.icon} /></span>}
							{item.label}
						</span>;
					})
				}
			</div>
		);
	}
});
