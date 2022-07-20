const createCarousel = config => {
    const {
        selector,
        images,
        trigger
    } = config

    const even = images.length % 2 === 0
    const activeImageIndex = Math.floor(images.length / 2)
    const container = document.querySelector(selector)
    const html = `
        <ul${even ? ' class="even"' : ''}>
            ${images.map((image, index) => `
                <li${index === activeImageIndex ? ' class="active"' : ''}>
                    <img
                        data-target="img"
                        src="${image.src}"
                        alt="${image.alt}"
                    />
                </li$>
            `).join('')}
        </ul>
        <div class="arrows">
            <span class="left" data-target="left">⬅️</span>
            <span class="right" data-target="right">➡️</span>
        </div>
    `

    let transform = even ? -250 : 0
    let index = activeImageIndex
    
    container.innerHTML = html

    container.addEventListener('click', event => {
        const target = event.target
        const carousel = container.querySelector('ul')
        const activeElement = container.querySelector('.active')

        switch (target.dataset.target) {
            case 'img':
                if (trigger !== 'hover') {
                    target.classList.toggle('zoom')
                } 
            break
            case 'left':
                if (index !== 0) {
                    index--
                    transform += 500
                    carousel.style.transform = `translateX(${transform}px)`
    
                    activeElement.classList.remove('active')
                    activeElement.previousElementSibling.classList.add('active')
                }
            break
            case 'right':
                if (index !== images.length - 1) {
                    index++
                    transform -= 500
                    carousel.style.transform = `translateX(${transform}px)`
    
                    activeElement.classList.remove('active')
                    activeElement.nextElementSibling.classList.add('active')
                }
            break
        }
    })

    if (trigger === 'hover') {
        container.addEventListener('mouseover', event => {
            if (event.target.dataset.target === 'img') {
                event.target.classList.add('zoom')
            }
        })

        container.addEventListener('mouseout', event => {
            if (event.target.dataset.target === 'img') {
                event.target.classList.remove('zoom')
            }
        })
    }
}

const images = [
    {
        src: 'https://images.unsplash.com/photo-1656464868371-602be27fd4c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        alt: '',
    },
    {
        src: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=60',
        alt: '',
    },
    {
        src: 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        alt: '',
    },
    {
        src: 'https://images.unsplash.com/photo-1630588605884-0f6b41505180?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60',
        alt: '',
    },
    {
        src: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHVuaXZlcnNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60',
        alt: '',
    },
    {
        src: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHVuaXZlcnNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        alt: '',
    },
    {
        src: 'https://images.unsplash.com/photo-1612686635542-2244ed9f8ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAyfHx1bml2ZXJzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        alt: '',
    }
]

createCarousel({
    selector: '.carousel',
    trigger: 'click',
    images
})
