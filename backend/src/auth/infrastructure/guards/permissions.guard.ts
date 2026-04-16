import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core/services/reflector.service';
import { GqlExecutionContext } from '@nestjs/graphql/dist/services/gql-execution-context';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required || required.length === 0) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user || !user.role || !user.role.permissions?.length) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso',
      );
    }

    const hasAllPermissions = required.every((requiredPerm) =>
      user.rol.permissions.some(
        (userPerm: { name: string }) => userPerm.name === requiredPerm,
      ),
    );
    if (!hasAllPermissions) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso',
      );
    }
    return true;
  }
}
