import { app } from '../DB_Manager'
import { getMessaging } from 'firebase/messaging/sw'
const messaging = getMessaging(app);

export default messaging;