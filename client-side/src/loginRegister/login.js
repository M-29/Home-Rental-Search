import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Popupbox from "../components/popupbox/popupbox";
import './login.css';
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import errorMessages from "../testKeys/errorMessages";
import constKeys from "../constantKeys/constantKeys";
import propertyKeys from "../constantKeys/propertyConstKeys";
import { Link } from "react-router-dom";

const Login=(props) =>{
    let history =useHistory()
    const [inputValues,setInputValues] =useState({
        email:"",
        password:""
    });
    const [formErrors , setFormErrors]=useState({})
    const [isPopUpTriggered, setIsPopUpTriggered]=useState(false);
    const [popUpMessages, setPopupMessages]=useState("");

    const checkValidation = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.password){
            errors.password = errorMessages.errorMesage.passwordFieldEmpty;
        }
        if(!values.email){
            errors.email =errorMessages.errorMesage.emailFieldEmpty;
        }else if (!regex.test(values.email)){
            errors.email=errorMessages.errorMesage.emailNotCorrect;
        }

        return errors;
      };
      const handleSubmit =(e)=>{
        e.preventDefault();
        setFormErrors(checkValidation(inputValues))
        if(inputValues.email && inputValues.password){
            axios({
                method: "post",
                url: process.env.REACT_APP_LOGIN_URI,
                data: inputValues,
              })
            .then((res)=>{
                localStorage.setItem("loginToken", res.data.token);
                localStorage.setItem("userId",res.data.id);
                localStorage.setItem("userName",res.data.name)
                localStorage.setItem("email",res.data.email);
                props.isUserDetails({
                    name:localStorage.getItem("userName"),
                    email:localStorage.getItem("email"),
                    _id:localStorage.getItem("userId")
                }); 
                console.log(res.data)
                history.push(process.env.REACT_APP_MAIN_URI)
            }).catch(error => {
                console.log(error.response.data.message)
                if(error.response.data.message===errorMessages.errorMesage.passwordNotCorrect)
                {
                    setIsPopUpTriggered(true);
                    setPopupMessages(error.response.data.message);
                }
                if(error.response.data.message===errorMessages.errorMesage.usernameNotRegistered)
                {
                    setIsPopUpTriggered(true);
                    setPopupMessages(error.response.data.message);
                }
            });
        }
    }
    const handleMoveToRegister=()=>{
        props.isMoveToLogin(true);
    }
    function handleChange(e){
        const {name,value}=e.target;
        
        setInputValues({...inputValues,[name]:value});

    }

    return (
        <React.Fragment>
        <div className="container">
            <img src="./images/house7.jpg"/>
            <div className="forms-container">
                <Link to="/"> <img src="./images/left.png" className="backToHome"/></Link>
                <div className="signin-signup">
                    <form className="sign-in-form" onSubmit={handleSubmit}>
                        <h2 className="title">{constKeys.formLabel}</h2>
                        {formErrors.email&&<p className="emailErrMsgs">{formErrors.email}</p>}
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" name={propertyKeys.names.email} onChange={(e)=>{handleChange(e)}}/>
                        </div>
                        {formErrors.password&&<p className="pasErrMsgs">{formErrors.password}</p>}
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" name={propertyKeys.names.password}  onChange={(e)=>{handleChange(e)}}/>
                        </div>
                       
                        <div className="reg">
                        <button className="btn">{constKeys.loginLabel}</button>
                        <NavLink to={process.env.REACT_APP_REGISTER_URL}><button type="button" className="btn" onClick={handleMoveToRegister} >{constKeys.registerLabel}</button></NavLink>
                        </div>
                        
                        
                        
                    </form>
                </div>
            </div>
        </div>
        {isPopUpTriggered?<Popupbox setPopupMessages={popUpMessages} removePopUp ={isPopUpTriggered =>{setIsPopUpTriggered(isPopUpTriggered)}}/>:""}
        </React.Fragment>
    )
}
export default Login;