

exports.options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger api documentation",
            description: "This is REST-Api for e-commerce website",
            version: "1.0.0"
        },
        servers: [{url:"http://localhost:5000"}]
    },
    // apis: ["app.js"]
    apis: [`${__dirname}/app.js`]
}

