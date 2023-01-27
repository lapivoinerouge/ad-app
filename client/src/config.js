const isProduction = process.env.NODE_ENV === 'production'

export const SERVER_URL = isProduction ? '' : 'http://localhost:8000'

export const IMAGES_URL = `${SERVER_URL}/uploads/`
export const API_URL = `${SERVER_URL}/api`
export const AUTH_URL = `${SERVER_URL}/auth`