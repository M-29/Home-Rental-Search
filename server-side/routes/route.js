import express from "express";
import multer from "multer";
import { amenities,searchLocation, allProperty,postLocation,filterDetail1,liked,likedDelete,viewDetail,apartmentDetail,filterDetail, apartment, apartmentTye, bhk, bhkType, cities, city, direction, facing, floor, floors, furnish, furnished, maintenance, maintenanceOption, parking, parkings, preferredTenants, property, propertyAge, propertyAges, services, tenants, myListing, apartments, editProperty, activeStatus, myWishlist, welcome, flat, wished, invalidUrl, place } from "../controller/property-controller.js";
import {getAllUser ,register, login} from '../controller/user-controller.js';
import authMiddleware from "../middleware/auth.js";


const route =express.Router();
const storage =multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const upload = multer({storage:storage}).array('images', 10);;


route.post('/register',register);
route.get('/allUser',getAllUser);
route.post('/login',login);
route.post('/property',authMiddleware,upload,property)
route.post('/apartmentType',apartmentTye);
route.post('/bhk',bhkType);
route.post('/propertyAge',propertyAge);
route.post('/direction',facing);
route.post('/city',city);
route.post('/floor',floor);
route.post('/maintenance',maintenance);
route.post('/tenants',tenants);
route.post('/furnished',furnished);
route.post('/parking',parking);
route.post('/amenities',amenities);
route.get('/amenities',services);
route.get('/apartmentType',apartment);
route.get('/bhk',bhk);
route.get('/propertyAge',propertyAges);
route.get('/direction',direction);
route.get('/city',cities);
route.get('/floor',floors);
route.get('/maintenance',maintenanceOption);
route.get('/tenants',preferredTenants);
route.get('/furnished',furnish);
route.get('/parking',parkings)
route.get('/allProperty',allProperty)
route.post("/location", postLocation);
route.get("/filterDetail",filterDetail1)
route.get("/search",searchLocation)
route.get("/apartments",viewDetail)
route.get("/filter",filterDetail)
route.get("/apartment/:id",apartmentDetail)
route.get("/myListing",authMiddleware,myListing);
route.get("/apartmentData/:id",authMiddleware,apartments);
route.patch('/property/:id',authMiddleware,upload,editProperty);
route.patch('/active/:id',authMiddleware,activeStatus);
route.post('/welcome',authMiddleware,welcome)
route.get('/flat/:id',flat);
route.post('/wishList',authMiddleware,myWishlist);
route.get('/wishList',liked);
route.delete('/wishList',likedDelete);
route.get('/wished',authMiddleware,wished);
route.post('/place',place);
route.all("*",invalidUrl);


export default route;