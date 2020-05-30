let User = require('./models/User');

var mongoose = require('mongoose');

//remove all coaches
User.remove({role:"coach"}).exec();
User.remove({role:"admin"}).exec();

console.log("===>>>> Inserting dummy data (coaches, admins) <<<<===")

//insert coaches
User.create( 
    {
        _id: mongoose.Types.ObjectId('154237499191442806967488'),
        name: "Ahmed Raza (Coach)",
        email: "coach1@coach.com",
        role: "coach",
        password: "123",
        phoneNumber: "123"
    })

    User.create( 
        {
            _id: mongoose.Types.ObjectId('822276808369006591404769'),
            name: "Rao Ali (Coach)",
            email: "coach2@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('914420173043840310350834'),
            name: "Ahmed Asghar (Coach)",
            email: "coach3@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('871580485503263878323443'),
            name: "Tehreem Farooq (Coach)",
            email: "coach4@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('362852240509076741746581'),
            name: "Mobeen Ali (Coach)",
            email: "coach5@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('463799269825050652338804'),
            name: "Haider Bokhari (Coach)",
            email: "coach6@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('882926639578545056232499'),
            name: "Govinda Kumar (Coach)",
            email: "coach7@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('121841186077525354630397'),
            name: "Abid Ali (Coach)",
            email: "coach8@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('800890683885239949450384'),
            name: "Babar Azam (Coach)",
            email: "coach9@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('145685655368288795245964'),
            name: "Misbah Khan (Coach)",
            email: "coach10@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('776355791919436623385471'),
            name: "Taimoor Aftab (Coach)",
            email: "coach11@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('702677462621390047737619'),
            name: "Sara Khan (Coach)",
            email: "coach12@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('994614194720061613483469'),
            name: "Usman Atif (Coach)",
            email: "coach13@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('170354616530645060165696'),
            name: "Makhdoom Ali (Coach)",
            email: "coach14@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('581322468881331271035466'),
            name: "Atir Qureshi (Coach)",
            email: "coach15@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('746446515837952360789980'),
            name: "Noman Rao (Coach)",
            email: "coach16@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('023021429476642800682513'),
            name: "Hajra Ali (Coach)",
            email: "coach17@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('102465529556702452541670'),
            name: "Mesum Bokhari (Coach)",
            email: "coach18@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('837290345771834812213264'),
            name: "Aqib Ahmad (Coach)",
            email: "coach19@coach.com",
            role: "coach",
            password: "123",
            phoneNumber: "123"
        }
    )

    User.create( 
        {
            _id: mongoose.Types.ObjectId('970614340200118034653506'),
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