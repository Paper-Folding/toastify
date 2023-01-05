import Toastify from './lib/toastify-es';
import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * show my customized toast
 * @param text text content
 * @param duration duration to show, -set to "-1" to show permanently
 * @param preset color preset to show
 * @param { iconClassName, background, border, fontColor } style configurations that will be overwrite(if passed) with preset
 */
function showToast(text = "", duration = 3000, preset = null, { iconClassName = undefined, background = undefined, border = undefined, fontColor = undefined }) {
    let styleToApply = {
        iconClassName,
        background,
        border,
        fontColor
    };
    Object.keys(styleToApply).forEach(key => styleToApply[key] === undefined && delete styleToApply[key]);  // remove undefined style
    if (preset) {
        let presetStyle = {};
        switch (preset) {
            case 'success':
                presetStyle = {
                    iconClassName: 'bi-check-lg',
                    background: '#d1e7dd',
                    border: '1px solid #a3cfbb',
                    fontColor: '#146c43'
                }
                break;
            case 'warning':
                break;
            case 'danger':
                break;
        }
        styleToApply = { ...presetStyle, ...styleToApply };
    }
    Toastify({
        text,
        duration,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            color: styleToApply.fontColor,
            background: styleToApply.background,
            fontSize: '1.5em',
            borderRadius: '6px',
            border: styleToApply.border,
            boxShadow: '3px -3px 8px 1px rgba(0,0,0,0.20)',
        },
        avatar: styleToApply.iconClassName,
        offset: {
            x: 20,
            y: 20
        }
    }).showToast();
}

showToast("Hello World!", 10000, 'success');

