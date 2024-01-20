import { currentUser, validateRequest } from "@kneeyaa/notionhelper";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { Workspace } from "../models/workspaces";

const router = express.Router();

// * @desc        Get Workspace
// * @route       GET /api/workspace
// * @access      Private
router.get("/api/workspace/", currentUser, async (req: Request, res: Response) => {});

export { router as getWorkspace };
