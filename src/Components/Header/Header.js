import React , {useContext , useState} from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import {AuthContext, FirebaseContext} from '../../store/Context'
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


function Header() {


 const [title , setTitle] = useState("select option")
 const[location  , setLocation] = useState(null) 
 const {user} = useContext(AuthContext)
 const {firebase} = useContext(FirebaseContext)
 const history = useHistory()

 const handleLocationAccess = ()=>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
       
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    window.alert("location is not supported by your browser")
  }
 }

 const handleSelect=(e)=>{
 const selectoption = e.target.value
 setTitle(selectoption)
 if(selectoption === "profile"){
  history.push("/profile")
 }else if(selectoption==="Logout"){
  firebase.auth().signOut();
  history.push('/login')
 }
 }




  return (
    <div className="headerParentDiv ">
      <div className="headerChildDiv">

        <div className="brandName ">
          <OlxLogo></OlxLogo>
        </div>

        <div className="placeSearch">
          <Search></Search>
          <input type="text" onClick={handleLocationAccess}/>
          <Arrow></Arrow>
        </div>

        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>

        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>

        <div className="loginPage">
        <span>{user ? "Welcome, "+user.displayName :  ""}</span>
          <span>{user ? ( 
          <div>
          <select onChange={handleSelect} value={title}>
          <option value="">select option</option>
          <option value={"profile"}>Profile</option>
          <option value={"Logout"}>Logout</option>
          </select>
          </div>
          ) 
          : <Link to="/login"> Login</Link>}</span>
          <hr />
          {!user && <span><Link to="/signup">Signup</Link></span> }
        </div>
       
        <Link to="/"><div><span>Home</span></div></Link>

       {user &&  <Link to="/create">
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>}
      </div>
    </div>
  );
}

export default Header;
