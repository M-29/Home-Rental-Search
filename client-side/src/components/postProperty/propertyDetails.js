import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useHistory } from "react-router-dom";
import './propertyDetail.css';
import propertyKeys from "../../constantKeys/propertyConstKeys";
import errorMessages from "../../testKeys/errorMessages";
import constKeys from "../../constantKeys/constantKeys";
import textMessages from "../../testKeys/textMessages";
function Propertydetails(props) {
    const currPath = process.env.REACT_APP_POST_URI;
    const history = useHistory();
    const token = localStorage.getItem(textMessages.token.authToken);
    useEffect(() => {
        if (props.editId) {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_APARTMENTDATA_URI}${props.editId}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then((res) => {
                    setPropertyDetails({
                        apartmentType: res.data.apartmentType,
                        bhkType: res.data.bhkType,
                        builtUpArea: res.data.builtUpArea,
                        facing: res.data.facing,
                        propertyAge: res.data.propertyAge,
                        floor: res.data.floor,
                        totalFloor: res.data.totalFloor,
                        bedroom: res.data.bedroom,
                        contactNo: res.data.contactNo
                    })
                    props.setLocality({
                        city: res.data.city,
                        locality: res.data.locality,
                        landmark: res.data.landmark
                    })
                    props.setRentalDetails({
                        availability: res.data.availability,
                        rent: res.data.rent,
                        deposit: res.data.deposit,
                        maintenance: res.data.maintenance,
                        furnishing: res.data.furnishing,
                        preferedTenants: res.data.preferredTenants,
                        parking: res.data.parking,
                        description: res.data.description
                    })
                   
                    props.setAmenity(res.data.amenities);
                    props.setImage(res.data.images);

                }).catch((err)=>{
                    if(err.response.data.message==textMessages.token.tokenExpired){
                        localStorage.removeItem(textMessages.token.authToken);
                        localStorage.removeItem(constKeys.email)
                        localStorage.removeItem(constKeys.userName)
                        localStorage.removeItem(constKeys.userId)
                        history.push(process.env.REACT_APP_MAIN_URI)
                    }
                    
                })
        } else {
            if(localStorage.getItem(textMessages.token.editId)){ 
            axios({
                method: "get",
                url: `${process.env.REACT_APP_APARTMENTDATA_URI}${localStorage.getItem(textMessages.token.editId)}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then((res) => {
                    setPropertyDetails({
                        apartmentType: res.data.apartmentType,
                        bhkType: res.data.bhkType,
                        builtUpArea: res.data.builtUpArea,
                        facing: res.data.facing,
                        propertyAge: res.data.propertyAge,
                        floor: res.data.floor,
                        totalFloor: res.data.totalFloor,
                        bedroom: res.data.bedroom,
                        contactNo: res.data.contactNo
                    })
                    props.setLocality({
                        city: res.data.city,
                        locality: res.data.locality,
                        landmark: res.data.landmark
                    })
                    props.setRentalDetails({
                        availability: res.data.availability,
                        rent: res.data.rent,
                        deposit: res.data.deposit,
                        maintenance: res.data.maintenance,
                        furnishing: res.data.furnishing,
                        preferedTenants: res.data.preferredTenants,
                        parking: res.data.parking,
                        description: res.data.description
                    })
                    props.setAmenity(res.data.amenities);
                    props.setImage(res.data.images);

                }).catch((err)=>{
                    if(err.response.data.message==textMessages.token.tokenExpired){
                        localStorage.removeItem(textMessages.token.authToken);
                        localStorage.removeItem(constKeys.email)
                        localStorage.removeItem(constKeys.userName)
                        localStorage.removeItem(constKeys.userId)
                        history.push(process.env.REACT_APP_MAIN_URI)
                    }
                })
            }
        }
    }, [])
    const [propertyDetails, setPropertyDetails] = useState({
        apartmentType: props.propertyValues.apartmentType,
        bhkType: props.propertyValues.bhkType,
        builtUpArea: props.propertyValues.builtUpArea,
        facing: props.propertyValues.facing,
        propertyAge: props.propertyValues.propertyAge,
        floor: props.propertyValues.floor,
        totalFloor: props.propertyValues.totalFloor,
        bedroom: props.propertyValues.bedroom,
        contactNo: props.propertyValues.contactNo
    })
    const [formErr, setFormErr] = useState({
        apartmentType: "",
        bhkType: "",
        builtUpArea: "",
        facing: "",
        propertyAge: "",
        floor: "",
        totalFloor: "",
        bedroom: "",
        contactNo: ""
    });

    const namePattern = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    const updateSelectedValue = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case propertyKeys.names.apartmentType:
                setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value })
                break;
            case propertyKeys.names.bhkType:
                switch (e.target.value) {
                    case propertyKeys.names.id1:
                        setPropertyDetails({
                            apartmentType: propertyDetails.apartmentType,
                            bhkType: e.target.value,
                            builtUpArea: propertyDetails.builtUpArea,
                            facing: propertyDetails.facing,
                            propertyAge: propertyDetails.propertyAge,
                            floor: propertyDetails.floor,
                            totalFloor: propertyDetails.totalFloor,
                            bedroom: 1,
                            contactNo: propertyDetails.contactNo
                        })
                        break;
                    case propertyKeys.names.id2:
                        setPropertyDetails({
                            apartmentType: propertyDetails.apartmentType,
                            bhkType: e.target.value,
                            builtUpArea: propertyDetails.builtUpArea,
                            facing: propertyDetails.facing,
                            propertyAge: propertyDetails.propertyAge,
                            floor: propertyDetails.floor,
                            totalFloor: propertyDetails.totalFloor,
                            bedroom: 2,
                            contactNo: propertyDetails.contactNo
                        })
                        break;
                    case propertyKeys.names.id3:
                        setPropertyDetails({
                            apartmentType: propertyDetails.apartmentType,
                            bhkType: e.target.value,
                            builtUpArea: propertyDetails.builtUpArea,
                            facing: propertyDetails.facing,
                            propertyAge: propertyDetails.propertyAge,
                            floor: propertyDetails.floor,
                            totalFloor: propertyDetails.totalFloor,
                            bedroom: 3,
                            contactNo: propertyDetails.contactNo
                        })
                        break;
                    case propertyKeys.names.id4:
                        setPropertyDetails({
                            apartmentType: propertyDetails.apartmentType,
                            bhkType: e.target.value,
                            builtUpArea: propertyDetails.builtUpArea,
                            facing: propertyDetails.facing,
                            propertyAge: propertyDetails.propertyAge,
                            floor: propertyDetails.floor,
                            totalFloor: propertyDetails.totalFloor,
                            bedroom: 4,
                            contactNo: propertyDetails.contactNo
                        })
                        break;
                    case propertyKeys.names.id5:
                        setPropertyDetails({
                            apartmentType: propertyDetails.apartmentType,
                            bhkType: e.target.value,
                            builtUpArea: propertyDetails.builtUpArea,
                            facing: propertyDetails.facing,
                            propertyAge: propertyDetails.propertyAge,
                            floor: propertyDetails.floor,
                            totalFloor: propertyDetails.totalFloor,
                            bedroom: 5,
                            contactNo: propertyDetails.contactNo
                        })
                        break;
                }
                break;
            case propertyKeys.names.builtUpArea:
                setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value })

                break;
            case propertyKeys.names.facing:

                setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value })
                break;
            case propertyKeys.names.propertyAge:
                setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value })
                break;
            case propertyKeys.names.floor:
                setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value })
                break;
            case propertyKeys.names.totalFloor:
                setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value })
                break;
            case propertyKeys.names.contactNo:
                setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value })
                break;
        }

    }
    const validateFields = (e) => {
        switch (e.target.name) {
            case propertyKeys.names.apartmentType:
                if (!e.target.value) {
                    setFormErr({
                        apartmentType: errorMessages.errorMesage.thisFieldRequire,
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                if (e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                break;
            case propertyKeys.names.bhkType:
                if (!e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: errorMessages.errorMesage.thisFieldRequire,
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                if (e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                break;
            case propertyKeys.names.builtUpArea:
                console.log(e.target.value)
                if (!e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: errorMessages.errorMesage.thisFieldRequire,
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                else if (e.target.value && namePattern.test(e.target.value)) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                else if (!namePattern.test(e.target.value)) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: errorMessages.errorMesage.validBuildUpArea,
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                break;
            case propertyKeys.names.facing:

                if (!e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: errorMessages.errorMesage.thisFieldRequire,
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                if (e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }

                break;
            case propertyKeys.names.propertyAge:
                if (!e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: errorMessages.errorMesage.thisFieldRequire,
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                if (e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                break;
            case propertyKeys.names.floor:
                if (!e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: errorMessages.errorMesage.thisFieldRequire,
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                if (e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                break;
            case propertyKeys.names.totalFloor:
                if (e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                if (!e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: errorMessages.errorMesage.thisFieldRequire,
                        bedroom: "",
                        contactNo: ""
                    })
                }
                break;
            case propertyKeys.names.bedRoom:
                if (e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                if (!e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: errorMessages.errorMesage.thisFieldRequire,
                        contactNo: ""
                    })
                }
                break;
            case propertyKeys.names.contactNo:
                const number = e.target.value
                if (e.target.value && namePattern.test(e.target.value)) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: ""
                    })
                }
                else if (!namePattern.test(e.target.value) && e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: errorMessages.errorMesage.validContactNo
                    })
                }
                if (number.length < 10 && e.target.value && namePattern.test(e.target.value)) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: errorMessages.errorMesage.tenDigitNo
                    })
                }

                if (number.length > 10 && e.target.value && namePattern.test(e.target.value)) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: errorMessages.errorMesage.tenDigitNo
                    })
                }
                else if (!e.target.value) {
                    setFormErr({
                        apartmentType: "",
                        bhkType: "",
                        builtUpArea: "",
                        facing: "",
                        propertyAge: "",
                        floor: "",
                        totalFloor: "",
                        bedroom: "",
                        contactNo: errorMessages.errorMesage.thisFieldRequire
                    })
                }
                break;
        }

    }
    const handleClick = () => {
        if (propertyDetails.apartmentType && propertyDetails.bhkType && propertyDetails.builtUpArea && propertyDetails.facing && propertyDetails.floor && propertyDetails.totalFloor && propertyDetails.propertyAge) {
            history.push(`${props.editId ? process.env.REACT_APP_EDIT_URL : currPath}${process.env.REACT_APP_LOCALITY_URI}`);
            props.setPropertyDetails(propertyDetails);
            props.isLocalityToggle(true);
            props.isPropertyToggle(false);
            setFormErr({
                apartmentType: "",
                bhkType: "",
                builtUpArea: "",
                facing: "",
                propertyAge: "",
                floor: "",
                totalFloor: ""
            })
        }
        else if (!propertyDetails.apartmentType && !propertyDetails.bhkType && !propertyDetails.builtUpArea && !propertyDetails.facing && !propertyDetails.floor && !propertyDetails.totalFloor && !propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: errorMessages.errorMesage.thisFieldRequire,
                bhkType: errorMessages.errorMesage.thisFieldRequire,
                builtUpArea: errorMessages.errorMesage.thisFieldRequire,
                facing: errorMessages.errorMesage.thisFieldRequire,
                propertyAge: errorMessages.errorMesage.thisFieldRequire,
                floor: errorMessages.errorMesage.thisFieldRequire,
                totalFloor: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (propertyDetails.apartmentType && !propertyDetails.bhkType && !propertyDetails.builtUpArea && !propertyDetails.facing && !propertyDetails.floor && !propertyDetails.totalFloor && !propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: "",
                bhkType: errorMessages.errorMesage.thisFieldRequire,
                builtUpArea: errorMessages.errorMesage.thisFieldRequire,
                facing: errorMessages.errorMesage.thisFieldRequire,
                propertyAge: errorMessages.errorMesage.thisFieldRequire,
                floor: errorMessages.errorMesage.thisFieldRequire,
                totalFloor: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (propertyDetails.apartmentType && propertyDetails.bhkType && !propertyDetails.builtUpArea && !propertyDetails.facing && !propertyDetails.floor && !propertyDetails.totalFloor && !propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: "",
                bhkType: "",
                builtUpArea: errorMessages.errorMesage.thisFieldRequire,
                facing: errorMessages.errorMesage.thisFieldRequire,
                propertyAge: errorMessages.errorMesage.thisFieldRequire,
                floor: errorMessages.errorMesage.thisFieldRequire,
                totalFloor: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (propertyDetails.apartmentType && propertyDetails.bhkType && !namePattern.test(propertyDetails.builtUpArea) && !propertyDetails.facing && !propertyDetails.floor && !propertyDetails.totalFloor && !propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: "",
                apartmentName: "",
                bhkType: "",
                builtUpArea: errorMessages.errorMesage.validBuildUpArea,
                facing: errorMessages.errorMesage.thisFieldRequire,
                propertyAge: errorMessages.errorMesage.thisFieldRequire,
                floor: errorMessages.errorMesage.thisFieldRequire,
                totalFloor: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (propertyDetails.apartmentType && propertyDetails.bhkType && propertyDetails.builtUpArea && !propertyDetails.facing && !propertyDetails.floor && !propertyDetails.totalFloor && !propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: "",
                bhkType: "",
                builtUpArea: "",
                facing: errorMessages.errorMesage.thisFieldRequire,
                propertyAge: errorMessages.errorMesage.thisFieldRequire,
                floor: errorMessages.errorMesage.thisFieldRequire,
                totalFloor: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (propertyDetails.apartmentType && propertyDetails.bhkType && propertyDetails.builtUpArea && !propertyDetails.facing && !propertyDetails.floor && !propertyDetails.totalFloor && propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: "",
                bhkType: "",
                builtUpArea: "",
                facing: errorMessages.errorMesage.thisFieldRequire,
                propertyAge: "",
                floor: errorMessages.errorMesage.thisFieldRequire,
                totalFloor: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (propertyDetails.apartmentType && propertyDetails.bhkType && propertyDetails.builtUpArea && propertyDetails.facing && !propertyDetails.floor && !propertyDetails.totalFloor && propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: "",
                bhkType: "",
                builtUpArea: "",
                facing: "",
                propertyAge: "",
                floor: errorMessages.errorMesage.thisFieldRequire,
                totalFloor: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (propertyDetails.apartmentType && propertyDetails.bhkType && propertyDetails.builtUpArea && propertyDetails.facing && propertyDetails.floor && !propertyDetails.totalFloor && propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: "",
                bhkType: "",
                builtUpArea: "",
                facing: "",
                propertyAge: "",
                floor: "",
                totalFloor: errorMessages.errorMesage.thisFieldRequire
            })
        }
        else if (propertyDetails.apartmentType && propertyDetails.bhkType && propertyDetails.builtUpArea && propertyDetails.facing && propertyDetails.floor && propertyDetails.totalFloor && propertyDetails.propertyAge) {
            setFormErr({
                apartmentType: "",
                bhkType: "",
                builtUpArea: "",
                facing: "",
                propertyAge: "",
                floor: "",
                totalFloor: ""
            })
        }
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <>
            <div className="heading">
                {propertyKeys.propertyDetails.heading}
            </div>
            <div className="appartmentDetail">
                <div className="appartmentType">
                    <div className="label-dropdown">

                        {formErr.apartmentType && <p className="errMsg">{formErr.apartmentType}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">{propertyKeys.propertyDetails.apartmentType}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.apartmentType}
                                onChange={updateSelectedValue}
                                label={propertyKeys.propertyDetails.apartmentType}
                                onBlur={validateFields}
                                value={propertyDetails.apartmentType}
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            >
                                <option aria-label="None" value="" />
                                {props.apartmentType.map((location) => (

                                    <>
                                        <option
                                        key={location._id}
                                            value={location._id} >
                                            {location.apartment}
                                        </option>
                                    </>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="bhkType">
                    <div className="label-dropdown">

                        {formErr.bhkType && <p className="errMsg">{formErr.bhkType}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">{propertyKeys.propertyDetails.bhkType}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.bhkType}
                                onChange={updateSelectedValue}
                                label={propertyKeys.propertyDetails.bhkType}
                                onBlur={validateFields}
                                value={propertyDetails.bhkType}
                                inputProps={{
                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.bhkType ?
                                    props.bhkType.map((bhk) => (

                                        <>
                                            <option
                                            key={bhk._id}
                                                value={bhk._id} >
                                                {bhk.bhk}
                                            </option>
                                        </>
                                    )) : ""}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="label-dropdown">

                        {formErr.builtUpArea && <p className="errMsg">{formErr.builtUpArea}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }} variant="outlined">
                            <InputLabel id="demo-multiple-name-label">{propertyKeys.propertyDetails.builtUpArea}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                native
                                label={propertyKeys.propertyDetails.builtUpArea}
                                name={propertyKeys.names.builtUpArea}
                                onChange={updateSelectedValue}
                                onBlur={validateFields}
                                endAdornment={<InputAdornment position="end">{propertyKeys.propertyDetails.sqft}</InputAdornment>}
                                value={propertyDetails.builtUpArea}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="propertyAge">
                    <div className="label-dropdown">

                        {formErr.propertyAge && <p className="errMsg">{formErr.propertyAge}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.propertyDetails.propertyAge}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.propertyAge}
                                onChange={updateSelectedValue}
                                onBlur={validateFields}
                                label={propertyKeys.propertyDetails.propertyAge}
                                value={propertyDetails.propertyAge}
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.propertyAge ?
                                    props.propertyAge.map((age) => (

                                        <>
                                            <option
                                            key={age._id}
                                                value={age._id} >
                                                {age.age}
                                            </option>
                                        </>
                                    )) : ""}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="label-dropdown">

                        {formErr.facing && <p className="errMsg">{formErr.facing}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.propertyDetails.facing}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.facing}
                                onChange={updateSelectedValue}
                                onBlur={validateFields}
                                label={propertyKeys.propertyDetails.facing}
                                value={propertyDetails.facing}
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.facing ?
                                    props.facing.map((direction) => (

                                        <>
                                            <option
                                            key={direction._id}
                                                value={direction._id} >
                                                {direction.direction}
                                            </option>
                                        </>
                                    )) : ""}
                            </Select>
                        </FormControl>
                    </div>

                </div>
                <div className="floor">
                    <div className="label-dropdown">
                        {formErr.floor && <p className="errMsg">{formErr.floor}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.propertyDetails.floor}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.floor}
                                onChange={updateSelectedValue}
                                onBlur={validateFields}
                                label={propertyKeys.propertyDetails.floor}
                                value={propertyDetails.floor}
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.floor ?
                                    props.floor.map((floor) => (

                                        <>
                                            <option
                                                key={floor._id}
                                                value={floor._id} >
                                                {floor.floor}
                                            </option>
                                        </>
                                    )) : ""}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="label-dropdown">
                        {formErr.totalFloor && <p className="errMsg">{formErr.totalFloor}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }}>
                            <InputLabel className="inputLabel">{propertyKeys.propertyDetails.totalFloor}</InputLabel>
                            <Select
                                native
                                name={propertyKeys.names.totalFloor}
                                onChange={updateSelectedValue}
                                onBlur={validateFields}
                                label={propertyKeys.propertyDetails.totalFloor}
                                value={propertyDetails.totalFloor}
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            > <option aria-label="None" value="" />
                                {props.floor?
                                props.floor.map((floor) => (

                                    <>
                                        <option
                                        key={floor._id}
                                            value={floor._id} >
                                            {floor.floor}
                                        </option>
                                    </>
                                )):""}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="bedroom-contact">
                    <div className="label-dropdown">
                        {formErr.bedroom && <p className="errMsg">{formErr.bedroom}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }} variant="outlined">
                            <InputLabel className="inputLabel">{propertyKeys.propertyDetails.bedRoom}</InputLabel>
                            <OutlinedInput
                                native
                                name={propertyKeys.names.bedRoom}
                                onChange={updateSelectedValue}
                                onBlur={validateFields}
                                label={propertyKeys.propertyDetails.bedRoom}
                                value={propertyDetails.bedroom}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            />
                        </FormControl>
                    </div>

                    <div className="label-dropdown">

                        {formErr.contactNo && <p className="errMsg">{formErr.contactNo}</p>}
                        <FormControl sx={{ ml: 2, mt: 0.5, width: 300 }} variant="outlined">
                            <InputLabel className="inputLabel">{propertyKeys.propertyDetails.contactNo}</InputLabel>
                            <OutlinedInput
                                native
                                id="outlined-adornment-weight"
                                name={propertyKeys.names.contactNo}
                                onChange={updateSelectedValue}
                                value={propertyDetails.contactNo}
                                onBlur={validateFields}
                                // placeholder="9912345678"
                                label={propertyKeys.propertyDetails.contactNo}
                                startAdornment={<InputAdornment position="start">{propertyKeys.propertyDetails.numberPrefix}</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{

                                    id: "outlined-age-native-simple",
                                }}
                            />
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="button">
                <button className="save" onClick={handleClick}>{propertyKeys.save}</button>
            </div>
        </>
    )
}
export default Propertydetails;