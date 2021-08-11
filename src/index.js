import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component{
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
        const newNameList = this.state.oldNameList;
        newNameList.push(addName);
        this.setState({oldNameList:newNameList});
    }
    
  }
  handleDeleteClick(delName){
    const index = this.state.oldNameList.findIndex(
      s => s.firstName===delName.firstName&&s.secondName===delName.secondName);
    if(index > -1){
      const newNameList =  this.state.oldNameList;
      newNameList.splice(index,1)
      this.setState({oldNameList:newNameList});
    }
  }

  
  render(){
    return (
      <div>
          <Operate nameList = {this.state.oldNameList}
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
      this.state ={firstName:null,secondName:null};
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
           <input type = "text" onChange = {(e)=>this.handleFirstChange(e)}/>
           <br/>
           <input type = "text" onChange = {(e)=>this.handleSecondChange(e)}/>
           <br/>
           <button onClick = {()=>this.props.onAddClick(this.state)}>插入</button>
           <button onClick = {()=>this.props.onDeleteClick(this.state)}>删除</button>
        </div>
      );
    }
    
}

function Result(props){
  console.log(props.nameList);
  const listItems = props.nameList.map((name)=><ListName key={(name.firstName+name.secondName).toString()}
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

function ListName(props){
  return <li>{props.firstName+" "+props.secondName}</li>;

}
  

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

