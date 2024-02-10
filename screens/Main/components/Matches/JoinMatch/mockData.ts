import { Match } from "../../../../../models/Match"
import { User } from "../../../../../models/User"

export const mockData: Match[] = [
  {
    date: "2024-02-05",
    time: "10:00",
    court: "F8",
    playersPerTeam: 4,
    ownerId: "test1",
    whiteTeam: [
      {
        id: "test1",
        name: "Champi",
        goals: 3,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fme.jpeg?alt=media&token=ab25c3f8-a036-4703-8539-034f051b09ed",
        email: "test@test.com"
      },
      {
        id: "test2",
        name: "Cristian Mejia",
        goals: 10,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437",
        email: "test@test.com"
      },
      {
        id: "test3",
        name: "Andres Correa",
        goals: 2,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubircorrea.jpeg?alt=media&token=d5910673-c34f-4d2f-99d3-2332b1a515af",
        email: "test@test.com"
      },
      {
        id: "test4",
        name: "Fredy Quintero",
        goals: 1,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirfredy.jpeg?alt=media&token=da4975bf-56d0-4c33-8739-1251dce3a744",
        email: "test@test.com"
      }
    ],
    blackTeam: [
      {
        id: "test5",
        name: "Juanda",
        goals: 1,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirjuanda.jpeg?alt=media&token=20132049-aa53-4789-8706-e6296969e539",
        email: "test@test.com"
      },
      {
        id: "test6",
        name: "Jose Monroy",
        goals: 1,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirmonroy.jpeg?alt=media&token=a9cbc752-ddce-4f83-a56b-113e8456d380",
        email: "test@test.com"
      },
      {
        id: "test7",
        name: "Nepe",
        goals: 5,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirnepe.jpeg?alt=media&token=da69d071-50e3-459d-8979-5aa686f4b37a",
        email: "test@test.com"
      },
      {
        id: "test8",
        name: "Pipe",
        goals: 2,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirpipe.jpeg?alt=media&token=de4ec99b-61e5-4f5e-a7c2-f7253ac4c535",
        email: "test@test.com"
      },
    ],    
  },
  {
    date: "2024-02-01",
    time: "14:00",
    court: "F8",
    playersPerTeam: 4,
    ownerId: "test2",
    whiteTeam: [
      {
        id: "test1",
        name: "Champi",
        goals: 3,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fme.jpeg?alt=media&token=ab25c3f8-a036-4703-8539-034f051b09ed",
        email: "test@test.com"
      },
      {
        id: "test2",
        name: "Cristian Mejia",
        goals: 10,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437",
        email: "test@test.com"
      },
      {
        id: "test3",
        name: "Andres Correa",
        goals: 2,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubircorrea.jpeg?alt=media&token=d5910673-c34f-4d2f-99d3-2332b1a515af",
        email: "test@test.com"
      },
      {
        id: "test4",
        name: "Fredy Quintero",
        goals: 1,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirfredy.jpeg?alt=media&token=da4975bf-56d0-4c33-8739-1251dce3a744",
        email: "test@test.com"
      }
    ],
    blackTeam: [
      {
        id: "test5",
        name: "Juanda",
        goals: 1,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirjuanda.jpeg?alt=media&token=20132049-aa53-4789-8706-e6296969e539",
        email: "test@test.com"
      },
      {
        id: "test6",
        name: "Jose Monroy",
        goals: 1,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirmonroy.jpeg?alt=media&token=a9cbc752-ddce-4f83-a56b-113e8456d380",
        email: "test@test.com"
      },
      {
        id: "test7",
        name: "Nepe",
        goals: 5,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirnepe.jpeg?alt=media&token=da69d071-50e3-459d-8979-5aa686f4b37a",
        email: "test@test.com"
      },
      {
        id: "test8",
        name: "Pipe",
        goals: 2,
        avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirpipe.jpeg?alt=media&token=de4ec99b-61e5-4f5e-a7c2-f7253ac4c535",
        email: "test@test.com"
      },
    ],    
  }
]

export const mockUser: User = {
  id: "test2",
  name: "Cristian Mejia",
  goals: 10,
  avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437",
  email: "test@test.com"
};