import express from 'express'
import repositoryRoutes from './routes/repository.routes'
import scanRoutes from './routes/scan.routes'
const { swaggerDocs: SwaggerDocsV1 } = require("../swagger");
const app = express();
const PORT = process.env.PORT || 3000;

console.log(`Server on port configurated ${process.env.PORT}`);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use(repositoryRoutes);
app.use(scanRoutes);

module.exports =  app.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}`);
    SwaggerDocsV1(app, PORT);
});

