import React, { useState, useEffect } from "react";
import ElevateAppBar from "../navBar/Navbar1";
import { useHistory } from "react-router-dom";
import '../viewDetail/viewDetail.css';
import ChairIcon from '@mui/icons-material/Chair';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";
import Popupbox from "../popupbox/popupbox.js";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import constKeys from "../../constantKeys/constantKeys";
import textMessages from "../../testKeys/textMessages";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import propertyKeys from "../../constantKeys/propertyConstKeys";
function Wishlist(props) {

    const limit = 2;
    const history = useHistory();

    const [getApartment, setApartment] = useState([])
    const [page, setPage] = React.useState(1);
    const [count, setCount] = useState();
    const [isPopUpTriggered1, setIsPopUpTriggered1] = useState(false);
    const [isPopUpTriggered2, setIsPopUpTriggered2] = useState(false);
    const [popUpMessage, setPopupMessage] = useState("");
    const [getId, setId] = useState();
    const [loader, setLoader] = useState(true)
    useEffect(() => {
setLoader(true);
        if (localStorage.getItem(textMessages.token.authToken)) {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_WISHED_URI}${localStorage.getItem(constKeys.userId)}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                },
            }).then((res) => {
                setLoader(false)
                setApartment(res.data.map((data) => ({
                    ...data, isSelected: true
                })))

            }).catch((err) => {
                localStorage.removeItem(textMessages.token.authToken);
                localStorage.removeItem(constKeys.email)
                localStorage.removeItem(constKeys.userName)
                localStorage.removeItem(constKeys.userId)
                history.push(process.env.REACT_APP_MAIN_URI)
            })
        }

    }, [])

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
    const handleWishList = (e, index, id) => {
        if (localStorage.getItem(textMessages.token.authToken)) {
            axios({
                method: "delete",
                url: `${process.env.REACT_APP_WISHLISTPARAM_URL}${localStorage.getItem(constKeys.userId)}&propertyid=${id}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                },

            })
                .then((result) => {
                    console.log(result)
                    axios({
                        method: "get",
                        url: `${process.env.REACT_APP_WISHED_URI}${localStorage.getItem(constKeys.userId)}`,
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                        },
                    }).then((res) => {
                        console.log(res.data);
                        setApartment(res.data.map((data) => ({
                            ...data, isSelected: true
                        })))

                    }).catch((err) => {
                        localStorage.removeItem(textMessages.token.authToken);
                        localStorage.removeItem(constKeys.email)
                        localStorage.removeItem(constKeys.userName)
                        localStorage.removeItem(constKeys.userId)
                        history.push(process.env.REACT_APP_MAIN_URI)
                    })
                }).catch((err) => {
                    if (err.response.data.message == textMessages.token.tokenExpired) {
                        localStorage.removeItem(textMessages.token.authToken);
                        localStorage.removeItem(constKeys.email)
                        localStorage.removeItem(constKeys.userName)
                        localStorage.removeItem(constKeys.userId)
                        history.push(process.env.REACT_APP_MAIN_URI)
                    }
                })
        }
    }


    const handleOwnerDetail = (getid) => {
        console.log(getid)
        setId(getid)
        if (!localStorage.getItem(constKeys.userName)) {
            setPopupMessage(`${textMessages.text.PopUpMessage1}`)
            setIsPopUpTriggered1(true)

        }
        else {
            setPopupMessage(`${textMessages.text.PopUpMessage2}`)
            setIsPopUpTriggered2(true)

        }
    }
    const handleDetail = (id) => {
        props.setId(id);
    }
    const handleBack = () => {
        history.push(process.env.REACT_APP_MAIN_URI)
    }
    return (
        <>
            <div className="parent-home">
                <ElevateAppBar setDetails={props.setLogin} setLogout={props.isUserDetails} />

                <div className="viewDetail-container">
                    <div className="viewDetail-maindiv11">

                        <img onClick={handleBack} src="../images/left.png" id="backbtn" className="backToHome" />

                    </div>

                    <div className="viewDetail-maindivs">
                        {getApartment != "" ?
                            getApartment.map((data, index) => {
                                return (
                                    <>
                                        <Link to={`${process.env.REACT_APP_APARTMENT_URL}/${data._id}`}>  <div className="viewDetail-maindiv2" key={data._id} onClick={() => (handleDetail(data._id))}>
                                            <div className="detail-subdiv4" >
                                                <div className="address">
                                                    {`${data.bhkType.bhk} ${textMessages.text.buy} ${data.locality} ${textMessages.text.near} ${data.landmark}`}
                                                </div>
                                            </div>
                                            <div className="detail-subdiv5">
                                                <div className="deatail-subContainer1">
                                                    <span className="num">{data.builtUpArea}</span>
                                                    <p className="text">{constKeys.builtUpArea}</p>
                                                </div>
                                                <div className="deatail-subContainer2">
                                                    <span className="num"> <CurrencyRupeeIcon className="rupee" style={theme.width} />{data.deposit}</span>
                                                    <p className="text">{constKeys.deposit}</p>
                                                </div>
                                                <div className="deatail-subContainer3">
                                                    <span className="num"> <CurrencyRupeeIcon className="rupee" style={theme.width} />{data.rent}</span>
                                                    <p className="text">{constKeys.rent}</p>
                                                </div>
                                            </div>
                                            <div className="detail-subdiv6">
                                                <div className="deatail-subContainer4">
                                                    <img src={`${process.env.REACT_APP_IMAGE_URI}${data.images[0].path}`}></img>
                                                </div>
                                                <div className="deatail-subContainer5">
                                                    <div className="view-container1">
                                                        <div className="viewdiv1">
                                                            <div className="view-datadiv1">
                                                                <div className="datadiv1">
                                                                    <div className="view-img">
                                                                        < ChairIcon />
                                                                    </div>
                                                                    <div className="view-text">
                                                                        <div className="num">{data.furnishing.equipped}</div>
                                                                        <p className="text">{constKeys.furnish}</p>
                                                                    </div>

                                                                </div>
                                                                <div className="datadiv2">
                                                                    <div className="view-img">
                                                                        <ApartmentIcon />
                                                                    </div>
                                                                    <div className="view-text">
                                                                        <div className="num">{data.bhkType.bhk}</div>
                                                                        <p className="text">{constKeys.apartmentType}</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="view-datadiv2">
                                                                <div className="datadiv1">
                                                                    <div className="view-img">
                                                                        <GroupIcon />
                                                                    </div>
                                                                    <div className="view-text">
                                                                        <div className="num">{data.preferredTenants.tenantsType}</div>
                                                                        <p className="text">{constKeys.tenant}</p>
                                                                    </div>

                                                                </div>
                                                                <div className="datadiv2">
                                                                    <div className="view-img">
                                                                        <PersonIcon />
                                                                    </div>
                                                                    <div className="view-text">
                                                                        <div className="num">{data.availability}</div>
                                                                        <p className="text">{constKeys.availability}</p>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                        <div className="view-container2">
                                            <button onClick={() => (handleOwnerDetail(data._id))} className="ownerDetail-btn" type="button">{textMessages.text.ownerDetail} </button>
                                            <div className="favIcon">
                                                <Checkbox onChange={(e) => (handleWishList(e, index, data._id))} checked={getApartment[index].isSelected} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                            </div>
                                        </div>

                                        <div className="viewDetail-maindiv4">
                                        </div>
                                    </>
                                )
                            })
                            : <div className="viewDetail-empty">
                                {loader ? <Box sx={{ display: 'flex', marginLeft: "150px" }}>
                                    <CircularProgress />
                                </Box> :
                                <>
                                    <h1>{propertyKeys.myWishList.heading}</h1>
                                    <div className="viewDetail-innerEmpty">
                                        {propertyKeys.myWishList.subHeading1}<br/>{propertyKeys.myWishList.subHeading2}
                                    </div>
                                    </>
                                }
                            </div>

                        }

                    </div>
                </div>
                {getApartment != "" ?
                    <div className="pagination-div1">
                        <Stack spacing={2}>
                            <Pagination count={count} page={page} onChange={(event, value) => setPage(value)} />
                        </Stack>
                    </div> : ""}
            </div>

            {isPopUpTriggered1 ? <Popupbox setPopupMessage={popUpMessage} removePopUp1={isPopUpTriggered1 => { setIsPopUpTriggered1(isPopUpTriggered1) }} /> : ""}
            {isPopUpTriggered2 ? <Popupbox setPopupMessage={popUpMessage} setApartmentId={getId} removePopUp2={isPopUpTriggered2 => { setIsPopUpTriggered2(isPopUpTriggered2) }} /> : ""}
        </>
    )
}

export default Wishlist;