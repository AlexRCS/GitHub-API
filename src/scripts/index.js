import { getUser } from './services/users.js'
import { getRepositories } from './services/repositories.js'

import { objUser } from './objects/objuser.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmpityImput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const keyPressed = key === 13
    if (keyPressed) {
        if (validateEmpityImput(userName)) return
        getUserData(userName)
    }
})

function validateEmpityImput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo de busca do usuário!')
        return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if (userResponse.message === 'Not Found') {
        screen.renderNotFound()
        return
    }

    console.log('drop')

    const repositoriesResponse = await getRepositories(userName)

    objUser.setInfo(userResponse)
    objUser.setRepositories(repositoriesResponse)
    screen.renderUser(objUser)
}
