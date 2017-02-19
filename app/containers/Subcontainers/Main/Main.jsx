import React, { Component } from 'react';
import { Memos } from '../../../components/index.js';
import RevEditor from '../Editor/RevEditor';

class Main extends Component {
	state = {
		editor:false,	//子组件修改状态
		revindex:-1		//子组件触动事件的序号
	}
	onDel(index){
		//当子Memos组件触动删除事件时回调给父组件
		this.props.memos.splice(index, 1);
		this.props.onDelRev(this.props.memos);
		this.props.setStorage();
		this.props.memoMoniter();
	}
	getRevIndex(index){
		//当子组件触动修改事件时改变state
		this.setState({
			editor:true,
			revindex:index
		});
	}
	setRevMemo(revItem){	//获取子组件修改后传递过来的对象信息
		let revMemos =this.props.memos;
		let index = this.state.revindex;
		//改变修改的信息，将生成的新memos对象回调给父组件
		revMemos[index].info.title =revItem.title;
		revMemos[index].info.context =revItem.context;
		this.props.onDelRev(revMemos);
	}
	editOff(){
		//关闭编辑状态
		this.setState({
			editor:false
		})		
	}
	handleRev(revItem){//修改事件的集合
		//修改后的对象回调给父组件
		this.setRevMemo(revItem);
		//保存给localStorage
		this.props.setStorage();
		//关闭编辑状态
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
				 				edit={this.state.editor}  memoHeight={this.props.memoHeight} /> : '' 
				 		})
					}
				</div>
				{
					this.state.editor? 
						<div className='cover' style={{height:window.innerHeight +'px'}}></div> : ''
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