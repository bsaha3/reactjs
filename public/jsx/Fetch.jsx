import $ from 'jquery';
import React from 'react';
import Create from './Create.jsx';
import Row from './Row.jsx';
import ReactDOM from 'react-dom';

var Fetch = React.createClass({

    getInitialState: function () {
        return ({ data: [], upper: 10, lower: 0, pages: 0, page: 1 });
    },

    //function for the next button click event
    next: function () {
        this.fetch("n");
    },

    //function for the previous button click event
    prev: function () {
        this.fetch("p");
    },

    componentWillMount: function () {
        this.fetch();
    },

    //function for updating data
    handleUpdate: function (id, d, index, e) {

        var dataUpdated = this.state.data;
        dataUpdated[index] = d;
        this.setState({ data: dataUpdated });

        $.ajax({
            type: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
            dataType: 'json', // Set datatype - affects Accept header
            url: "http://localhost:8080/emp/" + id, // A valid URL
            headers: { "Content-Type": "application/json" }, // X-HTTP-Method-Override set to PUT.
            data: JSON.stringify(d),
            success: function () {
                //    console.log('a');   
            }
        });
    },

    //function for deleting data
    handleDelete: function (id, e) {
        //e.target.parentElement.parentElement.remove();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/emp/' + id,
            dataType: 'json',
            cache: false,
            success: function () {
                this.fetch();
            }.bind(this) //end of the success function binding with current class object
        });//end of ajax call
    },

    //function for fetching the data
    fetch: function (s) {

        var u = this.state.upper, l = this.state.lower, p = this.state.page;
        if (s == "n") {
            u = u + 10,
                l = l + 10,
                p = p + 1;
            if (p > this.state.pages + 1) {
                p = 1;
                l = 0;
                u = 10;
            }
        }
        else if (s == "p") {
            u = u - 10,
                l = l - 10,
                p = p - 1;
            if (p < 1) {
                p = Math.round(this.state.pages);
                u = Math.round(this.state.pages) * 10;
                l = Math.round(this.state.pages - 1) * 10;

            }
        }
        $.ajax({
            url: '/emp?_start=' + l + '&_end=' + u,
            dataType: 'json',
            cache: false,
            success: function (data1, type, xhr) {
                // console.log(JSON.stringify(xhr.getAllResponseHeaders().split('\r\n')));
                //getting the total records count
                var p1 = (xhr.getAllResponseHeaders().split('\n')[13].split(':')[1].trim()) / 10;

                this.setState({ data: data1, upper: u, lower: l, pages: p1, page: p });
            }.bind(this) //end of the success function binding with current class object
        });//end of ajax call
    },

    handleCreate: function () {
        ReactDOM.render(<Create />, document.getElementById("f"));
    },

    head: ['ID',
        'Name',
        'Age',
        'Gender',
        'Email',
        'Phone',
        'Delete'],

    render: function () {
        console.log("hi");

        var style = { width: (this.state.page / Math.round(this.state.pages)) * 100 + '%' };

        var header = this.head.map(function (h, index) {
            return (
                <th key={index}>{h}</th>
            );
        }.bind(this));

        // console.log(this.state.data);
        var rows = this.state.data.map(function (d, index) {

            return (
                <Row data={d} key={index} index={index} update={this.handleUpdate} delete={this.handleDelete}/>
            );
        }.bind(this));

        return (
            <div>

                <table className="table">
                    <thead>
                        <tr>
                            {header}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <nav>
                    <ul className="pager">
                        <li><a id="1" type="button" onClick={this.prev}>Prev</a></li>

                        <li><a id="1" type="button" onClick={this.next}>Next</a></li>
                    </ul>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={style}>
                        </div>
                    </div>
                </nav>
                <h4></h4>
                <span className="badge pull-right">{this.state.page}</span>
                <span className="badge">Showing {this.state.lower + 1} to {this.state.upper} records</span>
                <center><h3>{this.state.pages * 10} records in total</h3></center>
                <input type="button" value="create" className="btn btn-default" onClick={this.handleCreate}/>
            </div>
        );//end of return
    }//end of render function
});

export default Fetch;