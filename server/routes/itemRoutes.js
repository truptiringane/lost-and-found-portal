import { Router } from 'express'
import {
  createItem, getItems, getMyItems, getStats, getSavedItems,
  toggleSaveItem, getItemById, deleteItem, updateItemStatus,
} from '../controllers/itemController.js'
import { protect } from '../middleware/auth.js'
import upload from '../middleware/upload.js'

const router = Router()

// Specific routes before the /:id catch-all
router.get('/mine', protect, getMyItems)
router.get('/stats', protect, getStats)
router.get('/saved', protect, getSavedItems)

router.get('/', getItems)
router.post('/', protect, upload.array('images', 5), createItem)

router.get('/:id', getItemById)
router.delete('/:id', protect, deleteItem)
router.post('/:id/save', protect, toggleSaveItem)
router.put('/:id/status', protect, updateItemStatus)

export default router
