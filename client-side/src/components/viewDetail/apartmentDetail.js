import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ElevateAppBar from "../navBar/Navbar1";
import './apartmentDetail.css';
import ChairIcon from '@mui/icons-material/Chair';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import WifiIcon from '@mui/icons-material/Wifi';
import ParkIcon from '@mui/icons-material/Park';
import PoolIcon from '@mui/icons-material/Pool';
import ElevatorIcon from '@mui/icons-material/Elevator';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Popupbox from "../popupbox/popupbox.js";
import constKeys from "../../constantKeys/constantKeys";
import textMessages from "../../testKeys/textMessages";
import PerviewImage from "../popupbox/imagePreview";
import { Link } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
function Apartmentdetail(props) {
    const [apartmentDetail, setApartmentDetail] = useState();
    const [index, setIndex] = useState(0)
    const [isPopUpTriggered, setIsPopUpTriggered] = useState(false);
    const [isPopUpTriggered1, setIsPopUpTriggered1] = useState(false);
    const [popUpMessage, setPopupMessage] = useState("");
    const [propertyToggle, setPropertyToggle]= useState(false);
    const history = useHistory();
    const currPath = useLocation();
    const param = useParams();
    let imgs = []
    let propertyId="";
    console.log(localStorage.getItem("userId"));
    const handleImagePreview = (e) => {
        props.isImageBox(true);
        props.setImageArray(imgs);
    }
    useEffect(() => {
        if (localStorage.getItem("loginToken")) {
            axios({
                method: "post",
                url: "http://localhost:8000/welcome",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                },
            })
                .then((result) => {
                    if(props.setId)
                    {
                    axios({
                        method: "get",
                        url: `http://localhost:8000/wishList?propertyid=${props.setId}&userid=${localStorage.getItem("userId")}`,
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                        },
                    }).then((result) => {
                        if (result.data.message == "yes") 
                        {
                            setPropertyToggle(true)
                            
                                axios({
                                    method: "get",
                                    url: `${process.env.REACT_APP_APARTMENT_URI}${props.setId}`
                                })
                                    .then((res) => {
                                        propertyId=props.setId
                                        setApartmentDetail(res)
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                            
                            // else {
                            //     axios({
                            //         method: "get",
                            //         url: `${process.env.REACT_APP_APARTMENT_URI}${param.key}`
                            //     })
                            //         .then((res) => {
                            //             propertyId=param.key
                            //             setApartmentDetail(res)
                            //         }).catch((err) => {
                            //             console.log(err)
                            //         })

                            // }
                        }
                        else{
                            setPropertyToggle(false)
                            
                                axios({
                                    method: "get",
                                    url: `${process.env.REACT_APP_APARTMENT_URI}${props.setId}`
                                })
                                    .then((res) => {
                                        propertyId=props.setId
                                        setApartmentDetail(res)
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                        }
                    })

                }
                else{
                    console.log(param.key)
                    propertyId = param.key
                    axios({
                        method: "get",
                        url: `http://localhost:8000/wishList?propertyid=${param.key}&userid=${localStorage.getItem("userId")}`,
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                        },
                    }).then((result) => {
                        if (result.data.message == "yes") 
                        {
                            setPropertyToggle(true)
                            
                                axios({
                                    method: "get",
                                    url: `${process.env.REACT_APP_APARTMENT_URI}${param.key}`
                                })
                                    .then((res) => {
                                        console.log("then1")
                                        propertyId=param.key
                                        setApartmentDetail(res)
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                        }
                        else{
                            setPropertyToggle(false)
                            
                                axios({
                                    method: "get",
                                    url: `${process.env.REACT_APP_APARTMENT_URI}${param.key}`
                                })
                                    .then((res) => {
                                        if(res.data.message=="invalid id")
                                        {
                                        history.push("/*")
                                        }
                                        else{
                                            console.log("then1")

                                        propertyId=param.key
                                        setApartmentDetail(res)
                                        }
                                    }).catch((err) =>{
                                        console.log(err)
                                        // <Link to="*"></Link>
                                    })
                        }
                    }).catch((err) =>{
                        <Link to="*"></Link>
                    })

                }
                }).catch((err) => {
                    console.log(err.response)
                    if (err.response.data.message == "User token expired") {
                        localStorage.removeItem("loginToken");
                        localStorage.removeItem("email")
                        localStorage.removeItem("userName")
                        localStorage.removeItem("userId")
                        history.push('/');
                    }
                });
        }
        else {
            if (props.setId) {
                propertyId=props.setId
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_APARTMENT_URI}${props.setId}`
                })
                    .then((res) => {
                        setApartmentDetail(res)
                    }).catch((err) => {
                        console.log(err)
                    })
            }
            else {
                propertyId=param.key
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_APARTMENT_URI}${param.key}`
                })
                    .then((res) => {
                        setApartmentDetail(res)
                    }).catch((err) => {
                        console.log(err)
                    })

            }

        }

    }, [])
    const handleWishList = (e, id) => {
        if (localStorage.getItem("loginToken")) {
            axios({
                method: "get",
                url: `http://localhost:8000/wishList?propertyid=${id}&userid=${localStorage.getItem("userId")}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                },
            })
                .then((result) => {
                    console.log("result hai")
                    console.log(result.data.message)
                    if (result.data.message == "no") {
                        console.log("result nhi")
                        setPropertyToggle(true  )

                        if (localStorage.getItem("loginToken")) {

                            axios({
                                method: "post",
                                url: "http://localhost:8000/wishList",
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                                },
                                data: {
                                    owner: localStorage.getItem("userId"),
                                    property: id
                                }
                            })
                                .then((result) => {
                                    console.log(result)
                                }).catch((err) => {
                                    if (err.response.data.message == "User token expired") {
                                        localStorage.removeItem("loginToken");
                                        localStorage.removeItem("email")
                                        localStorage.removeItem("userName")
                                        localStorage.removeItem("userId")
                                        history.push('/');
                                    }
                                })
                        }

                        else {
                            setPopupMessage(`${textMessages.text.PopUpMessage1}`)
                            setIsPopUpTriggered1(true);
                        }
                    }
                    if (result.data.message == "yes") {
                        console.log("result delete")
                            setPropertyToggle(false)
                        if (localStorage.getItem("loginToken")) {
                            axios({
                                method: "delete",
                                url: `http://localhost:8000/wishList?userid=${localStorage.getItem("userId")}&propertyid=${id}`,
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                                },

                            })
                                .then((result) => {
                                    console.log(result)
                                }).catch((err) => {
                                    if (err.response.data.message == "User token expired") {
                                        localStorage.removeItem("loginToken");
                                        localStorage.removeItem("email")
                                        localStorage.removeItem("userName")
                                        localStorage.removeItem("userId")
                                        history.push('/');
                                    }
                                })
                        }
                        else {
                            setPopupMessage(`${textMessages.text.PopUpMessage1}`)
                            setIsPopUpTriggered1(true);
                        }
                    }
                })
        }
        else {
            setPopupMessage(`${textMessages.text.PopUpMessage1}`)
            setIsPopUpTriggered(true);
        }

    }
    const handleBack = () => {
        if (props.setId) {
            history.push("/apartments")
        }
        else {
            history.push("/")
        }
    }
    const prev = () => {
        if (index === 0) {
            setIndex(imgs.length - 1)
        }
        else {
            setIndex(index - 1)
        }
    }
    const next = () => {
        if (index === imgs.length - 1) {
            setIndex(0)
        }
        else {
            setIndex(index + 1)
        }

    }
    const theme = {
        color:
        {
            color: "#53a0ec"
        },
        width: {
            width: "0.7em"
        },
        fontsize: {
            fontSize: "1.8rem"
        },
        fill: {
            fill: "red"
        },
        color1: {
            color: "red"
        }
    }
    const handleOwnerDetail = (e) => {
        if(localStorage.getItem(textMessages.token.authToken))
        {
        if (props.setLogin.name == "") {
            setPopupMessage(`${textMessages.text.PopUpMessage2}`)
            setIsPopUpTriggered1(true)
            console.log("name hai")
        }
        else {
            setPopupMessage(`${textMessages.text.PopUpMessage2}`)
            setIsPopUpTriggered1(true)
            console.log("name nahi hai")

        }
    }
    else{
        setPopupMessage(`${textMessages.text.PopUpMessage1}`)
            setIsPopUpTriggered(true)

    }
    }

    return (
        <React.Fragment>

            <div className="apartment-parent">
                <ElevateAppBar setDetails={props.setLogin} setLogout={props.isUserDetails} />
                {apartmentDetail ?
                    <div className="apartment-container">
                        <div className="apartment-maindiv1">
                            <img onClick={handleBack} src="../images/left.png" id="back" className="backToHome" />
                            <div className="apartment-subdiv1">
                                <span className="num">{`${apartmentDetail.data.bhkType.bhk} ${textMessages.text.buy} ${apartmentDetail.data.locality} ${textMessages.text.near} ${apartmentDetail.data.landmark}`}</span>

                            </div>
                            <div className="apartment-subdiv2">
                                <span className="num" > <CurrencyRupeeIcon className="rupee" style={theme} />{`${apartmentDetail.data.rent}/M`}</span>
                                <p className="text">{constKeys.rent}</p>
                            </div>
                            <div className="apartment-subdiv3">
                                <span className="num">{`${apartmentDetail.data.builtUpArea}`}</span>
                                <p className="text">{constKeys.squareFeet}</p>
                            </div>
                            <div className="apartment-subdiv4">
                                <span className="num"> <CurrencyRupeeIcon className="rupee" style={theme} />{`${apartmentDetail.data.deposit}`}</span>
                                <p className="text">{constKeys.deposit}</p>
                            </div>
                        </div>
                        <div className="apartment-maindiv2">
                            <div className="apartment-subdiv5">
                                <div className="apartment-imagediv">
                                    {apartmentDetail.data.images.map((image, index) => {
                                        imgs.push(`${process.env.REACT_APP_IMAGE_URI}${image.path}`)
                                    })
                                    }
                                    <img onClick={handleImagePreview} src={`${imgs[index]}`}></img>
                                    <button className="prev" onClick={prev}><img className="arrowImg" src="../images/left.png" ></img></button>
                                    <button button className="next" onClick={next}><img className="arrowImg" src="../images/right.png"></img></button>
                                    <div className="pagination">{`${index + 1}/${imgs.length}`}</div>
                                </div>



                            </div>
                            <div className="apartment-subdiv6">
                                <div className="apartment-datadiv1">
                                    <div className="apartment-dataSubdiv space2">
                                        <div className="apartment-icondiv">
                                            <ChairIcon />
                                        </div>
                                        <div className="apartment-textdiv">
                                            <div className="num">{`${apartmentDetail.data.furnishing.equipped}`}</div>
                                            <p className="text">{constKeys.furnish}</p>
                                        </div>
                                    </div>
                                    <div className="apartment-dataSubdiv space2">
                                        <div className="apartment-icondiv">
                                            <ApartmentIcon />
                                        </div>
                                        <div className="apartment-textdiv">
                                            <div className="num">{`${apartmentDetail.data.bhkType.bhk}`}</div>
                                            <p className="text">{constKeys.apartmentType}</p>

                                        </div>
                                    </div>
                                    <div className="apartment-dataSubdiv space2">
                                        <div className="apartment-icondiv">
                                            <GroupIcon />
                                        </div>
                                        <div className="apartment-textdiv">
                                            <div className="num">{`${apartmentDetail.data.preferredTenants.tenantsType}`}</div>
                                            <p className="text">{constKeys.tenant}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="apartment-datadiv1">
                                    <div className="apartment-dataSubdiv space2">
                                        <div className="apartment-icondiv">
                                            <PersonIcon />
                                        </div>
                                        <div className="apartment-textdiv">
                                            <div className="num">{`${apartmentDetail.data.availability}`}</div>
                                            <p className="text">{constKeys.availability}</p>
                                        </div>
                                    </div>
                                    <div className="apartment-dataSubdiv space2">
                                        <div className="apartment-icondiv">
                                            <DirectionsCarIcon />
                                        </div>
                                        <div className="apartment-textdiv">
                                            <div className="num">{`${apartmentDetail.data.parking.vehicle}`}</div>
                                            <p className="text">{constKeys.parking}</p>
                                        </div>
                                    </div>
                                    <div className="apartment-dataSubdiv space2">
                                        <div className="apartment-icondiv">
                                            <HouseSidingIcon />
                                        </div>
                                        <div className="apartment-textdiv">
                                            <div className="num">{`${apartmentDetail.data.propertyAge.age}`}</div>
                                            <p className="text">{constKeys.buildingAge}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ownerDetailContainer">
                                    <button onClick={handleOwnerDetail} className="ownerDetail-btn" type="button">{textMessages.text.ownerDetail}</button>
                                    <div id="favIcon">
                                        <Checkbox onChange={(e) => (handleWishList(e,apartmentDetail.data._id))} checked={propertyToggle} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="apartment-maindiv3">
                            <div className="apartment-subdiv7">
                                <h3>{constKeys.overView}</h3>
                                <div className="apartment-amenitiesDiv1">
                                    <div className="apartment-datadiv2">
                                        <div className="apartment-dataSubdiv space2">
                                            <div className="apartment-icondiv">
                                                <WifiIcon />
                                            </div>
                                            <div className="textData">
                                                <p className="text space">{constKeys.internet}</p>
                                            </div>
                                            <div className="apartment-textdiv">
                                                {apartmentDetail.data.amenities[0].checked ? <div className="num space1">{constKeys.yes}</div> : <div className="num space1">{constKeys.NA}</div>}
                                            </div>
                                        </div>
                                        <div className="apartment-dataSubdiv space2">
                                            <div className="apartment-icondiv">
                                                <ElevatorIcon />
                                            </div>
                                            <div className="textData">
                                                <p className="text space">{constKeys.elevator}</p>
                                            </div>
                                            <div className="apartment-textdiv">
                                                {apartmentDetail.data.amenities[5].checked ? <div className="num space1">{constKeys.yes}</div> : <div className="num space1">{constKeys.NA}</div>}
                                            </div>
                                        </div>
                                        <div className="apartment-dataSubdiv space2">
                                            <div className="apartment-icondiv">
                                                < ParkIcon />
                                            </div>
                                            <div className="textData">
                                                <p className="text space">{constKeys.parking}</p>
                                            </div>
                                            <div className="apartment-textdiv">
                                                {apartmentDetail.data.amenities[3].checked ? <div className="num space1">{constKeys.yes}</div> : <div className="num space1">{constKeys.NA}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="apartment-datadiv2">
                                        <div className="apartment-dataSubdiv space2 ">
                                            <div className="apartment-icondiv">
                                                <PoolIcon />
                                            </div>
                                            <div className="textData">
                                                <p className="text space">{constKeys.pool}</p>
                                            </div>
                                            <div className="apartment-textdiv">
                                                {apartmentDetail.data.amenities[4].checked ? <div className="num space1">{constKeys.yes}</div> : <div className="num space1">{constKeys.NA}</div>}
                                            </div>
                                        </div>
                                        <div className="apartment-dataSubdiv space2">
                                            <div className="apartment-icondiv">
                                                <BatteryStdIcon />
                                            </div>
                                            <div className="textData">
                                                <p className="text space">{constKeys.powerBackup}</p>
                                            </div>
                                            <div className="apartment-textdiv">
                                                {apartmentDetail.data.amenities[6].checked ? <div className="num space1">{constKeys.yes}</div> : <div className="num space1">{constKeys.NA}</div>}
                                            </div>
                                        </div>
                                        <div className="apartment-dataSubdiv space2">
                                            <div className="apartment-icondiv">
                                                <AcUnitIcon />
                                            </div>
                                            <div className="textData">
                                                <p className="text space">{constKeys.AC}</p>
                                            </div>
                                            <div className="apartment-textdiv">
                                                {apartmentDetail.data.amenities[1].checked ? <div className="num space1">{constKeys.yes}</div> : <div className="num space1">{constKeys.NA}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="apartment-maindiv4">
                            <div className="apartment-subdiv8">
                                <h3>{constKeys.description}</h3>
                                <div>
                                    <div className="descriptionDiv">{`${apartmentDetail.data.description}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="viewDetail-progess">
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box></div>
                }
            </div>
            {isPopUpTriggered ? <Popupbox setPopupMessage={popUpMessage} removePopUp1={isPopUpTriggered => { setIsPopUpTriggered(isPopUpTriggered) }} /> : ""}
            {isPopUpTriggered1 ? <Popupbox setPopupMessage={popUpMessage} setApartmentId={apartmentDetail.data._id} removePopUp2={isPopUpTriggered1 => { setIsPopUpTriggered1(isPopUpTriggered1) }} /> : ""}
        </React.Fragment>
    )
}
export default Apartmentdetail