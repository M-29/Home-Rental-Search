import React, { useState ,useEffect} from "react";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useHistory } from "react-router-dom";
import './locality.css';
import axios from 'axios';
import propertyKeys from "../../constantKeys/propertyConstKeys";
import errorMessages from "../../testKeys/errorMessages";
import textMessages from "../../testKeys/textMessages";
import constKeys from "../../constantKeys/constantKeys";

function Locality(props) {
    const currPath = process.env.REACT_APP_POST_URI;
    const history = useHistory();
    const [inputValues, setInputValues] = useState({
        city: props.locality.city,
        locality: props.locality.locality,
        landmark: props.locality.landmark
    });
    const [formErr, setFormErr] = useState({
        city: "",
        locality: "",
        landmark: ""
    });
    const handleChange = (e) => {
        switch (e.target.name) {
            case propertyKeys.names.city:
                setInputValues({ ...inputValues, [e.target.name]: e.target.value })
                break;
            case propertyKeys.names.locality:
                setInputValues({ ...inputValues, [e.target.name]: e.target.value })
                break;
            case propertyKeys.names.landmark:
                setInputValues({ ...inputValues, [e.target.name]: e.target.value })
                break;
        }
    }
    const validateFields = (e) => {
        switch (e.target.name) {
            case propertyKeys.names.city:
                if (e.target.value) {
                    setFormErr({
                        city: "",
                        locality: "",
                        landmark: ""
                    })
                }
                if (!e.target.value) {
                    setFormErr({
                        city: errorMessages.errorMesage.thisFieldRequire,
                        locality: "",
                        landmark: ""
                    })
                }
                break;
            case propertyKeys.names.locality:
                if (e.target.value) {
                    setFormErr({
                        city: "",
                        locality: "",
                        landmark: ""
                    })
                }
                if (!e.target.value) {
                    setFormErr({
                        city: "",
                        locality: errorMessages.errorMesage.thisFieldRequire,
                        landmark: ""
                    })
                }
                break;
            case propertyKeys.names.landmark:
                if (e.target.value) {
                    setFormErr({
                        city: "",
                        locality: "",
                        landmark: ""
                    })
                }
                if (!e.target.value) {
                    setFormErr({
                        city: "",
                        locality: "",
                        landmark: errorMessages.errorMesage.thisFieldRequire
                    })
                }
                break;
        }
    }
    const handleBackClick = () => {
        history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_PROPERTY_URI}`);
        props.isPropertyToggle(true);
        props.isLocalityToggle(false);
    }
    const handleClick = () => {
        if (inputValues.city && inputValues.landmark && inputValues.locality) {
            history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_RESALE_URI}`);
            props.setLocalityDetails(inputValues)
            props.isResaleToggle(true);
            props.isLocalityToggle(false);
        }
        else if (!inputValues.city && !inputValues.landmark && !inputValues.locality) {
            setFormErr({
                city: errorMessages.errorMesage.thisFieldRequire,
                locality: errorMessages.errorMesage.thisFieldRequire,
                landmark: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.city && !inputValues.landmark && !inputValues.locality) {
            setFormErr({
                city: "",
                locality:errorMessages.errorMesage.thisFieldRequire,
                landmark:errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.city && !inputValues.landmark && inputValues.locality) {
            setFormErr({
                city: "",
                locality: "",
                landmark:errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (!inputValues.city && inputValues.landmark && inputValues.locality) {
            setFormErr({
                city: "",
                locality: "",
                landmark: ""
            })
        }
    }
    useEffect(()=>{
        if(localStorage.getItem(textMessages.token.authToken)){
           
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
    },[])
    return (
        <>
            <div className="heading">
                {propertyKeys.locality.heading}
            </div>
            <div className="localityDetails">
                <div className="city">
                    <div className="label-dropdown">
                        
                        {formErr.city && <p className="errMsg">{formErr.city}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.locality.city}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.city}
                                onChange={handleChange}
                                label="city"
                                onBlur={validateFields}
                                value={inputValues.city}
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.city?
                                props.city.map((cities) => (

                                    <>
                                        <option
                                        key={cities._id}
                                            value={cities._id} >
                                            {cities.city}
                                        </option>
                                    </>
                                )):""}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="label-dropdown">
                        
                        {formErr.locality && <p className="errMsg">{formErr.locality}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }} variant="outlined">
                        <InputLabel className="inputLabel">{propertyKeys.locality.locality}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name={propertyKeys.names.locality}
                                value={inputValues.locality}
                                label={propertyKeys.locality.locality}
                                native
                                onChange={handleChange}
                                placeholder={propertyKeys.locality.locality}
                                onBlur={validateFields}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                    </div>

                </div>

                <div className="landmark">
                    <div className="label-dropdown">
                        
                        {formErr.landmark && <p className="errMsg">{formErr.landmark}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }} variant="outlined">
                        <InputLabel className="inputLabel">{propertyKeys.locality.landmark}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name={propertyKeys.names.landmark}
                                onChange={handleChange}
                                value={inputValues.landmark}
                                label={propertyKeys.locality.landmark}
                                placeholder={propertyKeys.locality.landmark}
                                onBlur={validateFields}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
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
export default Locality;