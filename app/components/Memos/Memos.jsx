import React, { Component } from 'react';


class Memos extends Component {
	handleDel(){
		let isDel = confirm('是否要删除' + this.props.prop.info.title);
		if(isDel) this.props.onDel(this.props.index);
	}
	getRev(){
		this.props.getRevIndex(this.props.index);
	}
	getPara(){
		let paras = this.props.prop.info.context.split('\n'); //Array
		return paras;
	}
	getCNNature(){
		let nature = this.props.prop.info.nature;
		let cn_nature;
		if(nature === 'work'){
			cn_nature = '工作';
		}else if(nature === 'life'){
			cn_nature = '生活';
		}else {
			cn_nature = '学习';
		}
		return cn_nature;
	}
	render(){
		return(
			<div className='memo-container'>
				<div className='memo'>
					<div className= 'memo-header'>
						<span className='memo-title'>{this.props.prop.info.title}</span>
						<div className='memo-tools'>
							{
								this.props.edit? <span className='del'>删除</span>
									: <span onClick={() => this.handleDel()} className='del'>删除</span>

							}
							{
								this.props.edit? <span className='rev'>修改</span>
									: <span onClick={() => this.getRev()} className='rev'>修改</span>
							}
						</div>
					</div>
					<div className='memo-info'>			
						<span>{this.props.prop.info.time}</span>		
						<span>分类:{this.getCNNature()}</span>
					</div>
					<div>
						<div className='memo-context'>
							{
								this.getPara().map((item,index) => <p>{item}</p>)
							}
						</div>
					</div>
			</div>
			</div>
		);
	}
}

export default Memos;