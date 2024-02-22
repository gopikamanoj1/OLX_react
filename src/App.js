import React , {useEffect , useContext} from 'react';
import './App.css';
import {BrowserRouter  , Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Profile from './Pages/Profile'
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 
  const {user , setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
    setUser(user)
    })
  })



  return (
    <div>
     <Post>
    <BrowserRouter>
          <Route exact path="/">
          <Home />
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/create">
            <Create/>
          </Route>
          <Route path="/view">
            <View/>
          </Route>
          <Route path="/Profile">
            <Profile/>
          </Route>
    </BrowserRouter>
    </Post>
    </div>
  );
}

export default App;
