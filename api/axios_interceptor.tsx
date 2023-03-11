import axios from "axios";
import Router from "next/router";

axios.interceptors.request.use((value) => {
    const clientId = 'online-trading-gateway';
    const authorityPath = 'https://cluster.tech1a.co';

    if (typeof window !== 'undefined') {
        const oidcStorage:any = localStorage.getItem(`oidc.user:${authorityPath}:${clientId}`)
        let token = JSON.parse(oidcStorage)?.access_token
        let tokenType = JSON.parse(oidcStorage)?.token_type
        value.headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+" "+'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ5QzFGM0JGRkNCRjdGNTQ1MDk3OUNFQ0ZEQzRCMEQxNzdEQTgxNjRSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IlNjSHp2X3lfZjFSUWw1enNfY1N3MFhmYWdXUSJ9.eyJuYmYiOjE2Nzg1NDU4MjksImV4cCI6MTY3ODU0OTQyOSwiaXNzIjoiaHR0cHM6Ly9jbHVzdGVyLnRlY2gxYS5jbyIsImNsaWVudF9pZCI6ImxvY2FsX2FwaV9zd2FnZ2VyIiwic3ViIjoiZTg5MmVhZTctY2YyZS00OGQ4LWEwMjQtYTdjOWViMGY4NjY4IiwiYXV0aF90aW1lIjoxNjc4MTEyNDI2LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJJZGVudGl0eVNlcnZlckFwaSI6IklkZW50aXR5U2VydmVyQXBpLkFsbCIsIkZpbGVNYW5hZ2VyU3lzdGVtIjoiRmlsZU1hbmFnZXJTeXN0ZW0uQWxsIiwiTWFya2V0UnVsZVN0b3JlIjoiTWFya2V0UnVsZVN0b3JlLkFsbCIsIkJvb2tCdWlsZGluZ1N0b3JlIjoiQm9va0J1aWxkaW5nU3RvcmUuQWxsIiwiT3JkZXJNZWRpYXRvciI6Ik9yZGVyTWVkaWF0b3IuQWxsIiwiQ3VzdG9tZXJNYW5hZ2VtZW50IjpbIkN1c3RvbWVyTWFuYWdlbWVudC5BbGwiLCJDdXN0b21lck1hbmFnZW1lbnQuT25saW5lUmVnaXN0cmF0aW9uUHJvZmlsZS5SZWFkIl0sIkludHJhZGF5UG9ydGZvbGlvIjoiSW50cmFkYXlQb3J0Zm9saW8uQWxsIiwiT3JkZXJTdG9yZSI6Ik9yZGVyU3RvcmUuQWxsIiwianRpIjoiRjcwRUFDOUNFNERDRDEzRTNFQTlBOEQ5ODUyMzUxMzMiLCJzaWQiOiI3NzVENjQwQjQ2ODM3MTQwODQ3MzE5QjI0REU4NzczOCIsImlhdCI6MTY3ODU0NTgyOSwic2NvcGUiOlsib3BlbmlkIl0sImFtciI6WyJwd2QiXX0.rEac2KTJoTP04AiAjWS7EnOmsf59aIDm1zXlw3DOALywMQyvOTq3bBBn-OYbyO__447_itIF1NDCjzS0dm8eAW1IoibJwDWMpHRg6e5B66BjaIDXOxZlIZFCMh_a3oOew1kcrtnTRYfJsjwzjTlxrGQXSrKtq99Z1LIHAKJ7G2aPGZk-pfKcdymih4RHHkduztQIxz7gyLMlgriK0yibKaFpm1XhvRDRPmHG7_oBCGSRa2SqFpuItucXMiVUtR9qmAKb3vnb5wgiAQLL8Pcw0hguEERA_0QcU0xP_vfxHc0LtTWhjjgkTUsYL3_Yoiq0uYKSKY-gNW-4lwbkVnNlBw',
        }

        return value
    }
})

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('oidc.user:https://cluster.tech1a.co:online-trading-gateway');
                Router.push('/');
            }
        }

        return Promise.reject(error);
    }
);