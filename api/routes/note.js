import express from "express";
const router = express.Router();

// Import Schemma
import Note from '../models/notes';

// POST ROUTER
router.post('/new-note', async (req, res) => {
    const body = req.body;
    try {
        const noteDB = await Note.create(body);
        res.status(200).json(noteDB);
    } catch (error) {
        return res.status(500).json({
            message: `Shit Happens ${error}`,
            error
        })
    }
});

// GET ROUTER
router.get('/note/:id', async (req, res) => {
    const _id = req.params.id;
    console.log('req', req.params);
    try {
        const notaDB = await Note.findOne({
            _id
        });
        res.json(notaDB);
    } catch (error) {
        return res.status(400).json({
            message: `Shit Happens ${error}`,
            error
        })
    }
});

// GET ALL
router.get('/notes', async (req, res) => {
    try {
        const noteGETA = await Note.find();
        res.json(noteGETA);
    } catch (error) {
        return res.status(400).json({
            message: `Shit Happens ${error}`,
            error
        })
    }
});

// DELETE
router.delete('/note/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const noteDEL = await Note.findByIdAndDelete({
            _id
        });
        if (!noteDEL) {
            return res.status(400).json({
                message: 'Id not found',
                error
            })
        }
        res.json(noteDEL);
    } catch (error) {
        return res.status(400).json({
            message: `Shit Happens ${error}`,
            error
        })
    }
});

// UPDATE
router.put('/note/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const updateDB = await Note.findByIdAndUpdate(
            _id,
            body, {
                new: true
            }
        );
        res.json(updateDB);
    } catch (error) {
        return res.status(500).json({
            message: `Shit Happens ${error}`,
            error
        })
    }
})

// Export config to express app
module.exports = router;