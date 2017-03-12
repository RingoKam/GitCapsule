export default function () {
    return (value, filterBy) => {
        return value.filter( m => !filterBy || m.name === filterBy)
    }
}