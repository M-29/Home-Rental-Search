import React, { useState, useEffect } from "react";
import './postProperty.css'
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BusinessIcon from '@mui/icons-material/Business';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Propertydetails from "./propertyDetails";
import ElevateAppBar from "../navBar/Navbar1";
import Locality from "./locality";
import Rentaldetails from "./rentalDetails";
import Amenities from "./amenities";
import { useHistory } from "react-router-dom";
import Gallery from "./gallery";
import Popupbox from "../popupbox/popupbox.js";
import axios from "axios";
import propertyKeys from "../../constantKeys/propertyConstKeys";
import textMessages from "../../testKeys/textMessages";
import constKeys from "../../constantKeys/constantKeys";

function Postproperty(props) {
    const currPath =process.env.REACT_APP_POST_URI
    const history = useHistory();
    const [isPopUpTriggered, setIsPopUpTriggered] = useState(false);
    const [popUpButtons,setPopUpButtons] =useState(false)
    const [popUpMessage, setPopupMessage] = useState("");
    const [propertyToggle, setPropertyToggle] = useState(true);
    const [localityToggle, setlocalityToggle] = useState(false);
    const [resaleToggle, setResaleToggle] = useState(false);
    const [amenityToggle, setAmenityToggle] = useState(false);
    const [galleryToggle, setGalleryToggle] = useState(false);
    const [propertyValues, setPropertValues] = useState({
        apartmentType: "",
        bhkType: "",
        builtUpArea: "",
        facing: "",
        propertyAge: "",
        floor: "",
        totalFloor: "",
        bedroom:"",
        contactNo:""
    })
    const [locality, setLocality] = useState({
        city: "",
        locality: "",
        landmark: ""
    })
    const [rental, setRentalDetails] = useState({
        availability: "",
        rent: "",
        deposit: "",
        maintenance: "",
        furnishing: "",
        preferedTenants: "",
        parking: "",
        description: ""
    })
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
    
    const [amenity,setAmenity]=useState();
    const [images,setImages] = useState([]);
    const [amenities, setAmenities] = useState([])
    useEffect(()=>{
        setAmenities(props.amenities.map((amenity)=>({...amenity,checked:false})))
    },[props.amenities])
    const handleProperty = () => {
        history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_PROPERTY_URI}`);
        setPropertyToggle(true);
        setlocalityToggle(false);
        setResaleToggle(false);
        setAmenityToggle(false);
        setGalleryToggle(false);
    }
    const handleLocation = () => {
        history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_LOCALITY_URI}`);
        setPropertyToggle(false);
        setlocalityToggle(true);
        setResaleToggle(false);
        setAmenityToggle(false);
        setGalleryToggle(false);
    }
    const handleResale = () => {
        history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_RESALE_URI}`);
        setPropertyToggle(false);
        setlocalityToggle(false);
        setResaleToggle(true);
        setAmenityToggle(false);
        setGalleryToggle(false);
    }
    const handleAmenity = () => {
        history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_AMENITY_URI}`);
        setPropertyToggle(false);
        setlocalityToggle(false);
        setResaleToggle(false);
        setAmenityToggle(true);
        setGalleryToggle(false);
    }
    const handleGallery = () => {
        history.push(`${props.editId?process.env.REACT_APP_EDIT_URL:currPath}${process.env.REACT_APP_GALLERY_URI}`);
        setPropertyToggle(false);
        setlocalityToggle(false);
        setResaleToggle(false);
        setAmenityToggle(false);
        setGalleryToggle(true);
    }
    const handleBack = () => {
        history.push(process.env.REACT_APP_MAIN_URI)
    }
    return (
        <>

            <ElevateAppBar setDetails={props.setLogin} setLogout={props.isUserDetails} />
            <div className="property-container">

                <div className="propertychild-container">
                
                    <div className="sub-nav1">
                        <div className="sub-child1">
                       
                        </div>
                        
                        <div className="details">
                       
                            <div className="sidebar">
                            
                                <div className={propertyToggle?"sidebar-detail1":"sidebar-detail"}>
                                    <div className="image-div">
                                        <HomeIcon fontSize="large" color="primary" />
                                    </div>
                                    <div className="text-div">
                                        <p onClick={handleProperty} name="propertyDetail">{propertyKeys.propertyDetail}</p>
                                    </div>
                                </div>
                                <div className={localityToggle?"sidebar-detail1":"sidebar-detail"}>
                                    <div className="image-div">
                                        <AddLocationAltIcon fontSize="large" color="primary" />
                                    </div>
                                    <div className="text-div">
                                        <p onClick={handleLocation} name="localityDetail">{propertyKeys.locationDetails}</p>
                                    </div>
                                </div>
                                <div className={resaleToggle?"sidebar-detail1":"sidebar-detail"}>
                                    <div className="image-div">
                                        <BusinessIcon fontSize="large" color="primary" />
                                    </div>
                                    <div className="text-div">
                                        <p onClick={handleResale} name="resaleDetail">{propertyKeys.rentalDetail}</p>
                                    </div>
                                </div>
                                <div className={amenityToggle?"sidebar-detail1":"sidebar-detail"}>
                                    <div className="image-div">
                                        <KitchenIcon fontSize="large" color="primary" />
                                    </div>
                                    <div className="text-div">
                                        <p onClick={handleAmenity} name="amenities">{propertyKeys.amenitiesHeading}</p>
                                    </div>
                                </div>
                                <div className={galleryToggle?"sidebar-detail1":"sidebar-detail"}>
                                    <div className="image-div">
                                        <CameraAltIcon fontSize="large" color="primary" />
                                    </div>
                                    <div className="text-div">
                                        <p onClick={handleGallery} name="gallery">{propertyKeys.galleryHeading}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="formDiv">
                                {propertyToggle ? <Propertydetails
                                    editId={props.editId}
                                    apartmentType={props.apartmentType}
                                    floor={props.floor}
                                    bhkType={props.bhkType}
                                    facing={props.facing}
                                    propertyAge={props.propertyAge}
                                    propertyValues={propertyValues}
                                    setRentalDetails = {details=>{setRentalDetails(details)}}
                                    setImage = {details=>{setImages(details)}}
                                    setLocality = {locality=>{setLocality(locality)}}
                                    setAmenity = {details=>{setAmenity(details)}}
                                    setPropertyDetails={allValues => { setPropertValues(allValues) }}
                                    isPropertyToggle={allValues => { setPropertyToggle(allValues) }}
                                    isLocalityToggle={locality => { setlocalityToggle(locality) }}
                                /> : ""}
                                {localityToggle ? <Locality
                                    editId={props.editId}
                                    city={props.city}
                                    locality={locality}
                                    setLocalityDetails={allValues => { setLocality(allValues) }}
                                    isPropertyToggle={allValues => { setPropertyToggle(allValues) }}
                                    isLocalityToggle={locality => { setlocalityToggle(locality) }}
                                    isResaleToggle={allValues => { setResaleToggle(allValues) }}
                                /> : ""}
                                {resaleToggle ? <Rentaldetails
                                    editId={props.editId}
                                    maintenance={props.maintenance}
                                    tenants={props.tenants}
                                    parking={props.parking}
                                    furnished={props.furnished}
                                    rental={rental}
                                    setRentalDetails={allValues => { setRentalDetails(allValues) }}
                                    isLocalityToggle={locality => { setlocalityToggle(locality) }}
                                    isResaleToggle={allValues => { setResaleToggle(allValues) }}
                                    isAmenityToggle={allValues => { setAmenityToggle(allValues) }}
                                /> : ""}
                                {amenityToggle ? <Amenities
                                   
                                    editId={props.editId}
                                    propertyValues={propertyValues}
                                    amenity={props.editId || localStorage.getItem("editId")?amenity:amenities}
                                    setAmenityDetail={allValues => { setAmenity(allValues) }}
                                    setAmenityDetails={allValues => { setAmenities(allValues) }}
                                    isResaleToggle={allValues => { setResaleToggle(allValues) }}
                                    isAmenityToggle={allValues => { setAmenityToggle(allValues) }}
                                    isGalleryToggle={allValues => { setGalleryToggle(allValues) }} /> : ""}
                                {galleryToggle ? <Gallery
                                    editId={props.editId}
                                    setUserDetails={props.setLogin}
                                    property={propertyValues}
                                    locality={locality}
                                    rental={rental}
                                    amenities={amenities}
                                    images={images}
                                    setImages={allImages => { setImages(allImages) }}
                                    isAmenityToggle={allValues => { setAmenityToggle(allValues) }}
                                    isGalleryToggle={allValues => { setGalleryToggle(allValues) }}
                                    setPopupMessage={popUpMessage => { setPopupMessage(popUpMessage) }}
                                    isPopUpTriggered={popUp => { setIsPopUpTriggered(popUp) }}
                                    showPopUpBtn={isPopUpTriggered => { setPopUpButtons(isPopUpTriggered) }} /> : ""}
                                    

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isPopUpTriggered ? <Popupbox setPopupMessage={popUpMessage} removePopUp={isPopUpTriggered => { setIsPopUpTriggered(isPopUpTriggered) }} showPopUpBtn={popUpButtons} /> : ""}
        </>

    )
}
export default Postproperty;