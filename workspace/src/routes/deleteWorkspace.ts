import { currentUser, validateRequest } from "@kneeyaa/notionhelper";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { Workspace } from "../models/workspaces";

const router = express.Router();

// * @desc        Delete Workspace
// * @route       DELETE /api/workspace
// * @access      Private
router.delete(
    "/api/workspace/:workspace_id",
    currentUser,
    async (req: Request, res: Response) => {}
);

export { router as deleteWorkspace };
