import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ToDoList extends React.Component{
  constructor(props){
    super();
    const nameArray = [
      {firstName:"Shi",secondName:"Yuanjun"},
      {firstName:"Shi",secondName:"Yalin"},
      {firstName:"Song",secondName:"Jiahao"},
      {firstName:"Liu",secondName:"Wenbo"}
    ];
    this.state = {
      oldNameList:nameArray,
      selectIndex:-1
    };
  }

  handleAddClick(addName){
    //先执行判空操作，再判断是否列表中已经存放有该名字
    if(addName.firstName!=null&&addName.secondName!=null&&addName.firstName.trim().length>0&&
      addName.secondName.trim().length>0&&!this.state.oldNameList.find(
      s => s.firstName===addName.firstName&&s.secondName===addName.secondName)){
        console.log("当前index:"+this.state.selectIndex);
        console.log(this.state.oldNameList);
        if(this.state.selectIndex>-1){
          const newNameList = this.state.oldNameList.slice(0,this.state.oldNameList.length);
          console.log("准备修改");
          console.log(newNameList);
          newNameList.splice(this.state.selectIndex,1,addName);
          console.log("修改结束");
          console.log(newNameList);
          this.setState({oldNameList:newNameList,selectIndex:-1});
        }else{
          const newNameList = this.state.oldNameList;
          newNameList.push(addName);
          this.setState({oldNameList:newNameList});
        }
        
    } 
  }

  handleDeleteClick(delName){
    //判断是否有选中的要删除的名字
    if(this.state.selectIndex > -1){
      const newNameList = this.state.oldNameList.slice(0,this.state.oldNameList.length);
      newNameList.splice(this.state.selectIndex,1);
      this.setState({oldNameList:newNameList,selectIndex:-1});
      return;
    }
    //判断删除的名字是否对应存放的列表
    const index = this.state.oldNameList.findIndex(
      s => s.firstName===delName.firstName&&s.secondName===delName.secondName);
    if(index > -1){
      const newNameList =  this.state.oldNameList;
      newNameList.splice(index,1)
      this.setState({oldNameList:newNameList});
    }
  }
  handleselectIndex(selectIndex){
    if(selectIndex === this.state.selectIndex){
      this.setState({selectIndex:-1})
    }else{
      this.setState({selectIndex:selectIndex});
    }  
  }

  render(){
    return (
      <div>
          <Operate nameList = {this.state.oldNameList}
            onAddClick = {(addName)=>this.handleAddClick(addName)}
            onDeleteClick = {(delName)=>this.handleDeleteClick(delName)}/>
          <br/>
          <Result nameList = {this.state.oldNameList}
          onClick = {(selectIndex)=>this.handleselectIndex(selectIndex)}
          selectIndex = {this.state.selectIndex}/>  
      </div>
    );
  }; 
}

class Operate extends React.Component{
    constructor(props){
      super();
      this.state ={firstName:"",secondName:""};
    }
    handleFirstChange(e){
      this.setState({firstName:e.target.value});
    }
    handleSecondChange(e){
      this.setState({secondName:e.target.value});
    }

    render(){
      return (
        <div>
           <div>请输入全名：</div>
           <input type = "text" value = {this.state.firstName} placeholder = "姓氏" onChange = {(e)=>this.handleFirstChange(e)}/>
           <br/>
            {/*此处为注释*/}
           <input type = "text" value = {this.state.secondName} placeholder = "名字" onChange = {(e)=>this.handleSecondChange(e)}/>
           <br/>
           <button onClick = {()=>this.props.onAddClick(this.state)}>插入</button>
           <button onClick = {()=>this.props.onDeleteClick(this.state)}>删除</button>
        </div>
      );
    }
    
}

function Result(props){
  //console.log(props.nameList);
  const listItems = props.nameList.map((name,index)=>{
    let selectColor = index===props.selectIndex?"#ff0000":"#000000";
    return (<ListName key={(name.firstName+name.secondName).toString()}
     firstName = {name.firstName} secondName = {name.secondName} 
     selectColor ={selectColor}
     onClick = {()=>props.onClick(index)}/>)});
  return (
    <div>
        <div>当前所有人:</div>
        <ul>
          {listItems}
        </ul>
    </div>
  );
}

function ListName(props){
  console.log(props.selectColor);
  return <li onClick = {props.onClick} >
    <font color = {props.selectColor}>{props.firstName+" "+props.secondName}</font>
    </li>;
}

// ========================================

ReactDOM.render(<ToDoList />, document.getElementById("root"));

