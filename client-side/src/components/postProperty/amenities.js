import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './amenities.css';
import propertyKeys from "../../constantKeys/propertyConstKeys";
import axios from 'axios';
import textMessages from "../../testKeys/textMessages";
import constKeys from "../../constantKeys/constantKeys";
function Amenities(props) {
    const currPath = process.env.REACT_APP_POST_URI;
    const history = useHistory();
    const [inputValues, setInputValues] = useState([...props.amenity])
    const handleBackClick = () => {
        history.push(`${props.editId ? process.env.REACT_APP_EDIT_URL : currPath}${process.env.REACT_APP_RESALE_URI}`);
        props.isResaleToggle(true);
        props.isAmenityToggle(false);
    }
    const handleClick = () => {
        if (inputValues) {
            history.push(`${props.editId ? process.env.REACT_APP_EDIT_URL : currPath}${process.env.REACT_APP_GALLERY_URI}`);
            props.setAmenityDetails(inputValues);
            props.setAmenityDetail(inputValues);
            props.isGalleryToggle(true);
            props.isAmenityToggle(false);
        }

    }
    const handleChange = (e, index) => {
        const checked = e.target.checked
        const value = [...inputValues]
        const selectedValues = { ...inputValues[index] }
        selectedValues.checked = checked
        value[index] = selectedValues;
        setInputValues(value)
    }

    useEffect(() => {
        if (localStorage.getItem(textMessages.token.authToken)) {

            axios({
                method: "post",
                url: `${process.env.REACT_APP_WELCOME_URL}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                },
            })
                .then((result) => {
                    console.log(result)

                }).catch((err) => {
                    console.log(err.response)
                    if (err.response.data.message == textMessages.token.tokenExpired) {
                        localStorage.removeItem(textMessages.token.authToken);
                        localStorage.removeItem(constKeys.email)
                        localStorage.removeItem(constKeys.userName)
                        localStorage.removeItem(constKeys.userId)
                        history.push(process.env.REACT_APP_MAIN_URI)
                    }
                });
        }
    }, [])


    return (
        <>
            <div className="heading">
                {propertyKeys.amenities.heading}
            </div>
            <div className="amenities">

            </div>
            <div className="subHeading">
                {propertyKeys.amenities.subHeading}
            </div>
            <div className="allOptions">
                <div className="options">
                    <div className="option1">
                        {props.amenity ?
                            props.amenity.map((amenity, index) => (

                                <div className="checkBoxes" key={amenity._id}>

                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox onChange={(e) => handleChange(e, index)} checked={inputValues[index].checked} name={amenity.amenities} />
                                            }
                                            label={amenity.amenities}
                                        />
                                    </FormGroup>
                                </div>

                            )) : ""}
                    </div>
                </div>
            </div>
            <div className="button">
                <button className="back" onClick={handleBackClick}>{propertyKeys.back}</button>
                <button className="save" onClick={handleClick}>{propertyKeys.save}</button>
            </div>
        </>
    )
}
export default Amenities;