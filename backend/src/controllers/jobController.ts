/**
 * Job controller
 *
 * This controller handles all the routes related to jobs such as creating, updating, deleting, and retrieving job data.
 * It also handles job applications and their status.
 */
import { Request, Response } from 'express'
import { Job } from '../models/Job'
import { JobApplication } from '../models/JobApplication'
import { asyncHandler } from '../utils/asyncHandler'
import { AppError } from '../middleware/errorHandler'
import { uploadToS3 } from '../utils/uploadToS3'

/**
 * Get all jobs
 *
 * This route returns all active jobs sorted by posted date in descending order.
 */
export const getJobs = asyncHandler(async (req: Request, res: Response) => {
    try {
        const jobs = await Job.find({ active: true }).sort('-postedDate')
        res.json(jobs)
    } catch (error) {
        throw new AppError(500, 'Internal Server Error')
    }
})

/**
 * Create job
 *
 * This route creates a new job and returns the new job data.
 */
export const createJob = asyncHandler(async (req: Request, res: Response) => {
    try {
        const job = new Job(req.body)
        const newJob = await job.save()
        res.status(201).json(newJob)
    } catch (error) {
        throw new AppError(500, 'Internal Server Error')
    }
})

/**
 * Update job
 *
 * This route updates a job and returns the updated job data.
 */
export const updateJob = asyncHandler(async (req: Request, res: Response) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) {
            throw new AppError(404, 'Job not found')
        }

        Object.assign(job, req.body)
        const updatedJob = await job.save()
        res.json(updatedJob)
    } catch (error) {
        throw new AppError(500, 'Internal Server Error')
    }
})

/**
 * Delete job
 *
 * This route soft deletes a job by setting the active field to false.
 */
export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) {
            throw new AppError(404, 'Job not found')
        }

        // Soft delete by setting active to false
        job.active = false
        await job.save()
        res.json({ message: 'Job deleted successfully' })
    } catch (error) {
        throw new AppError(500, 'Internal Server Error')
    }
})

/**
 * Submit job application
 *
 * This route creates a new job application and returns the new application data.
 * It also checks if the user has already applied for the job or not.
 */
export const submitApplication = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const { jobId, name, email, phone, coverLetter } = req.body
            const resumeFile = req.file

            if (!resumeFile) {
                throw new AppError(400, 'Resume file is required')
            }

            if (!name || !email || !phone || !coverLetter) {
              throw new AppError(400, 'All fields are required')
          }

            // Check if job exists and is active
            const job = await Job.findOne({ _id: jobId, active: true })
            if (!job) {
                throw new AppError(404, 'Job not found or no longer active')
            }

            // check if previously applied or not
            const alreadyApplied = await JobApplication.findOne({
                jobId,
                email,
            })
            if (alreadyApplied) {
                throw new AppError(400, 'You have already applied for this job')
            }

            let url = ""
            try{
                url = await uploadToS3("resume",resumeFile)
            }catch(err){
                throw new AppError(400,"Failed to upload image")
            }

            const application = new JobApplication({
                jobId,
                name,
                email,
                phone,
                coverLetter,
                resumeUrl:url,
            })

            await application.save()
            res.status(201).json(application)
        } catch (error) {
            throw new AppError(500, 'Internal Server Error')
        }
    }
)

/**
 * Get all job applications
 *
 * This route returns all job applications sorted by applied date in descending order.
 */
export const getApplications = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const applications = await JobApplication.find()
                .sort('-appliedDate')
                .populate('jobId', 'title')
            res.json(applications)
        } catch (error) {
            throw new AppError(500, 'Internal Server Error')
        }
    }
)

/**
 * Update application status
 *
 * This route updates the status of a job application and returns the updated application data.
 */
export const updateApplicationStatus = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const { _id } = req.params
            const { status } = req.body

            const application = await JobApplication.findById(_id)
            if (!application) {
                throw new AppError(404, 'Application not found')
            }

            application.status = status
            const updatedApplication = await application.save()
            res.json(updatedApplication)
        } catch (error) {
            throw new AppError(500, 'Internal Server Error')
        }
    }
)


