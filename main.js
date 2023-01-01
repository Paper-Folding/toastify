import Toastify from './lib/toastify-es';
import "bootstrap-icons/font/bootstrap-icons.css";

const toast = Toastify({
    text: "This is a toast   ",
    duration: -1,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "rgb(25,135,84)",
        fontSize: '1.5em',
        borderRadius: '6px',
        boxShadow: '3px -3px 8px 1px rgba(0,0,0,0.20)',
    },
    avatar: 'bi-heart',
    offset: {
        x: 20,
        y: 20
    }
});


toast.showToast();

