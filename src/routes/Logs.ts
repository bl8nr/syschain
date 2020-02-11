import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { sha256, sha224 } from 'js-sha256';

const router = Router();


/* ************************************* */
/* GET ALL LOG TRANSACTIONS FROM A BLOCK */
/* ************************************* */
router.get('/', async (req: Request, res: Response) => {
    try {
        return res.status(OK).json({
            request: "/",
            identity: "",
            timestamp: Date(),
            data: "data"
        });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


/* *********************************** */
/* POST A LOG TRANSACTION TO THE BLOCK */
/* *********************************** */
router.post('/', async (req: Request, res: Response) => {
    try {
        return res.status(OK).json({
            success: true
        });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/* ******************************* */
/* RETURN AN ERROR ON PUT REQUESTS */
/* ******************************* */
router.put('/:id', async (req: Request, res: Response) => {
    return res.status(BAD_REQUEST).json({
        error: "PUT requests are not supported on immutable ledgers."
    });
});

/* ********************************** */
/* RETURN AN ERROR ON DELETE REQUESTS */
/* ********************************** */
router.delete('/:id', async (req: Request, res: Response) => {
    return res.status(BAD_REQUEST).json({
        error: "DELETE requests are not supported on immutable ledgers."
    });
});

export default router;