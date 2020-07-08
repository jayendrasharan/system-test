export default function debounce(fn, delay){
    let timer;
    return function(){
        const args = arguments;
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
};