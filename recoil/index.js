import { atom, } from 'recoil';

export const data = atom({
  key: 'data',
  default: {
    members: [],
    pointWithUser: {},
    dataGroupByUserByDate: {},
    dataGroupByUserByWeek: {}
  }
})

export const members = atom({
  key: 'members',
  default: [],
})

export const pointWithUser = atom({
  key: 'pointWithUser'
})

export const dataGroupByUserByDate = atom({
  key: 'dataGroupByUserByDate'
})

export const dataGroupByUserByWeek = atom({
  key: 'dataGroupByUserByWeek'
})