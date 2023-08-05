

let output = "";

let button = document.querySelectorAll('.butt');

Array.from(button).forEach((butt) => {
    butt.addEventListener('click', (event) => {
        if (event.target.innerHTML == 'ENTER') {
            try {
                output = evalExpression(output);
                document.querySelector('input').value = output;
            } catch (error) {
                document.querySelector('input').value = 'Error';
            }
        }
        else if (event.target.innerHTML == 'AC') {
            output = "";
            document.querySelector('input').value = output;
        }
        else if (event.target.innerHTML == 'DEL') {
            output = output.slice(0, -1);
            document.querySelector('input').value = output;
        }
        else if (event.target.innerHTML == 'ans') {
            document.querySelector('input').value = output;
        }
        else {
            console.log(event.target);
            output = output + event.target.innerHTML;
            document.querySelector('input').value = output;
        }
    })
});

function evalExpression(expression) {
    const safeExpression = expression.replace(/[^-()\d/*+.]/g, '');
    return eval(safeExpression);
}