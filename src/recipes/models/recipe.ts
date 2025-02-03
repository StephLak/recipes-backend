import mongoose from "mongoose";

interface RecipeAttrs {
    title: string;
    description: string;
    userId: string;
}

// An interface that describes the properties that
// a Recipe model has
interface RecipeModel extends mongoose.Model<RecipeDoc> {
    build(attrs: RecipeAttrs): RecipeDoc;
}

// An interface that describes the properties
// that a Recipe Document has
interface RecipeDoc extends mongoose.Document {
    title: string;
    description: string;
    userId: string;
}

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

// Fixing issues with TypeScript and Mongoose
recipeSchema.statics.build = (attrs: RecipeAttrs) => {
    return new Recipe(attrs);
}

const Recipe = mongoose.model<RecipeDoc, RecipeModel>('Recipe', recipeSchema);

export { Recipe };