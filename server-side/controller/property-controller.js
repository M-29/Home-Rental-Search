import schema from "../model/propertySchema.js";
import dotenv from 'dotenv';
import statusCodes from "../constTextKeys/constantKeys.js";
import textKeys from "../textKeys/textKeys.js";
import textMessages from "../textKeys/textMessages.js";
dotenv.config({ path: "config.env" });
let arr = [];
let searchLocality = "";
let cityId = "";

export const property = (req, res) => {
    const { owner,
        apartmentType,
        bhkType,
        propertyAge,
        builtUpArea,
        floor,
        totalFloor,
        facing,
        city,
        locality,
        landmark,
        availability,
        rent,
        deposit,
        maintenance,
        furnishing,
        preferredTenants,
        parking,
        description,
        amenities,
        bedroom,
        contactNo,
        active
    } = req.body;
    const postedProperty = new schema.Property({
        owner,
        apartmentType,
        bhkType,
        propertyAge,
        builtUpArea,
        floor,
        totalFloor,
        facing,
        city,
        locality,
        landmark,
        availability,
        rent: parseInt(rent),
        deposit,
        maintenance,
        furnishing,
        preferredTenants,
        parking,
        description,
        bedroom,
        contactNo,
        amenities: JSON.parse(amenities),
        images: req.files,
        active

    })
    postedProperty.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send({ message: textKeys.schemaTextKeys.postProperty });
        }
    })
}
export const editProperty = async (req, res, next) => {
    if (req.files[0]) {
        var dataValues = {
            owner: req.body.owner,
            apartmentType: req.body.apartmentType,
            bhkType: req.body.bhkType,
            propertyAge: req.body.propertyAge,
            builtUpArea: req.body.builtUpArea,
            floor: req.body.floor,
            totalFloor: req.body.floor,
            facing: req.body.facing,
            city: req.body.city,
            bedroom: req.body.bedroom,
            contactNo: req.body.contactNo,
            locality: req.body.locality,
            landmark: req.body.landmark,
            availability: req.body.availability,
            rent: req.body.rent,
            deposit: req.body.deposit,
            maintenance: req.body.maintenance,
            furnishing: req.body.furnishing,
            preferredTenants: req.body.preferredTenants,
            parking: req.body.parking,
            description: req.body.description,
            images: req.files,
            amenities: JSON.parse(req.body.amenities)

        }
    } else {
        var dataValues = {
            owner: req.body.owner,
            apartmentType: req.body.apartmentType,
            bhkType: req.body.bhkType,
            propertyAge: req.body.propertyAge,
            builtUpArea: req.body.builtUpArea,
            floor: req.body.floor,
            totalFloor: req.body.floor,
            facing: req.body.facing,
            city: req.body.city,
            bedroom: req.body.bedroom,
            contactNo: req.body.contactNo,
            locality: req.body.locality,
            landmark: req.body.landmark,
            availability: req.body.availability,
            rent: req.body.rent,
            deposit: req.body.deposit,
            maintenance: req.body.maintenance,
            furnishing: req.body.furnishing,
            preferredTenants: req.body.preferredTenants,
            parking: req.body.parking,
            description: req.body.description,
            amenities: JSON.parse(req.body.amenities)

        }
    }
    const updatedProperty = await schema.Property.findByIdAndUpdate(req.params.id, dataValues, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    if (updatedProperty) {
        res.send({ message: textMessages.editProperty });
    }
}
export const apartmentTye = (req, res) => {
    const { apartment } = req.body;
    const apartments = new schema.apartmentType({
        apartment
    })
    apartments.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(apartments);
        }
    })
}

export const bhkType = (req, res) => {
    const { bhk } = req.body;
    const bhks = new schema.Bhk({
        bhk
    })
    bhks.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(bhks);
        }
    })
}


export const propertyAge = (req, res) => {
    const { age } = req.body;
    const propertyAge = new schema.assetsAge({
        age
    })
    propertyAge.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(propertyAge);
        }
    })
}

