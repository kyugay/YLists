import { Injectable } from '@angular/core';

import { UserService } from './services/user.service';

@Injectable()
export class AppService {

    constructor(private userService: UserService) { }

    public appInit(): Promise<void> {
        return new Promise<void>((resolve, _) => {
            this.userService.getCurrentUser().subscribe(_ => resolve());
        });
    }
}
