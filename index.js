const db = require('./db');
const mysql = require('mysql');
const inquirer = require('inquirer');
requrie('console.table');


// to do setup main promt function
const questions = () => {
    inquirer.prompt([
        { 
            type: 'list',
            name : "answer",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ]
        },
    ])
    .then ((res => {
      let aswer = res.answer;
        switch (answer) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateEmployeeRole();
                break;
            case "Exit":
                db.end();
                break;
        }
    }


  addDepartment() {
       inquirer.prompt([
          {
            name: "name",
            message: "What is the name of the department?"
          }
        ])
          .then(res => {
            let name = res;
            db.createDepartment(name)
              .then(() => console.log(`Added ${name.name} to the database`))
              .then(() => loadMainPrompts())
          })
      }

const addRole = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'What is the department id of the role?'
    }])
    .then(roleInfo => {
        console.log(roleInfo);
        db.query('INSERT INTO role SET ?', roleInfo, (err, res) => {
            if (err) throw err;
            console.log('Role added');
            questions();
        })
    }
}
const addEmployee = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'first_name',
    message: 'What is the first name of the employee?',
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'What is the last name of the employee?',
  },
  {
    type: 'input',
    name: 'role_id',
    message: 'What is the role id of the employee?',
  },
  {
    type: 'input',
    name: 'manager',
    choices: ['yes','no',]
  },
])
.then(init=> {
  switch(init.manger¿) {
    case 'yes':
      db.query('INSRT INTO employee SET ?', init, (err, res) => {
        if (err) throw err;
        console.log('err');
      }
    })
    questions();
    break;
    case 'no':
      inquirer.prompt([{
        type: 'input',
        name: 'manager_id',
        message: 'What is the manager id of the employee?',
      }])
    .then((suborinate) => {
    delete addEmployee.manger
    let newEmployee = {...addEmployee, ...suborinate}
    manger_id = suborinate.manager_id
    }
    db.query('INSRT INTO employee SET ?', newEmployee, (err, res) => {
      if (err) throw err;
      console.log('err');
    }
      questions();
  })
})
}
})
}
const updateEmployeeRole = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'id',
    message: 'What is the id of the employee?',
  },
  {
    type: 'input',
    name: 'first_name',
    message: 'What is the first name of the employee?',
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'What is the last name of the employee?',
  },
  {
    type: 'input',
    name: 'role_id',
    message: 'What is the role id of the employee?',
  },
  {
    type: 'input',
    name: 'manager',
    choices: ['yes','no',]
  },
])
  .then((updateEmployeeRole) => {
    db.query(
      'UPDATE employee SET ? WHERE id= ${updateEmployeeRole.id}',
      updateEmployeeRole,
      (err, res) => {
        if (err) throw err;
        console.log('err');
      }
    );
    console.log('Employee updated');
    questions();
    });
              
}
const viewDepartments = () => {
    db.query('SELECT * FROM department', (err, department) => {
        console.log(err);
    }else{
        console.log(department);
        questions();
    }
}
const viewRoles = () => {
  db.query('SELECT * FROM role', (err, role) => {
    if (err) {
      console.log(err);
    } else {
      console.log(role);
      questions();
    }
  });
};
const viewEmployees = () => {
  db.query('SELECT * FROM employee', (err, employee) => {
    if (err) {
      console.log(err);
    } else {
      console.log(employee);
      questions();
    }
  });
};
questions();


    
    



