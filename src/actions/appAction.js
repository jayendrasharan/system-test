/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 10:40 PM
 */

const showModal = (payload) => {
    return ({
        type: "APP_SHOW_MODAL",
            payload,
    })
}

const hideModal = () => ({
    type: "APP_HIDE_MODAL"
})

export {
    showModal,
    hideModal,
}