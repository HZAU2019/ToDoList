import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";

const nameArray = [
    {firstName:"Shi",secondName:"Yuanjun"},
    {firstName:"Shi",secondName:"Yalin"},
    {firstName:"Song",secondName:"Jiahao"},
    {firstName:"Liu",secondName:"Wenbo"}
  ];
const mobxData = observable({
    oldNameList:nameArray,
    selectIndex:-1,
    firstName:"",
    secondName:"",
    }
);

const ToDoList = observer(({mobxData})=>{ {  
    return (
       <div>
          <Operate opertateState = {mobxData}/>
          <br/>
          <Result opertateState = {mobxData}/>  
      </div>
    );
  }
}
)

const Operate = observer(({opertateState})=>{
    function onAddClick(){
        if(opertateState.firstName!=null&&opertateState.secondName!=null&&opertateState.firstName.trim().length>0&&
      opertateState.secondName.trim().length>0&&!opertateState.oldNameList.find(
      s => s.firstName===opertateState.firstName&&s.secondName===opertateState.secondName)){
        console.log("当前index:"+opertateState.selectIndex);
        console.log(opertateState.oldNameList);
        if(opertateState.selectIndex>-1){
          console.log("准备修改");
          opertateState.oldNameList.splice(opertateState.selectIndex,1,{firstName:opertateState.firstName,secondName:opertateState.secondName});
          console.log("修改结束");
          console.log(opertateState.oldNameList);
          opertateState.selectIndex = -1;
        }else{
          opertateState.oldNameList.push({firstName:opertateState.firstName,secondName:opertateState.secondName});
        }   
    } 
    }
    function onDeleteClick(){
       //判断是否有选中的要删除的名字
        if(opertateState.selectIndex > -1){
            opertateState.oldNameList.splice(opertateState.selectIndex,1);
            opertateState.selectIndex = -1;
            return;
        }
          //判断删除的名字是否在列表中已经存在
          const index = opertateState.oldNameList.findIndex(
            s => s.firstName===opertateState.firstName&&s.secondName===opertateState.secondName);
          if(index > -1){
            opertateState.oldNameList.splice(index,1)
          }
    }
    function handleFirstChange(e){
        opertateState.firstName = e.target.value;
    }
    function handleSecondChange(e){
        opertateState.secondName = e.target.value;
    }
    return (
        <div>
           <div>请输入全名：</div>
           <input type = "text" value = {opertateState.firstName} placeholder = "姓氏" onChange = {(e)=>handleFirstChange(e)}/>
           <br/>
            {/*此处为注释*/}
           <input type = "text" value = {opertateState.secondName} placeholder = "名字" onChange = {(e)=>handleSecondChange(e)}/>
           <br/>
           <button onClick = {onAddClick}>插入</button>
           <button onClick = {onDeleteClick}>删除</button>
        </div>
    );
}
)
const Result = observer(({opertateState})=>{
    const listItems = opertateState.oldNameList.map((name,index)=>{
        let selectColor = index===opertateState.selectIndex?"#ff0000":"#000000";
        return (<ListName key={(name.firstName+name.secondName).toString()}
         firstName = {name.firstName} secondName = {name.secondName} 
         selectColor ={selectColor}
         onClick = {()=>opertateState.selectIndex = opertateState.selectIndex=== -1?index:-1}/>)});
    return(
        <div>
        <div>当前所有人:</div>
        <ul>
          {listItems}
        </ul>
    </div>
    );
}  
)
function ListName(props){
  console.log(props.selectColor);
  return <li onClick = {props.onClick} >
    <font color = {props.selectColor}>{props.firstName+" "+props.secondName}</font>
    </li>;
}

ReactDOM.render(<ToDoList mobxData = {mobxData}/>,document.getElementById("root"));
