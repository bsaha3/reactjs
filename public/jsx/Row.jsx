import $ from 'jquery';
import React from 'react';

var Row = React.createClass({

    getInitialState: function () {
        return ({ data: this.props.data });
    },

    handleChange: function (str, e) {
        var data = this.props.data;
        data[str] = e.target.value;
        this.setState({ data: data });
    },

    render: function () {
        var style = { borderStyle: 'none' };
        // console.log(this.state.data);
        return (
            <tr key={this.props.index}>
                <td><input value={this.props.data.id} style={style}/></td>
                <td><input value={this.props.data.name} style={style} onChange={this.handleChange.bind(this, 'name') } onBlur={this.props.update.bind(this, this.props.data.id, this.state.data, this.props.index) }/></td>
                <td><input value={this.props.data.age} style={style} onChange={this.handleChange.bind(this, 'age') } onBlur={this.props.update.bind(this, this.props.data.id, this.state.data, this.props.index) }/></td>
                <td><input value={this.props.data.gender} style={style} onChange={this.handleChange.bind(this, 'gender') } onBlur={this.props.update.bind(this, this.props.data.id, this.state.data, this.props.index) }/></td>
                <td><input value={this.props.data.email} style={style} onChange={this.handleChange.bind(this, 'email') } onBlur={this.props.update.bind(this, this.props.data.id, this.state.data, this.props.index) }/></td>
                <td><input value={this.props.data.phone} style={style} onChange={this.handleChange.bind(this, 'phone') } onBlur={this.props.update.bind(this, this.props.data.id, this.state.data, this.props.index) }/></td>
                <td><button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' onClick={this.props.delete.bind(this, this.props.data.id) }>Delete</button></td>
            </tr>
        );
    }
});

export default Row;