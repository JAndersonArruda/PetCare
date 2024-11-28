class User {
    constructor(userModel) {
        this.user = userModel;
    }

    async get() {
        const users = await this.user.findAll();
        return users;
    }

    async createUser(userDTO) {
        await this.user.create(userDTO);        
    }
}


export default User;