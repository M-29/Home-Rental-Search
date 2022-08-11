import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import '../popupbox/popupBox.css';
import axios from 'axios';
import constKeys from '../../constantKeys/constantKeys';
import textMessages from '../../testKeys/textMessages';
import propertyKeys from '../../constantKeys/propertyConstKeys';
function Popupbox(props) {
    console.log(props.setApartmentId)
    const [apartmentDetail, setApartmentDetail] = useState();
    const history = useHistory();
    const removeflexbox = () => {
        props.removePopUp(false);
    }
    const removeflexbox1 = () => {
        props.removePopUp1(false);
        props.removePopUp2(false);
    }
    const removeflexbox2 = () => {
        props.removePopUp2(false);
    }
    const moveToHome = () => {
        props.removePopUp(false);
        history.push("/");
    }
    const moveToHome1 = () => {
        props.removePopUp1(false);
        history.push('/login');
    }
    const moveToHome2 = () => {
        props.removePopUp1(false);
        history.push('/register');
    }
    useEffect(() => {
        // history.push(`${currPath}/${props.setId}`);
        if(props.setApartmentId)
        {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_APARTMENT_URI}${props.setApartmentId}`
        })
            .then((res) => {
                setApartmentDetail(res)
            }).catch((err) => {
                console.log(err)
            })
        }

    }, [])
    return (
        <React.Fragment>
            {props.removePopUp ? <div className="login-flex">
                <div className="responsecontent">
                    <h3 id="loginheading">{props.setPopupMessage}<br /></h3>

                    {props.setPopupMessage===propertyKeys.propertyRegisteredSucessfully||propertyKeys.propertyEditedSucessfully?<button id="removebtn" onClick={moveToHome}>{constKeys.Ok}</button>  :<button id="removebtn" onClick={removeflexbox}>{constKeys.Ok}</button>} 
                </div>
            </div> : "hiii"
            }
            {props.removePopUp1 ? <div className="login-flex">
                <div className="responsecontent">
                    <h3 id="loginheading">{props.setPopupMessage}<br /></h3>

                    {props.setPopupMessage === `${textMessages.text.PopUpMessage}` ? <div className='popup-div'>
                        <div><button id="removebtn1" onClick={moveToHome1}>Login</button></div>

                         <div> <button id="removebtn2" onClick={moveToHome2}>Register</button>
                        </div> 

                        


                        <div><button id="crossbtn" onClick={removeflexbox1}>< CloseIcon /></button></div>
                    </div> : ""}
                </div>
            </div> : ""
            }
            {props.removePopUp2 ? <div className="login-flex">
                <div className="responsecontent">
                    <h3 id="loginheading">{props.setPopupMessage}<br /></h3>

                    {apartmentDetail ? <div className='popup-div'>
                   
                       <div className='popup-div1'>
                          
                        <div className='popUp-subdiv1'>
                                <p>{constKeys.name1} :</p>
                                <p>{constKeys.email1} :</p>
                        </div>
                        <div className='popUp-subdiv2'>
                                    <p> {apartmentDetail.data.owner.name}</p>
                                    <p> {apartmentDetail.data.owner.email}</p>
                        </div>
                        
                    </div>
                    <div><button id="crossbtn" onClick={removeflexbox2}>< CloseIcon /></button></div>
                    </div> : ""}
                </div>
            </div> : ""
            }
            {props.setPopupMessages ? <div className="login-flex">
                <div className="responsecontent">
                    <h3 id="loginheading">{props.setPopupMessages}</h3>
                    <button id="removebtn" onClick={removeflexbox}>{constKeys.Ok}</button>
                </div>
            </div> : ""}

        </React.Fragment>
    )
}
export default Popupbox;