import mongoose from "mongoose";

const property = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    apartmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"apartmentTye",
        required:true
    },
    bhkType: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"bhk",
        required:true
    },
    propertyAge: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"propertyAge",
        required:true
    },
    builtUpArea: {
        type: String,
        required:true
    },
    floor: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"level"
    },
    totalFloor: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    facing: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"direction"
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"city"
    },
    bedroom:{
        type:String
    },
    contactNo:{
        type:String
    },
    locality: {
        type: String,
        required:true
    },
    landmark: {
        type: String,
        required:true
    },
    availability: {
        type: String,
        required:true
    },
    rent: {
        type:String,
        required:true
    },
    deposit: {
        type: String,
        required:true
    },
    maintenance: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"maintenance"
    },
    furnishing: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"furnished"
    },
   
    preferredTenants: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"prefferedTenants"
    },
    parking: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"parking"
    },
    description: {
        type: String,
        required:true
    },
    images: {
        type: Array,
        required:true
    },
    amenities:[{
        amenities:String,
        checked:Boolean
    }],
    active:{
        type:Boolean,
        required:true
    }
})








const pentHouse = new mongoose.Schema({
    apartment:{
        type:String,
        required:true
    }
   
})
const bhkTypes = new mongoose.Schema({
    bhk:{
        type:String,
        required:true
     }
    
})
const propertyAge = new mongoose.Schema({
    age:{
        type:String,
        required:true
    },
   
    
})
const direction = new mongoose.Schema({
    direction:{
        type:String,
        required:true
    }
    
})
const city= new mongoose.Schema({
    city:{
        type:String,
        required:true
    }
    
})
const level = new mongoose.Schema({
    floor:{
        type:Number,
        required:true
    }
    
})
const repairing = new mongoose.Schema({
    maintenance:{
        type:String,
        required:true
    },
    
})
const tenants = new mongoose.Schema({
    tenantsType:{
        type:String,
        required:true
    }
})
const equipped = new mongoose.Schema({
    equipped:{
        type:String,
        required:true
    }
})
const Parking = new mongoose.Schema({
    vehicle:{
        type:String,
        required:true
    }
})
const amenity = new mongoose.Schema({
    amenities:{
        type:String,
        required:true
    }
})
const searchSchema = new mongoose.Schema({
    place: {
      type: String,
      required:true,
      unique:true
    }
  });
  const wishList = new mongoose.Schema({
      owner:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"user"
      },
      property:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"property"
      }
  })
  const Search = new mongoose.model('search',searchSchema);
const Property = new mongoose.model('property',property);
const apartmentType = new mongoose.model('apartmentTye',pentHouse);
const Bhk =new mongoose.model('bhk',bhkTypes);
const assetsAge = new mongoose.model('propertyAge', propertyAge);
const facing = new mongoose.model('direction', direction);
const floor = new mongoose.model('level', level);
const cities = new mongoose.model('city', city);
const maintenance = new mongoose.model('maintenance', repairing);
const prefferedTenants = new mongoose.model('prefferedTenants', tenants);
const furnished = new mongoose.model('furnished', equipped);
const parking = new mongoose.model('parking', Parking);
const amenities = new mongoose.model('amenity', amenity);
const myWishList =new mongoose.model('wishlist',wishList);


export default ({Property,apartmentType,Bhk ,assetsAge ,facing,floor,cities,maintenance,prefferedTenants,
    furnished,parking,amenities,Search,myWishList});