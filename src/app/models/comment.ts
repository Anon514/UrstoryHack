import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

export class Comment {
    first: string;
    email: string;
    last: string;
    handle: string;
    birthday: string;
    public af: AngularFire;

    constructor(first: string, email: string,
        last: string, handle: string, birthday: string) {
        this.first = first;
        this.last = last;
        this.email = email;
        this.handle=handle;
        this.birthday=birthday;
    }
}
