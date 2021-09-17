import { BehaviorSubject, Observable } from 'rxjs';
import { getUserInfo } from '../../usecases/getUserInfo';
import { saveUserInfo } from '../../usecases/saveUserInfo';
import { User } from '../stash/User';

class Auth {
    public constructor() {
        this.Init = this.Init.bind(this);
        this.userSubject = new BehaviorSubject<User>(new User());
        this.user$ = this.userSubject.asObservable();
    }

    private user: User = new User();

    // User subject.
    private userSubject;

    // User observable.
    private user$: Observable<User>;

    /**
     * Initializes the auth service.
     */
    public async Init(): Promise<void> {
        const { user } = await getUserInfo();
        this.user = user;
        this.userSubject.next(user);
    }

    /**
     * Gets logged user.
     */
    public get loggedUser(): User {
        return this.user;
    }

    /**
     * Sets logged user.
     */
    public set loggedUser(user: User) {
        saveUserInfo(user);
        this.user = user;
        this.userSubject.next(user);
    }

    /**
     * Returns the user.
     * @returns {User} a user.
     */
    public subscribeToUser(observer: ((user: User) => void)): (() => void) {
        const subscription = this.user$.subscribe(observer);
        return () => {
            subscription.unsubscribe();
        };
    }
}

const auth = new Auth();
export { auth };
