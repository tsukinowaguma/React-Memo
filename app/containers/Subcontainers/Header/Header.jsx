import React, { Component } from 'react';
import Editor from '../Editor/Editor.jsx';

class Header extends Component {
	state ={
		edit :false
	}
	edit(){
		//开启新建编辑状态
		this.setState({
			edit:true
		});
	}
	update(newItem){
		//回调给父组件新增的组件的信息对象
		this.props.onAdd(newItem);
		this.props.memoMoniter();
	}
	editOff(){
		//关闭编辑状态
		this.setState({
			edit:false
		});
	}
	allFilter(){//当点击“全部”时回调给父组件过滤显示
		this.props.natureFilter('all');
	}
	studyFilter(){//当点击“学习”时回调给父组件过滤显示
		this.props.natureFilter('study');
	}	
	workFilter(){//当点击“工作”时回调给父组件过滤显示
		this.props.natureFilter('work');
	
	}
	lifeFilter(){//当点击“生活”时回调给父组件过滤显示
		this.props.natureFilter('life');

	}
	handleOrder(){ 
		this.props.orderChange(true);
	}
	handleReverse(){
		this.props.orderChange(false);
	}
	handleNew(newItem){//新建事件的集合
		//回调给父组件新增的组件信息对象
		this.update(newItem);
		//保存给localStorage
		this.props.setStorage();
		//关闭编辑状态
		this.editOff();
	}
	showAmount(){//显示组件类型数量
		let filter = this.props.filter;
		if(filter == 'study'){
			return <a>学习<span className='amount'>
				{this.props.natureNum.study}</span></a> 
		}else if(filter == 'work'){ 
			return <a>工作<span className='amount'>
				{this.props.natureNum.work}</span></a>
		}else if(filter == 'life'){
			return <a>生活<span className='amount'>
				{this.props.natureNum.life}</span></a>	
		}else {
			return <a>全部<span className='amount'>
				{this.props.amount}</span></a>
		}
	}
	render(){
		return(
			<div className='banner'>
				<div className='header-container'>
					<span id='total-title'>React-Memo</span>
					<ul id='selects'>
						<li onClick={() => this.edit()} className='select'><a>新建</a></li>
						<li id='filter-select' className='select drop' >
							{this.showAmount()}		
							<div className='drop-menu'>
								<a onClick={()=>this.allFilter()}>全部
									<span className='amount'>{this.props.amount}</span>
								</a>
								<a onClick={()=>this.studyFilter()}>学习
									<span className='amount'>{this.props.natureNum.study}</span>
								</a>
								<a onClick={()=>this.workFilter()}>工作
									<span className='amount'>{this.props.natureNum.work}</span>
								</a>
								<a onClick={()=>this.lifeFilter()}>生活
									<span className='amount'>{this.props.natureNum.life}</span>
								</a>
							</div>
						</li>
					<li className='select drop'>
						<a>  
							{	
								this.props.order? '按时间顺序排序' : '按时间逆序排序'
							}  
						</a>
						<div className='drop-menu'>
							<a onClick={() => this.handleOrder()}>按时间顺序排序
								{this.props.order? <span>√</span> : ''}
							</a>
							<a onClick={() => this.handleReverse()}>按时间逆序排序
								{this.props.order? '' : <span>√</span> }
							</a>
						</div>
					</li>
					</ul>
				</div>
				{	//覆盖面
					this.state.edit? <div className='cover'></div> : ''
				}
				{	//处于编辑状态则打开编辑器
					this.state.edit?
						<Editor handleNew={(newItem) => this.handleNew(newItem)} 
						editOff={() => this.editOff()} /> : ''
				}
			</div>
		)
	}
}

export default Header;