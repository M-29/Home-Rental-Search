import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import './register.css';
import { useHistory } from "react-router-dom";
import Popupbox from "../components/popupbox/popupbox";
import errorMessages from "../testKeys/errorMessages";
import constKeys from "../constantKeys/constantKeys";
import Passwordchecks from "./passwordStrength";
import propertyKeys from "../constantKeys/propertyConstKeys";
import { Link } from "react-router-dom";
const Register = (props) => {

    let history = useHistory()
    const [isPopUpTriggered, setIsPopUpTriggered] = useState(false);
    const [popUpMessage, setPopupMessage] = useState("");
    const [inputValues, setInputValues] = useState({
        password: "",
        name: "",
        email: ""
    })
    const [formErr, setError] = useState({
        email: "",
        password: "",
        name: ""
    })
    const [pwdreq, setPwdReq] = useState(false);
    const [checks, setChecks] = useState({
        upperCaseCheck: false,
        lowerCaseCheck: false,
        numberCheck: false,
        specialCharacterCheck: false,
        lengthCheck: false
    })

    const handleChange = (e) => {
        const pattern =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        switch (e.target.name) {
            
            case propertyKeys.names.name:
                if (e.target.value === "") {
                    setError({
                        name: errorMessages.errorMesage.usernameFieldEmpty,
                        email: "",
                        password: ""
                    });
                    setInputValues({
                        name: e.target.value,
                        password: inputValues.password,
                        email: inputValues.email
                    })
                }
                else {
                    setError({
                        name: "",
                        email: "",
                        password: ""
                    });
                    setInputValues({
                        name: e.target.value,
                        password: inputValues.password,
                        email: inputValues.email
                    })
                }
                break;
            case propertyKeys.names.email :
                if (e.target.value === "") {
                    setError({
                        name: "",
                        email: errorMessages.errorMesage.emailFieldEmpty,
                        password: ""
                    });
                    setInputValues({
                        name: inputValues.name,
                        password: inputValues.password,
                        email: e.target.value
                    })
                }
                else if(!pattern.test(e.target.value)){
                    setError({
                        name: "",
                        email: errorMessages.errorMesage.emailNotCorrect,
                        password: ""
                    })
                    setInputValues({
                        name: inputValues.name,
                        password: inputValues.password,
                        email: e.target.value
                    })
                }
                else if(pattern.test(e.target.value) && e.target.value!==""){
                    setError({
                        name: "",
                        email: "",
                        password: ""
                    })
                    setInputValues({
                        name: inputValues.name,
                        password: inputValues.password,
                        email: e.target.value
                    })
                }
                break;
                case propertyKeys.names.password :
                    if (e.target.value === "") {
                        setError({
                            name: "",
                            email: "",
                            password: errorMessages.errorMesage.passwordFieldEmpty
                        });
                        setInputValues({
                            name: inputValues.name,
                            password:  e.target.value,
                            email: inputValues.email
                        })
                    } else {
                        setError({
                            name: "",
                            email: "",
                            password: ""
                        });
                        setInputValues({
                            name: inputValues.name,
                            password: e.target.value,
                            email: inputValues.email
                        })
                    }
                    break;
        }
    }
    const handeleFocus = () => {
        setPwdReq(true);
    }
    const handleOnBlur = () => {
        setPwdReq(false);
    }
    const handleKeyUp = (e) => {
        const { value } = e.target;
        const upperCaseCheck = /[A-Z]/.test(value);
        const lowerCaseCheck = /[a-z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const specialCharacterCheck = /[!@#$%^&*]/.test(value);
        const lengthCheck = value.length >= 5;
        setChecks({
            upperCaseCheck,
            lowerCaseCheck,
            numberCheck,
            specialCharacterCheck,
            lengthCheck
        })
        if(upperCaseCheck && lowerCaseCheck && numberCheck && specialCharacterCheck && lengthCheck){
            setPwdReq(false);
        }
    }

    const onSubmit = (e) => {
        
        e.preventDefault();
        console.log(inputValues)
        if(!inputValues.name && !inputValues.email && !inputValues.password){
            setError({
                name: errorMessages.errorMesage.usernameFieldEmpty,
                email: errorMessages.errorMesage.emailFieldEmpty,
                password: errorMessages.errorMesage.passwordFieldEmpty
            });
        }
        if(checks.lengthCheck && checks.lowerCaseCheck && checks.numberCheck && checks.specialCharacterCheck && checks.upperCaseCheck &&
            inputValues.email && inputValues.name ){
        axios({
            method: "post",
            url: process.env.REACT_APP_REGISTER_URI,
            data: inputValues,
          })
        .then((res)=>{
            history.push(process.env.REACT_APP_LOGIN_URL);
            
        }).catch(error => {
         
            if(error.response.data.message===errorMessages.errorMesage.userAlreadyRegistered)
            {
                setIsPopUpTriggered(true);
                setPopupMessage(error.response.data.message);
            }
        });
    }

    }
  
    return (
        <React.Fragment>
            <div className="parent-container">
                <img src="./images/house7.jpg" alt=" " />
                <div className="form-containers">
                <Link to="/"> <img src="./images/left.png" className="backToHomebtn1"/></Link>
                    <div className="signup">
                        <form className="sign-up-form" onSubmit={onSubmit}>
                            <h2 className="titles">{constKeys.signUpLabel}</h2>

                            {formErr.name ? <p className="nameErrMsg">{formErr.name}</p> : ""}


                            <div className="input-fields">

                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name={propertyKeys.names.name}
                                    onChange={handleChange}
                                />
                            </div>
                            {formErr.email? <p className="emailErrMsg">{formErr.email}</p>:""  }                            <div className="input-fields">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name={propertyKeys.names.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {formErr.password?<p className="pasErrMsg">{formErr.password}</p>:"" }
                            <div className="input-fields">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name={propertyKeys.names.password}
                                    onChange={handleChange}
                                    onFocus={handeleFocus}
                                    onBlur={handleOnBlur}
                                    onKeyUp={handleKeyUp}
                                />
                            </div>
                            {pwdreq ? <Passwordchecks
                                upperCaseFlag={checks.upperCaseCheck ? "valid" : "invalid"}
                                loweCaseFlag={checks.lowerCaseCheck ? "valid" : "invalid"}
                                specialCharacterFlag={checks.specialCharacterCheck ? "valid" : "invalid"}
                                numberFlag={checks.numberCheck ? "valid" : "invalid"}
                                lengthFlag={checks.lengthCheck ? "valid" : "invalid"} /> : ""}

                            <input type="submit" value={constKeys.registerLabel} className="registerBtn" />



                        </form>
                    </div>
                </div>
            </div>
            {isPopUpTriggered ? <Popupbox setPopupMessages={popUpMessage} removePopUp={isPopUpTriggered => { setIsPopUpTriggered(isPopUpTriggered) }} /> : ""}
        </React.Fragment>
    )
}
export default Register;