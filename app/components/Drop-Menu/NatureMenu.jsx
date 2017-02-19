import React, { Component } from 'react';

class NatureMenu extends Component{
	handleClick(e){
		let key =e.currentTarget.getAttribute('data-key');
		this.props.filter(key);
	}
	render(){
		return(
			<div className='drop-menu'>
				<a onClick={(e) => this.handleClick(e)} data-key='all' >全部
					<span className='amount'>{this.props.amount}</span>
				</a>
				<a onClick={(e) => this.handleClick(e)} data-key='study'>学习
					<span className='amount'>{this.props.natureNum.study}</span>
				</a>
				<a onClick={(e) => this.handleClick(e)} data-key='work'>工作
					<span className='amount'>{this.props.natureNum.work}</span>
				</a>
				<a onClick={(e) => this.handleClick(e)} data-key='life'>生活
					<span className='amount'>{this.props.natureNum.life}</span>
				</a>
			</div>
		)
	}
}

export default NatureMenu;