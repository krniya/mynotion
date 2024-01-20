import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { NotFoundError } from "@kneeyaa/notionhelper";
import { createWorkspace } from "./routes/createWorkspace";
import { deleteWorkspace } from "./routes/deleteWorkspace";
import { getWorkspace } from "./routes/getWorkspace";

const app = express();
app.set("trust proxy", true); //* Express to trust proxied requests

app.use(json());
app.use(
    cookieSession({
        //* Cookie seesion to get JWT from cookie
        signed: false, //* As we got JWT, don't required to encrypt cookie
        secure: process.env.NODE_ENV !== "test", //* Only accept request at HTTPS (Prod environment only)
    })
);

// * Routes
app.use(createWorkspace); // * Create workspace
app.use(deleteWorkspace); // * Delete Workspace
app.use(getWorkspace); // * Get Workspace

//* Error handling for incorrect route
//* Throwing Error 404 Not Found
app.all("*", async () => {
    throw new NotFoundError();
});

export { app };
