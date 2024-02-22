import React  ,{useState , useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
 
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [error , Seterror] = useState("")
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()


  const handleFormsubmit =(e)=>{
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email.trim()===""){ 
      Seterror("email cannot be empty")
    }else if(!emailRegex.test(email)){
      Seterror("please enter a valid email")
    }
    else if(password.trim()===""){
      Seterror("please enter a valid password")
    }else{
      Seterror("")
        firebase.auth().signInWithEmailAndPassword(email , password).then(()=>{
          history.push('/')
        }).catch((error)=>{
          alert(error.message)
        })
    }
  }

  return (
    <div>
     
      <div className="loginParentDiv">
      <h5 style={{color:"red"}}>{error}</h5>
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleFormsubmit}>


          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />



          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />



          <button>Login</button>
        </form>
        <span><Link to="/signup">Sign up</Link></span>
        <span><Link to="/">Home</Link></span>
      </div>
    </div>
  );
}

export default Login;
