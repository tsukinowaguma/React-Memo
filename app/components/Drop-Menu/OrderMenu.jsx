import React, { Component } from 'react';

class OrderMenus extends Component{
	handleClick(e){
		let key = e.currentTarget.getAttribute('data-key');
		if(key=='order') this.props.handleOrder(true);
		else if(key=='reverse') this.props.handleOrder(false);
	}
	render(){
		return(
			<div className='drop-menu'>
				<a onClick={(e) => this.handleClick(e)} data-key='order'>按时间顺序排序
					{this.props.order? <span>√</span> : ''}
				</a>
				<a onClick={(e) => this.handleClick(e)} data-key='reverse'>按时间逆序排序
					{this.props.order? '' : <span>√</span> }
				</a>
			</div>
		);
	}
}
export default OrderMenus