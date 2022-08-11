import React, { useEffect } from "react";
import "./imagePreview.css"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function PerviewImage(props) {
    const [index, setIndex] = useState(0)
    const [token, setToken]= useState(false);
    console.log(props.getImageBox)
    console.log(props)
    let history = useHistory()
    useEffect(() => {
        if(localStorage.getItem("loginToken"))
        {
            axios({
                method: "post",
                url: "http://localhost:8000/welcome",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                },
            })
                .then((res) => {
                    setToken(true)
                }).catch((err) => {
                    if (err.response.data.message == "User token expired") {
                        localStorage.removeItem("loginToken");
                        localStorage.removeItem("email")
                        localStorage.removeItem("userName")
                        localStorage.removeItem("userId")
                        history.push('/');
                    }
                });
        }
        else
        {
            setToken(true)
    }
    },[])
    const removeImageFlexBox = () => {
        props.isImageBox(false);

    }
    const prev = () => {
        if (index === 0) {
            setIndex(props.getImageBox.length - 1)
        }
        else {
            setIndex(index - 1)
        }
    }
    const next = () => {
        if (index === props.getImageBox.length - 1) {
            setIndex(0)
        }
        else {
            setIndex(index + 1)
        }

    }
    const theme = {
        color: "white"
    }


    return (
        <>
         { token?<div> ({props.getImageBox ?
                <div className="apartmentImagePreviewDiv">
                    <div className="imagePreviewContainer">
                        <img className="imagesDiv" src={`${props.getImageBox[index]}`}></img>
                        <button className="prev1" onClick={prev}><ArrowBackIosNewIcon style={theme} className="arrowImg1" /></button>
                        <button button className="next1" onClick={next}><ArrowForwardIosIcon style={theme} className="arrowImg1" /></button>
                        <div><button id="crossImgBtn" onClick={removeImageFlexBox}>< CloseIcon style={theme} /></button>
                        </div>
                    </div>
                </div> : ""
            })</div>:""
            }
        </>
    )
}
export default PerviewImage



