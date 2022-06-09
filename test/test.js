const getEmployeesMeets = require('../index.js');

test('It count whay employees have been at the office within same time frame', () => {
    expect(
        getEmployeesMeets([
            'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00',
            'RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00',
            'ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'
        ]).toString()
    ).toBe(
        'ASTRID-RENE: 2,ASTRID-ANDRES: 3,RENE-ANDRES: 2'
    )
})

test('It count whay employees have been at the office within same time frame', () => {
    expect(
        getEmployeesMeets([
            'RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00',
            'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'
        ]).toString()
    ).toBe(
        'RENE-ASTRID: 3')
})