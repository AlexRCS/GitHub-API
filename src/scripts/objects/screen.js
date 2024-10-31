const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(objUser) {
        this.userProfile.innerHTML = `<div class ="info">
                         <img src="${objUser.avatarUrl}" alt="Foto de perfil do usuário!"/>
                         <div class="data">
                             <h1 class="user-name">${objUser.name ?? "O usuário não possui Nome disponível! 😢"}</h1>
                             <h4 class="followers">Seguidores👥 ${objUser.followers} ||<br> seguindo👀 ${objUser.following}</h4><br>
                             <p class="user-bio">${objUser.bio ?? "o usuário não possui Bio disponível!😢"}</p>

                             
                             
                         </div>
                     </div>`

        let repositoriesItens = ''

        objUser.repositories.forEach(repo => repositoriesItens += `<li><a href ="${repo.html_url}"
                                                                    target="_blank"> ${repo.name}</a></li>`)

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

                    eventsList += `<li id="events-list"><a id="repo-name">${events.repo.name}</a>   
                                                                           <span>-</span>
                                                                           <a id="event-message">${commit.message}</a></li>`
                })
            }
            else {
                eventsList += `<li id="events-list"><a id="repo-name">${events.repo.name}</a>   
                                                                           <span>-</span>
                                                                           <a id="event-message">Sem menssagem de commit</a></li>`
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
    }

}


export { screen }