import { http } from "@/config/axios";

const urlParams = (params : any) => {
    let paramsArray : any = [];
    Object.keys(params).map((value) => {
        return paramsArray.push(`${value}=${params[value]}`);
    });
    return paramsArray.join("&");
}

const httpReqestHandler = (errors : any) => {

    if(errors.response && errors.response.status === 422) {
        return {
            status : errors.response.status,
            message: errors.response.data.message,
            errors: errors.response.data.data
        }
    }

    if(errors.response && (errors.response.status === 500 || errors.response.status === 403)) {
        return {
            status : errors.response.status,
            message: errors.response.data.message,
        }
    }

    if(errors.response && errors.response.status === 401) {
        localStorage.removeItem("token");
        window.location.replace('/auth/login')
    }

    return errors;
}

const httpResponseHandler = (response : any) => {
    return {
        status : 200,
        message: response.data.message,
        data: response.data.data
    };
}


export const getReqeust = async (path : any, params :any) => {

    const url = params ? `${path}?${urlParams(params)}` : path;
    return await http.get(url)
        .then((response : any) => httpResponseHandler(response))
        .catch((error : any) => httpReqestHandler(error));
}

export const postRequest = async (path : any, body : any) => {
    return await http.post(path, body)
        .then((response : any) => { return httpResponseHandler(response)})
        .catch((error : any) => {return httpReqestHandler(error)});
}

export const putRequest = async (path : any, body : any) => {
    return await http.put(path, body)
    .then((response : any) => httpResponseHandler(response))
    .catch((error : any) => httpReqestHandler(error));
}

export const delRequest = async (path : any) => {
    return await http.delete(path)
    .then((response : any) => httpResponseHandler(response))
    .catch((error : any) => httpReqestHandler(error));
}

export const patchRequest = async (path : any) => {
    return await http.patch(path)
        .then((response : any) => httpResponseHandler(response))
        .catch((error : any) => httpReqestHandler(error));
}