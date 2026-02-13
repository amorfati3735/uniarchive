import express from 'express';
import {
    getResources,
    getResourceById,
    createResource,
    updateInteraction,
    addComment
} from '../controllers/resourceController';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.route('/')
    .get(getResources)
    .post(upload.single('file'), createResource);

router.route('/:id').get(getResourceById);

router.route('/:id/comments').post(addComment);

router.route('/:id/:action').post(updateInteraction); // action: view, download, upvote

export default router;
