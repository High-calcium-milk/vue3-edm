import mockRequest from './mockRequest'
import edmRequest from './edmRequest'
export const getHotSinger = (key) => edmRequest({
    url: 'hotSinger/' + key,
    method: 'GET'
})
export const getBanner = () => edmRequest({
    url: 'homeBanner',
    method: 'GET'
})
export const getHotSong = () => edmRequest({
    url: 'hotSong',
    method: 'GET'
})
export const getList = (key) => edmRequest({
    url: 'list/' + key,
    method: 'GET'
})
export const getSearchMusic = (key) => edmRequest({
    url: 'searchMusic/' + key,
    method: 'GET'
})
export const setUser = (data) => edmRequest({
    url: 'setUser',
    method: 'POST',
    data,
})
export const addRemove = (data, user) => edmRequest({
    url: 'addRemove/' + data + '/' + user,
    method: 'GET',
})
export const changePW = (data, obj) => edmRequest({
    url: 'changePW/' + data,
    method: 'POST',
    data: obj
})
export const changeName = (data, obj) => edmRequest({
    url: 'changeName/' + data,
    method: 'POST',
    data: obj
})