let User = require('./models/User');

var mongoose = require('mongoose');

//remove all coaches
User.remove({role:"coach"}).exec();
User.remove({role:"admin"}).exec();

console.log("===>>>> Inserting dummy data (coaches, admins) <<<<===")

//insert coaches
User.create( 
    {
    
        name: "Ahmed Raza (Coach)",
        email: "coach1@coach.com",
        role: "coach",
        password: "123",
        phoneNumber: "123"
    })

    User.create( 
        {
        
            name: "Rao Ali (Coach)",
            email: "coach2@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Ahmed Asghar (Coach)",
            email: "coach3@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Tehreem Farooq (Coach)",
            email: "coach4@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Mobeen Ali (Coach)",
            email: "coach5@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Haider Bokhari (Coach)",
            email: "coach6@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Govinda Kumar (Coach)",
            email: "coach7@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Abid Ali (Coach)",
            email: "coach8@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Babar Azam (Coach)",
            email: "coach9@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Misbah Khan (Coach)",
            email: "coach10@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Taimoor Aftab (Coach)",
            email: "coach11@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Sara Khan (Coach)",
            email: "coach12@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Usman Atif (Coach)",
            email: "coach13@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Makhdoom Ali (Coach)",
            email: "coach14@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Atir Qureshi (Coach)",
            email: "coach15@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Noman Rao (Coach)",
            email: "coach16@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Hajra Ali (Coach)",
            email: "coach17@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Mesum Bokhari (Coach)",
            email: "coach18@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Aqib Ahmad (Coach)",
            email: "coach19@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Khalid Ali (Coach)",
            email: "coach20@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )


//insert admins


 
User.create( 
        {
        
            name: "Atif Jilani (Admin)",
            email: "admin1@admin.com",
            role: "admin",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Noman Umar (Admin)",
            email: "admin2@admin.com",
            role: "admin",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Muhammad Ali (Admin)",
            email: "admin3@admin.com",
            role: "admin",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Fahad Mumtaz (Admin)",
            email: "admin4@admin.com",
            role: "admin",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
        
            name: "Umar Farooq (Admin)",
            email: "admin5@admin.com",
            role: "admin",
            password: "123",
            phoneNumber: "123"
        }
    )