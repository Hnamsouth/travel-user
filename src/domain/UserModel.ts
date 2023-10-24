export interface UserModel {
  id: number;
  name: string;
  email:string;
  phone:string;
  gender: 'male' | 'female';
  dob: string;
  lang: 'en' | 'de';
  address: string;
}
