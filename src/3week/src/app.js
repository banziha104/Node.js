import { Baseball } from './baseball';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css';

$(() => {
    const mainEl = $('main')
        , resultBoardEl = $('#result-board')
        , buildResultTemplate = (guess, result) =>
            `<li class="list-group-item">
                ${guess}
                <span class="badge">${result}</span>                            
            </li>`;

    $('#start-btn').click(e => {
        const digit = $('#digit').val();
        if (digit) {
            startGame(digit);
            mainEl.addClass('started');
        }
    })

    function startGame(digit) {
        const baseball = new Baseball(digit);
        console.log(baseball.answer);
        $('input#guess').keypress(e => {
            if (e.which === 13) {
                const val = $('input#guess').val(),
                    guessNum = val.split('')
                        .map(v => Number(v)), 
                    result = baseball.getResult(guessNum)
                        
                resultBoardEl.append(buildResultTemplate(val, result));
                if (result === '3S0B') {
                    alert(`${val} 정답을 맞추셨습니다`);
                    resetGame();
                }
            }
        });
    }

    function resetGame() {
        mainEl.removeClass('started');
        resultBoardEl.empty();
        $('input#guess').unbind('keypress');
    }
});
