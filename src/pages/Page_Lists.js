import React, {useState, useEffect, useRef} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, ListCard} from '../components'
import styled from 'styled-components'
import Container from '../components/Container.js'
import {primary} from '../components/Colors.js'

const Style = styled.div`
	color: black;

  height: auto;



  Button {
    padding: 20px;
    border-radius: 1px;
    margin-bottom: 10px;
    margin: 20px;
  }

  h3 {
    font-size: 3rem;
    border-bottom: 4px solid #333;
    color: #222;
    margin: 0px; padding: 0px;
    margin-top: 10px;
  }

  .list {
    display: flex;
    flex-direction: column;
    padding: 4px;
    width: 100%;
    text-align: left;
    .row {
   
    }

    Button {      
      margin-left: auto;
      padding: 4px 12px 4px 12px; margin: 0px;
      line-height: 24px;
      margin-right: 2px;
    }
  }
`;

function Lists(props) {
  const [itemsInlist, setItemsInlist] = useState('');
  const [lists, setLists] = useState('');
  const [newItemText, setNewItemText] = useState('');
  const [newListText, setNewListText] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [selectedListTitle, setSelectedListTitle] = useState('');
  // 503c7d47-20ae-4e1d-9b24-05bcef36a06c

  const createYourListsView = async () => {
  fetch('http://localhost:3000/readlists', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      user_id: props.user_id,
    })
  })
  .then(response => response.json())
  .then(res => {
    if (res) {
      getJSXfromLists(res).then(data => {
        setLists(data); 
      })
    }
    })  
  };

  const getJSXfromLists = async (res) => {
      return (res.map( (list) => {
        return (
          <ListCard key={list.list_id} bg='#6CFF82'>
            <div className='content'>
              <h1>{list.title}</h1>
              
            </div>
            <div className='buttons'>
              <Button onClick={()=>{removeListFromYourLists(list.list_id);}}>x</Button>
              <Button onClick={()=>{createSelectedListView(list.list_id)}}>👁</Button>              
            </div>
          </ListCard>
        )
      }))
  }

  const createSelectedListView = (listToView) => { 
  fetch('http://localhost:3000/readlist', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      list_id: listToView
    })
  })
  .then(response => response.json())
  .then(res => {
    setSelectedList(res.list_id);
    setSelectedListTitle(res.title);
    
    let newList = [];
    if (res != null)
    if (res.list_entries) {
      newList = res.list_entries.map((entry, i) => {
        return (
          <ListCard key={entry + i} bg='#6CFF82'>
            <div className='content'>
              <h1>{entry}</h1>              
            </div>
            <div className='buttons'>
              <Button onClick={()=>{removeItemFromList(listToView, entry)}}>x</Button>           
            </div>
          </ListCard> 
        )
      })
    } 

    setItemsInlist(newList);  
    })  
  };

  const addListToYourLists = event => {
  fetch('http://localhost:3000/createlist', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      user_id: props.user_id,
      title: newListText
    })
  })
  .then(response => response.json())
  .then(res => {    
     createSelectedListView(res.list_id);
     createYourListsView(); 
  })  
  };

  const removeListFromYourLists = (listToDelete) => {
  fetch('http://localhost:3000/deletelist', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      list_id: listToDelete
    })
  })
  .then(response => response.json())
  .then(res => {
    createYourListsView();
    console.log(res);
  })    
  }
  

  const addNewItemToList = (listToView, entry) => {
  fetch('http://localhost:3000/updatelist', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      list_id: listToView,
      entry: entry
    })
  })
  .then(response => response.json())
  .then(res => {
     console.log(res);
     createSelectedListView(listToView);
  })  
  };

  const removeItemFromList = (listToView, entry) => {
  fetch('http://localhost:3000/updatelist', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      list_id: listToView,
      entry: entry,
      deleteEntry: true
    })
  })
  .then(response => response.json())
  .then(res => {
    console.log(res.list_entries);
    createSelectedListView(listToView);
  })    
  };


  useEffect(() => {
    createYourListsView();
  }, [props.user_id]);

  return (
    <Style>
      {props.isLogged ? 
        <Container margin='0px' flexdirection='row' height='70vh'>
          <Container flexdirection='row'>
            <ListCard bg={'#47F7FF'}>
              <div className='content'>
                <p>Create new list</p>              
              </div>
              <div className='buttons'>
                <Container flexdirection='column' margin='0px' padding='0px' bg='none'>
                  <input type='text' placeholder='title' onChange={(e)=>{setNewListText(e.target.value)}} 
                    onKeyPress={(e) => {
                      let code = e.keyCode || e.which;
                      if (code === 13) {
                      addListToYourLists()} } }  
                  /><br/>
                  <Button onClick={()=>{ addListToYourLists() }}>Create</Button>
                </Container>             
              </div>
            </ListCard>           
            {lists}
          </Container>

          <Container flexdirection='column' bg='transparent' padding='0px' margin='0px' width='100%'>
          <h3>{selectedListTitle ? selectedListTitle : 'select a list'}</h3> 
          <Container flexdirection='row'>
            <ListCard bg={'#47F7FF'}>
              <div className='content'>                
                <p>Add new item</p>             
              </div>
              <div className='buttons'>
                {selectedListTitle.length <= 0 ? 
                <Container flexdirection='column' margin='0px' padding='0px' bg='none'>
                  <p>Select a list first</p>
                </Container> 
                  :
                <Container flexdirection='column' margin='0px' padding='0px' bg='none'>
                  <input type='text' placeholder='title' onChange={(e)=>{setNewItemText(e.target.value)}}
                    onKeyPress={(e) => {
                      let code = e.keyCode || e.which;
                      if (code === 13) {
                      addNewItemToList(selectedList,newItemText)} } }  
                  /><br/>
                  <Button onClick={()=>{addNewItemToList(selectedList,newItemText)}}>add</Button>
                </Container>      
                }                                     
              </div>
            </ListCard>           
            {itemsInlist}
          </Container>
          </Container>

        </Container>
      :
        <Redirect to='/' exact/>
      }
    </Style>
  );
}
export default Lists;
