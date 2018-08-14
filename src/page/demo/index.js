import css from './index.less';
import iHtml from './index.ejs';
$('#root').html(iHtml);
$('img').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    console.log('-----------test')
});
