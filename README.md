-- used jsonfile for a dummy-DataBase,(fs) module,
-- followed the MVC Principles
-- used ES^6 functionalities

(1) (/user/signup)=> user signup, POST REQ, requires
{"email": "",
"password": "",
"phone": "##########"}

(2) (/user/login) => user login , POST REQ, requires
{
"email": "",
"password": ""
}

(3) (/user/casesfaillogs) => GET REQ, return all failed login events for all users

(4) (/user/singusercase) => POST REQ, return all login events for a single user requires
{
email: ""
}

(5) (/user/dayBefore) => GET REQ, return all events for the day before last

(6) (/user/weekBefore) => GET REQ, return all events for the week before not including session timeout
