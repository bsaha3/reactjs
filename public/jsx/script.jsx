
var Fetch=React.createClass({

    getInitialState: function(){
        return({data:[],upper:10,lower:0,pages:0,page:1});
    },

    //function for the next button click event
    next: function(){
        this.fetch("n");
    },

    //function for the previous button click event
    prev: function(){
        this.fetch("p");
    },

    componentWillMount: function(){
            this.fetch();
    },

    //function for deleting data
    handleDelete: function(event){
        
        var id=event.target.parentElement.parentElement.firstChild.textContent;
        var deleteElement=event.target.parentElement.parentElement;
             $.ajax({
                type:'DELETE',
                url: 'http://localhost:8080/emp/'+id,
                dataType: 'json',
                cache: false,
                success: function(){
                        alert("Successfully deleted");
						deleteElement.remove();				
                    }.bind(this) //end of the success function binding with current class object
                });//end of ajax call
    },

    //function for updating data
    handleUpdate: function(event){

        document.getElementById('ID').value=event.target.parentElement.parentElement.childNodes[0].textContent;
        document.getElementById('NAME').value=event.target.parentElement.parentElement.childNodes[1].textContent;
        document.getElementById('AGE').value=event.target.parentElement.parentElement.childNodes[3].textContent;
        document.getElementById('GENDER').value=event.target.parentElement.parentElement.childNodes[2].textContent;
        document.getElementById('EMAIL').value=event.target.parentElement.parentElement.childNodes[4].textContent;
        document.getElementById('PHONE').value=event.target.parentElement.parentElement.childNodes[5].textContent;
        document.getElementById('invisible').value=event.target.parentElement.parentElement;

        console.log(event.target.parentElement.parentElement);
        

    },

    //function for fetching the data
    fetch: function(s){
        var u=this.state.upper,l=this.state.lower,p=this.state.page;
        if(s=="n")
        {
            u=u+10,
            l=l+10,
            p=p+1;
            if(p>this.state.pages+1)
            {
                p=1;
                l=0;
                u=10;
            }
        }
        else if(s=="p")
        {
            u=u-10,
            l=l-10,
            p=p-1;
            if(p<1)
            {
                p=Math.round(this.state.pages);
                u=Math.round(this.state.pages)*10;
                l=Math.round(this.state.pages-1)*10;

            }
        }
        $.ajax({
                url: '/emp?_start='+l+'&_end='+u,
                dataType: 'json',
                cache: false,
                success: function(data1,type,xhr){
                        //getting the total records count
                        var p1=(xhr.getAllResponseHeaders().split('\n')[13].split(':')[1].trim())/10;

                        this.setState({data:data1,upper:u,lower:l,pages:p1,page:p});
                    }.bind(this) //end of the success function binding with current class object
                });//end of ajax call
    },

    render: function(){
        console.log("hi");

        var style={width: (this.state.page/Math.round(this.state.pages))*100+'%'};
        
        var rows=this.state.data.map(function(d,index){
            return(
                <tr key={index}>
                   
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.gender}</td>
                    <td>{d.age}</td>
                    <td>{d.email}</td>
                    <td>{d.phone}</td>
                    <td><button href="#myModal" data-toggle="modal" className="btn btn-info" onClick={this.handleUpdate}>Update</button></td>
                    <td><input type="button" value="Delete" className="btn btn-danger" onClick={this.handleDelete}/></td>
                </tr>
            );
        }.bind(this));

        return(
            <div>
            <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Update</th>
                    <th>Delete</th>
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
                <span className="badge">Showing {this.state.lower+1} to {this.state.upper} records</span>
                
                <center><h3>{this.state.pages*10} records in total</h3></center>
            </div>
        );//end of return
    }//end of render function
});

var Create=React.createClass({

    handleCreate:function(){

        var name=document.getElementById('name').value,
            age=document.getElementById('age').value,
            gender=document.getElementById('gender').value,
            email=document.getElementById('email').value,
            phone=document.getElementById('phone').value;
                $.ajax({
					    type: 'POST', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
					    dataType: 'json', // Set datatype - affects Accept header
					    url: "http://localhost:8080/emp", // A valid URL
					    headers: {"Content-Type": "application/json"}, // X-HTTP-Method-Override set to PUT.
					    data: JSON.stringify({
					    	name: name,
					    	age: age,
					    	gender: gender,
					    	email: email,
					    	phone: phone
					    }), // Some data e.g. Valid JSON as a string
                        success: function(){
                            alert('Created successfully');
                        }
					});//end of POST ajax call
    },

    render: function(){
        var style={width:(this.state.page/Math.round(this.state.pages))*100+'%'};
        return(
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
                        <td><input id="name"/></td>
                        <td><input id="age"/></td>
                        <td><input id="gender"/></td>
                        <td><input id="email"/></td>
                        <td><input id="phone"/></td>
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

var Modal=React.createClass({
    handleUpdate: function(){
        var id=document.getElementById('ID').value,
            name=document.getElementById('NAME').value,
            age=document.getElementById('AGE').value,
            gender=document.getElementById('GENDER').value,
            email=document.getElementById('EMAIL').value,
            phone=document.getElementById('PHONE').value;
        
                    $.ajax({
					    type: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
					    dataType: 'json', // Set datatype - affects Accept header
					    url: "http://localhost:8080/emp/"+id, // A valid URL
					    headers: {"Content-Type": "application/json"}, // X-HTTP-Method-Override set to PUT.
					    data: JSON.stringify({
						    	id: id,
						    	name: name,
						    	age: age,
						    	gender: gender,
						    	email: email,
						    	phone: phone
							}),
                        success: function(){
                            alert('Data updated successfully');
                            console.log(document.getElementById('invisible').value);
                            

                        }
						});
    },
    render: function(){

        var style={display:'none'};
        return(
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Employee Details !</h4>
                            </div> 

                            <div className="modal-body">									
                                <form action="#" className="navbar-form">
                                    
                                    <label>ID</label><br/>
                                    <input type="text" className="form-control" disabled="disabled" id="ID"/><br/>
                                    
                                    <label >Name</label><br/>
                                    <input type="text" className="form-control" id="NAME"/><br/>
                                    
                                    <label >Age</label><br/>
                                    <input type="text" className="form-control" id="AGE"/><br/>
                                    
                                    <label >Gender</label><br/>
                                    <input type="text" className="form-control" id="GENDER"/><br/>
                                    
                                    <label >Email</label><br/>
                                    <input type="text" className="form-control" id="EMAIL"/><br/>
                                    
                                    <label >Phone</label><br/>
                                    <input type="text" className="form-control" id="PHONE"/><br/>

                                    <input type="text" className="form-control" id="invisible" style={style}/>

                                    <button type="button" className="btn btn-primary" data-dismiss="modal" id="update" onClick={this.handleUpdate}>
                                        Update
                                    </button>
                                </form>
                                                            
                            </div>
                        </div> 
                    </div>
                </div>
        );
    }
});

ReactDOM.render(<Modal />,document.getElementById("m"));

var App=React.createClass({
    handleClick: function(){
        ReactDOM.render(<Fetch />,document.getElementById("f"));
    },

    handleCreate: function(){
        ReactDOM.render(<Create />,document.getElementById("f"));
    },

    render: function () {
        return(
            <div>
                <input type="button" value="fetch" className="btn btn-primary" onClick={this.handleClick}/>
                <input type="button" value="create" className="btn btn-default" onClick={this.handleCreate}/>
            </div>
        );
    }
});

ReactDOM.render(<App />,document.getElementById("fetch"));