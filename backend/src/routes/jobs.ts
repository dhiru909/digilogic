import { Router } from 'express'
import multer from 'multer'
import {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
    submitApplication,
    getApplications,
    updateApplicationStatus,
} from '../controllers/jobController'

const router = Router()

// Configure multer for file uploads
const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            cb(null, true)
        } else {
            cb(
                new Error(
                    'Invalid file type. Only PDF and DOC files are allowed.'
                )
            )
        }
    },
})

// Job routes
router.get('/', getJobs)
router.post('/', createJob)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)

// Application route
router.post('/apply', upload.single('resume'), submitApplication)
// Application management routes
router.get('/applications', getApplications)
router.patch('/applications/:_id/status', updateApplicationStatus)

export default router
