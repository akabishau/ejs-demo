require('dotenv').config()
const session = require('express-session')
const express = require('express')
const app = express()

const taskRouter = require('./routes/tasks')
const setMessage = require('./middleware/message')

app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }))

app.use('/tasks', setMessage, taskRouter)



app.get('/', function (req, res) {
    const mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012 },
        { name: 'Tux', organization: "Linux", birth_year: 1996 },
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013 }
    ]
    var tagline = 'No programming concept is complete without a cute animal mascot.'

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    })
})


app.get('/about', function (req, res) {
    res.render('pages/about')
})



const connectDB = require('./db/connect')
const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start()

