import React, { Component } from 'react';


class Memos extends Component {
	handleDel(){ //点击删除时
		//提示框提示是否要删除
		let isDel = confirm('是否要删除 「 ' + this.props.prop.info.title + ' 」');
		//回调给父组件
		if(isDel) this.props.onDel(this.props.index);
	}
	getRev(){
		//回调给父组件序号
		this.props.getRevIndex(this.props.index);
	}
	getPara(){
		//将字符串根据换行符来切割成数组以便加上<p>标签来换行
		let paras = this.props.prop.info.context.split('\n'); //Array
		return paras;
	}
	getCNNature(){ //将类型变成中文
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
							{	//如果整个组件在编辑状态则不触动组件的删除事件防止误操作
								this.props.edit? <span className='del'>删除</span>
									: <span onClick={() => this.handleDel()} className='del'>删除</span>

							}
							{	//如果整个组件在编辑状态则不触动组件的修改事件防止误操作
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
							{	//遍历根据换行符切割成的数组加上p标签
								this.getPara().map((item) => <p>{item}</p>)
							}
						</div>
					</div>
			</div>
			</div>
		);
	}
}

export default Memos;