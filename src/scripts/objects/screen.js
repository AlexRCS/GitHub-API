const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(objUser) {
        this.userProfile.innerHTML =       `<div class ="info">
                                                <img src="${objUser.avatarUrl}" alt="Foto de perfil do usuário!"/>
                                                <div class="data">
                                                    <h1 class="user-name">${objUser.name ?? "O usuário não possui Nome disponível! 😢"}</h1>
                                                    <h4 class="followers">Seguidores👥 ${objUser.followers}</h4>
                                                    <h4 class="following">Seguindo👀 ${objUser.following}</h4><br>
                                                    <p class="user-bio">${objUser.bio ?? "o usuário não possui Bio disponível!😢"}</p>                             
                                                </div>
                                            </div>`


        let repositoriesItens = ''

        objUser.repositories.forEach(repo => repositoriesItens += `<li><a href ="${repo.html_url}"
                                                                    target="_blank"> ${repo.name}
                                                                    <div class="repo-stats">
                                                                    <div class="repo-icons">🍴${repo.forks}</div>
                                                                    <div class="repo-icons">⭐${repo.stargazers_count}</div>
                                                                    <div class="repo-icons">👀${repo.watchers}</div>
                                                                    <div class="repo-icons">💻${repo.language}</div>
                                                                    </div></a></li>`)

        if (objUser.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositorios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsList = ''

        objUser.event.forEach(events => {
            if (events.type === 'PushEvent') {
                events.payload.commits.forEach(commit => {

                    eventsList += `<li class="events-list"><div class="event-repo">${events.repo.name} -</div>   
                                                                        
                                                                           <div class="event-message">${commit.message}</div></li>`
                })
            }
            else {
                eventsList += `<li class="events-list"><div class="event-repo">${events.repo.name} -</div>   
                                                                           
                                                                           <div class="event-message">Sem mensagem de commit</div></li>`
            }
        })

        if (eventsList) {
            this.userProfile.innerHTML += `<section class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsList}</ul>
                                            </section>`

        }
    },


    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado!</h3>'
    },

}


export { screen }