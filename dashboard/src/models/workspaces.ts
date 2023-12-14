import mongoose from "mongoose";

//* An interface that describes the properties
//* that are required to create a new user
interface WorkspaceAttribute {
    created_at: Date;
    workspace_id: string;
    title: string;
    icon_id: string;
    data: string;
    in_trash: boolean;
    logo: string;
    banner_url: string;
}

//* An interface that describes the properties
//* that a user model has
interface WorkspaceModel extends mongoose.Model<WorkspaceDoc> {
    build(attrs: WorkspaceAttribute): WorkspaceDoc;
}

//* An interface that describes the properties
//* that a user document model has
interface WorkspaceDoc extends mongoose.Document {
    created_at: Date;
    workspace_id: string;
    title: string;
    icon_id: string;
    data: string;
    in_trash: boolean;
    logo: string;
    banner_url: string;
}

//* User Schema
//* { email, password, toJSON()}
const WorkspaceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
        },
        workspace_owner_id: {
            type: String,
        },
        icon_id: {
            type: String,
        },
        data: {
            type: String,
        },
        in_trash: {
            type: Boolean,
        },
        logo: {
            type: String,
        },
        banner_url: {
            type: String,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

//* Function to create new user.
//* using it instead of 'new User' to add type check
WorkspaceSchema.statics.build = (attrs: WorkspaceAttribute) => {
    return new User(attrs);
};

const User = mongoose.model<WorkspaceDoc, WorkspaceModel>("User", WorkspaceSchema);

export { User };
