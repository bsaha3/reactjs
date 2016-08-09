var Counter=React.createClass({

	getInitialState: function(){
			return {	v: '',
						
						c: 0

						};
	},

	addToCount: function(event){
		{if (this.state.c%2==0) { event.target.value='X' }
		else { event.target.value='O' }};
		this.abc(event.target.value);
	},

	abc: function(a){
		this.state.c=this.state.c + 1;

		if ((document.getElementById('a1').value==document.getElementById('a2').value && document.getElementById('a3').value==document.getElementById('a2').value)) 
		{ alert("Player "+a+" wins") }
		if ((document.getElementById('a4').value==document.getElementById('a5').value && document.getElementById('a6').value==document.getElementById('a5').value)) 
		{ alert("Player "+a+" wins") }
		if ((document.getElementById('a7').value==document.getElementById('a8').value && document.getElementById('a9').value==document.getElementById('a8').value)) 
		{ alert("Player "+a+" wins") }
		if ((document.getElementById('a7').value==document.getElementById('a8').value && document.getElementById('a9').value==document.getElementById('a8').value)) 
		{ alert("Player "+a+" wins") }
		if ((document.getElementById('a1').value==document.getElementById('a4').value && document.getElementById('a7').value==document.getElementById('a4').value)) 
		{ alert("Player "+a+" wins") }
		// if ((document.getElementById('a2').value==document.getElementById('a5').value && document.getElementById('a8').value==document.getElementById('a5').value)) 
		// { alert("Player "+a+" wins") }

		
	},

	render: function(){

		return(
				<div>
					<h1>{this.state.count}</h1>
					<input type="button" value="  " id="a1" onClick={this.addToCount}/>
					<input type="button" value=" " id="a2" onClick={this.addToCount}/>
					<input type="button" value="   " id="a3" onClick={this.addToCount}/><br/>
					<input type="button" value="  " id="a4" onClick={this.addToCount}/>
					<input type="button" value=" " id="a5" onClick={this.addToCount}/>
					<input type="button" value="   " id="a6" onClick={this.addToCount}/><br/>
					<input type="button" value="  " id="a7" onClick={this.addToCount}/>
					<input type="button" value=" " id="a8" onClick={this.addToCount}/>
					<input type="button" value="   " id="a9" onClick={this.addToCount}/>
				</div>
			);
	}
});

ReactDOM.render(<Counter/>,document.body);