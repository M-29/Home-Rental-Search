import React, { useState, useEffect } from "react";
import ElevateAppBar from "../navBar/Navbar1";
import '../viewDetail/viewDetail.css';
import ChairIcon from '@mui/icons-material/Chair';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import propertyKeys from "../../constantKeys/propertyConstKeys";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { useHistory } from "react-router-dom";
import constKeys from "../../constantKeys/constantKeys";
import textMessages from "../../testKeys/textMessages";
import { margin } from "@mui/system";
function Mylisting(props) {
    const token = localStorage.getItem(textMessages.token.authToken);
    const handleEdit = (e) => {
        props.editDetail(e.target.id);
        localStorage.setItem("editId", e.target.id);
    }
    const history = useHistory();
    const [myList, setMyList] = useState([])
    const [page, setPage] = React.useState(1);
    const [count, setCount] = useState();
    const [checked, setChecked] = useState(false);
    const [loader, setLoader] = useState(true)
    const userId = localStorage.getItem(constKeys.userId);
    const limit = 5;
    useEffect(() => {
        setLoader(true);
        if (props.userDetail._id) {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_MYLISTING_URI}?id=${props.userDetail._id}&page=${page}&limit=${limit}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => {
                    setLoader(false)
                    setMyList(res.data.posts);
                    setCount(res.data.total);
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
        else {
            setLoader(true);
            if (localStorage.getItem(constKeys.userId)) {
                
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_MYLISTING_URI}?id=${userId}&page=${page}&limit=${limit}`,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        setLoader(false);
                        setMyList(res.data.posts);
                        setCount(res.data.total);

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
        }

    }, [page, checked])

    const handleActiveChange = (e) => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_FLAT_URI}${e.target.id}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.data.active === false) {
                    axios({
                        method: "patch",
                        url: `${process.env.REACT_APP_ACTIVE_URI}${e.target.id}`,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            active: true
                        }
                    })
                        .then((res) => {
                            if (checked == true) {
                                setChecked(false)
                            } else {
                                setChecked(true)
                            }
                        }).catch((err) => {

                            if (err.response.data.message == textMessages.token.tokenExpired) {
                                localStorage.removeItem(textMessages.token.authToken);
                                localStorage.removeItem(constKeys.email)
                                localStorage.removeItem(constKeys.userName)
                                localStorage.removeItem(constKeys.userId)
                                history.push(process.env.REACT_APP_MAIN_URI)
                            }
                        });
                } else {
                    axios({
                        method: "patch",
                        url: `${process.env.REACT_APP_ACTIVE_URI}${e.target.id}`,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            active: false
                        }
                    })
                        .then((res) => {
                            if (checked == true) {
                                setChecked(false)
                            } else {
                                setChecked(true)
                            }
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
    const handleBack = () => {
        history.push(process.env.REACT_APP_MAIN_URI)
    }

    return (
        <div className="parent-home">
            <ElevateAppBar />
            <div className="viewDetail-maindiv11">

                <img onClick={handleBack} src="../images/left.png" id="backbtn1" className="backToHome" />

            </div>

            <div className="viewDetail-maindiv7">

                {myList != "" ?
                    myList.map((data) => {

                        return (

                            <>
                                <div className="viewDetail-maindiv2">
                                    <div className="detail-subdiv4">
                                        <div key={data._id} className="address">
                                            {`${data.bhkType.bhk} for rent in ${data.locality} near ${data.landmark}`}
                                        </div>
                                        <div className="switch">
                                            <Switch
                                                id={data._id}
                                                onChange={handleActiveChange}
                                                checked={data.active}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            /> </div>

                                    </div>
                                    <div className="detail-subdiv5">
                                        <div className="deatail-subContainer1">
                                            <span className="num">{data.builtUpArea}</span>
                                            <p className="text">{propertyKeys.propertyDetails.builtUpArea}</p>
                                        </div>
                                        <div className="deatail-subContainer2">
                                            <span className="num"> <CurrencyRupeeIcon className="rupee" style={{ width: ".7em" }} />{data.deposit}</span>
                                            <p className="text">{propertyKeys.myListing.deposit}</p>
                                        </div>
                                        <div className="deatail-subContainer3">
                                            <span className="num"> <CurrencyRupeeIcon className="rupee" style={{ width: ".7em" }} />{data.rent}</span>
                                            <p className="text">{propertyKeys.myListing.rent}</p>
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
                                                                <p className="text">{propertyKeys.myListing.furnishing}</p>
                                                            </div>

                                                        </div>
                                                        <div className="datadiv2">
                                                            <div className="view-img">
                                                                <ApartmentIcon />
                                                            </div>
                                                            <div className="view-text">
                                                                <div className="num">{data.bhkType.bhk}</div>
                                                                <p className="text">{propertyKeys.myListing.apartmentType}</p>
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
                                                                <p className="text">{propertyKeys.myListing.preferedTenants}</p>
                                                            </div>

                                                        </div>
                                                        <div className="datadiv2">
                                                            <div className="view-img">
                                                                <PersonIcon />
                                                            </div>
                                                            <div className="view-text">
                                                                <div className="num">{data.availability}</div>
                                                                <p className="text">{propertyKeys.myListing.availiability}</p>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="view-container2">
                                                <Link to={process.env.REACT_APP_EDIT_URL}> <button className="ownerDetail-btn1" type="button" id={data._id} onClick={handleEdit}>{propertyKeys.myListing.editBtnLabel} </button></Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className="viewDetail-maindiv4">

                                </div>
                            </>
                        )
                    })
                    : <div className="viewDetail-empty">
                        {loader ? <Box sx={{ display: 'flex' ,marginLeft:"150px"}}>
                            <CircularProgress />
                        </Box> : <h1>{propertyKeys.myListing.noDataFound}</h1>}
                    </div>
                }

            </div>
            {myList != "" ? <div className="pagination-div1">
                <Stack spacing={2}>
                    <Pagination count={count} page={page} onChange={(event, value) => setPage(value)} />
                </Stack>
            </div> : ""}
        </div>
    )

}
export default Mylisting;