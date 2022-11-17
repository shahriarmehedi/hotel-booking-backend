const swaggerDocumentation = {

    openapi: '3.0.0',
    info: {
        title: 'Hotel booking API',
        version: '1.0.0',
        description: 'This is the documentation for the hotel booking API',
        contact: {
            name: 'Hotel booking API',
            url: "https://hotel-booking-backend-ngyx.onrender.com/api-docs/"
        },
        servers: ["https://hotel-booking-backend-ngyx.onrender.com/api-docs/"],
    },

    servers: [
        {
            url: 'https://hotel-booking-backend-ngyx.onrender.com/',
            description: 'Test server',
        },
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },

    ],



    tags: [
        {
            name: 'User',
            description: 'API for users in the system',
        },
        {
            name: 'Login',
            description: 'API for login in the system',
        },
        {
            name: 'Signup',
            description: 'API for signup in the system',
        },
        {
            name: 'Hotel',
            description: 'API for hotels in the system',
        }
    ],

    paths: {
        '/user': {

            get: {
                tags: ['User'],
                summary: 'Get all users',
                description: 'Get all users',
                operationId: 'getUsers',
                parameters: [],
                // set token in header
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Users were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
            post: {
                tags: ['User'],
                description: 'Create user',
                summary: 'Create user',
                operationId: 'createUser',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'User created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },

        },

        '/user/{id}': {
            get: {
                tags: ['User'],
                summary: 'Get user by id',
                description: 'Get user by id',
                operationId: 'getUserById',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of user to return',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'User was obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
            put: {
                tags: ['User'],
                description: 'Update user',
                summary: 'Update user by id',
                operationId: 'updateUser',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '200': {
                        description: 'User updated',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
            delete: {
                tags: ['User'],
                description: 'Delete user',
                summary: 'Delete user by id',
                operationId: 'deleteUser',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of user to return',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'User deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
        },


        '/login': {
            post: {
                tags: ['Login'],
                description: 'Login user',
                operationId: 'loginUser',
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Login',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '200': {
                        description: 'User logged in',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Login',
                                },
                            },

                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
        },
        '/signup': {
            post: {
                tags: ['Signup'],
                description: 'Signup user',
                operationId: 'signupUser',
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Signup',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '200': {
                        description: 'User signed up',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Signup',
                                },
                            },

                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
        },

        '/hotel': {
            get: {
                tags: ['Hotel'],
                summary: 'Get all hotels',
                description: 'Get all hotels',
                operationId: 'getHotels',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Hotels were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Hotel',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
            post: {
                tags: ['Hotel'],
                description: 'Create hotel',
                summary: 'Create hotel',
                operationId: 'createHotel',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Hotel',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Hotel created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Hotel',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
        },

        '/hotel/{id}': {
            get: {
                tags: ['Hotel'],
                summary: 'Get hotel by id',
                description: 'Get hotel by id',
                operationId: 'getHotelById',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of hotel to return',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Hotel was obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Hotel',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
            put: {
                tags: ['Hotel'],
                description: 'Update hotel',
                summary: 'Update hotel by id',
                operationId: 'updateHotel',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Hotel',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Hotel updated',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Hotel',
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ['Hotel'],
                description: 'Delete hotel',
                summary: 'Delete hotel by id',
                operationId: 'deleteHotel',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of hotel to return',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Hotel deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Hotel',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
        },


    },


    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the user',
                    },
                    username: {
                        type: 'string',
                        description: 'Username of the user',
                    },
                    email: {
                        type: 'string',
                        description: 'Email of the user',
                    },
                    password: {
                        type: 'string',
                        description: 'Password of the user',
                    },
                    role: {
                        type: 'string',
                        description: 'Role of the user',
                    },
                },
            },
            Login: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        description: 'Email of the user',
                    },
                    password: {
                        type: 'string',
                        description: 'Password of the user',
                    },
                },
            },
            Signup: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the user',
                    },
                    email: {
                        type: 'string',
                        description: 'Email of the user',
                    },
                    username: {
                        type: 'string',
                        description: 'Username of the user',
                    },
                    password: {
                        type: 'string',
                        description: 'Password of the user',
                    },
                    role: {
                        type: 'string',
                        description: 'Role of the user',
                    },
                },
            },
            Hotel: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the hotel',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the hotel',
                    },
                    rating: {
                        type: 'number',
                        description: 'Rating of the hotel',
                    },
                    halalRating: {
                        type: 'number',
                        description: 'Halal rating of the hotel',

                    },
                    price: {
                        type: 'number',
                        description: 'Price of the hotel',
                    },
                    image: {
                        type: 'string',
                        description: 'Image of the hotel',
                    },
                    amenities: {
                        type: 'array',
                        description: 'Amenities of the hotel',
                        items: {
                            type: 'string',
                        },
                    },
                    gallery: {
                        type: 'array',
                        description: 'Gallery of the hotel',
                        items: {
                            type: 'string',
                        },
                    },
                    location: {
                        type: 'string',
                        description: 'Location of the hotel',
                    },
                    city: {
                        type: 'string',
                        description: 'City of the hotel',
                    },
                    address: {
                        type: 'string',
                        description: 'Address of the hotel',
                    },
                    country: {
                        type: 'string',
                        description: 'Country of the hotel',
                    },
                    thumbnail: {
                        type: 'string',
                        description: 'Thumbnail of the hotel',
                    },
                    HotelReview: {
                        type: 'array',
                        description: 'Reviews of the hotel',
                        items: {
                            type: 'string',
                        },
                    },
                    HotelRoom: {
                        type: 'array',
                        description: 'Rooms of the hotel',
                        items: {
                            type: 'string',
                        },
                    }
                },





            },

        },
    },

};



module.exports = swaggerDocumentation;
