import React, { useState,useEffect } from "react";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useHistory } from "react-router-dom";
import './rentalDetails.css';
import propertyKeys from "../../constantKeys/propertyConstKeys";
import errorMessages from "../../testKeys/errorMessages";
import axios from 'axios';
import constKeys from "../../constantKeys/constantKeys";
import textMessages from "../../testKeys/textMessages";
function Rentaldetails(props) {
    const currPath = process.env.REACT_APP_POST_URI;
    const history = useHistory();
    const [inputValues, setInputValues] = useState({
        availability: "Only rent",
        rent: props.rental.rent,
        deposit: props.rental.deposit,
        maintenance: props.rental.maintenance,
        preferedTenants: props.rental.preferedTenants,
        furnishing: props.rental.furnishing,
        parking: props.rental.parking,
        description: props.rental.description
    });
    const [formErr, setFormErr] = useState({

        rent: "",
        deposit: "",
        maintenance: "",
        furnishing: "",
        parking: "",
        preferedTenants: "",
        description: ""
    });
    const pattern = /^[0-9\b]+$/;
    const handleBackClick = () => {
        history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_LOCALITY_URI}`);
        props.isLocalityToggle(true);
        props.isResaleToggle(false);
    }
    const validateFields = (e) => {
        switch (e.target.name) {
            case propertyKeys.names.rent:
                if (!e.target.value) {
                    setFormErr({
                        rent: errorMessages.errorMesage.thisFieldRequire,
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                else if (!pattern.test(e.target.value)) {
                    setFormErr({
                        rent: errorMessages.errorMesage.validRent,
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                else if (pattern.test(e.target.value) && e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                break;
            case propertyKeys.names.deposit:
                if (!e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: errorMessages.errorMesage.thisFieldRequire,
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                else if (!pattern.test(e.target.value)) {
                    setFormErr({
                        rent: "",
                        deposit: errorMessages.errorMesage.validDeposit,
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                else if (pattern.test(e.target.value) && e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                break;
            case propertyKeys.names.maintenance:
                if (!e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: errorMessages.errorMesage.thisFieldRequire,
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                else if (e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                break;
            case propertyKeys.names.preferedTenants:
                if (!e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: errorMessages.errorMesage.thisFieldRequire,
                        description: ""
                    })
                }
                else if (e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                break;
            case propertyKeys.names.furnishing:
                if (!e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: errorMessages.errorMesage.thisFieldRequire,
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                else if (e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                break;

            case propertyKeys.names.parking:
                if (!e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: errorMessages.errorMesage.thisFieldRequire,
                        preferedTenants: "",
                        description: ""
                    })
                }
                else if (e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                break;
            case propertyKeys.names.description:
                if (!e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: errorMessages.errorMesage.thisFieldRequire
                    })
                }
                else if (e.target.value) {
                    setFormErr({
                        rent: "",
                        deposit: "",
                        maintenance: "",
                        furnishing: "",
                        parking: "",
                        preferedTenants: "",
                        description: ""
                    })
                }
                break;
        }
    }
    const handleClick = () => {
        if (inputValues.rent && inputValues.deposit && inputValues.maintenance && inputValues.preferedTenants && inputValues.furnishing && inputValues.parking && inputValues.description) {
            history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_AMENITY_URI}`);
            props.setRentalDetails(inputValues)
            props.isResaleToggle(false);
            props.isAmenityToggle(true);
            setFormErr({
                rent: "",
                deposit: "",
                maintenance: "",
                furnishing: "",
                parking: "",
                preferedTenants: "",
                description: ""
            })
        }
        else if (!inputValues.rent && !inputValues.deposit && !inputValues.maintenance && !inputValues.preferedTenants && !inputValues.furnishing && !inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: errorMessages.errorMesage.thisFieldRequire,
                deposit: errorMessages.errorMesage.thisFieldRequire,
                maintenance: errorMessages.errorMesage.thisFieldRequire,
                furnishing: errorMessages.errorMesage.thisFieldRequire,
                parking: errorMessages.errorMesage.thisFieldRequire,
                preferedTenants: errorMessages.errorMesage.thisFieldRequire,
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (!pattern.test(inputValues.rent) && !inputValues.deposit && !inputValues.maintenance && !inputValues.preferedTenants && !inputValues.furnishing && !inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: errorMessages.errorMesage.validRent,
                deposit: errorMessages.errorMesage.thisFieldRequire,
                maintenance: errorMessages.errorMesage.thisFieldRequire,
                furnishing: errorMessages.errorMesage.thisFieldRequire,
                parking: errorMessages.errorMesage.thisFieldRequire,
                preferedTenants: errorMessages.errorMesage.thisFieldRequire,
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.rent && !inputValues.deposit && !inputValues.maintenance && !inputValues.preferedTenants && !inputValues.furnishing && !inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: "",
                deposit: errorMessages.errorMesage.thisFieldRequire,
                maintenance: errorMessages.errorMesage.thisFieldRequire,
                furnishing: errorMessages.errorMesage.thisFieldRequire,
                parking: errorMessages.errorMesage.thisFieldRequire,
                preferedTenants: errorMessages.errorMesage.thisFieldRequire,
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.rent && !pattern.test(inputValues.deposit) && !inputValues.maintenance && !inputValues.preferedTenants && !inputValues.furnishing && !inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: "",
                deposit: errorMessages.errorMesage.validDeposit,
                maintenance: errorMessages.errorMesage.thisFieldRequire,
                furnishing: errorMessages.errorMesage.thisFieldRequire,
                parking: errorMessages.errorMesage.thisFieldRequire,
                preferedTenants: errorMessages.errorMesage.thisFieldRequire,
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.rent && inputValues.deposit && !inputValues.maintenance && !inputValues.preferedTenants && !inputValues.furnishing && !inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: "",
                deposit: "",
                maintenance: errorMessages.errorMesage.thisFieldRequire,
                furnishing: errorMessages.errorMesage.thisFieldRequire,
                parking: errorMessages.errorMesage.thisFieldRequire,
                preferedTenants: errorMessages.errorMesage.thisFieldRequire,
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.rent && inputValues.deposit && inputValues.maintenance && !inputValues.preferedTenants && !inputValues.furnishing && !inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: "",
                deposit: "",
                maintenance: "",
                furnishing: errorMessages.errorMesage.thisFieldRequire,
                parking: errorMessages.errorMesage.thisFieldRequire,
                preferedTenants: errorMessages.errorMesage.thisFieldRequire,
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.rent && inputValues.deposit && inputValues.maintenance && inputValues.preferedTenants && !inputValues.furnishing && !inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: "",
                deposit: "",
                maintenance: "",
                furnishing: errorMessages.errorMesage.thisFieldRequire,
                parking: errorMessages.errorMesage.thisFieldRequire,
                preferedTenants: "",
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.rent && inputValues.deposit && inputValues.maintenance && inputValues.preferedTenants && inputValues.furnishing && !inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: "",
                deposit: "",
                maintenance: "",
                furnishing: "",
                parking: errorMessages.errorMesage.thisFieldRequire,
                preferedTenants: "",
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.rent && inputValues.deposit && inputValues.maintenance && inputValues.preferedTenants && inputValues.furnishing && inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: "",
                deposit: "",
                maintenance: "",
                furnishing: "",
                parking: "",
                preferedTenants: "",
                description: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (inputValues.rent && inputValues.deposit && inputValues.maintenance && inputValues.preferedTenants && inputValues.furnishing && inputValues.parking && !inputValues.description) {
            setFormErr({
                rent: "",
                deposit: "",
                maintenance: "",
                furnishing: "",
                parking: "",
                preferedTenants: "",
                description: ""
            })
        }
    }
    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
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
                
                
            }).catch((err) => {
                if(err.response.data.message==textMessages.token.tokenExpired){
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
                {propertyKeys.rentalKeys.heading}
            </div>
            <div className="rentaDetails">
                <div className="rent-leae">
                    <div className="property-avaliable">
                        <FormControl>
                          
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="availability"
                                onChange={handleChange}

                            >
                                <FormControlLabel checked value="Only rent" control={<Radio />} label="Only rent" />
                                <FormControlLabel value="Only lease" control={<Radio />} label="Only lease" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                </div>

                <div className="rent">
                    <div className="label-dropdown">

                        
                        {formErr.rent && <p className="errMsg">{formErr.rent}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }} variant="outlined">
                            <InputLabel className="inputLabel">{propertyKeys.rentalKeys.expectedRent}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                onChange={handleChange}
                                name={propertyKeys.names.rent}
                                placeholder="Expected rent"
                                onBlur={validateFields}
                                label="Expected rent"
                                value={inputValues.rent}
                                startAdornment={<InputAdornment position="start">&#8377;</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                    </div>
                    <div className="label-dropdown">
                       
                        {formErr.deposit && <p className="errMsg">{formErr.deposit}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }} variant="outlined">
                            <InputLabel className="inputLabel">{propertyKeys.rentalKeys.expectedDeposit}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                onChange={handleChange}
                                name={propertyKeys.names.deposit}
                                label="Expected deposit"
                                value={inputValues.deposit}
                                placeholder="Expected deposit"
                                onBlur={validateFields}
                                startAdornment={<InputAdornment position="start">&#8377;</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                    </div>
                </div>


                <div className="maintenance">
                    <div className="label-dropdown">
                        
                        {formErr.maintenance && <p className="errMsg">{formErr.maintenance}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.rentalKeys.monthlyMaintenance}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.maintenance}
                                onChange={handleChange}
                                label="Monthly maintenance"

                                onBlur={validateFields}
                                value={inputValues.maintenance}
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.maintenance.map((maintenance) => (

                                    <>
                                        <option
                                        key={maintenance._id}
                                            value={maintenance._id} >
                                            {maintenance.maintenance}
                                        </option>
                                    </>
                                ))}
                            </Select>
                        </FormControl>
                       
                    </div>


                    <div className="label-dropdown">
                        
                        {formErr.preferedTenants && <p className="errMsg">{formErr.preferedTenants}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.rentalKeys.prefferedTenants}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.preferedTenants}
                                onChange={handleChange}
                                value={inputValues.preferedTenants}
                                onBlur={validateFields}
                                label="Prefered tenants"
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.tenants.map((tenants) => (

                                    <>
                                        <option
                                        key={tenants._id}
                                            value={tenants._id} >
                                            {tenants.tenantsType}
                                        </option>
                                    </>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="furnishig-parking">
                    <div className="label-dropdown">
                        
                        {formErr.furnishing && <p className="errMsg">{formErr.furnishing}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.rentalKeys.furnishing}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.furnishing}
                                onChange={handleChange}
                                value={inputValues.furnishing}
                                onBlur={validateFields}
                                label="Furnishing"
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.furnished.map((furnish) => (

                                    <>
                                        <option
                                        key={furnish._id}
                                            value={furnish._id} >
                                            {furnish.equipped}
                                        </option>
                                    </>
                                ))}
                            </Select>
                        </FormControl>
                    </div>


                    <div className="label-dropdown">
                        
                        {formErr.parking && <p className="errMsg">{formErr.parking}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.rentalKeys.parking}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.parking}
                                onChange={handleChange}
                                onBlur={validateFields}
                                value={inputValues.parking}
                                label="Parking"
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.parking.map((parking) => (

                                    <>
                                        <option
                                        key={parking._id}
                                            value={parking._id} >
                                            {parking.vehicle}
                                        </option>
                                    </>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>


                <div className="description">
                    <div className="label-dropdown">
                        
                        {formErr.description && <p className="errMsg">{formErr.description}</p>}

                        <TextareaAutosize

                            maxRows={4}
                            aria-label="maximum height"
                            name={propertyKeys.names.description}
                            label="Description"
                            placeholder="Description"
                            onChange={handleChange}
                            onBlur={validateFields}
                            value={inputValues.description}
                            style={{ width: 630, marginLeft: 20, height: 100, padding: 20 }}
                        />
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
export default Rentaldetails;