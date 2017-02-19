import React, { Component } from 'react';
import { Header, Main } from './Subcontainers/subcontains.js';

export default class App extends Component {
	state = {
		memos:[],		//存储笔记组件的信息，每一个Memo组件为memos数组中的一个对象
		order:true,		//排序方法，true为时间顺序,false为时间逆序
		background:{top:0, left:0},		//背景图片位置信息
		natureNum:{study:0, work:0, life:0}, //用于存储笔记类型（学习、工作、生活）的数量 
		filter:'all',		//类型过滤方式，选值为'all'、'study'、'work'、'life'
		isMobile:false,	//检测是否为手机（小屏幕）
		memoHeight:'' 	//memo组件的高度
	}
	componentWillMount(){
		//检测是否为手机端（小屏幕）
		this.setIsMobile();
		window.onresize = () => this.setIsMobile();
	}
	componentDidMount(){ //初始化，让state初始化为localStroage所保存的state 
		let str = window.localStorage.getItem('memos');
		let order = window.localStorage.getItem('order');
		let memos;
		if(str){ //如果不是第一次打开则初始之前保存的状态	
			memos = JSON.parse(str); 
			if(order == 'false'){
				memos.reverse();
			}
			this.init(memos);
		}else{ //第一次打开则通过fetch获取第一次初始化的数据	
			//如果不支持fetch则初始化
			if(!window.fetch){
				memos = [
					{
						info:{title:"您的浏览器不支持fetch", time:"2017,2-1,0:00", context:"不影响使用", nature:"工作"},
						visible:true
					}
				] ;
				init(memos);
			}
			//支持fetch则获取JSON里的信息
			fetch("../init.json")
			.then(
			    (response) => {
			        if(response.status!==200){
			            console.log("存在一个问题，状态码为："+response.status);
			        }
			        //检查响应文本
			        response.json().then((data) => {
			            memos = data ;
						this.init(memos);						            
			        });
			    }
			)
			.catch(function(err){
			    console.log("Fetch错误:"+err);
			    return
			});
		}
	}
	init(memos){
		//初始化设置
		let [study, work, life] =[0, 0, 0];
		for(let i=0; i<memos.length ; i++){
			memos[i].visible =true;
			switch(memos[i].info.nature){
				case 'work': work++;break;
				case 'life': life++;break;
				case 'study': study++;break;
			}
		}
		this.setState({
			memos:memos,
			natureNum:{study:study, work:work, life:life}
		});		
	}
	setIsMobile(){
		//检测是否为手机(<765px) 若为手机则让memo的高度随着屏幕宽度变化
		let winWidth,isMobile,height;
		if (window.innerWidth)
			winWidth = window.innerWidth;
		else if ((document.body) && (document.body.clientWidth))
			winWidth = document.body.clientWidth;
		if (winWidth < 765) {
			isMobile = true;
			height = winWidth * 0.65 ;
		}else {
			isMobile = false;
			height = '';
		}	
		this.setState({
			isMobile:isMobile,
			memoHeight:height
		});
	}
	setStorage(){ //储存此时的Memo组件以及组件顺序
		let memos = this.state.memos;
		let order = this.state.order;
		//localStorage只能存储字符串，JSON.stringify可以将对象变为字符串
		let str = JSON.stringify(memos);
		window.localStorage.setItem('memos', str);
		window.localStorage.setItem('order', order);
	}
	natureFilter(nature){ //类型过滤，根据子组件点击事件传递的参数来让visible参数变为false
		let memos = this.state.memos;
			//遍历memos 过滤掉非选择的类型 visible=false则隐藏组件
		for(let i=0; i<memos.length ; i++){ 
			//	只有选择的类型与Memo组件的类型相同才显示
			switch (nature ){	
				case 'all':{
					memos[i].visible = true;
				}break;
				case 'study':{
					memos[i].info.nature === 'study' ? 
						memos[i].visible = true : memos[i].visible=false ;
				}break;
				case 'work':{
					memos[i].info.nature === 'work' ? 
						memos[i].visible = true : memos[i].visible=false ;
				}break;
				case 'life':{
					memos[i].info.nature === 'life' ? 
						memos[i].visible = true : memos[i].visible=false ;
				}break;
			}
		}
		this.setState({
			filter:nature,
			memos:memos
		});
	}
	memoMoniter(){ //监视组件个数,每当发生增删改时随时显示Memo各类型个数	
		//定义计算器并遍历计数	
		let [study, work, life] =[0, 0, 0];
		let memos = this.state.memos;
		for(let i=0; i<memos.length ; i++){
			switch(memos[i].info.nature){
				case 'work': work++;break;
				case 'life': life++;break;
				case 'study': study++;break;
			}
		}
		this.setState({
			natureNum:{study:study, work:work ,life:life}
		});
	}
	handleAdd(newItem){ //增加Memo组件时
		let memos = this.state.memos;
		let visible;
		//判断类型是否可视
		if(this.state.filter=='all'|| this.state.filter == newItem.nature ) visible = true;
			else visible = false;
		//判断顺序的顺逆，顺序则组件添加为最后一个，逆序则添加为第一个
		if(this.state.order)  memos.push({info:newItem , visible:visible});
			else memos.unshift({info:newItem ,visible:visible});
		this.setState({
			memos:memos
		});
	}
	handleChange(newMemos){ //当删改时改变state
		this.setState({
			memos:newMemos
		});
	}
	/*
	handleMove(e){	//用于控制背景图片移动 因为消耗CPU暂时不用
		let left = 40 * e.clientX/document.body.clientWidth;
		let top = 40 * e.clientY/document.body.clientHeight;
		this.setState({
			background:{top:top, left:left}
		});
	}
	*/
	orderChange(order){	//当按时间逆序排序则将数组倒过来
		let memos = this.state.memos;
		if(this.state.order === true){
			if(order === false){
				memos.reverse();
				this.setState({
					memos:memos,
					order:order
				});
			}
		}else{
			if(order === true){
				memos.reverse();
				this.setState({
					memos:memos,
					order:order
				});
			}
		}
	}
	render(){
		/*
		let bgstyle = {	//背景位置对象
			backgroundPosition:this.state.background.left +'px' +
			' ' +this.state.background.top +'px'
		};
		*/
		return(
			<div className='app' >
				<Header onAdd={(newItem) => this.handleAdd(newItem)} filter={this.state.filter}
					 natureNum={this.state.natureNum} amount={this.state.memos.length} 
					 memoMoniter={() => this.memoMoniter()} 
					 natureFilter={(nature) => this.natureFilter(nature)} 
					 orderChange={(order) => this.orderChange(order)} order={this.state.order} 
					 setStorage={() => this.setStorage()} 
					 isMobile = {this.state.isMobile}/>

				<Main memos={this.state.memos} 
					onDelRev={(newMemo) => this.handleChange(newMemo)} 
					memoMoniter={() => this.memoMoniter()} 
					setStorage={() => this.setStorage()} 
					memoHeight = {this.state.memoHeight}/ >
			</div>
		);
	}
}