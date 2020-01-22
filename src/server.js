const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

const Student = require("./assets/Student");
const dateFormating = require('date-formatting-ali');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use(express.json());

const http = require('./assets/httpService');
const assetsService = require('./assets/assetsService');


async function homePage(req, res) {
    const data = await http.requestCall('https://api.themoviedb.org/3/movie/popular?api_key=35f56655abea307238a45161d4ce8e1e', '', 'GET');
    const movie = [];
    data.results.forEach((item) => {
        movie.push({
            image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            title: item.original_title,
        })
    });

    const styles = await assetsService.getStyles('home-page');
    const script = await assetsService.getScripts('home-page');

    const pugData = {
        movie,
        styles,
        script
    };
    
    res.render('home-page', pugData);
}

async function search(req, res) {
    const data = await http.requestCall(`https://api.themoviedb.org/3/search/movie?api_key=35f56655abea307238a45161d4ce8e1e&query=${req.query.search}`, '', 'GET');
    const movie = [];
    data.results.forEach((item) => {
        movie.push({
            image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            title: item.original_title,
        })
    });
    const styles = await assetsService.getStyles('home-page');
    const script = await assetsService.getScripts('home-page');

    const pugData = {
        movie,
        script,
        styles
    };

    console.log(movie);
    res.render('home-page', pugData);
}

async function topRated(req, res) {
    const data = await http.requestCall(`https://api.themoviedb.org/3/movie/top_rated?api_key=35f56655abea307238a45161d4ce8e1e&page=${req.query.page}`, '', 'GET');
    const fields = req.query.fields ? req.query.fields.split(',') : [];
    let allResult = {};
    let allMovie;
    let start = req.query.start ? Number(req.query.start) : 0;
    let end = req.query.end ? Number(req.query.end) : 20;

    const slicedResults = data.results.slice(start, end + 1);

    if (fields.length) {
        allMovie = slicedResults.map((item, index) => {
            let temp = {
                number: index
            };

            fields.forEach((field) => {
                temp[field] = item[field];
            });

            return temp
        });
    }

    allResult = {
        page: req.query.page,
        totalresults: data.total_results,
        total_pages: data.total_pages,
        result: allMovie || slicedResults
    };

    res.send(allResult);
}


function test(req, res) {                               
    const dateFormatted = dateFormating.format('mm-dd-yyyy-[kawasaki]-hh-min-ss' , new Date());
    res.send(dateFormatted);
}

app.get('/', homePage);
app.get('/search', search);
app.get('/api_data/top-rated', topRated);
app.get('/student', Student.getStudent)
app.post('/student', Student.insertStudent)
app.put('/student', Student.updateStudent)
app.delete('/student', Student.removeStudent)
app.get('/date', test)

app.listen(3000, () => console.log('127.0.0.1:3000'));
