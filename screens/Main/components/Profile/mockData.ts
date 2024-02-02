export interface User {
  id: string;
  name: string;
  email: string;
  goals: string;
  profilePicture?: string;
}

export const mockUser: User = {
  id: 'ABCD1234',
  name: 'Cristian Mejia',
  email: 'papito1093@hotmail.com',
  goals: '10',
  profilePicture:
    'https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437'
};
