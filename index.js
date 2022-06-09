const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

// Function to transform hour:minuture format to miliseconds to handler
const miliseconds = (time) => {
    let tp = time.split(":");
    return (+tp[0] * (60000 * 60)) + (+tp[1] * 60000)
};

// Function to transform data in to objects
const getEmployees = (data) => {

    let employees = [];

    data.forEach(employee => {
        if (employee.length > 0) {

            if (employee.replace('\r', '').length <= 0)
                return

            let e = employee.replace('\r', '').split('=')
            let dates = [];

            e[1].split(',').forEach(date => {
                dates.push({
                    day: date.substring(0, 2),
                    times: date.substring(2, date.length).split('-').map((x) => {
                        return miliseconds(x);
                    })
                })
            });

            employees.push(
                {
                    name: e[0],
                    dates: dates.sort()
                }
            )
        }
    });

    return employees
}

// Function to count employees meets time frame
function getEmployeesMeets(content) {

    let employees = getEmployees(content);

    let meets = []
    employees.forEach(emp1 => {
        employees.filter(x => x.name != emp1.name).forEach(emp2 => {
            if (meets.find(x => x.search(`${emp2.name}-${emp1.name}`) >= 0) != null || meets.find(x => x.search(`${emp1.name}-${emp2.name}`) >= 0) != null)
                return;

            let count = 0;
            for (let j = 0; j < days.length; j++) {
                let day1 = emp1.dates.find(x => x.day == days[j])
                let day2 = emp2.dates.find(x => x.day == days[j])
                if (day1 && day2) {
                    if (!(day1.times[1] <= day2.times[0] || day1.times[0] >= day2.times[1]))
                        count++;
                }
            }

            meets.push(`${emp1.name}-${emp2.name}: ${count}`)
        });
    });
    return meets;
}

let fs = require('fs');

let fileData = fs.readFileSync('inputs.txt', 'utf-8').toString().split("\n");

// Run main function
getEmployeesMeets(fileData).forEach(element => console.log(element))

module.exports = getEmployeesMeets