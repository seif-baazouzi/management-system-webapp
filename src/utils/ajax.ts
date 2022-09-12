import { push } from "svelte-spa-router"

const get = async (url: string, headers = {}) => {
    const token = localStorage.getItem("token")
    const res = await fetch(url, { headers: { ...headers, "X-Token": token } })
    const data = await res.json()

    if (data.message === "invalid-token") {
        push("/login")
        return
    }

    return data
}

const sample = async (url: string, headers = {}, body = {}, method: string) => {
    const token = localStorage.getItem("token")
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json", "X-Token": token, ...headers },
        method: method,
        body: JSON.stringify(body)
    })

    const data = await res.json()

    if (data.message === "invalid-token") {
        push("/login")
        return
    }

    return data
}

const put = (url: string, headers = {}, body = {}) => sample(url, headers, body, "PUT")
const post = (url: string, headers = {}, body = {}) => sample(url, headers, body, "POST")
const del = (url: string, headers = {}, body = {}) => sample(url, headers, body, "DELETE")

export default { get, post, put, del }
