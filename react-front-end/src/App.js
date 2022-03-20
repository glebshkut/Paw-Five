import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import Example from './components/example';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Recorder from './components/Recorder';
import Session from './components/Session';


export default function App(props) {
  
  const tabs = ["Home", "Training", "Profile"];
  const [tab, setTab] = useState("Home");
  const [cookie, setCookie, removeCookie] = useCookies(["user_id"]);


  return (
    <div className="App">
        <button className='log_in_btn' onClick={() => {setCookie("user_id", 1)}}>Log In</button>
        <img src="https://github.com/Matt-Chisholm/Paw-Five/blob/master/Planning/logo.png?raw=true" alt='' />
        {/* <Example /> */}
        {tab==="Training" && <Recorder />}

        {tab==="Profile" && <Profile user_id={cookie["user_id"]}/>}
        <NavBar 
          tab={tab}
          tabs={tabs}
          onChange={setTab}
        />

      </div>
  )
}


