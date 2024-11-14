import { Router } from "express";
const router = Router();

import CarValidator from "../models/carValidator.mjs";
import OwnerController from "../controllers/ownerController.mjs";
import { checkSchema } from "express-validator";

import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

import CarController from "../controllers/carController.mjs";

router.get("/", CarController.autopark);
router.get("/add", CarController.createCar);
router.post(
  "/",
  upload.single("photo"),
  checkSchema(CarValidator.carSchema),
  CarController.addCar
);
router.delete("/deleteCar", CarController.deleteCar);
router.get("/edit/:id", CarController.updateCarForm);
router.post(
  "/edit/:id",
  upload.single("photo"),
  checkSchema(CarValidator.carSchema),
  CarController.updateCar
);

router.get("/owners", OwnerController.owners);
router.get("/owners/add", OwnerController.createOwnerForm);
router.get("/owners/edit/:id", OwnerController.updateOwnerForm);
router.post("/owners/edit/:id", OwnerController.updateOwner);

router.post("/owners/add", OwnerController.addOwner);
router.delete("/owners/delete", OwnerController.deleteOwner);

export default router;
