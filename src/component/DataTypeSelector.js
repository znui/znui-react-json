var React = znui.React || require('react');
module.exports = React.createClass({
	render:function(){
		return (
			<select required className={znui.react.classname("zr-json-component-data-type-selector", this.props.className)} style={znui.react.style}>
				{
					[
						'string', 'number', 'boolean', 'date', 'object', 'array', 'function'
					].map(function (item, index){
						return <option key={index} value={item}>{item}</option>;
					})
				}
			</select>
		);
	}
});
