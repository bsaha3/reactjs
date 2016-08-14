var $=require('jquery');
var React=require('react');

var Create = React.createClass({

    getInitialState: function () {
        return ({
            data: {
                name: '',
                age: '',
                gender: '',
                email: '',
                phone: ''
            }
        });
    },

    handleCreate: function () {
        $.ajax({
            type: 'POST', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
            dataType: 'json', // Set datatype - affects Accept header
            url: "http://localhost:8080/emp", // A valid URL
            headers: { "Content-Type": "application/json" }, // X-HTTP-Method-Override set to PUT.
            data: JSON.stringify(this.state.data), // Some data e.g. Valid JSON as a string
            success: function () {
                alert('Created successfully');
                document.getElementById('f').remove();
            }
        });//end of POST ajax call
    },

    handleChange: function (str, e) {
        var data1 = this.state.data;
        data1[str] = e.target.value;
        this.setState({ data: data1 });
    },

    render: function () {
        //console.log(this.state.data);
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input defaultValue="" onChange={this.handleChange.bind(this, 'name') }/></td>
                            <td><input defaultValue="" onChange={this.handleChange.bind(this, 'age') }/></td>
                            <td><input defaultValue="" onChange={this.handleChange.bind(this, 'gender') }/></td>
                            <td><input defaultValue="" onChange={this.handleChange.bind(this, 'email') }/></td>
                            <td><input defaultValue="" onChange={this.handleChange.bind(this, 'phone') }/></td>
                        </tr>
                    </tbody>
                </table>
                <center>
                    <input type="button" value="Create New" className="btn btn-info" onClick={this.handleCreate}/>
                </center>
            </div>
        );
    }
});

module.exports=Create;