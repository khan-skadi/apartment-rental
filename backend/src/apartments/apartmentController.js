const Apartment = require("../models/apartment.js");

function isAdminOrRealtor(role) {
  return role === "admin" || role === "realtor";
}

function formatSort(order, orderBy) {
  let sort = {};
  sort[orderBy] = order;
  return sort;
}

async function getApartments(req, res, next) {
  const user = req.user;
  if (isAdminOrRealtor(user.role)) {
    try {
      const { currentPage, rowsCount, order, orderBy } = req.query;
      const apartments = await Apartment.find()
        .sort(formatSort(order, orderBy))
        .skip(parseInt(currentPage) * parseInt(rowsCount))
        .limit(parseInt(rowsCount))
        .lean();

      const totalApartments = await Apartment.find().lean();
      const totalCount = totalApartments.length;
      res.send({ apartments, totalCount });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).send("This user doesn't have permission to get apartments");
  }
}

async function addApartment(req, res, next) {
  if (isAdminOrRealtor(req.user.role)) {
    try {
      const apartment = new Apartment({
        name: req.body.name,
        description: req.body.description,
        floorSize: req.body.floor_size,
        pricePerMonth: req.body.price,
        lat: req.body.lat,
        lng: req.body.lng,
        realtor: req.body.realtor,
        rooms: req.body.rooms,
      });

      const createdApartment = await apartment.save();
      res.json(createdApartment);
    } catch (err) {
      return next(err);
    }
  } else {
    res.status(401).send("This user doesn't have permission to add apartment");
  }
}

async function updateApartment(req, res, next) {
  if (isAdminOrRealtor(req.user.role)) {
    try {
      const aprtmentId = req.params.id;
      let apartment;
      try {
        apartment = await Apartment.findOne({ _id: aprtmentId });
      } catch (error) {
        res.status(404).send("Invalid Apartment id");
      }

      apartment.name = req.body.name || apartment.name;
      apartment.description = req.body.description || apartment.description;
      apartment.floorSize = req.body.floor_size || apartment.floorSize;
      apartment.pricePerMonth = req.body.price || apartment.pricePerMonth;
      apartment.lat = req.body.lat || apartment.lat;
      apartment.lng = req.body.lng || apartment.lng;
      apartment.realtor = req.body.realtor || apartment.realtor;
      apartment.rentable = req.body.rentable || apartment.rentable;
      apartment.rooms = req.body.rooms || apartment.rooms;

      try {
        const updatedApartment = await apartment.save();
        res.json(updatedApartment);
      } catch (err) {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  } else {
    res
      .status(401)
      .send("This user doesn't have permission to update apartments");
  }
}

async function deleteApartment(req, res, next) {
  if (isAdminOrRealtor(req.user.role)) {
    try {
      const apartmentId = req.params.id;
      const apartment = await Apartment.findOne({ _id: apartmentId });
      await apartment.remove();
      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  } else {
    res
      .status(401)
      .send("This user doesn't have permission to delete apartments");
  }
}

module.exports = {
  getApartments,
  addApartment,
  updateApartment,
  deleteApartment,
};
