import { Request, Response } from 'express'
import { Workshop } from '../models/Workshop'
import { WorkshopRegistration } from '../models/WorkshopRegistration'
import { asyncHandler } from '../utils/asyncHandler'
import { AppError } from '../middleware/errorHandler'
import { createObjectCsvStringifier } from 'csv-writer'
import { uploadToS3 } from '../utils/uploadToS3'

// Get all workshops
export const getWorkshops = asyncHandler(
    async (req: Request, res: Response) => {
        const workshops = await Workshop.find().sort({ date: 1 })
        console.log(workshops)
        res.json(workshops)
    }
)

// Create workshop
export const createWorkshop = asyncHandler(
    async (req: Request, res: Response) => {
        const workshop = new Workshop(req.body)
        const newWorkshop = await workshop.save()
        res.status(201).json(newWorkshop)
    }
)

// Update workshop
export const updateWorkshop = asyncHandler(
    async (req: Request, res: Response) => {
        const workshop = await Workshop.findById(req.params.id)
        if (!workshop) {
            throw new AppError(404, 'Workshop not found')
        }

        Object.assign(workshop, req.body)
        const updatedWorkshop = await workshop.save()
        res.json(updatedWorkshop)
    }
)

// Delete workshop
export const deleteWorkshop = asyncHandler(
    async (req: Request, res: Response) => {
        const workshop = await Workshop.findById(req.params.id)
        if (!workshop) {
            throw new AppError(404, 'Workshop not found')
        }

        await workshop.deleteOne()
        res.json({ message: 'Workshop deleted' })
    }
)

// Register for workshop
export const registerForWorkshop = asyncHandler(
    async (req: Request, res: Response) => {
        const { id: workshopId } = req.params
        const { name, email, phone } = req.body
        const paymentProofFile = req.file

        // Validate workshop exists and has capacity
        const workshop = await Workshop.findById(workshopId)
        if (!workshop) {
            throw new AppError(404, 'Workshop not found')
        }
        const hasCapacity = workshop.capacity - workshop.registeredCount
        // const hasCapacity = await validateWorkshopCapacity(workshopId);
        if (hasCapacity < 1) {
            throw new AppError(400, 'Workshop is fully booked')
        }

        // Upload payment proof
        let paymentProofUrl = ''
        if (paymentProofFile) {
            paymentProofUrl = await uploadToS3('payment', paymentProofFile)
        }

        // Create registration
        const registration = new WorkshopRegistration({
            workshopId,
            userId: req.userId,
            userName: name,
            email,
            phone,
            paymentProof: paymentProofUrl,
        })

        await registration.save()
        res.status(201).json(registration)
    }
)

// Get registrations for a workshop
export const getWorkshopRegistrations = asyncHandler(
    async (req: Request, res: Response) => {
        const registrations = await WorkshopRegistration.find({
            workshopId: req.params.workshopId,
        }).sort('-registrationDate')
        res.json(registrations)
    }
)

// Update registration status
export const updateRegistrationStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const { status } = req.body

        const registration = await WorkshopRegistration.findById(id)
        if (!registration) {
            throw new AppError(404, 'Registration not found')
        }

        const workshop = await Workshop.findById(registration.workshopId)
        if (!workshop) {
            throw new AppError(404, 'Workshop not found')
        }

        // If confirming registration, check capacity
        if (status === 'confirmed') {
            const confirmedCount = await WorkshopRegistration.countDocuments({
                workshopId: workshop._id,
                status: 'confirmed',
            })

            if (confirmedCount >= workshop.capacity) {
                throw new AppError(400, 'Workshop is at full capacity')
            }
        }

        registration.status = status
        await registration.save()

        // Update workshop registered count
        if (status === 'confirmed') {
            workshop.registeredCount += 1
            await workshop.save()
        }

        res.json(registration)
    }
)

// Download registrations as CSV
export const downloadRegistrations = asyncHandler(
    async (req: Request, res: Response) => {
        const { registrationIds } = req.body

        const registrations = await WorkshopRegistration.find({
            _id: { $in: registrationIds },
        }).populate('workshopId', 'title')

        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'userName', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'phone', title: 'Phone' },
                { id: 'workshopTitle', title: 'Workshop' },
                { id: 'status', title: 'Status' },
                { id: 'registrationDate', title: 'Registration Date' },
            ],
        })
        console.log(csvStringifier);
        console.log(registrations);
        
        const records = registrations.map((reg) => ({
            userName: reg.userName,
            email: reg.email,
            phone: reg.phone,
            //@ts-ignore
            workshopTitle: reg.workshopId.title,
            status: reg.status,
            registrationDate: new Date(
                reg.registrationDate
            ).toLocaleDateString(),
        }))
        console.log(records);
        
        const csvString = csvStringifier.stringifyRecords(records)

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=registrations.csv'
        )
        res.send(csvString)
    }
)
