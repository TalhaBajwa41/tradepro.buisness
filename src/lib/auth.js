import jwt from 'jsonwebtoken';

export function verifyToken(request) {
  try {
    const authHeader = request.headers.get('authorization');
    console.log('Auth Header:', authHeader); // DEBUG LOG
    
    if (!authHeader) {
      throw new Error('No authorization header');
    }
    
    // Remove 'Bearer ' prefix if present
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;
    
    console.log('Extracted Token:', token); // DEBUG LOG
    console.log('Token parts:', token?.split('.').length); // DEBUG LOG
    
    // Verify token is not empty and has correct format
    if (!token || token.split('.').length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error.message);
    throw error;
  }
}