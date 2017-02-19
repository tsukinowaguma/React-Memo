import React, { Component } from 'react';
import ReactDOM from 'react-dom'


class Editor extends Component {
	state={
		titlevalue:'',
		textvalue:''
	}
	handleText(e){
		//使设定input的value时能改变
		e.target.type == 'text'? 	
			this.setState({titlevalue:e.target.value}) :
			this.setState({textvalue:e.target.value}) ;
	}
	handleAdd(){	//确认新建笔记时
		//显示当前时间
		const date = new Date();
		const [year,month,day,hour,min] = [date.getFullYear(),date.getMonth()+1,
											date.getDate(),date.getHours(),
											date.getMinutes() ];
		let time =year + ',' + month +'-' + day + ',' + hour + ':' + min;
		//获得select的真实DOM
		const select = ReactDOM.findDOMNode(this.refs.rnature); 
		//获取select选中后的值
		let nature = [].filter.call(select.options, (o) => {
      		  return o.selected;
    		}).map( (o) => {
      		  return o.value;
   			})[0];
   		//获取标题输入框和内容输入框的值
		const newItem = {title:this.state.titlevalue,
						 context:this.state.textvalue,
						 nature:nature,
						 time:time};
		this.props.handleNew(newItem);
	}
	handleCancel(){
		this.props.editOff();
	}
	render(){
		return(
			<div className='editor'>
				<form>
					<div className='editor-header'>
						<input type="text" value={this.state.titlevalue} onChange={(e) => this.handleText(e)}
							placeholder = "标题" className='form-control' />
						<select name="nature" ref='rnature' className='form-control' >
							<option value="study" >学习</option>
							<option value="work" >工作</option>
							<option value="life" >生活</option>
						</select>
					</div>
					<textarea  value={this.state.textvalue} placeholder = "内容" className='form-control' 
					onChange={(e) => this.handleText(e)} />
					<div className='editor-btt'>
						<span onClick={() => this.handleAdd()} >确认</span>
						<span onClick={() => this.handleCancel()} >取消</span>
					</div>
				</form>
			</div>
		)
	}
}

export default Editor;