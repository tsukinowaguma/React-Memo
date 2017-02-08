import React, { Component } from 'react';
import { Memos } from '../../../components/index.js';
import RevEditor from '../Editor/RevEditor';

class Main extends Component {
	state = {
		editor:false,
		revindex:-1
	}
	onDel(index){
		this.props.memos.splice(index, 1);
		this.props.onDelRev(this.props.memos);
		this.props.setStorage();
		this.props.memoMoniter();
	}
	getRevIndex(index){
		this.setState({
			editor:true,
			revindex:index
		});
	}
	setRevMemo(revItem){
		let revMemos =this.props.memos;
		let index = this.state.revindex;
		revMemos[index].info.title =revItem.title;
		revMemos[index].info.context =revItem.context;
		this.props.onDelRev(revMemos);
	}
	editOff(){
		this.setState({
			editor:false
		})		
	}
	handleRev(revItem){
		this.setRevMemo(revItem);
		this.props.setStorage();
		this.editOff();
	}
	render() {
		let revMemo = this.props.memos[this.state.revindex];
		return(
			<div className='main-container'>
				<div className='main'>
				 	{	
				 		//如果状态可见则生成Memos组件
				 		this.props.memos.map( (item,index) => { 
				 			return item.visible?
				 				<Memos  prop={item} index={index}  
				 				onDel={(index) => this.onDel(index)} 
				 				getRevIndex={(index) => this.getRevIndex(index)} 
				 				edit={this.state.editor}  /> : '' 
				 		})
					}
				</div>
				{
					this.state.editor? <div className='cover'></div> : ''
				}
				{
						//如果处于编辑状态则生成Memo修改编辑器
					this.state.editor? <RevEditor 
						title={revMemo.info.title}
						context={revMemo.info.context} 
						handleRev={(revItem) => this.handleRev(revItem)} 
						editOff={() => this.editOff()} /> : ''
				}
			</div>
		)
	}
}

export default Main;