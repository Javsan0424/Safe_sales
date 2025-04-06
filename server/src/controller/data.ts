import { Request, Response } from 'express';
import {db} from '../database/db';

class DataController{
    handleQuery = (query: string, res: Response) => {
        db.query(query, (err, result) => {
            if (err) {
                console.error("Error en la consulta: ", err);
                res.status(500).send("Error en la consulta a la base de datos");
                return;
            }
            res.json(result);
        });
    };

    getVentas = (_req: Request, res: Response) => this.handleQuery('SELECT * FROM Ventas', res);
    getClientes = (_req: Request, res: Response) => this.handleQuery('SELECT * FROM Clientes', res);
    getProductos = (_req: Request, res: Response) => this.handleQuery('SELECT * FROM Productos', res);
    getNegociaciones = (_req: Request, res: Response) => this.handleQuery('SELECT * FROM Negociaciones', res);
    getEmpresas = (_req: Request, res: Response) => this.handleQuery('SELECT * FROM Empresas', res);

    loginUser = (req: Request, res: Response): void => {
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
    };
}

export default DataController;