export const facing = (req, res) => {
    const { direction } = req.body;
    const facing = new schema.facing({
        direction
    })
    facing.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(facing);
        }
    })
}

export const city = (req, res) => {
    const { city } = req.body;
    const cities = new schema.cities({
        city
    })
    cities.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(cities);
        }
    })
}

export const floor = (req, res) => {
    const { floor } = req.body;
    const floors = new schema.floor({
        floor
    })
    floors.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(floors);
        }
    })
}
export const maintenance = (req, res) => {
    const { maintenance } = req.body;
    const repairing = new schema.maintenance({
        maintenance
    })
    repairing.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(repairing);
        }
    })
}
export const tenants = (req, res) => {
    const { tenantsType } = req.body;
    const tenants = new schema.prefferedTenants({
        tenantsType
    })
    tenants.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(tenants);
        }
    })
}
export const furnished = (req, res) => {
    const { equipped } = req.body;
    const furnish = new schema.furnished({
        equipped
    })
    furnish.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(furnish);
        }
    })
}


export const parking = (req, res) => {
    const { vehicle } = req.body;
    const parking = new schema.parking({
        vehicle
    })
    parking.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(parking);
        }
    })
}
export const amenities = (req, res) => {
    const { amenities } = req.body
    const options = new schema.amenities({
        amenities
    })
    options.save(err => {
        if (err) {
            res.status(statusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(statusCodes.CREATED).send(options);
        }
    })
}
export const services = (req, res) => {

    schema.amenities.find((err, amenity) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(amenity);
        }
    })
}
export const apartment = (req, res) => {

    schema.apartmentType.find((err, apartment) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(apartment);
        }
    })
}
export const bhk = (req, res) => {

    schema.Bhk.find((err, bhk) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(bhk);
        }
    })
}
export const propertyAges = (req, res) => {

    schema.assetsAge.find((err, age) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(age);
        }
    })
}
export const direction = (req, res) => {

    schema.facing.find((err, direction) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(direction);
        }
    })
}
export const cities = (req, res) => {
    schema.cities.find((err, city) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(city);
        }
    })
}
export const floors = (req, res) => {

    schema.floor.find((err, floor) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(floor);
        }
    })
}
export const maintenanceOption = (req, res) => {

    schema.maintenance.find((err, maintenance) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(maintenance);
        }
    })
}

export const preferredTenants = (req, res) => {

    schema.prefferedTenants.find((err, tenants) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(tenants);
        }
    })
}

export const furnish = (req, res) => {

    schema.furnished.find((err, furnish) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(furnish);
        }
    })
}

export const parkings = (req, res) => {

    schema.parking.find((err, parking) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            res.status(statusCodes.OK).send(parking);
        }
    })
}

export const postLocation = (req, res) => {
    let string = req.body.city + "," + req.body.locality
    schema.Search.findOne({ place: string.toLowerCase() }, (err, data) => {
        if (!data) {
            const location = new schema.Search(
                {
                    place: string.toLowerCase()
                }
            )
            location.save();
        }
    })
}

export const searchLocation = (req, res) => {
    schema.Search.find({ "$or": [{ "place": { $regex: req.query.location } }] }, (err, result) => {
        if (result[0]) {
            res.status(statusCodes.OK).send(result);
        }
        else {
            res.status(statusCodes.OK).send({ message: textKeys.schemaTextKeys.searchLocation });
        }
    })

}

