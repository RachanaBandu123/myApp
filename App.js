import React, { Component } from 'react';
import './App.css';
import PopUp from './popUp';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      openModel: false,
      nameVal: '',
      emailVal: '',
      localData: [],
      edit: '',
      save: false,
    }
  }
  selectTab = i => () => {
    this.setState({
      selectedTab: i,
    })
  }
  closePopUp = () => {
    this.setState({
      openModel: false,
    })
  }
  buttonClick = () => {
    this.setState({
      openModel: true,
      nameVal: '',
      emailVal: '',
    })
  }
  onSubmit = (name, email, edit) => () => {
    let { localData } = this.state;
    let object = {
      'name': name,
      'email': email,
    };
    if (edit !== '') {
      localData.map(i => {
        if (i.name === edit) {
          i.name = name;
          i.email = email;
        }
      })
      localStorage.setItem('data', JSON.stringify(localData))
    } else {
      localData.push(object);
      localStorage.setItem('data', JSON.stringify(localData))
    }
    this.setState({
      localData,
      edit: '',
      save: true,
    })
    this.closePopUp();
  }
  onInputChange = key => (e) => {
    let { nameVal, emailVal } = this.state;
    if (key === 'name') nameVal = e.target.value;
    else emailVal = e.target.value;
    this.setState({
      nameVal,
      emailVal,
    })
  }
  onEdit = (value1, value2) => (e) => {
    this.setState({
      openModel: true,
      nameVal: value1,
      emailVal: value2,
      edit: value1,
    })
  }
  onDelete = (value1) => () => {
    let { localData } = this.state;
    let dummyData = localData.filter(item => item.name !== value1);
    localStorage.setItem('data', JSON.stringify(dummyData));
    this.setState({
      localData: dummyData,
    })
  }
  render() {
    const columns = [
    {
      key: 'name',
      value: 'Name',
    },
    {
      key: 'email',
      value: 'Email',
    },
    {
      key: 'date',
      value: 'Date',
    },
    {
      key: 'action',
      value: 'Action',
    }];
  const { selectedTab, openModel, nameVal, emailVal, localData, edit, save } = this.state;
  var data = localData;
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '100%', borderBottom: '1px solid #dddddd' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', width: '25%' }}>
        {['Todos', 'Users'].map(i => <div style={i === selectedTab ? { borderBottom: '2px solid #48a7f6', padding: '15px 15px', color: '#48a7f6' } : { padding: '15px 15px' }} onClick={this.selectTab(i)}>{i}</div>)}
        </div>
        </div>
        {selectedTab === 'Todos' ? <div style={{ padding: '15px' }}>
        <div style={{ display: 'flex', padding: '5px 20px', width: '10%', border: '1px solid #dddddd', borderRadius: '5px', justifyContent: 'center', marginBottom: '15px' }}>
          <button className="button" type="button" onClick={this.buttonClick}>Create Users</button>
        </div>
        {save &&<div style={{ display: 'flex', padding: '30px 20px' }}>
        <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #dddddd', background: '#fafafa', padding: '20px' }}>{['Name', 'Date', 'Action'].map(i => <div style={(i === 'Action' || i === 'Date') ? { padding: '15px 15px', fontWeight: 'bold', marginLeft: '14%'} : { padding: '15px 15px', fontWeight: 'bold' }}>{i}</div>)}</div>
        <div style={{ display: 'flex', borderBottom: '1px solid #dddddd', padding: '20px' }}>{columns.map(val =>
        val.key !== 'email' &&<div style={(val.key === 'name' || val.key === 'date') ? { marginRight: '7%' } : { marginRight: '10%' }}>
        <div>{data && data.map(item =>
        <div style={{ padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {val.key === 'name' ? <div>{item[val.key]}</div>:
            val.key === 'date' ? <div>{moment(new Date()).format('MMM Do YYYY, h:mm:ss a')}</div>:
            val.key !== 'email' &&
            <div style={{ display: 'flex' }}>
              <div style={{ color: '#48a7f6' }} onClick={this.onEdit(item['name'], item['email'])}>Edit</div>&nbsp;|&nbsp;
              <div style={{ color: '#48a7f6' }} onClick={this.onDelete(item['name'])}>Delete</div>
            </div>}
          </div>
          </div>
        )}</div></div>)}</div></div></div>}
        </div>:
        selectedTab !== '' &&
        <div style={{ padding: '15px' }}>
        <div style={{ display: 'flex', padding: '5px 20px', width: '10%', border: '1px solid #dddddd', borderRadius: '5px', justifyContent: 'center', marginBottom: '15px' }}>
          <button className="button" type="button" onClick={this.buttonClick}>Create Users</button>
        </div>
        {save &&<div style={{ display: 'flex', padding: '30px 20px' }}>
        <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #dddddd', background: '#fafafa', padding: '20px' }}>{['Name', 'Email'].map(i => <div style={i=== 'Email' ? { padding: '15px 15px', fontWeight: 'bold', marginLeft: '10%'} : { padding: '15px 15px', fontWeight: 'bold' }}>{i}</div>)}</div>
        <div style={{ display: 'flex', borderBottom: '1px solid #dddddd', padding: '20px' }}>{columns.map(val =>
        <div style={{ marginRight: '10%' }}>
        <div>{data && data.map(item =>
        <div style={{ padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{item[val.key]}</div>
          </div>
          </div>
        )}</div></div>)}</div></div></div>}
        </div>
      }
        <PopUp
        isOpen={openModel}
        closePopUp={this.closePopUp}>
        <div style={{ width: '100%', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>
              <div>Name</div>
              <div>
              <input onChange={this.onInputChange('name')} value={nameVal}/>
              </div>
            </div>
            <div>
              <div>Email</div>
              <div>
              <input onChange={this.onInputChange('email')} value={emailVal}/>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
          <div style={{ display: 'flex', padding: '5px 20px', width: '10%', border: '1px solid #666666', borderRadius: '5px', justifyContent: 'center', marginBottom: '15px' }}>
          <button className="button" type="button" onClick={this.onSubmit(nameVal, emailVal, edit)}>Save</button>
          </div>
          </div>
          </div>
        </PopUp>
      </header>
    </div>
  )};
}

export default App;
