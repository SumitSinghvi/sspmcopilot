import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getData() {
  let token: any = localStorage.getItem('token');
  if (!token) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/records/token`);
      token = res.data.token; 
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/records/ `,
    {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function postData(data : any) {
  let token: any = localStorage.getItem('token');
  if (!token) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/records/token`);
      token = res.data.token; 
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/records/ `,
    data,
    {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function updateData(data : any, id: string) {
  let token: any = localStorage.getItem('token');
  if (!token) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/records/token`);
      token = res.data.token; 
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  }

  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/records/${id} `,
    data,
    {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function generateGPT(data : any) {
  let token: any = localStorage.getItem('token');
  if (!token) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/records/token`);
      token = res.data.token; 
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  }

  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/chatgpt/`,
    data,
    {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
