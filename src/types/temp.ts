export type Doctor = {
  fullName: string;
  phoneNumber: number;
  dob: string;
  _id: string;
};

export type Patient = {
  fullName: string;
  phoneNumber: number;
  dob: string;
  _id: string;
};

export type Order = {
  doctor: Doctor;
  patient: Patient;
  color: string;
  material: string;
  services: Service[];
};

export type Service = {
  name: string;
  teethNo: string;
  quantity: number;
};
