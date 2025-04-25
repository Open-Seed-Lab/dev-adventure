import { Response, Request, NextFunction } from 'express';
import User, { IUser } from '../models/user.model'
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../models/AuthenticatedRequest';

// export const protRoute: RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = () => {
// }

export const protectRoute = async (
	req: AuthenticatedRequest,
	// res: Response<ApiResponse<any>>,
	// next: NextFunction
	// req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.cookies.jwtToken
		if (!token) {
			res.status(401).json({
				success: false,
				message: 'Unauthorised - No Token Provided'
			})
			return;
		}

		const jwtSecret = process.env.JWT_SECRET_KEY
		if (!jwtSecret) {
			throw new Error('Internal Server Error')
		}

		const decoded = jwt.verify(token, jwtSecret)
		//if (typeof decoded === 'string') {
		//	return res.status(400).json({
		//		success: false,
		//		message: 'Invalid Token Provided'
		//	})
		//}

		const decodedJWT = decoded as JwtPayload
		if (!decodedJWT) {
			res.status(400).json({
				success: false,
				message: 'Invalid Token Provided'
			})
			return;
		}

		const user = await User.findById(decodedJWT.userId).select("-password");

		if (!user) {
			res.status(404).json({
				success: false,
				message: 'User Not found'
			})
			return;
		}

		req.user = user

		next()
	} catch (error) {

	}
}
