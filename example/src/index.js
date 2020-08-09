require('znui-react');
require('../../src/index.less');
require('./index.less');
var React = znui.React || require('react');
var json = require('../../src/index');

znui.react.createApplication({
    render: <div>
        <json.editor.object />
    </div>
});