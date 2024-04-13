import { Database } from "./middlewares/database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
// UUID => Unique Universal ID

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { search } = req.query;

            const tasks = database.select(
                "tasks",
                search ? { name: search, email: search } : null
            );

            return res.end(JSON.stringify(tasks));
        },
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.body;

            if (!title || !description) {
                return res.writeHead(401).end(JSON.stringify({
                    success: false,
                    msg: "You need to inform title and description to register!",
                }))
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
            };

            const data = database.insert("tasks", task);

            return res.writeHead(201).end(JSON.stringify(data));
        },
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;

            database.delete("tasks", id);

            return res.writeHead(204).end();
        },
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const { completed_at, ...rest } = req.body;

            if (Object.keys(rest).length === 0) {
                return res.writeHead(401).end(
                    JSON.stringify({
                        success: false,
                        msg: "You need to inform at least title or description!",
                    })
                );
            }

            database.update("tasks", id, rest);

            return res.writeHead(204).end();
        },
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params;

            database.update("tasks", id, { completed_at: true });

            return res.writeHead(204).end();
        },
    },

];
