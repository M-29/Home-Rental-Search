import React, { useEffect, useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from "axios";
import './gallery.css';
import { useHistory } from "react-router-dom";
import propertyKeys from "../../constantKeys/propertyConstKeys";
import textMessages from "../../testKeys/textMessages";
import constKeys from "../../constantKeys/constantKeys";

function Gallery(props) {
    const currPath = process.env.REACT_APP_POST_URI;
    const history = useHistory();
    const [images, setImages] = useState(props.images);
    const token = localStorage.getItem(textMessages.token.authToken);
    console.log(token);
    const handleBackClick = () => {
        history.push(`${props.editId || localStorage.getItem(textMessages.token.editId) ? process.env.REACT_APP_EDIT_URL : currPath}${process.env.REACT_APP_AMENITY_URI}`);
        props.isGalleryToggle(false);
        props.isAmenityToggle(true);
    }


    const handleChange = (e) => {

        const fileArray = Array.from(e.target.files).map((file) => file);
        setImages(fileArray)
    }
    useEffect(() => {
        props.setImages(images)
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
                    if (err.response.data.message == textMessages.token.tokenExpired) {
                        localStorage.removeItem(textMessages.token.authToken);
                        localStorage.removeItem(constKeys.email)
                        localStorage.removeItem(constKeys.userName)
                        localStorage.removeItem(constKeys.userId)
                        history.push(process.env.REACT_APP_MAIN_URI)
                    }
                });
        }
    }, [images]);
    const handleDelete = (e) => {
        if (e.target.id > -1) {
            var removed = images.splice(e.target.id, 1)
        }
        let photo = images.filter((image) => {
            return image !== removed
        })
        setImages(photo);
    }
    const handleClick = () => {
        history.push(`${props.editId ? process.env.REACT_APP_EDIT_URL : currPath}${process.env.REACT_APP_GALLERY_URI}`);
        if (!props.editId) {

            const formData = new FormData();
            formData.append("owner", localStorage.getItem(constKeys.userId));
            formData.append("active", false);
            formData.append("apartmentType", props.property.apartmentType);
            formData.append("bhkType", props.property.bhkType);
            formData.append("bedroom", props.property.bedroom);
            formData.append("contactNo", props.property.contactNo);
            formData.append("propertyAge", props.property.propertyAge);
            formData.append("builtUpArea", props.property.builtUpArea);
            formData.append("floor", props.property.floor);
            formData.append("totalFloor", props.property.totalFloor);
            formData.append("facing", props.property.facing);
            formData.append("city", props.locality.city);
            formData.append("landmark", props.locality.landmark);
            formData.append("locality", props.locality.locality);
            formData.append("availability", props.rental.availability);
            formData.append("rent", props.rental.rent);
            formData.append("deposit", props.rental.deposit);
            formData.append("maintenance", props.rental.maintenance);
            formData.append("furnishing", props.rental.furnishing);
            formData.append("preferredTenants", props.rental.preferedTenants);
            formData.append("parking", props.rental.parking);
            formData.append("description", props.rental.description);
            formData.append("amenities", JSON.stringify(props.amenities));
            Array.from(images).forEach(image => {
                formData.append("images", image);
            })
            axios({
                method: "post",
                url: process.env.REACT_APP_POSTPROPERTY_URI,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                data: formData,
            })
                .then((res) => {
                    props.isPopUpTriggered(true)
                    props.setPopupMessage(res.data.message)
                    props.showPopUpBtn(true);
                    axios({
                        method: "post",
                        url: `${process.env.REACT_APP_PLACE_URI}`,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            cityId: props.locality.city,
                        }
                    }).then((res) =>{
                    axios({
                        method: "post",
                        url:`${process.env.REACT_APP_LOCATION_URL}`,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            city: res.data,
                            locality: props.locality.locality
                        }
                    })
                })
                    
                }).catch(err => {
                    console.log(err);
                    if (err.response.data.message == textMessages.token.tokenExpired) {
                        localStorage.removeItem(textMessages.token.authToken);
                        localStorage.removeItem(constKeys.email)
                        localStorage.removeItem(constKeys.userName)
                        localStorage.removeItem(constKeys.userId)
                        history.push(process.env.REACT_APP_MAIN_URI)
                    }
                })
        } else {

            const formData = new FormData();
            formData.append("owner", localStorage.getItem(constKeys.userId));
            formData.append("active", false);
            formData.append("apartmentType", props.property.apartmentType);
            formData.append("bhkType", props.property.bhkType);
            formData.append("bedroom", props.property.bedroom);
            formData.append("contactNo", props.property.contactNo);
            formData.append("propertyAge", props.property.propertyAge);
            formData.append("builtUpArea", props.property.builtUpArea);
            formData.append("floor", props.property.floor);
            formData.append("totalFloor", props.property.totalFloor);
            formData.append("facing", props.property.facing);
            formData.append("city", props.locality.city);
            formData.append("landmark", props.locality.landmark);
            formData.append("locality", props.locality.locality);
            formData.append("availability", props.rental.availability);
            formData.append("rent", props.rental.rent);
            formData.append("deposit", props.rental.deposit);
            formData.append("maintenance", props.rental.maintenance);
            formData.append("furnishing", props.rental.furnishing);
            formData.append("preferredTenants", props.rental.preferedTenants);
            formData.append("parking", props.rental.parking);
            formData.append("description", props.rental.description);
            formData.append("amenities", JSON.stringify(props.amenities));
            Array.from(images).forEach(image => {
                formData.append("images", image);
            })
            axios({
                method: "patch",
                url: `${process.env.REACT_APP_EDIT_URI}/${props.editId}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                data: formData,
            })
                .then((res) => {
                    props.isPopUpTriggered(true)
                    props.setPopupMessage(res.data.message)
                    props.showPopUpBtn(true);
                }).catch(err => {
                    if (err.response.data.message == textMessages.token.jwtMalformed) {
                        localStorage.removeItem(textMessages.token.authToken);
                        localStorage.removeItem(constKeys.email)
                        localStorage.removeItem(constKeys.userName)
                        localStorage.removeItem(constKeys.userId)
                        history.push(process.env.REACT_APP_MAIN_URI)
                    }
                })
        }
    }
    return (
        <>
            <div className="heading">
                {propertyKeys.gallery.heading}
            </div>
            <div className="uploadDiv">
                <div className="cameraDiv">
                    <CameraAltIcon />
                </div>
                <div className="demoText">
                    <h3>{propertyKeys.gallery.info}</h3>
                </div>
                <div className="demoText1">
                    <h5>{propertyKeys.gallery.subInfo}</h5>
                </div>
                <div className="addLabel">
                    <input type="file" id="input" accept="image" multiple onChange={handleChange} name="images" />
                    <label htmlFor="input">{propertyKeys.gallery.addLabel}</label>
                </div>
                <div className="selectedImages">

                    {images &&
                        images.map((image, index) => {
                            const source = `../images/${image.filename ? image.filename : image.name}`
                            return (
                                <div className="imageDiv" key={index}>
                                    <img src={source} />
                                    <div className="deleteDiv" >
                                        <button className="deleteBtn" id={index} onClick={handleDelete}>X</button>
                                    </div>
                                </div>
                            )
                           
                        })}

                </div>

            </div>
            <div className="button">
                <button className="back" onClick={handleBackClick}>{propertyKeys.back}</button>
                <button className="save" onClick={handleClick}>{propertyKeys.save}</button>
            </div>

        </>

    )
}
export default Gallery;