import React, { Component } from 'react';
import ReactDOM from 'react-dom'


class RevEditor extends Component {
	state={
		titlevalue:'',
		textvalue:''
	}
	componentWillMount(){
		this.setState({
			titlevalue:this.props.title,
			textvalue:this.props.context
		});
	}
	handleCancel(){
		this.props.editOff();
	}
	handleText(e){
		e.target.type == 'text'? 	
			this.setState({titlevalue:e.target.value}) :
			this.setState({textvalue:e.target.value}) ;
	}
	handleRev(){
		let revItem = {title:this.state.titlevalue,
				context:this.state.textvalue};
		this.props.handleRev(revItem);
	}
	render(){
		return(
			<div className='editor'>
				<form>
					<input type="text" placeholder = "标题" className='form-control rev-title' 
						value={this.state.titlevalue} onChange={(e) => this.handleText(e)} />
					<textarea   value={this.state.textvalue} placeholder= "内容" className='form-control'
						onChange={(e) => this.handleText(e)} />
					<div className='editor-btt'>
						<span onClick={() => this.handleRev()} >确认</span>
						<span onClick={() => this.handleCancel()} >取消</span>
					</div>
				</form>
			</div>
		)
	}
}

export default RevEditor;
