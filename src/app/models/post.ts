import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

export class Posts {
    handle: string;
    seconds: number;
    text: string;
    user: string;
    public af: AngularFire;

    constructor(handle: string, seconds: number,
        text: string, user: string) {
        this.handle=handle;
        this.seconds=seconds;
        this.text=text;
        this.user=user;
        
    }
}
