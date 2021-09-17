import { getUserInfo } from '../../usecases/getUserInfo';
import { saveUserInfo } from '../../usecases/saveUserInfo';
import { User } from '../stash/User';

class Auth {
    public constructor() {
        this.Init = this.Init.bind(this);
    }

    private user: User = new User();

    /**
     * Initializes the auth service.
     */
    public async Init(): Promise<void> {
        const { user } = await getUserInfo();
        this.user = user;
    }

    public get loggedUser(): User {
        return this.user;
    }

    public set loggedUser(user: User) {
        saveUserInfo(user);
        this.user = user;
    }
}

const auth = new Auth();
export { auth };
