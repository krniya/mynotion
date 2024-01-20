import { currentUser, validateRequest } from "@kneeyaa/notionhelper";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { Workspace } from "../models/workspaces";

const router = express.Router();

// * @desc        Create Workspace
// * @route       POST /api/workspace
// * @access      Private
router.post(
    "/api/workspace/",
    [body("title").notEmpty().withMessage("Please provide title")],
    currentUser,
    validateRequest,
    async (req: Request, res: Response) => {
        const workspace_user_id = req.currentUser!.id;
        const created_at = new Date();
        const { title, logo, icon_id } = req.body;
        const workspace = Workspace.build({ created_at, title, logo, icon_id, workspace_user_id });
        await workspace.save();
        res.send(201);
    }
);

export { router as createWorkspace };
