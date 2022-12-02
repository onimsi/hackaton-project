//jshint esversions:6
require('dotenv').config()
const express = require('express');
const main = require('./controller/main.controller');
const mod = require('./models/main.model')
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger-jsdoc')
const swa = require('./swagger') 

const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "this is my first cookies",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5_000_000}
}))

app.use(passport.initialize());
app.use(passport.session())

passport.use(mod.UserModel.createStrategy());
passport.serializeUser(mod.UserModel.serializeUser()); 
passport.deserializeUser(mod.UserModel.deserializeUser())

const swaggerSpec = swaggerDocument(swa.options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *  get:
 *    summary: This page end point is to test if the page is working
 *    description: This page end point is to test if the page is working
 *    responses:
 *      200:
 *        description: To test the get method
 */
app.get('/', (req, res)=>{
    res.send({check: "testing this page"})
});

/**
 * @swagger
 * /register:
 *  post:
 *    summary: This route endpoint is for user register and sign up
 *    description: This route endpoint is for user register and sign up
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#components/schema/main'
 *    responses:
 *      201:
 *        description: Register
 */
app.post('/register', main.register);

/**
 * @swagger
 * /edit_profile/{id}:
 *  patch:
 *      summary: To edit user profile
 *      description: This route is to edit the detials of one user
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/schema/main'
 *      responses:
 *          200:
 *              description: this api is to edit one user details
 */
app.patch('/edit_profile/:id', main.update)

/**
 * @swagger
 * /user_profile/{id}:
 *  get:
 *      summary: To get only one user detials by user id
 *      description: This route is to get the detials of one user
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: this api is to get one user details
 */
app.get('/user_profile/:id', main.findOneUser)

/**
 * @swagger
 * /findAll:
 *  get:
 *    summary: This end point is to get all users
 *    description: This router is to get all users
 *    responses:
 *      200:
 *        description: To all users from the database
 */
app.get('/findAll', main.getAll)

/**
 * @swagger
 * /login:
 *  post:
 *    summary: This route endpoint is for user register and sign up
 *    description: This route endpoint is for user register and sign up
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          description: the user email is the username
 *                          example: John@meo.com
 *                          type: string
 *                      password:
 *                          description: the user password must be same with the confirm password
 *                          example: test21
 *    responses:
 *      201:
 *        description: login
 */
app.post('/login', main.login)

/**
 * @swagger
 * /profile:
 *  get:
 *    summary: This is to check if the user is authenticated before proceeding to his profile
 *    description: This page end point is for user profile or dashboard. 
 *    responses:
 *      200:
 *        description: To check if user had login or not
 */
app.get("/profile", main.profile)

/**
 * @swagger
 * /logout:
 *  get:
 *    summary: This end point is to logout user
 *    description: Once a user logout, to access her profile, she has to login in again. 
 *    responses:
 *      200:
 *        description: Logout
 */
app.get('/logout', main.logout)


/////////   swagger schema   ////////////
/**
 * @swagger
 *  components:
 *      schema:
 *          main:
 *              type: object
 *              properties:
 *                  fName:
 *                      description: this is the first name of the user
 *                      example: John
 *                  lName:
 *                      description: this is the last name of the user
 *                      example: Meo
 *                  phone:
 *                      description: this is the first name of the user
 *                      example: 09032873421
 *                  username:
 *                      description: the user email is the username
 *                      example: John@meo.com
 *                      type: string
 *                  password:
 *                      description: the user password must be same with the confirm password
 *                      example: test21
 *                  conPass:
 *                      description: the user confirm password must be same with the first password
 *                      example: test21
 *                  city:
 *                      description: this is the ciy where the user resides
 *                      example: Los Angeles
 *                  pCode:
 *                      description: this is the portal code of the user
 *                      example: 113322
 *                  jobDes:
 *                      description: this is job description of the user
 *                      example: I am very good in cooking.
 *                  dob:
 *                      description: this is user date of birth
 *                      example: 2001/02/23
 */
const port = process.env.PORT || "5000"
app.listen(port, ()=>{
    console.log(`I am running on ${port}`)
})