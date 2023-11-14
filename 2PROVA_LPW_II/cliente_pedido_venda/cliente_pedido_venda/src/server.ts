import fastify from "fastify";
import { clientsRoutes } from "./routes/clients";
import { saleRoutes } from "./routes/salesorder";



const app = fastify();

//app.register(funcionariosRoutes)
app.register(clientsRoutes)
app.register(saleRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running on port 3333')
})
