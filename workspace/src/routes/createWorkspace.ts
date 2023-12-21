import { currentUser, validateRequest } from "@kneeyaa/notionhelper";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { Workspace } from "../models/workspaces";

const router = express.Router();

// * @desc        Return current logged in user
// * @route       GET /api/users/currentuser
// * @access      Private
router.get(
    "/api/users/currentuser",
    [body("title").notEmpty().withMessage("Please provide title")],
    currentUser,
    validateRequest,
    async (req: Request, res: Response) => {
        const workspace_user_id = req.currentUser!.id;
        const created_at = new Date();
        const { title, logo, icon_id } = req.body;
        const workspace = Workspace.build({ created_at, title, logo, icon_id, workspace_user_id });
        await workspace.save();
    }
);

export { router as createWorkspace };
