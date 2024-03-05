interface UploadedBy {
  _id: string;
  username: string;
  email: string;
}

interface AdoptionHistoryItem {
  _id: string;
  date: string;
}

interface FosteringHistoryItem {
  _id: string;
  startDate: string;
}

export interface Pet {
  _id: string;
  name: string;
  category: string;
  images: string[];
  age: number;
  gender: string;
  size: string;
  description?: string | null; // Make optional
  status: string;
  uploadedBy: UploadedBy;
  adoptionHistory?: AdoptionHistoryItem[]; // Make optional
  fosteringHistory?: FosteringHistoryItem[]; // Make optional
}
