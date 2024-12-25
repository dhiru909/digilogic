import { Request, Response } from 'express'
import { Job } from '../models/Job'
import { JobApplication } from '../models/JobApplication'
import { asyncHandler } from '../utils/asyncHandler'
import { AppError } from '../middleware/errorHandler'
import { uploadToStorage } from '../utils/storage'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { config } from '../config/config'
import { v4 as uuidv4 } from 'uuid'

const s3 = new S3Client({
    region: config.s3Region,
    credentials: {
        accessKeyId: config.s3AccessKey!,
        secretAccessKey: config.s3SecretAccessKey!,
    },
})
// Get all jobs
export const getJobs = asyncHandler(async (req: Request, res: Response) => {
    const jobs = await Job.find({ active: true }).sort('-postedDate')
    res.json(jobs)
})

// Create job
export const createJob = asyncHandler(async (req: Request, res: Response) => {
    const job = new Job(req.body)
    const newJob = await job.save()
    res.status(201).json(newJob)
})

// Update job
export const updateJob = asyncHandler(async (req: Request, res: Response) => {
    const job = await Job.findById(req.params.id)
    if (!job) {
        throw new AppError(404, 'Job not found')
    }

    Object.assign(job, req.body)
    const updatedJob = await job.save()
    res.json(updatedJob)
})

// Delete job
export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
    const job = await Job.findById(req.params.id)
    if (!job) {
        throw new AppError(404, 'Job not found')
    }

    // Soft delete by setting active to false
    job.active = false
    await job.save()
    res.json({ message: 'Job deleted successfully' })
})

// Submit job application
export const submitApplication = asyncHandler(
    async (req: Request, res: Response) => {
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

        // Upload resume to storage
        // const resumeUrl = await uploadToStorage(resumeFile);
        const fileName = `${uuidv4()}-${resumeFile.originalname}`
        const uploadParams = {
          Bucket: config.s3bucket, // The name of your S3 bucket
          Key: 'resume/' + fileName, // The key (path in S3)
          Body: resumeFile.buffer, // The file content
        }
        const putObjectCommand = new PutObjectCommand(uploadParams)
        const response = await s3.send(putObjectCommand)
        console.log(resumeFile.originalname)

        console.dir(response, { depth: null })

        const application = new JobApplication({
            jobId,
            name,
            email,
            phone,
            coverLetter,
            resumeUrl: `https://tapesh.s3.ap-south-1.amazonaws.com/resume/${fileName}`,
        })

        await application.save()
        res.status(201).json(application)
    }
)

// Get all job applications
export const getApplications = asyncHandler(
    async (req: Request, res: Response) => {
        const applications = await JobApplication.find()
            .sort('-appliedDate')
            .populate('jobId', 'title')
        res.json(applications)
    }
)

// Update application status
export const updateApplicationStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const { _id } = req.params
        const { status } = req.body

        const application = await JobApplication.findById(_id)
        if (!application) {
            throw new AppError(404, 'Application not found')
        }

        application.status = status
        const updatedApplication = await application.save()
        res.json(updatedApplication)
    }
)
