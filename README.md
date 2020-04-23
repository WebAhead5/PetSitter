# PetSitter

## Contents
- [Task](#Task)
- [ ] [Introduction](#introduction)
- [Initial Concept](#Initial-Concept)
- [ ] [Final Product](#)
- [Code Structure](#Code-Structure)
    - [SQL CRUD Guidelines](#SQL-CRUD-Guidelines)
    - [server route paths](#server-route-paths)
    - [Front-end Logic Stricture](#front-end-logic-Stricture)
- [Work Splitting](#Work-Splitting)
- [Difficulties](#Difficulties)
- [ ] [Credits](#)


# Task
Our goal this week was to build a website associated with database and all the work surrounding it.

## introduction

One of the main Project aims was to build a website that includes all the materials we learned until now, from front-end until the database. Second we we wanted to make sure that every one from the team members work on everything and split up the work according to that we will talk about that in next sections as well.


## Initial Concept
our initial concept was to build an app similar to the concept art below:



![](https://i.imgur.com/FiyXpx0.png)

 - intoduction page
     - here the user can either register as a sitter or enter as a user
 - sitter registration page
     - here the user specifies is details, availability hours and the cost he asks for 
 - "enter as a user" 
     - leads the user to the "search page for sitter"
     - here the user enter his credentials and the hours servicec hours he's seeking
 - the search result page
     - here the user recieves a list of the sitters he can reserve
     - by hitting the reserve button, the sitter won't be availabe for these hours in the next search




--------------------------

## Code Structure

before and while we worked on the project we took some time to plan the working proccess thoroughly which helped us split the work between the group members.

<br>

the main code flow:
![the main code flow](https://i.imgur.com/q9CNhcc.png)

<br>


we even took time to plan and design some the code guidelines for the project, such as:


--------------------------
### SQL CRUD Guidelines
- <u>readAll</u>(cb)
    - returns the entire table
    -  cb = (err,rows)=>{}
- <u>read</u>(count, offset.cb)
    -  returns the number of elements starting from the offset index
    -  cb = (err,rows)=>{} 
- <u>count</u>(cb)
    - returns the number of rows
    - cb = (error,count) => {}
- <u>create</u>(obj,cb)
    - obj - key value pairs matching the column name and their values
    - cb => (err)=>{}
- <u>isInputValid</u>(obj) : boolean
    - recieves an object representing the column names and the values to add
    - returns true if the input is valid
- <u>delete</u>(id, cb)
    - cb = (err)=>{}

- <u>[reservation table only]</u> updateReserved(isReserved,cb)
    - cb = (err)=>{}

--------------------------

### server route paths
- #### **/sitter**
    - **get** params:
        - [optional] count
        - [optional] offset    
        - without params - return all data
    - **post**
 recieves a json object with the following keys:
        - name (: string)
        - startingHr (: string - HH:MM)
        - EndHr (: string - HH:MM)
        - cost (: string or number)

- ####  **/reservations**
    - **get** params:
        - [optional] count
        - [optional] offset    
        - without params - return all data
    - **post**
 recieves a json object with the following keys:
        - name (: string)
        - phone (: string or number)
        - startingHr (: string - HH:MM)
        - EndHr (: string - HH:MM)
        - sitterId (: string or number)
        
- ####  **/availableSitters?start=...&end=...**
    - returns an array of sitters that are available between the provided hours 
(: string - HH:MM)

<div style="display:flex;justify-content:center;justify-items:center; width:100%">
    <table style="width:max-content" >
        <tr>
            <td colSpan="2">
            <B>object keys for the SQL create functions</B>
            </td>
        </tr>
        <tr>
            <td>sitter</td>
            <td>reservation</td>
        </tr>
        <tr>
            <td>
                <ul>       
                    <li>name</li>
                    <li>startingHr</li>
                    <li>EndHr</li>
                    <li>cost</li>
                </ul>
            </td>
            <td>
                <ul>       
                    <li>name</li>
                    <li>phone</li>
                    <li>startingHr</li>
                    <li>EndHr</li>
                    <li>sitterId</li>
                </ul>
            </td>
        </tr>
    </table>
</div>

--------------------------

### front-end logic Stricture
- <u> getAllReservations(cb) </u>
    - cb: (error, jsonObj)=> {}
- <u>getReservations(count,offset,cb) </u>
    - count: the number of elements to 
    - offset: the index to start the retrival from
    - cb: (error, jsonObj)=> {}
- <u>addReservation(name,phone,startingHour,endHour,sitterId,cb) </u>
    - cb: (err) =>{}
- <u>getAllSitters(cb) </u>
    - cb: (error, jsonObj)=> {}
- <u>getSitters(count,offset,cb) </u>
    - count: the number of elements to 
    - offset: the index to start the retrival from
    - cb: (error, jsonObj)=> {}
- <u>addSitter(name,phone,startingHour,endHour,cb) </u>
    - cb: (err) =>{}

--------------------------

## Work Splitting

one of our primary goals in this week's project was to split the work as evenly as possible, so the eveyone will get to do a little bit of everything

<details>
  <summary>our initial split + todos</summary>


- **<u>Marwan + Morad:</u>**
    - server
        - [x] /reservation route
        - [x] validate /reservation with params
            (check if the params that were passsed are valid)
    - SQL
        - reserveCRUD
            - [ ] read
            - [x] readAll
            - [x] count
            - [x] delete
            - [x] create
            - [ ] ~~updateReserved~~
            - [x] isInputValid
    - [x] logic
        - [x] send a get request to /sitters
        - [x] send a get request to /sitters with params
        - [x] send a post request to /sitters
    - [ ] dom
        - [ ] link the "sitter registration form" with the logic
        - [ ] link the "search button" with the logic

        

        
- **<u>Moris + Khaled</u>**
    - server
        - [x] /sitters route
        - [ ] redirect user after adding an item to the sitters list
        - [x] validate /sitters with params
    - SQL
        - settirsCRUD
            - [x] read
            - [x] readAll
            - [x] count
            - [x] delete
            - [x] create
            - [x] isInputValid
    - logic
        - [x] send a get request to /reservation
        - [x] send a get request to /reservation with params
        - [x] send a post request to /reservation
    - dom
        - [ ] link the "reserve button" with the logic
        - [ ] link the "sitters list" with the logic
   
- **<u>testing</u>**
    - [x] test server (router)
    - [ ] test database
    - [ ] test logic?


- **<u>Others</u>**
    - [x]<b>join both tables to get all available sitters</b> 
    - [x]read me file
    - [ ]host page on Heroku
    - [ ]host db on Heroku 
    - [ ]push envirement keys to Heroku
    - [ ]Security - protect against script injections
    - [ ]accessibility
    
</details>

<br>

and obviously we sidetracked aloootttttttt and the split got a lil messy (some waanted to work on some very specific topics only.. so.. 🤷‍♂️🤷‍♂️🤷‍♂️) , but I can gladly say that we successfully managed to achieve about 80% of the split


## Difficulties

to name a few:
- time management
    - we were unable to achive all the bullet points we had initially planned.
    - creating the database took us more time the we first anticipated
    - on the first day we split into groups of two, in two different breakout rooms and we ended up working on the same common parts code parts... which lead to the loss of a lot of precious hours. 

- defining everything in the project before hand
    - while we did manage to plan most of the work beforehand, we ended up facing some really turning point decisions later on that we could've avoided.
- not all the team members ended up wotking on their weaker spots
    - if we were to follow out initial planning it could've been achieved. (I also blame the lack of time aad our semi high goals
    
- some code struggles we had to work out way out of by drawing & planning 
![](https://i.imgur.com/5Y9BIIV.png)



https://hackmd.io/zTqnvGRaQDSIadxALDIFjQ?both
https://hackmd.io/@qkHgX7jGSCC3bWyVhIsGgQ/BJC4WrRuU/edit
