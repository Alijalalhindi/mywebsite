const titles = document.querySelectorAll('.title');

titles.forEach((title) => {
    title.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(title.innerHTML);
    })
});



const formserach = document.querySelector('.search');
    formserach.addEventListener('submit',(e)=> {
    e.preventDefault();

    console.log('e.target', e.target);
    const inputdata = e.target.querySelector('input.data');
    window.location.replace(`search?search=${inputdata.value}`);    
});
