import { toast , Slide} from 'react-toastify';


export const toastinfo = (message) => {
    toast.info(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
    })
}