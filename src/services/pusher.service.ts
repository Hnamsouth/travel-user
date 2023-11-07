import Pusher from 'pusher-js';

const APP_KEY = '47e4e48aead7fea024b6'
const CLUSTER = 'ap1'

export const PusherSV = () => new Pusher(APP_KEY, {
    cluster: CLUSTER,
});