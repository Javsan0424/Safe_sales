import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3001;

const db = mysql.createConnection({
    host: "mysql-19d2a149-tec-2932.c.aivencloud.com",
    port: 13130,
    user: "avnadmin",
    password: "AVNS_7AxjeyZxAOrWBQbYW5N",
    database: "defaultdb",
    ssl: {
        ca: fs.readFileSync("ca(4).pem"),
    },
});

db.connect((err) => {
    if (err) {
        console.error("Error de conexión: ", err);
        return;
    }
    console.log("Conexión exitosa!!");
});

const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    console.log("Bienvenido");
    res.send('Bienvenido al backend');
});

app.get('/api/ventas', (_req: Request, res: Response) => {
    const SQL_QUERY = 'SELECT * FROM Ventas';
    db.query(SQL_QUERY, (err, result) => {
        if (err) {
            console.error("Error en la consulta: ", err);
            res.status(500).send("Error en la consulta a la base de datos");
            return;
        }
        res.json(result);
    });
});

app.get('/api/clientes', (_req: Request, res: Response) => {
    const SQL_QUERY = 'SELECT * FROM Clientes';
    db.query(SQL_QUERY, (err, result) => {
        if (err) {
            console.error("Error en la consulta: ", err);
            res.status(500).send("Error en la consulta a la base de datos");
            return;
        }
        res.json(result);
    });
});

app.get('/api/productos', (_req: Request, res: Response) => {
    const SQL_QUERY = 'SELECT * FROM Productos';
    db.query(SQL_QUERY, (err, result) => {
        if (err) {
            console.error("Error en la consulta: ", err);
            res.status(500).send("Error en la consulta a la base de datos");
            return;
        }
        res.json(result);
    });
});

app.get('/api/negociaciones', (_req: Request, res: Response) => {
    const SQL_QUERY = 'SELECT * FROM Negociaciones';
    db.query(SQL_QUERY, (err, result) => {
        if (err) {
            console.error("Error en la consulta: ", err);
            res.status(500).send("Error en la consulta a la base de datos");
            return;
        }
        res.json(result);
    });
});

app.post('/api/login', (req: Request, res: Response): void => {
    const { email, password }: { email?: string; password?: string } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: "Email y contraseña son requeridos" });
        return;
    }

    const SQL_QUERY = 'SELECT * FROM Usuarios WHERE email = ? AND password = ?';

    db.query(SQL_QUERY, [email, password], (err, result) => {
        if (err) {
            console.error("Error en la consulta: ", err);
            res.status(500).json({ success: false, message: "Error en la consulta a la base de datos" });
            return;
        }

        const users = result as any[];

        if (users.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Credenciales incorrectas" });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
