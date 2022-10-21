const INITIAL_STATE = {
    locations: [
        { location: 'Sindh' },
        { location: 'Karachi, Sindh' },
        { location: 'Hyderabad, Sindh' },
        { location: 'Sukkar, Sindh' },
        { location: 'Mirpur, Sindh' },
        { location: 'Punjab' },
        { location: 'Lahore, Punjab' },
        { location: 'Rawalpindi, Punjab' },
        { location: 'Multan, Punjab' },
        { location: 'Islamabad' },
        { location: 'Khyber Pakhtunkhwa' },
        { location: 'Balocistan' },
    ],
    allCategories: [
        'Mobile Phones',
        'Car',
        'Motorcycle',
        'Other Vehicles',
        'Electronics and Home Appliances',
        'Property(for-sale) ',
        'Property(for-rent)',
        'Furniture',
        'Books and sports',
        'Kids accessories and toys',
        'Animals'
    ],
    searchedItem: '',
    selectedLoc: '',
    selectedCategory: '',
    minPrice: '',
    maxPrice: '',

    loginStatus: false,
    uid: '',
    userName: '',
    photoURL: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_SEARCHED_ITEM':
            return ({
                ...state,
                searchedItem: action.data,
            });
        case 'SET_SELECTED_LOC':
            return ({
                ...state,
                selectedLoc: action.data,
            });
        case 'SET_SELECTED_CATEGORY':
            return ({
                ...state,
                selectedCategory: action.data,
            });
        case 'SET_MIN_PRICE':
            return ({
                ...state,
                minPrice: action.data,
            });
        case 'SET_MAX_PRICE':
            return ({
                ...state,
                maxPrice: action.data,
            });
        case 'FACEBOOK_LOGIN':
            return ({
                ...state,
                loginStatus: action.loginStatus,
                uid: action.uid,
                userName: action.userName,
                photoURL: action.photoURL
            })

        case 'FACEBOOK_LOGOUT':
            return ({
                ...state,
                loginStatus: action.loginStatus,
                uid: action.uid,
                userName: action.userName,
                photoURL: action.photoURL
            })

        default:
            return (state)
    }
}