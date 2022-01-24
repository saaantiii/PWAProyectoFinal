//1-Invocacion EXPRESS y otras librerias
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt')
const session = require('express-session');
var app = express();
var nodemailer = require('nodemailer');
const cors = require('cors');



//2-Capturar datos formulario
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));


/* app.use(cors(), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
    "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE",
    "Allow", "GET, POST, OPTIONS, PUT, DELETE"
  );
  next();
}); */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




//Conexion Base de Datos
const myconfig = require('./config/config.js')
const mysql = require('mysql2');
const connection = mysql.createConnection(myconfig.mysql)
connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit();
  }
  console.log('Base de Datos Conectada');
});


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(session({
  key: "userID",
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 360000000,
  },
}));


//REGISTRO
app.post('/register', async (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  let passwordHash = await bcrypt.hash(password, 8);
  connection.query('INSERT INTO usertable SET ?', { name: name, surname: surname, email: email, username: username, password: passwordHash }, async (error, results) => {
    if (error) {
      res.send({
        alert: true,
        title: "Registración",
        text: "Error",
        icon: 'warning',
        showConfirmButton: false,
        timer: 10000,
        ruta: '/register'
      });
    } else {
      console.log(results)
      res.send({
        alert: true,
        title: "Registración",
        text: "¡Registro Exitoso!",
        icon: 'success',
        showConfirmButton: false,
        timer: 10000,
        ruta: '/login'
      });
    }
  });
})

//LOGEO
app.post('/auth', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let passwordHash = await bcrypt.hash(password, 8);
  if (username && password) {
    connection.query('SELECT * FROM usertable WHERE username=?', [username], async (error, results) => {
      if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
        res.send({
          loggedIn: false,
          alert: true,
          title: "Error",
          text: "USUARIO y/o PASSWORD incorrectas",
          icon: 'error',
          showConfirmButton: true,
          timer: false,
          ruta: '/login'
        });
      } else {
        req.session.loggedIn = true;
        req.session.name = results[0].name;
        req.session.surname = results[0].surname;
        req.session.userID = results[0].userID;
        console.log(req.session.loggedIn, req.session.userID);
        res.send(
          {
            alert: true,
            title: "Conexión exitosa",
            text: "¡LOGIN CORRECTO!",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: '/index',
            loggedIn: true
          });
      }
    });
  } else {
    res.send({
      loggedIn: false,
      alert: true,
      title: "Advertencia",
      text: "¡Por favor ingrese un usuario y contraseña!",
      icon: 'warning',
      showConfirmButton: true,
      timer: false,
      ruta: '/login'
    });
  };
});


//CONTROL DE LOGEO CAMBIAR
//Control de Sesion
app.get("/loggedin", function (req, res) {
  console.log(req.session.loggedIn);
  res.send({ loggedIn: req.session.loggedIn })
});
//Extrae nombre y apellido del usuario logueado
app.get("/loggedinusername", function (req, res) {
  console.log(req.session.userID, req.session.name, req.session.surname)
  res.send({ userid: req.session.userID, user: req.session.name, surname: req.session.surname });
});


//Solicitar todos los paneles
app.get("/getpanels", function (req, res) {
  console.log(req.session.userID);
  connection.query('SELECT * FROM linkstable WHERE userTable_userID=?', [req.session.userID], function (err, results, fields) { //BUSCAMOS TODOS LOS LINKS DE LA BASE DE DATOS
    if (err) { throw err; }
    else {
      var links = results;
      console.log(results);
      res.send(results);
    };
  });
})


//Añadir Panel
app.post('/panel', async (req, res) => {
  console.log(req.session.loggedIn)
  console.log(req.session.userID)
  const sitename = req.body.sitename;
  const direccion = req.body.url;
  const description = req.body.description;
  const userID = req.session.userID;
  console.log(sitename, direccion, description, userID);
  connection.query('INSERT INTO linkstable (URL, description, sitename, userTable_userID) VALUES (?,?,?,?)', [direccion, description, sitename, userID], async (error, results) => {
    if (error) {
      console.log(error);
      return res.send({
        name: req.session.name,
        surname: req.session.surname,
        alert: true,
        title: "No se puede registrar el LINK",
        text: "Error",
        icon: 'warning',
        showConfirmButton: true,
        timer: false,
        ruta: '/addlink'
      });
    } else {
      return res.send({
        name: req.session.name,
        surname: req.session.surname,
        alert: true,
        title: "Registro",
        text: "¡Registro Exitoso!",
        icon: 'success',
        showConfirmButton: false,
        timer: 5000,
        ruta: '/index'
      });
    }
  });
});

//eliminar panel
app.delete('/delete/:idlink', function (req, res) {
  const { idlink } = req.params;
  connection.query('DELETE FROM linkstable WHERE idlink = ?', [idlink], async (error, results) => {
    return res.send({
      alert: true,
      title: "Panel",
      text: "¡Se ha eliminado Correctamente!",
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      ruta: '/index',
    });
  });
});

//enviar mail
app.post('/send', function (req, res) {
  let nombreForm, apellidoForm, emailForm, telefonoForm, textoForm;
  nombreForm = req.body.name;
  apellidoForm = req.body.surname;
  emailForm = req.body.email;
  telefonoForm = req.body.telefone;
  textoForm = req.body.text;
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'alec.trantow81@ethereal.email',
      pass: 'S3CE75WPR5SX71zxsZ'
    },
    tls: {
      rejectUnauthorized: false
    },
  });
  var mailForm = {
    from: `${nombreForm} ${apellidoForm} <${emailForm}>`,
    to: "santiagosarchetti@gmail.com",
    subject: "Nuevo Contacto",
    text: `${textoForm}`
  };
  transporter.sendMail(mailForm, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado");
      return res.send({
        alert: true,
        title: "Información",
        text: "¡Formulario de Contacto Enviado!",
        icon: 'info',
        button: true,
        timer: 5000,
        ruta: 'index'
      });
    }
  });
})

//Cerrar Sesion
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('DESTROYED')
  })
});

/* app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
}); */

// error handler
/* app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

// catch 404 and forward to error handler
/* app.use(function (req, res, next) {
  next(createError(404));
}); */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
//module.exports = app;