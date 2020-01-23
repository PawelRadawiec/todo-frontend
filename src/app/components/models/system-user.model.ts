
export class SystemUser {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}


// @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     private Long id;

//     @Column(name = "first_name")
//     private String firstName;

//     @Column(name = "last_name")
//     private String lastName;

//     @Column(unique = true)
//     private String login;

//     @Column(unique = true)
//     private String email;

//     @Column()
//     private String password;