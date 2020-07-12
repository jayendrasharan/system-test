export const openModal = (children, data) =>({
    type: 'OPEN_MODAL',
    children,
    data
})

export const closeModal = () =>({
    type: 'CLOSE_MODAL'
})