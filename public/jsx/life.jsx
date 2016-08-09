var App=React.createClass({

    getDefaultProps: function(){
        console.log("getDefaultProps");
    },

    getInitialState: function(){
        console.log("getInitialState");
        return null;
    },

    componentWillMount: function(){
        console.log("componentWillMount");
    },

    componentDidMount: function(){
        console.log("componentDidMount");
    },

    componentWillReceiveProps: function(){
        console.log("componentWillReceiveProps");
    },

    shouldComponentUpdate: function(){
        console.log("shouldComponentUpdate");
    },

    componentWillUpdate: function(){
        console.log("componentWillUpdate");
    },

    componentDidUpdate: function(){
        console.log("componentDidUpdate");
    },

    componentWillUnmount: function(){
        console.log("componentWillUnmount");
    },

    render: function () {
        console.log("render");
        return(
            <div>
                <h1>Hello World!!!</h1>
            </div>
        );
    }
});

ReactDOM.render(<App />,document.getElementById("content"));