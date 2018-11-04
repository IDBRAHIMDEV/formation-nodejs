const express = require('express');
const router = express.Router();

var courses = [
    { id: 1, course: 'Angular' },
    { id: 2, course: 'VueJS' },
    { id: 3, course: 'NodeJS' },
    { id: 4, course: 'Laravel' }
]

router.get('/', (req, res) => {
    res.send(courses);
})

router.get('/:id', (req, res) => {

    course = courses.find((course) => course.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Thie course with the given ID was not found!')
    res.send(course)
})

router.post('/', (req, res) => {
   
    const { error } = validateCourse(req.body);

    if(error) {
        res.status(400).send(error.details);
        return;
    }

    let course = {
        id: courses.length + 1,
        course: req.body.course
    }
    
    courses.push(course);
    res.send(courses);
})

router.put('/:id', (req, res) => {
   
    course = courses.find((course) => course.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Thie course with the given ID was not found!')

    const { error } = validateCourse(req.body);

    if(error) {
        res.status(400).send(error.details);
        return;
    }

    course.course = req.body.course;

    res.send(course);
})

function validateCourse(course) {
    
    const schema = {
        course: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

module.exports = router;