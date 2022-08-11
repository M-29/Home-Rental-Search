import React, { useState, useEffect } from "react";
import ElevateAppBar from "../navBar/Navbar1";
import { useHistory, useLocation } from "react-router-dom";
import './viewDetail.css';
import ChairIcon from '@mui/icons-material/Chair';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";
import Popupbox from "../popupbox/popupbox.js";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import constKeys from "../../constantKeys/constantKeys";
import textMessages from "../../testKeys/textMessages";
import Slider from '@mui/material/Slider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
function Viewdetail(props) {
    let arrBhk = [];
    let arrLease = [];
    let arrFurnish = []
    let arr1 = []
    let arr2 = []
    let arr3 = []
    let arr = [];
    const limit = 5;
    const history = useHistory();
    const location = useLocation();
    const [getApartment, setApartment] = useState([])
    const [page, setPage] = React.useState(1);
    const [count, setCount] = useState();
    const [isPopUpTriggered1, setIsPopUpTriggered1] = useState(false);
    const [isPopUpTriggered2, setIsPopUpTriggered2] = useState(false);
    const [popUpMessage, setPopupMessage] = useState("");
    const [filter, setFilter] = useState({});
    const { a = false, b = false, c = false, d = false, e = false, f = false, g = false, h = false, j = false, k = false, l = false } = filter;
    const [type, setType] = useState({ a: "", b: "", c: "", d: "", e: "", f: "", g: "", h: "", k: "", l: "", j: "", value1: "", value2: "" })
    const [getId, setId] = useState();
    const [getApartment1, setApartment1] = useState([]);
    const [value, setValue] = useState([1, 100]);
    const [color, setcolor] = useState()
    const [color2, setcolor2] = useState()
    const [getaptid, setaptid] = useState([]);
    const [getWishListId, setWishListId] = useState([]);
    const [getTotal, setTotal] = useState();
    let array = []
    let array1 = []
    let array2 = []
    let array3 = [];
    // let place = props.setLocation.split(',')
    useEffect(() => {
        props.isImageBox(false)
        if (localStorage.getItem(textMessages.token.authToken)) {
            axios({
                method: "post",
                url: process.env.REACT_APP_WELCOME_URL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                },
            }).then((result) => {
                if (!props.setLocation) {
                    if (type.a == "" && type.b == "" && type.c == "" && type.d == "" && type.e == "" && type.f == "" && type.g == "" && type.h == "" && type.j == "" && type.k == "" && type.l == "" && type.value1 == "" && type.value2 == "") {
                        axios({
                            method: "get",
                            url: `${process.env.REACT_APP_WISHLIST_URL}?userid=${localStorage.getItem(constKeys.userId)}`,
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                            },
                        }).then((result) => {
                            if (result.data.message != constKeys.no) {
                                setWishListId(result.data)
                                array = (result.data)
                                axios({
                                    method: "get",
                                    url: `${process.env.REACT_APP_APARTEMENTS_URI}?page=${page}&limit=${limit}`
                                }).then((res) => {
                                    setTotal(res.data.totalApartments)
                                    array2 = (res.data.result.map((data) => ({
                                        ...data, isSelected: false
                                    })))
                                    setCount(res.data.total)
                                    for (let i = 0; i < array.length; i++) {
                                        for (let j = 0; j < res.data.result.length; j++) {
                                            if (res.data.result[j]._id == array[i]) {
                                                const value = [...array2]
                                                const selectedValue = { ...array2[j] }
                                                selectedValue.isSelected = true
                                                value[j] = selectedValue;
                                                array2 = (value)
                                            }
                                            else {
                                                setApartment(array2)
                                            }
                                        }
                                    }
                                    setApartment(array2)
                                })
                            }
                            else {
                                axios({
                                    method: "get",
                                    url: `${process.env.REACT_APP_APARTEMENTS_URI}?page=${page}&limit=${limit}`
                                }).then((res) => {
                                    setTotal(res.data.totalApartments)
                                    setCount(res.data.total)
                                    setApartment(res.data.result.map((data) => ({
                                        ...data, isSelected: false
                                    })))
                                })
                            }
                        })
                    }
                }
                else {
                    if (type.a == "" && type.b == "" && type.c == "" && type.d == "" && type.e == "" && type.f == "" && type.g == "" && type.h == "" && type.j == "" && type.k == "" && type.l == "" && type.value1 == "" && type.value2 == "") 
                    {
                        const place = props.setLocation.split(',')

                        axios({
                            method: "get",
                            url: `${process.env.REACT_APP_WISHLIST_URL}?userid=${localStorage.getItem(constKeys.userId)}`,
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                            },
                        }).then((result) => {
                            if (result.data.message != constKeys.no) {
                                setWishListId(result.data)
                                array = (result.data)
                                axios({
                                    method: "get",
                                    url: `${process.env.REACT_APP_APARTEMENTS_URI}?city=${place[0]}&locality=${place[1]}&page=${page}&limit=${limit}`
                                }).then((res) => {
                                    setTotal(res.data.totalApartments)
                                    array2 = (res.data.result.map((data) => ({
                                        ...data, isSelected: false
                                    })))
                                    setCount(res.data.total)
                                    for (let i = 0; i < array.length; i++) {
                                        for (let j = 0; j < res.data.result.length; j++) {
                                            if (res.data.result[j]._id == array[i]) {
                                                const value = [...array2]
                                                const selectedValue = { ...array2[j] }
                                                selectedValue.isSelected = true
                                                value[j] = selectedValue;
                                                array2 = (value)
                                            }
                                            else {
                                                setApartment(array2)
                                            }
                                        }
                                    }
                                    setApartment(array2)
                                })
                            }
                            else {
                                axios({
                                    method: "get",
                                    url: `${process.env.REACT_APP_APARTEMENTS_URI}?city=${place[0]}&locality=${place[1]}&page=${page}&limit=${limit}`
                                }).then((res) => {
                                    setTotal(res.data.totalApartments)
                                    setCount(res.data.total)
                                    setApartment(res.data.result.map((data) => ({
                                        ...data, isSelected: false
                                    })))
                                })
                            }
                        })
                    }
                }
            }).catch((err) => {
                if (err.response.data.message == textMessages.token.tokenExpired) {
                    localStorage.removeItem(textMessages.token.authToken);
                    localStorage.removeItem(constKeys.email)
                    localStorage.removeItem(constKeys.userName)
                    localStorage.removeItem(constKeys.userId)
                    history.push(process.env.REACT_APP_MAIN_URI);
                }
            });
        }
        else {
            if (!props.setLocation) {
                if (type.a == "" && type.b == "" && type.c == "" && type.d == "" && type.e == "" && type.f == "" && type.g == "" && type.h == "" && type.j == "" && type.k == "" && type.l == "" && type.value1 == "" && type.value2 == "") {
                    axios({
                        method: "get",
                        url: `${process.env.REACT_APP_APARTEMENTS_URI}?page=${page}&limit=${limit}`,
                    }).then((res) => {
                        setTotal(res.data.totalApartments)
                        setApartment(res.data.result)
                        setCount(res.data.total)
                    })
                }
                else {
                    arrBhk.push(type.a)
                    arrBhk.push(type.b)
                    arrBhk.push(type.c)
                    arrBhk.push(type.d)
                    arrLease.push(type.e)
                    arrLease.push(type.f)
                    arrLease.push(type.g)
                    arrLease.push(type.h)
                    arrFurnish.push(type.j)
                    arrFurnish.push(type.k)
                    arrFurnish.push(type.l)
                    arrBhk.filter((x) => {
                        if (x.length > 1) { arr1.push(x) }
                    })
                    arrLease.filter((x) => {
                        if (x.length > 1) { arr2.push(x) }
                    })
                    arrFurnish.filter((x) => {
                        if (x.length > 1) { arr3.push(x) }
                    })
                    axios({
                        method: "get",
                        url: `${process.env.REACT_APP_FILTERDETAIL_URI}type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
                    }).then((res) => {
                        setTotal(res.data.totalApartments)
                        setApartment(res.data.result1)
                        setCount(res.data.total)
                    })
                }
            }
            else {

                if (type.a == "" && type.b == "" && type.c == "" && type.d == "" && type.e == "" && type.f == "" && type.g == "" && type.h == "" && type.j == "" && type.k == "" && type.l == "" && type.value1 == "" && type.value2 == "") {
                    const place = props.setLocation.split(',')
                    axios({

                        method: "get",
                        url: `${process.env.REACT_APP_APARTEMENTS_URI}?city=${place[0]}&locality=${place[1]}&page=${page}&limit=${limit}`
                    }).then((res) => {
                        setTotal(res.data.totalApartments)
                        setApartment(res.data.result)
                        setCount(res.data.total)
                    })
                }
                else {
                    const place = props.setLocation.split(',')
                    arrBhk.push(type.a)
                    arrBhk.push(type.b)
                    arrBhk.push(type.c)
                    arrBhk.push(type.d)
                    arrLease.push(type.e)
                    arrLease.push(type.f)
                    arrLease.push(type.g)
                    arrLease.push(type.h)
                    arrFurnish.push(type.j)
                    arrFurnish.push(type.k)
                    arrFurnish.push(type.l)
                    arrBhk.filter((x) => {
                        if (x.length > 1) { arr1.push(x) }
                    })
                    arrLease.filter((x) => {
                        if (x.length > 1) { arr2.push(x) }
                    })
                    arrFurnish.filter((x) => {
                        if (x.length > 1) { arr3.push(x) }
                    })
                    axios({
                        method: "get",
                        url: `${process.env.REACT_APP_FILTER_URI}city=${place[0]}&locality=${place[1]}&type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
                    }).then((res) => {
                        setTotal(res.data.totalApartments)
                        setApartment(res.data.result)
                        setCount(res.data.total)
                    })
                }
            }
        }

    }, [page])
    function handleFilter() {
        setPage(1)
        props.isImageBox(false)
        if (localStorage.getItem("loginToken")) {
            if (!props.setLocation) {
                arrBhk.push(type.a)
                arrBhk.push(type.b)
                arrBhk.push(type.c)
                arrBhk.push(type.d)
                arrLease.push(type.e)
                arrLease.push(type.f)
                arrLease.push(type.g)
                arrLease.push(type.h)
                arrFurnish.push(type.j)
                arrFurnish.push(type.k)
                arrFurnish.push(type.l)
                arrBhk.filter((x) => {
                    if (x.length > 1) { arr1.push(x) }
                })
                arrLease.filter((x) => {
                    if (x.length > 1) { arr2.push(x) }
                })
                arrFurnish.filter((x) => {
                    if (x.length > 1) { arr3.push(x) }
                })
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_WISHLIST_URL}?userid=${localStorage.getItem(constKeys.userId)}`,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                    },
                }).then((result) => {
                    if (result.data.message != constKeys.no) {
                        setWishListId(result.data)
                        array = (result.data)
                        axios({
                            method: "get",
                            url: `${process.env.REACT_APP_FILTERDETAIL_URI}type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
                        }).then((res) => {
                            setTotal(res.data.totalApartments)
                            array2 = (res.data.result.map((data) => ({
                                ...data, isSelected: false
                            })))
                            setCount(res.data.total)
                            for (let i = 0; i < array.length; i++) {
                                for (let j = 0; j < res.data.result.length; j++) {
                                    if (res.data.result[j]._id == array[i]) {
                                        const value = [...array2]
                                        const selectedValue = { ...array2[j] }
                                        selectedValue.isSelected = true
                                        value[j] = selectedValue;
                                        array2 = (value)
                                    }
                                    else {
                                        setApartment(array2)
                                    }
                                }
                            }
                            setApartment(array2)
                        })
                    }
                    else {
                        axios({
                            method: "get",
                            url: `${process.env.REACT_APP_FILTERDETAIL_URI}type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
                        }).then((res) => {
                            setTotal(res.data.totalApartments)
                            setCount(res.data.total)
                            setApartment(res.data.result.map((data) => ({
                                ...data, isSelected: false
                            })))
                        })
                    }
                })
            }
            else {
                const place = props.setLocation.split(',')
                arrBhk.push(type.a)
                arrBhk.push(type.b)
                arrBhk.push(type.c)
                arrBhk.push(type.d)
                arrLease.push(type.e)
                arrLease.push(type.f)
                arrLease.push(type.g)
                arrLease.push(type.h)
                arrFurnish.push(type.j)
                arrFurnish.push(type.k)
                arrFurnish.push(type.l)
                arrBhk.filter((x) => {
                    if (x.length > 1) { arr1.push(x) }
                })
                arrLease.filter((x) => {
                    if (x.length > 1) { arr2.push(x) }
                })
                arrFurnish.filter((x) => {
                    if (x.length > 1) { arr3.push(x) }
                })
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_WISHLIST_URL}?userid=${localStorage.getItem(constKeys.userId)}`,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                    },
                }).then((result) => {
                    if (result.data.message != constKeys.no) {
                        setWishListId(result.data)
                        array = (result.data)
                        axios({
                            method: "get",
                            url: `${process.env.REACT_APP_FILTER_URI}city=${place[0]}&locality=${place[1]}&type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
                        }).then((res) => {
                            setTotal(res.data.totalApartments)
                            array2 = (res.data.result.map((data) => ({
                                ...data, isSelected: false
                            })))
                            setCount(res.data.total)
                            for (let i = 0; i < array.length; i++) {
                                for (let j = 0; j < res.data.result.length; j++) {
                                    if (res.data.result[j]._id == array[i]) {
                                        const value = [...array2]
                                        const selectedValue = { ...array2[j] }
                                        selectedValue.isSelected = true
                                        value[j] = selectedValue;
                                        array2 = (value)
                                    }
                                    else {
                                        setApartment(array2)
                                    }
                                }
                            }
                            setApartment(array2)
                        })
                    }
                    else {
                        axios({
                            method: "get",
                            url: `${process.env.REACT_APP_FILTER_URI}city=${place[0]}&locality=${place[1]}&type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
                        }).then((res) => {
                            setTotal(res.data.totalApartments)
                            setCount(res.data.total)
                            setApartment(res.data.result.map((data) => ({
                                ...data, isSelected: false
                            })))
                        })
                    }
                })
            }
        }
        else {
            if (!props.setLocation) {
                arrBhk.push(type.a)
                arrBhk.push(type.b)
                arrBhk.push(type.c)
                arrBhk.push(type.d)
                arrLease.push(type.e)
                arrLease.push(type.f)
                arrLease.push(type.g)
                arrLease.push(type.h)
                arrFurnish.push(type.j)
                arrFurnish.push(type.k)
                arrFurnish.push(type.l)
                arrBhk.filter((x) => {
                    if (x.length > 1) { arr1.push(x) }
                })
                arrLease.filter((x) => {
                    if (x.length > 1) { arr2.push(x) }
                })
                arrFurnish.filter((x) => {
                    if (x.length > 1) { arr3.push(x) }
                })
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_FILTERDETAIL_URI}type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
                }).then((res) => {
                    setTotal(res.data.totalApartments)
                    array2 = (res.data.result.map((data) => ({
                        ...data, isSelected: false
                    })))
                    setCount(res.data.total)
                    for (let i = 0; i < array.length; i++) {
                        for (let j = 0; j < res.data.result.length; j++) {
                            if (res.data.result[j]._id == array[i]) {
                                const value = [...array2]
                                const selectedValue = { ...array2[j] }
                                selectedValue.isSelected = true
                                value[j] = selectedValue;
                                array2 = (value)
                            }
                            else {
                                setApartment(array2)
                            }
                        }
                    }
                    setApartment(array2)
                })
            }
            // else {
            //     axios({
            //         method: "get",
            //         url: `${process.env.REACT_APP_FILTERDETAIL_URI}type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
            //     }).then((res) => {
            //         setTotal(res.data.totalApartments)
            //         setCount(res.data.total)
            //         setApartment(res.data.result.map((data) => ({
            //             ...data, isSelected: false
            //         })))
            //     })
            // }

            // }
            else {
                const place = props.setLocation.split(',')
                arrBhk.push(type.a)
                arrBhk.push(type.b)
                arrBhk.push(type.c)
                arrBhk.push(type.d)
                arrLease.push(type.e)
                arrLease.push(type.f)
                arrLease.push(type.g)
                arrLease.push(type.h)
                arrFurnish.push(type.j)
                arrFurnish.push(type.k)
                arrFurnish.push(type.l)
                arrBhk.filter((x) => {
                    if (x.length > 1) { arr1.push(x) }
                })
                arrLease.filter((x) => {
                    if (x.length > 1) { arr2.push(x) }
                })
                arrFurnish.filter((x) => {
                    if (x.length > 1) { arr3.push(x) }
                })
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_FILTER_URI}city=${place[0]}&locality=${place[1]}&type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
                }).then((res) => {
                    setTotal(res.data.totalApartments)
                    array2 = (res.data.result.map((data) => ({
                        ...data, isSelected: false
                    })))
                    setCount(res.data.total)
                    for (let i = 0; i < array.length; i++) {
                        for (let j = 0; j < res.data.result.length; j++) {
                            if (res.data.result[j]._id == array[i]) {
                                const value = [...array2]
                                const selectedValue = { ...array2[j] }
                                selectedValue.isSelected = true
                                value[j] = selectedValue;
                                array2 = (value)
                            }
                            else {
                                setApartment(array2)
                            }
                        }
                    }
                    setApartment(array2)
                })
            }
            //     else {
            //     axios({
            //         method: "get",
            //         url: `${process.env.REACT_APP_FILTER_URI}type=${arr1}&leaseType=${arr2}&furnishType=${arr3}&rentType=${type.value1}${type.value2}&page=${page}&limit=${limit}`
            //     }).then((res) => {
            //         setTotal(res.data.totalApartments)
            //         setCount(res.data.total)
            //         setApartment(res.data.result.map((data) => ({
            //             ...data, isSelected: false
            //         })))
            //     })
            // }

        // }

    }
}
const handleWishList = (e, index, id) => {
    if (localStorage.getItem(textMessages.token.authToken)) {

        axios({
            method: "get",
            url: `${process.env.REACT_APP_WISHLIST_URL}?propertyid=${id}&userid=${localStorage.getItem(constKeys.userId)}`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
            },
        }).then((result) => {
            if (result.data.message == constKeys.no) {
                if (localStorage.getItem(textMessages.token.authToken)) {
                    axios({
                        method: "post",
                        url: process.env.REACT_APP_WISHLIST_URL,
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                        },
                        data: {
                            owner: localStorage.getItem(constKeys.userId),
                            property: id
                        }
                    })
                        .then((result) => {
                        }).catch((err) => {
                            if (err.response.data.message == textMessages.token.tokenExpired) {
                                localStorage.removeItem(textMessages.token.authToken);
                                localStorage.removeItem(constKeys.email)
                                localStorage.removeItem(constKeys.userName)
                                localStorage.removeItem(constKeys.userId)
                                history.push(process.env.REACT_APP_MAIN_URI);
                            }
                        })
                }

                else {
                    setPopupMessage(`${textMessages.text.PopUpMessage1}`)
                    setIsPopUpTriggered1(true);
                }
            }
            if (result.data.message == constKeys.yes) {
                if (localStorage.getItem(textMessages.token.authToken)) {
                    axios({
                        method: "delete",
                        url: `${process.env.REACT_APP_WISHLIST_URL}?userid=${localStorage.getItem(constKeys.userId)}&propertyid=${id}`,
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem(textMessages.token.authToken)}`
                        },

                    }).then((result) => {
                        console.log(result)
                    }).catch((err) => {
                        if (err.response.data.message == textMessages.token.tokenExpired) {
                            localStorage.removeItem(textMessages.token.authToken);
                            localStorage.removeItem(constKeys.email)
                            localStorage.removeItem(constKeys.userName)
                            localStorage.removeItem(constKeys.userId)
                            history.push(process.env.REACT_APP_MAIN_URI);
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
        setIsPopUpTriggered1(true);
    }
    setcolor(e.target.checked)
    const checked = e.target.checked;
    const value = [...getApartment]
    const selectedValue = { ...getApartment[index] }
    selectedValue.isSelected = checked
    value[index] = selectedValue;
    setApartment(value)
}
const handleChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked })
    if (event.target.checked) {
        setType({ ...type, [event.target.name]: event.target.value });
    }
    else {
        setType({ ...type, [event.target.name]: "" })
    }
}
const handleOwnerDetail = (getid) => {
    setId(getid)
    if(localStorage.getItem("loginToken"))
    {
    if (props.setLogin.name == "") {
        setPopupMessage(`${textMessages.text.PopUpMessage1}`)
        setIsPopUpTriggered2(true)

    }
    else {
        setPopupMessage(`${textMessages.text.PopUpMessage2}`)
        setIsPopUpTriggered2(true)
    }
}
else{
        setPopupMessage(`${textMessages.text.PopUpMessage1}`)
        setIsPopUpTriggered1(true)

}
}
const handleDetail = (id) => {
    props.setId(id);
}
function valuetext(value) {
    return `${value}k`;
}
const handleRangeChange = (event, newValue) => {
    let rangeEnd = newValue[1] * 1000
    let rangeStart = newValue[0] * 1000 + ","
    setValue(newValue);
    setType({ ...type, value1: rangeStart, value2: rangeEnd })
};
const handleBack = () => {
    history.push(process.env.REACT_APP_MAIN_URI)
}
return (
    <>
        <div className="parent-home">
            <ElevateAppBar id="my" className="hello" setDetails={props.setLogin} setLogout={props.isUserDetails} />
            <div className="viewDetail-container">
                {getApartment ?
                    <div className="viewDetail-maindiv1">
                        <div className="detail-subdiv1">
                            <img onClick={handleBack} src="../images/left.png" id="backbtn" className="backToHome" />
                            <div className="filter-div1">{constKeys.filter}</div>
                            <div className="filter-container">
                                <div className="filter-div2"> {constKeys.apartmentType} </div>
                                <div className="filter-div3">
                                    <Box sx={{ display: 'block' }}>
                                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                            <FormGroup style={{ "flex-direction": "row" }}>
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={a} onChange={handleChange} value="1BHK" name="a" />
                                                    }
                                                    label={constKeys.bhk1}
                                                />
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={b} onChange={handleChange} value="2BHK" name="b" />
                                                    }
                                                    label={constKeys.bhk2}
                                                />
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={c} onChange={handleChange} value="3BHK" name="c" />
                                                    }
                                                    label={constKeys.bhk3}
                                                />
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={d} onChange={handleChange} value="4BHK" name="d" />
                                                    }
                                                    label={constKeys.bhk4}
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="filter-div8">
                                    {value ? <div> {`${constKeys.rentRange}:${value[0]}k to ${value[1]}k`}</div> : <div>{`${constKeys.tenant}:0k to 100k}`}</div>}
                                </div>
                                <div className="filter-div9">
                                    <Box sx={{ width: 250 }}>
                                        <Slider
                                            getAriaLabel={() => 'Temperature range  '}
                                            value={value}
                                            onChange={handleRangeChange}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valuetext}
                                        />
                                    </Box>
                                </div>
                                <div className="filter-div4">
                                    {constKeys.tenant}
                                </div>
                                <div className="filter-div5">
                                    <Box sx={{ display: 'block' }}>
                                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                            <FormGroup style={{ "flex-direction": "row" }}>
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={e} onChange={handleChange} value="Family" name="e" />
                                                    }
                                                    label={constKeys.family}
                                                />
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={f} onChange={handleChange} value="Bachelor" name="f" />
                                                    }
                                                    label={constKeys.girls}
                                                />
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={g} onChange={handleChange} value="Single" name="g" />
                                                    }
                                                    label={constKeys.single}
                                                />
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={h} onChange={handleChange} value="Boys" name="h" />
                                                    }
                                                    label={constKeys.boys}
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="filter-div6">
                                    {constKeys.furnish}
                                </div>
                                <div className="filter-div7">
                                    <Box sx={{ display: 'block' }}>
                                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                            <FormGroup style={{ "flex-direction": "row" }}>
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={j} onChange={handleChange} value="Furnished" name="j" />
                                                    }
                                                    label={constKeys.full}
                                                />
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={k} onChange={handleChange} value="Semi-furnished" name="k" />
                                                    }
                                                    label={constKeys.semi}
                                                />
                                                <FormControlLabel className="formControl"
                                                    control={
                                                        <Checkbox className="checkboxColor" checked={l} onChange={handleChange} value="Not-furnished" name="l" />
                                                    }
                                                    label={constKeys.none}
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                    <div className="FilterBtn"> <button onClick={handleFilter} className="applyFilter">Apply Filter</button> </div>
                                </div>
                                <div className="filter-div8">
                                </div>
                                <div className="filter-div9">
                                </div>
                            </div>
                        </div>
                        <div className="detail-subdiv3">
                        </div>
                    </div> : ""
                }
                <div className="viewDetail-maindiv3">
                    {getApartment ? <div className="detail-subdiv4" id="total-count">{getTotal}{textMessages.text.matching}{props.setLocation}</div> : ""
                    }
                    {getApartment ?
                        getApartment.map((data, index) => {
                            return (
                                <>
                                    <Link to={`${process.env.REACT_APP_APARTMENT_URL}/${data._id}`}>  <div className="viewDetail-maindiv2" key={data._id} onClick={() => (handleDetail(data._id))}>
                                        <div className="detail-subdiv4">
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
                                                <span className="num"> <CurrencyRupeeIcon className="rupee" />{data.deposit}</span>
                                                <p className="text">{constKeys.deposit}</p>
                                            </div>
                                            <div className="deatail-subContainer3">
                                                <span className="num"> <CurrencyRupeeIcon className="rupee" />{data.rent}</span>
                                                <p className="text">{constKeys.rent}</p>
                                            </div>
                                        </div>
                                        <div className="detail-subdiv6">
                                            <div className="deatail-subContainer4">
                                                <img src={`http://localhost:8000/${data.images[0].path}`}></img>
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
                                            <div className="favBorder">
                                                <Checkbox onChange={(e) => (handleWishList(e, index, data._id))} checked={localStorage.getItem(textMessages.token.authToken) ? getApartment[index].isSelected : false} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="viewDetail-maindiv4">
                                    </div>
                                </>
                            )
                        })
                        : <div className="viewDetail-progess">
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box></div>
                    }
                </div>
            </div>
            <div className="pagination-div">
                <Stack spacing={2}>
                    <Pagination count={count} page={page} onChange={(event, value) => setPage(value)} />
                </Stack>
            </div>
        </div>
        {isPopUpTriggered1 ? <Popupbox setPopupMessage={popUpMessage} removePopUp1={isPopUpTriggered1 => { setIsPopUpTriggered1(isPopUpTriggered1) }} /> : ""}
        {isPopUpTriggered2 ? <Popupbox setPopupMessage={popUpMessage} setApartmentId={getId} removePopUp2={isPopUpTriggered2 => { setIsPopUpTriggered2(isPopUpTriggered2) }} /> : ""}
    </>
)
}
export default Viewdetail