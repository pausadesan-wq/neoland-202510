import { logger } from '../../logger'

const images = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTI4ZWVra2M0eW03ZHY3Y3Via2NhOGh3Y3htbTMxb2pqYzl2bXpnbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AwNGX4XvvODO8/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTI4ZWVra2M0eW03ZHY3Y3Via2NhOGh3Y3htbTMxb2pqYzl2bXpnbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Zu6AATBpCeUzm/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzB1ZGJ2amdmbHZzbHZxZXVoYzc0d3JwZXJ0NXg0dW81dTVjdjE4biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pVXyJy2k7WO1n49bGg/giphy.gif'
]

export const Spinner = () => {
    logger.debug('Spinner -> call')

    const randomIndex = Math.floor(Math.random() * images.length)
    const randomImage = images[randomIndex]

    logger.debug('Spinner -> render')

    return <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <img className="w-20 h-20 object-cover" src={randomImage} />
        <p>Loading...</p>
    </div>
}