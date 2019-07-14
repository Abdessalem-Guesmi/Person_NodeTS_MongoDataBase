"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let personSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    department: { type: String, required: true },
    age: { type: Number, required: true },
    recruitmentDate: { type: Date, required: true, default: new Date() }
});
personSchema.plugin(mongoose_paginate_1.default);
const Person = mongoose_1.default.model('Person', personSchema);
exports.default = Person;
