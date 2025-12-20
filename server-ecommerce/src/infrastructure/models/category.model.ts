import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    parentId: { type: String },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
    collection: 'categories'
});

export const CategoryModel = model('Category', categorySchema);