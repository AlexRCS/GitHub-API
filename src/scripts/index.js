import { getUser } from './services/users.js'
import { getRepositories } from './services/repositories.js'
import { getEvents } from './services/events.js'

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



    const repositoriesResponse = await getRepositories(userName)
    repositoriesResponse.forEach(repo => {
        if (repo.language === null){
            repo.language = 'N/A'
        }});

    objUser.setInfo(userResponse)
    objUser.setRepositories(repositoriesResponse)

    const eventsResponse = await getEvents(userName)
    objUser.setEvents(eventsResponse.filter(e => e.type === 'CreateEvent' || e.type === 'PushEvent'))

    screen.renderUser(objUser)

    console.log(userResponse)
    console.log(eventsResponse)
    console.log(repositoriesResponse)

}
