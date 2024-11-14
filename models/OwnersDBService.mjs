import Owner from "./Owner.mjs";
import mongoose from "mongoose";

class OwnersDBService {
  static async getList() {
    try {
      const exists = await Owner.checkCollectionExists;
      if (exists) {
        const data = await mongoose.model(collectionName).find().exec();
        return data;
      }
      return (await Owner.find({})) ?? [];
    } catch (error) {
      return [];
    }
  }
  static async getById(id) {
    return await Owner.findById(id);
  }
  static async create(data) {
    const owner = new Owner(data);
    return await owner.save();
  }
  static async update(id, data) {
    return await Owner.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  static async deleteById(id) {
    return await Owner.findByIdAndDelete(id);
  }
}
export default OwnersDBService;