export const viewDetail = (req, res) => {
    let page = parseInt(req.query.page || "0");
    let pageNo = page - 1;
    let PAGE_SIZE = req.query.limit;
    let total = 0;
    if (req.query.city != "" && req.query.locality != "") {
        if ((req.query.city == undefined && req.query.locality == undefined)) {
            schema.Property.find({ active: false }, (err, result) => {
                if (result) {
                    total = result.length
                    
                }

                schema.Property.find({ active: false }, (err, result) => {
                    if (result) {
                        res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                    }
                }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                    .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)

            })
        }
        else {
            searchLocality = req.query.locality;
            const city1 = (req.query.city).charAt(0).toUpperCase() + (req.query.city).slice(1)
            schema.cities.find({ city: city1 }, (err, result) => {
                if (result) {

                    result.map((data) => {
                        cityId = data._id
                    })
                    schema.Property.find({ $and: [{ active: false }, { city: cityId }, { locality: searchLocality }] }, (err, result) => {
                        if (result) {
                            total = result.length
                           
                        }

                        schema.Property.find({ $and: [{ active: false }, { city: cityId }, { locality: searchLocality }] }, (err, result) => {
                            if (result) {
                                console.log(result.length)
                               
                                res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                            }
                            else {

                                res.status(statusCodes.OK).send(err);
                            }
                        }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                            .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })

                }
            })

        }
    }

}

export const filterDetail1 = async (req, res) => {
    let bhkId = [];
    let leaseTypeId = [];
    let furnishTypeId = [];
    let page = parseInt(req.query.page || "0");
    let pageNo = page - 1;
    let PAGE_SIZE = req.query.limit;
    const param = (req.query.type).split(',');
    let total = 0;

    schema.Bhk.find({ $or: [{ bhk: param[0] }, { bhk: param[1] }, { bhk: param[2] }, { bhk: param[3] }] }, (err, result) => {
        const leaseType = (req.query.leaseType).split(',');
        const furnishType = (req.query.furnishType).split(',');
        const rentType = (req.query.rentType).split(',');
        if (result[0] != undefined) {
            result.map((data) => {
                bhkId.push(data._id)
            })
        }
        schema.prefferedTenants.find({ $or: [{ tenantsType: leaseType[0] }, { tenantsType: leaseType[1] }, { tenantsType: leaseType[2] }, { tenantsType: leaseType[3] }] }, (err, result) => {
            if (result[0] != undefined) {
                result.map((data) => {
                    leaseTypeId.push(data._id)
                })
            }
            schema.furnished.find({ $or: [{ equipped: furnishType[0] }, { equipped: furnishType[1] }, { equipped: furnishType[2] }] }, (err, result) => {
                if (result[0] != undefined) {
                    result.map((data) => {
                        furnishTypeId.push(data._id)

                    })
                }
                if (req.query.type != "" && req.query.leaseType != "" && req.query.furnishType != "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result1) => {
                        if (result) {
                            total = result.length
                        }
                   
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
               
                })
                }
                if (req.query.type != "" && req.query.leaseType == "" && req.query.furnishType == "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                   
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType != "" && req.query.furnishType == "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }]}, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                   
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                    if (req.query.type == "" && req.query.leaseType == "" && req.query.furnishType != "" && req.query.rentType == "") {
                        schema.Property.find({ $and: [{ active: false },  { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }]}, (err, result) => {
                            if (result) {
                                total = result.length
                            }
                       
                        schema.Property.find({ $and: [{ active: false },  { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }]}, (err, result) => {
                            if (result) {
                                res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                            }
                            else {
                                res.status(statusCodes.OK).send({total:total, totalApartments:total});
                            }
                        }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                            .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                   
                    })
                    }
                    if (req.query.type == "" && req.query.leaseType == "" && req.query.furnishType == "" && req.query.rentType != "") {
                        schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }] }, (err, result) => {
                            if (result) {
                                total = result.length
                            }
                       
                        schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }] }, (err, result) => {
                            if (result) {
                                res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                            }
                            else {
                                res.status(statusCodes.OK).send({total:total, totalApartments:total});
                            }
                        }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                            .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                        })
                        }
                if (req.query.type != "" && req.query.leaseType != "" && req.query.furnishType == "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                   
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type != "" && req.query.leaseType != "" && req.query.furnishType != "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type != "" && req.query.leaseType != "" && req.query.furnishType == "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                })
               
                }
                if (req.query.type != "" && req.query.leaseType == "" && req.query.furnishType != "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type != "" && req.query.leaseType == "" && req.query.furnishType == "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType != "" && req.query.furnishType != "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false },  { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType != "" && req.query.furnishType == "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType == "" && req.query.furnishType != "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] }}, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] } ] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type != "" && req.query.leaseType == "" && req.query.furnishType != "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType != "" && req.query.furnishType != "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false },  { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType == "" && req.query.furnishType == "" && req.query.rentType == "") {
                    schema.Property.find({ active: false }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ active: false}, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(200).send({ message: "no1 match" });
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })

                    }
            })
        })
    })
}

