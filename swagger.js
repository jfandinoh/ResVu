const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.0.0",
      info: { 
            title: "Node API", 
            version: "1.0.0" 
        },
    },
    apis: ["./src/routes/repository.routes.ts","./src/routes/scan.routes.ts"],
  };

const swaggerSpec = swaggerJSDoc(options);


const swaggerDocs = (app, port) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
    console.log(
      `Documentation is available on http://localhost:${port}/api/docs`
    );
  };
  
  module.exports = { swaggerDocs };
