import mongoose from "mongoose";

//* An interface that describes the properties
//* that are required to create a new workspace
interface WorkspaceAttribute {
    created_at: Date;
    workspace_user_id: string;
    title: string;
    icon_id: string;
    logo: string;
}

//* An interface that describes the
//* properties that a workspace model has
interface WorkspaceModel extends mongoose.Model<WorkspaceDoc> {
    build(attrs: WorkspaceAttribute): WorkspaceDoc;
}

//* An interface that describes the properties
//* that a workspace document model has
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
//* { title, created_at, workspace_onwer_id, icon_id, date, in_trash, logo, banner_url, toJSON()}
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
            required: true,
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

//* Function to create new workspace.
//* using it instead of 'new Workspace' to add type check
WorkspaceSchema.statics.build = (attrs: WorkspaceAttribute) => {
    return new Workspace(attrs);
};

const Workspace = mongoose.model<WorkspaceDoc, WorkspaceModel>("Workspace", WorkspaceSchema);

export { Workspace };