export const filterDetail = (req, res) => {
    let bhkId = [];
    let leaseTypeId = [];
    let furnishTypeId = [];
    let page = parseInt(req.query.page || "0");
    let pageNo = page - 1;
    let PAGE_SIZE = req.query.limit;
    const param = (req.query.type).split(',');
    let total = 0;

    schema.Bhk.find({ $or: [{ bhk: param[0] }, { bhk: param[1] }, { bhk: param[2] }, { bhk: param[3] }] }, (err, result) => {
        const leaseType = (req.query.leaseType).split(',');
        const furnishType = (req.query.furnishType).split(',');
        const rentType = (req.query.rentType).split(',');
        if (result[0] != undefined) {
            result.map((data) => {
                bhkId.push(data._id)
            })
        }
        schema.prefferedTenants.find({ $or: [{ tenantsType: leaseType[0] }, { tenantsType: leaseType[1] }, { tenantsType: leaseType[2] }, { tenantsType: leaseType[3] }] }, (err, result) => {
            if (result[0] != undefined) {
                result.map((data) => {
                    leaseTypeId.push(data._id)
                })
            }
            schema.furnished.find({ $or: [{ equipped: furnishType[0] }, { equipped: furnishType[1] }, { equipped: furnishType[2] }] }, (err, result) => {
                if (result[0] != undefined) {
                    result.map((data) => {
                        furnishTypeId.push(data._id)

                    })
                }
                if (req.query.type != "" && req.query.leaseType != "" && req.query.furnishType != "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result1) => {
                        if (result) {
                            total = result.length
                        }
                   
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
               
                })
                }
                if (req.query.type != "" && req.query.leaseType == "" && req.query.furnishType == "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                   
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType != "" && req.query.furnishType == "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }]}, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                   
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                    if (req.query.type == "" && req.query.leaseType == "" && req.query.furnishType != "" && req.query.rentType == "") {
                        schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }]}, (err, result) => {
                            if (result) {
                                total = result.length
                            }
                       
                        schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }]}, (err, result) => {
                            if (result) {
                                res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                            }
                            else {
                                res.status(statusCodes.OK).send({total:total, totalApartments:total});
                            }
                        }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                            .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                   
                    })
                    }
                    if (req.query.type == "" && req.query.leaseType == "" && req.query.furnishType == "" && req.query.rentType != "") {
                        schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }] }, (err, result) => {
                            if (result) {
                                total = result.length
                            }
                       
                        schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }] }, (err, result) => {
                            if (result) {
                                res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                            }
                            else {
                                res.status(statusCodes.OK).send({total:total, totalApartments:total});
                            }
                        }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                            .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                        })
                        }
                if (req.query.type != "" && req.query.leaseType != "" && req.query.furnishType == "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                   
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type != "" && req.query.leaseType != "" && req.query.furnishType != "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type != "" && req.query.leaseType != "" && req.query.furnishType == "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] } , { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                })
               
                }
                if (req.query.type != "" && req.query.leaseType == "" && req.query.furnishType != "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type != "" && req.query.leaseType == "" && req.query.furnishType == "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ $and: [{ active: false }, { city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType != "" && req.query.furnishType != "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType != "" && req.query.furnishType == "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType == "" && req.query.furnishType != "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] }}, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] } ] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type != "" && req.query.leaseType == "" && req.query.furnishType != "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ bhkType: bhkId[0] }, { bhkType: bhkId[1] }, { bhkType: bhkId[2] }, { bhkType: bhkId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType != "" && req.query.furnishType != "" && req.query.rentType != "") {
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { $and: [{ city: cityId }, { locality: searchLocality }] }, { rent: { $gte: rentType[0] } }, { rent: { $lte: rentType[1] } }, { $or: [{ furnishing: furnishTypeId[0] }, { furnishing: furnishTypeId[1] }, { furnishing: furnishTypeId[2] }] }, { $or: [{ preferredTenants: leaseTypeId[0] }, { preferredTenants: leaseTypeId[1] }, { preferredTenants: leaseTypeId[2] }, { preferredTenants: leaseTypeId[3] }] }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                    })
                    }
                if (req.query.type == "" && req.query.leaseType == "" && req.query.furnishType == "" && req.query.rentType == "") {
                    schema.Property.find({ $and: [{ active: false }, { city: cityId }, { locality: searchLocality }] }, (err, result) => {
                        if (result) {
                            total = result.length
                        }
                    schema.Property.find({ $and: [{ active: false }, { city: cityId }, { locality: searchLocality }] }, (err, result) => {
                        if (result) {
                            res.status(statusCodes.OK).send({ result, total: Math.ceil(total / PAGE_SIZE),totalApartments:total })
                        }
                        else {
                            res.status(statusCodes.OK).send({total:total, totalApartments:total});
                        }
                    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
                        .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
                })
                 }
            })
        })
    })
}

