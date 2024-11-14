import Car from "./Vehicle.mjs";
import mongoose from "mongoose";

class CarsDBService {
  static async getList() {
    try {
      return (await Car.find({}).populate("owner").exec()) ?? [];
    } catch (error) {
      return [];
    }
  }
  static async create(data) {
    const car = new Car(data);
    return await car.save();
  }
  static async getById(id) {
    return await Car.findById(id);
  }
  static async update(id, data) {
    return await Car.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  static async deleteById(id) {
    return await Car.findByIdAndDelete(id);
  }
}
export default CarsDBService;
