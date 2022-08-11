import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './loginRegister/login';
import Register from './loginRegister/register';
import Home from './components/homePage/Home';
import Postproperty from './components/postProperty/postPropert';
import axios from 'axios';
import Viewdetail from './components/viewDetail/viewDeatil';
import Apartmentdetail from './components/viewDetail/apartmentDetail';
import Mylisting from './components/myListing/myListing';
import PageNotFound from './components/popupbox/pageNotFound';
import { Redirect } from 'react-router-dom';
import PerviewImage from './components/popupbox/imagePreview';
import Wishlist from './components/wishlist/wishList';
import textMessages from './testKeys/textMessages';
function App() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    _id:""
  });
  const [apartmentType, setApartmentType] = useState([]);
  const [bhkType, setBhkType] = useState();
  const [propertyAge, setPropertyAge] = useState();
  const [facing, setFacing] = useState();
  const [floor, setFloor] = useState();
  const [city, setCity] = useState();
  const [maintenance, setMaintenance] = useState();
  const [tenants, setTenants] = useState();
  const [furnished, setFurnishing] = useState();
  const [parking, setParking] = useState();
  const [amenities,setAmenities]= useState([]);
  const [searchLocation, setsearchLocation] = useState();
  const [detailId, setDetailId] = useState();
  const [editId, setEditId] = useState();
  const [imageView, setImageView] =useState(false)
  const [images, setImages] =useState([]);

 
  useEffect(() => {
    // if(userDetails.name){
     
      axios({
        method: "get",
        url: process.env.REACT_APP_APARTMENT_SOURCE_URI
      })
        .then((res) => {
          console.log(apartmentType);
          setApartmentType(res.data);
        })
  
  
      axios({
        method: "get",
        url: process.env.REACT_APP_BHK_URI
      })
        .then((res) => {
          setBhkType(res.data);
        })
  
  
      axios({
        method: "get",
        url: process.env.REACT_APP_PROPERTYAGE_URI
      })
        .then((res) => {
          setPropertyAge(res.data);
        })
  
  
  
      axios({
        method: "get",
        url: process.env.REACT_APP_DIRECTION_URI
      })
        .then((res) => {
          setFacing(res.data);
        })
  
  
      axios({
        method: "get",
        url:process.env.REACT_APP_FLOOR_URI
      })
        .then((res) => {
          setFloor(res.data);
        })
  
  
      axios({
        method: "get",
        url: process.env.REACT_APP_CITY_URI
      })
        .then((res) => {
          setCity(res.data);
        })
  
      axios({
        method: "get",
        url: process.env.REACT_APP_MAINTENANCE_URI
      })
        .then((res) => {
          setMaintenance(res.data);
        })
  
      axios({
        method: "get",
        url: process.env.REACT_APP_TENANTS_URI
      })
        .then((res) => {
          setTenants(res.data);
        })
  
      axios({
        method: "get",
        url: process.env.REACT_APP_FURNISHED_URI
      })
        .then((res) => {
          setFurnishing(res.data);
        })
  
      axios({
        method: "get",
        url: process.env.REACT_APP_PARKING_URI
      })
        .then((res) => {
          setParking(res.data);
        })
  
  
  
      axios({
        method: "get",
        url: process.env.REACT_APP_AMENITIES_URI
      })
        .then((res) => {
          setAmenities(res.data);
        })
  
    }, [])
    console.log(images)
    console.log(searchLocation);
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={process.env.REACT_APP_MAIN_URI}> <Home setLocation={searchLocation => { setsearchLocation(searchLocation) }} setLogin={userDetails} isUserDetails={userDetails => { setUserDetails(userDetails) }} /></Route>
            <Route exact path={process.env.REACT_APP_LOGIN_URL}><Login isUserDetails={userDetails => { setUserDetails(userDetails) }} /></Route>
            <Route exact path={process.env.REACT_APP_REGISTER_URL}><Register /></Route>
            <Route path={`${process.env.REACT_APP_APARTMENTS_URL}`}> <Viewdetail
              setLogin={userDetails}
              setLocation={searchLocation}
              isUserDetails={userDetails => { setUserDetails(userDetails) }}
              isImageBox={imageView => { setImageView(imageView) }}
              setId={detailId => { setDetailId(detailId) }}
            /></Route>
            <Route exact path={`${process.env.REACT_APP_APARTMENT_URL}/:key`}>{!imageView?  <Apartmentdetail
              setLogin={userDetails}
              setId={detailId}
              isUserDetails={userDetails => { setUserDetails(userDetails) }}
              isImageBox={imageView => { setImageView(imageView) }}
              setImageArray={images => { setImages(images) }}

            />:<PerviewImage 
              getImageBox={images}
              isImageBox={imageView => { setImageView(imageView) }}
            />}
            </Route>
            {localStorage.getItem(textMessages.token.authToken) ?<Route path={process.env.REACT_APP_POST_URI}> <Postproperty
            setLogin={userDetails}
            isUserDetails={userDetails => { setUserDetails(userDetails) }}
            apartmentType={apartmentType}
            bhkType={bhkType}
            floor={floor}
            facing={facing}
            propertyAge={propertyAge}
            city={city}
            maintenance={maintenance}
            tenants={tenants}
            parking={parking}
            furnished={furnished}
            amenities={amenities}
          /></Route> :
          <Redirect to={process.env.REACT_APP_MAIN_URI}/>}
            {localStorage.getItem(textMessages.token.authToken) ?<Route exact path={localStorage.getItem(textMessages.token.authToken)?process.env.REACT_APP_MYLISTING_URL:process.env.REACT_APP_MAIN_URI}> <Mylisting userDetail={userDetails} setLogin={userDetails}
            isUserDetails={userDetails => { setUserDetails(userDetails) }}
            editDetail={edit => { setEditId(edit) }} /></Route>:
            <Redirect to={process.env.REACT_APP_MAIN_URI}/>}
          
          {localStorage.getItem(textMessages.token.authToken) ?<Route path={localStorage.getItem(textMessages.token.authToken)?process.env.REACT_APP_EDIT_URL:process.env.REACT_APP_MAIN_URI}><Postproperty
          editId={editId}
            setLogin={userDetails}
            isUserDetails={userDetails => { setUserDetails(userDetails) }}
            apartmentType={apartmentType}
            bhkType={bhkType}
            floor={floor}
            facing={facing}
            propertyAge={propertyAge}
            city={city}
            maintenance={maintenance}
            tenants={tenants}
            parking={parking}
            furnished={furnished}
            amenities={amenities} /></Route> :
            <Redirect to={process.env.REACT_APP_MAIN_URI}/>} 
             <Route exact path={process.env.REACT_APP_WISH_URL}><Wishlist/></Route>
              <Route exact path={process.env.REACT_APP_GLOBAL_URL}> <PageNotFound></PageNotFound>  </Route>
         
          </Switch>
        </BrowserRouter>
  
      </div>
    );
  }
  
  export default App;