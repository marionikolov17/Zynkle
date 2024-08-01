import * as userService from "./../services/user.service";

export default function useSearchUser() {
    const search = async (query, setUsers) => {
        try {
            if (query == "") return setUsers([])
            const response = await userService.searchUser(query);

            setUsers(response.data.data.users);
        } catch (error) {
            console.log(error)
            throw new Error(error.message);
        } 
    }

    return search;
}