import { Request, Response } from 'express';
import DataController from '../controller/data';

const dataController = new DataController();

class DataHttphHandler{

    rootHandler = (_req: Request, res: Response): void => {
        console.log("Bienvenido");
        res.send("Bienvenido al backend");
    };

    ventasHandler = dataController.getVentas;
    clientesHandler = dataController.getClientes;
    productosHandler = dataController.getProductos;
    negociacionesHandler = dataController.getNegociaciones;
    empresasHandler = dataController.getEmpresas;
    loginHandler = dataController.loginUser;
}

export default DataHttphHandler;
