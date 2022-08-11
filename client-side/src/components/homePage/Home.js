import React, { useState, useEffect } from "react";
import axios from "axios"
import ElevateAppBar from "../navBar/Navbar1";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";
import "./Home.css"
import textMessages from "../../testKeys/textMessages";
function Home(props) {
    const [style, setStyle] = useState({ color1: "", color2: "null", color3: "" })
    const [selectedValue, setSelectedValue] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [getSearch, setSearchData] = useState([])
    const [getSearchMessage, setSearchMessage] = useState()
    const [time, setTime] = useState({ timeOut: 0 })
    const [getSearchValue, setSearchValue] = useState();
    const [city, setCity] = useState('');
    const [getEmptyValue, setEmptyValue] =useState(false);
    const handleCityChange = (e) => {
        setSelectedCity(e);
    }
    const handleChange = (e) => {
        setSelectedValue(e);
    }
    const [selectedRadio, setSelectedRadio] = useState("Full time");
    function onChangeValue(event) {
        setSelectedRadio(event.target.value);
    }
    const changeColor = (e) => {
        setStyle({
        })
    }
    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearchValue(e.target.value)
        if (e.target.value != "") {
            if (time.timeOut) {
                clearTimeout(time.timeOut);
            }
            setTime({
                timeOut: setTimeout(() => {
                    if(e.target.value)
                    {
                    axios.get(`http://localhost:8000/search?location=${e.target.value}`)
                        .then((result) => {
                            if (!result.data.message) {
                                setSearchMessage("")
                                setSearchData(result.data)
                            }
                            else {
                                setSearchMessage(result.data.message)
                                setSearchValue(null);
                                setSearchData([])
                            }
                        }).catch((err) => {
                            console.log(err)
                        });
                    }
                }, 1000)
                
            })
        }
        if (e.target.value == "") {
            setTime(time.timeOut)
            setSearchMessage("")
            setSearchData([])
        }
    }
    const handleChange1 = (event) => {
        setCity(event.target.value);
    };
    function getPlaceVlaue(value) {
        setEmptyValue(true)
        setSearchValue(value);
        console.log(value)
        props.setLocation(getSearchValue)
        setSearchData([]);
    }
    useEffect(()=>{
        if(localStorage.getItem("loginToken")){
           
            axios({
                method: "post",
                url: "http://localhost:8000/welcome",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                },
            })
            .then((result) => {
                console.log(result)
                
            }).catch((err) => {
                console.log(err.response)
                if(err.response.data.message=="User token expired"){
                    localStorage.removeItem("loginToken");
                    localStorage.removeItem("email")
                    localStorage.removeItem("userName")
                    localStorage.removeItem("userId")
                }
            });
        }
    },[])
    props.setLocation(getSearchValue)

    return (
        <>
            <div className="parent-home">
                <ElevateAppBar setDetails={props.setLogin} setLogout={props.isUserDetails} />
                <div className="home-maindiv1">
                    <p>{textMessages.text.heading1}</p>
                </div>
                {/* <div className="home-maindiv2">
                    {textMessages.text.heading2}
                </div> */}
                <div className="home-maindiv3">
                    <div id="home-subdiv1" onChange={changeColor} value={style.color1} className={style.color1 != "" ? "changecolor" : null}>
                        <span className="a"> {textMessages.text.heading3}</span>
                    </div>
                    <div id="home-subdiv2" onChange={changeColor} value={style.color2} className={style.color2 != "" ? "changecolor" : null}>
                        {textMessages.text.heading4}
                    </div>
                    <div id="home-subdiv3" onChange={changeColor} value={style.color3} className={style.color3 != "" ? "changecolor" : null}>
                        {textMessages.text.heading5}
                    </div>
                </div>
                <div className="home-maindiv4">
                    <div className="home-subdiv">
                    </div>
                    <div className="home-subdiv4">
                        <div> <input type="text" placeholder={textMessages.text.searchPlace} value={getSearchValue} onChange={handleSearch} className="search-location"></input>
                            <div className="popUpDiv">
                                {!getSearchMessage ?
                                    (getSearch.map((data, index) => {
                                        return (
                                            <>
                                                <p className="search-div" key={index}
                                                    onClick={() => { getPlaceVlaue(data.place) }}
                                                >
                                                    <span className="locationIcon"><LocationOnIcon /></span>
                                                    <span className="searchPlace">{data.place} </span>
                                                </p>
                                            </>
                                        )
                                    })
                                    ) :
                                    <p> {textMessages.text.heading6}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="home-subdiv5">
                        { (getEmptyValue && getSearchValue!=null) ? <Link to={`${process.env.REACT_APP_APARTMENTS_URL}`}><button type="button" id="search-btn" >Search</button> </Link> : <button type="button" id="search-btn" >Search</button>}
                        
                    </div>
                </div>
                <div className="home-maindiv5">
                    <div className="ap-type">
                        <div className="a">
                        </div>
                        <div className="dropdown1">
                        </div>
                    </div>
                    <div className="av-type">
                        <div>
                        </div>
                        <div className="dropdown2">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home