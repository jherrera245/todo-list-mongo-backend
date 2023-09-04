const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:5173"
};

app.use(cors(corsOptions));

// parseo peticiones content-type - application/json
app.use(bodyParser.json());

// parseo peticiones content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//ruta general
app.get("/", (req, res) => {
  res.json({ message: "Mi servidor para MongoDB" });
});

// asignando puertos para la ecucha de peticiones
const PORT = process.env.PORT || 8080;

//rutas para el crud de tareas
require('./routes/todo-routes')(app)

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
  console.log(`El cors esta configurado para el origen ${corsOptions.origin}`)
});

//conexion a base de datos mongo
const database = require('./models')

database.mongoose.connect(
  database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(
  () => {
    console.log('Conectado a base de datos !!!')
  }
).catch(err => {
  console.log('Error al conectar !!!', err)
  process.exit()
})