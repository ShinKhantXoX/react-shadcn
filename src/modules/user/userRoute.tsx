import UserList from "./view/UserList";


export const userRoute = [
    {
        path : 'user',
        children : [
            {
                path : "",
                element : <UserList />
            }
        ]
    }
]