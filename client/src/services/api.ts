import axios from "axios";
import { Product } from "../types/index";
import { Cate, Enquiry } from "../types/enquiry";
import { Job, JobApplication } from "@/types/career";
import { Workshop, WorkshopRegistration } from "@/types/workshop";
const API_URL = "http://localhost:5000/api";
export const BACKEND_URL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// const API_URL = "http://13.201.98.33:5000/api";
// export const BACKEND_URL = "http://13.201.98.33:5000";
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};

export const getEnquiries = async (cates: Cate[]): Promise<Enquiry[]> => {
  const response = await axios.get(`${API_URL}/enquiries`, {
    params: {
      status: cates,
    },
  });
  return response.data;
};

export const createEnquiry = async (
  enquiry: Omit<Enquiry, "_id" | "status" | "createdAt">
): Promise<Enquiry> => {
  const response = await axios.post(`${API_URL}/enquiries`, enquiry);
  return response.data;
};

export const updateEnquiryStatus = async (
  id: string,
  status: Enquiry["status"]
): Promise<Enquiry> => {
  const response = await axios.patch(`${API_URL}/enquiries/${id}/status`, {
    status,
  });
  return response.data;
};

export const deleteEnquiry = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/enquiries/${id}`);
};

// Job endpoints
export const getJobs = async (): Promise<Job[]> => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data;
};

export const createJob = async (
  job: Omit<Job, "id" | "postedDate">
): Promise<Job> => {
  const response = await axios.post(`${API_URL}/jobs`, job);
  return response.data;
};

export const updateJob = async (
  id: string,
  job: Partial<Job>
): Promise<Job> => {
  const response = await axios.put(`${API_URL}/jobs/${id}`, job);
  return response.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/jobs/${id}`);
};

export const submitApplication = async (formData: FormData): Promise<void> => {
  await axios.post(`${API_URL}/jobs/apply`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getApplications = async (): Promise<JobApplication[]> => {
  const response = await axios.get(`${API_URL}/jobs/applications`);
  return response.data;
};

export const updateApplicationStatus = async (
  id: string,
  status: string
): Promise<JobApplication> => {
  const response = await axios.patch(
    `${API_URL}/jobs/applications/${id}/status`,
    { status }
  );
  return response.data;
};

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${API_URL}/products/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response.data.url;
}

// Workshop APIs
export const getWorkshops = async (): Promise<Workshop[]> => {
  const response = await axios.get(`${API_URL}/workshops`);
  return response.data;
};

export const createWorkshop = async (
  data: Partial<Workshop>
): Promise<Workshop> => {
  const response = await axios.post(`${API_URL}/workshops`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateWorkshop = async (
  id: string,
  data: Partial<Workshop>
): Promise<Workshop> => {
  const response = await axios.put(`${API_URL}/workshops/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteWorkshop = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/workshops/${id}`, {
    withCredentials: true,
  });
};

export const registerForWorkshop = async (
  workshopId: string,
  formData: FormData
): Promise<void> => {
  await axios.post(`${API_URL}/workshops/${workshopId}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
export const updateRegistrationStatus = async (
  id: string,
  status: "confirmed" | "rejected"
): Promise<void> => {
  await axios.patch(
    `${API_URL}/workshops/registrations/${id}/status`,
    { status },
    { withCredentials: true }
  );
};
export const getRegistrations = async (
  id: string
): Promise<WorkshopRegistration[]> => {
  const response = await axios.get(`${API_URL}/workshops/${id}/registrations`, {
    withCredentials: true,
  });
  return response.data;
};

export const downloadRegistrations = async (
  registrationIds: string[]
): Promise<void> => {
  const response = await axios.post(
    `${API_URL}/workshops/registrations/download`,
    { registrationIds },
    {
      responseType: "blob",
      withCredentials: true,
    }
  );

  // Create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "workshop-registrations.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
};
