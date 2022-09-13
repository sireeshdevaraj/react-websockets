import './App.css';
import { useEffect } from 'react';
import { GoogleLogin , GoogleLogout} from 'react-google-login';
import { gapi } from 'gapi-script';
import { useState } from 'react';

function App() {
const [profile,setProfile]=useState({name:'random'})
const clientId = process.env.clientId;
const [message,setMessages]=useState(['whatever'])
const getMessage=()=>{
  fetch(`http://localhost:3002/messages`).then(d=>d.json()).then(d=>{setMessages(d)})
}
useEffect(()=>{

  const initClient = () => {
    gapi.client.init({
    clientId: clientId,
    scope: ''
  });
};
gapi.load('client:auth2', initClient);
//messages and ws start point
(function() {
  const sendBtn = document.querySelector('#send');
  


  let ws;


  function main() {

    ws = new WebSocket('ws://localhost:3001');
    ws.onopen = () => {
      console.log('If you are seeing this,then you are successfully connected to the node');
    }
   // ws.onmessage = ( {data} ) => showMessage(data);
  }

  sendBtn.onclick = function() {
    ws.send(document.querySelector('#history').value);
    document.querySelector('#history').value='';
    getMessage();
  }

  main();
})();
//
getMessage();

},[])
const onSuccess = (res) => {
  setProfile(res.profileObj)
};
const onFailure = (err) => {
  console.log('failed:', err);
};
const logOut = () => {
  setProfile(null);
};





  return (
    <div className="App">
{profile ? (
                <div>
                    <img src={profile.imageUrl} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <div className="container"><h1>Real Time Messaging</h1>
                    <font color="white">
                      <div id="messages" style={{backgroundColor: 'black', justifyContent:'center', alignItems:'center', height: '500px',  overflow: 'scroll'}}>
                        
                        {message.map((i) => {
                          return <p>{i.id} : {i.message}</p>
                        })}
                        </div>
                        </font>
                    <input type="text" id="history" style={{color: 'red', display: 'block', width: '100%', marginBottom: '20px', padding: '20px'}} />
                    <button id="send" title="Send Message!" style={{color:'red', flex:'content', justifyContent:'center', alignItems:'center', width:'50%', height: '30px'}}>Send Message</button>
</div>
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
    </div>
  );
}

export default App;
