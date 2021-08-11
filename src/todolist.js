import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component(props){
  constructor(props){
    super();
    const nameArray = [
      {firstName:"Shi",secondName:"Yuanjun"},
      {firstName:"Shi",secondName:"Yalin"},
      {firstName:"Song",secondName:"Jiahao"},
      {firstName:"Liu",secondName:"Wenbo"}
    ];
    this.state = {
      oldNameList:nameArray
    };
  }
  handleAddClick(addName){
    if(!this.state.oldNameList.find(
      s => s.firstName===addName.firstName&&s.secondName===addName.secondName)){
        this.setState({oldNameList:this.state.oldNameList.push(addName)});
    }
    
  }
  handleDeleteClick(delName){
    const index = this.state.oldNameList.findIndex(
      s => s.firstName===delName.firstName&&s.secondName===delName.secondName);
    if(index > -1){
      this.setState({oldNameList:this.state.oldNameList.slice(index,1)});
    }
  }

  
  render(){
    return (
      <div>
          <Operate nameList = {this.state}
            onAddClick = {(addName)=>this.handleAddClick(addName)}
            onDeleteClick = {(delName)=>this.handleDeleteClick(delName)}
          />
          <br/>
          <Result nameList = {this.state.oldNameList}/>
          
      </div>
    );
  };
  
}

class Operate extends React.Component{
    constructor(props){
      super();
      this.firstName = null;
      this.secondName = null;
    }
    
    handleFirstChange(e){
      this.firstName = e.target.value;
    }
    handleSecondChange(e){
      this.secondName = e.target.value;
    }

    render(){
      return (
        <div>
           <input type = "text" onChange = {(e)=>this.handlefirstChange(e)}/>
           <br/>
           <input type = "text" onChange = {(e)=>this.handleSecondChange(e)}/>
           <br/>
           <button onClick = {props.onAddClick(firstName)}>插入</button>
           <button onClick = {props.onDeleteClick(secondName)}>删除</button>
        </div>
      );
    }
    
}
function Result(props){
  const listItems = props.nameList.map((name)=><ListName key={name.toString()}
    firstName = {name.firstName} secondName = {name.secondName} />);
  return (
    <div>
        <div>请输入全名:</div>
        <ul>
          {listItems}
        </ul>
    </div>
  );
}

function ListName(){
  return <li>{props.firstName+" "+props.secondName}</li>;

}
  

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

