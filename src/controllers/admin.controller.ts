import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();


import { sendResponse, sendErrorResponse } from "../services/common";
import { HttpStatus } from "../services/common";
import { send } from "process";


const createOrganizationRegistrationRequestBody = z.object({
    name: z.string().min(1, "Organization name is required"),
    emails: z.array(z.string().email()).nonempty("At least one email is required"),
    AdminName: z.string().min(1, "Admin name is required"),
    AdminEmail: z.string().email("Invalid email format"),
    AdminAge: z.number().int().positive("Age must be a positive integer"),
    AdminPhone: z.string().min(10, "Phone number must be at least 10 digits long"),
    AdminPreferences: z.array(z.string()), // Adjust this based on your preferences structure
    AdminGender: z.string(),
    AdminPassword: z.string().min(8, "Password must be at least 8 characters long"),
});





class AdminController {

    async getAdminHome(req: Request, res: Response): Promise<any> {
        try {
            sendResponse(res, HttpStatus.OK, {
                success: true,
                message: "Admin Home",
                data: null,
                error: null
            });
        } catch (error) {
            return sendErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong while fetching admin home");
        }
    }


    /*
        Route: /api/admin/createOrganization |  Method: POST    | req.body: OrganizationRegistrationRequestBody | res: { success: boolean, message: string, data: null | any, error: null | any }
        Description: Create a new organization and its admin user
    */

    async createOrganization(req: Request, res: Response): Promise<any> {
        try {

            const parsed = createOrganizationRegistrationRequestBody.safeParse(req.body);

            if (!parsed.success) {
                return sendErrorResponse(res, HttpStatus.BAD_REQUEST, parsed.error.errors[0].message);
            }

            const { name, emails, AdminName, AdminEmail, AdminAge, AdminPhone, AdminPreferences, AdminGender, AdminPassword } = parsed.data;

            const hashedPassword = await bcrypt.hash(AdminPassword, 10);


            //step 1: create user
            const user = await prisma.user.create({
                data: {
                    name: AdminName,
                    email: AdminEmail,
                    phone: AdminPhone,
                    age: AdminAge,
                    preferences: AdminPreferences,
                    gender: AdminGender,
                    password: hashedPassword,
                }
            })

            //step 2: create organization
            const organization = await prisma.organization.create({
                data: {
                    name: name,
                    emails: [AdminEmail],
                    adminId: user.id
                }
            })

            sendResponse(res, HttpStatus.CREATED, {
                success: true,
                message: "Organization created successfully",
                data: {
                    organization: {
                        id: organization.id,
                        name: organization.name,
                        emails: organization.emails,
                        adminId: organization.adminId
                    },
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        age: user.age,
                        preferences: user.preferences,
                    }
                },
                error: null
            });

        } catch (error) {
            return sendErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong while creating organization");
        }
    }


}

export default new AdminController();