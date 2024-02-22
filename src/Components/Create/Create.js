import React, { Fragment, useContext, useMemo, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext , FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [error , setError] = useState("");
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);
  const history = useHistory();
  const [name , setName] = useState("");
  const [price , setPrice] = useState("");
  const [category , setCategory] = useState("");
  const [image , setImage] = useState(null);
  const date = new Date();

  const handleSubmit = () => {
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9\s]*$/;

    // Validation 
    if(name.trim()===""){
      setError("Please enter a valid name");
    } else if(!nameRegex.test(name)){
      setError("Name should contain only letters");
    } else if(price.trim()==="" || parseFloat(price)<1){
      setError("Please enter a valid price");
    } else if(category.trim()==="" || !nameRegex.test(category)){
      setError("Please enter a valid category");
    } else if(!image){
      setError("Image is mandatory..");
    } else {
      setError(""); // Clear existing error message

      firebase.storage().ref(`/image/${image.name}`).put(image)
        .then(({ ref }) => {
          ref.getDownloadURL().then((url) => {
            console.log("Download URL:", url);
            firebase.firestore().collection('products').add({
              name, 
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString()
          
            });
            history.push('/');
          });
        })
        .catch((uploadError) => {
          console.error("Error uploading image:", uploadError);
        });
    }
  };

  // Clear error message after 5 seconds
  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

useMemo((obj)={

},[])


  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
          <form>
            <h5 style={{color: "red"}}>{error}</h5>
            <label htmlFor="fname">Item Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <label htmlFor="fname">Item Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <br />
            <label htmlFor="fname">Item Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
          <br />
          <input type="file" onChange={(e) => {
            setImage(e.target.files[0]);
          }} />
          <br />
          <button onClick={() => {
            handleSubmit();
            clearError(); // Call the function to clear error after 5 seconds
          }} className="uploadBtn">Upload and Submit</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