export const allProperty = (req, res) => {

    schema.parking.find((err, parking) => {
        if (err) {
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else {
            arr.push(parking)
            res.status(statusCodes.OK).send(parking);
        }
    })
}
export const myListing = async (req, res) => {
    if (req.query.id) {
        const page = parseInt(req.query.page || "0");
        let pageNo = page - 1;
        const PAGE_SIZE = req.query.limit;
        const total = await schema.Property.countDocuments({owner:req.query.id});
console.log(total);
console.log(Math.ceil(total / PAGE_SIZE));

        const posts = await schema.Property.find({ owner: req.query.id }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
            .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge).limit(PAGE_SIZE).skip(PAGE_SIZE * pageNo)
        res.send({ total: Math.ceil(total / PAGE_SIZE), posts, userId: req.loggedUserId });
    }
}
export const apartments = (req, res) => {

    schema.Property.findById({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(statusCodes.OK).send(result)
        }
        else {
            res.status(statusCodes.OK).send();
        }
    })

}

export const apartmentDetail = (req, res) => {
    schema.Property.findById({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(statusCodes.OK).send(result)
        }
        else {
            res.status(statusCodes.OK).send();
        }
    }).populate(textKeys.schemaTextKeys.owner).populate(textKeys.schemaTextKeys.bhkType).populate(textKeys.schemaTextKeys.apartmentType)
    .populate(textKeys.schemaTextKeys.furnishing).populate(textKeys.schemaTextKeys.preferredTenants).populate(textKeys.schemaTextKeys.facing).populate(textKeys.schemaTextKeys.floor).populate(textKeys.schemaTextKeys.parking).populate(textKeys.schemaTextKeys.city).populate(textKeys.schemaTextKeys.propertyAge)

}
export const activeStatus = (req, res) => {

    const { active } = req.body;
    console.log(active)
    if (active) {
        schema.Property.findByIdAndUpdate(req.params.id, { active: true }, (err, property) => {
            if (err) {
                res.status(constant.statusCode.BAD_REQUEST).send()
            }
            else {
                res.status(statusCodes.CREATED).send({ active: true })
            }

        })
    }
    else {
        schema.Property.findByIdAndUpdate(req.params.id, { active: false }, (err, property) => {
            if (err) {
                res.status(constant.statusCode.BAD_REQUEST).send()
            }
            else {
                res.status(statusCodes.CREATED).send({ active: false })
            }

        })

    }

}
export const invalidUrl = (req, res) => {
    res.status(statusCodes.OK).send()
}
export const welcome = (req, res) => {
    res.status(statusCodes.OK).send();
}
export const flat = (req, res) => {

    schema.Property.findById({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(statusCodes.OK).send(result)
        }
        else {
            res.status(200).send();
        }
    })

}
export const myWishlist = (req, res) => {
    const { owner, property } = req.body;
    schema.myWishList.findOne({ $and: [{ owner: owner }, { property: property }] }, (err, result) => {
        if (result) {

            res.status(statusCodes.OK).send({ message: textKeys.userTextKeys.likedPropertyAlready });
        }
        else {

            const list = new schema.myWishList({
                owner,
                property
            })
            list.save(err => {
                if (err) {
                    res.status(statusCodes.BAD_REQUEST).send(err);
                } else {
                    res.status(statusCodes.CREATED).send(list);
                }
            })
        }

    })

}
export const liked = (req, res) => {

    if (req.query.userid != undefined && req.query.propertyid != undefined) {
 
        schema.myWishList.findOne({ $and: [{ owner: req.query.userid }, { property: req.query.propertyid }] }, (err, result) => {
            if (result) {
                res.status(statusCodes.OK).send({ message: textMessages.yes });
            }
            else {
                res.status(statusCodes.OK).send({ message: textMessages.no });

            }
        }).populate(textKeys.schemaTextKeys.owner).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.floor }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.propertyAge }) })
            .populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.apartmentType }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.bhkType }) })
            .populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.facing }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path:textKeys.schemaTextKeys.city }) })
            .populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.maintenance }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.furnishing }) })
            .populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.parking }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.preferredTenants }) })

    }
    else {
        let arr=[];
        schema.myWishList.find({ owner: req.query.userid }, (err, result) => {
            if (result[0]) {
                result.map((data) =>{
                    arr.push(data.property)

                });
                res.status(statusCodes.OK).send(arr);

            }
            else {
                res.status(statusCodes.OK).send();

            }
        })
    }

}
export const likedDelete = (req, res) => {
   
    schema.myWishList.findOne({ $and: [{ owner: req.query.userid }, { property: req.query.propertyid }] }, (err, result) => {
        if (result) {
            console.log(result._id)
            schema.myWishList.findByIdAndRemove({_id:result._id},(err,result) =>{
                if(result)
                {
                    res.status(statusCodes.OK).send()
                }
                else{
                    console.log(err)
                }
            })


            }
        })


}
export const wished =(req,res)=>{
    let arr=[];
    schema.myWishList.find({owner:req.query.userId},(err,result)=>{
        if(err){
            res.status(statusCodes.NOT_FOUND).send(err);
        }
        else{
            if(result===""){
                
                res.status(statusCodes.NOT_FOUND).send()
            }
            result.map((data) =>{
                arr.push(data.property)

            });
            res.status(200).send(arr)
        }
    }).populate(textKeys.schemaTextKeys.owner).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.floor }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.propertyAge }) })
    .populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.apartmentType }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.bhkType }) })
    .populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.facing }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path:textKeys.schemaTextKeys.city }) })
    .populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.maintenance }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.furnishing }) })
    .populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.parking }) }).populate({ path: textKeys.schemaTextKeys.property, populate: ({ path: textKeys.schemaTextKeys.preferredTenants }) })
}
export const place =(req,res)=>{
    schema.cities.findById({_id:req.body.cityId},(err,result)=>{
        if(result)
        {
            res.status(statusCodes.OK).send(result.city);
        }
        else{
            res.send(err);
        }
    })
}