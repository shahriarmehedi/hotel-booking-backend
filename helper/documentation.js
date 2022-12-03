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
            name: 'Login',
            description: 'API for login in the system',
        },
        {
            name: 'Signup',
            description: 'API for signup in the system',
        },
        {
            name: 'User',
            description: 'API for users in the system',
        },
        {
            name: 'Hotel',
            description: 'API for hotels in the system',
        },
        {
            name: 'Amenities',
            description: 'API for amenities in the system',
        },
        {
            name: 'Hotel Room',
            description: 'API for hotel rooms in the system',
        },
        {
            name: 'Hotel Room Type',
            description: 'API for hotel room types in the system',
        },
        {
            name: 'Halal Rating',
            description: 'API for halal ratings in the system',
        },
        {
            name: 'Hotel Review',
            description: 'API for hotel reviews in the system',
        },
        {
            name: 'Activities',
            description: 'API for activities in the system',
        },
        {
            name: 'Transfers',
            description: 'API for transfers in the system',
        },
        {
            name: 'Holiday Packages',
            description: 'API for holiday packages in the system',
        },
        {
            name: 'Insurances',
            description: 'API for insurances in the system',
        },
        {
            name: 'Booking',
            description: 'API for bookings in the system',
        },
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

        '/hotelRoom': {
            get: {
                tags: ['Hotel Room'],
                summary: 'Get all hotel rooms',
                description: 'Get all hotel rooms',
                operationId: 'getHotelRooms',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Hotel rooms were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelRoom',
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
                tags: ['Hotel Room'],
                description: 'Create hotel room',
                summary: 'Create hotel room',
                operationId: 'createHotelRoom',
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
                                $ref: '#/components/schemas/HotelRoom',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Hotel room created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelRoom',
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

        '/hotelRoom/{id}': {
            get: {
                tags: ['Hotel Room'],
                summary: 'Get hotel room by id',
                description: 'Get hotel room by id',
                operationId: 'getHotelRoomById',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of hotel room to return',
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
                        description: 'Hotel room was obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelRoom',
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
                tags: ['Hotel Room'],
                description: 'Update hotel room',
                summary: 'Update hotel room by id',
                operationId: 'updateHotelRoom',
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
                                $ref: '#/components/schemas/HotelRoom',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Hotel room updated',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelRoom',
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ['Hotel Room'],
                description: 'Delete hotel room',
                summary: 'Delete hotel room by id',
                operationId: 'deleteHotelRoom',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of hotel room to return',
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
                        description: 'Hotel room deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelRoom',
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

        '/hotelRoomType': {
            get: {
                tags: ['Hotel Room Type'],
                summary: 'Get all hotel room types',
                description: 'Get all hotel room types',
                operationId: 'getHotelRoomTypes',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Hotel room types were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelRoomType',
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
                tags: ['Hotel Room Type'],
                description: 'Create hotel room type',
                summary: 'Create hotel room type',
                operationId: 'createHotelRoomType',
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
                                $ref: '#/components/schemas/HotelRoomType',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Hotel room type created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelRoomType',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },

            '/hotelRoomType/{id}': {
                get: {
                    tags: ['Hotel Room Type'],
                    summary: 'Get hotel room type by id',
                    description: 'Get hotel room type by id',
                    operationId: 'getHotelRoomTypeById',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'ID of hotel room type to return',
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
                            description: 'Hotel room type was obtained',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/HotelRoomType',
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
                    tags: ['Hotel Room Type'],
                    description: 'Update hotel room type',
                    summary: 'Update hotel room type by id',
                    operationId: 'updateHotelRoomType',
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
                                    $ref: '#/components/schemas/HotelRoomType',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Hotel room type updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/HotelRoomType',
                                    },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ['Hotel Room Type'],
                    description: 'Delete hotel room type',
                    summary: 'Delete hotel room type by id',
                    operationId: 'deleteHotelRoomType',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'ID of hotel room type to return',
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
                            description: 'Hotel room type deleted',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/HotelRoomType',
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


        '/amenities': {
            get: {
                tags: ['Amenities'],
                summary: 'Get all amenities',
                description: 'Get all amenities',
                operationId: 'getAmenities',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Amenities were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Amenities',
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
                tags: ['Amenities'],
                description: 'Create amenities',
                summary: 'Create amenities',
                operationId: 'createAmenities',
                parameters: [

                ],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Amenities',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Amenities created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Amenities',
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


        '/hotelReview': {
            get: {
                tags: ['Hotel Review'],
                summary: 'Get all hotel reviews',
                description: 'Get all hotel reviews',
                operationId: 'getHotelReviews',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Hotel reviews were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelReview',
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
                tags: ['Hotel Review'],
                description: 'Create hotel review',
                summary: 'Create hotel review',
                operationId: 'createHotelReview',
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
                                $ref: '#/components/schemas/HotelReview',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Hotel review created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelReview',
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

        '/hotelReview/{hotelId}': {
            get: {
                tags: ['Hotel Review'],
                summary: 'Get all hotel review of a hotel',
                description: 'Get hotel review by id',
                operationId: 'getHotelReviewById',
                parameters: [
                    {
                        name: 'hotelId',
                        in: 'path',
                        description: 'ID of hotel review to return',
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
                        description: 'Hotel review was obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelReview',
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

        '/hotelReview/{userId}': {
            get: {
                tags: ['Hotel Review'],
                summary: 'Get all hotel review of a user',
                description: 'Get hotel review by id',
                operationId: 'getHotelReviewByUserId',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID of hotel review to return',
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
                        description: 'Hotel review was obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HotelReview',
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


        '/halalRating': {
            get: {
                tags: ['Halal Rating'],
                summary: 'Get all halal ratings',
                description: 'Get all halal ratings',
                operationId: 'getHalalRatings',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Halal ratings were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HalalRating',
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
                tags: ['Halal Rating'],
                description: 'Create halal rating',
                summary: 'Create halal rating',
                operationId: 'createHalalRating',
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
                                $ref: '#/components/schemas/HalalRating',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Halal rating created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HalalRating',
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

        '/halalRating/{id}': {
            put: {
                tags: ['Halal Rating'],
                description: 'Update halal rating',
                summary: 'Update halal rating',
                operationId: 'updateHalalRating',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of halal rating to update',
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/HalalRating',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '200': {
                        description: 'Halal rating updated',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HalalRating',
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
                tags: ['Halal Rating'],
                description: 'Delete halal rating',
                summary: 'Delete halal rating',
                operationId: 'deleteHalalRating',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of halal rating to delete',
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
                        description: 'Halal rating deleted',
                    },
                    '500': {
                        description: 'Server error',
                    },
                },
            },
        },

        '/activities': {
            get: {
                tags: ['Activities'],
                summary: 'Get all activities',
                description: 'Get all activities',
                operationId: 'getActivities',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Activities were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Activities',
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
                tags: ['Activities'],
                description: 'Create activity',
                summary: 'Create activity',
                operationId: 'createActivity',
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
                                $ref: '#/components/schemas/Activities',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Activity created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Activities',
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

        '/transfers': {
            get: {
                tags: ['Transfers'],
                summary: 'Get all transfers',
                description: 'Get all transfers',
                operationId: 'getTransfers',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Transfers were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Transfers',
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
                tags: ['Transfers'],
                description: 'Create transfer',
                summary: 'Create transfer',
                operationId: 'createTransfer',
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
                                $ref: '#/components/schemas/Transfers',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Transfer created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Transfers',
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

        '/insurances': {
            get: {
                tags: ['Insurances'],
                summary: 'Get all insurances',
                description: 'Get all insurances',
                operationId: 'getInsurances',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],



                    },
                ],
                responses: {
                    '200': {
                        description: 'Insurances were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Insurances',
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
                tags: ['Insurances'],
                description: 'Create insurance',
                summary: 'Create insurance',
                operationId: 'createInsurance',
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
                                $ref: '#/components/schemas/Insurances',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Insurance created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Insurances',
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

        '/holidayPackages': {
            get: {
                tags: ['Holiday Packages'],
                summary: 'Get all holiday packages',
                description: 'Get all holiday packages',
                operationId: 'getHolidayPackages',
                parameters: [],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Holiday packages were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HolidayPackages',
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
                tags: ['Holiday Packages'],
                description: 'Create holiday package',
                summary: 'Create holiday package',
                operationId: 'createHolidayPackage',
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
                                $ref: '#/components/schemas/HolidayPackages',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Holiday package created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HolidayPackages',
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
                        type: 'string',
                        description: 'Rating of the hotel',
                    },
                    halalRatingTotal: {
                        type: 'string',
                        description: 'Halal rating of the hotel',
                    },
                    halalRating: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'Name of the halal rating',
                                },
                                percentage: {
                                    type: 'string',
                                    description: 'Percentage of the halal rating',
                                },
                            },
                        },
                    },
                    amenities: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'Name of the amenity',
                                },
                                price: {
                                    type: 'string',
                                    description: 'Price of the amenity',
                                }
                            },
                        },

                    },

                    roomType: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'Name of the room type',
                                },
                                description: {
                                    type: 'string',
                                    description: 'Description of the room type',
                                },
                                price: {
                                    type: 'string',
                                    description: 'Price of the room type',
                                },
                                cancellation: {
                                    type: 'string',
                                    description: 'Cancellation of the room type',
                                },
                                payment: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                        description: 'Payment of the room type',
                                    },
                                },
                                image: {
                                    type: 'string',
                                    description: 'Image of the room type',
                                },
                                bed: {
                                    type: 'string',
                                    description: 'Bed of the room type',
                                },
                                meals: {
                                    type: 'string',
                                    description: 'Meals of the room type',
                                },
                                thumbnail: {
                                    type: 'string',
                                    description: 'Thumbnail of the room type',
                                },


                            },


                        },

                    },


                    price: {
                        type: 'string',
                        description: 'Price of the hotel',
                    },
                    slug: {
                        type: 'string',
                        description: 'Slug of the hotel',
                    },
                    language: {
                        type: 'array of strings',
                        description: 'Language of the hotel',
                        items: {
                            type: 'string',
                        },
                    },
                    image: {
                        type: 'string',
                        description: 'Image of the hotel',
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
                },
            },

            HotelRoom: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the hotel room',
                    },
                    hotelId: {
                        type: 'string',
                        description: 'Hotel id of the hotel room',
                    },
                    size: {
                        type: 'string',
                        description: 'Size of the hotel room',
                    },
                    price: {
                        type: 'string',
                        description: 'Price of the hotel room',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the hotel room',
                    },
                    image: {
                        type: 'string',
                        description: 'Image of the hotel room',
                    },
                    thumbnail: {
                        type: 'string',
                        description: 'Thumbnail of the hotel room',
                    },
                    adults: {
                        type: 'number',
                        description: 'Adults of the hotel room',
                    },
                    children: {
                        type: 'number',
                        description: 'Children of the hotel room',
                    },
                },
            },

            HotelRoomType: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the hotel room type',
                    },

                    price: {
                        type: 'string',
                        description: 'Price of the hotel room type',
                    },
                    bed: {
                        type: 'string',
                        description: 'Bed of the hotel room type',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the hotel room type',
                    },
                    image: {
                        type: 'string',
                        description: 'Image of the hotel room type',
                    },
                    thumbnail: {
                        type: 'string',
                        description: 'Thumbnail of the hotel room type',
                    },
                    payment: {
                        type: 'array',
                        items: {
                            type: 'string',
                            description: 'Payment of the hotel room type',
                        },
                    },
                    cancellation: {
                        type: 'string',
                        description: 'Cancellation of the hotel room type',
                    },
                    meals: {
                        type: 'string',
                        description: 'Meals of the hotel room type',
                    },
                },
            },

            Amenities: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the amenities',
                    },
                    free: {
                        type: 'boolean',
                        description: 'Is free or not',
                    },
                    price: {
                        type: 'string',
                        description: 'Price of the amenities',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the amenities',
                    },
                },
            },

            HotelReview: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the hotel review',
                    },
                    hotelId: {
                        type: 'string',
                        description: 'Hotel id of the hotel review',
                    },
                    userId: {
                        type: 'string',
                        description: 'User id of the hotel review',
                    },
                    rating: {
                        type: 'string',
                        description: 'Rating of the hotel review',
                    },
                    review: {
                        type: 'string',
                        description: 'Review of the hotel review',
                    },
                    title: {
                        type: 'string',
                        description: 'Title of the hotel review',
                    },
                    hotelName: {
                        type: 'string',
                        description: 'Hotel name of the hotel review',
                    }
                },
            },

            HalalRating: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the halal review',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the halal review',
                    },
                    addedBy: {
                        type: 'string',
                        description: 'Added by of the halal review',
                    },
                    percentage: {
                        type: 'string',
                        description: 'Percentage of the halal review',
                    },
                },
            },

            Activities: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the activities',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the activities',
                    },
                    rating: {
                        type: 'string',
                        description: 'Rating of the activities',
                    },
                    halalRating: {
                        type: 'string',
                        description: 'Halal rating of the activities',
                    },
                    price: {
                        type: 'string',
                        description: 'Price of the activities',
                    },
                    image: {
                        type: 'string',
                        description: 'Image of the activities',
                    },
                    instantConf: {
                        type: 'boolean',
                        description: 'Instant confirmation of the activities',
                    },
                    freeCancel: {
                        type: 'boolean',
                        description: 'Free cancellation of the activities',
                    },
                    date: {
                        type: 'string',
                        description: 'Date of the activities',
                    },
                    adults: {
                        type: 'number',
                        description: 'Adults of the activities',
                    },
                    children: {
                        type: 'number',
                        description: 'Children of the activities',
                    },
                },
            },

            Transfers: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the transfers',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the transfers',
                    },
                    rating: {
                        type: 'string',
                        description: 'Rating of the transfers',
                    },
                    price: {
                        type: 'string',
                        description: 'Price of the transfers',
                    },
                    image: {
                        type: 'string',
                        description: 'Image of the transfers',
                    },
                    route: {
                        type: 'string',
                        description: 'Route of the transfers',
                    },
                    vehicles: {
                        type: 'number',
                        description: 'Vehicles of the transfers',
                    },
                    vehicleType: {
                        type: 'string',
                        description: 'Vehicle type of the transfers',
                    },
                },

            },

            Insurances: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the insurances',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the insurances',
                    },
                    rating: {
                        type: 'string',
                        description: 'Rating of the insurances',
                    },
                    price: {
                        type: 'string',
                        description: 'Price of the insurances',
                    },
                    image: {
                        type: 'string',
                        description: 'Image of the insurances',
                    },
                    instantConf: {
                        type: 'boolean',
                        description: 'Instant confirmation of the insurances',
                    },
                    freeCancel: {
                        type: 'boolean',
                        description: 'Free cancellation of the insurances',
                    },
                    halalRating: {
                        type: 'string',
                        description: 'Halal rating of the insurances',
                    },
                    area: {
                        type: 'string',
                        description: 'Area of the insurances',
                    },
                    package: {
                        type: 'string',
                        description: 'Package of the insurances',
                    },

                }
            },

            HolidayPackages: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the holiday packages',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the holiday packages',
                    },
                    rating: {
                        type: 'string',
                        description: 'Rating of the holiday packages',
                    },
                    price: {
                        type: 'string',
                        description: 'Price of the holiday packages',
                    },
                    image: {
                        type: 'string',
                        description: 'Image of the holiday packages',
                    },
                    instantConf: {
                        type: 'boolean',
                        description: 'Instant confirmation of the holiday packages',
                    },
                    freeCancel: {
                        type: 'boolean',
                        description: 'Free cancellation of the holiday packages',
                    },
                    halalRating: {
                        type: 'string',
                        description: 'Halal rating of the holiday packages',
                    },
                    area: {
                        type: 'string',
                        description: 'Area of the holiday packages',
                    },
                    package: {
                        type: 'string',
                        description: 'Package of the holiday packages',
                    },
                    duration: {
                        type: 'string',
                        description: 'Duration of the holiday packages',
                    },

                }
            }










        },

    },

};



module.exports = swaggerDocumentation;
