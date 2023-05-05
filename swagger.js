const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs")
const swaggerJsDocs = YAML.load("api.yaml");

const options = {
    customSiteTitle: "swagger"
};

module.exports = {swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(swaggerJsDocs, options)};


