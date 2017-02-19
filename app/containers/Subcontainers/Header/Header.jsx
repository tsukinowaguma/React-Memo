import React, { Component } from 'react';
import Editor from '../Editor/Editor.jsx';
import { NatureMenu } from '../../../components/index.js'
import { OrderMenu } from '../../../components/index.js'

class Header extends Component {
	state ={
		edit :false,
		menuShow : -1
	}
	componentDidMount(){
		//点击外层时菜单关闭
		window.addEventListener('click',(e) =>{
			this.setState({
				menuShow:-1
			});	
		},false);
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
	handleFilter(key){//当点击“全部”时回调给父组件过滤显示
		this.props.natureFilter(key);
	}
	handleOrder(key){ 
		this.props.orderChange(key);
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
		switch(filter ){
			case 'study' : {
				return <a>学习<span className='amount'>
					{this.props.natureNum.study}</span></a> 
			}break;
			case 'work' : {
				return <a>工作<span className='amount'>
					{this.props.natureNum.work}</span></a> 
			}break;
			case 'life' : {
				return <a>生活<span className='amount'>
					{this.props.natureNum.life}</span></a> 
			}break;
			case 'all' :{
				return <a>全部<span className='amount'>
					{this.props.amount}</span></a>
			}break;
		}
	}
	handleShowMenu(e){
		e.nativeEvent.stopImmediatePropagation();
		let menuIndex = e.currentTarget.getAttribute('data-index');
		let menuShow = this.state.menuShow;
		if(menuIndex == menuShow){
			this.setState({
				menuShow:0
			});
			return;
		}else{
			this.setState({
				menuShow:menuIndex
			});
			return;
		}
	}
	handleMoblieMenu(e){
		e.nativeEvent.stopImmediatePropagation(e);
		let menuShow = this.state.menuShow;
		if(this.state.menuShow>=0) 	menuShow = -1;
		else menuShow = 0
		this.setState({
			menuShow:menuShow
		});
	}
	render(){
		return(
			<div className='banner'>
				<div className='header-container'>
					<div id='header'>
						<span id='total-title'>React-Memo</span>
						{
							this.props.isMobile? 
								<button id='menu' 
									onClick={(e)=>this.handleMoblieMenu(e)}>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button> : ''
						}
						</div>
					{
						this.state.menuShow >= 0 || !this.props.isMobile ?(
							<ul id='selects'>
								<li onClick={() => this.edit()} className='select'><a>新建</a></li>
								<li id='filter-select' className='select drop ' data-index= '1'
										onClick={(e) => this.handleShowMenu(e)} >
									{this.showAmount()}	
									{	
										this.state.menuShow == 1? 								
											<NatureMenu amount={this.props.amount} 
												filter={(key) => this.handleFilter(key)} 
												natureNum={this.props.natureNum} />  : ''
									}
								</li>
								<li className='select drop ' data-index='2'
										onClick={(e) => this.handleShowMenu(e)} >
									<a>  
										{this.props.order? '按时间顺序排序' : '按时间逆序排序'}  
									</a>
									{	
										this.state.menuShow == 2? 								
											<OrderMenu handleOrder={(key) => this.handleOrder(key)}
												order={this.props.order} />  : ''
									}
								</li>
						</ul> 
					) : ''
				}
			</div>
				{	//覆盖面
					this.state.edit? 
					<div className='cover' style={{height:window.innerHeight +'px'}}></div> : ''
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