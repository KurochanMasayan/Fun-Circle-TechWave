import { fromHono } from "chanfana";
import { Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { DonationCreate } from "./endpoints/donationCreate";
import { DonationDelete } from "./endpoints/donationDelete";
import { DonationFetch } from "./endpoints/donationFetch";
import { DonationList } from "./endpoints/donationList";
import { DonationUpdate } from "./endpoints/donationUpdate";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
openapi.get("/api/tasks", TaskList);
openapi.post("/api/tasks", TaskCreate);
openapi.get("/api/tasks/:taskSlug", TaskFetch);
openapi.delete("/api/tasks/:taskSlug", TaskDelete);

// Donation endpoints
openapi.get("/api/donations", DonationList);
openapi.post("/api/donations", DonationCreate);
openapi.get("/api/donations/:donationId", DonationFetch);
openapi.put("/api/donations/:donationId", DonationUpdate);
openapi.delete("/api/donations/:donationId", DonationDelete);

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
