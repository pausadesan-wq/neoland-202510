function Logic() {

}

Logic.prototype.registerUser = function(name, email, username, password, passwordRepeat) {
    //rules
/*
if (typeof name !== 'string') throw new Error('invalid name type')
            if (name.length < 1) throw new Error('invalid name length')

            if (typeof surname !== 'string') throw new Error('invalid surname type')
            if (surname.length < 2) throw new Error('invalid surname length')

            if (typeof username !== 'string') throw new Error('invalid username type')
            if (username.length < 4) throw new Error('invalid username length')

            if (typeof password !== 'string') throw new Error('invalid password type')
            if (password.length < 8) throw new Error('invalid password length')

            if (typeof passwordRepeat !== 'string') throw new Error('invalid passwordRepeat type')
            if (passwordRepeat.length < 8) throw new Error('invalid passwordRepeat length')

            if (password !== passwordRepeat) throw new Error('passwords do not match')

            if (typeof role !== 'string') throw new Error('invalid role type')
            if (role !== 'auxiliar' && role !== 'veterinary') throw new Error('invalid role value')

            let user = data.findUserByUsername(username)

            if (user !== null) throw new Error('user already exists')

            user = new User('user-' + data.usersCount, name, surname, username, password, role)

            data.addUser(user)
        }
*/
}

// instance

const logic = new Logic ()