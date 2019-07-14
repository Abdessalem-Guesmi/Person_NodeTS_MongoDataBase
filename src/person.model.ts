import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
let personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    department: { type: String, required: true },
    age: { type: Number, required: true },
    recruitmentDate: { type: Date, required: true, default: new Date() }
    
});
personSchema.plugin(mongoosePaginate);
const Person = mongoose.model('Person', personSchema);
export default Person;