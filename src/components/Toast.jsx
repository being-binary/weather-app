import { toast , Flip} from 'react-toastify';


export const toastinfo = (message) => {
    toast.info(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Flip,
    })
}