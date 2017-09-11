import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Arr = []
class Pinglun extends Component{
   constructor () {
    super()
    this.state = {
      name: '',
      body: ''
    }
  }
  yonghu(event){
     this.setState({
      name: event.target.value
    })
  }
  neirong(event){
     this.setState({
      body: event.target.value
    })
  }
  zhi(){
    let yh = document.getElementById('yonghu');
    let pl = document.getElementById('pinglun');
    Arr.push({'name':yh.value,'body':pl.value});
    console.log(Arr);
    if(this.props.onSubmit){ //检测父组件onSubmit方法是否存在
      const {name,body} = this.state //如果存在就在父组件定义name与body常量
      this.props.onSubmit({name,body}) //使用父组件的方法
    }
    this.setState({body:''}) //初始化自身的body值
  }

  render(){

    return(
        <div className="pinglun">
          <div className="ma-t">
            <span>用户名:</span>
            <input type="text" id='yonghu' value={this.state.name} onChange={this.yonghu.bind(this)}/>
            <div className="qc"></div>
          </div>
          <div className="ma-t">
            <span>评论内容:</span>
            <textarea id='pinglun' value={this.state.body} onChange={this.neirong.bind(this)}></textarea>
            <div className="qc"></div>
          </div>
          <div className="ma-t">
            <button id='btn' onClick={this.zhi.bind(this)}>发布</button>
          </div>
          <div className="qc"></div>
        </div>
      )
  }
}

class Pinlun extends Component{
  render(){

    return(
            <div className="xian">
                <span>{this.props.user.name}</span>:{this.props.user.body}
              </div>
    )
  }

}

class Xianshi extends Component{
  render(){
   
    return(
        <div className="pinglun-xs">
        {this.props.content.map((user,i)=><Pinlun user={user} key={i} />)}
          
        </div>
      )
  }
}

class Index extends Component {
   constructor () {
    super()
    this.state = {
      content: []
    }
  }
  dayin(body){
    this.state.content.push(body)
    this.setState({
      body:this.state.content
    })
  }

  render() {
    return (
      <div className='box'>
         <Pinglun onSubmit={this.dayin.bind(this)} />
         <Xianshi content= {this.state.content}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)