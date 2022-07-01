import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LogService } from './log.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private logService: LogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    console.log(1);

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logService.saveLogInDatabase(
            Date.now() - now,
            context.switchToHttp().getRequest().url,
          ),
        ),
      );
  }
}
