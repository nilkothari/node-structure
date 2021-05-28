import { Tokens } from 'app-request';
import { AuthFailureError, InternalError } from '../core/ApiError';
import JWT, { JwtPayload } from '../core/JWT';
import { tokenInfo } from '../config';
import { isUUID } from '../helpers/utilities';

export const getAccessToken = (authorization?: string) => {
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1];
  }
  return '';
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.uid ||
    !payload.rid ||
    !payload.perm ||
    !payload.prm ||
    !isUUID(payload.uid) ||
    !isUUID(payload.rid)
  )
    throw new AuthFailureError('Invalid Access Token');
  return true;
};

export const createTokens = async (
  user: any,
  accessTokenKey: string,
  refreshTokenKey: string,
): Promise<Tokens> => {
  const permissions = user.profile.role.permissions.map((param: any) => param.name);
  const accessToken = await JWT.encode(
    new JwtPayload(
      user.id,
      user.profile.role.id,
      `${permissions.join('|')}`,
      accessTokenKey,
      tokenInfo.accessTokenValidityDays,
    ),
  );

  if (!accessToken) throw new InternalError();

  const refreshToken = await JWT.encode(
    new JwtPayload(
      user.id,
      user.profile.role.id,
      'Refresh-Token',
      refreshTokenKey,
      tokenInfo.refreshTokenValidityDays,
    ),
  );

  if (!refreshToken) throw new InternalError();

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  } as Tokens;
};
