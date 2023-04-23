INSERT INTO department (id, name )
VALUES (001, "Sales"),
        (002, "HR"),
        (003, "Management")
        ;


INSERT INTO role (id, title, salary, department_id)
VALUES (001, "salesman", 100, 001 ),
        (002, "shrink", 100, 002 ),
        (003, "manager", 100, 003 )
        ;

INSERT INTO employee (id, first_name, last_name, role_id  ,manager_id)
VALUES (001, "Sam", "Russek", 001, 001),
        (002, "Lumi","Cat", 002,002 ),
        (003, "Karen", "Rodea", 003, 003)
        ;