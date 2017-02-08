import React, { Component } from 'react';
import ReactDOM from 'react-dom'


class Editor extends Component {
	handleAdd(){
		const date = new Date();
		const [year,month,day,hour,min] = [date.getFullYear(),date.getMonth()+1,
											date.getDate(),date.getHours(),
											date.getMinutes() ];
		let time =year + ',' + month +'-' + day + ',' + hour + ':' + min;
		const select = ReactDOM.findDOMNode(this.refs.rnature); 
		let nature = [].filter.call(select.options, function (o) {
      		  return o.selected;
    		}).map(function (o) {
      		  return o.value;
   			})[0];
		let [title,context] = [ReactDOM.findDOMNode(this.refs.rtitle).value,
								ReactDOM.findDOMNode(this.refs.rtext).value]
		const newItem = {title:title,
						 context:context,
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
						<input type="text" ref="rtitle" placeholder = "标题" className='form-control' />
						<select name="nature" ref='rnature' className='form-control' >
							<option value="study" >学习</option>
							<option value="work" >工作</option>
							<option value="life" >生活</option>
						</select>
					</div>
					<textarea  ref="rtext" placeholder = "内容" className='form-control' />
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